"use client"

import { flushSync } from "react-dom"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"

export interface UpgradeWheelHandle {
  spin: (win: boolean) => Promise<boolean>
}

interface UpgradeWheelProps {
  chance: number
  hasSelection: boolean
  fastMode?: boolean
  soundMode?: "on" | "off"
  showPercentages?: boolean
}

export const UpgradeWheel = forwardRef<UpgradeWheelHandle, UpgradeWheelProps>(function UpgradeWheel(
  { chance, hasSelection, fastMode, soundMode = "on", showPercentages = true },
  ref,
) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<"none" | "win" | "lose">("none")
  const rotationRef = useRef(0)
  const [resetTimer, setResetTimer] = useState<NodeJS.Timeout | null>(null)
  const [isResolving, setIsResolving] = useState(false)

  // Locked values captured at spin start — prevent mid-spin prop changes from affecting animation
  const lockedChanceRef = useRef<number | null>(null)
  // Spin duration stored in a ref so JSX can read it without causing extra renders
  const spinDurationMsRef = useRef<number>(7300)

  const prevHasSelectionRef = useRef(hasSelection)
  // After ANY spin (win or lose), keep the arc frozen at the just-played chance
  // instead of snapping back to the empty-state 50%. It stays frozen until the
  // next selection is made, at which point the arc updates to the real chance.
  // 50% is only the fresh/initial state (no skins selected, no prior spin).
  const frozenChanceRef = useRef<number | null>(null)

  // Clear result and reset wheel on new selection or after a loss
  useEffect(() => {
    const newlySelected = hasSelection && !prevHasSelectionRef.current
    // A fresh selection (choosing the weapon to upgrade) clears the post-spin hold.
    if (hasSelection && frozenChanceRef.current !== null) {
      frozenChanceRef.current = null
    }
    if (result !== "none" && !isResolving) {
      if (newlySelected) {
        setResult("none")
        const target = Math.round(rotationRef.current / 360) * 360
        setRotation(target)
        rotationRef.current = target
        if (resetTimer) {
          clearTimeout(resetTimer)
          setResetTimer(null)
        }
      } else if (!hasSelection && !resetTimer && result === "lose") {
        const timer = setTimeout(() => {
          setResult("none")
          const target = Math.round(rotationRef.current / 360) * 360
          setRotation(target)
          rotationRef.current = target
          setResetTimer(null)
        }, 2000)
        setResetTimer(timer)
      } else if (!hasSelection && result === "win") {
        setResult("none")
        const target = Math.round(rotationRef.current / 360) * 360
        setRotation(target)
        rotationRef.current = target
      }
    }
    prevHasSelectionRef.current = hasSelection
  }, [hasSelection, result, resetTimer, isResolving])

  const displayChance = hasSelection
    ? (lockedChanceRef.current ?? chance)
    : (frozenChanceRef.current ?? 0.5)
  const segAngle = Math.min(0.999, Math.max(0.0001, displayChance)) * 360

  const circumference = 779.115
  const gap = 8 * Math.min(1, displayChance * 4)
  const strokeDash = circumference * Math.max(0.0001, displayChance) - 2 * gap
  const strokeGap = circumference - strokeDash
  const strokeOffset = (circumference * Math.max(0.0001, displayChance)) / 2 - circumference / 4 - gap

  useImperativeHandle(ref, () => ({
    spin: (win: boolean) =>
      new Promise<boolean>((resolve) => {
        if (resetTimer) {
          clearTimeout(resetTimer)
          setResetTimer(null)
        }

        // ── 1. Capture all values that must not change during the spin ──
        const isFast = !!fastMode
        const duration = isFast ? 1800 : 7300
        spinDurationMsRef.current = duration     // used by JSX transition style
        lockedChanceRef.current = chance          // freeze arc sector
        frozenChanceRef.current = null            // drop any previous post-spin hold

        // ── 2. Compute the target rotation angle ──
        const halfSeg = segAngle / 2
        const winStart = 360 - halfSeg
        const winEnd   = 360 + halfSeg

        const pos = win
          ? winStart + Math.random() * Math.max(segAngle - 2, 0.5) + 1
          : winEnd   + Math.random() * Math.max(360 - segAngle - 2, 0.5) + 1

        const spins = 6
        const current    = rotationRef.current
        const targetMod  = ((pos     % 360) + 360) % 360
        const currentMod = ((current % 360) + 360) % 360
        let   delta      = targetMod - currentMod
        if (delta < 0) delta += 360
        const next = current + spins * 360 + delta
        rotationRef.current = next

        // ── 3. flushSync: commit spinning=true WITH the correct duration ──
        // Both happen in one synchronous React commit so the CSS transition
        // `transform Xs cubic-bezier(...)` is in the DOM BEFORE rotation changes.
        flushSync(() => {
          setSpinning(true)
          setResult("none")
        })

        // ── 4. One RAF — transition is already painted, now change the angle ──
        requestAnimationFrame(() => {
          setRotation(next)

          // Start sound in the same frame as the rotation change
          if (soundMode === "on") {
            // shortSpin.mp3 = 1.202 s stretched to 1800 ms → rate ≈ 0.668
            // longSpin.mp3  = 7.314 s stretched to 7300 ms → rate ≈ 1.002
            const spinSrc  = isFast ? "/sounds/shortSpin.mp3" : "/sounds/longSpin.mp3"
            const spinRate = isFast ? (1.202 / 1.8) : (7.314 / 7.3)
            const audio = new Audio(spinSrc)
            audio.playbackRate = spinRate
            audio.play().catch(() => {})
          }

          // ── 5. Resolve exactly when the CSS transition ends ──
          window.setTimeout(() => {
            flushSync(() => {
              setIsResolving(true)
              setSpinning(false)
              // Hold the just-played chance on the arc after ANY spin (win or
              // lose). It stays until the user picks a new skin; only a truly
              // fresh/empty state (initial load) shows 50%.
              frozenChanceRef.current = lockedChanceRef.current
              lockedChanceRef.current = null
              setResult(win ? "win" : "lose")
            })
            resolve(win)
            setTimeout(() => { setIsResolving(false) }, 100)
          }, duration)
        })
      }),
  }))

  const arcStroke = "url(#progress-gradient)"

  const getChanceText = (c: number) => {
    if (result === "win") return "Апгрейд успешен!"
    if (result === "lose") return "Не беда ...."
    if (c < 0.35) return "низкий шанс"
    if (c <= 0.65) return "средний шанс"
    return "высокий шанс"
  }

  // Pointer transition:
  //   • spinning=true  → use the duration locked at spin start (stored in ref, read synchronously)
  //   • spinning=false → short bouncy settle animation
  const pointerTransition = spinning
    ? `transform ${spinDurationMsRef.current}ms cubic-bezier(0.4, 0, 0.2, 1)`
    : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"

  return (
    <div className="relative order-first col-span-2 h-[13.75rem] lg:order-none lg:col-span-1 lg:flex lg:h-[22.25rem] lg:items-center lg:justify-center w-full">
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 flex h-[13.75rem] w-[13.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:h-[21.75rem] lg:w-[21.75rem]">
          {/* Слой 0: Внешние декорации */}
          <div className="absolute top-0 left-0 h-[13.75rem] w-[13.75rem] lg:h-[21.875rem] lg:w-[21.875rem] lg:-translate-x-1 lg:-translate-y-1 z-0"></div>
          
          <div className="absolute top-[0.3rem] left-[0.3rem] h-[13.125rem] w-[13.125rem] rounded-full border border-[#202021] lg:top-3 lg:left-3 lg:h-[20.25rem] lg:w-[20.25rem] lg:border-2 z-0"></div>
          
          <img alt="" className="absolute top-[0.3rem] left-[0.3rem] h-[13.125rem] w-[13.125rem] scale-[1.05] object-contain lg:top-3 lg:left-3 lg:h-[20.25rem] lg:w-[20.25rem] z-0" src="/assets/images/game/upgrade-circle-bg.svg" />
          
          {/* Слой 1: Темное фоновое кольцо трека */}
          <div className="absolute top-1/2 left-1/2 z-[1] h-[13.25rem] w-[13.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[20.125rem] lg:w-[20.125rem]">
            <svg className="h-full w-full rotate-0" viewBox="0 0 289 289">
              <circle fill="none" stroke="#202021" cx="144.5" cy="144.5" r="124" strokeWidth="42"></circle>
            </svg>
          </div>

          {/* Слой 2: Черный круг с засечками */}
          <img alt="" className="absolute top-1/2 left-1/2 z-[3] h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[0.95] object-contain lg:scale-[0.92]" src="/assets/images/game/circle-black.svg" />
          
          {/* Слой 3: Цветной градиент трека */}
          <div className="absolute top-1/2 left-1/2 z-[2] h-[13.25rem] w-[13.25rem] -translate-x-1/2 -translate-y-1/2 lg:h-[20.125rem] lg:w-[20.125rem]">
            <svg className="h-full w-full rotate-0" viewBox="0 0 289 289">
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   style={{ stopColor: '#23d70c', stopOpacity: 1 }}></stop>
                  <stop offset="60%"  style={{ stopColor: '#ebd215', stopOpacity: 1 }}></stop>
                  <stop offset="80%"  style={{ stopColor: '#edb516', stopOpacity: 1 }}></stop>
                  <stop offset="100%" style={{ stopColor: '#df4125', stopOpacity: 1 }}></stop>
                </linearGradient>
              </defs>
              <circle
                fill="none"
                stroke={arcStroke}
                strokeLinecap="butt"
                cx="144.5" cy="144.5" r="124" strokeWidth="42"
                strokeDasharray={`${strokeDash} ${strokeGap}`}
                strokeDashoffset={strokeOffset}
                style={{ transition: "stroke-dasharray 0.3s, stroke-dashoffset 0.3s, stroke 0.3s" }}
              ></circle>
            </svg>
          </div>

          {/* Слой 4: Внутренние элементы и указатель */}
          <div className="absolute top-[0.45rem] left-[0.45rem] h-[12.8125rem] w-[12.8125rem] rounded-full border-[3px] border-[#101012] lg:top-[0.875rem] lg:left-[0.875rem] lg:h-80 lg:w-80 lg:border-4 z-[4]"></div>
          
          {/* Pointer arrow — transition computed from ref so fast/slow is locked at spin-start */}
          <div
            className="absolute top-1/2 left-1/2 z-[5] h-0 w-0"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation + 180}deg)`,
              transformOrigin: "center center",
              transition: pointerTransition,
            }}
          >
            <img
              alt=""
              className="absolute top-[-6.6875rem] left-[-1.0625rem] h-[2.125rem] w-[2.125rem] max-w-none lg:top-[-10.125rem] lg:left-[-1.46875rem] lg:h-[2.9375rem] lg:w-[2.9375rem]"
              src="/assets/images/game/pointer.png"
            />
          </div>

          <div className="absolute top-[3.125rem] left-[3.125rem] h-[7.4375rem] w-[7.4375rem] rounded-full lg:top-[4.375rem] lg:left-[4.375rem] lg:h-[12.9375rem] lg:w-[12.9375rem] z-[4]">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                {result === "lose" ? (
                  <>
                    <span className="font-sans bg-clip-text bg-gradient-to-b font-bold from-[#FF7474] lg:text-4xl text-2xl text-transparent to-[#FFC4C4] transition-all duration-500 ease-in-out uppercase">
                      НЕ БЕДА
                    </span>
                    <span className="font-sans lg:text-sm text-xs text-[#d1d1d1] transition-all duration-500 ease-in-out mt-1">
                      попробуем еще?
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-sans bg-clip-text bg-gradient-to-b font-bold from-[#FFE02D] lg:text-4xl text-2xl text-transparent to-[#53DB42] transition-all duration-500 ease-in-out">
                      {(displayChance * 100).toFixed(2)}{showPercentages ? "%" : ""}
                    </span>
                    <span className="font-sans bg-clip-text bg-gradient-to-b from-[#FFE02D] lg:text-sm text-transparent text-xs to-[#53DB42] transition-all duration-500 ease-in-out">
                      {getChanceText(displayChance)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <span className="font-sans text-xxxs lg:text-xxs absolute top-[1.275rem] left-[6.275rem] text-white/50 lg:top-[2.375rem] lg:left-[10.125rem] z-[4]"> 100% </span>
          <span className="font-sans text-xxxs lg:text-xxs absolute top-[6.625rem] left-[1.175rem] text-white/50 lg:top-[10.475rem] lg:left-[2.125rem] z-[4]"> 50% </span>
          <span className="font-sans text-xxxs lg:text-xxs absolute top-[6.625rem] left-[11.675rem] text-white/50 lg:top-[10.475rem] lg:left-[18.375rem] z-[4]"> 50% </span>
          <span className="font-sans text-xxxs lg:text-xxs absolute top-[11.657rem] left-[6.5rem] text-white/50 lg:top-[18.625rem] lg:left-[10.5625rem] z-[4]"> 0% </span>
        </div>
      </div>
    </div>
  )
})
