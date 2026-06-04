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
const SALUT_COUNT = 139  // Салют
const ARROW_COUNT = 48   // Стрелка

// Build frame URL arrays
const frameUrls = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/assets/win-anim/frame/f${String(i).padStart(4, "0")}.png`
)
const salutUrls = Array.from({ length: SALUT_COUNT }, (_, i) =>
  `/assets/win-anim/salut/s${String(i).padStart(4, "0")}.png`
)
const arrowUrls = Array.from({ length: ARROW_COUNT }, (_, i) =>
  `/assets/win-anim/arrow/a${String(i).padStart(4, "0")}.png`
)

// Preload images once (browser-level cache)
let preloaded = false
function preloadFrames() {
  if (preloaded || typeof window === "undefined") return
  preloaded = true
  const all = [...frameUrls, ...salutUrls, ...arrowUrls]
  all.forEach((url) => {
    const img = new window.Image()
    img.src = url
  })
}

export function WinAnimationOverlay({ playing, onComplete }: WinAnimationOverlayProps) {
  const [frameIdx, setFrameIdx] = useState(0)
  const [salutIdx, setSalutIdx] = useState(0)
  const [arrowIdx, setArrowIdx] = useState(0)
  const [visible, setVisible] = useState(false)

  const frameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const salutTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const arrowTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Preload all frames on mount
  useEffect(() => {
    preloadFrames()
  }, [])

  const stop = useCallback(() => {
    if (frameTimerRef.current) { clearInterval(frameTimerRef.current); frameTimerRef.current = null }
    if (salutTimerRef.current) { clearInterval(salutTimerRef.current); salutTimerRef.current = null }
    if (arrowTimerRef.current) { clearInterval(arrowTimerRef.current); arrowTimerRef.current = null }
    if (fadeOutTimerRef.current) { clearTimeout(fadeOutTimerRef.current); fadeOutTimerRef.current = null }
  }, [])

  useEffect(() => {
    if (!playing) {
      // Fade out, then fully stop
      setVisible(false)
      const t = window.setTimeout(() => {
        stop()
        setFrameIdx(0)
        setSalutIdx(0)
        setArrowIdx(0)
      }, 500)
      fadeOutTimerRef.current = t as unknown as ReturnType<typeof setTimeout>
      return
    }

    // Reset and start
    stop()
    setFrameIdx(0)
    setSalutIdx(0)
    setArrowIdx(0)
    setVisible(true)

    // Animate Рамка (border frames) — plays once
    let fi = 0
    frameTimerRef.current = setInterval(() => {
      fi++
      if (fi >= FRAME_COUNT) {
        clearInterval(frameTimerRef.current!)
        frameTimerRef.current = null
        return
      }
      setFrameIdx(fi)
    }, FRAME_INTERVAL)

    // Animate Салют (fireworks) — plays once, longest layer
    let si = 0
    salutTimerRef.current = setInterval(() => {
      si++
      if (si >= SALUT_COUNT) {
        clearInterval(salutTimerRef.current!)
        salutTimerRef.current = null
        return
      }
      setSalutIdx(si)
    }, FRAME_INTERVAL)

    // Animate Стрелка (arrows) — loops while playing
    let ai = 0
    arrowTimerRef.current = setInterval(() => {
      ai = (ai + 1) % ARROW_COUNT
      setArrowIdx(ai)
    }, FRAME_INTERVAL)

    // Total duration based on the longest layer (salut)
    const totalDuration = SALUT_COUNT * FRAME_INTERVAL // ~4633ms

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
  if (!visible && frameIdx === 0 && salutIdx === 0) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Layer 0: Салют (fireworks) — fullscreen behind other layers */}
      <img
        key={`s${salutIdx}`}
        src={salutUrls[salutIdx]}
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
