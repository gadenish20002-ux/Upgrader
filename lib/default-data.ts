import type { Skin, AppState, InventoryItem } from "./types"

import skinsData from "./skins-data.json"
export const DEFAULT_SKINS: Skin[] = skinsData as Skin[];

const DEFAULT_INVENTORY: InventoryItem[] = []

// Глобальный счётчик «Апгрейдов» привязан к реальному времени: он всегда
// показывает значение референса на текущий момент и продолжает расти со
// временем (в т.ч. между перезагрузками страницы), как на настоящем сайте.
// Перепривязка на 2026-06-13 13:40 МСК (10:40 UTC), значение = старая формула на тот момент,
// чтобы не было скачка назад при деплое. Темп увеличен (быстрее растёт).
const UPGRADES_ANCHOR_MS = Date.UTC(2026, 5, 13, 10, 40, 0) // 2026-06-13 13:40 МСК
const UPGRADES_ANCHOR_VALUE = 167_498_923
const UPGRADES_PER_SECOND = 4 // быстрее, чем раньше (было 2)

export function currentGlobalUpgrades(now: number = Date.now()): number {
  const elapsedSec = Math.max(0, (now - UPGRADES_ANCHOR_MS) / 1000)
  return UPGRADES_ANCHOR_VALUE + Math.floor(elapsedSec * UPGRADES_PER_SECOND)
}

export const DEFAULT_STATE: AppState = {
  balance: 1500,
  inventory: DEFAULT_INVENTORY,
  skins: DEFAULT_SKINS,
  upgradeSkins: DEFAULT_SKINS,
  loggedIn: false,
  username: "Player",
  userId: "1021165",
  avatar: null,
  online: 2172,
  upgrades: currentGlobalUpgrades(),
  userUpgrades: 0,
  itemHistory: [],
  withdrawnItems: undefined,
  predict: { outcome: "off", targetSkinId: null, hint: "x2", targetLosses: 3, currentLosses: 0, showPercentages: false, showMultipliers: false },
  adminPassword: "admin123",
  fastMode: false,
  fastMultipliers: [2, 4, 8],
  fastPercentages: [35, 55, 75],
  soundMode: "on",
  gameHistory: [],
}

export const RARITY_COLORS: Record<string, string> = {
  common: "#5e98d9",
  uncommon: "#4b69ff",
  rare: "#8847ff",
  mythical: "#8847ff",
  legendary: "#d32ce6",
  ancient: "#eb4b4b",
}

export const COMPENSATION_BONUS_ITEMS: Skin[] = [
  {
    id: "bonus-sticker-ihc-rio-2022",
    weapon: "Sticker",
    name: "IHC Esports | Rio 2022",
    wear: "",
    price: 2.36,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNioOinHtwQ6_Y_3pA3iQk6mmsCw-HECtqX9MaA4IaHLC2XEw7Zw5bZvHX7kxhh1tmrUnIm3MSXAZ4Xje8k/360fx360f",
  },
  {
    id: "bonus-sticker-g2-austin-2025",
    weapon: "Sticker",
    name: "G2 Esports | Austin 2025",
    wear: "",
    price: 2.74,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM689W6vVjjER-ims6y-HQNu_H8avBuJKnLDzPAkr8k6OdtFnvhwE9zsG_UwsHpLywUtj0iGw/360fx360f",
  },
  {
    id: "bonus-graffiti-rage-mode",
    weapon: "Sealed Graffiti",
    name: "Rage Mode",
    wear: "",
    price: 3.46,
    rarity: "common",
    image:
      "https://community.akamai.steamstatic.com/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh31CIyHz2GZ-KuFpPsrTzBG0pPSEEEvycTKKdnKIHV0wHOdYYz3b-Tuls-3AFDudFOEqQQsGKfQFoWZKbMuLahE615lLpWL-lEtxEQQlZ8lSeR-30ykXZb58nSNwEqb_cg/360fx360f",
  },
  {
    id: "bonus-sticker-electronic-stockholm-2021",
    weapon: "Sticker",
    name: "electroNic | Stockholm 2021",
    wear: "",
    price: 1.51,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta7-VDgfhj9m5X07y1V5vHgMKBpdfHGCjXElLgi5rQ4HS_jwh4ltm6Ew4ygJSjCbg52ApYmQeUD5g74zIN7Cxi4Yw/360fx360f",
  },
  {
    id: "bonus-sticker-cadian-paris-2023",
    weapon: "Sticker",
    name: "cadiaN (Glitter) | Paris 2023",
    wear: "",
    price: 3.61,
    rarity: "mythical",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jn417YQhz1l5fuwiVX5ua6bbYjd_bAXWWRmbgi4rk4HijrwR4k5GSDzYn8cS6WbwIhXMYhQ-4DsUHrlMqnab38mVd6ng/360fx360f",
  },
  {
    id: "bonus-sticker-skullz-budapest-2025",
    weapon: "Sticker",
    name: "skullz (Embroidered) | Budapest 2025",
    wear: "",
    price: 6.24,
    rarity: "mythical",
    image:
      "https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1UrsVBH9hKnl8CBJ4PuqbbZoJL6WDGLFlux14Oc5S33mlx90tWWEmNutci7GOlIkXJdyQ-UOuxi_k4bmKaq8sAE_Zr6K/360fx360f",
  },
  {
    id: "bonus-sticker-mercury-austin-2025",
    weapon: "Sticker",
    name: "Mercury | Austin 2025",
    wear: "",
    price: 7.75,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VTiUx7kjI-uqnYPvqL-bf01dqPKC2WUx7ch4Lg4Fnzqwx8itWSHz479cimXZgcmD4wwG7B7VYiwng/360fx360f",
  },
  {
    id: "bonus-charm-mezii-budapest-2025",
    weapon: "Souvenir Charm",
    name: "Budapest 2025 Highlight | mezii vs FaZe on Inferno",
    wear: "",
    price: 15.67,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWjIH_FtQQgu4z31VvyRU-hzMOurHcDvfOrOPFucfWWDDaTxbwl5LBvSnrgxhsk4TjSn437J3zGOFcmCYwwG7A7om1dgw/360fx360f",
  },
]
