"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/lib/store"

export function PredictPageClient() {
  const { state } = useStore()
  const [phase, setPhase] = useState<"idle" | "analyzing" | "result">("idle")
  const [dots, setDots] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [signal, setSignal] = useState("")

  useEffect(() => {
    if (phase !== "analyzing") return
    let value = 1
    const id = window.setInterval(() => {
      value = value >= 3 ? 1 : value + 1
      setDots(value)
    }, 400)
    return () => window.clearInterval(id)
  }, [phase])

  function nextSignal() {
    if (state.predict.outcome !== "off" && state.predict.hint) return state.predict.hint.toUpperCase()
    const min = Math.min(...state.fastMultipliers)
    const max = Math.max(...state.fastMultipliers)
    return `X${Math.floor(Math.random() * (max - min + 1) + min)}`
  }

  function handleClick() {
    if (phase === "analyzing") return
    setSignal(nextSignal())
    setPhase("analyzing")
    setRotation((prev) => prev + 360 * 5 + Math.floor(Math.random() * 360))
    if (state.soundMode === "on") {
      const audio = new Audio("/sounds/longSpin.mp3")
      audio.play().catch(() => {})
    }
    window.setTimeout(() => setPhase("result"), 7300)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f1013" }}>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-center px-5 shrink-0" style={{ background: "#17181c", borderBottom: "1px solid #232325" }}>
        <div className="flex items-center gap-3">
          <img src="/assets/images/header/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-tektur text-xl lg:text-2xl font-extrabold tracking-wide text-white">UPGRADER</span>
          <span className="font-tektur rounded px-4 py-1.5 text-base lg:text-lg font-bold" style={{ background: "#f0c000", color: "#111" }}>AI PREDICT</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
        <button type="button" onClick={handleClick} className="relative flex h-[21.75rem] w-[21.75rem] max-h-[82vw] max-w-[82vw] items-center justify-center rounded-full border border-[#202021] bg-[#17181c] shadow-[0_0_80px_rgba(164,229,126,0.08)]">
          <img alt="" className="absolute inset-0 h-full w-full object-contain" src="/assets/images/game/upgrade-circle-bg.svg" />
          <img alt="" className="absolute inset-0 m-auto h-[92%] w-[92%] object-contain" src="/assets/images/game/circle-black.svg" />
          <div className="absolute left-1/2 top-1/2 z-[5] h-0 w-0" style={{ transform: `translate(-50%, -50%) rotate(${rotation + 180}deg)`, transformOrigin: "center center", transition: phase === "analyzing" ? "transform 7.3s cubic-bezier(0.25,0.1,0.25,1)" : "none" }}>
            <img alt="" className="absolute left-[-1.45rem] top-[-10.1rem] h-[2.9rem] w-[2.9rem] max-w-none" src="/assets/images/game/pointer.png" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {phase === "idle" && <span className="font-sans text-[1.35rem] font-medium uppercase leading-snug tracking-wide text-[#a4e57e]">получить сигнал</span>}
            {phase === "analyzing" && <span className="font-sans text-[1.35rem] font-medium text-[#a4e57e]">анализ{".".repeat(dots)}</span>}
            {phase === "result" && (
              <>
                <span className="font-sans text-base text-[#a4e57e] mb-1">ставь на:</span>
                <span className="font-sans font-black text-6xl text-[#a4e57e] mb-2 leading-none">{signal}</span>
                <span className="font-sans text-[0.65rem] text-[#6b6b6b] leading-tight mt-1">нажми, чтобы получить<br />новый сигнал</span>
              </>
            )}
          </div>
        </button>
      </main>
    </div>
  )
}
