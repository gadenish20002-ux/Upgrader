import { kv } from "./kv"
import skinsData from "./skins-data.json"
import type { Skin } from "./types"

export const CATALOG_PRICES_KV = "upgrader_catalog_prices_v1"
export const CATALOG_META_KV = "upgrader_catalog_prices_meta_v1"
const CATALOG_ADDITIONS_PREFIX = "upgrader_catalog_additions_v1:"

export const STATIC_SKINS = skinsData as Skin[]

export type CatalogPriceMap = Record<string, number>

export interface CatalogPriceMeta {
  updatedAt: number
  source: "steam-market-sales"
  multiplier: number
  total: number
  staticTotal: number
  matched: number
  updated: number
  missing: number
  rejected: number
  additional: number
  chunks: number
}

type SteamPriceRecord = {
  last_24h?: number | null
  last_7d?: number | null
  last_30d?: number | null
  last_90d?: number | null
}

type SteamSkinMetadata = {
  id?: string
  market_hash_name?: string
  image?: string
  weapon?: { name?: string }
  pattern?: { name?: string }
  wear?: { name?: string }
  rarity?: { color?: string; id?: string }
  stattrak?: boolean
  souvenir?: boolean
}

const STEAM_PRICES_URL = "https://prices.csgotrader.app/latest/steam.json"
const STEAM_SKINS_URL = "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json"
const DEFAULT_MULTIPLIER = 78
const MIN_REASONABLE_RATIO = 0.1
const MAX_REASONABLE_RATIO = 10
const ADDITION_CHUNK_SIZE = 400
const READ_CACHE_TTL_MS = 10 * 60 * 1000

let pricesCache: { value: CatalogPriceMap; expiresAt: number } | null = null
let metaCache: { value: CatalogPriceMeta | null; expiresAt: number } | null = null
let additionsCache: { value: Skin[]; chunks: number; updatedAt: number | null; expiresAt: number } | null = null

function cacheValid(expiresAt: number): boolean {
  return Date.now() < expiresAt
}

