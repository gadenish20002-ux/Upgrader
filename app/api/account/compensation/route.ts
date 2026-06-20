import { NextResponse } from "next/server"
import type { ItemHistoryEntry } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, ADMIN_ACCOUNT } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

type CompensationBody = {
  skinId: string
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

    const body = (await request.json()) as CompensationBody
    const { skinId } = body
    if (!skinId) return NextResponse.json({ error: "missing_skin" }, { status: 400 })

    const account = await getAccount(code)
    const now = Date.now()
    
    const uid = makeUid()
    const newHistoryEntry: ItemHistoryEntry = {
      id: makeHistoryId(),
      skinId,
      action: "compensation",
      date: now
    }
    
    const nextAccount = await patchAccount(code, {
      inventory: [{ uid, skinId }, ...(account.inventory || [])],
      itemHistory: [newHistoryEntry, ...(account.itemHistory || [])].slice(0, 500),
      loggedIn: true,
    })

    console.info("[account-compensation]", {
      code,
      skinId,
      uid
    })

    return NextResponse.json({ success: true, account: nextAccount, uid })
  } catch (error) {
    console.error("[account-compensation]", error)
    return NextResponse.json({ error: "compensation_failed" }, { status: 500 })
  }
}
