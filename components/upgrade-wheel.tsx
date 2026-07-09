"use client"

import { flushSync } from "react-dom"
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react"

export interface UpgradeWheelHandle {
  spin: (win: boolean) => Promise<boolean>
  // Two-phase spin: begin spinning the instant the user clicks (while the upgrade
  // request is in flight), then land on the result once the server responds.
  startSpin: () => void
  finishSpin: (win: boolean) => Promise<boolean>
  cancelSpin: () => void
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

  // ── Two-phase spin state ──────────────────────────────────────────────────
  // startSpin() runs a constant-speed rotation the moment the user clicks (during
  // the upgrade fetch); finishSpin() decelerates from wherever the pointer is and
  // lands on the win/lose segment once the server result is known. This removes the
  // old "click → ~1.5s frozen pointer → jump to result" feel — the wheel visibly
  // spins the whole time, and faster in fast mode. The full transition string lives
  // in a ref so the same style hook serves both the linear pre-spin and the eased land.
  const preSpinActiveRef = useRef(false)
  const preSpinStartAngleRef = useRef(0)
  const preSpinStartTimeRef = useRef(0)
  const preSpinSpeedRef = useRef(0)
  const pointerTransitionRef = useRef<string>("transform 7300ms cubic-bezier(0.4, 0, 0.2, 1)")
  const spinAudioRef = useRef<HTMLAudioElement | null>(null)
  const nowMs = () => (typeof performance !== "undefined" ? performance.now() : Date.now())

  const prevHasSelectionRef = useRef(hasSelection)
  // After ANY spin (win OR loss), the arc holds the just-played chance (e.g. 72%)
  // instead of snapping to 50%. It stays held until the user picks the next source
  // weapon (no-selection → selection transition), then updates to the real chance.
  // The pointer also stays where it landed after a spin; it resets to neutral only
  // when the user picks a new source weapon (same moment the held chance updates).
  const frozenChanceRef = useRef<number | null>(null)

  // Clear result and reset wheel on new selection or after a loss
  useEffect(() => {
    const newlySelected = hasSelection && !prevHasSelectionRef.current
    // Drop the post-win hold ONLY on a genuine new selection. We must NOT clear it
    // merely because hasSelection is currently true: the arc resolves while the win
    // animation still runs (parent keeps hasSelection true via isUpgradeAnimating),
    // so clearing on hasSelection would wipe the held value and snap it to 50%.
    if (newlySelected) {
      // New source weapon picked → drop the held chance AND reset the pointer to
      // neutral (к нулям). This runs regardless of `result` (after a spin result is
      // already "none" by selection time), so the pointer resets when a weapon is
      // selected — not right after the spin.
      frozenChanceRef.current = null
      const target = Math.round(rotationRef.current / 360) * 360
      setRotation(target)
      rotationRef.current = target
    }
    if (result !== "none" && !isResolving) {
      if (newlySelected) {
        setResult("none")
        if (resetTimer) {
          clearTimeout(resetTimer)
          setResetTimer(null)
        }
      } else if (!hasSelection && (result === "win" || result === "lose")) {
        // After ANY spin (win or loss): just clear the result text. The pointer
        // stays where it landed and the held chance/arc (frozenChanceRef) stays
        // too. The pointer is reset to neutral ONLY when the user picks a new
        // source weapon (the newlySelected branch above) — not right after the spin.
        setResult("none")
      }
    }
    prevHasSelectionRef.current = hasSelection
  }, [hasSelection, result, resetTimer, isResolving])

  // Real chance while a target + source are both active (hasSelection). When the
  // source is empty: hold the just-played chance after ANY spin (frozenChanceRef),
  // else fall back to the 50% baseline (fresh/empty state only).
  const displayChance = hasSelection
    ? (lockedChanceRef.current ?? chance)
    : (frozenChanceRef.current ?? 0.5)
  const segAngle = Math.min(0.999, Math.max(0.0001, displayChance)) * 360

