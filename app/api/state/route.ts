import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { DEFAULT_STATE } from "@/lib/default-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

const KV_KEY = "upgrader_global_state"

// Helper to remove skins arrays to save bandwidth/storage
function stripSkins(state: any) {
  const { skins, upgradeSkins, ...rest } = state
  return rest
}

export async function GET() {
  try {
    const data = await kv.get(KV_KEY)
    if (!data) {
      const defaultStripped = stripSkins(DEFAULT_STATE)
      return NextResponse.json(defaultStripped)
    }
    return NextResponse.json(data)
  } catch (error: any) {
    console.error("KV GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch state from KV" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const strippedState = stripSkins(body)
    await kv.set(KV_KEY, strippedState)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KV POST Error:", error)
    return NextResponse.json({ error: "Failed to save state" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const strippedState = stripSkins(body)
    
    let currentData = await kv.get<any>(KV_KEY)
    if (!currentData) {
      currentData = stripSkins(DEFAULT_STATE)
    }
    
    const nextData = { ...currentData, ...strippedState }
    
    await kv.set(KV_KEY, nextData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("KV PATCH Error:", error)
    return NextResponse.json({ error: "Failed to patch state" }, { status: 500 })
  }
}
