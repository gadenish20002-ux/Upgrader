"use client"

import { useStore, getSkin, formatPrice } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"
import { LoginButton } from "./login-button"
import { LiveDropAnimation } from "./live-drop-animation"
import Image from "next/image"
import { Backpack } from "lucide-react"

export function InventoryPanel({
  selectedUids,
  onToggle,
}: {
  selectedUids: string[]
  onToggle: (uid: string) => void
}) {
  const { state } = useStore()

  return (
    <div className="h-full flex flex-col">
      {/* Header separated with mb-2 */}
      <div className="hidden lg:flex items-center gap-3 px-4 py-3 bg-[#1e1f23] rounded-t-xl mb-2">
        <div className="flex items-center gap-1 p-1 rounded-[10px] bg-[#232325]">
          <button className="flex items-center justify-center h-[28px] w-[28px] rounded-[8px] bg-[#FBD506] text-[#1C1C20] transition-colors" aria-label="Мой инвентарь">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
              <path d="M21.5 2.5a2.5 2.5 0 0 0-3.5 0l-12 12a2.5 2.5 0 0 0 0 3.5l1.5 1.5a2.5 2.5 0 0 0 3.5 0l12-12a2.5 2.5 0 0 0 0-3.5z" />
              <path d="M6 14.5l3.5 3.5" />
            </svg>
          </button>
          <button className="flex items-center justify-center h-[28px] w-[28px] rounded-[8px] text-white/40 hover:text-white transition-colors" aria-label="Магазин">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>
        <span className="font-medium text-white text-[15px] tracking-wide">Мой инвентарь</span>
        {state.loggedIn && (
          <span className="ml-auto text-xs font-bold text-white/50">{state.inventory.length} предметов</span>
        )}
      </div>

      {/* Main Body */}
      <div className="relative flex-1 p-3 rounded-b-xl bg-[#16171a] overflow-hidden min-h-[500px] lg:min-h-[560px]">
        {!state.loggedIn ? (
          <>
            <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:grid-cols-3 p-3 opacity-20 pointer-events-none blur-[2px]">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="rounded-lg border border-white/5 bg-white/5 h-[120px]" />
               ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#16171a]/70 px-4 py-8 text-center z-10 backdrop-blur-[1px]">
              <h3 className="text-xl font-bold text-white drop-shadow-md">Вы не авторизованы</h3>
              <p className="text-sm font-medium text-white/70 drop-shadow-md mb-2">Войдите для доступа к апгрейдам</p>
              <LoginButton className="drop-shadow-lg" />
              <LiveDropAnimation />
            </div>
          </>
        ) : state.inventory.length === 0 ? (
          <div className="flex h-full min-h-[400px] items-center justify-center px-6 py-14 text-center text-sm font-medium text-white/50">
            Инвентарь пуст
          </div>
        ) : (
          <div className="custom-scroll grid max-h-[500px] lg:max-h-[540px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
            {state.inventory.map((item) => {
              const skin = getSkin(state.skins, item.skinId)
              if (!skin) return null
              const rarityColor = RARITY_COLORS[skin.rarity] || "#fff"
              const selected = selectedUids.includes(item.uid)
              return (
                <button
                  key={item.uid}
                  onClick={() => onToggle(item.uid)}
                  className={`group relative overflow-hidden rounded-lg border bg-[#1a1b1f] p-2 text-left transition-all ${
                    selected ? "border-[#f0c000] shadow-[0_0_15px_rgba(240,192,0,0.4)]" : "border-white/5 hover:border-white/20"
                  }`}
                  style={{
                    boxShadow: selected ? "inset 0 -28px 24px -24px #f0c000, 0 0 15px rgba(240,192,0,0.4)" : undefined,
                  }}
                >
                  {/* Radial glow background based on rarity */}
                  <div 
                    className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${rarityColor} 0%, transparent 60%)` }}
                  />

                  <div className="absolute top-0 left-0 h-[2px] w-full" style={{ background: rarityColor }} />
                  
                  <div className="absolute top-2 right-2 flex flex-col items-end z-10">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center justify-center h-3 w-3 rounded-full bg-[#f0c000] text-[8px] text-black font-extrabold pb-[1px]">C</div>
                      <span className="text-[11px] font-bold text-[#f0c000]">{formatPrice(skin.price)} <span className="text-[9px] text-[#f0c000]/70">₽</span></span>
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
        )}
      </div>
    </div>
  )
}
