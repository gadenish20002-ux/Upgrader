"use client"

import { useEffect, useState, useRef } from "react"
import { useStore } from "@/lib/store"
import { RARITY_COLORS } from "@/lib/default-data"

// ─── Layout constants ──────────────────────────────────────────────────────
const CELL = 150   // card width & height, px (scaled up 1.5x from 100)
const GAP  = 12    // gap between cards, px (scaled up 1.5x from 8)
const STEP = CELL + GAP  // = 162px per card slot

// We show 7 cards. Index 3 = center.
const VISIBLE = 7
const CENTER  = 3  // index of the center card in the rendered list

// Silhouette assets — gray weapon outlines (alternating)
const SILHOUETTES = [
  "/assets/images/game/silhouette-pistol.png",
  "/assets/images/game/silhouette-rifle.png",
]

// ─── Types ─────────────────────────────────────────────────────────────────
type SkinItem = { id: string; name: string; weapon: string; image: string; rarity: string }
type Phase = "idle" | "sliding" | "focused" | "vert-start" | "vert-end" | "showing"

export function LiveDropAnimation() {
  const { state } = useStore()
  const allSkins: SkinItem[] = state.skins

  // ─── Strip state ──────────────────────────────────────────────────────────
  const pool = useRef<SkinItem[]>([])
  const startIdx = useRef(0)
  const [cards, setCards] = useState<SkinItem[]>([])
  const [phase, setPhase] = useState<Phase>("idle")
  const [vertStack, setVertStack] = useState<SkinItem[]>([])

  const alive = useRef(true)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // ─── Build pool ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!allSkins.length) return
    const P: SkinItem[] = []
    for (let i = 0; i < 80; i++) P.push(allSkins[i % allSkins.length])
    pool.current = P
    startIdx.current = 0
    setCards(getSlice(P, 0))
    setPhase("idle")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSkins.length])

  function getSlice(p: SkinItem[], si: number): SkinItem[] {
    return Array.from({ length: VISIBLE + 1 }, (_, i) => p[(si + i) % p.length])
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function wait(ms: number) {
    return new Promise<void>(res => {
      const id = setTimeout(() => { if (alive.current) res() }, ms)
      timers.current.push(id)
    })
  }

  function pickPremium(): SkinItem {
    const premium = allSkins.filter(s => s.rarity === "ancient" || s.rarity === "legendary")
    const src = premium.length ? premium : allSkins
    return src[Math.floor(Math.random() * src.length)]
  }

  function randomSkin(): SkinItem {
    return allSkins[Math.floor(Math.random() * allSkins.length)]
  }

  // ─── Animation loop ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!cards.length) return
    alive.current = true

    async function loop() {
      while (alive.current) {
        // 1. Slide left by one slot
        setPhase("sliding")
        await wait(850)
        if (!alive.current) return

        // Advance startIdx & refresh cards, snap translateX back to 0
        startIdx.current = (startIdx.current + 1) % pool.current.length
        setCards(getSlice(pool.current, startIdx.current))
        setPhase("idle")
        await wait(16)
        if (!alive.current) return

        // 2. Focus center card (show real image)
        setPhase("focused")
        await wait(700)
        if (!alive.current) return

        // 3. Vertical slot
        const stack: SkinItem[] = [
          randomSkin(), randomSkin(), randomSkin(), pickPremium(),
        ]
        setVertStack(stack)
        setPhase("vert-start")
        await wait(40)
        if (!alive.current) return

        setPhase("vert-end")
        await wait(1400) // match CSS transition duration
        if (!alive.current) return

        // 4. Show premium
        setPhase("showing")
        await wait(2000)
        if (!alive.current) return

        // 5. Reset
        setPhase("idle")
        setVertStack([])
        await wait(300)
      }
    }

    const id = setTimeout(loop, 400)
    timers.current.push(id)
    return () => {
      alive.current = false
      timers.current.forEach(clearTimeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length])

  if (!cards.length) return null

  // ─── Derived values ───────────────────────────────────────────────────────
  const isSliding = phase === "sliding"
  const isFocused = phase === "focused" || phase === "vert-start" || phase === "vert-end" || phase === "showing"
  const showVert  = phase === "vert-start" || phase === "vert-end" || phase === "showing"
  const vertAtEnd = phase === "vert-end" || phase === "showing"

  const VERT_CELL_H = CELL
  const vertY = vertAtEnd ? -((vertStack.length - 1) * VERT_CELL_H) : 0

  return (
    <>
      <style>{`
        @keyframes arrowPulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          80% { transform: translate(-50%, -50%) scale(1); }
          90% { transform: translate(-50%, -50%) scale(1.6); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "100%",
        height: CELL + 36, // Adjust container height for 1.5x scale (150px cell + extra space for 1.16x zoom)
        marginTop: 20,
        overflow: "hidden",
      }}
    >
      {/* Left fade */}
      <div style={{
        position: "absolute", inset: "0 auto 0 0",
        width: STEP + CELL * 0.4,
        background: "linear-gradient(to right, #16171a 35%, transparent 100%)",
        zIndex: 20, pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", inset: "0 0 0 auto",
        width: STEP + CELL * 0.4,
        background: "linear-gradient(to left, #16171a 35%, transparent 100%)",
        zIndex: 20, pointerEvents: "none",
      }} />

      {/* Horizontal strip */}
      <div
        style={{
          display: "flex",
          gap: GAP,
          position: "absolute",
          top: 18, // Adjusted top position to vertically center scaled cards
          left: "50%",
          // Keep center card (index CENTER) exactly at 50% of parent
          // center-card center from strip-left = CENTER * STEP + CELL/2
          transform: isSliding
            ? `translateX(-${CENTER * STEP + CELL / 2 + STEP}px)`
            : `translateX(-${CENTER * STEP + CELL / 2}px)`,
          transition: isSliding
            ? "transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "none",
          willChange: "transform",
        }}
      >
        {cards.map((skin, i) => {
          const isCenter = i === CENTER
          const rc = RARITY_COLORS[skin.rarity] || "#5e98d9"
          const scaled = isCenter && isFocused

          // Show real skin image ONLY when center card is focused AND not in vertical phase
          const showRealImage = isCenter && isFocused && !showVert
          // Silhouette for this slot (alternating)
          const silSrc = SILHOUETTES[i % SILHOUETTES.length]

          return (
            <div
              key={i}
              style={{
                width: CELL,
                height: CELL,
                flexShrink: 0,
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#222328",
                border: "1.5px solid rgba(255,255,255,0.18)",
                boxShadow: "none",
                opacity: isCenter ? 1 : 0.85,
                transform: scaled ? "scale(1.16)" : "scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease",
                zIndex: isCenter ? 5 : 1,
              }}
            >
              {/* Rarity top stripe */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 2, background: rc, zIndex: 2,
              }} />

              {/* Background Light and Arrow for center card */}
              {isCenter && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/images/game/unknown-item-shadow.webp"
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: isFocused ? 0.7 : 0,
                      transition: 'opacity 0.6s ease',
                      zIndex: 0
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/assets/icons/logo-black.svg"
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '60px',
                      height: '60px',
                      transform: 'translate(-50%, -50%)',
                      opacity: isFocused ? 0.6 : 0,
                      transition: 'opacity 0.6s ease 0.3s',
                      filter: 'invert(1) opacity(0.25)',
                      zIndex: 0,
                      animation: phase === 'vert-end' ? 'arrowPulse 1.4s ease-in-out forwards' : 'none'
                    }}
                  />
                </>
              )}

              {/* Vertical slot machine — only for center card */}
              {isCenter && showVert && vertStack.length > 0 && (
                <div style={{
                  position: "absolute", inset: 0,
                  overflow: "hidden",
                  borderRadius: 12,
                }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      transform: `translateY(${vertY}px)`,
                      transition: phase === "vert-end" || phase === "showing"
                        ? "transform 1.4s cubic-bezier(0.15, 0.85, 0.3, 1)"
                        : "none",
                    }}
                  >
                    {vertStack.map((vs, vi) => {
                      const isLast = vi === vertStack.length - 1
                      const vc = RARITY_COLORS[vs.rarity] || "#5e98d9"
                      const vertSil = SILHOUETTES[vi % SILHOUETTES.length]
                      return (
                        <div
                          key={vi}
                          style={{
                            width: CELL,
                            height: VERT_CELL_H,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isLast ? `${vc}28` : "transparent",
                            position: "relative",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={isLast ? vs.image : vertSil}
                            alt={vs.name}
                            style={{
                              width: "82%",
                              height: "82%",
                              objectFit: "contain",
                              display: "block",
                              filter: isLast
                                ? "drop-shadow(0 4px 14px rgba(0,0,0,0.8))"
                                : "brightness(0) invert(0.65)",
                              opacity: 1,
                            }}
                          />
                          {isLast && (
                            <div style={{
                              position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
                              zIndex: 10, fontSize: 11, fontWeight: 'bold', color: '#fff',
                              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                              opacity: phase === 'showing' ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                              padding: '0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                              {vs.name}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Normal card image: real skin when focused-center, silhouette otherwise */}
              {!(isCenter && showVert) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={showRealImage ? skin.image : silSrc}
                  alt={skin.name}
                  style={{
                    width: "85%",
                    height: "85%",
                    objectFit: "contain",
                    display: "block",
                    filter: showRealImage
                      ? "drop-shadow(0 3px 12px rgba(0,0,0,0.8))"
                      : "brightness(0) invert(0.65)",
                    opacity: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              )}

              {!(isCenter && showVert) && showRealImage && (
                <div style={{
                  position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center',
                  zIndex: 10, fontSize: 11, fontWeight: 'bold', color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  padding: '0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {skin.name}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}
