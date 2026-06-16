import { NextResponse } from "next/server"
import {
  STATIC_SKINS,
  applyCatalogPrices,
  getCatalogPriceMeta,
  getCatalogPrices,
} from "@/lib/catalog-prices"

// Внутренний эндпоинт для фронтенда: статичные id/картинки/редкость остаются
// стабильными, а цены поверх них обновляются ежедневной синхронизацией Steam.
export const dynamic = "force-dynamic"
export const revalidate = 0

const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get("limit")
  const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10) || 0)

  let prices = {}
  let meta = null
  try {
    ;[prices, meta] = await Promise.all([getCatalogPrices(), getCatalogPriceMeta()])
  } catch {
    // KV failure must not take the existing catalog offline.
  }

  const all = applyCatalogPrices(STATIC_SKINS, prices)

  if (limitParam == null) {
    return NextResponse.json({ items: all, total: all.length, meta }, { headers: CACHE_HEADERS })
  }

  const limit = Math.max(1, Math.min(500, parseInt(limitParam, 10) || 19))
  const items = all.slice(offset, offset + limit)
  return NextResponse.json(
    {
      items,
      total: all.length,
      offset,
      limit,
      hasMore: offset + limit < all.length,
      meta,
    },
    { headers: CACHE_HEADERS },
  )
}
