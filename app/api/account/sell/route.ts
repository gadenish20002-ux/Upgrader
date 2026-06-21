import { NextResponse } from "next/server"
import type { Skin, ItemHistoryEntry } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, ADMIN_ACCOUNT } from "@/lib/keys"
import { STATIC_SKINS, applyCatalogPrices, getCatalogAdditionalSkins, getCatalogPriceMeta, getCatalogPrices } from "@/lib/catalog-prices"
import { COMPENSATION_BONUS_ITEMS } from "@/lib/default-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

type SellBody = {
  uids: string[]
}

async function authorize(code: string, request: Request): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  if (!code) return { ok: false, status: 400, reason: "empty" }

  if (code === ADMIN_ACCOUNT) {
    return { ok: true }
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
    return [...applyCatalogPrices(STATIC_SKINS, prices), ...additions, ...COMPENSATION_BONUS_ITEMS]
  } catch {
    return [...STATIC_SKINS, ...COMPENSATION_BONUS_ITEMS]
  }
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

    const body = (await request.json()) as SellBody
    const uids = Array.isArray(body.uids) ? body.uids.filter((id): id is string => typeof id === "string" && id.length > 0) : []
    if (uids.length === 0) return NextResponse.json({ error: "empty_uids" }, { status: 400 })

    const [account, catalog] = await Promise.all([getAccount(code), getCatalog()])
    const inventory = account.inventory || []
    
    const itemsToSell = inventory.filter(i => uids.includes(i.uid))
    if (itemsToSell.length !== uids.length) return NextResponse.json({ error: "item_not_found" }, { status: 400 })

    const byId = new Map(catalog.map((skin) => [skin.id, skin]))
    
    let totalValue = 0
    const now = Date.now()
    const newHistoryEntries: ItemHistoryEntry[] = []
    
    for (const item of itemsToSell) {
      const skin = byId.get(item.skinId)
      if (skin) {
        totalValue += skin.price
        newHistoryEntries.push({
          id: makeHistoryId(),
          skinId: skin.id,
          action: "sold",
          date: now
        })
      }
    }

    if (totalValue <= 0) return NextResponse.json({ error: "invalid_value" }, { status: 400 })

    const nextInventory = inventory.filter(i => !uids.includes(i.uid))
    
    const nextAccount = await patchAccount(code, {
      balance: account.balance + totalValue,
      inventory: nextInventory,
      itemHistory: [...newHistoryEntries, ...(account.itemHistory || [])].slice(0, 500),
      loggedIn: true,
    })

    console.info("[account-sell]", {
      code,
      itemsCount: itemsToSell.length,
      totalValue,
      balanceAfter: nextAccount.balance
    })

    return NextResponse.json({ success: true, account: nextAccount, total: totalValue })
  } catch (error) {
    console.error("[account-sell]", error)
    return NextResponse.json({ error: "sell_failed" }, { status: 500 })
  }
}