  const circumference = 779.115
  const gap = 8 * Math.min(1, displayChance * 4)
  const strokeDash = circumference * Math.max(0.0001, displayChance) - 2 * gap
  const strokeGap = circumference - strokeDash
  const strokeOffset = (circumference * Math.max(0.0001, displayChance)) / 2 - circumference / 4 - gap

  // ── Phase 1: begin a constant-speed spin immediately on click ──────────────
  const startSpinImpl = () => {
    if (resetTimer) {
      clearTimeout(resetTimer)
      setResetTimer(null)
    }
    const isFast = !!fastMode
    lockedChanceRef.current = chance          // freeze arc sector for the whole spin

    // Constant angular speed (deg/s). Fast mode spins visibly faster. We aim the
    // linear transition at a far target over a long ceiling; finishSpin() interrupts
    // it as soon as the server result arrives, so the ceiling is never reached.
    const speed = isFast ? 2100 : 900
    const ceilingMs = 14000
    const current = rotationRef.current
    const target = current + speed * (ceilingMs / 1000)

    preSpinActiveRef.current = true
    preSpinStartAngleRef.current = current
    preSpinStartTimeRef.current = nowMs()
    preSpinSpeedRef.current = speed
    pointerTransitionRef.current = `transform ${ceilingMs}ms linear`
    spinDurationMsRef.current = ceilingMs
    rotationRef.current = target

    flushSync(() => {
      setSpinning(true)
      setResult("none")
    })
    requestAnimationFrame(() => {
      setRotation(target)
      if (soundMode === "on") {
        try { spinAudioRef.current?.pause() } catch {}
        const audio = new Audio(isFast ? "/sounds/shortSpin.mp3" : "/sounds/longSpin.mp3")
        audio.play().catch(() => {})
        spinAudioRef.current = audio
      }
    })
  }

  // ── Phase 2: decelerate from the current position and land on the result ───
  const finishSpinImpl = (win: boolean) =>
    new Promise<boolean>((resolve) => {
      const isFast = !!fastMode
      const landMs = isFast ? 1100 : 2800

      // Estimate the pointer's current absolute angle from the linear pre-spin.
      // (Linear speed is exactly preSpinSpeedRef, so elapsed*speed matches the CSS
      // position; the CSS transition then eases from that computed value.)
      let currentAbs = rotationRef.current
      if (preSpinActiveRef.current) {
        const elapsed = nowMs() - preSpinStartTimeRef.current
        currentAbs = preSpinStartAngleRef.current + preSpinSpeedRef.current * (elapsed / 1000)
      }

      const chanceForSeg = lockedChanceRef.current ?? chance
      const segA = Math.min(0.999, Math.max(0.0001, chanceForSeg)) * 360
      const halfSeg = segA / 2
      const winStart = 360 - halfSeg
      const winEnd   = 360 + halfSeg
      const pos = win
        ? winStart + Math.random() * Math.max(segA - 2, 0.5) + 1
        : winEnd   + Math.random() * Math.max(360 - segA - 2, 0.5) + 1

      const posMod = ((pos % 360) + 360) % 360
      const currentMod = ((currentAbs % 360) + 360) % 360
      let delta = posMod - currentMod
      if (delta < 0) delta += 360
      const extraTurns = isFast ? 2 : 3        // guarantee visible decelerating turns
      const finalTarget = currentAbs + extraTurns * 360 + delta

      rotationRef.current = finalTarget
      preSpinActiveRef.current = false
      pointerTransitionRef.current = `transform ${landMs}ms cubic-bezier(0.16, 0.84, 0.3, 1)`
      spinDurationMsRef.current = landMs

      requestAnimationFrame(() => {
        // New transition + new target in one commit → the browser interrupts the
        // linear spin at its current computed angle and eases forward to finalTarget.
        setRotation(finalTarget)
        window.setTimeout(() => {
          try { spinAudioRef.current?.pause(); spinAudioRef.current = null } catch {}
          flushSync(() => {
            setIsResolving(true)
            setSpinning(false)
            // After ANY spin (win OR loss), hold the just-played chance on the arc
            // until the user picks the next source weapon.
            frozenChanceRef.current = lockedChanceRef.current
            lockedChanceRef.current = null
            setResult(win ? "win" : "lose")
          })
          resolve(win)
          setTimeout(() => { setIsResolving(false) }, 100)
        }, landMs)
      })
    })

