import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const ITEMS = [
  "AK-47 | X-Ray (Factory New)",
  "StatTrak™ PP-Bizon | Runic (Well-Worn)",
]

async function steamPrice(item: string, currency: number) {
  const url = new URL("https://steamcommunity.com/market/priceoverview/")
  url.searchParams.set("appid", "730")
  url.searchParams.set("currency", String(currency))
  url.searchParams.set("market_hash_name", item)
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
      Accept: "application/json",
    },
  })
  const text = await res.text()
  let data: unknown = text
  try { data = JSON.parse(text) } catch {}
  return { status: res.status, data }
}

export async function GET() {
  const steam = await Promise.all(
    ITEMS.map(async (item) => ({
      item,
      usd: await steamPrice(item, 1),
      rub: await steamPrice(item, 5),
    })),
  )

  const bulkUrl = "https://prices.csgotrader.app/latest/prices_v6.json"
  const bulkRes = await fetch(bulkUrl, { cache: "no-store" })
  const bulkText = await bulkRes.text()
  let bulk: any = null
  try { bulk = JSON.parse(bulkText) } catch {}

  const arraySample = Array.isArray(bulk) ? bulk.slice(0, 5) : null
  const objectKeys = bulk && typeof bulk === "object" && !Array.isArray(bulk)
    ? Object.keys(bulk).slice(0, 10)
    : []

  return NextResponse.json({
    steam,
    bulk: {
      status: bulkRes.status,
      bytes: bulkText.length,
      kind: Array.isArray(bulk) ? "array" : typeof bulk,
      length: Array.isArray(bulk) ? bulk.length : null,
      arraySample,
      objectKeys,
      textStart: bulkText.slice(0, 500),
    },
  })
}
