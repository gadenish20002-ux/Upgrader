import type { Skin, AppState, InventoryItem } from "./types"

import skinsData from "./skins-data.json"
export const DEFAULT_SKINS: Skin[] = skinsData as Skin[];

const DEFAULT_INVENTORY: InventoryItem[] = [
  { uid: "inv-1", skinId: "skin-1" },
  { uid: "inv-2", skinId: "skin-2" },
  { uid: "inv-3", skinId: "skin-3" },
  { uid: "inv-4", skinId: "skin-4" },
]

export const DEFAULT_STATE: AppState = {
  balance: 1500,
  inventory: DEFAULT_INVENTORY,
  skins: DEFAULT_SKINS,
  upgradeSkins: DEFAULT_SKINS,
  loggedIn: false,
  username: "Player",
  avatar: null,
  online: 2172,
  upgrades: 132860345,
  predict: { outcome: "off", targetSkinId: null, hint: "x2", targetLosses: 3, currentLosses: 0, showPercentages: true, showMultipliers: true },
  adminPassword: "admin123",
  fastMode: false,
  fastMultipliers: [2, 4, 8],
  fastPercentages: [35, 55, 75],
  soundMode: "on",
}

export const RARITY_COLORS: Record<string, string> = {
  common: "#5e98d9",
  uncommon: "#4b69ff",
  rare: "#8847ff",
  mythical: "#d32ce6",
  legendary: "#eb4b4b",
  ancient: "#e4ae39",
}
