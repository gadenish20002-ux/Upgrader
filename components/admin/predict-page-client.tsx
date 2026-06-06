"use client"

import { useState, useEffect } from "react"
import { useStore } from "@/lib/store"
import { AdminGate } from "./admin-gate"

function PredictContent() {
  const { state } = useStore()
  // hint from admin state is no longer used for static display

  const [phase, setPhase] = useState<"idle" | "analyzing" | "result">("idle")
  const [rotation, setRotation] = useState(0)
  const [dots, setDots] = useState(1)
  const [randomHint, setRandomHint] = useState<string>("")
  const showPercentages = state.predict.showPercentages ?? true
  const showMultipliers = state.predict.showMultipliers ?? true

  useEffect(() => {
    if (phase === "analyzing") {
      let currentDots = 1
      let increasing = true
      const interval = setInterval(() => {
        if (increasing) {
          currentDots++
          if (currentDots >= 3) increasing = false
        } else {
          currentDots--
          if (currentDots <= 1) increasing = true
        }
        setDots(currentDots)
      }, 400)
      return () => clearInterval(interval)
    }
  }, [phase])

  const handleClick = () => {
    if (phase === "idle" || phase === "result") {
      setPhase("analyzing")
      
      if (state.soundMode === "on") {
        const audio = new Audio("/sounds/longSpin.mp3")
        audio.play().catch(() => {})
      }
      
      // Generate random hint based on fastMultipliers range
      const minMult = Math.min(...state.fastMultipliers)
      const maxMult = Math.max(...state.fastMultipliers)
      const val = Math.floor(Math.random() * (maxMult - minMult + 1) + minMult)
      setRandomHint("x" + val)

      // Start spinning (5 full spins + some random rotation)
      setRotation((prev) => prev + 360 * 5 + Math.floor(Math.random() * 360))

      setTimeout(() => {
        setPhase("result")
      }, 7300)
    }
  }

  // Calculate SVG variables exactly as in UpgradeWheel for chance=0.5
  const displayChance = 0.5
  const circumference = 779.115
  const gap = 8 * Math.min(1, displayChance * 4)
  const strokeDash = circumference * Math.max(0.0001, displayChance) - 2 * gap
  const strokeGap = circumference - strokeDash
  const strokeOffset = (circumference * Math.max(0.0001, displayChance)) / 2 - circumference / 4 - gap
  const arcStroke = "url(#progress-gradient)"

  // Render dots for analyzing
  const dotsString = ".".repeat(dots)

  const formattedHint = showMultipliers 
    ? randomHint.toUpperCase() 
    : randomHint.replace(/x/i, '').toUpperCase()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f1013" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-center px-5 shrink-0"
        style={{ background: "#17181c", borderBottom: "1px solid #232325" }}
      >
        <div className="flex items-center gap-3">
          <img src="/assets/images/header/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-tektur text-xl lg:text-2xl font-extrabold tracking-wide text-white">UPGRADER</span>
          <span
            className="font-tektur rounded px-4 py-1.5 text-base lg:text-lg font-bold"
            style={{ background: "#f0c000", color: "#111" }}
          >
            AI PREDICT
          </span>
        </div>
      </header>

      {/* Main Area: Centered Wheel */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full overflow-hidden">
        <div 
          className="relative flex items-center justify-center cursor-pointer transform scale-[1.6] lg:scale-[1.8] transition-transform" 
          onClick={handleClick}
        >
          <div className="relative flex h-[13.75rem] w-[13.75rem] items-center justify-center lg:h-[21.75rem] lg:w-[21.75rem]">
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
                    <stop offset="0%" style={{ stopColor: '#23d70c', stopOpacity: 1 }}></stop>
                    <stop offset="60%" style={{ stopColor: '#ebd215', stopOpacity: 1 }}></stop>
                    <stop offset="80%" style={{ stopColor: '#edb516', stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: '#df4125', stopOpacity: 1 }}></stop>
                  </linearGradient>
                </defs>
                <circle fill="none" stroke={arcStroke} strokeLinecap="butt" cx="144.5" cy="144.5" r="124" strokeWidth="42" 
                  strokeDasharray={`${strokeDash} ${strokeGap}`} 
                  strokeDashoffset={strokeOffset}
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transition: "stroke-dasharray 0.3s, stroke-dashoffset 0.3s, stroke 0.3s"
                  }}></circle>
              </svg>
            </div>

            {/* Слой 4: Внутренние элементы и указатель */}
            <div className="absolute top-[0.45rem] left-[0.45rem] h-[12.8125rem] w-[12.8125rem] rounded-full border-[3px] border-[#101012] lg:top-[0.875rem] lg:left-[0.875rem] lg:h-80 lg:w-80 lg:border-4 z-[4]"></div>
            
            <div className="absolute top-1/2 left-1/2 z-[5] h-0 w-0" style={{ transform: `translate(-50%, -50%) rotate(${rotation + 180}deg)`, transformOrigin: "center center", transition: phase === "analyzing" ? `transform 7.3s cubic-bezier(0.25, 0.1, 0.25, 1)` : "none" }}>
              <img alt="" className="absolute top-[-6.6875rem] left-[-1.0625rem] h-[2.125rem] w-[2.125rem] max-w-none lg:top-[-10.125rem] lg:left-[-1.46875rem] lg:h-[2.9375rem] lg:w-[2.9375rem]" src="/assets/images/game/pointer.png" />
            </div>

            {/* Центральный текст */}
            <div className="absolute top-[3.125rem] left-[3.125rem] h-[7.4375rem] w-[7.4375rem] rounded-full lg:top-[4.375rem] lg:left-[4.375rem] lg:h-[12.9375rem] lg:w-[12.9375rem] z-[4]">
              <div className="flex h-full w-full items-center justify-center px-2">
                <div className="flex flex-col items-center justify-center text-center">
                  {phase === "idle" && (
                    <span className="font-sans font-medium lg:text-[1.35rem] text-[0.85rem] text-[#a4e57e] transition-all duration-300 uppercase leading-snug tracking-wide"> 
                      получить сигнал
                    </span>
                  )}
                  
                  {phase === "analyzing" && (
                    <div className="flex items-center justify-center w-full">
                      <span className="relative font-sans font-medium lg:text-[1.35rem] text-[0.85rem] text-[#a4e57e] transition-all duration-300"> 
                        анализ
                        <span className="absolute left-full font-sans font-medium lg:text-[1.35rem] text-[0.85rem] text-[#a4e57e] text-left inline-block whitespace-nowrap tracking-widest">
                          {dotsString}
                        </span>
                      </span>
                    </div>
                  )}

                  {phase === "result" && (
                    <>
                      <span className="font-sans font-medium lg:text-base text-xs text-[#a4e57e] mb-1"> 
                        ставь на:
                      </span>
                      <span className="font-sans font-black lg:text-6xl text-4xl text-[#a4e57e] mb-1 lg:mb-2 leading-none"> 
                        {formattedHint}
                      </span>
                      <span className="font-sans lg:text-[0.65rem] text-[0.45rem] text-[#6b6b6b] leading-tight mt-1"> 
                        нажми, чтобы получить<br/>новый сигнал
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {showPercentages && (
              <>
                <span className="font-sans text-xxxs lg:text-xxs absolute top-[1.275rem] left-[6.275rem] text-[#a4e57e] lg:top-[2.375rem] lg:left-[10.125rem] z-[4]"> 100% </span>
                <span className="font-sans text-xxxs lg:text-xxs absolute top-[6.625rem] left-[1.175rem] text-[#ebd215] lg:top-[10.475rem] lg:left-[2.125rem] z-[4]"> 50% </span>
                <span className="font-sans text-xxxs lg:text-xxs absolute top-[6.625rem] left-[11.675rem] text-[#ebd215] lg:top-[10.475rem] lg:left-[18.375rem] z-[4]"> 50% </span>
                <span className="font-sans text-xxxs lg:text-xxs absolute top-[11.657rem] left-[6.5rem] text-[#df4125] lg:top-[18.625rem] lg:left-[10.5625rem] z-[4]"> 0% </span>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export function PredictPageClient() {
  return (
    <AdminGate>
      <PredictContent />
    </AdminGate>
  )
}
