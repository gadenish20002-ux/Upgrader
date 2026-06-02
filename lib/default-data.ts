import type { Skin, AppState, InventoryItem } from "./types"

export const DEFAULT_SKINS: Skin[] = [
  { id: "skin-1", name: "SERGEANT", weapon: "StatTrak™ FAMAS", wear: "FN", price: 720, image: "/assets/images/skins/skin-1.png", rarity: "uncommon" },
  { id: "skin-2", name: "AERIAL", weapon: "SG 553", wear: "FN", price: 430, image: "/assets/images/skins/skin-2.png", rarity: "uncommon" },
  { id: "skin-3", name: "LUSH RUINS", weapon: "SG 553", wear: "MW", price: 890, image: "/assets/images/skins/skin-3.png", rarity: "rare" },
  { id: "skin-4", name: "VOGUE", weapon: "Glock-18", wear: "FN", price: 5400, image: "/assets/images/skins/skin-4.png", rarity: "mythical" },
  { id: "skin-5", name: "NIGHTMODE", weapon: "Music Kit", wear: "FN", price: 1200, image: "/assets/images/skins/skin-5.png", rarity: "uncommon" },
  { id: "skin-6", name: "AXIA", weapon: "Glock-18", wear: "FN", price: 1100, image: "/assets/images/skins/skin-6.png", rarity: "rare" },
  { id: "skin-7", name: "POLYSOUP", weapon: "M4A4", wear: "FN", price: 650, image: "/assets/images/skins/skin-7.png", rarity: "uncommon" },
  { id: "skin-8", name: "MIDNIGHT PALM", weapon: "CZ75-Auto", wear: "FT", price: 380, image: "/assets/images/skins/skin-8.png", rarity: "uncommon" },
  { id: "skin-9", name: "WASTELAND REBEL", weapon: "M4A1-S", wear: "MW", price: 2100, image: "/assets/images/skins/skin-9.png", rarity: "rare" },
  { id: "skin-10", name: "PHOENIX BLACKLIGHT", weapon: "Desert Eagle", wear: "FN", price: 7800, image: "/assets/images/skins/skin-10.png", rarity: "mythical" },
  { id: "skin-11", name: "CRIMSON WEB", weapon: "Desert Eagle", wear: "MW", price: 14500, image: "/assets/images/skins/skin-11.png", rarity: "legendary" },
  { id: "skin-12", name: "NAVY MURANO", weapon: "AUG", wear: "MW", price: 950, image: "/assets/images/skins/skin-12.png", rarity: "uncommon" },
  { id: "skin-13", name: "HIEROGLYPH", weapon: "XM1014", wear: "FN", price: 1800, image: "/assets/images/skins/skin-13.png", rarity: "rare" },
  { id: "skin-14", name: "COLD FUSION", weapon: "Souvenir Galil AR", wear: "FN", price: 3200, image: "/assets/images/skins/skin-14.png", rarity: "ancient" },
  { id: "skin-15", name: "TRIUMVIRATE", weapon: "Five-SeveN", wear: "FN", price: 2850, image: "/assets/images/skins/skin-15.png", rarity: "uncommon" },
  { id: "skin-16", name: "FLASHBACK", weapon: "AWP", wear: "MW", price: 6300, image: "/assets/images/skins/skin-16.png", rarity: "legendary" },
  { id: "skin-17", name: "FOREST DDPAT", weapon: "AK-47", wear: "FT", price: 310, image: "/assets/images/skins/skin-17.png", rarity: "uncommon" },
  { id: "skin-18", name: "VULCAN", weapon: "AK-47", wear: "FN", price: 12400, image: "/assets/images/skins/skin-18.png", rarity: "legendary" },
  { id: "skin-19", name: "SAND DUNE", weapon: "AK-47", wear: "FT", price: 280, image: "/assets/images/skins/skin-19.png", rarity: "uncommon" },
  { id: "skin-20", name: "NEON RIDER", weapon: "M4A1-S", wear: "FN", price: 18700, image: "/assets/images/skins/skin-20.png", rarity: "mythical" },
]

const DEFAULT_INVENTORY: InventoryItem[] = [
  { uid: "inv-1", skinId: "skin-18" },
  { uid: "inv-2", skinId: "skin-16" },
  { uid: "inv-3", skinId: "skin-4" },
  { uid: "inv-4", skinId: "skin-11" },
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
  predict: { outcome: "off", targetSkinId: null, hint: "x2" },
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
