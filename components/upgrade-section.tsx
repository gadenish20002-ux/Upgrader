"use client"

import { useRef, useState, useMemo } from "react"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { UpgradeWheel, type UpgradeWheelHandle } from "./upgrade-wheel"
import { InventoryPanel } from "./inventory-panel"
import { CatalogPanel } from "./catalog-panel"
import { RARITY_COLORS } from "@/lib/default-data"
import { ChevronsUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"
import { Logo as SiteLogo } from "./logo"

const WIN_FACTOR = 0.92 // house edge

export function UpgradeSection({ sidebarTargetId }: { sidebarTargetId: string | null }) {
  const { state, setState, addToInventory, removeFromInventory } = useStore()
  const wheelRef = useRef<UpgradeWheelHandle>(null)

  const [selectedUids, setSelectedUids] = useState<string[]>([])
  const [targetId, setTargetId] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [mobileTab, setMobileTab] = useState<"inventory" | "catalog">("inventory")

  // keep target in sync if a sidebar category was clicked
  const effectiveTarget = targetId ?? sidebarTargetId

  const selectedItems = useMemo(
    () => selectedUids.map((uid) => state.inventory.find((i) => i.uid === uid)).filter(Boolean),
    [selectedUids, state.inventory],
  )

  const inputValue = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const skin = getSkin(state.skins, item!.skinId)
      return sum + (skin?.price ?? 0)
    }, 0)
  }, [selectedItems, state.skins])

  const targetSkin = effectiveTarget ? getSkin(state.skins, effectiveTarget) : undefined

  const chance = useMemo(() => {
    if (!targetSkin || inputValue <= 0) return 0
    const raw = (inputValue / targetSkin.price) * WIN_FACTOR
    return Math.min(0.92, Math.max(0.01, raw))
  }, [targetSkin, inputValue])

  const multiplier = targetSkin && inputValue > 0 ? targetSkin.price / inputValue : 0

  function toggleItem(uid: string) {
    setSelectedUids((prev) => (prev.includes(uid) ? prev.filter((u) => u !== uid) : [...prev, uid]))
  }

  function clearSelection() {
    setSelectedUids([])
  }

  async function handleSpin() {
    if (!state.loggedIn) {
      toast.error("Войдите через Steam, чтобы прокачивать")
      return
    }
    if (!targetSkin) {
      toast.error("Выберите предмет для апгрейда")
      return
    }
    if (inputValue <= 0) {
      toast.error("Выберите предметы или укажите баланс")
      return
    }
    if (chance >= 0.92) {
      toast.error("Слишком высокий шанс — выберите цель подороже")
      return
    }

    setSpinning(true)

    // determine outcome — admin predict overrides chance
    let win: boolean
    if (state.predict.outcome === "win") {
      win = true
    } else if (state.predict.outcome === "lose") {
      win = false
    } else {
      win = Math.random() < chance
    }

    const result = await wheelRef.current!.spin(win)

    // settle
    removeFromInventory(selectedUids)
    setState((p) => ({ ...p, upgrades: p.upgrades + 1 }))

    if (result) {
      addToInventory(targetSkin.id)
      toast.success(`Победа! Вы получили ${targetSkin.weapon} | ${targetSkin.name}`)
    } else {
      toast.error("Не повезло. Попробуйте снова!")
    }

    clearSelection()
    setTargetId(null)
    setSpinning(false)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-2">
      {/* Top: Logo */}
      <div className="flex items-center justify-center gap-[0.3125rem] lg:gap-2 mb-2 lg:mb-2 mt-2 lg:mt-0">
        <SiteLogo className="h-[1.5125rem] w-[1.5125rem] lg:h-8 lg:w-8" />
        <span className="font-tektur text-xl font-extrabold text-white lg:text-2xl"> UPGRADER </span>
      </div>

      {/* Main Upgrade Interface: Unified Grid for Mobile & Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_1fr] w-full items-start gap-x-2 gap-y-4 lg:gap-x-4 lg:gap-y-0">
        
        {/* Settings Icons */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 order-1 flex gap-2 lg:mb-2 self-end">
          <button className="transition-all duration-200 hover:brightness-50" aria-label="Настройки">
            <img src="/assets/icons/settings.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button className="transition-all duration-200 hover:brightness-50" aria-label="Звук">
            <img src="/assets/icons/sound.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button className="transition-all duration-200 hover:brightness-50" aria-label="Быстрый режим">
            <img src="/assets/icons/animate.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
        </div>

        {/* Center Wheel */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 order-2 flex flex-col items-center justify-center relative z-20 py-2 lg:mt-24">
          <div className="relative flex justify-center w-full">
            <UpgradeWheel ref={wheelRef} chance={chance} hasSelection={!!targetSkin && inputValue > 0} />
            {multiplier > 0 && (
              <div className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 translate-y-[4.8rem] text-xs font-bold text-[#f0c000] drop-shadow-md lg:translate-y-[6.8rem]">
                x{multiplier.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Left Card */}
        <div className="col-span-1 lg:col-span-1 lg:col-start-1 lg:row-start-2 order-3 flex flex-col rounded-xl bg-[#1c1d21] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.35)] overflow-hidden w-full" style={{ aspectRatio: '259/240' }}>
          <div className="text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 shrink-0">
            <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug">Выберите предметы и/или баланс для использования</h3>
            <p className="text-[7px] lg:text-[11px] text-[#6b6b6b] mt-0.5">Вы можете выбрать несколько предметов</p>
          </div>

          <div className="relative flex-1">
            <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-[0] h-full w-full object-cover" />
            {selectedItems.length === 0 ? (
              <img src="/assets/images/game/unknown-item-2.svg" alt="Unknown item" className="absolute top-1/2 left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
            ) : (
              <div className="absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 w-full px-2 lg:px-4 flex flex-col items-center gap-1 lg:gap-3">
                <div className="flex flex-wrap justify-center gap-1 lg:gap-2">
                  {selectedItems.map((item) => {
                    const skin = getSkin(state.skins, item!.skinId)!
                    return (
                      <div key={item!.uid} className="relative w-12 lg:w-20 rounded-lg border border-white/10 bg-[#25262a] p-1">
                        <span className="absolute left-0 top-0 h-1 w-full rounded-t-lg" style={{ background: RARITY_COLORS[skin.rarity] }} />
                        <div className="relative mx-auto flex h-6 lg:h-10 w-full items-center justify-center p-0.5 lg:p-1">
                          <img src={skin.image || "/placeholder.svg"} alt={skin.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                        </div>
                        <div className="truncate text-[7px] lg:text-[9px] text-center text-white/70">{skin.name}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="text-center text-xs lg:text-sm">
                  <span className="font-bold text-[#f0c000]">{formatPrice(inputValue)} ₽</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Card */}
        <div className="col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-2 order-4 flex flex-col rounded-xl bg-[#1c1d21] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.35)] overflow-hidden w-full" style={{ aspectRatio: '259/240' }}>
          <div className="text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 shrink-0">
            <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug flex items-center justify-center h-full min-h-[22px] lg:min-h-0">Выберите предмет для апгрейда</h3>
          </div>

          {targetSkin ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-1 lg:gap-2 px-2 pb-2 lg:px-5 lg:pb-5">
              <div className="relative flex h-16 lg:h-32 w-full max-w-[120px] lg:max-w-[200px] items-center justify-center">
                <img src={targetSkin.image || "/placeholder.svg"} alt={targetSkin.name} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
              </div>
              <div className="text-center">
                <div className="text-[7px] lg:text-[10px] text-white/50">{targetSkin.weapon}</div>
                <div className="font-bold text-[9px] lg:text-sm text-white/90 leading-tight">{targetSkin.name}</div>
                <div className="font-bold text-[9px] lg:text-sm text-[#f0c000] mt-0.5 lg:mt-1">{formatPrice(targetSkin.price)} ₽</div>
              </div>
            </div>
          ) : (
            <div className="relative flex-1">
              <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-[0] h-full w-full object-cover" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="Unknown item" className="absolute top-1/2 left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
            </div>
          )}
        </div>

        {/* Upgrade Button */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 order-5 mt-2 lg:mt-12 w-full flex justify-center">
          <button
            onClick={handleSpin}
            disabled={spinning || !state.loggedIn}
            className="h-12 lg:h-14 w-full lg:min-w-[240px] rounded-xl px-8 text-sm lg:text-base font-bold text-[#1C1C20] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[#FDD811] hover:brightness-110"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
          >
            <img src="/assets/icons/logo-black.svg" alt="" className="h-4 w-4 flex-shrink-0" />
            {spinning ? "Прокачиваем..." : "Прокачать"}
          </button>
        </div>

      </div>

      {/* Bottom: Tabs (Mobile) / Grid (Desktop) */}
      <div className="w-full mt-4 lg:mt-3">
        {/* Mobile Tabs */}
        <div className="flex lg:hidden flex-col w-full px-1">
          <div className="flex w-full">
            <button
              onClick={() => setMobileTab("inventory")}
              className={`flex-1 text-center text-[11px] font-bold tracking-wide py-3 rounded-t-xl transition-colors ${
                mobileTab === "inventory" ? "bg-[#1e1f23] text-white" : "bg-transparent text-white/50"
              }`}
            >
              Мои предметы
            </button>
            <button
              onClick={() => setMobileTab("catalog")}
              className={`flex-1 text-center text-[11px] font-bold tracking-wide py-3 rounded-t-xl transition-colors ${
                mobileTab === "catalog" ? "bg-[#1e1f23] text-white" : "bg-transparent text-white/50"
              }`}
            >
              Желаемые предметы
            </button>
          </div>
          <div className="flex w-full bg-[#1e1f23] p-2 rounded-none">
            <div className="flex w-full bg-[#1a1b1f] p-1 rounded-[10px]">
              <button
                onClick={() => setMobileTab("inventory")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold rounded-lg transition-all ${
                  mobileTab === "inventory" ? "bg-[#f0c000] text-black" : "bg-transparent text-white/50 hover:text-white"
                }`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className={mobileTab === 'inventory' ? 'text-black' : 'text-[#f0c000]'}>
                  <path d="M21.5 2.5a2.5 2.5 0 0 0-3.5 0l-12 12a2.5 2.5 0 0 0 0 3.5l1.5 1.5a2.5 2.5 0 0 0 3.5 0l12-12a2.5 2.5 0 0 0 0-3.5z" />
                  <path d="M6 14.5l3.5 3.5" />
                </svg>
                Мои скины
              </button>
              <button
                onClick={() => setMobileTab("catalog")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[13px] font-bold rounded-lg transition-all ${
                  mobileTab === "catalog" ? "bg-[#f0c000] text-black" : "bg-transparent text-white/50 hover:text-white"
                }`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Магазин
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid w-full grid-cols-1 gap-0 pt-0 lg:pt-0 lg:gap-6 lg:grid-cols-2 items-start mt-[-4px] lg:mt-0">
          <div className={`${mobileTab === "inventory" ? "block" : "hidden lg:block"} w-full`}>
            <InventoryPanel selectedUids={selectedUids} onToggle={toggleItem} />
          </div>
          <div className={`${mobileTab === "catalog" ? "block" : "hidden lg:block"} w-full`}>
            <CatalogPanel targetId={effectiveTarget} onSelect={(id) => setTargetId(id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

