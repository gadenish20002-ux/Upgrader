"use client"

import { useState, useMemo } from "react"
import { useStore, formatPrice } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"
import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function CatalogPanel({
  targetId,
  onSelect,
  setMobileTab,
}: {
  targetId: string | null
  onSelect: (id: string) => void
  setMobileTab?: (tab: "inventory" | "catalog") => void
}) {
  const { state } = useStore()
  const [query, setQuery] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
  const [searchOpen, setSearchOpen] = useState(false)
  const [showNewItems, setShowNewItems] = useState(false)

  const filtered = useMemo(() => {
    return state.upgradeSkins
      .filter((s) => `${s.weapon} ${s.name}`.toLowerCase().includes(query.toLowerCase()))
      .filter((s) => (min ? s.price >= Number(min) : true))
      .filter((s) => (max ? s.price <= Number(max) : true))
      .sort((a, b) => sortOrder === "desc" ? b.price - a.price : a.price - b.price)
  }, [state.upgradeSkins, query, min, max, sortOrder])

  return (
    <div className="h-full flex flex-col">
      <div className="tablet:rounded-t-xl flex flex-col space-y-4 rounded-t-none bg-[#1E1F23] p-3 shadow-[0px_2px_20px_0px_rgba(0,0,0,0.20)] mb-2 lg:mb-0">
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
                <span className="text-[1rem] text-white opacity-50 lg:opacity-100 font-medium"> Выберите скин </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="block lg:hidden">
                  <path opacity="0.5" fillRule="evenodd" clipRule="evenodd" d="M18.2335 11.6354L9.99957 5.60777L1.76562 11.6354V6.02758L9.99957 0L18.2335 6.02758V11.6354Z" fill="white"></path>
                  <path opacity="0.2" d="M16.6654 13.9147V18.3327L9.9987 13.584L3.33203 18.3327V13.9147L9.9987 9.16602L16.6654 13.9147Z" fill="white"></path>
                </svg>
              </div>
            </div>
            
            <div className="flex w-full flex-1 items-center justify-end space-x-2 lg:w-auto">
              <button onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} className="flex h-[2rem] w-[2rem] flex-shrink-0 flex-col items-center justify-center gap-1 rounded-[0.375rem] bg-[#FFFFFF0D] px-3 transition-colors duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem] cursor-pointer">
                <div className="h-[0.375rem] w-[0.5625rem]">
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.256285 6.31334C0.397714 6.43814 0.572403 6.4994 0.746534 6.49997H8.25287C8.66542 6.49997 8.99998 6.16046 8.99998 5.74182C8.99998 5.55206 8.93011 5.3694 8.80377 5.22957L5.17107 0.77453C4.90861 0.452322 4.43821 0.407224 4.12069 0.67384C4.08883 0.700218 4.05976 0.729432 4.03321 0.759781L0.183335 5.24432C-0.0872241 5.55972 -0.0545222 6.0385 0.256285 6.31334Z" fill={sortOrder === 'asc' ? "url(#paint0_linear_2001_3366_asc)" : "#808080"} />
                    <defs>
                      <linearGradient id="paint0_linear_2001_3366_asc" x1="0.0899998" y1="0.767856" x2="9.36737" y2="1.44168" gradientUnits="userSpaceOnUse">
                        <stop offset="0.5" stopColor="#FFDD23" />
                        <stop offset="1" stopColor="#FBD506" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="h-[0.375rem] w-[0.5625rem]">
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.7437 0.56163C8.60227 0.43683 8.42758 0.37557 8.25345 0.375H0.747112C0.334565 0.375 3.66e-08 0.71451 0 1.13315C-1.65e-08 1.32291 0.0698757 1.5056 0.19621 1.6454L3.82891 6.1004C4.09137 6.4227 4.56177 6.4677 4.87929 6.2011C4.91115 6.1748 4.94022 6.1455 4.96677 6.1152L8.81665 1.6306C9.0872 1.31525 9.0545 0.83647 8.7437 0.56163Z" fill={sortOrder === 'desc' ? "url(#paint0_linear_2001_3366_desc)" : "#808080"} />
                    <defs>
                      <linearGradient id="paint0_linear_2001_3366_desc" x1="0.0899998" y1="0.767856" x2="9.36737" y2="1.44168" gradientUnits="userSpaceOnUse">
                        <stop offset="0.5" stopColor="#FFDD23" />
                        <stop offset="1" stopColor="#FBD506" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </button>

              <div className="relative flex h-[2rem] w-full items-center justify-end select-none lg:h-[2.375rem] lg:min-w-[18.125rem]">
                <div className="relative z-[1] flex h-full flex-row items-center justify-end transition-all duration-200 mr-2 w-full lg:w-auto">
                  <div className="mr-[0.375rem] flex h-full w-full flex-1 items-center rounded-[0.375rem] border-[1px] border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] lg:min-w-[5rem] lg:rounded-[0.625rem] lg:px-3">
                    <span className="opacity-50"> Цена </span>
                  </div>
                  <div className="relative h-full flex-1">
                    <img alt="coin" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                    <input 
                      value={min} 
                      onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))} 
                      className="flex h-full w-full flex-1 items-center rounded-l-[0.375rem] rounded-r-none border-[1px] border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-l-[0.625rem] lg:px-3 lg:pl-6 bg-transparent" 
                      placeholder="от" 
                      type="text" 
                    />
                  </div>
                  <div className="relative h-full flex-1">
                    <img alt="coin" className="absolute top-[0.75rem] left-2 hidden h-[0.9075rem] w-[0.9075rem] lg:block" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                    <input 
                      value={max} 
                      onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))} 
                      className="flex h-full w-full flex-1 items-center rounded-l-none rounded-r-[0.375rem] border-[1px] border-l-0 border-[#FFFFFF1A] px-2 text-[0.75rem] text-[#FFFFFF] placeholder:opacity-50 focus:outline-none lg:min-w-[5rem] lg:rounded-r-[0.625rem] lg:px-3 lg:pl-6 bg-transparent" 
                      placeholder="до" 
                      type="text" 
                    />
                  </div>
                </div>
                
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  className={`absolute right-0 z-[2] flex h-full items-center rounded-[0.375rem] bg-[#FFFFFF0D] text-[0.75rem] text-[#FFFFFF] transition-all duration-200 placeholder:opacity-50 focus:outline-none lg:rounded-[0.625rem] px-3 ${searchOpen ? 'w-full lg:w-[15rem]' : 'w-0 px-0 opacity-0'}`}
                  placeholder="Поиск..." 
                  type="text" 
                />
                
                <button 
                  onClick={() => setSearchOpen(!searchOpen)} 
                  className="z-[3] flex h-[2rem] w-[2rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-[0.375rem] bg-[#FFFFFF0D] text-[0.75rem] text-[#FFFFFF] transition-all duration-200 hover:bg-[#FFFFFF1A] lg:h-[2.375rem] lg:w-[2.375rem] lg:rounded-[0.625rem]"
                >
                  <img className="h-3.5 lg:h-4" src="https://s3.upgrader.pro/cdn/fa/icons/search.svg" alt="Поиск" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] overflow-hidden min-h-[500px] lg:min-h-[560px]">
        <div className="custom-scroll grid max-h-[500px] w-full grid-cols-3 gap-1 overflow-x-hidden overflow-y-auto px-1.5 lg:max-h-[540px] lg:grid-cols-5 lg:gap-1.5">
          {!showNewItems ? (
            <button 
              onClick={() => {
                const audio = new Audio("/sounds/choiceSkin.mp3");
                audio.play().catch(() => {});
                setShowNewItems(true);
              }}
              className="relative flex h-[100px] lg:h-[135px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-[#26262A] bg-[#1E1F23] shadow-[0_0_4px_0_rgba(255,255,255,0.10)] transition-colors duration-200 hover:border-[#FBD50680]"
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
              onClick={() => {
                const audio = new Audio("/sounds/choiceSkin.mp3");
                audio.play().catch(() => {});
                setShowNewItems(false);
              }}
              className="relative flex h-[100px] lg:h-[135px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-solid border-[#26262A] bg-[#1E1F23] shadow-[0_0_4px_0_rgba(255,255,255,0.10)] transition-colors duration-200 hover:border-[#FBD50680]"
            >
              <img alt="" className="absolute top-0 left-0 z-[1] w-full" src="/assets/ellipse.svg" />
              <div className="absolute z-[2] h-full w-full flex-col items-center justify-center bg-[linear-gradient(180deg,rgba(23,24,28,0.00)_41.95%,rgba(30,31,35,0.90)_68.51%,#1E1F23_100%)]"></div>
              <img alt="" className="absolute z-[2] h-full max-h-[4.375rem] object-cover lg:max-h-[79%]" src="/assets/chevron-left.svg" />
              <div className="z-[3] mx-[1.125rem] my-auto mb-0 flex h-full w-full flex-col items-center justify-center">
                <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFFFFF] uppercase"> назад </span>
                <span className="font-tektur text-[9px] lg:text-[12px] leading-tight font-bold text-[#FFDD24] uppercase"> к скинам </span>
              </div>
            </button>
          )}

        {filtered.map((skin) => {
          const selected = skin.id === targetId
          const rarityColor = RARITY_COLORS[skin.rarity] || "#fff"
          return (
            <button
              key={skin.id}
              onClick={() => {
                const audio = new Audio("/sounds/choiceSkin.mp3")
                audio.play().catch(() => {})
                onSelect(skin.id)
              }}
              className={`group relative overflow-hidden rounded-lg bg-[#212125] p-2 text-left transition-all h-[100px] lg:h-[135px] border ${
                selected ? "border-[#f0c000] ring-1 ring-[#f0c000] shadow-[inset_0_0_15px_rgba(240,192,0,0.15)]" : "border-white/5 hover:border-white/20 hover:bg-[#28282c]"
              }`}
            >
              <div 
                className="absolute left-1/2 top-0 h-[80%] w-full -translate-x-1/2 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${rarityColor} 0%, transparent 70%)` }}
              />

              <span className="absolute left-0 top-0 h-[2px] w-full" style={{ background: rarityColor }} />
              
              <div className="absolute top-2 right-2 flex flex-col items-end z-10">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-[#f0c000] flex items-center gap-1">
                    {formatPrice(skin.price)}
                    <Image src="/assets/icons/coin-2.svg" alt="coin" width={10} height={10} />
                  </span>
                </div>
                <span className="text-[8px] font-bold text-white/40 mt-0.5">{skin.wear}</span>
              </div>

              <div className="relative mx-auto flex items-center justify-center h-12 lg:h-[4.5rem] w-full mt-4 mb-1 z-10">
                <img src={skin.image || "/placeholder.svg"} alt={skin.name} className="max-w-[85%] max-h-full object-contain drop-shadow-xl" />
              </div>
              {selected && (
                <div className="bg-[linear-gradient(93deg,rgba(211,179,0,0.4)_1.16%,rgba(168,142,0,0.4)_50%,rgba(211,179,0,0.4))] absolute top-0 left-0 z-[20] flex h-full w-full items-center justify-center rounded-md">
                  <div className="group bg-[linear-gradient(93deg,#fbd506_1.16%,#ffdd23_50%,#fbd506)] transition-all hover:!bg-none hover:!bg-[#17181c] flex h-[1.3125rem] w-[1.3125rem] items-center justify-center rounded-full duration-200 lg:h-7 lg:w-7 cursor-pointer">
                    <img alt="" className="w-[0.8125rem] group-hover:hidden lg:w-5" src="/assets/arrow-white.svg" />
                    <img alt="" className="hidden group-hover:block" src="/assets/close-gray.svg" />
                  </div>
                </div>
              )}

              <div className="text-center z-10 relative pb-0.5 flex flex-col items-center">
                <div className="truncate text-[8px] text-[#85878d] uppercase">{skin.weapon}</div>
                <div className="truncate text-[10px] font-bold text-white uppercase">{skin.name}</div>
              </div>
            </button>
          )
        })}
        </div>
      </div>
    </div>
  )
}
