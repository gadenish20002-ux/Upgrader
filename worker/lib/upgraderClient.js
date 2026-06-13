/**
 * upgraderClient.js
 * ------------------
 * Клиент к донору (upgrader.pro), который проходит Cloudflare.
 *
 * ПОЧЕМУ НЕ ПРОСТО axios:
 *   upgrader.pro закрыт Cloudflare. Любой запрос без настоящего браузера
 *   возвращает страницу-челлендж "Just a moment..." (HTTP 403/503), а не JSON.
 *   Пройти челлендж и получить cookie `cf_clearance` может только реальный
 *   браузер. Поэтому JSON-эндпоинты дёргаем через headless-браузер
 *   (Playwright + stealth). Картинки скинов лежат на Steam CDN (БЕЗ Cloudflare),
 *   поэтому их качаем обычным axios — быстро и дёшево.
 *
 * Клиент держит один браузер живым, переиспользует сессию/куки и
 * автоматически пере-решает челлендж, если cf_clearance протух.
 */

const { chromium } = require("playwright-extra");
const stealth = require("puppeteer-extra-plugin-stealth")();
chromium.use(stealth);

const DESKTOP_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const BASE_URL = process.env.DONOR_BASE_URL || "https://upgrader.pro";
const USER_DATA_DIR =
  process.env.DONOR_PROFILE_DIR || require("path").join(__dirname, "..", ".browser-profile");
const HEADLESS = process.env.DONOR_HEADLESS !== "false"; // headful иногда стабильнее проходит CF

let context = null;
let page = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isChallenge(text) {
  if (!text) return false;
  return (
    text.includes("Just a moment") ||
    text.includes("challenge-platform") ||
    text.includes("cf_chl_opt") ||
    text.includes("Enable JavaScript and cookies to continue")
  );
}

/** Запускает браузер (если ещё не запущен) и проходит Cloudflare на главной. */
async function ensureReady() {
  if (context && page && !page.isClosed()) return;

  context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: HEADLESS,
    userAgent: DESKTOP_UA,
    viewport: { width: 1366, height: 768 },
    locale: "ru-RU",
    args: ["--disable-blink-features=AutomationControlled"],
  });
  page = context.pages()[0] || (await context.newPage());

  await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 });

  // Ждём, пока Cloudflare пропустит (заголовок перестанет быть "Just a moment...")
  for (let i = 0; i < 30; i++) {
    const title = await page.title().catch(() => "");
    if (title && !/just a moment|moment|loading/i.test(title)) break;
    await sleep(2000);
  }
  const title = await page.title().catch(() => "");
  if (/just a moment/i.test(title)) {
    throw new Error(
      "Cloudflare не пройден (остался челлендж). Запусти с DONOR_HEADLESS=false " +
        "и/или используй резидентный прокси / FlareSolverr — см. worker/README.md"
    );
  }
}

/**
 * GET к JSON-эндпоинту донора через контекст браузера (несёт cf_clearance).
 * При челлендже один раз пере-решает CF и повторяет.
 * @param {string} path например "/api/items/shop?sortBy=price&sortDirection=DESC&offset=0&limit=19"
 * @returns {Promise<any>} распарсенный JSON
 */
async function fetchJson(path, _retry = false) {
  await ensureReady();
  const url = path.startsWith("http") ? path : BASE_URL + path;

  const res = await page.evaluate(async (u) => {
    try {
      const r = await fetch(u, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      const body = await r.text();
      return { status: r.status, body };
    } catch (e) {
      return { status: 0, body: String(e) };
    }
  }, url);

  if (isChallenge(res.body) || res.status === 403 || res.status === 503) {
    if (_retry) {
      throw new Error(`Cloudflare заблокировал ${url} (status ${res.status}) после повтора`);
    }
    // пере-решаем челлендж и повторяем один раз
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 });
    await sleep(4000);
    return fetchJson(path, true);
  }

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`HTTP ${res.status} для ${url}: ${String(res.body).slice(0, 200)}`);
  }

  try {
    return JSON.parse(res.body);
  } catch (e) {
    throw new Error(`Не JSON от ${url}: ${String(res.body).slice(0, 200)}`);
  }
}

/**
 * Достаёт "Онлайн" из шапки сайта (его НЕТ в публичном API — только в DOM).
 * Возвращает Number или null.
 */
async function getOnlineFromDom() {
  await ensureReady();
  // если ушли на другую страницу — вернёмся на главную
  if (!page.url().includes(BASE_URL.replace(/^https?:\/\//, ""))) {
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    await sleep(3000);
  }
  return page.evaluate(() => {
    // Ищем текст вида "Online 888189" / "Онлайн 888189" в шапке
    const text = document.body.innerText || "";
    const m =
      text.match(/Online\s*([\d\s.,]{2,})/i) || text.match(/Онлайн\s*([\d\s.,]{2,})/i);
    if (m) {
      const n = parseInt(m[1].replace(/[^\d]/g, ""), 10);
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  });
}

/**
 * Фоллбэк для апгрейдов: достаёт число из одометра в DOM
 * (div.odometer-inside → склейка span.odometer-value), как в ТЗ.
 * Возвращает Number или null.
 */
async function getUpgradesFromDom() {
  await ensureReady();
  if (!page.url().includes(BASE_URL.replace(/^https?:\/\//, ""))) {
    await page.goto(BASE_URL + "/", { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
    await sleep(3000);
  }
  return page.evaluate(() => {
    const boxes = document.querySelectorAll(".odometer-inside");
    for (const box of boxes) {
      const digits = [...box.querySelectorAll(".odometer-value")]
        .map((s) => (s.textContent || "").trim())
        .join("");
      const n = parseInt(digits.replace(/[^\d]/g, ""), 10);
      if (Number.isFinite(n) && n > 1000) return n;
    }
    return null;
  });
}

async function close() {
  try {
    if (context) await context.close();
  } catch (_) {}
  context = null;
  page = null;
}

module.exports = {
  BASE_URL,
  DESKTOP_UA,
  fetchJson,
  getOnlineFromDom,
  getUpgradesFromDom,
  ensureReady,
  close,
  sleep,
};
