"use client"

import { useEffect, useState, useMemo } from "react"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"
import { formatWeaponName, formatSkinName } from "@/lib/utils"
import { LiveDropAnimation } from "./live-drop-animation"
import { Backpack, Store, Search, ShoppingCart } from "lucide-react"

function publicLoginKey() {
  try {
    const key = window.localStorage.getItem("upgrader_account_key") || "none"
    return `upgrader_public_logged_in:${key}`
  } catch {
    return "upgrader_public_logged_in:none"
  }
}

function readPublicLogin() {
  try {
    return window.localStorage.getItem(publicLoginKey()) === "1"
  } catch {
    return false
  }
}

function markPublicLogin() {
  try {
    window.localStorage.setItem(publicLoginKey(), "1")
    window.dispatchEvent(new CustomEvent("upgrader-public-login-changed"))
  } catch {}
}

export function InventoryPanel({
  selectedUids,
  onToggle,
  mode,
  setMode,
  selectedShopIds,
  onToggleShopItem,
  onAddShopItem,
  onRemoveShopItem,
  onOpenCart,
  isSpinning,
}: {
  selectedUids: string[]
  onToggle: (uid: string) => void
  mode: "inventory" | "shop"
  setMode: (mode: "inventory" | "shop") => void
  selectedShopIds: string[]
  onToggleShopItem: (id: string) => void
  onAddShopItem?: (id: string) => void
  onRemoveShopItem?: (id: string) => void
  onOpenCart?: () => void
  onQuickBuy?: () => void
  isSpinning?: boolean
}) {
  const { state, login } = useStore()
  const [publicLoggedIn, setPublicLoggedIn] = useState(false)
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const refresh = () => setPublicLoggedIn(readPublicLogin())
    refresh()
    window.addEventListener("storage", refresh)
    window.addEventListener("upgrader-account-key-changed", refresh as EventListener)
    window.addEventListener("upgrader-public-login-changed", refresh as EventListener)
    return () => {
      window.removeEventListener("storage", refresh)
      window.removeEventListener("upgrader-account-key-changed", refresh as EventListener)
      window.removeEventListener("upgrader-public-login-changed", refresh as EventListener)
    }
  }, [])

  const loggedIn = state.loggedIn || publicLoggedIn

  useEffect(() => {
    setCurrentPage(1)
  }, [mode, sortOrder, minPrice, maxPrice, searchQuery, state.inventory.length])

  const displayedSkins = useMemo(() => {
    const skins = mode === "shop" ? state.skins : state.inventory.filter((item) => {
      if (isSpinning && selectedUids.includes(item.uid)) return false
      return getSkin(state.skins, item.skinId)
    })

    return [...skins].filter((item) => {
      const skin = mode === "shop" ? (item as any) : getSkin(state.skins, (item as any).skinId)
      if (!skin) return false
      if (mode === "shop" && minPrice && skin.price < parseFloat(minPrice)) return false
      if (mode === "shop" && maxPrice && skin.price > parseFloat(maxPrice)) return false
      if (mode === "shop" && searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!skin.name?.toLowerCase().includes(q) && !skin.weapon?.toLowerCase().includes(q)) return false
      }
      return true
    }).sort((a, b) => {
      const skinA = mode === "shop" ? (a as any) : getSkin(state.skins, (a as any).skinId)
      const skinB = mode === "shop" ? (b as any) : getSkin(state.skins, (b as any).skinId)
      if (!skinA || !skinB) return 0
      return sortOrder === "desc" ? skinB.price - skinA.price : skinA.price - skinB.price
    })
  }, [state.skins, state.inventory, mode, sortOrder, minPrice, maxPrice, searchQuery, isSpinning, selectedUids])

  const ITEMS_PER_PAGE = 20
  const totalPages = Math.max(1, Math.ceil(displayedSkins.length / ITEMS_PER_PAGE))
  const validCurrentPage = Math.min(currentPage, totalPages)
  const currentItems = displayedSkins.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE)

  function handleLogin() {
    markPublicLogin()
    login()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="!rounded-none lg:!rounded-t-xl flex flex-col space-y-4 bg-[#1E1F23] p-3 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.20)] mb-2 lg:mb-0">
        <div className="flex min-h-[2.125rem] w-full flex-1 flex-col items-center justify-between gap-3 lg:flex-row lg:flex-nowrap">
          <div className="flex w-full flex-none items-center justify-start gap-2 lg:w-auto">
            <div className="flex h-[2.375rem] flex-none items-center justify-center gap-1 rounded-[6.25rem] bg-[#17181C] p-[0.25rem] lg:rounded-[0.625rem]">
              <button className={`flex h-full items-center justify-center rounded-[6.25rem] px-3 transition-colors duration-200 lg:rounded-[0.375rem] ${mode === "inventory" ? "!cursor-default bg-[#FBD506] text-[#202022]" : "text-white opacity-50 hover:bg-[#202022]"}`} onClick={() => setMode("inventory")} title="Мои скины">
                <Backpack className="h-4 w-4" />
              </button>
              <button className={`flex h-full items-center justify-center rounded-[6.25rem] px-3 transition-colors duration-200 lg:rounded-[0.375rem] ${mode === "shop" ? "!cursor-default bg-[#FBD506] text-[#202022]" : "text-white opacity-50 hover:bg-[#202022]"}`} onClick={() => setMode("shop")} title="Магазин">
                <Store className="h-4 w-4" />
              </button>
            </div>
            <span className="font-exo2 text-sm font-semibold text-white">{mode === "inventory" ? "Мои скины" : "Магазин"}</span>
          </div>

          <div className="flex w-full items-center justify-end gap-2 lg:w-auto">
            {mode === "shop" && (
              <>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")} className="h-8 rounded-md border border-white/10 bg-transparent px-2 text-xs text-white outline-none lg:h-[2.375rem]">
                  <option value="desc">Дороже</option>
                  <option value="asc">Дешевле</option>
                </select>
                <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="h-8 w-16 rounded-md border border-white/10 bg-transparent px-2 text-xs text-white outline-none lg:h-[2.375rem]" placeholder="от" type="number" />
                <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="h-8 w-16 rounded-md border border-white/10 bg-transparent px-2 text-xs text-white outline-none lg:h-[2.375rem]" placeholder="до" type="number" />
                <div className="relative h-8 lg:h-[2.375rem]">
                  <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`h-full rounded-md border border-white/10 bg-[#1E1F23] px-3 pr-9 text-xs text-white outline-none transition-all ${isSearchOpen ? "w-44 opacity-100" : "w-0 opacity-0 pointer-events-none"}`} placeholder="Поиск..." />
                  <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="absolute right-0 top-0 flex h-full w-8 items-center justify-center rounded-md bg-[#FFFFFF0D] text-white hover:bg-[#FFFFFF1A]">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={onOpenCart} className="relative flex h-8 w-8 items-center justify-center rounded-md bg-[#FEDB1C] text-[#202022] hover:bg-[#fcd500] lg:h-[2.375rem] lg:w-[2.375rem]">
                  <ShoppingCart className="h-4 w-4" />
                  {selectedShopIds.length > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#1E1F23] bg-[#FBD506] px-1 text-[10px] font-bold text-black">{selectedShopIds.length}</span>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] overflow-hidden min-h-[500px] lg:min-h-[560px] flex flex-col">
        {!loggedIn ? (
          <>
            <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:grid-cols-3 p-3 opacity-20 pointer-events-none blur-[2px]">
              {[...Array(6)].map((_, i) => <div key={i} className="rounded-lg border border-white/5 bg-white/5 h-[120px]" />)}
            </div>
            <div className="absolute inset-0 z-10 flex w-full flex-1 flex-col items-center justify-center lg:h-full bg-[#16171a]/70 backdrop-blur-[1px]">
              <div className="font-exo relative z-20 flex w-full flex-col items-center justify-center">
                <span className="text-[1.25rem] font-medium leading-none text-white">Вы не авторизованы</span>
                <span className="mt-2 text-[0.875rem] leading-none text-white opacity-50">Войдите для доступа к апгрейдам</span>
                <button onClick={handleLogin} className="mt-8 flex h-[2.5rem] items-center gap-2 rounded-[0.75rem] bg-[#FDD811] px-3 py-2 shadow-[0_0_20px_0_rgba(255,221,35,0.25)] transition-all duration-200 hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)]">
                  <span className="text-[1rem] font-semibold text-[#202022]">Войти через Steam</span>
                  <img alt="" className="h-5 w-5" src="https://s3.upgrader.pro/cdn/fa/icons/steam-dark.svg" />
                </button>
              </div>
              <div className="relative w-full items-center justify-center overflow-hidden lg:h-[19.375rem] mt-6 pointer-events-none">
                <LiveDropAnimation />
              </div>
            </div>
          </>
        ) : displayedSkins.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center px-6 py-14 text-center text-sm font-medium text-white/50">
            {mode === "inventory" ? "Инвентарь пуст" : "Магазин пуст"}
          </div>
        ) : (
          <div className="z-[1] grid w-full grid-cols-3 gap-1 px-1.5 py-1.5 lg:grid-cols-5 lg:gap-1.5 content-start overflow-hidden">
            {currentItems.map((item, index) => {
              const skin = mode === "shop" ? (item as any) : getSkin(state.skins, (item as any).skinId)
              const id = mode === "shop" ? skin.id : (item as any).uid
              if (!skin) return null
              const rarityColor = RARITY_COLORS[skin.rarity] || "#fff"
              const selected = mode === "shop" ? selectedShopIds.includes(id) : selectedUids.includes(id)
              const shadow = ["usp", "usp", "usp", "usp", "usp"][index % 5]

              return (
                <div key={id} className="bg-block flex h-[5rem] items-center justify-center overflow-visible bg-[length:85%_85%] bg-center bg-no-repeat lg:h-[6.75rem] transition-all rounded-md" style={{ backgroundImage: `url('/assets/item-shadow/${shadow}.png')` }}>
                  <button onClick={() => { if (isSpinning) return; mode === "shop" ? onToggleShopItem(id) : onToggle(id) }} className={`group relative h-full w-full rounded-md p-[0.0625rem] transition-all ${selected ? "shadow-[0_0_12px_0_rgba(255,221,36,0.6)]" : "shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]"}`} style={{ background: selected ? "linear-gradient(93deg,#FBD506 1.16%,#FFDD23 50.58%,#FBD506 100%)" : `linear-gradient(137deg, ${rarityColor} 10%, rgb(28, 28, 32) 75%)` }}>
                    <div className="relative flex h-full w-full items-center justify-center rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://s3.upgrader.pro/cdn/fa/images/light-gray-logo.svg')" }}>
                      <div className="absolute top-1.5 right-1.5 z-[2] flex flex-col items-end justify-center space-x-0.5">
                        <div className="flex items-center justify-center space-x-0.5">
                          <span className="font-tektur text-gradient-yellow text-[0.5rem] lg:text-[0.625rem] font-bold text-white">{formatPrice(skin.price)}</span>
                          <img alt="" className="h-2 w-2 lg:h-2.5 lg:w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                        </div>
                        <span className="text-[#85878d] font-exo text-[0.4375rem] lg:text-[0.5rem] font-semibold">{skin.wear}</span>
                      </div>
                      <img className="z-[1] w-full max-w-[4.375rem] object-cover lg:max-w-[79%]" src={skin.image || "/placeholder.svg"} alt={skin.name} />
                      <div className="absolute left-1/2 z-[2] flex w-full max-w-[80%] -translate-x-1/2 flex-col items-center justify-center text-center bottom-1.5">
                        <span className="text-gray font-semibold text-xxxxs">{formatWeaponName(skin.weapon)}</span>
                        <span className="text-white text-xxxs font-tektur max-w-full truncate font-bold lg:text-xxs">{formatSkinName(skin.name)}</span>
                      </div>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
