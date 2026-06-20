"use client"

import { useEffect, useState, useMemo } from "react"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"
import { LoginButton } from "./login-button"
import { formatWeaponName, formatSkinName } from "@/lib/utils"
import { LiveDropAnimation } from "./live-drop-animation"
import Image from "next/image"
import { Backpack, Store, ChevronLeft, ChevronRight } from "lucide-react"
import { isSticker } from "@/lib/utils"

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
  onQuickBuy,
  isSpinning
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
  const { state } = useStore()
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [minPriceShop, setMinPriceShop] = useState("")
  const [maxPriceShop, setMaxPriceShop] = useState("")
  const [searchQueryShop, setSearchQueryShop] = useState("")

  const [minPriceInv, setMinPriceInv] = useState("")
  const [maxPriceInv, setMaxPriceInv] = useState("")
  const [searchQueryInv, setSearchQueryInv] = useState("")

  const minPrice = mode === "shop" ? minPriceShop : minPriceInv
  const setMinPrice = mode === "shop" ? setMinPriceShop : setMinPriceInv
  const maxPrice = mode === "shop" ? maxPriceShop : maxPriceInv
  const setMaxPrice = mode === "shop" ? setMaxPriceShop : setMaxPriceInv
  const searchQuery = mode === "shop" ? searchQueryShop : searchQueryInv
  const setSearchQuery = mode === "shop" ? setSearchQueryShop : setSearchQueryInv

  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Reset page when the active list changes so newly added inventory is visible.
  useEffect(() => {
    setCurrentPage(1)
  }, [mode, sortOrder, minPrice, maxPrice, searchQuery, state.inventory.length])

  const displayedSkins = useMemo(() => {
    const skins = mode === "shop" ? state.skins : state.inventory.filter((item) => {
      // Selected stake items stay VISIBLE in the inventory (marked as selected) so the
      // user can still click them to deselect. They only disappear once the upgrade is
      // actually launched (Прокачать → isSpinning/isUpgradeAnimating true, item consumed).
      if (isSpinning && selectedUids.includes(item.uid)) return false
      return getSkin(state.skins, item.skinId)
    })
    return [...skins].filter((a) => {
      const skin = mode === "shop" ? (a as any) : getSkin(state.skins, (a as any).skinId)
      if (!skin) return false
      
      if (isSticker(skin.weapon)) return false
      
      if (minPrice && skin.price < parseFloat(minPrice)) return false
      if (maxPrice && skin.price > parseFloat(maxPrice)) return false

      if (searchQuery) {
        const nameMatch = skin.name?.toLowerCase().includes(searchQuery.toLowerCase())
        const weaponMatch = skin.weapon?.toLowerCase().includes(searchQuery.toLowerCase())
        if (!nameMatch && !weaponMatch) return false
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

  return (
    <div className="h-full flex flex-col">
      {/* Header separated with mb-2 */}
      <div className="!rounded-none lg:!rounded-t-xl flex flex-col space-y-4 bg-[#1E1F23] p-3 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.20)] mb-2 lg:mb-0">
        <div className="flex min-h-[2.125rem] w-full flex-1 flex-col items-center justify-between gap-3 lg:flex-row lg:flex-nowrap">
            <div className="flex w-full flex-none items-center justify-start gap-2 lg:w-auto">
              {/* Icon tabs: Мои скины / Магазин */}
              <div className="flex h-[2.375rem] flex-none items-center justify-center gap-1 rounded-[6.25rem] bg-[#17181C] p-[0.25rem] lg:rounded-[0.625rem]">
                <button 
                  className={`flex h-full items-center justify-center gap-1 rounded-[6.25rem] px-[0.375rem] py-[0.25rem] transition-colors duration-200 hover:bg-[#202022] lg:w-[1.875rem] lg:rounded-[0.375rem] ${mode === "inventory" ? "!cursor-default bg-[#FBD506] opacity-100 hover:bg-[#FBD506]" : "opacity-50"}`}
                  aria-label="Мои скины"
                  onClick={() => setMode("inventory")}
                  title="Мои скины"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none" style={{ color: mode === "inventory" ? "rgb(32, 32, 34)" : "white" }}>
                    <g clipPath="url(#clip0_7752_23768)">
                      <path d="M14.9688 13.6426C14.7316 13.5188 14.5038 13.381 14.3101 13.1936C13.8269 12.7266 13.5882 12.167 13.6802 11.4871C13.7264 11.1461 13.8822 10.848 14.0663 10.5633C14.0941 10.5206 14.1184 10.4749 14.1512 10.4362C14.2496 10.3197 14.2991 10.1852 14.3356 10.0374C14.4892 9.41452 14.1546 8.82335 13.5397 8.64715C13.3538 8.59396 13.3404 8.56879 13.4005 8.39122C13.6108 7.77173 13.2378 6.97017 12.6323 6.73266C12.5402 6.69656 12.4457 6.67272 12.3517 6.64457C12.2141 6.6035 12.1986 6.57734 12.2339 6.43876C12.3484 5.98839 12.2783 5.58049 11.9505 5.2381C11.6286 4.90168 11.2281 4.80494 10.7868 4.91104C10.4145 5.00055 10.0519 5.12881 9.71324 5.31337C9.37057 5.50005 9.38787 5.43786 9.22647 5.19183C9.19118 5.13797 9.15481 5.08423 9.12426 5.02763C9.06035 4.90921 9.0559 4.79214 9.15503 4.6895C9.1932 4.65004 9.18664 4.62502 9.15416 4.58819C8.31505 3.63678 7.36374 2.83759 6.17167 2.36064C5.14073 1.94822 4.06799 1.81768 2.96549 1.8697C2.18563 1.90644 1.43121 2.08175 0.67956 2.27662C0.45362 2.33513 0.226338 2.38926 -0.000244141 2.44549C0.0276812 2.42146 0.0537781 2.39483 0.0834809 2.37361C1.42692 1.41768 2.89746 0.736653 4.49119 0.326318C5.51532 0.0627867 6.55126 0.0216991 7.59517 0.182786C7.7722 0.210126 7.94916 0.23767 8.12636 0.265061C8.44734 0.351068 8.76834 0.437076 9.08932 0.523093C9.11624 0.536646 9.14195 0.5539 9.17018 0.563364C9.78259 0.767205 10.3679 1.03168 10.9305 1.34737C11.0071 1.3903 11.0853 1.46625 11.1613 1.46419C11.2455 1.46201 11.2945 1.34996 11.3644 1.29213C11.3722 1.28576 11.3787 1.27779 11.3863 1.27093C11.4244 1.23547 11.467 1.23274 11.5058 1.26511C11.62 1.3602 11.7432 1.44756 11.8055 1.59112C11.8625 1.72249 11.9355 1.84462 12.0207 1.95961C12.0513 2.00101 12.079 2.0444 12.0537 2.10023C12.0268 2.16003 12.0516 2.16984 12.108 2.1636C12.1829 2.15534 12.2071 2.1948 12.1821 2.26425C12.1585 2.3296 12.1614 2.36293 12.2474 2.34157C12.3115 2.32556 12.3533 2.37862 12.3228 2.43792C12.2732 2.53521 12.304 2.53774 12.3911 2.5152C12.449 2.50027 12.4895 2.54134 12.4627 2.59827C12.4089 2.71303 12.4636 2.70082 12.5446 2.68447C12.602 2.67301 12.6449 2.70733 12.6172 2.76568C12.5647 2.87679 12.6023 2.8767 12.6942 2.84617C12.7542 2.82626 12.7864 2.86938 12.7662 2.93227C12.7406 3.0119 12.7602 3.03387 12.8453 3.01288C12.9147 2.99595 12.9482 3.01338 12.9251 3.08756C12.917 3.11433 12.9016 3.13474 12.9267 3.1603C12.9539 3.18808 12.9777 3.1784 13.0083 3.16547C13.0815 3.13454 13.1017 3.1685 13.0887 3.23818C13.0734 3.32055 13.0944 3.33907 13.1757 3.3101C13.204 3.29996 13.2281 3.29454 13.2503 3.31615C13.2671 3.33252 13.284 3.35244 13.2701 3.37898C13.2571 3.40383 13.221 3.42524 13.259 3.45592C13.2901 3.48119 13.3182 3.46885 13.3518 3.4516C13.405 3.42442 13.4412 3.44788 13.4312 3.50801C13.4136 3.61387 13.4592 3.61465 13.5391 3.58744C13.5941 3.56855 13.6367 3.58503 13.6194 3.65654C13.6001 3.73657 13.6381 3.7563 13.6985 3.72214C13.7701 3.68128 13.8034 3.70311 13.8289 3.77103C13.8418 3.80557 13.8574 3.85034 13.9058 3.83224C14.0246 3.78817 14.0928 3.86247 14.1553 3.93841C14.3063 4.12161 14.4535 4.30783 14.6006 4.4942C15.3945 5.49903 16.1534 6.52791 16.7714 7.65437C16.8238 7.74981 16.8428 7.82258 16.7389 7.89815C16.6686 7.94929 16.6911 8.034 16.774 8.05959C16.8158 8.07249 16.8599 8.0788 16.9033 8.08662C16.99 8.10248 17.0566 8.14886 17.0837 8.23265C17.1101 8.31461 17.0514 8.36484 16.9941 8.41039C16.9666 8.43239 16.9438 8.45442 16.958 8.49585C16.9716 8.53564 17.0027 8.54293 17.0371 8.54794C17.0639 8.55173 17.0919 8.55118 17.1173 8.55927C17.2103 8.58819 17.2967 8.62807 17.3226 8.73522C17.3458 8.83173 17.2911 8.88857 17.2166 8.93394C17.1982 8.94529 17.186 8.96254 17.1909 8.985C17.1979 9.01691 17.2243 9.02586 17.2524 9.02853C17.3364 9.03666 17.408 9.07425 17.4721 9.12565C17.5509 9.18908 17.5609 9.28161 17.5131 9.36078C17.4819 9.41228 17.3862 9.42961 17.4061 9.49223C17.4236 9.5475 17.5131 9.52598 17.5676 9.55454C17.7462 9.64825 17.7835 9.77481 17.6603 9.92084C17.6046 9.98692 17.6263 10.0057 17.6984 10.0262C17.8959 10.0827 18.0445 10.3717 17.9874 10.5727C17.9722 10.6261 17.9356 10.6582 17.8951 10.6896C17.8073 10.7577 17.7066 10.8032 17.6006 10.8533C17.7392 11.0295 17.792 11.2259 17.7927 11.4389L17.7239 11.6953C17.7005 11.7083 17.6967 11.7331 17.6888 11.7551C17.5229 12.2127 17.3796 12.6769 17.2481 13.1455C17.1917 13.3468 17.1828 13.555 17.1296 13.7554C17.0858 13.9196 17.0189 13.9492 16.8715 13.8708C16.6896 13.774 16.4962 13.7155 16.291 13.7002C15.9734 13.6766 15.6618 13.7919 15.343 13.7424L14.9688 13.6426ZM15.2233 13.0993C15.4593 13.1695 15.6943 13.157 15.9207 13.066C16.3763 12.883 16.743 12.583 16.979 12.1519C17.4134 11.3586 17.0634 10.3691 15.9472 10.2962C15.1724 10.2455 14.3957 10.9372 14.31 11.7109C14.2392 12.3486 14.6261 12.9367 15.2233 13.0993Z" fill="currentColor"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_7752_23768">
                        <rect width="18" height="14" fill="currentColor" transform="translate(-0.000244141)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className={`ml-1 text-[0.875rem] lg:hidden font-medium font-exo2 ${mode === "inventory" ? "text-[#202022]" : "text-white"}`}> Мои скины </span>
                </button>
                <button 
                  className={`flex h-full items-center justify-center gap-1 rounded-[6.25rem] px-[0.375rem] py-[0.25rem] transition-colors duration-200 hover:bg-[#202022] lg:w-[1.875rem] lg:rounded-[0.375rem] ${mode === "shop" ? "!cursor-default bg-[#FBD506] opacity-100 hover:bg-[#FBD506]" : "opacity-50"}`}
                  aria-label="Магазин"
                  onClick={() => setMode("shop")}
                  title="Магазин"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: mode === "shop" ? "rgb(32, 32, 34)" : "white" }}>
                    <g clipPath="url(#clip0_7752_23772)">
                      <path d="M13.9869 4.70663L13.195 1.53737C13.0979 1.148 12.7479 0.875 12.3462 0.875H1.65463C1.253 0.875 0.903 1.148 0.805 1.53737L0.013125 4.70663C0.004375 4.74075 0 4.77662 0 4.8125C0 6.01825 0.931875 7 2.07812 7C2.744 7 3.33812 6.66838 3.71875 6.15387C4.09937 6.66838 4.6935 7 5.35938 7C6.02525 7 6.61938 6.66838 7 6.15387C7.38062 6.66838 7.97388 7 8.64062 7C9.30737 7 9.90063 6.66838 10.2812 6.15387C10.6619 6.66838 11.2551 7 11.9219 7C13.0681 7 14 6.01825 14 4.8125C14 4.77662 13.9956 4.74075 13.9869 4.70663Z" fill="currentColor"></path>
                      <path d="M11.9219 7.87461C11.326 7.87461 10.7599 7.69261 10.2812 7.36011C9.324 8.02598 7.95725 8.02598 7 7.36011C6.04275 8.02598 4.676 8.02598 3.71875 7.36011C3.24012 7.69261 2.674 7.87461 2.07812 7.87461C1.6485 7.87461 1.24338 7.77398 0.875 7.60248V12.2496C0.875 12.7326 1.267 13.1246 1.75 13.1246H5.25V9.62461H8.75V13.1246H12.25C12.733 13.1246 13.125 12.7326 13.125 12.2496V7.60248C12.7566 7.77398 12.3515 7.87461 11.9219 7.87461Z" fill="currentColor"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_7752_23772">
                        <rect width="14" height="14" fill="currentColor"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className={`ml-1 text-[0.875rem] lg:hidden font-medium font-exo2 ${mode === "shop" ? "text-[#202022]" : "text-white"}`}> Магазин </span>
                </button>
              </div>
              <span className="hidden lg:block text-[1rem] font-medium text-white tracking-wide font-exo2">{mode === "inventory" ? "Мои скины" : "Магазин"}</span>
            </div>
            
            <div className="flex w-full flex-1 items-center justify-end space-x-2 lg:w-auto">
              {mode === "inventory" ? (
                state.loggedIn && (
                  <>
                    <button onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} className="flex h-[2rem] w-[2rem] flex-shrink-0 flex-col items-center justify-center gap-1 rounded-[0.375rem] bg-[#FFFFFF0D] px-3 transition-colors duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem] cursor-pointer">
                      <img 
                        className="h-[0.375rem] w-[0.5625rem]" 
                        alt="Сортировка по возрастанию" 
                        src={`data:image/svg+xml,%3Csvg%20width%3D%229%22%20height%3D%227%22%20viewBox%3D%220%200%209%207%22%20fill%3D%22${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cstyle%3E*%20%7B%20fill%3A%20${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%20!important%3B%20%7D%3C%2Fstyle%3E%0A%3Cpath%20d%3D%22M0.256285%206.31334C0.397714%206.43814%200.572403%206.4994%200.746534%206.49997H8.25287C8.66542%206.49997%208.99998%206.16046%208.99998%205.74182C8.99998%205.55206%208.93011%205.3694%208.80377%205.22957L5.17107%200.77453C4.90861%200.452322%204.43821%200.407224%204.12069%200.67384C4.08883%200.700218%204.05976%200.729432%204.03321%200.759781L0.183335%205.24432C-0.0872241%205.55972%20-0.0545222%206.0385%200.256285%206.31334Z%22%20fill%3D%22${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2001_3366%22%20x1%3D%220.0899998%22%20y1%3D%220.767856%22%20x2%3D%229.36737%22%20y2%3D%221.44168%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%23FFDD23%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23FBD506%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A`} 
                      />
                      <img 
                        className="h-[0.375rem] w-[0.5625rem]" 
                        alt="Сортировка по убыванию" 
                        src={`data:image/svg+xml,%3Csvg%20width%3D%229%22%20height%3D%227%22%20viewBox%3D%220%200%209%207%22%20fill%3D%22${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cstyle%3E*%20%7B%20fill%3A%20${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%20!important%3B%20%7D%3C%2Fstyle%3E%0A%3Cpath%20d%3D%22M8.7437%200.56163C8.60227%200.43683%208.42758%200.37557%208.25345%200.375H0.747112C0.334565%200.375%203.66e-08%200.71451%200%201.13315C-1.65e-08%201.32291%200.0698757%201.5056%200.19621%201.6454L3.82891%206.1004C4.09137%206.4227%204.56177%206.4677%204.87929%206.2011C4.91115%206.1748%204.94022%206.1455%204.96677%206.1152L8.81665%201.6306C9.0872%201.31525%209.0545%200.83647%208.7437%200.56163Z%22%20fill%3D%22${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%2F%3E%0A%3C%2Fsvg%3E%0A`} 
                      />
                    </button>
                    <div className="flex h-[2rem] flex-1 flex-nowrap items-center justify-between gap-2 rounded-[0.375rem] bg-[#FFFFFF0D] px-3 lg:h-[2.375rem] lg:flex-none lg:rounded-[0.625rem]">
                      <span className="text-[0.75rem] leading-[0.875rem] text-[#FFFFFF] opacity-50"> Всего скинов </span>
                      <span className="flex flex-nowrap items-center justify-center text-[0.75rem] font-tektur font-semibold">
                        {formatPrice(displayedSkins.reduce((sum, item) => sum + (getSkin(state.skins, (item as any).skinId)?.price || 0), 0))}
                        <img alt="coin-icon" className="ml-1 h-3.5 lg:h-[0.9075rem] w-3.5 lg:w-[0.9075rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                      </span>
                    </div>
                  </>
                )
              ) : (
                <>
                  <button onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} className="flex h-[2rem] w-[2rem] flex-shrink-0 flex-col items-center justify-center gap-1 rounded-[0.375rem] bg-[#FFFFFF0D] px-3 transition-colors duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem] cursor-pointer">
                    <img 
                      className="h-[0.375rem] w-[0.5625rem]" 
                      alt="Сортировка по возрастанию" 
                      src={`data:image/svg+xml,%3Csvg%20width%3D%229%22%20height%3D%227%22%20viewBox%3D%220%200%209%207%22%20fill%3D%22${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cstyle%3E*%20%7B%20fill%3A%20${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%20!important%3B%20%7D%3C%2Fstyle%3E%0A%3Cpath%20d%3D%22M0.256285%206.31334C0.397714%206.43814%200.572403%206.4994%200.746534%206.49997H8.25287C8.66542%206.49997%208.99998%206.16046%208.99998%205.74182C8.99998%205.55206%208.93011%205.3694%208.80377%205.22957L5.17107%200.77453C4.90861%200.452322%204.43821%200.407224%204.12069%200.67384C4.08883%200.700218%204.05976%200.729432%204.03321%200.759781L0.183335%205.24432C-0.0872241%205.55972%20-0.0545222%206.0385%200.256285%206.31334Z%22%20fill%3D%22${sortOrder === 'asc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%2F%3E%0A%3Cdefs%3E%0A%3ClinearGradient%20id%3D%22paint0_linear_2001_3366%22%20x1%3D%220.0899998%22%20y1%3D%220.767856%22%20x2%3D%229.36737%22%20y2%3D%221.44168%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%0A%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%23FFDD23%22%2F%3E%0A%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23FBD506%22%2F%3E%0A%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E%0A`} 
                    />
                    <img 
                      className="h-[0.375rem] w-[0.5625rem]" 
                      alt="Сортировка по убыванию" 
                      src={`data:image/svg+xml,%3Csvg%20width%3D%229%22%20height%3D%227%22%20viewBox%3D%220%200%209%207%22%20fill%3D%22${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cstyle%3E*%20%7B%20fill%3A%20${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%20!important%3B%20%7D%3C%2Fstyle%3E%0A%3Cpath%20d%3D%22M8.7437%200.56163C8.60227%200.43683%208.42758%200.37557%208.25345%200.375H0.747112C0.334565%200.375%203.66e-08%200.71451%200%201.13315C-1.65e-08%201.32291%200.0698757%201.5056%200.19621%201.6454L3.82891%206.1004C4.09137%206.4227%204.56177%206.4677%204.87929%206.2011C4.91115%206.1748%204.94022%206.1455%204.96677%206.1152L8.81665%201.6306C9.0872%201.31525%209.0545%200.83647%208.7437%200.56163Z%22%20fill%3D%22${sortOrder === 'desc' ? '%23FFFFFF' : '%23FFFFFF1A'}%22%2F%3E%0A%3C%2Fsvg%3E%0A`} 
                    />
                  </button>
                  <div className="relative flex h-[2rem] w-full items-center justify-end select-none lg:h-[2.375rem] lg:min-w-[18.125rem]">
                    <div className="relative z-[1] flex h-full flex-row items-center justify-end transition-all duration-200 mr-2 w-full lg:w-auto">
                      <div className="mr-[0.375rem] flex h-full w-full flex-1 items-center rounded-[0.375rem] border-[1px] border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] lg:min-w-[5rem] lg:rounded-[0.625rem] lg:px-3">
                        <span className="opacity-50 font-exo"> Цена </span>
                      </div>
                      <div className="relative h-full flex-1">
                        <img alt="coin-icon" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                        <input name="priceFrom" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="flex h-full w-full flex-1 items-center rounded-l-[0.375rem] rounded-r-none border-[1px] border-[#FFFFFF1A] bg-transparent font-exo px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-l-[0.625rem] lg:px-3 lg:pl-6" placeholder="от" type="number" />
                      </div>
                      <div className="relative h-full flex-1">
                        <img alt="coin-icon" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                        <input name="priceTo" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="flex h-full w-full flex-1 items-center rounded-l-none rounded-r-[0.375rem] border-[1px] border-[#FFFFFF1A] bg-transparent font-exo px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-r-[0.625rem] lg:px-3 lg:pl-6" placeholder="до" type="number" />
                      </div>
                    </div>
                    <input name="itemName" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`absolute right-0 z-[2] flex h-full items-center rounded-[0.375rem] bg-[#1E1F23] font-exo text-[0.75rem] text-[#FFFFFF] transition-all duration-200 placeholder:opacity-50 focus:outline-none lg:rounded-[0.625rem] pl-3 pr-10 ${isSearchOpen ? 'w-full border-[1px] border-[#FFFFFF1A]' : 'w-[0] opacity-0 pointer-events-none'}`} placeholder="Поиск по названию..." type="text" />
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="z-[3] flex h-[2rem] w-[2rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-[0.375rem] bg-[#FFFFFF0D] text-[0.75rem] text-[#FFFFFF] transition-all duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem]">
                      <img className="h-3.5 lg:h-4" src="https://s3.upgrader.pro/cdn/fa/icons/search.svg" alt="Поиск" />
                    </button>
                  </div>
                  <button onClick={onOpenCart} className="relative flex h-[2rem] w-[2rem] flex-shrink-0 items-center justify-center rounded-[0.375rem] bg-[#FEDB1C] transition-colors duration-200 hover:bg-[#fcd500] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem] cursor-pointer">
                    <img alt="" className="h-4 w-4" src="https://s3.upgrader.pro/cdn/fa/icons/black-shop.svg" />
                    {selectedShopIds.length > 0 && (
                      <div className="absolute top-[-0.35rem] right-[-0.35rem] flex h-4.5 w-4.5 p-1 items-center justify-center rounded-full border-[3px] border-solid border-[#1E1F23] bg-[linear-gradient(93deg,#FBD506_1.16%,#FFDD23_50.58%,#FBD506_100%)]">
                        <span className="text-[10px] leading-none text-black font-bold">{selectedShopIds.length}</span>
                      </div>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      {/* Main Body */}
      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] overflow-hidden min-h-[500px] lg:min-h-[560px] flex flex-col">
        {!state.loggedIn ? (
          <>
            <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:grid-cols-3 p-3 opacity-20 pointer-events-none blur-[2px]">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="rounded-lg border border-white/5 bg-white/5 h-[120px]" />
               ))}
            </div>
            <div className="absolute inset-0 z-10 flex w-full flex-1 flex-col items-center justify-center lg:h-full bg-[#16171a]/70 backdrop-blur-[1px]">
              <div className="font-exo relative z-20 flex w-full flex-col items-center justify-center">
                <span className="text-[1.25rem] font-medium leading-none text-white">Вы не авторизованы</span>
                <span className="mt-2 text-[0.875rem] leading-none text-white opacity-50">Войдите для доступа к апгрейдам</span>
                <button onClick={() => useStore.getState().login()} className="mt-8 flex h-[2.5rem] items-center gap-2 rounded-[0.75rem] bg-[#FDD811] px-3 py-2 shadow-[0_0_2px_0_rgba(255,255,255,0.50)_inset] shadow-[0_0_20px_0_rgba(255,221,35,0.25)] transition-all duration-200 hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)]">
                  <span className="text-[1rem] font-semibold text-[#202022]"> Войти через Steam </span>
                  <img alt="" className="h-5 w-5" src="https://s3.upgrader.pro/cdn/fa/icons/steam-dark.svg" />
                </button>
              </div>
              <div className="relative w-full items-center justify-center overflow-hidden lg:h-[19.375rem] mt-6 pointer-events-none">
                <div className="w-full transition-opacity duration-500 lg:absolute lg:-left-[16.5%] lg:w-[133%] opacity-100">
                  <LiveDropAnimation />
                </div>
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

              const hexToRgb = (hex: string) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
              };
              const SHADOWS = ['usp', 'usp', 'usp', 'usp', 'usp'];
              const shadow = SHADOWS[index % 5];

              return (
                <div key={id} className={`bg-block flex h-[5rem] items-center justify-center overflow-visible bg-[length:85%_85%] bg-center bg-no-repeat lg:h-[6.75rem] transition-all rounded-md ${selected ? "cursor-pointer" : ""}`} style={{ backgroundImage: `url('/assets/item-shadow/${shadow}.png')` }}>
                  <div className="w-full h-full">
                    <button
                      onClick={() => {
                        if (isSpinning) return
                        if (state.soundMode === "on") {
                          const audio = new Audio("/sounds/choiceSkin.mp3")
                          audio.play().catch(() => {})
                        }
                        if (mode === "shop") {
                          onToggleShopItem(id)
                        } else {
                          onToggle(id)
                        }
                      }}
                      className={`group relative h-full w-full rounded-md p-[0.0625rem] transition-all ${selected ? "shadow-[0_0_12px_0_rgba(255,221,36,0.6)]" : "shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]"} ${isSpinning ? "cursor-default" : ""}`}
                      style={{ background: selected ? "linear-gradient(93deg, #FBD506 1.16%, #FFDD23 50.58%, #FBD506 100%)" : `linear-gradient(137deg, rgb(${hexToRgb(rarityColor)}) 10%, rgb(28, 28, 32) 75%)` }}
                    >
                      {isSpinning && (
                        <div className="absolute inset-0 z-[20] flex items-center justify-center rounded-md bg-[#16171a]/70">
                          <img src="/assets/lock.svg" alt="Locked" className="w-6 h-6 lg:w-8 lg:h-8" />
                        </div>
                      )}
                      {selected && mode === "inventory" && (
                        <div className="absolute top-0 left-0 z-[10] flex h-full w-full items-center justify-center rounded-md">
                          <div className="group bg-[linear-gradient(93deg,#fbd506_1.16%,#ffdd23_50%,#fbd506)] transition-all hover:!bg-none hover:!bg-[#17181c] flex h-[1.3125rem] w-[1.3125rem] items-center justify-center rounded-full duration-200 lg:h-7 lg:w-7 cursor-pointer">
                            <img alt="" className="w-[0.8125rem] group-hover:hidden lg:w-5" src="/assets/arrow-white.svg" />
                            <img alt="" className="hidden group-hover:block" src="/assets/close-gray.svg" />
                          </div>
                        </div>
                      )}
                      {selected && mode === "shop" && (
                        <div className="absolute top-0 left-0 z-[3] flex h-full w-full items-center justify-center overflow-hidden rounded-md animate-in fade-in duration-200">
                          <div className="choosed-item-gradient-new absolute top-0 left-0 z-[1] flex h-full w-full items-center justify-center overflow-hidden rounded-md animate-in fade-in duration-200"></div>
                          <div className="bg-[linear-gradient(93deg,#fbd506_1.16%,#ffdd23_50%,#fbd506)] z-[2] mx-1.5 mt-auto mb-1.5 flex h-7 w-full items-center justify-between rounded-[1.5rem] p-1 animate-in slide-in-from-bottom-2 fade-in duration-200">
                            <div role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); onRemoveShopItem?.(id); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onRemoveShopItem?.(id); } }} className="transition-all flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full bg-[#17181C] text-center text-[#FEDA1B] duration-200 hover:bg-[#17181CB2] hover:text-white cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.9165 7H11.0832" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <span className="font-tektur text-[0.875rem] text-[#17181C]">{selectedShopIds.filter(sid => sid === id).length}</span>
                            <div role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); onAddShopItem?.(id); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onAddShopItem?.(id); } }} className="transition-all flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full bg-[#17181C] text-center text-[#FEDA1B] duration-200 hover:bg-[#17181CB2] hover:text-white cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2.625V11.375M11.375 7H2.625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-block tablet:bg-size-[50%] relative flex h-full w-full items-center justify-center rounded-md bg-cover bg-[length:2.5rem] bg-center bg-no-repeat lg:bg-[length:50%]" style={{ backgroundImage: `url('https://s3.upgrader.pro/cdn/fa/images/light-gray-logo.svg')` }}>
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
                        <div className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200" style={{ background: `radial-gradient(circle, rgba(${hexToRgb(rarityColor)}, 0.4) 0%, rgba(${hexToRgb(rarityColor)}, 0.2) 30%, rgba(${hexToRgb(rarityColor)}, 0.1) 45%, transparent 70%)` }}></div>
                      </div>
                    </button>
                  </div>
                </div>
              )
            })}
            {Array.from({ length: Math.max(0, 20 - currentItems.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex h-[5rem] w-full items-center justify-center overflow-visible rounded-md border-[1px] border-solid border-[rgba(255,255,255,0.10)] bg-[#17181C] py-[1.125rem] shadow-[0_0_4px_0_rgba(255,255,255,0.10)] lg:h-[6.75rem]">
                <img alt="" className="max-h-full w-auto" src="/assets/item-shadow/usp.png" />
              </div>
            ))}
          </div>
        )}

        <div className="relative mt-auto pt-2 mb-2 flex min-h-[2rem] w-full items-center justify-center lg:mb-3 lg:pt-3 lg:min-h-[2.375rem] shrink-0">
          {totalPages > 1 && (
            <div className="w-full absolute !w-auto animate-in slide-in-from-left duration-200">
              <div className="flex w-full items-center justify-center gap-2 px-4 lg:w-auto">
                <button
                  disabled={validCurrentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#212125] text-white/50 transition-colors hover:text-white disabled:opacity-50 disabled:hover:text-white/50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  disabled={validCurrentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#212125] text-white/50 transition-colors hover:text-white disabled:opacity-50 disabled:hover:text-white/50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {mode === "shop" && selectedShopIds.length > 0 && (
            <div className="absolute z-[3] right-0 mr-3 flex items-center space-x-1.5 animate-in slide-in-from-right duration-200">
              <button onClick={() => selectedShopIds.forEach(id => onRemoveShopItem?.(id))} className="flex h-[2rem] w-auto flex-1 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.375rem] bg-[#FFFFFF0D] px-3 transition-colors duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:flex-none lg:rounded-[0.625rem]">
                <img alt="trash" className="h-[1rem] w-[1rem] lg:h-[1.25rem] lg:w-[1.25rem]" src="/assets/trash.svg" />
              </button>
              <button onClick={onQuickBuy} className="bg-[linear-gradient(93deg,#fbd506_1.16%,#ffdd23_50%,#fbd506)] cursor-pointer relative flex h-[2rem] w-auto items-center justify-center gap-3 rounded-[0.375rem] px-3 transition-all duration-200 select-none focus:outline-none lg:h-[2.375rem] lg:rounded-[0.625rem]">
                <span className="flex items-center justify-center gap-1">
                  <img alt="coin" className="h-4 w-4" src="/assets/coin-black.svg" />
                  <span className="font-tektur text-[0.875rem] leading-normal font-semibold text-black">{formatPrice(selectedShopIds.reduce((sum, id) => sum + (getSkin(state.skins, id)?.price || 0), 0))}</span>
                </span>
                <img alt="shop" className="h-4 w-4" src="/assets/black-shop.svg" />
                <div className="absolute top-[-0.35rem] right-[-0.35rem] flex h-4.5 w-4.5 p-1 items-center justify-center rounded-full border-[3px] border-solid border-[#1E1F23] bg-[linear-gradient(93deg,#FBD506_1.16%,#FFDD23_50.58%,#FBD506_100%)]">
                  <span className="text-[10px] leading-none text-black font-bold">{selectedShopIds.length}</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
