import { NextResponse } from "next/server"
import type { PendingWithdrawal, Skin } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, ADMIN_ACCOUNT } from "@/lib/keys"
import { STATIC_SKINS, applyCatalogPrices, getCatalogAdditionalSkins, getCatalogPriceMeta, getCatalogPrices } from "@/lib/catalog-prices"
import { COMPENSATION_BONUS_ITEMS } from "@/lib/default-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

type WithdrawBody = {
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

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const body = (await request.json()) as WithdrawBody
    const uids = Array.isArray(body.uids) ? body.uids.filter((id): id is string => typeof id === "string" && id.length > 0) : []
    if (uids.length === 0) return NextResponse.json({ error: "empty_uids" }, { status: 400 })

    const [account, catalog] = await Promise.all([getAccount(code), getCatalog()])
    const inventory = account.inventory || []
    
    const itemsToWithdraw = inventory.filter(i => uids.includes(i.uid))
    if (itemsToWithdraw.length !== uids.length) return NextResponse.json({ error: "item_not_found" }, { status: 400 })

    const now = Date.now()
    const byId = new Map(catalog.map((skin) => [skin.id, skin]))
    // The item leaves the inventory immediately and waits in "Ждем продавца"
    // for ~1 minute (settled lazily by GET /api/account). The withdrawal
    // counters are incremented right away and persist independently of the
    // 500-entry itemHistory cap — this is what keeps "Выведено" from resetting.
    const newPending: PendingWithdrawal[] = itemsToWithdraw.map(item => ({
      uid: item.uid,
      skinId: item.skinId,
      startedAt: now,
    }))
    const withdrawnValue = itemsToWithdraw.reduce((acc, item) => acc + (byId.get(item.skinId)?.price || 0), 0)

    const nextInventory = inventory.filter(i => !uids.includes(i.uid))
    
    const nextAccount = await patchAccount(code, {
      inventory: nextInventory,
      pendingWithdrawals: [...newPending, ...(account.pendingWithdrawals || [])],
      withdrawnCount: (account.withdrawnCount || 0) + itemsToWithdraw.length,
      withdrawnTotal: (account.withdrawnTotal || 0) + withdrawnValue,
      loggedIn: true,
    })

    console.info("[account-withdraw]", {
      code,
      itemsCount: itemsToWithdraw.length
    })

    return NextResponse.json({ success: true, account: nextAccount })
  } catch (error) {
    console.error("[account-withdraw]", error)
    return NextResponse.json({ error: "withdraw_failed" }, { status: 500 })
  }
}
