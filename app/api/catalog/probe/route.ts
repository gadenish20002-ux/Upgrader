import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const maxDuration = 60

const ITEMS = [
  "AK-47 | X-Ray (Factory New)",
  "StatTrak™ PP-Bizon | Runic (Well-Worn)",
]

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
  Accept: "application/json,text/plain,*/*",
}

async function steamPrice(item: string, currency: number) {
  const url = new URL("https://steamcommunity.com/market/priceoverview/")
  url.searchParams.set("appid", "730")
  url.searchParams.set("currency", String(currency))
  url.searchParams.set("market_hash_name", item)
  const res = await fetch(url, { cache: "no-store", headers: HEADERS })
  const text = await res.text()
  let data: unknown = text
  try { data = JSON.parse(text) } catch {}
  return { status: res.status, data }
}

async function bulkPrices(provider: string) {
  const url = `https://prices.csgotrader.app/latest/${provider}.json`
  const res = await fetch(url, { cache: "no-store", headers: HEADERS, redirect: "follow" })
  const text = await res.text()
  let data: any = null
  try { data = JSON.parse(text) } catch {}
  const keys = data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : []
  return {
    url: res.url,
    status: res.status,
    contentType: res.headers.get("content-type"),
    bytes: text.length,
    parsed: !!data,
    keyCount: keys.length,
    sampleKeys: keys.slice(0, 3),
    xray: data?.[ITEMS[0]] ?? null,
    runic: data?.[ITEMS[1]] ?? null,
    textStart: data ? undefined : text.slice(0, 300),
  }
}

export async function GET() {
  const [steam, steamBulk, traderBulk] = await Promise.all([
    Promise.all(
      ITEMS.map(async (item) => ({
        item,
        usd: await steamPrice(item, 1),
        rub: await steamPrice(item, 5),
      })),
    ),
    bulkPrices("steam"),
    bulkPrices("csgotrader"),
  ])

  return NextResponse.json({ steam, steamBulk, traderBulk })
}
