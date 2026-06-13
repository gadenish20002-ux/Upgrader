import { NextResponse } from "next/server"
import skinsData from "@/lib/skins-data.json"
import type { Skin } from "@/lib/types"

// Внутренний эндпоинт для нашего фронтенда: отдаёт актуальную базу скинов.
// Данные обновляет фоновый воркер (worker/syncSkins.js), переписывая lib/skins-data.json.
//
// Поддерживает пагинацию ?offset=&limit= (по умолчанию отдаёт весь список).
// Данные бандлятся на билде (lib/skins-data.json), поэтому ответ кэшируется на CDN.
export const dynamic = "force-dynamic"

const ALL = skinsData as Skin[]
// Кэш на CDN: свежесть данных определяется ре-деплоем/обновлением воркера.
const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limitParam = searchParams.get("limit")
  const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10) || 0)

  if (limitParam == null) {
    return NextResponse.json({ items: ALL, total: ALL.length }, { headers: CACHE_HEADERS })
  }

  const limit = Math.max(1, Math.min(500, parseInt(limitParam, 10) || 19))
  const items = ALL.slice(offset, offset + limit)
  return NextResponse.json(
    {
      items,
      total: ALL.length,
      offset,
      limit,
      hasMore: offset + limit < ALL.length,
    },
    { headers: CACHE_HEADERS },
  )
}
