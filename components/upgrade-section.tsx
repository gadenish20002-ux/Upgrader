"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { useStore, getSkin, formatPrice, syncManager } from "@/lib/store"
import { UpgradeWheel, type UpgradeWheelHandle } from "./upgrade-wheel"
import { InventoryPanel } from "./inventory-panel"
import { CatalogPanel } from "./catalog-panel"
import { SettingsModal } from "./settings-modal"
import { CartModal } from "./cart-modal"
import { RARITY_COLORS } from "@/lib/default-data"
import { formatWeaponName, formatSkinName } from "@/lib/utils"
import { ChevronsUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"
import { Logo as SiteLogo } from "./logo"
import { WinAnimationOverlay, preloadWinAnimationFrames } from "./win-animation-overlay"
import { LoseAnimationOverlay, LOSE_CASE_SOUND, preloadLoseAnimationFrames } from "./lose-animation-overlay"
import type { InventoryItem } from "@/lib/types"

const WIN_FACTOR = 0.92 // house edge
const DEFAULT_INVENTORY_RECOMMENDATION_PERCENT = 80
const PERCENT_FILTER_SPREAD = 4
const MULTIPLIER_FILTER_SPREAD = 0.1

// Type removed since it's no longer stored in state

function getFastFilterPriceRange(type: "multiplier" | "percentage", value: number, inputValue: number) {
  if (inputValue <= 0) return null

  if (type === "multiplier") {
    const targetPrice = inputValue * value
    return {
      targetPrice,
      min: targetPrice * (1 - MULTIPLIER_FILTER_SPREAD),
      max: targetPrice * (1 + MULTIPLIER_FILTER_SPREAD),
    }
  }

  const targetChance = Math.min(92, Math.max(1, value))
  const minChance = Math.max(1, targetChance - PERCENT_FILTER_SPREAD)
  const maxChance = Math.min(92, targetChance + PERCENT_FILTER_SPREAD)
  const targetPrice = (inputValue * WIN_FACTOR) / (targetChance / 100)

  return {
    targetPrice,
    min: (inputValue * WIN_FACTOR) / (maxChance / 100),
    max: (inputValue * WIN_FACTOR) / (minChance / 100),
  }
}

export function UpgradeSection({ sidebarTargetId }: { sidebarTargetId: string | null }) {
  const { state, setState, removeFromInventory, addGameHistory, addItemHistory } = useStore()
  const wheelRef = useRef<UpgradeWheelHandle>(null)

  const [selectedUids, setSelectedUids] = useState<string[]>([])
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([])
  const [targetId, setTargetId] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const pendingWonItemUidRef = useRef<string | null>(null)
  const pendingHistoryEntryRef = useRef<import("@/lib/types").GameHistoryEntry | null>(null)
  const [winAnimating, setWinAnimating] = useState(false)
  const [winAnimKey, setWinAnimKey] = useState(0)
  const [loseAnimating, setLoseAnimating] = useState(false)
  const loseCaseAudioRef = useRef<HTMLAudioElement | null>(null)
  const [leftPanelMode, setLeftPanelMode] = useState<"inventory" | "shop">("inventory")
  const [mobileTab, setMobileTab] = useState<"inventory" | "catalog">("inventory")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [balanceInput, setBalanceInput] = useState(0)
  const [catalogPriceMin, setCatalogPriceMin] = useState<number | null>(null)
  const [catalogPriceMax, setCatalogPriceMax] = useState<number | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wonItemUid, setWonItemUid] = useState<string | null>(null)

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

  const selectedInventoryValue = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const skin = getSkin(state.skins, item!.skinId)
      return sum + (skin?.price ?? 0)
    }, 0)
  }, [selectedItems, state.skins])

  const inputValue = useMemo(() => selectedInventoryValue + balanceInput, [selectedInventoryValue, balanceInput])

  const targetSkinRaw = effectiveTarget ? getSkin(state.skins, effectiveTarget) : undefined

  const targetSkin = useMemo(() => {
    if (!targetSkinRaw) return undefined
    if (inputValue > 0) {
      const rawChance = (inputValue / targetSkinRaw.price) * WIN_FACTOR
      if (rawChance < 0.01 || rawChance > 0.8) {
        return undefined
      }
    }
    return targetSkinRaw
  }, [targetSkinRaw, inputValue])

  const chance = useMemo(() => {
    if (!targetSkin || inputValue <= 0) return 0
    const raw = (inputValue / targetSkin.price) * WIN_FACTOR
    return Math.min(0.92, Math.max(0.01, raw))
  }, [targetSkin, inputValue])

  const multiplier = targetSkin && inputValue > 0 ? targetSkin.price / inputValue : 0
  const isBothSelected = !!targetSkin && selectedItems.length > 0
  const isReadyForTarget = !targetSkin && inputValue > 0

  useEffect(() => {
    preloadWinAnimationFrames()
    void preloadLoseAnimationFrames()
  }, [])

  function applyFastFilter(type: "multiplier" | "percentage", value: number, currentInputValue: number) {
    const range = getFastFilterPriceRange(type, value, currentInputValue)
    if (!range) {
      setCatalogPriceMin(null)
      setCatalogPriceMax(null)
      return
    }

    setCatalogPriceMin(range.min)
    setCatalogPriceMax(range.max)

    const validSkins = state.upgradeSkins.filter(skin => {
      const chance = (currentInputValue / skin.price) * WIN_FACTOR;
      return chance >= 0.01 && chance <= 0.80;
    });

    const filteredSkins = validSkins.filter(skin => skin.price >= range.min && skin.price <= range.max)
    const sourceSkins = filteredSkins.length > 0 ? filteredSkins : validSkins

    const closest = sourceSkins.reduce((best, skin) => {
      if (!best) return skin
      return Math.abs(skin.price - range.targetPrice) < Math.abs(best.price - range.targetPrice)
        ? skin
        : best
    }, undefined as (typeof state.upgradeSkins)[number] | undefined)

    if (closest) {
      setTargetId(closest.id)
      setWonItemUid(null)
      if (window.innerWidth < 1024) {
        setMobileTab("catalog")
      }
    } else {
      setTargetId(null)
    }
  }

  function toggleItem(uid: string) {
    let newSelectedUids: string[] = []
    setSelectedUids((prev) => {
      if (prev.includes(uid)) {
        newSelectedUids = prev.filter((u) => u !== uid)
        return newSelectedUids
      }
      if (prev.length >= 6) {
        toast.error("Вы можете выбрать максимум 6 предметов")
        newSelectedUids = prev
        return prev
      }
      newSelectedUids = [...prev, uid]
      return newSelectedUids
    })
    
    // Auto-apply default filter only if there's no target selected
    // Note: since setState is async, we calculate the expected new inputValue
    setTimeout(() => {
      if (!targetId && !sidebarTargetId) {
        const newSelectedItems = newSelectedUids.map((id) => state.inventory.find((i) => i.uid === id)).filter(Boolean)
        const newInventoryValue = newSelectedItems.reduce((sum, item) => {
          const skin = getSkin(state.skins, item!.skinId)
          return sum + (skin?.price ?? 0)
        }, 0)
        const newInputValue = newInventoryValue + balanceInput
        
        if (newInputValue > 0) {
          applyFastFilter("percentage", DEFAULT_INVENTORY_RECOMMENDATION_PERCENT, newInputValue)
        }
      }
    }, 0)
    
    setWonItemUid(null)
  }

  function toggleShopItem(id: string) {
    setSelectedShopIds((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]))
    setWonItemUid(null)
  }

  function addShopItem(id: string) {
    setSelectedShopIds((prev) => [...prev, id])
  }

  function removeShopItem(id: string) {
    setSelectedShopIds((prev) => {
      const idx = prev.lastIndexOf(id)
      if (idx > -1) {
        const newArr = [...prev]
        newArr.splice(idx, 1)
        return newArr
      }
      return prev
    })
  }

  function clearSelection() {
    setSelectedUids([])
    setSelectedShopIds([])
    setBalanceInput(0)
    setWonItemUid(null)
    setCatalogPriceMin(null)
    setCatalogPriceMax(null)
  }

  function handleAddWonItem() {
    if (wonItemUid) {
      setSelectedUids([wonItemUid])
      setWonItemUid(null)
      
      const item = state.inventory.find((i) => i.uid === wonItemUid)
      const skin = item ? getSkin(state.skins, item.skinId) : null
      if (skin) {
        applyFastFilter("percentage", DEFAULT_INVENTORY_RECOMMENDATION_PERCENT, skin.price + balanceInput)
      }
    }
  }

  function handleFastMultiplier(multiplier: number) {
    if (inputValue <= 0) {
      toast.error("Выберите предметы или укажите баланс")
      return
    }
    applyFastFilter("multiplier", multiplier, inputValue)
  }

  function handleFastPercentage(percent: number) {
    if (inputValue <= 0) {
      toast.error("Выберите предметы или укажите баланс")
      return
    }
    applyFastFilter("percentage", percent, inputValue)
  }

  function stopLoseCaseSound() {
    const audio = loseCaseAudioRef.current
    if (!audio) return

    audio.pause()
    try {
      audio.currentTime = 0
    } catch {}
    audio.onended = null
    loseCaseAudioRef.current = null
  }

  function playLoseCaseSound() {
    if (state.soundMode !== "on") return

    stopLoseCaseSound()

    const audio = new Audio(LOSE_CASE_SOUND)
    audio.preload = "auto"
    audio.muted = false
    audio.volume = 1
    audio.currentTime = 0
    loseCaseAudioRef.current = audio
    const releaseAudio = () => {
      if (loseCaseAudioRef.current === audio) {
        loseCaseAudioRef.current = null
      }
      audio.onended = null
    }
    audio.onended = releaseAudio
    audio.play().catch(() => {
      if (loseCaseAudioRef.current === audio) {
        loseCaseAudioRef.current = null
      }
      audio.onended = null
    })
  }

  function handleBuyCartItems() {
    if (!state.loggedIn) {
      toast.error("Войдите через Steam, чтобы совершать покупки")
      return
    }
    if (selectedShopIds.length === 0) return

    const itemsToBuy = selectedShopItems
      .map((skin) => {
        if (!skin) return null
        return {
          uid: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          skinId: skin.id,
        } satisfies InventoryItem
      })
      .filter((item): item is InventoryItem => Boolean(item))

    const totalCartPrice = selectedShopItems.reduce((sum, skin) => sum + (skin!.price ?? 0), 0)
    
    if (totalCartPrice > state.balance) {
      toast.error("Недостаточно баланса")
      return
    }
    if (itemsToBuy.length === 0) return

    setState((p) => ({
      ...p,
      balance: Math.max(0, p.balance - totalCartPrice),
      inventory: [...itemsToBuy, ...p.inventory],
      upgrades: p.upgrades + itemsToBuy.length,
      userUpgrades: p.userUpgrades + itemsToBuy.length,
    }))
    
    addItemHistory(
      itemsToBuy.map((item) => ({
        id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        skinId: item.skinId,
        action: "bought",
        date: Date.now()
      }))
    )
    
    toast.success("Предметы успешно куплены!")
    if (state.soundMode === "on") {
      const audio = new Audio("/sounds/choiceSkin.mp3")
      audio.play().catch(() => {})
    }
    
    setSelectedShopIds([])
    setIsCartOpen(false)
  }

  // Keep the left card locked during animations so it doesn't disappear when state updates
  const lockedLeftCard = useRef<{ items: typeof selectedItems; balance: number; total: number } | null>(null)

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
    
    if (balanceInput > state.balance) {
      toast.error("Недостаточно баланса")
      return
    }
    // Chance bounds are now handled automatically by targetSkin becoming undefined

    if (state.soundMode === "on") {
      const audio = new Audio("/sounds/makeBet.mp3")
      audio.play().catch(() => {})
    }

    lockedLeftCard.current = {
      items: selectedItems,
      balance: balanceInput,
      total: inputValue,
    }

    syncManager.suppress(8000) // Prevent fetching state from server during animation
    setSpinning(true)

    // determine outcome — admin predict overrides chance
    let win: boolean
    if (state.predict.outcome === "win") {
      win = true
    } else if (state.predict.outcome === "lose") {
      win = false
    } else if (state.predict.outcome === "win_after_losses") {
      const current = state.predict.currentLosses || 0
      const target = state.predict.targetLosses || 3
      if (current >= target) {
        win = true
        setState((p) => ({ ...p, predict: { ...p.predict, currentLosses: 0 } }))
      } else {
        win = false
        setState((p) => ({ ...p, predict: { ...p.predict, currentLosses: current + 1 } }))
      }
    } else {
      win = Math.random() < chance
    }

    const result = await wheelRef.current!.spin(win)

    let newUid: string | null = null

    if (result) {
      newUid = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setState((p) => ({
        ...p,
        balance: Math.max(0, p.balance - balanceInput),
        inventory: [
          { uid: newUid!, skinId: targetSkin.id },
          ...p.inventory,
        ],
        upgrades: p.upgrades + 1,
        userUpgrades: p.userUpgrades + 1,
      }))
      toast.success(`Победа! Вы получили ${targetSkin.weapon} | ${targetSkin.name}`)
      if (state.soundMode === "on") {
        const winAudio = new Audio("/sounds/fireworkWin.mp3")
        winAudio.play().catch(() => {})
      }
      setWinAnimating(true)
      setWinAnimKey((k) => k + 1)
      setLeftPanelMode("inventory")
      setMobileTab("inventory")
    } else {
      removeFromInventory(selectedUids)
      setState((p) => ({ ...p, upgrades: p.upgrades + 1, userUpgrades: p.userUpgrades + 1, balance: Math.max(0, p.balance - balanceInput) }))
      const shouldShowLoseAnim = selectedInventoryValue > 50
      if (shouldShowLoseAnim) {
        playLoseCaseSound()
        setLoseAnimating(true)
      } else {
        toast.error("Не повезло. Попробуйте снова!")
        if (pendingHistoryEntryRef.current) {
          addGameHistory(pendingHistoryEntryRef.current)
          pendingHistoryEntryRef.current = null
        }
        lockedLeftCard.current = null
        clearSelection()
      }
    }
    
    // Если есть анимация, сброс перенесён в onComplete
    if (result && newUid) {
      pendingWonItemUidRef.current = newUid
    }
    
    const displaySkinId = lockedLeftCard.current?.items[0]?.skinId ?? ""
    pendingHistoryEntryRef.current = {
      id: Math.floor(Math.random() * 1000000000).toString(),
      betPrice: inputValue,
      betSkinId: displaySkinId || "balance",
      targetPrice: targetSkin.price,
      targetSkinId: targetSkin.id,
      chance: Math.round(chance * 100 * 100) / 100,
      status: result ? "win" : "loss",
    }
    
    setSpinning(false)
  }

  // Resolved display values for the left card
  const displayItems = lockedLeftCard.current ? lockedLeftCard.current.items : selectedItems
  const displayBalance = lockedLeftCard.current ? lockedLeftCard.current.balance : balanceInput
  const displayTotal = lockedLeftCard.current ? lockedLeftCard.current.total : inputValue
  const displaySkinId = displayItems[0]?.skinId ?? ""
  const displayHasSkin = displayItems.length > 0
  const displayHasBalance = displayBalance > 0
  const displayIsEmpty = !displayHasSkin && !displayHasBalance

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto px-2">
      {/* Relative wrapper so LoseAnimationOverlay can be absolute within it */}
      <div className="relative w-full flex flex-col items-center">
      {/* Top: Logo */}
      <div className="flex items-center justify-center gap-[0.3125rem] lg:gap-2 mb-2 lg:mb-2 mt-2 lg:mt-0">
        <SiteLogo className="h-[1.5125rem] w-[1.5125rem] lg:h-8 lg:w-8" />
        <span className="font-tektur text-xl font-extrabold text-white lg:text-2xl"> UPGRADER </span>
      </div>

      {/* Main Upgrade Interface: Unified Grid for Mobile & Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] w-full items-start gap-x-[0.4375rem] gap-y-1.5 lg:gap-x-5 lg:gap-y-0 lg:mt-8 transition-all duration-300 ease-out">
        
        {/* Settings Icons */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1 order-1 flex gap-2 lg:mb-2 self-end">
          <button className="transition-all duration-200 hover:brightness-50" aria-label="Информация">
            <img src="/assets/info-circle.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button onClick={() => setIsSettingsOpen(true)} className="transition-all duration-200 hover:brightness-50" aria-label="Настройки">
            <img src="/assets/icons/settings.svg" alt="" className="h-4 w-4 lg:h-4 lg:w-4" />
          </button>
          <button onClick={() => setState((p) => ({ ...p, soundMode: p.soundMode === "on" ? "off" : "on" }))} className={`transition-all duration-200 hover:brightness-50 flex items-center justify-center ${state.soundMode === "on" ? "text-[#fde338]" : "text-[#A7A7A7]"}`} aria-label="Звук">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-4 lg:w-4">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.50718 2.46084C7.65333 2.52143 7.77823 2.624 7.86609 2.75558C7.95395 2.88715 8.00078 3.04182 8.00078 3.20004V12.8C8.00075 12.9583 7.95381 13.1129 7.8659 13.2444C7.778 13.3759 7.65306 13.4784 7.5069 13.539C7.36074 13.5995 7.19992 13.6154 7.04476 13.5845C6.8896 13.5536 6.74706 13.4775 6.63518 13.3656L3.66958 10.4H1.60078C1.38861 10.4 1.18513 10.3158 1.03509 10.1657C0.885069 10.0157 0.800781 9.81218 0.800781 9.60002V6.40004C0.800781 6.18786 0.885069 5.98439 1.03509 5.83435C1.18513 5.68432 1.38861 5.60004 1.60078 5.60004H3.66958L6.63518 2.63444C6.74706 2.52249 6.88962 2.44625 7.04485 2.41534C7.20006 2.38444 7.36097 2.40027 7.50718 2.46084ZM11.7264 2.34324C11.8764 2.19326 12.0798 2.10901 12.292 2.10901C12.5041 2.10901 12.7076 2.19326 12.8576 2.34324C13.6014 3.08536 14.1913 3.96712 14.5935 4.93789C14.9956 5.90865 15.202 6.94929 15.2008 8.00002C15.202 9.05083 14.9956 10.0915 14.5935 11.0622C14.1913 12.033 13.6014 12.9147 12.8576 13.6568C12.7067 13.8026 12.5046 13.8832 12.2949 13.8814C12.0851 13.8795 11.8845 13.7954 11.7361 13.6471C11.5878 13.4987 11.5037 13.2981 11.5018 13.0883C11.5 12.8786 11.5806 12.6765 11.7264 12.5256C12.3217 11.9321 12.7937 11.2267 13.1154 10.45C13.4372 9.6733 13.6021 8.84066 13.6008 8.00002C13.6008 6.23204 12.8856 4.63364 11.7264 3.47444C11.5764 3.32442 11.4921 3.12097 11.4921 2.90884C11.4921 2.6967 11.5764 2.49326 11.7264 2.34324ZM9.46318 4.60564C9.5375 4.53126 9.62574 4.47225 9.72286 4.43199C9.81998 4.39173 9.92406 4.37101 10.0292 4.37101C10.1343 4.37101 10.2384 4.39173 10.3355 4.43199C10.4326 4.47225 10.5209 4.53126 10.5952 4.60564C11.0415 5.05097 11.3954 5.58009 11.6366 6.16261C11.8778 6.74512 12.0016 7.36955 12.0008 8.00002C12.0016 8.63051 11.8778 9.25491 11.6365 9.83746C11.3953 10.4199 11.0414 10.9491 10.5952 11.3944C10.4451 11.5446 10.2415 11.6289 10.0292 11.6289C9.81686 11.6289 9.61326 11.5446 9.46318 11.3944C9.3131 11.2443 9.2287 11.0407 9.2287 10.8284C9.2287 10.6162 9.3131 10.4126 9.46318 10.2624C9.76094 9.96579 9.99702 9.61315 10.158 9.22491C10.3189 8.83659 10.4014 8.42034 10.4008 8.00002C10.4014 7.57973 10.3189 7.16345 10.158 6.77517C9.9971 6.38688 9.76094 6.03427 9.46318 5.73764C9.38878 5.66334 9.32982 5.57511 9.2895 5.47799C9.24926 5.38087 9.22854 5.27677 9.22854 5.17164C9.22854 5.0665 9.24926 4.9624 9.2895 4.86529C9.32982 4.76817 9.38878 4.67994 9.46318 4.60564Z" fill="currentColor"/>
            </svg>
          </button>
          <button onClick={() => setState((p) => ({ ...p, fastMode: !p.fastMode }))} className={`transition-all duration-200 hover:brightness-50 flex items-center justify-center ${state.fastMode ? "text-[#fde338]" : "text-[#A7A7A7]"}`} aria-label="Быстрый режим">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-4 lg:w-4">
              <path d="M9.50851 5.48747C9.46479 5.39359 9.37063 5.33334 9.26692 5.33334H6.10692L9.22557 0.409344C9.27757 0.327219 9.28076 0.223219 9.23385 0.138156C9.18692 0.0528125 9.09729 0 9.00023 0H4.73357C4.63251 0 4.54023 0.0570625 4.49492 0.147469L0.494916 8.14747C0.453572 8.22987 0.458103 8.328 0.506635 8.40666C0.555447 8.48531 0.641041 8.53331 0.733572 8.53331H3.4757L0.487697 15.6298C0.43676 15.7512 0.482103 15.892 0.594353 15.9608C0.637541 15.9872 0.685541 16 0.733291 16C0.809822 16 0.885291 15.9672 0.937572 15.9053L9.47092 5.77197C9.53782 5.69253 9.55223 5.58159 9.50851 5.48747Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Center Wheel */}
        <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 order-2 flex flex-col items-center justify-center relative z-20 py-2">
          <div className="relative flex justify-center w-full">
            <UpgradeWheel ref={wheelRef} chance={chance} hasSelection={spinning || (!!targetSkin && inputValue > 0)} fastMode={state.fastMode} soundMode={state.soundMode} showPercentages={state.predict.showPercentages !== false} />
          </div>
        </div>

        {/* Left Card */}
        <div 
          className="col-span-1 lg:col-span-1 lg:col-start-1 lg:row-start-2 order-3 flex flex-col rounded-md lg:rounded-xl bg-[#17181C] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] overflow-hidden w-full lg:self-center aspect-[10.275/9.625] lg:aspect-[23.1875/21.5] relative"
          style={displayHasSkin && displaySkinId ? { 
            background: `linear-gradient(90deg, ${RARITY_COLORS[getSkin(state.skins, displaySkinId)?.rarity ?? ""] ?? "transparent"}26 0.05%, rgba(28, 28, 32, 0) 99.95%) #17181C` 
          } : undefined}
        >
          {displayIsEmpty ? (
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 right-0 text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 z-10 flex flex-col items-center justify-center space-y-[0.125rem] lg:space-y-[0.5rem] min-h-[22px] lg:min-h-0">
                <span className="text-[9px] font-bold text-white lg:text-[13px] leading-tight lg:leading-snug font-exo2">Выберите скины или скины и баланс для использования</span>
                <span className="lg:text-xxs text-[0.4375rem] text-[#A7A7A7]">Вы можете выбрать несколько скинов</span>
              </div>
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-0 h-full w-full object-cover" />
                <img src="/assets/unknown-item.svg" alt="Unknown item" className="absolute top-[52%] left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
              </div>
            </div>
          ) : displayItems.length >= 2 ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-[#17181C] p-2">
              <button 
                onClick={clearSelection}
                className="absolute top-1.5 right-1.5 z-10 flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] transition-colors hover:bg-gray-700 lg:top-3 lg:right-3 lg:h-8 lg:w-8"
              >
                <img alt="Close" className="h-2 w-2 lg:h-4 lg:w-4" src="/assets/close-gray.svg" />
              </button>
              <div className="z-[2] grid min-w-full grid-cols-3 gap-1 lg:gap-2">
                {displayItems.map((item) => {
                  const skin = getSkin(state.skins, item!.skinId)!
                  const rarityColor = RARITY_COLORS[skin.rarity] || "#8847ff"
                  return (
                    <div key={item!.uid} className="aspect-square h-full w-full cursor-pointer">
                      <div
                        className="group relative h-full w-full rounded-md p-px shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]"
                        style={{ background: `linear-gradient(137deg, ${rarityColor} 10%, rgb(28,28,32) 75%)` }}
                      >
                        <div
                          className="relative flex h-full w-full items-center justify-center rounded-md overflow-hidden"
                          style={{ backgroundColor: '#17181c' }}
                        >
                          <div className="absolute top-0.5 right-0.5 z-[2] flex items-center space-x-0.5 lg:top-1 lg:right-1">
                            <span className="font-tektur font-bold text-white leading-normal" style={{ fontSize: 'clamp(3px, 1.2vw, 7px)' }}>
                              {formatPrice(skin.price)}
                            </span>
                            <img alt="" className="h-[5px] w-[5px] lg:h-[9px] lg:w-[9px]" src="/assets/icons/coin.svg" />
                          </div>
                          <img
                            className="z-[1] w-full max-w-[75%] object-contain"
                            src={skin.image || "/placeholder.svg"}
                            alt={skin.name}
                          />
                          <div className="absolute left-1/2 z-[2] w-full max-w-[85%] -translate-x-1/2 flex flex-col items-center justify-center text-center" style={{ bottom: '6%' }}>
                            <span className="font-semibold leading-none text-[#A7A7A7]" style={{ fontSize: 'clamp(2px, 0.9vw, 6px)' }}>{formatWeaponName(skin.weapon)}</span>
                            <span className="font-tektur font-bold leading-none truncate w-full text-center text-white" style={{ fontSize: 'clamp(3px, 1.2vw, 8px)' }}>{formatSkinName(skin.name)}</span>
                          </div>
                          <div
                            className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200"
                            style={{ background: `radial-gradient(circle, ${rarityColor}66 0%, ${rarityColor}33 30%, ${rarityColor}1a 45%, transparent 70%)` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
                {displayHasBalance && (
                  <div className="aspect-square h-full w-full">
                    <div className="group relative h-full w-full rounded-md p-px shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]" style={{ background: `linear-gradient(137deg, #FBD506 10%, rgb(28,28,32) 75%)` }}>
                      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-1 lg:space-y-2 rounded-md overflow-visible" style={{ backgroundColor: '#17181c' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-[1.2rem] w-[1.2rem] lg:h-[2rem] lg:w-[2rem] items-center justify-center rounded-full bg-[linear-gradient(93deg,#FBD506_1.16%,#FFDD23_50.58%,#FBD506_100%)] shadow-[0_0_5.607px_0_rgba(255,255,255,0.10)]">
                          <img alt="" className="h-[0.6rem] w-[0.6rem] lg:h-[1rem] lg:w-[1rem]" src="/assets/profitBlack.svg" />
                        </div>
                        <span className="font-semibold text-white text-[0.4rem] lg:text-[0.8rem] leading-none z-[1]">Ставка</span>
                        <div className="flex items-center justify-center gap-[0.2rem] rounded-[0.3rem] border border-white/10 px-[0.4rem] py-[0.2rem] lg:px-[0.6rem] lg:py-[0.35rem] z-[1] bg-[#17181c]">
                          <span className="font-semibold text-white text-[0.4rem] lg:text-[0.7rem] leading-none">{formatPrice(displayBalance)}</span>
                          <img alt="" className="h-[0.4rem] w-[0.4rem] lg:h-[0.7rem] lg:w-[0.7rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200" style={{ background: `radial-gradient(circle, #FBD50666 0%, #FBD50633 30%, #FBD5061a 45%, transparent 70%)` }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center space-x-0.5 z-[3] lg:bottom-4">
                <span className="font-tektur text-gradient-yellow font-bold" style={{ fontSize: 'clamp(6px, 2vw, 18px)' }}>{formatPrice(inputValue)}</span>
                <img alt="" className="h-[7px] w-[7px] lg:h-4 lg:w-4" src="/assets/icons/coin.svg" />
              </div>
              <img alt="" className="absolute top-1/2 left-1/2 z-[0] w-full max-w-[14rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40" src="/assets/images/game/unknown-item-shadow.webp" />
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center">
              <button 
                onClick={clearSelection}
                className="absolute top-2 right-2 z-10 flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] transition-colors hover:bg-gray-700 lg:top-3 lg:right-3 lg:h-8 lg:w-8"
              >
                <img alt="Close" className="h-2 w-2 lg:h-4 lg:w-4" src="/assets/close-gray.svg" />
              </button>

              {displayHasSkin && displayHasBalance ? (
                /* ── Skin + Balance: split view with "Ставка" card ── */
                (() => {
                  const skin = getSkin(state.skins, displaySkinId);
                  if (!skin) return null;
                  const skinPrice = skin.price ?? 0;
                  return (
                    <div className="flex h-full w-full flex-col items-center justify-between py-1 px-1 lg:py-3 lg:px-3">
                      {/* Skin name at top */}
                      <div className="flex flex-col items-center text-center shrink-0 mb-1">
                        <span className="text-[#4a4852] text-xxxxs font-semibold lg:text-xs leading-none">{formatWeaponName(skin.weapon)}</span>
                        <span className="text-[#f7f7f8] text-[0.45rem] font-bold lg:text-sm leading-tight truncate max-w-full">{formatSkinName(skin.name)}</span>
                      </div>

                      {/* Two square cards side by side */}
                      <div className="relative flex flex-1 w-full items-center justify-center gap-1 min-h-0">

                        {/* Left square: skin image */}
                        <div className="relative aspect-square flex-1 rounded-[0.375rem] overflow-hidden bg-[#1a1b1f] border border-white/10 flex items-center justify-center">
                          {/* Price badge top-right */}
                          <div className="absolute top-1 right-1 z-[3] flex items-center space-x-0.5">
                            <span className="font-tektur text-gradient-yellow text-[0.4rem] lg:text-[0.55rem] font-bold">{formatPrice(skinPrice)}</span>
                            <img alt="" className="h-[0.45rem] w-[0.45rem] lg:h-[0.6rem] lg:w-[0.6rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                          </div>
                          <img
                            className="z-[2] w-[85%] h-[85%] object-contain drop-shadow-xl"
                            src={skin.image || "/placeholder.svg"}
                            alt={skin.name}
                          />
                        </div>

                        {/* Right square: Ставка */}
                        <div className="relative aspect-square flex-1 rounded-[0.375rem] bg-[#17181C] border border-white/10 shadow-[0_0_5.607px_0_rgba(255,160,0,0.08)] flex flex-col items-center justify-center space-y-1 lg:space-y-2 overflow-visible">
                          {/* Golden profit icon — top center, half sticking out above */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-[1.5rem] w-[1.5rem] lg:h-[2.45rem] lg:w-[2.45rem] items-center justify-center rounded-full bg-[linear-gradient(93deg,#FBD506_1.16%,#FFDD23_50.58%,#FBD506_100%)] shadow-[0_0_5.607px_0_rgba(255,255,255,0.10)]">
                            <img alt="" className="h-[0.75rem] w-[0.75rem] lg:h-[1.401rem] lg:w-[1.401rem]" src="/assets/profitBlack.svg" />
                          </div>
                          <span className="font-semibold text-white text-[0.5rem] lg:text-[1rem] leading-none">Ставка</span>
                          <div className="flex items-center justify-center gap-[0.2rem] rounded-[0.3rem] border border-white/10 px-[0.4rem] py-[0.2rem] lg:px-[0.6rem] lg:py-[0.35rem]">
                            <span className="font-semibold text-white text-[0.5rem] lg:text-[0.9rem] leading-none">{formatPrice(displayBalance)}</span>
                            <img alt="" className="h-[0.5rem] w-[0.5rem] lg:h-[0.9rem] lg:w-[0.9rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                          </div>
                        </div>
                      </div>

                      {/* Total price at bottom */}
                      <div className="flex items-center justify-center space-x-0.5 lg:space-x-1 shrink-0 mt-1">
                        <span className="text-gradient-yellow text-xxs font-bold lg:text-lg">{formatPrice(displayTotal)}</span>
                        <img alt="coin" className="h-2 w-2 lg:h-3.5 lg:w-3.5" src="/assets/icons/coin.svg" />
                      </div>
                    </div>
                  )
                })() 
              ) : displayHasSkin ? (
                /* ── Only skin selected, no balance ── */
                (() => {
                  const skin = getSkin(state.skins, displaySkinId);
                  if (!skin) return null;
                  return (
                    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 lg:px-8 lg:py-6">
                      <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center">
                        <span className="text-[#4a4852] text-xxxxs text-center font-semibold lg:text-xs"> {formatWeaponName(skin.weapon)} </span>
                        <span className="text-[#f7f7f8] text-center text-xs font-bold lg:text-2xl"> {formatSkinName(skin.name)} </span>
                      </div>
                      <div className="relative w-full flex-1 min-h-0">
                        <img className="absolute inset-0 m-auto z-[2] w-[80%] max-h-full object-contain drop-shadow-2xl" src={skin.image || "/placeholder.svg"} alt={skin.name} />
                      </div>
                      <div className="z-[2] flex items-center justify-between space-x-0.5 lg:space-x-1.5 shrink-0 mt-1">
                        <span className="text-gradient-yellow text-xxs font-bold lg:text-xl"> {formatPrice(displayTotal)} </span>
                        <img alt="coin" className="h-2.5 w-2.5 lg:h-4 lg:w-4" src="/assets/icons/coin.svg" />
                      </div>
                    </div>
                  )
                })()
              ) : (
                /* ── Only balance, no skin ── */
                <div className="flex flex-col items-center justify-center w-full h-full px-4 py-2 lg:px-8 lg:py-6">
                  <span className="text-[#4a4852] text-xxxxs text-center font-semibold lg:text-xs">Баланс</span>
                  <div className="z-[2] flex items-center justify-between space-x-0.5 lg:space-x-1.5 shrink-0 mt-1">
                    <span className="text-gradient-yellow text-xxs font-bold lg:text-xl"> {formatPrice(displayTotal)} </span>
                    <img alt="coin" className="h-2.5 w-2.5 lg:h-4 lg:w-4" src="/assets/icons/coin.svg" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


        {/* Balance Slider */}
        <div className="lose-anim-upgrade-control col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-3 order-6 lg:order-4 w-full lg:mt-6">
          <div
            className="bg-block flex h-full w-full flex-col items-center justify-start space-y-2 rounded-md p-2 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] lg:px-3 transition-opacity duration-200"
            style={{ opacity: selectedItems.length === 0 ? 0.4 : 1, pointerEvents: selectedItems.length === 0 ? "none" : "auto" }}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-gray text-xxs lg:text-xs font-exo2">Сумма баланса:</span>
              <div className="flex items-center justify-end space-x-2">
                <div className="flex items-center justify-end space-x-0.5">
                  <span className="text-gradient-yellow text-xs font-semibold lg:text-sm font-exo2"> {formatPrice(balanceInput)} </span>
                  <img alt="" className="h-3 w-3" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                </div>
                <span className="text-gray text-xxxs lg:text-xxs font-exo2">(max {formatPrice(state.balance)})</span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              step="0.01" 
              className="custom-range w-full" 
              max={state.balance > 0 ? state.balance : 100} 
              value={balanceInput}
              onChange={(e) => {
                setBalanceInput(Number(e.target.value))
                setWonItemUid(null)
              }}
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
            <div className="relative flex h-full w-full flex-col items-center justify-between px-4 py-2 lg:px-8 lg:py-6">
              <button 
                onClick={() => {
                  if (spinning || loseAnimating || winAnimating) return
                  setTargetId(null)
                }}
                className="absolute top-2 right-2 z-10 flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] transition-colors hover:bg-gray-700 lg:top-3 lg:right-3 lg:h-8 lg:w-8"
              >
                <img alt="Close" className="h-2 w-2 lg:h-4 lg:w-4" src="/assets/close-gray.svg" />
              </button>
              
              <div className="z-[2] mb-0.5 flex flex-col items-center justify-between text-center">
                <span className="text-[#4a4852] text-xxxxs text-center font-semibold lg:text-xs"> {formatWeaponName(targetSkin.weapon)} </span>
                <span className="text-[#f7f7f8] text-center text-xs font-bold lg:text-2xl"> {formatSkinName(targetSkin.name)} </span>
              </div>
              
              <div className="relative w-full flex-1 min-h-0 my-1 lg:my-2">
                <img
                  key={`weapon-${winAnimKey}`}
                  className={`absolute inset-0 m-auto z-[2] w-[80%] max-h-full object-contain drop-shadow-2xl${winAnimating ? " animate-win-rock will-change-transform" : ""}`}
                  src={targetSkin.image || "/placeholder.svg"}
                  alt={targetSkin.name}
                />
              </div>
              
              <div className="z-[2] flex items-center justify-between space-x-0.5 lg:space-x-1.5 shrink-0">
                <span className={`text-xxs font-bold lg:text-xl transition-colors duration-300${winAnimating ? " text-[#4ade80]" : " text-gradient-yellow"}`}>
                  {formatPrice(targetSkin.price)}
                </span>
                <img
                  key={`coin-${winAnimKey}`}
                  alt="coin"
                  className={`h-2.5 w-2.5 lg:h-4 lg:w-4${winAnimating ? " animate-win-coin-green" : ""}`}
                  src="/assets/coin.svg"
                />
              </div>

            </div>
          ) : (
            <div className="relative h-full w-full">
              <div className="absolute top-0 left-0 right-0 text-center px-2 py-3 lg:px-5 lg:pt-5 lg:pb-3 z-10">
                <h3 className="font-bold text-white text-[9px] leading-tight lg:text-[13px] lg:leading-snug flex items-center justify-center h-full min-h-[22px] lg:min-h-0 font-exo2">Выберите предмет для апгрейда</h3>
              </div>
              <div className="absolute inset-0 z-0">
                <img src="/assets/images/game/unknown-item-shadow.webp" alt="" className="absolute inset-0 z-0 h-full w-full object-cover" />
                <img src="/assets/images/game/unknown-item-2.svg" alt="Unknown item" className="absolute top-[52%] left-1/2 z-[1] h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 object-contain" />
              </div>
            </div>
          )}

          {/* Win Animation Overlay */}
          <WinAnimationOverlay
            playing={winAnimating}
            onComplete={() => {
              setWinAnimating(false)
              if (pendingHistoryEntryRef.current) {
                addGameHistory(pendingHistoryEntryRef.current)
                pendingHistoryEntryRef.current = null
              }
              lockedLeftCard.current = null
              clearSelection()
              if (pendingWonItemUidRef.current) {
                setWonItemUid(pendingWonItemUidRef.current)
                pendingWonItemUidRef.current = null
              }
            }}
          />
        </div>

        {/* Upgrade Multipliers */}
        <div className="lose-anim-upgrade-control col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-3 order-7 lg:order-6 flex items-center justify-center lg:mt-6 w-full h-12 lg:h-14">
          <div className="flex h-full w-full items-center justify-center space-x-1">
            {state.fastMultipliers.map((mult, idx) => (
              <button key={`mult-${idx}`} onClick={() => handleFastMultiplier(mult)} className={`bg-[#131315] flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border transition-colors hover:border-white/20 hover:bg-[#FBD50633] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-[2.4375rem] lg:w-[3.25rem] ${isReadyForTarget ? 'animate-pulse-border-glow border-[#f7d324]' : 'border-white/10'}`}>
                <span className="text-[13px] skew-x-6 transform lg:text-base text-[#8A8E99] font-exo2">
                  {state.predict.showMultipliers !== false ? `x${mult}` : mult}
                </span>
              </button>
            ))}
            {state.fastPercentages.map((perc, idx) => (
              <button key={`perc-${idx}`} onClick={() => handleFastPercentage(perc)} className={`bg-[#131315] flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border transition-colors hover:border-white/20 hover:bg-[#FBD50633] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:h-[2.4375rem] lg:w-[3.25rem] ${isReadyForTarget ? 'animate-pulse-border-glow border-[#f7d324]' : `border-white/10 btn-gradient-${idx + 1}`}`}>
                <span className="text-[13px] skew-x-6 transform lg:text-base text-[#8A8E99] font-exo2">
                  {state.predict.showPercentages !== false ? `${perc}%` : perc}
                </span>
              </button>
            ))}
            <button onClick={() => setIsSettingsOpen(true)} className="flex h-8 w-10 flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md bg-[linear-gradient(270deg,#17181C_0%,_rgba(23,24,28,0.00)_100%)] drop-shadow-[0_0_4px_rgba(0,0,0,0.20)] transition-colors hover:border-white/20 hover:bg-[#FBD50633] lg:h-[2.4375rem] lg:w-[3.25rem]">
              <img alt="settings" className="h-3.5 w-3.5 skew-x-6 transform lg:h-4 lg:w-4" src="https://s3.upgrader.pro/cdn/fa/icons/settings.svg" />
            </button>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="lose-anim-upgrade-control col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-3 order-5 lg:mt-6 w-full flex justify-center">
          <button
            type="button"
            onClick={wonItemUid ? handleAddWonItem : handleSpin}
            disabled={spinning || (!wonItemUid && !state.loggedIn)}
            className="inline-flex items-center justify-center transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-[#fcd60c] font-semibold font-exo2 text-[#1C1C20] !w-full rounded-md lg:rounded-xl px-6 py-3 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] min-h-[41px] space-x-2 lg:space-x-3 lg:min-h-[56px] w-full flex-1 lg:max-w-[306px] text-[0.8125rem] lg:text-xl !h-[1rem] !max-h-[2rem] lg:min-w-[19.125rem] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            <img alt="" draggable="false" className="pointer-events-none h-3 w-3 flex-shrink-0 select-none lg:h-4 lg:w-4" src="/assets/icons/logo-black.svg" />
            <span className="pointer-events-none select-none">
              <span>{wonItemUid ? "Добавить в апгрейд" : spinning ? "Прокачиваем..." : "Прокачать"}</span>
            </span>
          </button>
        </div>

      </div>

      {/* Lose animation overlay — absolute within this relative wrapper */}
      <LoseAnimationOverlay
        playing={loseAnimating}
        onComplete={(awardedSkinId?: string) => {
          stopLoseCaseSound()
          setLoseAnimating(false)
          
          if (pendingHistoryEntryRef.current) {
             if (awardedSkinId) {
               pendingHistoryEntryRef.current.status = "compensation"
               pendingHistoryEntryRef.current.resultSkinId = awardedSkinId
             }
             addGameHistory(pendingHistoryEntryRef.current)
             pendingHistoryEntryRef.current = null
          }

          lockedLeftCard.current = null
          clearSelection()
        }}
        onStopSound={stopLoseCaseSound}
      />

      </div>{/* end relative wrapper */}

      {/* Bottom: Tabs (Mobile) / Grid (Desktop) */}
      <div className="w-full mt-4 lg:mt-3">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex w-[calc(100%+1rem)] -mx-2 px-2 bg-transparent rounded-t-xl">
          <div className="flex w-full bg-[#1C1D21] rounded-t-xl overflow-hidden">
            <button 
              className={`flex-1 py-3 text-[0.875rem] font-semibold transition-colors ${mobileTab === "inventory" ? "bg-[#1E1F23] text-white rounded-t-xl" : "text-[#8A8E99]"}`}
              onClick={() => setMobileTab("inventory")}
            >
              Мои предметы
            </button>
            <button 
              className={`flex-1 py-3 text-[0.875rem] font-semibold transition-colors ${mobileTab === "catalog" ? "bg-[#1E1F23] text-white rounded-t-xl" : "text-[#8A8E99]"}`}
              onClick={() => setMobileTab("catalog")}
            >
              Желаемые предметы
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 items-start lg:gap-2">
          <div className={`w-full ${mobileTab === "inventory" ? "block" : "hidden lg:block"}`}>
            <InventoryPanel 
              selectedUids={selectedUids} 
              onToggle={toggleItem} 
              mode={leftPanelMode}
              setMode={setLeftPanelMode}
              selectedShopIds={selectedShopIds}
              onToggleShopItem={toggleShopItem}
              onAddShopItem={addShopItem}
              onRemoveShopItem={removeShopItem}
              onOpenCart={() => setIsCartOpen(true)}
              onQuickBuy={handleBuyCartItems}
              isSpinning={spinning || loseAnimating || winAnimating}
            />
          </div>
          <div className={`w-full ${mobileTab === "catalog" ? "block" : "hidden lg:block"}`}>
            <CatalogPanel 
              targetId={effectiveTarget} 
              onSelect={(id) => {
                setTargetId(effectiveTarget === id ? "" : id)
                setWonItemUid(null)
                setCatalogPriceMin(null)
                setCatalogPriceMax(null)
              }} 
              priceMin={catalogPriceMin}
              priceMax={catalogPriceMax}
              isSpinning={spinning || loseAnimating || winAnimating}
              inputValue={inputValue}
            />
          </div>
        </div>
      </div>


      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedShopIds={selectedShopIds}
        onRemoveItem={removeShopItem}
        onClearCart={() => setSelectedShopIds([])}
        onBuy={handleBuyCartItems}
      />
    </div>
  )
}
