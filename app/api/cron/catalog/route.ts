import { NextResponse } from "next/server"
import { getCatalogPriceMeta, syncCatalogPrices } from "@/lib/catalog-prices"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const maxDuration = 60

const MIN_SYNC_INTERVAL_MS = 20 * 60 * 60 * 1000

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  const authorization = request.headers.get("authorization")
  const isPreview = process.env.VERCEL_ENV === "preview"
  const forcePreview = isPreview && new URL(request.url).searchParams.get("force") === "1"

  // When CRON_SECRET is configured, Vercel automatically sends this bearer
  // header. Without it the endpoint still remains safe: a 20-hour cooldown and
  // atomic snapshot replacement prevent repeated or partial catalog rewrites.
  if (secret && authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  try {
    const previous = await getCatalogPriceMeta()
    if (
      !forcePreview &&
      previous &&
      Date.now() - previous.updatedAt < MIN_SYNC_INTERVAL_MS
    ) {
      return NextResponse.json({ ok: true, skipped: true, meta: previous })
    }

    const meta = await syncCatalogPrices()
    return NextResponse.json({ ok: true, skipped: false, meta })
  } catch (error) {
    console.error("[catalog-sync]", error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "catalog sync failed" },
      { status: 502 },
    )
  }
}
