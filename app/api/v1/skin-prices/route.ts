import { NextResponse } from "next/server"
import { getCatalogPriceMeta, getCatalogPrices } from "@/lib/catalog-prices"

export const dynamic = "force-dynamic"
export const revalidate = 0

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
}

export async function GET() {
  try {
    const [prices, meta] = await Promise.all([getCatalogPrices(), getCatalogPriceMeta()])
    return NextResponse.json({ prices, meta }, { headers: CACHE_HEADERS })
  } catch {
    // The client always has the bundled catalog as a fallback.
    return NextResponse.json({ prices: {}, meta: null }, { headers: CACHE_HEADERS })
  }
}
