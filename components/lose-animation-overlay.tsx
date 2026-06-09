"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { X } from "lucide-react"
import { RARITY_COLORS } from "@/lib/default-data"
import { formatPrice, useStore } from "@/lib/store"
import type { Skin } from "@/lib/types"
import { formatSkinName, formatWeaponName } from "@/lib/utils"
import { toast } from "sonner"

interface LoseAnimationOverlayProps {
  playing: boolean
  onComplete?: () => void
  soundEnabled?: boolean
}

type Phase = "drop" | "open" | "roulette" | "result"

interface TapeEntry {
  key: string
  skin: Skin
  isWinner: boolean
}

type CssVars = CSSProperties & Record<`--${string}`, string | number>

const TARGET_INDEX = 42
const TAPE_LENGTH = 58
const CASE_SEQUENCE_SOUND = "/assets/lose-anim/openCompensationCase.mp3"
// openCompensationCase.mp3 = 14.707s, full anim cycle = CASE_DROP_MS+CASE_OPEN_MS+CASE_TO_ROULETTE_GAP_MS+ROULETTE_SPIN_MS = 12200ms
// rate = 14.707 / 12.2 ≈ 1.206 — sound ends exactly when roulette finishes
const CASE_SEQUENCE_SOUND_RATE = 14.707 / 12.2
const CASE_FRAME_COUNT = 81
const CASE_DROP_FRAME = 10
const CASE_DROP_MS = 500
const CASE_OPEN_MS = 4700
const CASE_TO_ROULETTE_GAP_MS = 100
const ROULETTE_SPIN_MS = 6900
const ROULETTE_REVEAL_MS = 450
const CASE_FRAME_MS = CASE_OPEN_MS / (CASE_FRAME_COUNT - CASE_DROP_FRAME - 1)
const STICKER_CHANCE = 0.95
const caseFrameUrls = Array.from({ length: CASE_FRAME_COUNT }, (_, index) =>
  `/assets/lose-anim/roulette/r${String(index).padStart(4, "0")}.png`,
)

const COMPENSATION_BONUS_ITEMS: Skin[] = [
  {
    id: "bonus-sticker-ihc-rio-2022",
    weapon: "Sticker",
    name: "IHC Esports | Rio 2022",
    wear: "",
    price: 2.36,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNioOinHtwQ6_Y_3pA3iQk6mmsCw-HECtqX9MaA4IaHLC2XEw7Zw5bZvHX7kxhh1tmrUnIm3MSXAZ4Xje8k/360fx360f",
  },
  {
    id: "bonus-sticker-g2-austin-2025",
    weapon: "Sticker",
    name: "G2 Esports | Austin 2025",
    wear: "",
    price: 2.74,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM689W6vVjjER-ims6y-HQNu_H8avBuJKnLDzPAkr8k6OdtFnvhwE9zsG_UwsHpLywUtj0iGw/360fx360f",
  },
  {
    id: "bonus-graffiti-rage-mode",
    weapon: "Sealed Graffiti",
    name: "Rage Mode",
    wear: "",
    price: 3.46,
    rarity: "common",
    image:
      "https://community.akamai.steamstatic.com/economy/image/IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdB2ozio1RrlIWFK3UfvMYB8UsvjiMXojflsZalyxSh31CIyHz2GZ-KuFpPsrTzBG0pPSEEEvycTKKdnKIHV0wHOdYYz3b-Tuls-3AFDudFOEqQQsGKfQFoWZKbMuLahE615lLpWL-lEtxEQQlZ8lSeR-30ykXZb58nSNwEqb_cg/360fx360f",
  },
  {
    id: "bonus-sticker-electronic-stockholm-2021",
    weapon: "Sticker",
    name: "electroNic | Stockholm 2021",
    wear: "",
    price: 1.51,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNm1Onic7QQlpta7-VDgfhj9m5X07y1V5vHgMKBpdfHGCjXElLgi5rQ4HS_jwh4ltm6Ew4ygJSjCbg52ApYmQeUD5g74zIN7Cxi4Yw/360fx360f",
  },
  {
    id: "bonus-sticker-cadian-paris-2023",
    weapon: "Sticker",
    name: "cadiaN (Glitter) | Paris 2023",
    wear: "",
    price: 3.61,
    rarity: "mythical",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNqgJ3KEtwYnp8jn417YQhz1l5fuwiVX5ua6bbYjd_bAXWWRmbgi4rk4HijrwR4k5GSDzYn8cS6WbwIhXMYhQ-4DsUHrlMqnab38mVd6ng/360fx360f",
  },
  {
    id: "bonus-sticker-skullz-budapest-2025",
    weapon: "Sticker",
    name: "skullz (Embroidered) | Budapest 2025",
    wear: "",
    price: 6.24,
    rarity: "mythical",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMi0MSnHtwM6547z1UrsVBH9hKnl8CBJ4PuqbbZoJL6WDGLFlux14Oc5S33mlx90tWWEmNutci7GOlIkXJdyQ-UOuxi_k4bmKaq8sAE_Zr6K/360fx360f",
  },
  {
    id: "bonus-sticker-mercury-austin-2025",
    weapon: "Sticker",
    name: "Mercury | Austin 2025",
    wear: "",
    price: 7.75,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMu0JinHtwM6547z1VTiUx7kjI-uqnYPvqL-bf01dqPKC2WUx7ch4Lg4Fnzqwx8itWSHz479cimXZgcmD4wwG7B7VYiwng/360fx360f",
  },
  {
    id: "bonus-charm-mezii-budapest-2025",
    weapon: "Souvenir Charm",
    name: "Budapest 2025 Highlight | mezii vs FaZe on Inferno",
    wear: "",
    price: 15.67,
    rarity: "rare",
    image:
      "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWjIH_FtQQgu4z31VvyRU-hzMOurHcDvfOrOPFucfWWDDaTxbwl5LBvSnrgxhsk4TjSn437J3zGOFcmCYwwG7A7om1dgw/360fx360f",
  },
]

