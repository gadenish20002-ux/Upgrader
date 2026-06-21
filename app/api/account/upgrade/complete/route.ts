import { NextResponse } from "next/server"
import { ADMIN_ACCOUNT, getAccount, getKey, keyStatus, normalizeCode, patchAccount } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function authorize(code: string): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  if (!code) return { ok: false, status: 400, reason: "empty" }
  if (code === ADMIN_ACCOUNT) return { ok: true }

  const key = await getKey(code)
  const status = keyStatus(key)
  if (status !== "active") return { ok: false, status: 403, reason: status }
  return { ok: true }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const body = (await request.json()) as { pendingId?: unknown }
    const pendingId = typeof body.pendingId === "string" ? body.pendingId : ""
    if (!pendingId) return NextResponse.json({ error: "missing_pending_id" }, { status: 400 })

    const account = await getAccount(code)
    const pending = account.pendingUpgrade
    if (!pending || pending.id !== pendingId) {
      return NextResponse.json({ error: "pending_upgrade_not_found", account }, { status: 409 })
    }

    const alreadyPresent = (account.inventory || []).some((item) => item.uid === pending.wonItem.uid)
    const nextAccount = await patchAccount(code, {
      inventory: alreadyPresent ? account.inventory : [pending.wonItem, ...(account.inventory || [])],
      itemHistory: [...pending.itemHistoryEntries, ...(account.itemHistory || [])].slice(0, 500),
      gameHistory: [pending.gameHistoryEntry, ...(account.gameHistory || [])].slice(0, 500),
      userUpgrades: (account.userUpgrades || 0) + 1,
      pendingUpgrade: null,
      loggedIn: true,
    })

    return NextResponse.json({ success: true, account: nextAccount, wonItem: pending.wonItem })
  } catch (error) {
    console.error("[account-upgrade-complete]", error)
    return NextResponse.json({ error: "upgrade_complete_failed" }, { status: 500 })
  }
}