  // ── Abort: freeze the pointer where it is (e.g. the upgrade request failed) ──
  const cancelSpinImpl = () => {
    let currentAbs = rotationRef.current
    if (preSpinActiveRef.current) {
      const elapsed = nowMs() - preSpinStartTimeRef.current
      currentAbs = preSpinStartAngleRef.current + preSpinSpeedRef.current * (elapsed / 1000)
    }
    preSpinActiveRef.current = false
    rotationRef.current = currentAbs
    pointerTransitionRef.current = "none"
    try { spinAudioRef.current?.pause(); spinAudioRef.current = null } catch {}
    flushSync(() => {
      setSpinning(false)
      lockedChanceRef.current = null
      setRotation(currentAbs)
    })
  }

  useImperativeHandle(ref, () => ({
    startSpin: startSpinImpl,
    finishSpin: finishSpinImpl,
    cancelSpin: cancelSpinImpl,
    // Legacy one-shot spin, kept for safety: start + land back-to-back.
    spin: (win: boolean) => {
      startSpinImpl()
      return finishSpinImpl(win)
    },
  }))

  const arcStroke = "url(#progress-gradient)"

  const getChanceText = (c: number) => {
    if (result === "win") return "Апгрейд успешен!"
    if (result === "lose") return "Не беда ...."
    if (c < 0.35) return "низкий шанс"
    if (c <= 0.65) return "средний шанс"
    return "высокий шанс"
  }

  // The active transition (linear pre-spin OR eased land) is stored in a ref and set
  // by start/finishSpin. Once the spin resolves, keep the exact transform without a
  // second transition (a post-spin transition could visually pull the pointer back).
  const pointerTransition = spinning ? pointerTransitionRef.current : "none"

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
                    <span className="font-exo bg-clip-text bg-gradient-to-b font-bold from-[#FF7474] lg:text-4xl text-2xl text-transparent to-[#FFC4C4] transition-all duration-500 ease-in-out uppercase">
                      НЕ БЕДА
                    </span>
                    <span className="font-exo lg:text-sm text-xs text-[#d1d1d1] transition-all duration-500 ease-in-out mt-1">
                      попробуем еще?
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-exo bg-clip-text bg-gradient-to-b font-bold from-[#FFE02D] lg:text-4xl text-2xl text-transparent to-[#53DB42] transition-all duration-500 ease-in-out">
                      {(displayChance * 100).toFixed(2)}{showPercentages ? "%" : ""}
                    </span>
                    <span className="font-exo bg-clip-text bg-gradient-to-b from-[#FFE02D] lg:text-sm text-transparent text-xs to-[#53DB42] transition-all duration-500 ease-in-out">
                      {getChanceText(displayChance)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <span className="font-exo text-xxxs lg:text-xxs absolute top-[1.275rem] left-[6.275rem] text-white/50 lg:top-[2.375rem] lg:left-[10.125rem] z-[4]"> 100% </span>
          <span className="font-exo text-xxxs lg:text-xxs absolute top-[6.625rem] left-[1.175rem] text-white/50 lg:top-[10.475rem] lg:left-[2.125rem] z-[4]"> 50% </span>
          <span className="font-exo text-xxxs lg:text-xxs absolute top-[6.625rem] left-[11.675rem] text-white/50 lg:top-[10.475rem] lg:left-[18.375rem] z-[4]"> 50% </span>
          <span className="font-exo text-xxxs lg:text-xxs absolute top-[11.657rem] left-[6.5rem] text-white/50 lg:top-[18.625rem] lg:left-[10.5625rem] z-[4]"> 0% </span>
        </div>
      </div>
    </div>
  )
})
