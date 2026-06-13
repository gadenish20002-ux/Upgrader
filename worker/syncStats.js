/**
 * syncStats.js — Задача 2: воркер статистики (апгрейды и онлайн).
 *
 * Источники (проверено вживую):
 *   • Апгрейды (всего): GET /api/statistics/games-count → {"count": <number>}  — чистый API.
 *   • Онлайн: публичного API НЕТ (/api/statistics/online → 401 JWT).
 *             Берём из DOM шапки сайта ("Online <число>").
 *
 * Куда сохраняем:
 *   • worker/data/stats.json  — локальный кэш/фоллбэк.
 *   • (опц.) POST на наш сайт /api/v1/stats  — чтобы прод (Vercel) получил свежие
 *     цифры без локального диска. Включается через STATS_PUSH_URL + STATS_PUSH_SECRET.
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { fetchJson, getOnlineFromDom, close } = require("./lib/upgraderClient");

const STATS_OUT = process.env.STATS_OUT || path.join(__dirname, "data", "stats.json");
const PUSH_URL = process.env.STATS_PUSH_URL || null; // например https://ваш-сайт/api/v1/stats
const PUSH_SECRET = process.env.STATS_PUSH_SECRET || null;

/**
 * Получить апгрейды. Сначала пробуем прямой API донора, затем — заготовка фоллбэка.
 * @returns {Promise<number|null>}
 */
async function getUpgrades() {
  // 1) Прямой API (рабочий путь)
  try {
    const data = await fetchJson("/api/statistics/games-count");
    if (data && typeof data.count === "number") return data.count;
  } catch (err) {
    console.warn(`[stats] /api/statistics/games-count не сработал: ${err.message}`);
  }
  // 2) Заготовки на другие возможные эндпоинты
  for (const p of ["/api/stats", "/api/statistics/games", "/api/games/count"]) {
    try {
      const d = await fetchJson(p);
      const v = d && (d.count ?? d.upgrades ?? d.games ?? d.total);
      if (typeof v === "number") return v;
    } catch (_) {
      /* пробуем следующий */
    }
  }
  // 3) Фоллбэк: парсинг odometer из DOM (div.odometer-inside → span.odometer-value)
  try {
    const { getUpgradesFromDom } = require("./lib/upgraderClient");
    if (typeof getUpgradesFromDom === "function") {
      const n = await getUpgradesFromDom();
      if (n) return n;
    }
  } catch (_) {}
  return null;
}

async function getOnline() {
  try {
    const n = await getOnlineFromDom();
    if (n) return n;
  } catch (err) {
    console.warn(`[stats] онлайн из DOM не получен: ${err.message}`);
  }
  return null;
}

async function syncStats() {
  const prev = readPrev();
  let upgrades = null;
  let online = null;

  try {
    upgrades = await getUpgrades();
  } catch (err) {
    console.error(`[stats] апгрейды: ${err.message}`);
  }
  try {
    online = await getOnline();
  } catch (err) {
    console.error(`[stats] онлайн: ${err.message}`);
  }

  // Не затираем хорошее значение нулём/null — держим прошлое.
  const out = {
    online: online ?? prev.online ?? null,
    upgrades: upgrades ?? prev.upgrades ?? null,
    updatedAt: Date.now(),
  };

  fs.mkdirSync(path.dirname(STATS_OUT), { recursive: true });
  fs.writeFileSync(STATS_OUT, JSON.stringify(out, null, 2));
  console.log(`[stats] online=${out.online} upgrades=${out.upgrades}`);

  // Пуш на прод (опционально)
  if (PUSH_URL && out.upgrades != null) {
    try {
      await axios.post(
        PUSH_URL,
        { online: out.online, upgrades: out.upgrades },
        { headers: { "x-stats-secret": PUSH_SECRET || "" }, timeout: 15000 }
      );
    } catch (err) {
      console.warn(`[stats] пуш на ${PUSH_URL} не удался: ${err.message}`);
    }
  }
  return out;
}

function readPrev() {
  try {
    return JSON.parse(fs.readFileSync(STATS_OUT, "utf8"));
  } catch (_) {
    return {};
  }
}

module.exports = { syncStats };

if (require.main === module) {
  syncStats()
    .catch((e) => console.error("[stats] фатальная ошибка:", e.message))
    .finally(async () => {
      await close();
      process.exit(0);
    });
}
