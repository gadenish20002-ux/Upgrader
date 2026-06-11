"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { X } from "lucide-react"
import { COMPENSATION_BONUS_ITEMS, RARITY_COLORS } from "@/lib/default-data"
import { formatPrice, useStore } from "@/lib/store"
import type { Skin } from "@/lib/types"
import { formatSkinName, formatWeaponName } from "@/lib/utils"
import { toast } from "sonner"

interface LoseAnimationOverlayProps {
  playing: boolean
  onComplete?: (awardedSkinId?: string) => void
  onStopSound?: () => void
}

type Phase = "case" | "skipping" | "roulette" | "result"

interface TapeEntry {
  key: string
  skin: Skin
  isWinner: boolean
}

type CssVars = CSSProperties & Record<`--${string}`, string | number>

const TARGET_INDEX = 5200
const TAPE_LENGTH = 96
const VISIBLE_TAPE_LENGTH = 11
const ROULETTE_CENTER_SLOT = Math.floor(VISIBLE_TAPE_LENGTH / 2)
const ROULETTE_START_INDEX = 10
export const LOSE_CASE_SOUND = "/sounds/openCompensationCase.mp3"
const CASE_FRAME_COUNT = 81
const CASE_FRAME_DURATION_MS = 2984
const ROULETTE_SPIN_MS = 9500
const ROULETTE_SLOWDOWN_START_MS = 5000
const ROULETTE_SLOWDOWN_START = ROULETTE_SLOWDOWN_START_MS / ROULETTE_SPIN_MS
const ROULETTE_SLOW_APPROACH_START_MS = 6400
const ROULETTE_SLOW_APPROACH_START = ROULETTE_SLOW_APPROACH_START_MS / ROULETTE_SPIN_MS
const ROULETTE_FINAL_APPROACH_START_MS = 8100
const ROULETTE_FINAL_APPROACH_START = ROULETTE_FINAL_APPROACH_START_MS / ROULETTE_SPIN_MS
const ROULETTE_PROGRESS_AT_SLOWDOWN = 1 - 50 / (TARGET_INDEX - ROULETTE_START_INDEX)
const ROULETTE_PROGRESS_AT_SLOW_APPROACH = 1 - 20 / (TARGET_INDEX - ROULETTE_START_INDEX)
const ROULETTE_PROGRESS_AT_FINAL_APPROACH = 1 - 5 / (TARGET_INDEX - ROULETTE_START_INDEX)
const ROULETTE_FINAL_BRAKE_POWER = 1.7
const ROULETTE_REVEAL_MS = 1650
const STICKER_CHANCE = 0.95



export function preloadLoseAnimationFrames() {
  if (typeof window === "undefined") return Promise.resolve()

  Array.from({ length: CASE_FRAME_COUNT }, (_, index) => {
    const image = new Image()
    image.src = `/assets/lose-anim/roulette/r${String(index).padStart(4, "0")}.png`
    return image
  })

  return Promise.resolve()
}

function isStickerSkin(skin: Skin) {
  const weapon = skin.weapon.toLowerCase()
  const name = skin.name.toLowerCase()
  return (
    weapon.includes("sticker") ||
    name.includes("sticker") ||
    weapon.includes("graffiti") ||
    weapon.includes("charm") ||
    weapon.includes("наклей") ||
    name.includes("наклей") ||
    weapon.includes("граффити") ||
    weapon.includes("брел")
  )
}

function pickWeightedSkin(stickerItems: Skin[], otherItems: Skin[], fallback: Skin[]) {
  const stickerPool = stickerItems.length > 0 ? stickerItems : fallback
  const otherPool = otherItems.length > 0 ? otherItems : fallback
  const pool = Math.random() < STICKER_CHANCE ? stickerPool : otherPool
  return pool[Math.floor(Math.random() * pool.length)] ?? fallback[0]
}

