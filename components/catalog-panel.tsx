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
}: {
  targetId: string | null
  onSelect: (id: string) => void
}) {
  const { state } = useStore()
  const [query, setQuery] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  const filtered = useMemo(() => {
    return state.skins
      .filter((s) => `${s.weapon} ${s.name}`.toLowerCase().includes(query.toLowerCase()))
      .filter((s) => (min ? s.price >= Number(min) : true))
      .filter((s) => (max ? s.price <= Number(max) : true))
      .sort((a, b) => b.price - a.price)
  }, [state.skins, query, min, max])

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 bg-[#1e1f23] rounded-none lg:rounded-t-xl mb-0 lg:mb-2">
        <div className="flex items-center cursor-pointer">
          <Image src="/assets/images/header/logo.svg" alt="logo" width={20} height={20} className="mr-1.5" />
          <span className="font-bold text-white text-sm">Прокачать до</span>
          <ChevronDown className="h-4 w-4 text-white/50 ml-1.5" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
             <Image src="/assets/icons/coin.svg" alt="coin" width={14} height={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              value={min}
              onChange={(e) => setMin(e.target.value.replace(/\D/g, ""))}
              placeholder="от"
              className="h-8 w-[72px] pl-7 bg-[#1a1b1f] border-white/5 text-xs text-white placeholder:text-white/30"
              inputMode="numeric"
            />
          </div>
          <div className="relative">
             <Image src="/assets/icons/coin.svg" alt="coin" width={14} height={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              value={max}
              onChange={(e) => setMax(e.target.value.replace(/\D/g, ""))}
              placeholder="до"
              className="h-8 w-[72px] pl-7 bg-[#1a1b1f] border-white/5 text-xs text-white placeholder:text-white/30"
              inputMode="numeric"
            />
          </div>
          <div className="relative">
            <Image src="/assets/icons/search.svg" alt="search" width={16} height={16} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-8 w-8 pl-8 sm:w-32 bg-[#1a1b1f] border-white/5 text-xs text-white transition-all focus:w-32 focus:pl-8 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] overflow-hidden min-h-[500px] lg:min-h-[560px]">
        <div className="custom-scroll grid max-h-[500px] lg:max-h-[540px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((skin) => {
          const selected = skin.id === targetId
          const rarityColor = RARITY_COLORS[skin.rarity] || "#fff"
          return (
            <button
              key={skin.id}
              onClick={() => onSelect(skin.id)}
              className={`group relative overflow-hidden rounded-lg border bg-[#1a1b1f] p-2 text-left transition-all ${
                selected ? "border-[#f0c000] shadow-[0_0_15px_rgba(240,192,0,0.4)]" : "border-white/5 hover:border-white/20"
              }`}
            >
              {/* Radial glow background based on rarity */}
              <div 
                className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${rarityColor} 0%, transparent 60%)` }}
              />

              <span className="absolute left-0 top-0 h-[2px] w-full" style={{ background: rarityColor }} />
              
              <div className="absolute top-2 right-2 flex flex-col items-end z-10">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#f0c000] flex items-center gap-1">
                    {formatPrice(skin.price)}
                    <Image src="/assets/icons/coin-2.svg" alt="coin" width={12} height={12} />
                  </span>
                </div>
                <span className="text-[9px] font-bold text-white/40 mt-0.5">{skin.wear}</span>
              </div>

              <div className="relative mx-auto flex items-center justify-center h-20 w-full mt-5 mb-2 z-10">
                <img src={skin.image || "/placeholder.svg"} alt={skin.name} className="max-w-[85%] max-h-full object-contain drop-shadow-xl" />
              </div>

              <div className="text-center z-10 relative pb-1">
                <div className="truncate text-[9px] text-white/50">{skin.weapon}</div>
                <div className="truncate text-[11px] font-bold text-white/90">{skin.name}</div>
              </div>
            </button>
          )
        })}
        </div>
      </div>
    </div>
  )
}
