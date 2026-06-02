"use client"

import { useRef, useState, useMemo } from "react"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { UpgradeWheel, type UpgradeWheelHandle } from "./upgrade-wheel"
import { InventoryPanel } from "./inventory-panel"
import { CatalogPanel } from "./catalog-panel"
import { SettingsModal } from "./settings-modal"
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
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([])
  const [targetId, setTargetId] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [leftPanelMode, setLeftPanelMode] = useState<"inventory" | "shop">("inventory")
  const [mobileTab, setMobileTab] = useState<"inventory" | "catalog">("inventory")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [balanceInput, setBalanceInput] = useState(0)

  // keep target in sync if a sidebar category was clicked
  const effectiveTarget = targetId ?? sidebarTargetId

  const selectedItems = useMemo(
    () => selectedUids.map((uid) => state.inventory.find((i) => i.uid === uid)).filter(Boolean),
    [selectedUids, state.inventory],
  )

  const selectedShopItems = useMemo(
    () => selectedShopIds.map((id) => getSkin(state.skins, id)).filter(Boolean),
    [selectedShopIds, state.skins],
  )

  const inputValue = useMemo(() => {
    const inventorySum = selectedItems.reduce((sum, item) => {
      const skin = getSkin(state.skins, item!.skinId)
      return sum + (skin?.price ?? 0)
    }, 0)
    const shopSum = selectedShopItems.reduce((sum, skin) => sum + (skin!.price ?? 0), 0)
    return inventorySum + shopSum + balanceInput
  }, [selectedItems, selectedShopItems, state.skins, balanceInput])

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

  function toggleShopItem(id: string) {
    setSelectedShopIds((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]))
  }

  function clearSelection() {
    setSelectedUids([])
    setSelectedShopIds([])
    setBalanceInput(0)
  }

  function findClosestSkin(targetPrice: number) {
    if (state.skins.length === 0) return
    const sorted = [...state.skins].sort((a, b) => a.price - b.price)
    let closest = sorted[0]
    let minDiff = Math.abs(sorted[0].price - targetPrice)
    for (const skin of sorted) {
      const diff = Math.abs(skin.price - targetPrice)
      if (diff < minDiff) {
        minDiff = diff
        closest = skin
      }
    }
    setTargetId(closest.id)
    if (window.innerWidth < 1024) {
      setMobileTab("catalog")
    }
  }

  function handleFastMultiplier(multiplier: number) {
    if (inputValue <= 0) {
      toast.error("Выберите предметы или укажите баланс")
      return
    }
    findClosestSkin(inputValue * multiplier)
  }

  function handleFastPercentage(percent: number) {
    if (inputValue <= 0) {
      toast.error("Выберите предметы или укажите баланс")
      return
    }
    const targetPrice = (inputValue * WIN_FACTOR) / (percent / 100)
    findClosestSkin(targetPrice)
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
    const shopSum = selectedShopItems.reduce((sum, skin) => sum + (skin!.price ?? 0), 0)
    const totalBalanceRequired = balanceInput + shopSum
    if (totalBalanceRequired > state.balance) {
      toast.error("Недостаточно баланса")
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
    setState((p) => ({ ...p, upgrades: p.upgrades + 1, balance: Math.max(0, p.balance - totalBalanceRequired) }))

    if (result) {
      addToInventory(targetSkin.id)
      toast.success(`Победа! Вы получили ${targetSkin.weapon} | ${targetSkin.name}`)
      if (state.soundMode === "on") {
        const winAudio = new Audio("/sounds/fireworkWin.mp3")
        winAudio.play().catch(() => {})
      }
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
      <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] w-full items-start gap-x-[0.4375rem] gap-y-4 lg:gap-x-5 lg:gap-y-0 lg:mt-8 transition-all duration-300 ease-out">
        
        {/* Settings Icons */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 order-1 flex gap-2 lg:mb-2 self-end">
          <button className="transition-all duration-200 hover:brightness-50" aria-label="Информация">
            <img src="/assets/info-circle.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button onClick={() => setIsSettingsOpen(true)} className="transition-all duration-200 hover:brightness-50" aria-label="Настройки">
            <img src="/assets/icons/settings.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button onClick={() => setState((p) => ({ ...p, soundMode: p.soundMode === "on" ? "off" : "on" }))} className={`transition-all duration-200 hover:brightness-50 ${state.soundMode === "on" ? "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "opacity-50"}`} aria-label="Звук">
            <img src="/assets/icons/sound.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button onClick={() => setState((p) => ({ ...p, fastMode: !p.fastMode }))} className={`transition-all duration-200 hover:brightness-50 ${state.fastMode ? "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "opacity-50"}`} aria-label="Быстрый режим">
            <img src="/assets/icons/animate.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
        </div>

        {/* Center Wheel */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 order-2 flex flex-col items-center justify-center relative z-20 py-2">
          <div className="relative flex justify-center w-full">
            <UpgradeWheel ref={wheelRef} chance={chance} hasSelection={!!targetSkin && inputValue > 0} fastMode={state.fastMode} soundMode={state.soundMode} />
            {multiplier > 0 && (
              <div className="absolute top-1/2 left-1/2 z-40 -translate-x-1/2 translate-y-[4.8rem] text-xs font-bold text-[#f0c000] drop-shadow-md lg:translate-y-[6.8rem]">
                x{multiplier.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        {/* Left Card */}
        <div 
          className="col-span-1 lg:col-span-1 lg:col-start-1 lg:row-start-2 order-3 flex flex-col rounded-md lg:rounded-xl bg-[#17181C] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden w-full lg:self-center aspect-[10.275/9.625] lg:aspect-[23.1875/21.5] relative"
          style={selectedItems.length + selectedShopItems.length === 1 ? { 
            background: `linear-gradient(90deg, ${RARITY_COLORS[(selectedItems.length > 0 ? getSkin(state.skins, selectedItems[0]!.skinId)! : selectedShopItems[0]!).rarity]}26 0.05%, rgba(28, 28, 32, 0) 99.95%) #17181C` 
          } : undefined}
        >
          {selectedItems.length === 0 && selectedShopItems.length === 0 && balanceInput === 0 ? (
            <div className="relative flex h-full w-full flex-col">
              <div className="text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 shrink-0 z-10">
                <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug">Выберите предметы и/или баланс для использования</h3>
                <p className="text-[7px] lg:text-[11px] text-[#6b6b6b] mt-0.5">Вы можете выбрать несколько предметов</p>
              </div>
              <div className="relative flex-1">
                <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-[0] h-full w-full object-cover" />
                <img src="/assets/unknown-item.svg" alt="Unknown item" className="absolute top-1/2 left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-between p-2 lg:p-6">
              <button 
                onClick={clearSelection}
                className="absolute top-2 right-2 z-10 flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] transition-colors hover:bg-gray-700 lg:top-3 lg:right-3 lg:h-8 lg:w-8"
              >
                <img alt="Close" className="h-2 w-2 lg:h-4 lg:w-4" src="/assets/close-gray.svg" />
              </button>
              
              <div className="z-[2] flex flex-col items-center justify-between text-center shrink-0">
                <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug">Выберите предметы и/или баланс для использования</h3>
                <p className="text-[7px] lg:text-[11px] text-[#6b6b6b] mt-0.5 lg:mt-1">Вы можете выбрать несколько предметов</p>
              </div>

              <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-0 my-1 lg:my-2">
                {selectedItems.length + selectedShopItems.length === 1 ? (
                  (() => {
                    const skin = selectedItems.length > 0 ? getSkin(state.skins, selectedItems[0]!.skinId)! : selectedShopItems[0]!;
                    return (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center shrink-0">
                          <span className="text-white/50 uppercase text-[9px] font-semibold lg:text-xs"> {skin.weapon} </span>
                          <span className="text-white text-xs font-bold lg:text-2xl mt-0.5 lg:mt-0"> {skin.name} </span>
                        </div>
                        <div className="relative w-full flex-1 min-h-0">
                          <img className="absolute top-1/2 left-1/2 z-[2] w-[80%] max-h-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl" src={skin.image || "/placeholder.svg"} alt={skin.name} />
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="flex flex-wrap justify-center content-start gap-2 lg:gap-4 max-h-full overflow-y-auto custom-scroll p-1 w-full z-[2]">
                    {selectedItems.map((item) => {
                      const skin = getSkin(state.skins, item!.skinId)!
                      return (
                        <div key={item!.uid} className="flex flex-col items-center justify-center w-16 lg:w-24 shrink-0">
                          <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center shrink-0">
                            <span className="text-white/50 uppercase text-[7px] font-semibold lg:text-[9px]"> {skin.weapon} </span>
                            <span className="text-white text-[8px] font-bold lg:text-xs mt-0.5 lg:mt-0 leading-tight"> {skin.name} </span>
                          </div>
                          <div className="relative w-full h-12 lg:h-16 mt-1">
                            <img className="absolute top-1/2 left-1/2 z-[2] w-[90%] max-h-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-md" src={skin.image || "/placeholder.svg"} alt={skin.name} />
                          </div>
                        </div>
                      )
                    })}
                    {selectedShopItems.map((skin) => {
                      return (
                        <div key={skin!.id} className="flex flex-col items-center justify-center w-16 lg:w-24 shrink-0">
                          <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center shrink-0">
                            <span className="text-[#f0c000]/70 uppercase text-[7px] font-semibold lg:text-[9px]"> {skin!.weapon} </span>
                            <span className="text-[#f0c000] text-[8px] font-bold lg:text-xs mt-0.5 lg:mt-0 leading-tight"> {skin!.name} </span>
                          </div>
                          <div className="relative w-full h-12 lg:h-16 mt-1">
                            <img className="absolute top-1/2 left-1/2 z-[2] w-[90%] max-h-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-md" src={skin!.image || "/placeholder.svg"} alt={skin!.name} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              
              <div className="z-[2] flex items-center justify-center space-x-0.5 lg:space-x-1.5 shrink-0">
                <span className="text-gradient-yellow text-[11px] font-bold lg:text-xl"> {formatPrice(inputValue)} </span>
                <img alt="coin" className="h-2.5 w-2.5 lg:h-4 lg:w-4" src="/assets/icons/coin.svg" />
              </div>
            </div>
          )}
        </div>

        {/* Balance Slider */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-3 order-6 lg:order-4 w-full mt-2 lg:mt-6">
          <div className="bg-block flex h-full w-full flex-col items-center justify-start space-y-2 rounded-md p-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] lg:px-3">
            <div className="flex w-full items-center justify-between">
              <span className="text-gray text-xxs lg:text-xs">Сумма баланса:</span>
              <div className="flex items-center justify-end space-x-2">
                <div className="flex items-center justify-end space-x-0.5">
                  <span className="text-gradient-yellow text-xs font-semibold lg:text-sm"> {formatPrice(balanceInput)} </span>
                  <img alt="" className="h-3 w-3" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                </div>
                <span className="text-gray text-xxxs lg:text-xxs">(max {formatPrice(state.balance)})</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              step="0.01" 
              className="custom-range w-full" 
              max={state.balance > 0 ? state.balance : 100} 
              value={balanceInput}
              onChange={(e) => setBalanceInput(Number(e.target.value))}
              style={{ "--range-progress": `${(balanceInput / (state.balance > 0 ? state.balance : 100)) * 100}%` } as React.CSSProperties} 
            />
          </div>
        </div>

        {/* Right Card */}
        <div 
          className="col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-2 order-4 flex flex-col rounded-md lg:rounded-xl bg-[#17181C] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden w-full lg:self-center aspect-[10.275/9.625] lg:aspect-[23.1875/21.5] relative"
          style={targetSkin ? { background: `linear-gradient(270deg, rgba(28, 28, 32, 0) 0.05%, ${RARITY_COLORS[targetSkin.rarity]}26 99.95%) #17181C` } : undefined}
        >
          {targetSkin ? (
            <div className="relative flex h-full w-full flex-col items-center justify-between p-2 lg:p-6">
              <button 
                onClick={() => setTargetId(null)}
                className="absolute top-2 right-2 z-10 flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] transition-colors hover:bg-gray-700 lg:top-3 lg:right-3 lg:h-8 lg:w-8"
              >
                <img alt="Close" className="h-2 w-2 lg:h-4 lg:w-4" src="/assets/close-gray.svg" />
              </button>
              
              <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center">
                <span className="text-white/50 uppercase text-[9px] font-semibold lg:text-xs"> {targetSkin.weapon} </span>
                <span className="text-white text-xs font-bold lg:text-2xl mt-0.5 lg:mt-0"> {targetSkin.name} </span>
              </div>
              
              <div className="relative w-full flex-1 min-h-0">
                <img className="absolute top-1/2 left-1/2 z-[2] w-[80%] max-h-full -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl" src={targetSkin.image || "/placeholder.svg"} alt={targetSkin.name} />
              </div>
              
              <div className="z-[2] flex items-center justify-center space-x-0.5 lg:space-x-1.5">
                <span className="text-gradient-yellow text-[11px] font-bold lg:text-xl"> {formatPrice(targetSkin.price)} </span>
                <img alt="coin" className="h-2.5 w-2.5 lg:h-4 lg:w-4" src="/assets/icons/coin.svg" />
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col">
              <div className="text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 shrink-0 z-10">
                <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug flex items-center justify-center h-full min-h-[22px] lg:min-h-0">Выберите предмет для апгрейда</h3>
              </div>
              <div className="relative flex-1">
                <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-[0] h-full w-full object-cover" />
                <img src="/assets/images/game/unknown-item-2.svg" alt="Unknown item" className="absolute top-1/2 left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Multipliers */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-3 order-7 lg:order-6 flex items-center justify-center mt-2 lg:mt-6 w-full h-12 lg:h-14">
          <div className="flex h-full w-full items-center justify-center space-x-1">
            {state.fastMultipliers.map((mult, idx) => (
              <button key={`mult-${idx}`} onClick={() => handleFastMultiplier(mult)} className="bg-[#131315] flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-[#FBD50633] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-[2.4375rem] lg:w-[3.25rem]">
                <span className="text-[13px] skew-x-6 transform lg:text-base text-[#8A8E99]">x{mult}</span>
              </button>
            ))}
            {state.fastPercentages.map((perc, idx) => (
              <button key={`perc-${idx}`} onClick={() => handleFastPercentage(perc)} className={`bg-[#131315] flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-[#FBD50633] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-[2.4375rem] lg:w-[3.25rem] btn-gradient-${idx + 1}`}>
                <span className="text-[13px] skew-x-6 transform lg:text-base text-[#8A8E99]">{perc}%</span>
              </button>
            ))}
            <button onClick={() => setIsSettingsOpen(true)} className="flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md bg-[linear-gradient(270deg,#17181C_0%,_rgba(23,24,28,0.00)_100%)] drop-shadow-[0_0_4px_rgba(0,0,0,0.20)] transition-colors hover:border-white/20 hover:bg-[#FBD50633] lg:h-[2.4375rem] lg:w-[3.25rem]">
              <img alt="settings" className="h-3.5 w-3.5 skew-x-6 transform lg:h-4 lg:w-4" src="https://s3.upgrader.pro/cdn/fa/icons/settings.svg" />
            </button>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-3 order-5 mt-2 lg:mt-6 w-full flex justify-center">
          <button
            type="button"
            onClick={handleSpin}
            disabled={spinning || !state.loggedIn}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-[#fcd60c] font-tektur font-semibold text-[#1C1C20] !w-full rounded-md lg:rounded-xl px-6 py-3 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] min-h-[41px] space-x-2 lg:space-x-3 lg:min-h-[56px] w-full flex-1 lg:max-w-[306px] text-[0.8125rem] lg:text-xl !h-[1rem] !max-h-[2rem] lg:min-w-[19.125rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            <img alt="" draggable="false" className="pointer-events-none h-3 w-3 flex-shrink-0 select-none lg:h-4 lg:w-4" src="/assets/icons/logo-black.svg" />
            <span className="pointer-events-none select-none">
              <span>{spinning ? "Прокачиваем..." : "Прокачать"}</span>
            </span>
          </button>
        </div>

      </div>

      {/* Bottom: Tabs (Mobile) / Grid (Desktop) */}
      <div className="w-full mt-4 lg:mt-3">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex w-[calc(100%+1rem)] -mx-2 px-2 bg-transparent rounded-t-xl">
          <div className="flex w-full bg-[#1C1D21] rounded-t-xl overflow-hidden">
            <button 
              className={`flex-1 py-3 text-[0.875rem] font-semibold transition-colors ${mobileTab === "inventory" ? "bg-[#25262B] text-white rounded-t-xl" : "text-[#8A8E99]"}`}
              onClick={() => setMobileTab("inventory")}
            >
              Мои предметы
            </button>
            <button 
              className={`flex-1 py-3 text-[0.875rem] font-semibold transition-colors ${mobileTab === "catalog" ? "bg-[#25262B] text-white rounded-t-xl" : "text-[#8A8E99]"}`}
              onClick={() => setMobileTab("catalog")}
            >
              Желаемые предметы
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-start lg:gap-6">
          <div className={`w-full ${mobileTab === "inventory" ? "block" : "hidden lg:block"}`}>
            <InventoryPanel 
              selectedUids={selectedUids} 
              onToggle={toggleItem} 
              mode={leftPanelMode}
              setMode={setLeftPanelMode}
              selectedShopIds={selectedShopIds}
              onToggleShopItem={toggleShopItem}
            />
          </div>
          <div className={`w-full ${mobileTab === "catalog" ? "block" : "hidden lg:block"}`}>
            <CatalogPanel 
              targetId={effectiveTarget} 
              onSelect={(id) => setTargetId(effectiveTarget === id ? "" : id)} 
            />
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}

