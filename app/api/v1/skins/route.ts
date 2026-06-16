import { NextResponse } from "next/server"
import type { Skin } from "@/lib/types"
import {
  STATIC_SKINS,
  applyCatalogPrices,
  getCatalogAdditionalSkins,
  getCatalogPriceMeta,
  getCatalogPrices,
  type CatalogPriceMap,
  type CatalogPriceMeta,
} from "@/lib/catalog-prices"

// Внутренний эндпоинт для фронтенда: статичные id остаются стабильными, а
// ежедневная синхронизация добавляет новые Steam-скины и обновляет цены.
export const dynamic = "force-dynamic"
export const revalidate = 0

const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get("limit")
  const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10) || 0)
  const query = (searchParams.get("q") || "").trim().toLocaleLowerCase("en-US")

  let prices: CatalogPriceMap = {}
  let meta: CatalogPriceMeta | null = null
  let additions: Skin[] = []
  try {
    ;[prices, meta] = await Promise.all([getCatalogPrices(), getCatalogPriceMeta()])
    additions = await getCatalogAdditionalSkins(meta)
  } catch {
    // KV failure must not take the existing catalog offline.
  }

  const priced = [...applyCatalogPrices(STATIC_SKINS, prices), ...additions]
  const all = query
    ? priced.filter((skin) => `${skin.weapon} ${skin.name} ${skin.wear}`.toLocaleLowerCase("en-US").includes(query))
    : priced

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
