import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { DEFAULT_STATE } from "@/lib/default-data"

const stateFilePath = path.join(process.cwd(), "app-state.json")

// Helper to remove skins arrays to save bandwidth/storage
function stripSkins(state: any) {
  const { skins, upgradeSkins, ...rest } = state
  return rest
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(stateFilePath, "utf8")
    const parsedState = JSON.parse(fileContent)
    return NextResponse.json(parsedState)
  } catch (error: any) {
    // If file doesn't exist, return default state stripped of skins
    if (error.code === "ENOENT") {
      const defaultStripped = stripSkins(DEFAULT_STATE)
      return NextResponse.json(defaultStripped)
    }
    return NextResponse.json({ error: "Failed to read state" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const strippedState = stripSkins(body)
    await fs.writeFile(stateFilePath, JSON.stringify(strippedState), "utf8")
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save state" }, { status: 500 })
  }
}
