import { NextResponse } from "next/server"
import { kv } from "@/lib/kv"
import { DEFAULT_STATE, currentGlobalUpgrades } from "@/lib/default-data"
import { isAdmin, saveAdminPassword } from "@/lib/keys"

export const dynamic = "force-dynamic"
export const revalidate = 0

const KV_KEY = "upgrader_global_state"

const ACCOUNT_FIELD_NAMES = new Set([
  "balance",
  "inventory",
  "loggedIn",
  "username",
  "userId",
  "avatar",
  "userUpgrades",
  "itemHistory",
  "withdrawnItems",
  "gameHistory",
  "fastMultipliers",
  "fastPercentages",
  "soundMode",
  "fastMode",
])

function stripGlobalState(state: any) {
  const { skins, upgradeSkins, ...rest } = state || {}
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(rest)) {
    if (!ACCOUNT_FIELD_NAMES.has(key)) out[key] = value
  }
  return out
}

export async function GET() {
  try {
    const data = await kv.get(KV_KEY)
    if (!data) {
      const defaultGlobal = stripGlobalState(DEFAULT_STATE)
      return NextResponse.json({ ...defaultGlobal, upgrades: currentGlobalUpgrades() })
    }
    return NextResponse.json({ ...stripGlobalState(data), upgrades: currentGlobalUpgrades() })
  } catch (error: any) {
    console.error("KV GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch state from KV" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const globalState = stripGlobalState(body)
    if (typeof globalState.adminPassword === "string") {
      if (!(await isAdmin(request.headers.get("x-admin-password")))) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
      }
      await saveAdminPassword(globalState.adminPassword)
    }
    await kv.set(KV_KEY, globalState)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KV POST Error:", error)
    return NextResponse.json({ error: "Failed to save state" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const globalPatch = stripGlobalState(body)
    if (typeof globalPatch.adminPassword === "string") {
      if (!(await isAdmin(request.headers.get("x-admin-password")))) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 })
      }
      await saveAdminPassword(globalPatch.adminPassword)
    }
    let currentData = await kv.get<any>(KV_KEY)
    if (!currentData) currentData = stripGlobalState(DEFAULT_STATE)
    const nextData = { ...stripGlobalState(currentData), ...globalPatch }
    await kv.set(KV_KEY, nextData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KV PATCH Error:", error)
    return NextResponse.json({ error: "Failed to patch state" }, { status: 500 })
  }
}