function pickTape(skins: Skin[]): { items: TapeEntry[]; winner: Skin | null } {
  if (skins.length === 0) return { items: [], winner: null }

  const cheapSkins = skins.filter((skin) => skin.price > 0 && skin.price <= 1000)
  const pool = cheapSkins.length >= 4 ? cheapSkins : skins
  const stickerItems = [...COMPENSATION_BONUS_ITEMS, ...pool.filter(isStickerSkin)]
  const otherItems = pool.filter((skin) => !isStickerSkin(skin) && skin.price <= 80)
  const fallback = stickerItems.length > 0 ? stickerItems : pool
  const winner = pickWeightedSkin(stickerItems, otherItems, fallback) ?? pool[0] ?? skins[0]

  const items = Array.from({ length: TAPE_LENGTH }, (_, index) => {
    const skin = pickWeightedSkin(stickerItems, otherItems, fallback) ?? winner
    return {
      key: `${skin.id}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      skin,
      isWinner: false,
    }
  })

  return { items, winner }
}

function buildVisibleTape(items: TapeEntry[], winner: Skin | null, baseIndex: number, keyPrefix = "slot") {
  if (!winner || items.length === 0) return []

  return Array.from({ length: VISIBLE_TAPE_LENGTH }, (_, slotIndex) => {
    const globalIndex = baseIndex + slotIndex

    if (globalIndex === TARGET_INDEX) {
      return {
        key: `${keyPrefix}-${slotIndex}`,
        skin: winner,
        isWinner: true,
      }
    }

    const poolIndex = ((globalIndex % items.length) + items.length) % items.length
    const entry = items[poolIndex] ?? items[0]
    return {
      ...entry,
      key: `${keyPrefix}-${slotIndex}`,
      isWinner: false,
    }
  })
}

const rouletteFastCurve = (() => {
  const points = 1000
  const curve = [0]
  let total = 0

  // The lose sound already starts after the case-opening part, so the visual brake
  // has to become obvious around the fifth second of this shortened audio segment.
  for (let index = 1; index <= points; index += 1) {
    const t = (index - 0.5) / points
    const smoothStep = (value: number) => value * value * (3 - 2 * value)
    const startRamp = smoothStep(Math.min(1, t / 0.05))
    const peak = Math.sin(Math.PI * t)
    const fastVelocity = 2 + 4 * startRamp + 8 * peak
    total += fastVelocity
    curve[index] = total
  }

  return curve.map((value) => value / total)
})()

function rouletteSpinProgress(t: number) {
  const clamped = Math.min(1, Math.max(0, t))

  if (clamped <= ROULETTE_SLOWDOWN_START) {
    const fastProgress = clamped / ROULETTE_SLOWDOWN_START
    const scaled = fastProgress * (rouletteFastCurve.length - 1)
    const lower = Math.floor(scaled)
    const upper = Math.min(rouletteFastCurve.length - 1, lower + 1)
    const mix = scaled - lower
    return (
      ROULETTE_PROGRESS_AT_SLOWDOWN *
      (rouletteFastCurve[lower] + (rouletteFastCurve[upper] - rouletteFastCurve[lower]) * mix)
    )
  }

  if (clamped <= ROULETTE_SLOW_APPROACH_START) {
    const slowdownProgress =
      (clamped - ROULETTE_SLOWDOWN_START) / (ROULETTE_SLOW_APPROACH_START - ROULETTE_SLOWDOWN_START)
    return (
      ROULETTE_PROGRESS_AT_SLOWDOWN +
      (ROULETTE_PROGRESS_AT_SLOW_APPROACH - ROULETTE_PROGRESS_AT_SLOWDOWN) * slowdownProgress
    )
  }

  if (clamped <= ROULETTE_FINAL_APPROACH_START) {
    const slowApproachProgress =
      (clamped - ROULETTE_SLOW_APPROACH_START) / (ROULETTE_FINAL_APPROACH_START - ROULETTE_SLOW_APPROACH_START)
    return (
      ROULETTE_PROGRESS_AT_SLOW_APPROACH +
      (ROULETTE_PROGRESS_AT_FINAL_APPROACH - ROULETTE_PROGRESS_AT_SLOW_APPROACH) * slowApproachProgress
    )
  }

  const brakeProgress = (clamped - ROULETTE_FINAL_APPROACH_START) / (1 - ROULETTE_FINAL_APPROACH_START)
  return (
    ROULETTE_PROGRESS_AT_FINAL_APPROACH +
    (1 - ROULETTE_PROGRESS_AT_FINAL_APPROACH) * (1 - (1 - brakeProgress) ** ROULETTE_FINAL_BRAKE_POWER)
  )
}

function BonusItemCard({
  skin,
  winner = false,
  className = "",
}: {
  skin: Skin
  winner?: boolean
  className?: string
}) {
  const rarityColor = RARITY_COLORS[skin.rarity] ?? "#4B69FF"
  const style = {
    "--rarity-color": rarityColor,
  } as CssVars

  return (
    <div
      className={`group relative h-full w-full rounded-md p-px shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)] ${className}`}
      style={{
        ...style,
        background: `linear-gradient(137deg, ${rarityColor} 10%, rgb(28, 28, 32) 75%)`,
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-[#17181c]">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_40%,var(--rarity-color)_0%,transparent_52%)]" />
        <img
          src="/assets/logo.svg"
          alt=""
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] lg:h-20 lg:w-20"
          draggable={false}
        />

        <div className="absolute right-1.5 top-1.5 z-[2] flex items-center justify-center gap-0.5">
          <span className="font-exo2 text-xxxs font-bold text-[#fbd506] lg:text-xxs">
            {formatPrice(skin.price)}
          </span>
          <img alt="" className="h-2 w-2 lg:h-2.5 lg:w-2.5" src="/assets/coin-2.svg" draggable={false} />
        </div>

        <img
          className="z-[1] max-h-[56%] w-[82%] object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
          src={skin.image || "/placeholder.svg"}
          alt={`${skin.weapon} ${skin.name}`}
          draggable={false}
        />

        <div className="absolute bottom-1.5 left-1/2 z-[2] flex w-full max-w-[84%] -translate-x-1/2 flex-col items-center justify-center text-center">
          <span className="w-full truncate text-xxxxs font-semibold leading-tight text-[#A7A7A7] font-exo2">
            {formatWeaponName(skin.weapon)}
          </span>
          <span className="font-exo2 w-full truncate text-xxxs font-bold leading-tight text-white lg:text-xxs">
            {formatSkinName(skin.name)}
          </span>
        </div>

        <div className="absolute left-1/2 top-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,var(--rarity-color)_0%,transparent_68%)] opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50" />
      </div>
    </div>
  )
}

function HorizontalDropRoulette({
  active,
  items,
  winner,
  onFinished,
}: {
  active: boolean
  items: TapeEntry[]
  winner: Skin | null
  onFinished: () => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const tapeRef = useRef<HTMLDivElement>(null)
  const [spinFinished, setSpinFinished] = useState(false)
  const [view, setView] = useState(() => ({
    baseIndex: ROULETTE_START_INDEX - ROULETTE_CENTER_SLOT,
    fraction: 0,
  }))
  const [metrics, setMetrics] = useState({ viewportWidth: 0, itemWidth: 0, itemStep: 0 })

  useLayoutEffect(() => {
    if (!active) return

    const measure = () => {
      const viewport = viewportRef.current
      const tape = tapeRef.current
      const first = tape?.children[0] as HTMLElement | undefined
      const second = tape?.children[1] as HTMLElement | undefined

      if (!viewport || !first) return

      const itemWidth = first.offsetWidth
      const itemStep = second ? second.offsetLeft - first.offsetLeft : itemWidth
      setMetrics({
        viewportWidth: viewport.clientWidth,
        itemWidth,
        itemStep: itemStep || itemWidth,
      })
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [active])

  useEffect(() => {
    if (!active || !winner || metrics.itemStep <= 0) {
      setSpinFinished(false)
      setView({
        baseIndex: ROULETTE_START_INDEX - ROULETTE_CENTER_SLOT,
        fraction: 0,
      })
      return
    }

    setSpinFinished(false)
    setView({
      baseIndex: ROULETTE_START_INDEX - ROULETTE_CENTER_SLOT,
      fraction: 0,
    })

    let raf = 0
    let revealTimer = 0
    const distanceItems = TARGET_INDEX - ROULETTE_START_INDEX
    const startedAt = window.performance.now()

    const animate = (now: number) => {
      const elapsed = now - startedAt
      const progress = rouletteSpinProgress(elapsed / ROULETTE_SPIN_MS)
      const centerIndex = ROULETTE_START_INDEX + distanceItems * progress
      const wholeIndex = Math.floor(centerIndex)

      setView({
        baseIndex: wholeIndex - ROULETTE_CENTER_SLOT,
        fraction: centerIndex - wholeIndex,
      })

      if (elapsed < ROULETTE_SPIN_MS) {
        raf = window.requestAnimationFrame(animate)
        return
      }

      setView({
        baseIndex: TARGET_INDEX - ROULETTE_CENTER_SLOT,
        fraction: 0,
      })
      setSpinFinished(true)
      revealTimer = window.setTimeout(onFinished, ROULETTE_REVEAL_MS)
    }

    raf = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(revealTimer)
    }
  }, [active, metrics.itemStep, onFinished, winner])

  const visibleItems = useMemo(() => buildVisibleTape(items, winner, view.baseIndex), [items, view.baseIndex, winner])

  const tapeX =
    metrics.viewportWidth > 0 && metrics.itemStep > 0
      ? metrics.viewportWidth / 2 -
        (ROULETTE_CENTER_SLOT * metrics.itemStep + metrics.itemWidth / 2 + view.fraction * metrics.itemStep)
      : 0

  return (
    <div
      className={`bonus-roulette-strip relative w-full ${
        spinFinished
          ? "is-stopped h-[14.75rem] overflow-visible lg:h-[18rem]"
          : "h-[10.5rem] overflow-hidden lg:h-[14rem]"
      }`}
    >
      <img
        alt=""
        className="pointer-events-none absolute -top-1 left-1/2 z-30 h-full !max-w-none -translate-x-1/2 opacity-100"
        src="https://s3.upgrader.pro/cdn/fa/images/game/carousel-line.png"
        draggable={false}
      />
      <div
        ref={viewportRef}
        className={`relative h-full w-full ${spinFinished ? "overflow-visible" : "overflow-hidden"}`}
      >
        <div
          ref={tapeRef}
          className="absolute left-0 top-0 flex w-max items-center gap-4 will-change-transform h-full"
          style={{ transform: `translate3d(${tapeX}px, 0, 0)` }}
        >
          {visibleItems.map((entry) => (
            <div
              key={entry.key}
              className={`bonus-roulette-item pointer-events-none relative h-[10rem] w-[11rem] flex-shrink-0 transition-all duration-500 ease-out md:w-[14.25rem] lg:h-[13.125rem] lg:w-[14.25rem] ${
                entry.isWinner ? "is-winner" : ""
              }`}
            >
              <BonusItemCard skin={entry.skin} winner={entry.isWinner && spinFinished} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CaseOpeningAnimation({ active }: { active: boolean }) {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!active) {
      setFrame(0)
      return
    }

    let raf = 0
    const startedAt = window.performance.now()
    const animate = (now: number) => {
      const elapsed = Math.min(CASE_FRAME_DURATION_MS, now - startedAt)
      const progress = elapsed / CASE_FRAME_DURATION_MS
      setFrame(Math.min(CASE_FRAME_COUNT - 1, Math.floor(progress * (CASE_FRAME_COUNT - 1))))

      if (elapsed < CASE_FRAME_DURATION_MS) {
        raf = window.requestAnimationFrame(animate)
      }
    }

    raf = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(raf)
  }, [active])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="bonus-stage-glow" />
      <img
        className="bonus-reference-case"
        src={`/assets/lose-anim/roulette/r${String(frame).padStart(4, "0")}.png`}
        alt=""
        draggable={false}
      />
    </div>
  )
}

function CaseScene({
  phase,
  tapeItems,
  winningSkin,
  onRouletteFinished,
}: {
  phase: Phase
  tapeItems: TapeEntry[]
  winningSkin: Skin | null
  onRouletteFinished: () => void
}) {
  const showCase = phase === "case"
  const showRoulette = phase === "roulette" || phase === "skipping"
  const rouletteActive = phase === "roulette"

  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center min-h-0">
      {showCase ? <CaseOpeningAnimation active={showCase} /> : null}
      {showRoulette ? (
        <div className="w-full transition-all duration-700 ease-out relative">
          <HorizontalDropRoulette
            active={rouletteActive}
            items={tapeItems}
            winner={winningSkin}
            onFinished={onRouletteFinished}
          />
          <div 
             className={`absolute -bottom-2 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ease-in ${
               phase === "skipping" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
             }`}
          >
             <button className="inline-flex items-center justify-center transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-[#fcd60c] font-bold text-[#1C1C20] rounded-md px-6 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] text-[0.8125rem] lg:text-[1.125rem] cursor-default font-exo2">
               <span>Крутиться...</span>
             </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ResultScreen({
  skin,
  tapeItems,
  sold,
  onSell,
  onBack,
}: {
  skin: Skin
  tapeItems: TapeEntry[]
  sold: boolean
  onSell: () => void
  onBack: () => void
}) {
  const visibleItems = useMemo(
    () => buildVisibleTape(tapeItems, skin, TARGET_INDEX - ROULETTE_CENTER_SLOT, "result-slot"),
    [skin, tapeItems],
  )

  return (
    <div className="bonus-result-screen flex h-full w-full flex-col items-center justify-center gap-4 px-2 py-4 lg:gap-5 lg:px-5">
      <div className="bonus-roulette-strip is-result relative h-[14.75rem] w-full overflow-visible lg:h-[18rem]">
        <img
          alt=""
          className="pointer-events-none absolute -top-1 left-1/2 z-30 h-full !max-w-none -translate-x-1/2 opacity-100"
          src="https://s3.upgrader.pro/cdn/fa/images/game/carousel-line.png"
          draggable={false}
        />
        <div className="relative h-full w-full overflow-visible">
          <div className="absolute left-1/2 top-0 flex h-full w-max -translate-x-1/2 items-center gap-4 will-change-transform">
            {visibleItems.map((entry) => (
              <div
                key={entry.key}
                className={`bonus-roulette-item pointer-events-none relative h-[10rem] w-[11rem] flex-shrink-0 md:w-[14.25rem] lg:h-[13.125rem] lg:w-[14.25rem] ${
                  entry.isWinner ? "is-winner" : ""
                }`}
              >
                <BonusItemCard skin={entry.skin} winner={entry.isWinner} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-[39rem] items-center justify-center gap-3 px-1.5 lg:px-0">
        <button
          type="button"
          onClick={onSell}
          disabled={sold}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-md bg-[#fbd506] px-3 py-3 text-[0.8125rem] font-semibold text-[#1C1C20] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:max-w-[306px] lg:rounded-xl lg:px-6 lg:text-xl font-exo2"
        >
          <span className="pointer-events-none flex min-w-0 items-center gap-1">
            <span className="truncate">Продать за {formatPrice(skin.price)}</span>
            <img alt="" className="h-3.5 w-3.5 flex-shrink-0 lg:h-4 lg:w-4" src="/assets/coin-black.svg" draggable={false} />
          </span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-md border border-[#fbd506]/70 bg-[#17181c] px-3 py-3 text-[0.8125rem] font-light text-[#FBD506] transition-all duration-200 hover:border-[#fbd506] hover:bg-[#221f10] lg:max-w-[306px] lg:rounded-xl lg:text-base font-exo2"
        >
          <span className="pointer-events-none select-none">
            <span className="block lg:hidden">Назад</span>
            <span className="hidden lg:block"> Назад в апгрейд </span>
          </span>
        </button>
      </div>
    </div>
  )
}

export function LoseAnimationOverlay({ playing, onComplete, onStopSound }: LoseAnimationOverlayProps) {
  const { state, addToInventory, addItemHistory, setState } = useStore()
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>("skipping")
  const [tapeItems, setTapeItems] = useState<TapeEntry[]>([])
  const [winningSkin, setWinningSkin] = useState<Skin | null>(null)
  const [sold, setSold] = useState(false)

  // Capture skins at animation start to avoid re-triggering when inventory changes
  const capturedSkinsRef = useRef<Skin[]>([])

  const timersRef = useRef<number[]>([])
  const onCompleteRef = useRef(onComplete)
  const onStopSoundRef = useRef(onStopSound)
  const awardedRef = useRef(false)
  const awardedUidRef = useRef<string | null>(null)
  const closingRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    onStopSoundRef.current = onStopSound
  }, [onStopSound])

  useEffect(() => {
    void preloadLoseAnimationFrames()
  }, [])

  // Add/remove body class to trigger CSS blur on the live feed sidebar
  useEffect(() => {
    if (visible) {
      document.body.classList.add('lose-animating')
    } else {
      document.body.classList.remove('lose-animating')
    }
    return () => {
      document.body.classList.remove('lose-animating')
    }
  }, [visible])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current = []
  }, [])

  const stopRunning = useCallback(() => {
    clearTimers()
    onStopSoundRef.current?.()
  }, [clearTimers])

  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, delay)
    timersRef.current.push(timer)
    return timer
  }, [])

  const resetVisualState = useCallback(() => {
    setPhase("case")
    setTapeItems([])
    setWinningSkin(null)
    setSold(false)
    awardedRef.current = false
    awardedUidRef.current = null
    closingRef.current = false
  }, [])

  const finish = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    stopRunning()
    setVisible(false)
    schedule(() => {
      onCompleteRef.current?.(awardedRef.current ? winningSkin?.id : undefined)
    }, 360)
  }, [schedule, stopRunning, winningSkin])

  const awardDrop = useCallback(() => {
    if (!winningSkin || awardedRef.current) return
    let uid: string
    const isCatalogSkin = state.skins.some((skin) => skin.id === winningSkin.id)

    if (isCatalogSkin) {
      uid = addToInventory(winningSkin.id)
      addItemHistory([{
        id: `ih-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        skinId: winningSkin.id,
        action: "compensation",
        date: Date.now()
      }])
    } else {
      uid = `bonus-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setState((prev) => ({
        ...prev,
        skins: prev.skins.some((skin) => skin.id === winningSkin.id) ? prev.skins : [winningSkin, ...prev.skins],
        upgradeSkins: prev.upgradeSkins.some((skin) => skin.id === winningSkin.id)
          ? prev.upgradeSkins
          : [winningSkin, ...prev.upgradeSkins],
        inventory: [{ uid, skinId: winningSkin.id }, ...prev.inventory],
        upgrades: prev.upgrades + 1,
      }))
    }

    awardedRef.current = true
    awardedUidRef.current = uid
  }, [addToInventory, addItemHistory, setState, state.skins, winningSkin])

  const handleRouletteFinished = useCallback(() => {
    if (closingRef.current) return
    awardDrop()
    setPhase("result")
  }, [awardDrop])

  const handleSell = useCallback(() => {
    if (!winningSkin || sold || closingRef.current) return
    awardDrop()
    const uid = awardedUidRef.current

    setState((prev) => ({
      ...prev,
      balance: prev.balance + winningSkin.price,
      inventory: uid ? prev.inventory.filter((item) => item.uid !== uid) : prev.inventory,
    }))
    
    addItemHistory([{
      id: `ih-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      skinId: winningSkin.id,
      action: "sold",
      date: Date.now()
    }])

    setSold(true)
    toast.success(`Продано за ${formatPrice(winningSkin.price)}`)
    finish()
  }, [awardDrop, finish, setState, sold, winningSkin])

  const handleClose = useCallback(() => {
    if (phase === "case" || phase === "roulette" || phase === "skipping") {
      if (winningSkin) {
        handleSell()
      } else {
        finish()
      }
      return
    }

    finish()
  }, [finish, handleSell, phase, winningSkin])

  useEffect(() => {
    if (!playing) {
      stopRunning()
      setVisible(false)
      schedule(resetVisualState, 360)
      return
    }

    // Capture current skins once at animation start — do NOT include state.skins
    // in the dependency array to avoid re-triggering when inventory changes.
    capturedSkinsRef.current = state.skins
    const next = pickTape(capturedSkinsRef.current)
    if (!next.winner) {
      onCompleteRef.current?.()
      return
    }

    clearTimers()
    closingRef.current = false
    awardedRef.current = false
    awardedUidRef.current = null
    setSold(false)
    setTapeItems(next.items)
    setWinningSkin(next.winner)
    setPhase("case")
    setVisible(true)

    schedule(() => {
      setPhase("skipping")
    }, CASE_FRAME_DURATION_MS)

    schedule(() => {
      setPhase("roulette")
    }, CASE_FRAME_DURATION_MS + 400)

    return () => clearTimers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTimers, playing, resetVisualState, schedule, stopRunning])

  const showResult = phase === "result" && winningSkin

  const panelTitle = useMemo(() => {
    if (phase === "result") return null
    if (phase === "roulette" || phase === "skipping") return "Бонус за отвагу"
    return "Компенсационный кейс"
  }, [phase])

  if (!visible && !playing) return null

  const isRoulettePanel = phase === "roulette" || phase === "skipping"

  return (
    <div
      className="pointer-events-none absolute -top-4 lg:-top-6 bottom-[4.5rem] lg:bottom-[5.5rem] -left-2 -right-2 z-[100] flex items-center justify-center transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="pointer-events-auto relative z-[110] flex w-full h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-[#111216] shadow-[0_18px_60px_rgba(0,0,0,0.48)] lg:rounded-2xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,213,6,0.1),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(211,44,230,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_25%)]" />
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-2 top-2 z-[120] flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] text-[#A7A7A7] transition-colors hover:bg-[#2a2b30] hover:text-white"
          onClick={handleClose}
        >
          <X size={12} />
        </button>

        {!showResult && !isRoulettePanel ? (
          <div className="relative z-10 flex flex-col items-center space-y-1 text-center transition-all duration-500 ease-out lg:space-y-2 font-exo2">
            <h2 className="text-xl font-bold text-white lg:text-2xl">{panelTitle}</h2>
            <span className="text-xs text-gray-400 lg:text-sm">Бонус выдается случайным образом</span>
          </div>
        ) : null}

        <div className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center">
          {showResult ? (
            <ResultScreen skin={winningSkin} tapeItems={tapeItems} sold={sold} onSell={handleSell} onBack={finish} />
          ) : (
            <CaseScene
              phase={phase}
              tapeItems={tapeItems}
              winningSkin={winningSkin}
              onRouletteFinished={handleRouletteFinished}
            />
          )}
        </div>
      </div>
    </div>
  )
}
