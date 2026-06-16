import { kv } from "@vercel/kv"
import skinsData from "./skins-data.json"
import type { Skin } from "./types"

export const CATALOG_PRICES_KV = "upgrader_catalog_prices_v1"
export const CATALOG_META_KV = "upgrader_catalog_prices_meta_v1"

export const STATIC_SKINS = skinsData as Skin[]

export type CatalogPriceMap = Record<string, number>

export interface CatalogPriceMeta {
  updatedAt: number
  source: "steam-market-sales"
  multiplier: number
  total: number
  matched: number
  updated: number
  missing: number
  rejected: number
}

type SteamPriceRecord = {
  last_24h?: number | null
  last_7d?: number | null
  last_30d?: number | null
  last_90d?: number | null
}

const STEAM_PRICES_URL = "https://prices.csgotrader.app/latest/steam.json"
const DEFAULT_MULTIPLIER = 78
const MIN_REASONABLE_RATIO = 0.1
const MAX_REASONABLE_RATIO = 10

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

export function catalogMultiplier(): number {
  const configured = Number(process.env.CATALOG_STEAM_USD_MULTIPLIER)
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_MULTIPLIER
}

export async function getCatalogPrices(): Promise<CatalogPriceMap> {
  return (await kv.get<CatalogPriceMap>(CATALOG_PRICES_KV)) || {}
}

export async function getCatalogPriceMeta(): Promise<CatalogPriceMeta | null> {
  return (await kv.get<CatalogPriceMeta>(CATALOG_META_KV)) || null
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
  const response = await fetch(STEAM_PRICES_URL, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; UpgraderCatalog/1.0)",
    },
  })

  if (!response.ok) {
    throw new Error(`Steam price feed returned HTTP ${response.status}`)
  }

  const steamPrices = (await response.json()) as Record<string, SteamPriceRecord>
  if (!steamPrices || typeof steamPrices !== "object") {
    throw new Error("Steam price feed returned invalid JSON")
  }

  const multiplier = catalogMultiplier()
  const prices: CatalogPriceMap = {}
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

  if (Object.keys(prices).length === 0) {
    throw new Error("Steam sync matched zero safe catalog prices; previous snapshot preserved")
  }

  const meta: CatalogPriceMeta = {
    updatedAt: Date.now(),
    source: "steam-market-sales",
    multiplier,
    total: STATIC_SKINS.length,
    matched,
    updated: Object.keys(prices).length,
    missing: STATIC_SKINS.length - matched,
    rejected,
  }

  // Write prices first and metadata second. Readers either see the previous
  // complete snapshot or the new complete snapshot; an empty result is never saved.
  await kv.set(CATALOG_PRICES_KV, prices)
  await kv.set(CATALOG_META_KV, meta)

  return meta
}
