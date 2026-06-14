"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { useStore, formatPrice } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"
import { formatWeaponName, formatSkinName } from "@/lib/utils"
import type { Skin } from "@/lib/types"
import {
  getUpgradeChance,
  isEligibleUpgradeChance,
  rankSkinsByPercentageTarget,
} from "@/lib/upgrade-filter"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

function formatFilterPrice(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}

export function CatalogPanel({
  targetId,
  onSelect,
  setMobileTab,
  priceMin,
  priceMax,
  percentageTarget,
  onPercentageMatchChange,
  autoMatchEnabled = true,
  isSpinning,
  inputValue,
  excludedSkinIds,
}: {
  targetId: string | null
  onSelect: (id: string) => void
  setMobileTab?: (tab: "inventory" | "catalog") => void
  priceMin?: number | null
  priceMax?: number | null
  percentageTarget?: number | null
  onPercentageMatchChange?: (id: string | null) => void
  autoMatchEnabled?: boolean
  isSpinning?: boolean
  inputValue?: number
  // Skin ids currently used as the upgrade source — must never appear as a target option
  excludedSkinIds?: string[]
}) {
  const { state } = useStore()
  const [query, setQuery] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [searchOpen, setSearchOpen] = useState(false)
  const [showNewItems, setShowNewItems] = useState(false)
  const [randomNewSkins, setRandomNewSkins] = useState<Skin[]>([])
  const previousPercentageTargetRef = useRef<number | null>(percentageTarget ?? null)

  // On mount, select 50 random skins to act as "New Skins"
  useEffect(() => {
    if (state.upgradeSkins.length > 0 && randomNewSkins.length === 0) {
      const shuffled = [...state.upgradeSkins].sort(() => 0.5 - Math.random());
      setRandomNewSkins(shuffled.slice(0, 50));
    }
  }, [state.upgradeSkins])

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 20

  // Sync external price range into the filter inputs. Reset to page 1 only when a price
  // filter is being applied (a non-null range arrives), not when it's cleared on selection.
  useEffect(() => {
    setMin(priceMin == null ? "" : formatFilterPrice(priceMin))
    setMax(priceMax == null ? "" : formatFilterPrice(priceMax))
    if (priceMin != null || priceMax != null) {
      setCurrentPage(1)
    }
  }, [priceMin, priceMax, percentageTarget])

  const excludedSet = useMemo(() => new Set(excludedSkinIds ?? []), [excludedSkinIds])

  const filtered = useMemo(() => {
    // If we are looking at new items, show randomNewSkins. Otherwise show the rest.
    const baseSkins = percentageTarget != null
      ? state.upgradeSkins
      : showNewItems
      ? randomNewSkins 
      : state.upgradeSkins.filter(s => !randomNewSkins.some(rn => rn.id === s.id));

    const base = baseSkins
      // A skin already selected as the upgrade source can't also be the target (no two
      // identical items across the panels) — drop it so a different skin is shown/picked.
      .filter((s) => !excludedSet.has(s.id))
      .filter((s) => `${s.weapon} ${s.name}`.toLowerCase().includes(query.toLowerCase()))
      .filter((s) => { const minVal = parseFloat(min.replace(',', '.')); return min ? s.price >= minVal : true })
      .filter((s) => { const maxVal = parseFloat(max.replace(',', '.')); return max ? s.price <= maxVal : true })

    // When the user has typed an explicit price filter, honor it as a plain price filter
    // (price-sorted, full catalog) instead of the percentage eligibility-ranking — otherwise
    // a selected/recommended skin keeps us in percentage mode and the от/до filter appears
    // to do nothing (it gets masked by the chance-eligibility window). Without a price filter
    // the recommendation ranking is preserved so the list doesn't reshuffle on selection.
    const priceFilterActive = min.trim() !== "" || max.trim() !== ""
    if (percentageTarget != null && !priceFilterActive) {
      const ranked = rankSkinsByPercentageTarget(base, inputValue ?? 0, percentageTarget)
      // Never leave the catalog blank. When no stake is active (e.g. mid-spin the source
      // is consumed and inputValue is 0, or the stake makes no skin eligible) the ranking
      // returns nothing — fall back to a price-sorted list so skins stay visible.
      if (ranked.length > 0) return ranked
      return base.sort((a, b) => sortOrder === "desc" ? b.price - a.price : a.price - b.price)
    }

    return base.sort((a, b) => sortOrder === "desc" ? b.price - a.price : a.price - b.price)
  }, [state.upgradeSkins, randomNewSkins, showNewItems, query, min, max, sortOrder, percentageTarget, inputValue, excludedSet])

  // True once the user typed something into the от/до price fields.
  const hasPriceFilter = min.trim() !== "" || max.trim() !== ""

  // Auto-pick the best-matching skin while in recommendation mode. Disabled once the user
  // manually picks a skin, so their choice sticks and the recommendation list stays visible
  // (no reshuffle back to the default catalog / jump to page 1).
  // Skip auto-pick while a price filter is active: the list is then price-sorted, so
  // filtered[0] would be the top-priced item and would hijack the target on every keystroke.
  // The user's current/last pick stays; auto-recommendation resumes once they clear the filter.
  useEffect(() => {
    if (percentageTarget == null || !autoMatchEnabled || hasPriceFilter) return
    onPercentageMatchChange?.(filtered[0]?.id ?? null)
  }, [filtered, onPercentageMatchChange, percentageTarget, autoMatchEnabled, hasPriceFilter])

  // Safety net for the manual-pick case (auto-match disabled): if the currently chosen
  // target becomes identical to a skin that's now selected as the source — e.g. the won
  // item is added back after an upgrade — auto-substitute a different eligible skin so the
  // same item is never on both sides at once.
  useEffect(() => {
    if (!targetId || !excludedSet.has(targetId)) return
    onPercentageMatchChange?.(filtered[0]?.id ?? null)
  }, [targetId, excludedSet, filtered, onPercentageMatchChange])

  // Reset to first page on filter changes. NOTE: `min`/`max` are intentionally excluded
  // here because they are also written by the prop-sync effect above when a skin is
  // selected (which clears external price filters). Resetting on those programmatic
  // changes would kick the user back to page 1 on selection. User-driven price edits
  // call setCurrentPage(1) directly in their onChange handlers instead.
  useEffect(() => {
    setCurrentPage(1)
  }, [query, sortOrder, showNewItems])

  useEffect(() => {
    const previousPercentageTarget = previousPercentageTargetRef.current
    previousPercentageTargetRef.current = percentageTarget ?? null

    if (percentageTarget == null) return
    if (previousPercentageTarget === percentageTarget) return

    setCurrentPage(1)
  }, [percentageTarget])

  useEffect(() => {
    if (percentageTarget != null) {
      setCurrentPage(1)
    }
  }, [inputValue, percentageTarget])

  const allItems = useMemo(() => {
    const skinItems = filtered.map(skin => ({ type: 'skin' as const, skin }))
    return percentageTarget == null
      ? [{ type: 'button' as const }, ...skinItems]
      : skinItems
  }, [filtered, percentageTarget])

  const totalPages = Math.max(1, Math.ceil(allItems.length / ITEMS_PER_PAGE))
  const validCurrentPage = Math.min(currentPage, totalPages)
  
  const currentItems = allItems.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE)

  return (
    <div className="h-full flex flex-col">
      <div className="!rounded-none lg:!rounded-t-xl flex flex-col space-y-4 bg-[#1E1F23] p-3 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.20)] mb-2 lg:mb-0">
        <div className="flex min-h-[2.125rem] w-full flex-wrap items-center justify-between lg:flex-row lg:space-x-2">
          <div className="flex min-h-[2.125rem] w-full flex-1 flex-col items-center justify-between gap-3 lg:w-auto lg:flex-row lg:flex-wrap">
            <div className="flex h-[2.375rem] min-h-[2.125rem] w-full flex-none items-center justify-center lg:w-auto lg:space-x-1.5">
              <div className="flex w-full items-center justify-between lg:w-auto lg:space-x-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2 hidden lg:block">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.5864 9.30828L7.99927 4.48622L1.41211 9.30828V4.82206L7.99927 0L14.5864 4.82206V9.30828Z" fill="url(#paint0_linear_7752_23862)"></path>
                  <path d="M13.3327 11.132V14.6663L7.99935 10.8674L2.66602 14.6663V11.132L7.99935 7.33301L13.3327 11.132Z" fill="#826E01"></path>
                  <defs>
                    <linearGradient id="paint0_linear_7752_23862" x1="1.54385" y1="0.415548" x2="15.132" y2="1.34676" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FBD506"></stop>
                      <stop offset="0.5" stopColor="#FFDD23"></stop>
                      <stop offset="1" stopColor="#FBD506"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[1rem] text-white opacity-50 lg:opacity-100 font-medium font-exo2"> Выберите скин </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="block lg:hidden">
                  <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M18.2335 11.6354L9.99957 5.60777L1.76562 11.6354V6.02758L9.99957 0L18.2335 6.02758V11.6354Z" fill="white"></path>
                  <path opacity="0.2" d="M16.6654 13.9147V18.3327L9.9987 13.584L3.33203 18.3327V13.9147L9.9987 9.16602L16.6654 13.9147Z" fill="white"></path>
                </svg>
              </div>
            </div>
            
            
            <div className="flex w-full flex-1 items-center justify-end space-x-2 lg:w-auto">
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
                <div className={`relative z-[1] flex h-full flex-row items-center justify-end transition-all duration-200 ${searchOpen ? 'w-[0] overflow-hidden' : 'w-full'}`}>
                  <div className="mr-[0.375rem] flex h-full w-full flex-1 items-center rounded-[0.375rem] border-[1px] border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] lg:min-w-[5rem] lg:rounded-[0.625rem] lg:px-3">
                    <span className="opacity-50 font-exo2"> Цена </span>
                  </div>
                  <div className="relative h-full flex-1">
                    <img alt="coin" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                    <input 
                      value={min} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d.,]/g, "")
                        setMin(val)
                        setCurrentPage(1)
                        if (val && !max) setSortOrder("asc")
                      }} 
                      className="flex h-full w-full flex-1 items-center rounded-l-[0.375rem] rounded-r-none border-[1px] border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-l-[0.625rem] lg:px-3 lg:pl-6 bg-transparent font-exo2" 
                      placeholder="от" 
                      type="text" 
                    />
                  </div>
                  <div className="relative h-full flex-1">
                    <img alt="coin" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                    <input 
                      value={max} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d.,]/g, "")
                        setMax(val)
                        setCurrentPage(1)
                        if (val && !min) setSortOrder("desc")
                      }} 
                      className="flex h-full w-full flex-1 items-center rounded-l-none rounded-r-[0.375rem] border-[1px] border-l-0 border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-r-[0.625rem] lg:px-3 lg:pl-6 bg-transparent font-exo2" 
                      placeholder="до" 
                      type="text" 
                    />
                  </div>
                </div>
                
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  className={`absolute right-0 z-[2] flex h-full items-center rounded-[0.375rem] bg-[#FFFFFF0D] text-[0.75rem] text-[#FFFFFF] transition-all duration-200 placeholder:opacity-50 focus:outline-none lg:rounded-[0.625rem] ${searchOpen ? 'w-full px-2 lg:px-3' : 'w-[0] px-0 opacity-0 overflow-hidden'}`}
                  placeholder="Название" 
                  type="text" 
                />
                
                <button 
                  onClick={() => setSearchOpen(!searchOpen)} 
                  className="z-[3] flex h-[2rem] w-[2rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-[0.375rem] text-[0.75rem] text-[#FFFFFF] transition-all duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem] bg-transparent"
                >
                  <img className="h-3.5 lg:h-4" src="https://s3.upgrader.pro/cdn/fa/icons/search.svg" alt="Поиск" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] flex flex-col min-h-[500px] lg:min-h-[560px]">
        <div className="grid w-full grid-cols-3 gap-1 px-1.5 py-1.5 lg:grid-cols-5 lg:gap-1.5 flex-1 content-start">
          {currentItems.map((item, index) => {
            if (item.type === 'button') {
              return !showNewItems ? (
                <button 
                  key="new-items-btn"
                  onClick={() => {
                    if (state.soundMode === "on") {
                      const audio = new Audio("/sounds/choiceSkin.mp3");
                      audio.play().catch(() => {});
                    }
                    setShowNewItems(true);
                  }}
                  className="relative flex h-[5rem] lg:h-[6.75rem] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-[#26262A] bg-[#1E1F23] shadow-[0_0_4px_0_rgba(255,255,255,0.10)] transition-colors duration-200 hover:border-[#FBD50680]"
                >
                  <img alt="" className="absolute top-2 right-2 z-[3] h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/next-arrow-yellow.svg" />
                  <img 
                    alt="" 
                    className="absolute top-0 left-0 z-[1] w-full opacity-30" 
                    style={{ filter: "brightness(0) saturate(100%) invert(91%) sepia(94%) saturate(5364%) hue-rotate(359deg) brightness(108%) contrast(106%)" }} 
                    src="/assets/smoke.webp" 
                  />
                  <img alt="" className="absolute top-0 left-0 z-[2] w-full" src="https://s3.upgrader.pro/cdn/fa/images/collection-filter/ellipse.svg" />
                  <img alt="" className="absolute z-[3] h-[75%] lg:h-[90%] top-2" src="/assets/glock.webp" />
                  <div className="absolute z-[4] h-full w-full flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(23,24,28,0.00)_41.95%,rgba(30,31,35,0.90)_68.51%,#1E1F23_100%)]"></div>
                  <div className="z-[4] mx-2 mt-auto mb-0 flex h-full w-full flex-col items-center justify-end pb-2 lg:pb-3">
                    <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFFFFF] uppercase"> НОВЫЕ СКИНЫ </span>
                    <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFDD24] uppercase"> уже здесь </span>
                  </div>
                </button>
              ) : (
                <button 
                  key="back-btn"
                  onClick={() => {
                    if (state.soundMode === "on") {
                      const audio = new Audio("/sounds/choiceSkin.mp3");
                      audio.play().catch(() => {});
                    }
                    setShowNewItems(false);
                  }}
                  className="relative flex h-[5rem] lg:h-[6.75rem] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-[#26262A] bg-[#1E1F23] shadow-[0_0_4px_0_rgba(255,255,255,0.10)] transition-colors duration-200 hover:border-[#FBD50680]"
                >
                  <img alt="" className="absolute top-0 left-0 z-[1] w-full" src="/assets/ellipse.svg" />
                  <div className="absolute z-[2] h-full w-full flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(23,24,28,0.00)_41.95%,rgba(30,31,35,0.90)_68.51%,#1E1F23_100%)]"></div>
                  <img alt="" className="absolute z-[2] h-full max-h-[4.375rem] object-cover lg:max-h-[79%]" src="/assets/chevron-left.svg" />
                  <div className="z-[3] mx-[1.125rem] my-auto mb-0 flex h-full w-full flex-col items-center justify-center">
                    <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFFFFF] uppercase"> назад </span>
                    <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFDD24] uppercase"> к скинам </span>
                  </div>
                </button>
              )
            }

            const skin = item.skin!
            const selected = skin.id === targetId
            const rarityColor = RARITY_COLORS[skin.rarity] || "#fff"
            
              const hexToRgb = (hex: string) => {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
              };
              const SHADOWS = ['usp', 'usp', 'usp', 'usp', 'usp'];
              const shadow = SHADOWS[index % 5];
              
              let isLockedByChance = false
              if (inputValue && inputValue > 0) {
                const chance = getUpgradeChance(inputValue, skin.price)
                if (!isEligibleUpgradeChance(chance)) {
                  isLockedByChance = true
                }
              }
              
              return (
              <div key={skin.id} className={`bg-block flex h-[5rem] items-center justify-center overflow-visible bg-[length:85%_85%] bg-center bg-no-repeat lg:h-[6.75rem] transition-all rounded-md ${selected ? "cursor-pointer" : ""}`} style={{ backgroundImage: `url('/assets/item-shadow/${shadow}.png')` }}>
                <div className="w-full h-full">
                  <button
                    onClick={() => {
                      if (isSpinning || isLockedByChance) return
                      if (state.soundMode === "on") {
                        const audio = new Audio("/sounds/choiceSkin.mp3")
                        audio.play().catch(() => {})
                      }
                      onSelect(skin.id)
                    }}
                    className={`group relative h-full w-full rounded-md p-[0.0625rem] transition-all ${selected ? "shadow-[0_0_12px_0_rgba(255,221,36,0.6)]" : "shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]"} ${isSpinning || isLockedByChance ? "cursor-default" : ""}`}
                    style={{ background: selected ? "linear-gradient(93deg, #FBD506 1.16%, #FFDD23 50.58%, #FBD506 100%)" : `linear-gradient(137deg, rgb(${hexToRgb(rarityColor)}) 10%, rgb(28, 28, 32) 75%)` }}
                  >
                    {(isSpinning || isLockedByChance) && (
                      <div className="absolute inset-0 z-[20] flex items-center justify-center rounded-md bg-[#16171a]/70">
                        <img src="/assets/lock.svg" alt="Locked" className="w-6 h-6 lg:w-8 lg:h-8" />
                      </div>
                    )}
                    {selected && (
                      <div className="absolute top-0 left-0 z-[10] flex h-full w-full items-center justify-center rounded-md">
                        <div className="group bg-[linear-gradient(93deg,#fbd506_1.16%,#ffdd23_50%,#fbd506)] transition-all hover:!bg-none hover:!bg-[#17181c] flex h-[1.3125rem] w-[1.3125rem] items-center justify-center rounded-full duration-200 lg:h-7 lg:w-7 cursor-pointer">
                          <img alt="" className="w-[0.8125rem] group-hover:hidden lg:w-5" src="/assets/arrow-white.svg" />
                          <img alt="" className="hidden group-hover:block" src="/assets/close-gray.svg" />
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
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center items-center gap-2 pb-2">
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
        )}
      </div>
    </div>
  )
}
