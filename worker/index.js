/**
 * index.js — планировщик воркеров (node-cron).
 *
 * Расписание (можно менять через env):
 *   • Скины:      каждые SKINS_CRON (по умолчанию "*\/30 * * * *" — раз в 30 мин)
 *   • Статистика: каждые STATS_CRON (по умолчанию "* * * * *"   — раз в минуту)
 *
 * ВАЖНО: воркер держит живой headless-браузер и должен работать на
 * ДОЛГОЖИВУЩЕМ хосте (VPS / отдельный сервер / локальная машина).
 * На Vercel serverless он не запускается (нет постоянного процесса и ФС).
 */

const cron = require("node-cron");
const { syncSkins } = require("./syncSkins");
const { syncStats } = require("./syncStats");

const SKINS_CRON = process.env.SKINS_CRON || "*/30 * * * *";
const STATS_CRON = process.env.STATS_CRON || "* * * * *";

let skinsRunning = false;
let statsRunning = false;

async function runSkins() {
  if (skinsRunning) return;
  skinsRunning = true;
  try {
    await syncSkins();
  } catch (e) {
    console.error("[cron] syncSkins упал:", e.message);
  } finally {
    skinsRunning = false;
  }
}

async function runStats() {
  if (statsRunning) return;
  statsRunning = true;
  try {
    await syncStats();
  } catch (e) {
    console.error("[cron] syncStats упал:", e.message);
  } finally {
    statsRunning = false;
  }
}

console.log(`[cron] старт. skins="${SKINS_CRON}", stats="${STATS_CRON}"`);

// Прогон сразу при старте
runStats();
runSkins();

cron.schedule(STATS_CRON, runStats);
cron.schedule(SKINS_CRON, runSkins);

// graceful shutdown
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