let caseFramesPreloaded = false
function preloadCaseFrames() {
  if (caseFramesPreloaded || typeof window === "undefined") return
  caseFramesPreloaded = true

  const framesToWarm = caseFrameUrls.slice(CASE_DROP_FRAME)
  let index = 0
  const warmNextBatch = () => {
    const batch = framesToWarm.slice(index, index + 12)
    if (batch.length === 0) return

    let completed = 0
    batch.forEach((url) => {
      const img = new window.Image()
      img.onload = img.onerror = () => {
        completed += 1
        if (completed === batch.length) {
          index += batch.length
          window.setTimeout(warmNextBatch, 24)
        }
      }
      img.src = url
    })
  }

  window.setTimeout(warmNextBatch, 300)
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
    const skin = index === TARGET_INDEX ? winner : pickWeightedSkin(stickerItems, otherItems, fallback) ?? winner
    return {
      key: `${skin.id}-${index}-${Math.random().toString(36).slice(2, 7)}`,
      skin,
      isWinner: index === TARGET_INDEX,
    }
  })

  return { items, winner }
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
      className={`group relative h-full w-full rounded-md p-px shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)] ${
        winner ? "bonus-winner-card" : ""
      } ${className}`}
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
          <span className="font-tektur text-xxxs font-bold text-[#fbd506] lg:text-xxs">
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
          <span className="w-full truncate text-xxxxs font-semibold leading-tight text-[#A7A7A7]">
            {formatWeaponName(skin.weapon)}
          </span>
          <span className="font-tektur w-full truncate text-xxxs font-bold leading-tight text-white lg:text-xxs">
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
  onFinished,
}: {
  active: boolean
  items: TapeEntry[]
  onFinished: () => void
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const tapeRef = useRef<HTMLDivElement>(null)
  const winnerRef = useRef<HTMLDivElement>(null)
  const [spinFinished, setSpinFinished] = useState(false)

  useEffect(() => {
    const viewport = viewportRef.current
    const tape = tapeRef.current
    const winner = winnerRef.current

    if (!active || !viewport || !tape || !winner) {
      setSpinFinished(false)
      if (tape) {
        tape.style.transition = "none"
        tape.style.transform = "translate3d(0, 0, 0)"
      }
      return
    }

    setSpinFinished(false)
    tape.style.transition = "none"
    
    // Start with item 10 centered so the tape is full of items initially
    const startItem = tape.children[10] as HTMLElement
    if (startItem && viewport.clientWidth > 0) {
      const startOffset = startItem.offsetLeft + startItem.offsetWidth / 2 - viewport.clientWidth / 2
      tape.style.transform = `translate3d(${-startOffset}px, 0, 0)`
    } else {
      tape.style.transform = "translate3d(0, 0, 0)"
    }
    
    void tape.offsetHeight

    const raf = window.requestAnimationFrame(() => {
      const target =
        winner.offsetLeft + winner.offsetWidth / 2 - viewport.clientWidth / 2 + (Math.random() * 16 - 8)

      tape.style.transition = `transform ${ROULETTE_SPIN_MS}ms cubic-bezier(0.5, 0, 0.1, 1)`
      tape.style.transform = `translate3d(${-target}px, 0, 0)`
    })

    const done = window.setTimeout(() => {
      setSpinFinished(true)
      window.setTimeout(onFinished, ROULETTE_REVEAL_MS)
    }, ROULETTE_SPIN_MS + 160)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(done)
    }
  }, [active, items, onFinished])

  return (
    <div className="relative w-full overflow-hidden h-[10.5rem] lg:h-[14rem]">
      <img
        alt=""
        className="pointer-events-none absolute -top-1 left-1/2 z-30 h-full !max-w-none -translate-x-1/2 opacity-100"
        src="https://s3.upgrader.pro/cdn/fa/images/game/carousel-line.png"
        draggable={false}
      />
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden h-full"
      >
        <div ref={tapeRef} className="absolute left-0 top-0 flex w-max items-center gap-4 px-[50%] will-change-transform h-full">
          {items.map((entry) => (
            <div
              key={entry.key}
              ref={entry.isWinner ? winnerRef : undefined}
              className={`pointer-events-none relative h-[10rem] w-[11rem] flex-shrink-0 transition-all duration-500 ease-out md:w-[14.25rem] lg:h-[13.125rem] lg:w-[14.25rem] ${
                entry.isWinner && spinFinished ? "z-20 scale-[1.08]" : ""
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

function ReferenceCase({ phase }: { phase: Phase }) {
  const [frameIdx, setFrameIdx] = useState(CASE_DROP_FRAME)

  useEffect(() => {
    if (phase === "drop") {
      setFrameIdx(CASE_DROP_FRAME)
      return
    }

    if (phase === "roulette" || phase === "result") {
      setFrameIdx(CASE_FRAME_COUNT - 1)
      return
    }

    let frame = CASE_DROP_FRAME
    setFrameIdx(frame)

    const timer = window.setInterval(() => {
      frame += 1
      if (frame >= CASE_FRAME_COUNT - 1) {
        frame = CASE_FRAME_COUNT - 1
        window.clearInterval(timer)
      }
      setFrameIdx(frame)
    }, CASE_FRAME_MS)

    return () => window.clearInterval(timer)
  }, [phase])

  return (
    <div
      className={`bonus-reference-case ${phase === "drop" ? "is-dropping" : ""} ${
        phase === "open" ? "is-opening" : ""
      } ${
        phase === "roulette" || phase === "result" ? "is-cleared" : ""
      }`}
      aria-hidden="true"
    >
      <img
        src={caseFrameUrls[frameIdx]}
        alt=""
        draggable={false}
        style={{
          transform: "scaleX(1.4) scaleY(1.35)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)",
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 100%)"
        }}
      />
    </div>
  )
}

function CaseScene({
  phase,
  tapeItems,
  onRouletteFinished,
  onSkip,
}: {
  phase: Phase
  tapeItems: TapeEntry[]
  onRouletteFinished: () => void
  onSkip: () => void
}) {
  const showRoulette = phase === "roulette"
  const showImpact = phase === "open"

  return (
    <div
      className={`relative flex h-full w-full flex-1 flex-col items-center justify-center ${
        showRoulette ? "min-h-0" : "min-h-[18rem] lg:min-h-[22rem]"
      }`}
    >
      {!showRoulette ? <div className="bonus-case-shadow" /> : null}
      {!showRoulette ? <div className="bonus-stage-glow" /> : null}

      {!showRoulette ? (
        <div className={`bonus-impact-dust ${showImpact ? "is-active" : ""}`}>
          <div />
          <img
            src="/assets/smoke.webp"
            alt=""
            draggable={false}
            style={{
              transform: "translateX(-50%) scaleX(3.5) scaleY(1.8)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)"
            }}
          />
        </div>
      ) : null}

      {!showRoulette ? (
        <div className="relative z-10 flex h-[14rem] w-full items-center justify-center sm:h-[16rem] lg:h-[19rem]">
          <ReferenceCase phase={phase} />
          
          {phase !== "result" ? (
            <div className="absolute -bottom-2 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20">
              <button
                onClick={onSkip}
                className="inline-flex items-center justify-center transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-[#fcd60c] font-bold text-[#1C1C20] rounded-md px-6 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] text-[0.8125rem] lg:text-[1.125rem]"
              >
                <span>Пропустить</span>
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {showRoulette ? (
        <div className="w-full transition-all duration-700 ease-out">
          <HorizontalDropRoulette active={showRoulette} items={tapeItems} onFinished={onRouletteFinished} />
        </div>
      ) : null}
    </div>
  )
}

function ResultScreen({
  skin,
  sold,
  onSell,
  onBack,
}: {
  skin: Skin
  sold: boolean
  onSell: () => void
  onBack: () => void
}) {
  return (
    <div className="bonus-result-screen flex h-full w-full flex-col items-center justify-between gap-4 py-2">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h2 className="text-2xl font-bold text-white">Вот твой дроп!</h2>
        <span className="text-sm text-gray-400"> Ты заслужил — держи! </span>
      </div>

      <div className="pointer-events-none my-2 h-[6.75rem] w-[7.3125rem] md:w-[9.5rem] lg:h-[12.5rem] lg:w-[13.5625rem]">
        <BonusItemCard skin={skin} winner />
      </div>

      <div className="flex w-full items-center justify-center gap-3 px-1.5 lg:px-0">
        <button
          type="button"
          onClick={onSell}
          disabled={sold}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-md bg-[#fbd506] px-3 py-3 text-[0.8125rem] font-semibold text-[#1C1C20] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-200 hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 lg:max-w-[306px] lg:rounded-xl lg:px-6 lg:text-xl"
        >
          <span className="pointer-events-none flex min-w-0 items-center gap-1">
            <span className="truncate">Продать за {formatPrice(skin.price)}</span>
            <img alt="" className="h-3.5 w-3.5 flex-shrink-0 lg:h-4 lg:w-4" src="/assets/coin-black.svg" draggable={false} />
          </span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-md border border-[#fbd506]/70 bg-[#17181c] px-3 py-3 text-[0.8125rem] font-light text-[#FBD506] transition-all duration-200 hover:border-[#fbd506] hover:bg-[#221f10] lg:max-w-[306px] lg:rounded-xl lg:text-base"
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

export function LoseAnimationOverlay({ playing, onComplete, soundEnabled }: LoseAnimationOverlayProps) {
  const { state, addToInventory, setState } = useStore()
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>("drop")
  const [tapeItems, setTapeItems] = useState<TapeEntry[]>([])
  const [winningSkin, setWinningSkin] = useState<Skin | null>(null)
  const [sold, setSold] = useState(false)

  // Capture skins at animation start to avoid re-triggering when inventory changes
  const capturedSkinsRef = useRef<Skin[]>([])

  const timersRef = useRef<number[]>([])
  const audioRefs = useRef<HTMLAudioElement[]>([])
  const onCompleteRef = useRef(onComplete)
  const soundEnabledRef = useRef(soundEnabled)
  const awardedRef = useRef(false)
  const awardedUidRef = useRef<string | null>(null)
  const closingRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    soundEnabledRef.current = soundEnabled
  }, [soundEnabled])

  useEffect(() => {
    preloadCaseFrames()
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

  const clearRunning = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout)
    timersRef.current = []
    if (audioElRef.current) {
      audioElRef.current.pause()
    }
  }, [])

  const schedule = useCallback((fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, delay)
    timersRef.current.push(timer)
    return timer
  }, [])

  const handleSkip = useCallback(() => {
    if (phase === "drop" || phase === "open") {
      clearRunning()
      setPhase("roulette")
    }
  }, [phase, clearRunning])

  const resetVisualState = useCallback(() => {
    setPhase("drop")
    setTapeItems([])
    setWinningSkin(null)
    setSold(false)
    awardedRef.current = false
    awardedUidRef.current = null
    closingRef.current = false
  }, [])

  const audioElRef = useRef<HTMLAudioElement>(null)

  const playCaseSequenceSound = useCallback(() => {
    if (soundEnabledRef.current === false) return
    const audio = audioElRef.current
    if (audio) {
      try {
        audio.volume = 0.78
        if (CASE_SEQUENCE_SOUND_RATE !== 1) {
          audio.playbackRate = CASE_SEQUENCE_SOUND_RATE
        }
        audio.currentTime = 0
        audio.play().catch((e) => {
          console.error("Audio tag play blocked or failed:", e)
        })
      } catch (err) {
        console.error("Failed to play audio tag:", err)
      }
    }
  }, [])

  const finish = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    clearRunning()
    setVisible(false)
    schedule(() => {
      onCompleteRef.current?.()
    }, 360)
  }, [clearRunning, schedule])

  const awardDrop = useCallback(() => {
    if (!winningSkin || awardedRef.current) return
    let uid: string
    const isCatalogSkin = state.skins.some((skin) => skin.id === winningSkin.id)

    if (isCatalogSkin) {
      uid = addToInventory(winningSkin.id)
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
  }, [addToInventory, setState, state.skins, winningSkin])

  const handleRouletteFinished = useCallback(() => {
    if (closingRef.current) return
    awardDrop()
    setPhase("result")
  }, [awardDrop])

  const handleSell = useCallback(() => {
    if (!winningSkin || sold) return
    awardDrop()
    const uid = awardedUidRef.current

    setState((prev) => ({
      ...prev,
      balance: prev.balance + winningSkin.price,
      inventory: uid ? prev.inventory.filter((item) => item.uid !== uid) : prev.inventory,
    }))

    setSold(true)
    toast.success(`Продано за ${formatPrice(winningSkin.price)}`)
    finish()
  }, [awardDrop, finish, setState, sold, winningSkin])

  useEffect(() => {
    if (!playing) {
      clearRunning()
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

    clearRunning()
    closingRef.current = false
    awardedRef.current = false
    awardedUidRef.current = null
    setSold(false)
    setTapeItems(next.items)
    setWinningSkin(next.winner)
    setPhase("drop")
    setVisible(true)
    playCaseSequenceSound()

    schedule(() => {
      setPhase("open")
    }, CASE_DROP_MS)

    schedule(() => {
      setPhase("roulette")
    }, CASE_DROP_MS + CASE_OPEN_MS + CASE_TO_ROULETTE_GAP_MS)

    return () => clearRunning()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearRunning, playCaseSequenceSound, playing, resetVisualState, schedule])

  const showResult = phase === "result" && winningSkin

  const panelTitle = useMemo(() => {
    if (phase === "result") return null
    if (phase === "roulette") return "Бонус за отвагу"
    return "Компенсационный кейс"
  }, [phase])

  if (!visible && !playing) return null

  const isRoulettePanel = phase === "roulette"

  const panelSizeClass = showResult
    ? "h-[min(30rem,calc(100vh-6rem))] max-w-[46rem] p-4 lg:p-6"
    : "p-4 lg:p-5"

  return (
    <div
      className="pointer-events-none absolute -top-4 lg:-top-6 bottom-[4.5rem] lg:bottom-[5.5rem] -left-2 -right-2 z-[100] flex items-center justify-center transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`pointer-events-auto relative z-[110] flex w-full h-full flex-col items-center justify-center overflow-hidden bg-[#111216] rounded-xl lg:rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.48)] ${
          showResult ? "max-w-[46rem] h-auto border border-white/10 p-4 lg:p-6" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,213,6,0.1),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(211,44,230,0.1),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_25%)]" />
        <button
          type="button"
          aria-label="Закрыть"
          className="absolute right-2 top-2 z-[120] flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] text-[#A7A7A7] transition-colors hover:bg-[#2a2b30] hover:text-white"
          onClick={finish}
        >
          <X size={12} />
        </button>

        {!showResult && !isRoulettePanel ? (
          <div className="relative z-10 flex flex-col items-center space-y-1 text-center transition-all duration-500 ease-out lg:space-y-2">
            <h2 className="text-xl font-bold text-white lg:text-2xl">{panelTitle}</h2>
            <span className="text-xs text-gray-400 lg:text-sm">Бонус выдается случайным образом</span>
          </div>
        ) : null}

        <div className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center">
          {showResult ? (
            <ResultScreen skin={winningSkin} sold={sold} onSell={handleSell} onBack={finish} />
          ) : (
            <CaseScene
              phase={phase}
              tapeItems={tapeItems}
              onRouletteFinished={handleRouletteFinished}
              onSkip={handleSkip}
            />
          )}
        </div>
      </div>
      <audio ref={audioElRef} src={CASE_SEQUENCE_SOUND} preload="auto" />
    </div>
  )
}
