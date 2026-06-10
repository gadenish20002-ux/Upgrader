export type Rarity = "common" | "uncommon" | "rare" | "mythical" | "legendary" | "ancient"

export interface Skin {
  id: string
  name: string
  weapon: string
  wear: string // FN, MW, FT, WW, BS
  price: number
  image: string
  rarity: Rarity
}

export interface InventoryItem {
  uid: string // unique instance id
  skinId: string
}

export type PredictOutcome = "win" | "lose" | "off" | "win_after_losses"

export type PredictHint = "x2" | "x4" | "x8" | "35%" | "55%" | "75%"

export interface Predict {
  outcome: PredictOutcome
  // when forcing a win, this is the target skin id the next upgrade should win
  targetSkinId: string | null
  // hint shown on the predict page — which bet to make
  hint: PredictHint
  targetLosses: number
  currentLosses: number
  showPercentages: boolean
  showMultipliers: boolean
}

export interface GameHistoryEntry {
  id: string
  betPrice: number
  betSkinId: string
  targetPrice: number
  targetSkinId: string
  chance: number
  status: "win" | "loss" | "compensation"
  resultSkinId?: string
}

export interface AppState {
  balance: number
  inventory: InventoryItem[]
  skins: Skin[]
  upgradeSkins: Skin[]
  loggedIn: boolean
  username: string
  userId: string
  avatar: string | null
  online: number
  upgrades: number
  userUpgrades: number
  withdrawnItems: string[]
  predict: Predict
  adminPassword: string
  fastMode: boolean
  fastMultipliers: [number, number, number]
  fastPercentages: [number, number, number]
  soundMode: "on" | "off"
  gameHistory: GameHistoryEntry[]
}
