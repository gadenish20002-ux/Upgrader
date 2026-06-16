import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const maxDuration = 60

const ITEMS = [
  "AK-47 | X-Ray (Factory New)",
  "StatTrak™ PP-Bizon | Runic (Well-Worn)",
]

const STEAM_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
  Accept: "application/json,text/plain,*/*",
}

async function steamPrice(item: string, currency: number) {
  const url = new URL("https://steamcommunity.com/market/priceoverview/")
  url.searchParams.set("appid", "730")
  url.searchParams.set("currency", String(currency))
  url.searchParams.set("market_hash_name", item)
  const res = await fetch(url, { cache: "no-store", headers: STEAM_HEADERS })
  const text = await res.text()
  let data: unknown = text
  try { data = JSON.parse(text) } catch {}
  return { status: res.status, data }
}

async function steamSearch(count: number) {
  const url = new URL("https://steamcommunity.com/market/search/render/")
  url.searchParams.set("query", "")
  url.searchParams.set("start", "0")
  url.searchParams.set("count", String(count))
  url.searchParams.set("search_descriptions", "0")
  url.searchParams.set("sort_column", "name")
  url.searchParams.set("sort_dir", "asc")
  url.searchParams.set("appid", "730")
  url.searchParams.set("norender", "1")
  url.searchParams.set("currency", "5")
  url.searchParams.set("country", "RU")
  url.searchParams.set("language", "english")

  const res = await fetch(url, { cache: "no-store", headers: STEAM_HEADERS })
  const text = await res.text()
  let data: any = null
  try { data = JSON.parse(text) } catch {}
  const results = Array.isArray(data?.results) ? data.results : []
  const summarize = (row: any) => row ? {
    name: row.name,
    hash: row.hash_name,
    sellPrice: row.sell_price,
    sellPriceText: row.sell_price_text,
    asset: row.asset_description ? {
      type: row.asset_description.type,
      name: row.asset_description.name,
      marketHashName: row.asset_description.market_hash_name,
      iconUrl: row.asset_description.icon_url,
      nameColor: row.asset_description.name_color,
    } : null,
  } : null

  return {
    status: res.status,
    bytes: text.length,
    success: data?.success,
    totalCount: data?.total_count,
    resultCount: results.length,
    first: summarize(results[0]),
    last: summarize(results[results.length - 1]),
    textStart: data ? undefined : text.slice(0, 300),
  }
}

export async function GET() {
  const [steam, search100, search500, search5000] = await Promise.all([
    Promise.all(
      ITEMS.map(async (item) => ({
        item,
        usd: await steamPrice(item, 1),
        rub: await steamPrice(item, 5),
      })),
    ),
    steamSearch(100),
    steamSearch(500),
    steamSearch(5000),
  ])

  return NextResponse.json({ steam, search100, search500, search5000 })
}
