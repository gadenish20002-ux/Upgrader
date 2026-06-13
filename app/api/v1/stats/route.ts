import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { currentGlobalUpgrades } from "@/lib/default-data"

// Внутренний эндпоинт статистики: онлайн + количество апгрейдов.
//
// GET  /api/v1/stats         → { online, upgrades, updatedAt }
// POST /api/v1/stats         → воркер пушит свежие цифры (заголовок x-stats-secret)
//
// Источник правды — Vercel KV (ключ STATS_KEY), куда пишет воркер
// (worker/syncStats.js, STATS_PUSH_URL=https://<сайт>/api/v1/stats).
// Если KV пуст — отдаём разумный фоллбэк, чтобы шапка никогда не была пустой.
export const dynamic = "force-dynamic"
export const revalidate = 0

const STATS_KEY = "upgrader_live_stats"
const FALLBACK_ONLINE = 2172

export async function GET() {
  try {
    const data = await kv.get<{ online: number; upgrades: number; updatedAt: number }>(STATS_KEY)
    return NextResponse.json({
      online: data?.online ?? FALLBACK_ONLINE,
      upgrades: data?.upgrades ?? currentGlobalUpgrades(),
      updatedAt: data?.updatedAt ?? Date.now(),
    })
  } catch (error) {
    // KV недоступен — не падаем, отдаём фоллбэк.
    return NextResponse.json({
      online: FALLBACK_ONLINE,
      upgrades: currentGlobalUpgrades(),
      updatedAt: Date.now(),
    })
  }
}

export async function POST(request: Request) {
  const secret = process.env.STATS_PUSH_SECRET
  if (secret && request.headers.get("x-stats-secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  try {
    const body = await request.json()
    const online = Number(body.online)
    const upgrades = Number(body.upgrades)
    const next = {
      online: Number.isFinite(online) ? online : undefined,
      upgrades: Number.isFinite(upgrades) ? upgrades : undefined,
      updatedAt: Date.now(),
    }
    const prev = (await kv.get<any>(STATS_KEY)) || {}
    await kv.set(STATS_KEY, { ...prev, ...next, updatedAt: next.updatedAt })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "bad request" }, { status: 400 })
  }
}
