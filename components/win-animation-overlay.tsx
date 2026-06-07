"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface WinAnimationOverlayProps {
  /** Whether the win animation should be playing */
  playing: boolean
  /** Called when the animation has fully finished */
  onComplete?: () => void
}

const FRAME_FPS = 30
const FRAME_INTERVAL = 1000 / FRAME_FPS // ~33ms per frame

// Total frame counts (from copied assets)
const FRAME_COUNT = 152  // Рамка
const SALUT1_COUNT = 156 // Салют burst 1
const SALUT2_COUNT = 156 // Салют burst 2
const SALUT3_COUNT = 156 // Салют burst 3
const ARROW_COUNT = 48   // Стрелка
const SMOKE1_COUNT = 134
const SMOKE2_COUNT = 135
const SMOKE3_COUNT = 133
const SMOKE4_COUNT = 136

// Build frame URL arrays
const frameUrls = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/assets/win-anim/frame/f${String(i).padStart(4, "0")}.png`
)
const salut1Urls = Array.from({ length: SALUT1_COUNT }, (_, i) =>
  `/assets/win-anim/salut1/s${String(i).padStart(4, "0")}.png`
)
const salut2Urls = Array.from({ length: SALUT2_COUNT }, (_, i) =>
  `/assets/win-anim/salut2/s${String(i).padStart(4, "0")}.png`
)
const salut3Urls = Array.from({ length: SALUT3_COUNT }, (_, i) =>
  `/assets/win-anim/salut3/s${String(i).padStart(4, "0")}.png`
)
const arrowUrls = Array.from({ length: ARROW_COUNT }, (_, i) =>
  `/assets/win-anim/arrow/a${String(i).padStart(4, "0")}.png`
)
const smoke1Urls = Array.from({ length: SMOKE1_COUNT }, (_, i) =>
  `/assets/win-anim/smoke1/sm${String(i).padStart(4, "0")}.png`
)
const smoke2Urls = Array.from({ length: SMOKE2_COUNT }, (_, i) =>
  `/assets/win-anim/smoke2/sm${String(i).padStart(4, "0")}.png`
)
const smoke3Urls = Array.from({ length: SMOKE3_COUNT }, (_, i) =>
  `/assets/win-anim/smoke3/sm${String(i).padStart(4, "0")}.png`
)
const smoke4Urls = Array.from({ length: SMOKE4_COUNT }, (_, i) =>
  `/assets/win-anim/smoke4/sm${String(i).padStart(4, "0")}.png`
)

// Preload images once (browser-level cache)
export let preloaded = false
export function preloadWinAnimationFrames() {
  if (preloaded || typeof window === "undefined") return
  preloaded = true
  const all = [...frameUrls, ...salut1Urls, ...salut2Urls, ...salut3Urls, ...arrowUrls, ...smoke1Urls, ...smoke2Urls, ...smoke3Urls, ...smoke4Urls]
  
  // Load in batches of 15 so we don't block the network completely for other assets
  let i = 0
  function loadNextBatch() {
    const batch = all.slice(i, i + 15)
    if (batch.length === 0) return
    let loaded = 0
    batch.forEach((url) => {
      const img = new window.Image()
      img.onload = img.onerror = () => {
        loaded++
        if (loaded === batch.length) {
          i += 15
          // Small delay before next batch to let browser breathe
          setTimeout(loadNextBatch, 20)
        }
      }
      img.src = url
    })
  }
  
  // Start preloading after a short delay (let initial page load finish)
  setTimeout(loadNextBatch, 1000)
}

export function WinAnimationOverlay({ playing, onComplete }: WinAnimationOverlayProps) {
  const [frameIdx, setFrameIdx] = useState(0)
  const [salut1Idx, setSalut1Idx] = useState(0)
  const [salut2Idx, setSalut2Idx] = useState(0)
  const [salut3Idx, setSalut3Idx] = useState(0)
  const [arrowIdx, setArrowIdx] = useState(0)
  const [smoke1Idx, setSmoke1Idx] = useState(0)
  const [smoke2Idx, setSmoke2Idx] = useState(0)
  const [smoke3Idx, setSmoke3Idx] = useState(0)
  const [smoke4Idx, setSmoke4Idx] = useState(0)
  const [visible, setVisible] = useState(false)

  const timersRef = useRef<{ [key: string]: ReturnType<typeof setInterval> | null }>({})
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Preload all frames on mount (as fallback if not triggered globally)
  useEffect(() => {
    preloadWinAnimationFrames()
  }, [])

  const stop = useCallback(() => {
    Object.values(timersRef.current).forEach((t) => { if (t) clearInterval(t) })
    timersRef.current = {}
    if (fadeOutTimerRef.current) { clearTimeout(fadeOutTimerRef.current); fadeOutTimerRef.current = null }
  }, [])

  useEffect(() => {
    if (!playing) {
      // Fade out, then fully stop
      setVisible(false)
      const t = window.setTimeout(() => {
        stop()
        setFrameIdx(0)
        setSalut1Idx(0)
        setSalut2Idx(0)
        setSalut3Idx(0)
        setArrowIdx(0)
        setSmoke1Idx(0)
        setSmoke2Idx(0)
        setSmoke3Idx(0)
        setSmoke4Idx(0)
      }, 500)
      fadeOutTimerRef.current = t as unknown as ReturnType<typeof setTimeout>
      return
    }

    // Reset and start
    stop()
    setFrameIdx(0)
    setSalut1Idx(0)
    setSalut2Idx(0)
    setSalut3Idx(0)
    setArrowIdx(0)
    setSmoke1Idx(0)
    setSmoke2Idx(0)
    setSmoke3Idx(0)
    setSmoke4Idx(0)
    setVisible(true)

    // Helper to calculate frame based on elapsed ticks
    let ticks = 0
    timersRef.current.main = setInterval(() => {
      ticks++
      
      if (ticks < FRAME_COUNT) setFrameIdx(ticks)
      if (ticks < SALUT1_COUNT) setSalut1Idx(ticks)
      if (ticks < SALUT2_COUNT) setSalut2Idx(ticks)
      if (ticks < SALUT3_COUNT) setSalut3Idx(ticks)
      setArrowIdx(ticks % ARROW_COUNT) // arrow loops
      if (ticks < SMOKE1_COUNT) setSmoke1Idx(ticks)
      if (ticks < SMOKE2_COUNT) setSmoke2Idx(ticks)
      if (ticks < SMOKE3_COUNT) setSmoke3Idx(ticks)
      if (ticks < SMOKE4_COUNT) setSmoke4Idx(ticks)

      // Total duration based on the longest layer
      const maxTicks = Math.max(SALUT1_COUNT, SMOKE4_COUNT)
      if (ticks >= maxTicks) {
        clearInterval(timersRef.current.main!)
        timersRef.current.main = null
      }
    }, FRAME_INTERVAL)

    // Total duration based on the longest layer (salut)
    const totalDuration = Math.max(SALUT1_COUNT, SMOKE4_COUNT) * FRAME_INTERVAL

    fadeOutTimerRef.current = window.setTimeout(() => {
      setVisible(false)
      window.setTimeout(() => {
        stop()
        onComplete?.()
      }, 500)
    }, totalDuration) as unknown as ReturnType<typeof setTimeout>

    return () => {
      stop()
    }
  }, [playing]) // eslint-disable-line react-hooks/exhaustive-deps

  // Don't render anything if we've never started
  if (!visible && frameIdx === 0 && salut1Idx === 0 && smoke1Idx === 0) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Layer 0: Салют (fireworks) — fullscreen behind other layers */}
      <img
        key={`s1-${salut1Idx}`}
        src={salut1Urls[salut1Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        key={`s2-${salut2Idx}`}
        src={salut2Urls[salut2Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        key={`s3-${salut3Idx}`}
        src={salut3Urls[salut3Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Layer 0.1: Дым */}
      <img
        key={`sm1-${smoke1Idx}`}
        src={smoke1Urls[smoke1Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        key={`sm2-${smoke2Idx}`}
        src={smoke2Urls[smoke2Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        key={`sm3-${smoke3Idx}`}
        src={smoke3Urls[smoke3Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        key={`sm4-${smoke4Idx}`}
        src={smoke4Urls[smoke4Idx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Layer 1: Рамка (animated glowing border) */}
      <img
        key={`f${frameIdx}`}
        src={frameUrls[frameIdx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Layer 2: Стрелка (animated arrows/chevrons) — loops */}
      <img
        key={`a${arrowIdx}`}
        src={arrowUrls[arrowIdx]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
    </div>
  )
}
