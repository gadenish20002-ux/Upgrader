import { NextResponse } from "next/server"
import type { Skin, InventoryItem, ItemHistoryEntry } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, isAdmin, ADMIN_ACCOUNT } from "@/lib/keys"
import { STATIC_SKINS, applyCatalogPrices, getCatalogAdditionalSkins, getCatalogPriceMeta, getCatalogPrices } from "@/lib/catalog-prices"

export const dynamic = "force-dynamic"
export const revalidate = 0

type BuyBody = {
  skinIds?: unknown
}

async function authorize(code: string, request: Request): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  if (!code) return { ok: false, status: 400, reason: "empty" }

  if (code === ADMIN_ACCOUNT) {
    const admin = await isAdmin(request.headers.get("x-admin-password"))
    return admin ? { ok: true } : { ok: false, status: 401, reason: "unauthorized" }
  }

  const key = await getKey(code)
  const status = keyStatus(key)
  if (status !== "active") return { ok: false, status: 403, reason: status }
  return { ok: true }
}

async function getCatalog(): Promise<Skin[]> {
  try {
    const [prices, meta] = await Promise.all([getCatalogPrices(), getCatalogPriceMeta()])
    const additions = await getCatalogAdditionalSkins(meta)
    return [...applyCatalogPrices(STATIC_SKINS, prices), ...additions]
  } catch {
    return STATIC_SKINS
  }
}

function makeUid(): string {
  return `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function makeHistoryId(): string {
  return `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const body = (await request.json()) as BuyBody
    const skinIds = Array.isArray(body.skinIds) ? body.skinIds.filter((id): id is string => typeof id === "string" && id.length > 0) : []
    if (skinIds.length === 0) return NextResponse.json({ error: "empty_cart" }, { status: 400 })
    if (skinIds.length > 200) return NextResponse.json({ error: "too_many_items" }, { status: 400 })

    const [account, catalog] = await Promise.all([getAccount(code), getCatalog()])
    const byId = new Map(catalog.map((skin) => [skin.id, skin]))
    const skins = skinIds.map((id) => byId.get(id))
    if (skins.some((skin) => !skin)) return NextResponse.json({ error: "unknown_skin" }, { status: 400 })

    const total = skins.reduce((sum, skin) => sum + (skin?.price || 0), 0)
    if (!Number.isFinite(total) || total <= 0) return NextResponse.json({ error: "invalid_price" }, { status: 400 })
    if (account.balance < total) return NextResponse.json({ error: "insufficient_balance" }, { status: 400 })

    const now = Date.now()
    const items: InventoryItem[] = skins.map((skin) => ({ uid: makeUid(), skinId: skin!.id }))
    const history: ItemHistoryEntry[] = items.map((item) => ({ id: makeHistoryId(), skinId: item.skinId, action: "bought", date: now }))

    const nextAccount = await patchAccount(code, {
      balance: Math.max(0, account.balance - total),
      inventory: [...items, ...(account.inventory || [])],
      itemHistory: [...history, ...(account.itemHistory || [])].slice(0, 500),
      userUpgrades: (account.userUpgrades || 0) + items.length,
      loggedIn: true,
    })

    return NextResponse.json({ success: true, account: nextAccount, bought: items, total })
  } catch (error) {
    console.error("[account-buy]", error)
    return NextResponse.json({ error: "buy_failed" }, { status: 500 })
  }
}