function cleanPrefix(value: string, prefix: string): string {
  return value.replace(new RegExp(prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "").trim()
}

function normalizeWear(wear: string): string {
  const aliases: Record<string, string> = {
    FN: "Factory New",
    MW: "Minimal Wear",
    FT: "Field-Tested",
    WW: "Well-Worn",
    BS: "Battle-Scarred",
  }
  const trimmed = String(wear || "").trim()
  return aliases[trimmed.toUpperCase()] || trimmed
}

/**
 * Builds Steam market_hash_name candidates without changing the IDs used by
 * inventories and game history. Older imports placed StatTrak/Souvenir either
 * in `weapon` or in `name`, so both forms are normalized here.
 */
export function marketHashCandidates(skin: Skin): string[] {
  const wear = normalizeWear(skin.wear)
  if (!wear) return []

  const rawWeapon = String(skin.weapon || "").trim()
  const rawName = String(skin.name || "").trim()
  if (!rawWeapon || !rawName) return []

  const candidates = new Set<string>()
  candidates.add(`${rawWeapon} | ${rawName} (${wear})`)

  const statTrak = /StatTrak™?/i.test(rawWeapon) || /StatTrak™?/i.test(rawName)
  const souvenir = /Souvenir/i.test(rawWeapon) || /Souvenir/i.test(rawName)
  const starred = rawWeapon.includes("★")

  let weapon = cleanPrefix(rawWeapon, "StatTrak™")
  weapon = cleanPrefix(weapon, "StatTrak")
  weapon = cleanPrefix(weapon, "Souvenir")
  weapon = weapon.replace(/★/g, "").trim()

  let name = cleanPrefix(rawName, "StatTrak™")
  name = cleanPrefix(name, "StatTrak")
  name = cleanPrefix(name, "Souvenir")

  const prefix = `${starred ? "★ " : ""}${statTrak ? "StatTrak™ " : souvenir ? "Souvenir " : ""}`
  candidates.add(`${prefix}${weapon} | ${name} (${wear})`)

  return [...candidates]
}

function selectSteamUsd(record: SteamPriceRecord | null | undefined): number | null {
  if (!record) return null
  // Prefer the newest actual sale window, then widen it for less liquid skins.
  for (const value of [record.last_24h, record.last_7d, record.last_30d, record.last_90d]) {
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value
  }
  return null
}

function rarityFromMetadata(item: SteamSkinMetadata): Skin["rarity"] {
  const color = String(item.rarity?.color || "").replace(/^#/, "").toLowerCase()
  if (color === "b0c3d9" || color === "5e98d9") return "common"
  if (color === "4b69ff") return "uncommon"
  if (color === "8847ff") return "rare"
  if (color === "d32ce6") return "legendary"
  if (color === "eb4b4b" || color === "e4ae39" || color === "ffd700") return "ancient"
  return "rare"
}

function metadataToSkin(item: SteamSkinMetadata, price: number): Skin | null {
  const marketHash = String(item.market_hash_name || "").trim()
  const wear = String(item.wear?.name || "").trim()
  const image = String(item.image || "").trim()
  if (!marketHash || !wear || !image || !item.id) return null

  const pipe = marketHash.indexOf(" | ")
  if (pipe < 1) return null
  const weapon = marketHash.slice(0, pipe).trim()
  const fallbackName = marketHash.slice(pipe + 3).replace(/\s*\([^)]+\)\s*$/, "").trim()
  const name = String(item.pattern?.name || fallbackName).trim()
  if (!weapon || !name) return null

  return {
    id: `steam-${item.id}`,
    name,
    weapon,
    wear,
    price,
    image,
    rarity: rarityFromMetadata(item),
  }
}

export function catalogMultiplier(): number {
  const configured = Number(process.env.CATALOG_STEAM_USD_MULTIPLIER)
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_MULTIPLIER
}

export async function getCatalogPrices(): Promise<CatalogPriceMap> {
  if (pricesCache && cacheValid(pricesCache.expiresAt)) return pricesCache.value
  const value = (await kv.get<CatalogPriceMap>(CATALOG_PRICES_KV)) || {}
  pricesCache = { value, expiresAt: Date.now() + READ_CACHE_TTL_MS }
  return value
}

export async function getCatalogPriceMeta(): Promise<CatalogPriceMeta | null> {
  if (metaCache && cacheValid(metaCache.expiresAt)) return metaCache.value
  const value = (await kv.get<CatalogPriceMeta>(CATALOG_META_KV)) || null
  metaCache = { value, expiresAt: Date.now() + READ_CACHE_TTL_MS }
  return value
}

export async function getCatalogAdditionalSkins(meta?: CatalogPriceMeta | null): Promise<Skin[]> {
  const currentMeta = meta === undefined ? await getCatalogPriceMeta() : meta
  const chunks = Math.max(0, currentMeta?.chunks || 0)
  if (chunks === 0) return []
  const updatedAt = currentMeta?.updatedAt || null
  if (
    additionsCache &&
    additionsCache.chunks === chunks &&
    additionsCache.updatedAt === updatedAt &&
    cacheValid(additionsCache.expiresAt)
  ) {
    return additionsCache.value
  }

  const values = await Promise.all(
    Array.from({ length: chunks }, (_, index) => kv.get<Skin[]>(`${CATALOG_ADDITIONS_PREFIX}${index}`)),
  )
  const value = values.flatMap((chunk) => chunk || [])
  additionsCache = { value, chunks, updatedAt, expiresAt: Date.now() + READ_CACHE_TTL_MS }
  return value
}

export function applyCatalogPrices(skins: Skin[], prices: CatalogPriceMap): Skin[] {
  if (!prices || Object.keys(prices).length === 0) return skins
  return skins.map((skin) => {
    const price = prices[skin.id]
    return typeof price === "number" && Number.isFinite(price) && price > 0
      ? { ...skin, price }
      : skin
  })
}

export async function syncCatalogPrices(): Promise<CatalogPriceMeta> {
  const [priceResponse, metadataResponse] = await Promise.all([
    fetch(STEAM_PRICES_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
      },
    }),
    fetch(STEAM_SKINS_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
      },
    }),
  ])

  if (!priceResponse.ok) throw new Error(`Steam price feed returned HTTP ${priceResponse.status}`)
  if (!metadataResponse.ok) throw new Error(`Steam metadata feed returned HTTP ${metadataResponse.status}`)

  const [steamPrices, steamSkins] = await Promise.all([
    priceResponse.json() as Promise<Record<string, SteamPriceRecord>>,
    metadataResponse.json() as Promise<SteamSkinMetadata[]>,
  ])
  if (!steamPrices || typeof steamPrices !== "object") throw new Error("Steam price feed returned invalid JSON")
  if (!Array.isArray(steamSkins)) throw new Error("Steam metadata feed returned invalid JSON")

  const multiplier = catalogMultiplier()
  const prices: CatalogPriceMap = {}
  const staticByMarketHash = new Map<string, Skin>()
  for (const skin of STATIC_SKINS) {
    for (const candidate of marketHashCandidates(skin)) {
      if (!staticByMarketHash.has(candidate)) staticByMarketHash.set(candidate, skin)
    }
  }

  let matched = 0
  let rejected = 0

  for (const skin of STATIC_SKINS) {
    let steamUsd: number | null = null
    for (const candidate of marketHashCandidates(skin)) {
      steamUsd = selectSteamUsd(steamPrices[candidate])
      if (steamUsd !== null) break
    }

    if (steamUsd === null) continue
    matched += 1

    const nextPrice = Math.round(steamUsd * multiplier * 100) / 100
    const ratio = skin.price > 0 ? nextPrice / skin.price : 1

    // A mismatched market name must never destroy the catalog. Exact Steam names
    // normally stay well inside this broad range; outliers retain the old price.
    if (
      !Number.isFinite(nextPrice) ||
      nextPrice <= 0 ||
      ratio < MIN_REASONABLE_RATIO ||
      ratio > MAX_REASONABLE_RATIO
    ) {
      rejected += 1
      continue
    }

    prices[skin.id] = nextPrice
  }

  const additions: Skin[] = []
  const seenMarketHashes = new Set<string>()
  for (const item of steamSkins) {
    const marketHash = String(item.market_hash_name || "").trim()
    if (!marketHash || seenMarketHashes.has(marketHash) || staticByMarketHash.has(marketHash)) continue
    seenMarketHashes.add(marketHash)

    const steamUsd = selectSteamUsd(steamPrices[marketHash])
    if (steamUsd === null) continue
    const nextPrice = Math.round(steamUsd * multiplier * 100) / 100
    if (!Number.isFinite(nextPrice) || nextPrice <= 0) continue

    const skin = metadataToSkin(item, nextPrice)
    if (skin) additions.push(skin)
  }

  if (Object.keys(prices).length === 0 && additions.length === 0) {
    throw new Error("Steam sync matched zero safe catalog items; previous snapshot preserved")
  }

  const additionChunks: Skin[][] = []
  for (let index = 0; index < additions.length; index += ADDITION_CHUNK_SIZE) {
    additionChunks.push(additions.slice(index, index + ADDITION_CHUNK_SIZE))
  }

  const previousMeta = await getCatalogPriceMeta()
  await Promise.all(
    additionChunks.map((chunk, index) => kv.set(`${CATALOG_ADDITIONS_PREFIX}${index}`, chunk)),
  )
  if ((previousMeta?.chunks || 0) > additionChunks.length) {
    await Promise.all(
      Array.from(
        { length: (previousMeta?.chunks || 0) - additionChunks.length },
        (_, index) => kv.del(`${CATALOG_ADDITIONS_PREFIX}${additionChunks.length + index}`),
      ),
    )
  }

  const meta: CatalogPriceMeta = {
    updatedAt: Date.now(),
    source: "steam-market-sales",
    multiplier,
    total: STATIC_SKINS.length + additions.length,
    staticTotal: STATIC_SKINS.length,
    matched,
    updated: Object.keys(prices).length,
    missing: STATIC_SKINS.length - matched,
    rejected,
    additional: additions.length,
    chunks: additionChunks.length,
  }

  // Write prices first and metadata last. Readers either see the previous
  // complete snapshot or the new complete snapshot; an empty result is never saved.
  await kv.set(CATALOG_PRICES_KV, prices)
  await kv.set(CATALOG_META_KV, meta)
  pricesCache = { value: prices, expiresAt: Date.now() + READ_CACHE_TTL_MS }
  metaCache = { value: meta, expiresAt: Date.now() + READ_CACHE_TTL_MS }
  additionsCache = { value: additions, chunks: meta.chunks, updatedAt: meta.updatedAt, expiresAt: Date.now() + READ_CACHE_TTL_MS }

  return meta
}
