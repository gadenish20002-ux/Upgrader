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
  // Admin "у края": the pointer stops at the very edge of the win sector
  // (just inside on forced wins, just outside on forced losses).
  edgeMode?: boolean
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

export type ItemHistoryAction = "sold" | "withdrawn" | "compensation" | "upgrade" | "bought"

export interface ItemHistoryEntry {
  id: string
  skinId: string
  action: ItemHistoryAction
  date: number
}

// An item the player sent to withdrawal: it leaves the inventory immediately,
// shows as "Ждем продавца" for ~1 minute, then completes into itemHistory.
export interface PendingWithdrawal {
  uid: string
  skinId: string
  startedAt: number
}

export interface PendingUpgrade {
  id: string
  createdAt: number
  targetSkinId: string
  wonItem: InventoryItem
  itemHistoryEntries: ItemHistoryEntry[]
  gameHistoryEntry: GameHistoryEntry
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
  itemHistory: ItemHistoryEntry[]
  withdrawnItems?: string[] // keep as optional for backwards compatibility during migration
  // Items awaiting the "Ждем продавца" withdrawal window.
  pendingWithdrawals?: PendingWithdrawal[]
  // Persistent withdrawal counters: itemHistory is capped at 500 entries, so
  // counting "withdrawn" entries there loses data once history overflows.
  withdrawnCount?: number
  withdrawnTotal?: number
  predict: Predict
  adminPassword: string
  fastMode: boolean
  fastMultipliers: [number, number, number]
  fastPercentages: [number, number, number]
  soundMode: "on" | "off"
  gameHistory: GameHistoryEntry[]
  pendingUpgrade?: PendingUpgrade | null
}
