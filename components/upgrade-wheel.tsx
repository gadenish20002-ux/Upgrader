"use client"

import { forwardRef, useImperativeHandle, useRef, useState } from "react"

export interface UpgradeWheelHandle {
  spin: (win: boolean) => Promise<boolean>
}

interface UpgradeWheelProps {
  chance: number
  hasSelection: boolean
}

export const UpgradeWheel = forwardRef<UpgradeWheelHandle, UpgradeWheelProps>(function UpgradeWheel(
  { chance, hasSelection },
  ref,
) {
  // rotation=0 → pointer at BOTTOM (6 o'clock) pointing UP — default idle state
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<"none" | "win" | "lose">("none")
  const rotationRef = useRef(0)

  const segAngle = Math.min(0.999, Math.max(0.0001, chance)) * 360

  useImperativeHandle(ref, () => ({
    spin: (win: boolean) =>
      new Promise<boolean>((resolve) => {
        setSpinning(true)
        setResult("none")

        // Arc starts 90° clockwise from BOTTOM (at LEFT/9 o'clock position)
        // and covers segAngle° clockwise through BOTTOM to RIGHT.
        // WIN zone in pointer-rotation: [90°, 90° + segAngle]
        // LOSE zone: [90° + segAngle, 90° + 360°]
        const ARC_OFFSET = 90
        const winStart = ARC_OFFSET
        const winEnd = ARC_OFFSET + segAngle

        const pos = win
          ? winStart + Math.random() * Math.max(segAngle - 2, 0.5) + 1
          : winEnd + Math.random() * Math.max(360 - segAngle - 2, 0.5) + 1

        const spins = 6
        const current = rotationRef.current

        // targetMod: where we want to land (clockwise from BOTTOM = 0)
        const targetMod = pos % 360
        const currentMod = ((current % 360) + 360) % 360
        let delta = targetMod - currentMod
        if (delta < 0) delta += 360
        const next = current + spins * 360 + delta

        rotationRef.current = next
        setRotation(next)

        window.setTimeout(() => {
          setSpinning(false)
          setResult(win ? "win" : "lose")
          resolve(win)
        }, 4200)
      }),
  }))

  const arcStroke =
    result === "win"
      ? "#6ae58d"
      : result === "lose"
      ? "#ff6b6b"
      : "url(#progress-gradient)"

  return (
    <div className="relative flex items-center justify-center w-[22rem] h-[22rem]">
      {/* Слой 1 (Фон с засечками) */}
      <img
        src="/assets/images/game/upgrade-circle-bg.svg"
        alt="Background"
        className="absolute z-0 w-[324px] h-[324px] object-cover"
      />

      {/* Слой 2 и 3: Фоновое кольцо трека и Цветное кольцо прогресса */}
      <svg viewBox="0 0 289 289" className="absolute z-10 w-full h-full">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBD506" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>

        {/* Слой 2 (Фоновое кольцо трека) */}
        <circle
          cx="144.5"
          cy="144.5"
          r="124"
          fill="none"
          stroke="#202021"
          strokeWidth="42"
        />

        {/* Слой 3 (Цветное кольцо прогресса) */}
        <circle
          cx="144.5"
          cy="144.5"
          r="124"
          fill="none"
          stroke={arcStroke}
          strokeWidth="42"
          strokeDasharray="779"
          strokeDashoffset={779 - 779 * Math.max(0.0001, chance)}
          strokeLinecap="butt"
          transform="rotate(180 144.5 144.5)"
          style={{ transition: "stroke-dashoffset 0.3s, stroke 0.3s" }}
        />
      </svg>

      {/* Слой 4 (Указатель) */}
      <div
        className="absolute inset-0 z-20"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.8, 0.12, 1)" : "none",
        }}
      >
        <img
          src="/assets/images/game/pointer.png"
          alt="Pointer"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-8 h-12 rotate-180"
        />
      </div>

      {/* Слой 5 (Черный центр и стрелки) */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <img
          src="/assets/images/game/circle-black.svg"
          alt="Center Background"
          className="absolute w-[348px] h-[348px] z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <img
            src="/assets/images/header/logo.svg"
            alt="Upgrader"
            className="w-[136px] h-[136px]"
          />
          {hasSelection && (
            <div className="mt-1 text-2xl font-extrabold tabular-nums text-white drop-shadow-lg lg:text-3xl">
              {(chance * 100).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
