"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { UpgradeWheel, UpgradeWheelHandle } from "./upgrade-wheel"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

interface LoseAnimationOverlayProps {
  playing: boolean
  onComplete?: () => void
  soundEnabled?: boolean
}

const FRAME_COUNT  = 81
const FRAME_MS     = 1000 / 24 // Match original Lottie 24 fps
const TRIGGER_FRAME = 42

const frameUrls = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/assets/lose-anim/roulette/r${String(i).padStart(4, "0")}.png`
)

// Preload
let pngDone = false
function preload() {
  if (pngDone || typeof window === "undefined") return
  pngDone = true
  let idx = 0
  const next = () => {
    const batch = frameUrls.slice(idx, idx + 10)
    if (!batch.length) return
    let n = 0
    batch.forEach((u) => {
      const img = new window.Image()
      img.onload = img.onerror = () => { if (++n === batch.length) { idx += 10; setTimeout(next, 20) } }
      img.src = u
    })
  }
  setTimeout(next, 800)
}

// Simple Particle Component for the "flying particles under the case"
function ParticlesUnderCase({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 z-0 overflow-visible pointer-events-none flex items-center justify-center">
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2
        const distance = 100 + Math.random() * 150
        const tx = Math.cos(angle) * distance
        const ty = Math.sin(angle) * distance + 50 // offset downwards
        const delay = Math.random() * 0.5
        const duration = 1 + Math.random()
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white opacity-0"
            style={{
              boxShadow: "0 0 8px 2px rgba(255,255,255,0.8)",
              animation: `particleFly ${duration}s ease-out ${delay}s forwards`,
              // @ts-ignore
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
            }}
          />
        )
      })}
      <style>{`
        @keyframes particleFly {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Simple Horizontal Roulette Component
function HorizontalRoulette({ active, items }: { active: boolean, items: any[] }) {
  const tapeRef = useRef<HTMLDivElement>(null)
  const [spinFinished, setSpinFinished] = useState(false)

  useEffect(() => {
    if (active && tapeRef.current) {
      setSpinFinished(false)
      // Each item is 140px wide. We want to land on item index 40.
      // Offset by half container width to center it (approx 250px for desktop)
      // We'll use a CSS variable or calculate it roughly. 
      // 40 * 140px = 5600px.
      const stopPos = 5600 - 150 + Math.random() * 100
      
      // Force initial transform
      tapeRef.current.style.transition = "none"
      tapeRef.current.style.transform = "translateX(0px)"
      
      // Trigger reflow
      void tapeRef.current.offsetHeight
      
      // Start spin
      tapeRef.current.style.transition = "transform 7.3s cubic-bezier(0.1, 0, 0.1, 1)"
      tapeRef.current.style.transform = `translateX(-${stopPos}px)`
      
      const t = setTimeout(() => setSpinFinished(true), 7300)
      return () => clearTimeout(t)
    } else if (tapeRef.current) {
      tapeRef.current.style.transition = "none"
      tapeRef.current.style.transform = "translateX(0px)"
      setSpinFinished(false)
    }
  }, [active])

  return (
    <div className="relative w-[320px] sm:w-[500px] h-[120px] overflow-hidden bg-[#101116] border-2 border-[#202021] rounded-xl shadow-2xl before:absolute before:inset-y-0 before:left-0 before:w-16 before:bg-gradient-to-r before:from-[#101116] before:to-transparent before:z-10 after:absolute after:inset-y-0 after:right-0 after:w-16 after:bg-gradient-to-l after:from-[#101116] after:to-transparent after:z-10">
      
      {/* Center line indicator */}
      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[#FFD700] z-20 -translate-x-1/2 shadow-[0_0_15px_#FFD700]" />
      
      {/* Tape container */}
      <div 
        ref={tapeRef}
        className="flex h-full items-center px-[50%]"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {items.map((skin, i) => {
          const isWinning = i === 40;
          return (
            <div 
              key={i} 
              className={`w-[130px] h-[96px] flex-shrink-0 mx-[5px] rounded border border-[#2a2c33] relative transition-all duration-300 ${isWinning && spinFinished ? 'scale-[1.15] z-30 !border-transparent' : ''}`}
            >
              {/* Running border gradient wrapper */}
              {(isWinning && spinFinished) && (
                <div 
                  className="absolute -inset-[1px] rounded z-0"
                  style={{
                    background: "linear-gradient(90deg, #2a2c33 0%, #a0a0a0 50%, #2a2c33 100%)",
                    backgroundSize: "200% 100%",
                    animation: "borderSweep 1.5s linear infinite"
                  }}
                />
              )}
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#181920] to-[#14151a] rounded overflow-hidden">
                <img src={skin.image || "/assets/unknown-item.svg"} alt="" className="h-[46px] w-auto object-contain mb-1" />
                <span className="text-[9px] font-medium text-center leading-tight px-1 text-[#A7A7A7]">
                  {skin.weapon} <br/> {skin.name}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes borderSweep {
          0% { background-position: 200% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export function LoseAnimationOverlay({ playing, onComplete, soundEnabled }: LoseAnimationOverlayProps) {
  const { state, addToInventory } = useStore()
  const { skins } = state
  const [tapeItems, setTapeItems] = useState<any[]>([])
  const [winningSkin, setWinningSkin] = useState<any>(null)
  const [frameIdx,   setFrameIdx]   = useState(0)
  const [visible,    setVisible]    = useState(false)
  const [showWheel,  setShowWheel]  = useState(false)

  const wheelRef = useRef<UpgradeWheelHandle>(null)
  const ival    = useRef<ReturnType<typeof setInterval>  | null>(null)
  const touts   = useRef<ReturnType<typeof setTimeout>[]>([])
  const defer   = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const audio   = useRef<HTMLAudioElement | null>(null)
  const alive   = useRef(true)

  useEffect(() => {
    alive.current = true
    preload()
    return () => {
      alive.current = false
      stopAll()
    }
  }, [])

  function stopAll() {
    if (defer.current)    { clearTimeout(defer.current);   defer.current = null }
    if (ival.current)     { clearInterval(ival.current);   ival.current  = null }
    touts.current.forEach(clearTimeout)
    touts.current = []
    if (audio.current)    { audio.current.pause();         audio.current = null }
  }

  useEffect(() => {
    if (!playing) {
      stopAll()
      setVisible(false)
      const t = window.setTimeout(() => {
        if (!alive.current) return
        setFrameIdx(0); setShowWheel(false); setWinningSkin(null)
      }, 500)
      touts.current.push(t)
      return
    }

    // Generate roulette tape items when started
    if (skins && skins.length > 0) {
      const cheapSkins = skins.filter(s => s.price < 1000)
      const pool = cheapSkins.length > 0 ? cheapSkins : skins
      
      const newTape = []
      for (let i = 0; i < 60; i++) {
        newTape.push(pool[Math.floor(Math.random() * pool.length)])
      }
      setTapeItems(newTape)
      setWinningSkin(newTape[40]) // The item at index 40 is the one it lands on
    }

    stopAll()
    defer.current = window.setTimeout(() => {
      if (!alive.current) return
      defer.current = null

      setFrameIdx(0); setShowWheel(false); setVisible(true)

      let f = 0
      let triggered = false

      ival.current = setInterval(() => {
        if (!alive.current) { clearInterval(ival.current!); return }
        f++

        if (f >= FRAME_COUNT - 1) {
          f = FRAME_COUNT - 1 // hold on last frame
          clearInterval(ival.current!)
          ival.current = null
        } else {
          setFrameIdx(f)
        }

        if (f === TRIGGER_FRAME && !triggered) {
          triggered = true
          // Sound
          if (soundEnabled !== false) {
            try {
              const a = new Audio("/assets/lose-anim/openCompensationCase.mp3")
              a.volume = 0.7; a.play().catch(() => {}); audio.current = a
            } catch { /* skip */ }
          }
          
          // Show and spin wheel
          setShowWheel(true)
          
          // Next tick, trigger spin
          const tSpin = window.setTimeout(() => {
            if (!alive.current) return
            
            // Spin takes ~7.3s, wait a bit then close overlay
            const tClose = window.setTimeout(() => {
              if (!alive.current) return
              setVisible(false)
              if (winningSkin) {
                addToInventory(winningSkin.id)
              }
              const tDone = window.setTimeout(() => {
                if (!alive.current) return
                onComplete?.()
              }, 500)
              touts.current.push(tDone)
            }, 8500) // 7.3s spin + 1.2s view result
            touts.current.push(tClose)
          }, 50)
          touts.current.push(tSpin)
        }
      }, FRAME_MS)
    }, 0)

    return () => { stopAll() }
  }, [playing])

  if (!visible && frameIdx === 0) return null

  const handleClose = () => {
    stopAll()
    setVisible(false)
    window.setTimeout(() => {
      if (!alive.current) return
      setFrameIdx(0); setShowWheel(false); onComplete?.()
    }, 500)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(8, 9, 13, 0.92)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      <button
        className="pointer-events-auto absolute top-6 right-6 z-[110] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#1c1d21] text-[#A7A7A7] transition-colors hover:bg-[#2a2b30] hover:text-white"
        onClick={handleClose}
      >
        <X size={16} />
      </button>

      <div className="relative w-full max-w-6xl px-2 h-[60vh] min-h-[300px] pointer-events-none flex items-center justify-center">
        
        <div className="relative w-full h-full flex items-center justify-center scale-125 lg:scale-150 transform-origin-center">
          
          {/* Particles Underneath */}
          <ParticlesUnderCase active={frameIdx >= 10} />

          {/* PNG sequence (Smooth playback, no key prop) */}
          <img
            src={frameUrls[Math.min(frameIdx, FRAME_COUNT - 1)]}
            alt=""
            draggable={false}
            className="absolute z-10 w-full h-full object-contain"
          />

          {/* Inner Horizontal Roulette - Appears inside the opened case */}
          <div 
            className="absolute z-20 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              top: "40%", // Position it to align with the opened case interior
              transform: showWheel ? "translateY(0%) scale(1)" : "translateY(20%) scale(0.2)",
              opacity: showWheel ? 1 : 0,
            }}
          >
            {tapeItems.length > 0 && <HorizontalRoulette active={showWheel} items={tapeItems} />}
          </div>

        </div>
      </div>
    </div>
  )
}
