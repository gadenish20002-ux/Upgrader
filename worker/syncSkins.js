/**
 * syncSkins.js — Задача 1: воркер синхронизации скинов (скины, цены, картинки).
 *
 * Что делает:
 *   1. Постранично тянет /api/items/shop (offset, limit=19) пока hasMore:true.
 *   2. Маппит предметы донора в нашу модель Skin (цена/редкость/износ).
 *   3. Качает картинки в public/images/skins/<id>.png (если файла ещё нет).
 *   4. Пишет lib/skins-data.json с ЛОКАЛЬНЫМИ путями к картинкам.
 *
 * Запуск разово:  node worker/syncSkins.js
 * По расписанию:  через worker/index.js (node-cron)
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { fetchJson, DESKTOP_UA, sleep, close } = require("./lib/upgraderClient");
const { mapItem } = require("./lib/mapItem");

// --- Пути (можно переопределить через env) ---
const ROOT = path.join(__dirname, "..");
const SKINS_OUT = process.env.SKINS_OUT || path.join(ROOT, "lib", "skins-data.json");
const IMAGES_DIR = process.env.IMAGES_DIR || path.join(ROOT, "public", "images", "skins");
const PUBLIC_IMAGE_PREFIX = "/images/skins"; // как путь будет выглядеть во фронте

const LIMIT = 19;
const PAGE_DELAY_MS = Number(process.env.PAGE_DELAY_MS || 1500); // пауза между страницами (1–2 сек)
const MAX_PAGES = Number(process.env.MAX_PAGES || 2000); // предохранитель от бесконечного цикла
// Качать ли картинки локально. На Vercel папка public/ неизменяема в рантайме —
// тогда ставь DOWNLOAD_IMAGES=false и оставляй ссылки на Steam CDN (см. README).
const DOWNLOAD_IMAGES = process.env.DOWNLOAD_IMAGES !== "false";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Качает картинку предмета, если её ещё нет. Возвращает локальный путь. */
async function downloadImage(item) {
  const id = String(item.id);
  const fileName = `${id}.png`;
  const filePath = path.join(IMAGES_DIR, fileName);
  const publicPath = `${PUBLIC_IMAGE_PREFIX}/${fileName}`;

  if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
    return publicPath; // уже скачано
  }
  if (!item.image) return item.image || null;

  try {
    // Картинки на Steam CDN — без Cloudflare, тянем обычным axios.
    const resp = await axios.get(item.image, {
      responseType: "arraybuffer",
      timeout: 20000,
      headers: { "User-Agent": DESKTOP_UA },
    });
    fs.writeFileSync(filePath, resp.data);
    return publicPath;
  } catch (err) {
    console.warn(`[skins] не удалось скачать картинку ${id}: ${err.message}. Оставляю URL донора.`);
    return item.image; // фоллбэк — оставляем внешний URL
  }
}

async function syncSkins() {
  console.log(`[skins] старт синхронизации ${new Date().toISOString()}`);
  ensureDir(IMAGES_DIR);
  ensureDir(path.dirname(SKINS_OUT));

  const skins = [];
  const seen = new Set();
  let offset = 0;
  let page = 0;

  while (page < MAX_PAGES) {
    const url = `/api/items/shop?sortBy=price&sortDirection=DESC&offset=${offset}&limit=${LIMIT}`;
    let data;
    try {
      data = await fetchJson(url);
    } catch (err) {
      // 403/503/Cloudflare или сеть — логируем и выходим, НЕ роняя процесс.
      console.error(`[skins] ошибка запроса offset=${offset}: ${err.message}`);
      break;
    }

    const items = (data && data.items) || [];
    if (items.length === 0) break;

    for (const item of items) {
      if (seen.has(String(item.id))) continue;
      seen.add(String(item.id));
      const image = DOWNLOAD_IMAGES ? await downloadImage(item) : item.image;
      skins.push(mapItem(item, image));
    }

    console.log(`[skins] offset=${offset} получено ${items.length}, всего ${skins.length}`);

    if (!data.hasMore) break;
    offset += LIMIT;
    page += 1;
    await sleep(PAGE_DELAY_MS); // обязательная пауза между запросами
  }

  if (skins.length === 0) {
    console.error("[skins] 0 предметов — НЕ перезаписываю skins-data.json (защита от затирания).");
    return { count: 0 };
  }

  // Пишем атомарно: сначала .tmp, потом rename.
  const tmp = SKINS_OUT + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(skins, null, 2));
  fs.renameSync(tmp, SKINS_OUT);
  console.log(`[skins] готово: ${skins.length} скинов → ${SKINS_OUT}`);
  return { count: skins.length };
}

module.exports = { syncSkins };

// Прямой запуск из CLI
if (require.main === module) {
  syncSkins()
    .catch((e) => console.error("[skins] фатальная ошибка:", e.message))
    .finally(async () => {
      await close();
      process.exit(0);
    });
}
