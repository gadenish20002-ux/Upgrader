import { NextResponse } from "next/server"
import type { ItemHistoryEntry } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, ADMIN_ACCOUNT } from "@/lib/keys"

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

function makeHistoryId(): string {
  return `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
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

    const account = await getAccount(code)
    const inventory = account.inventory || []
    
    const itemsToWithdraw = inventory.filter(i => uids.includes(i.uid))
    if (itemsToWithdraw.length !== uids.length) return NextResponse.json({ error: "item_not_found" }, { status: 400 })

    const now = Date.now()
    const newHistoryEntries: ItemHistoryEntry[] = itemsToWithdraw.map(item => ({
      id: makeHistoryId(),
      skinId: item.skinId,
      action: "withdrawn",
      date: now
    }))

    const nextInventory = inventory.filter(i => !uids.includes(i.uid))
    
    const nextAccount = await patchAccount(code, {
      inventory: nextInventory,
      itemHistory: [...newHistoryEntries, ...(account.itemHistory || [])].slice(0, 500),
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
