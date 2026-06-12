"use client"

import { useEffect, useRef, useState } from "react"

interface WinAnimationOverlayProps {
  /** Whether the win animation should be playing */
  playing: boolean
  /** Called when the animation has fully finished */
  onComplete?: () => void
}

// Real upgrader.pro win celebration: a single Lottie animation (svg renderer,
// preserveAspectRatio "none"), instead of the old ~1300-PNG frame sequences.
// The Lottie is 30fps / 300 frames (10s) with two markers:
//   intro: frames 0-180 (the fireworks + dust burst) — one-shot
//   loop:  frames 180-300 (ambient glow) — not needed here
// We play only the intro segment (~6s) so the celebration matches the previous
// timing and reveals the won item (via onComplete) at a sensible moment.
const ANIM_PATH = "/assets/lottie/win-case-animation.json"
const INTRO_END_FRAME = 181

// Backwards-compatible preload hook (imported by home-client.tsx & upgrade-section.tsx).
// Warms the browser cache for the Lottie JSON so the first win plays instantly.
export let preloaded = false
export function preloadWinAnimationFrames() {
  if (preloaded || typeof window === "undefined") return
  preloaded = true
  // Fetch after initial page load so we don't compete with critical assets.
  setTimeout(() => {
    fetch(ANIM_PATH).catch(() => {})
  }, 1000)
}

export function WinAnimationOverlay({ playing, onComplete }: WinAnimationOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animRef = useRef<any>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const playingRef = useRef(playing)
  playingRef.current = playing
  const [visible, setVisible] = useState(false)

  // Create the Lottie instance once (client-only; lottie-web touches `document`).
  useEffect(() => {
    let cancelled = false

    import("lottie-web").then((mod) => {
      const lottie = mod.default ?? mod
      if (cancelled || !containerRef.current) return

      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: ANIM_PATH,
        rendererSettings: { preserveAspectRatio: "none" },
      })

      // Fire onComplete when a played segment finishes.
      anim.addEventListener("complete", () => {
        setVisible(false)
        onCompleteRef.current?.()
      })

      animRef.current = anim

      // If a win was triggered before the animation finished loading, start now.
      if (playingRef.current) {
        setVisible(true)
        anim.goToAndStop(0, true)
        anim.playSegments([0, INTRO_END_FRAME], true)
      }
    })

    return () => {
      cancelled = true
      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }
    }
  }, [])

  // Start / stop on `playing` changes.
  useEffect(() => {
    const anim = animRef.current
    if (playing) {
      setVisible(true)
      if (anim) {
        anim.goToAndStop(0, true)
        anim.playSegments([0, INTRO_END_FRAME], true)
      }
    } else {
      setVisible(false)
      if (anim) anim.stop()
    }
  }, [playing])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    />
  )
}
