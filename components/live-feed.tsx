"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

// ── Static skin data for the live feed ──────────────────────────────────────
const SKIN_ITEMS = [
  { id: 1,  name: "SERGEANT",      weapon: "StatTrak™ FAMAS",       img: "/assets/images/skins/skin-1.png",  rarity: "#4b69ff" },
  { id: 2,  name: "AERIAL",        weapon: "SG 553",                 img: "/assets/images/skins/skin-2.png",  rarity: "#4b69ff" },
  { id: 3,  name: "LUSH RUINS",    weapon: "SG 553",                 img: "/assets/images/skins/skin-3.png",  rarity: "#8847ff" },
  { id: 4,  name: "VOGUE",         weapon: "Glock-18",               img: "/assets/images/skins/skin-4.png",  rarity: "#d32ce6" },
  { id: 5,  name: "NIGHTMODE M...",weapon: "NIGHTMODE Music Kit...", img: "/assets/images/skins/skin-5.png",  rarity: "#4b69ff" },
  { id: 6,  name: "AXIA",          weapon: "Glock-18",               img: "/assets/images/skins/skin-6.png",  rarity: "#8847ff" },
  { id: 7,  name: "POLYSOUP",      weapon: "M4A4",                   img: "/assets/images/skins/skin-7.png",  rarity: "#4b69ff" },
  { id: 8,  name: "MIDNIGHT PALM", weapon: "CZ75-Auto",              img: "/assets/images/skins/skin-8.png",  rarity: "#4b69ff" },
  { id: 9,  name: "WASTELAND P...",weapon: "M4A1-S",                 img: "/assets/images/skins/skin-9.png",  rarity: "#8847ff" },
  { id: 10, name: "PHOENIX",       weapon: "Slingshot",              img: "/assets/images/skins/skin-10.png", rarity: "#d32ce6" },
  { id: 11, name: "CRIMSON WEB",   weapon: "Desert Eagle",           img: "/assets/images/skins/skin-11.png", rarity: "#eb4b4b" },
  { id: 12, name: "NAVY MURANO",   weapon: "AUG",                    img: "/assets/images/skins/skin-12.png", rarity: "#4b69ff" },
  { id: 13, name: "HIEROGLYPH",    weapon: "XM1014",                 img: "/assets/images/skins/skin-13.png", rarity: "#8847ff" },
  { id: 14, name: "COLD FUSION",   weapon: "Souvenir Galil AR",      img: "/assets/images/skins/skin-14.png", rarity: "#ffd700" },
  { id: 15, name: "TRIUMVIRATE",   weapon: "Five-SeveN",             img: "/assets/images/skins/skin-15.png", rarity: "#4b69ff" },
  { id: 16, name: "FLASHBACK",     weapon: "AWP",                    img: "/assets/images/skins/skin-16.png", rarity: "#eb4b4b" },
  { id: 17, name: "FOREST DDPAT",  weapon: "AK-47",                  img: "/assets/images/skins/skin-17.png", rarity: "#4b69ff" },
  { id: 18, name: "VULCAN",        weapon: "AK-47",                  img: "/assets/images/skins/skin-18.png", rarity: "#eb4b4b" },
  { id: 19, name: "SAND DUNE",     weapon: "AK-47",                  img: "/assets/images/skins/skin-19.png", rarity: "#4b69ff" },
  { id: 20, name: "NEON RIDER",    weapon: "M4A1-S",                 img: "/assets/images/skins/skin-20.png", rarity: "#d32ce6" },
]

const INTERVAL_MS = 300

export function LiveFeed({
  selectedId,
  onSelect,
  isMobile,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
  isMobile: boolean
}) {
  const [items, setItems] = useState(SKIN_ITEMS.slice(0, 8))
  const [entering, setEntering] = useState<number | null>(null)
  const counterRef = useRef(8)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const addNextItem = () => {
      const nextIdx = counterRef.current % SKIN_ITEMS.length
      const newItem = SKIN_ITEMS[nextIdx]
      counterRef.current++

      setEntering(newItem.id)
      setItems((prev) => [newItem, ...prev.slice(0, 11)])

      setTimeout(() => setEntering(null), 200)

      // Random interval: bursts, normal delays, or occasional pauses
      const rand = Math.random()
      let nextInterval = 0
      if (rand < 0.3) {
        // 30% chance of a quick burst drop
        nextInterval = Math.floor(Math.random() * 250) + 100 // 100-350ms
      } else if (rand < 0.9) {
        // 60% chance of normal delay
        nextInterval = Math.floor(Math.random() * 1200) + 600 // 600-1800ms
      } else {
        // 10% chance of a pause/stop
        nextInterval = Math.floor(Math.random() * 3000) + 2500 // 2500-5500ms
      }

      timeoutId = setTimeout(addNextItem, nextInterval)
    }

    timeoutId = setTimeout(addNextItem, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  /* ── Mobile: horizontal scroll ── */
  if (isMobile) {
    return (
      <div className="w-full bg-[#17181c] p-3 overflow-hidden">
        <style>{`
          @keyframes chevron-slide {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .chevron-bg { animation: chevron-slide 4s linear infinite; }
        `}</style>
        <div className="flex items-center gap-2 mb-2 text-[#f0c000] text-xs font-bold uppercase tracking-wider">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f0c000] animate-pulse" />
          Лучший дроп
        </div>
        <div className="flex w-full overflow-x-auto pb-1 custom-scroll snap-x items-center">
          {/* Pinned large card */}
          <div className="shrink-0 pr-1 pl-0 snap-start">
            <div className="relative h-[4.5rem] w-[10rem] overflow-hidden rounded-r-xl"
                 style={{ background: "linear-gradient(135deg, #7a6000 0%, #4a3a00 60%, #1e1800 100%)" }}>
              {/* Left colored bar (yellow for top item) */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] z-[3] bg-[#f0c000]" />
              
              {/* Chevron animation background */}
              <div className="absolute inset-0 z-0 opacity-15 flex justify-end pr-1">
                <div className="w-8 h-[200%] chevron-bg flex flex-col items-center">
                  <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-8 h-8 shrink-0 opacity-70" />
                  <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-8 h-8 shrink-0 opacity-70 -mt-2" />
                  <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-8 h-8 shrink-0 opacity-70 -mt-2" />
                  <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-8 h-8 shrink-0 opacity-70 -mt-2" />
                </div>
              </div>

              <div className="absolute left-2.5 bottom-0 top-0 z-[2] flex flex-col justify-center gap-[1px]">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-white leading-tight truncate max-w-[80px] drop-shadow">MARBLE FADE</div>
                <div className="text-[9px] font-medium text-white/40 truncate max-w-[80px]">★ Butterfly Knife</div>
              </div>
              <div className="absolute right-1 bottom-0 top-0 z-[2] flex items-center h-full w-[4.5rem]">
                <div className="relative w-full h-[75%]">
                  <Image src="/assets/images/game/butterfly.avif" alt="Marble Fade" fill className="object-contain drop-shadow-[0_0_12px_rgba(251,213,6,0.3)]" sizes="80px" />
                </div>
              </div>
            </div>
          </div>

          {items.map((skin) => (
            <SkinCard key={`${skin.id}-m`} skin={skin} isEntering={entering === skin.id} horizontal />
          ))}
        </div>
      </div>
    )
  }

  /* ── Desktop: vertical pinned list ── */
  return (
    <aside className="flex flex-col w-full bg-[#17181c] overflow-hidden py-1.5 pl-0 pr-1.5 space-y-1.5" style={{ height: "100%" }}>
      <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feed-enter {
          animation: slide-down 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
          animation: slide-down 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes chevron-slide {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .chevron-bg { animation: chevron-slide 4s linear infinite; }
      `}</style>
      
      {/* Pinned top card */}
      <div className="shrink-0 z-10 relative">
        <div
          className="relative w-full overflow-hidden rounded-r-xl group"
          style={{
            height: 72,
            background: "linear-gradient(160deg, #9a7600 0%, #4f3b00 50%, #1e1700 100%)",
          }}
        >
          {/* Left colored bar (yellow for top item) */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] z-[3] bg-[#f0c000]" />

          {/* Animated chevron background */}
          <div className="absolute inset-0 z-0 opacity-20 flex justify-end pr-2">
            <div className="w-16 h-[200%] chevron-bg flex flex-col items-center">
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60 -mt-3" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60 -mt-3" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60 -mt-3" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60 -mt-3" />
              <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-16 h-16 shrink-0 opacity-60 -mt-3" />
            </div>
          </div>

          <div className="absolute left-3 bottom-0 top-0 z-[2] flex flex-col justify-center gap-0.5">
            <div className="text-[11px] font-extrabold uppercase tracking-wide text-white leading-tight truncate max-w-[100px] drop-shadow">MARBLE FADE</div>
            <div className="text-[10px] font-medium text-white/40 truncate max-w-[100px]">★ Butterfly Knife</div>
          </div>
          <div className="absolute right-2 bottom-0 top-0 z-[2] flex items-center h-full w-[7.5rem]">
            <div className="relative w-full h-[80%]">
              <Image
                src="/assets/images/game/butterfly.avif"
                alt="Butterfly Knife | Marble Fade"
                fill
                className="object-contain drop-shadow-[0_0_12px_rgba(251,213,6,0.5)]"
                sizes="120px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable animated feed */}
      <div className="flex-1 overflow-hidden flex flex-col relative space-y-1.5">
        {items.map((skin) => (
          <SkinCard
            key={`${skin.id}-${skin.name}`}
            skin={skin}
            isEntering={entering === skin.id}
          />
        ))}
      </div>
    </aside>
  )
}

/* ── Single skin card ── */
function SkinCard({
  skin,
  isEntering,
  horizontal = false,
}: {
  skin: (typeof SKIN_ITEMS)[0]
  isEntering: boolean
  horizontal?: boolean
}) {
  return (
    <div
      className={`shrink-0 ${horizontal ? "h-[4.5rem] w-[10rem] pl-0 pr-1 snap-start" : "w-full"} ${isEntering && !horizontal ? "feed-enter" : ""}`}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-r-xl group cursor-pointer"
        style={{
          height: horizontal ? "100%" : 72,
          background: `linear-gradient(to right, ${skin.rarity}22 0%, #212226 60%)`,
        }}
      >
        {/* Left colored bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[4px] z-[3]" style={{ backgroundColor: skin.rarity }} />

        {/* Default Text */}
        <div className="absolute left-2.5 bottom-0 top-0 z-[2] flex flex-col justify-center gap-[1px] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <div className="text-[10px] font-extrabold uppercase tracking-wide text-white leading-tight truncate max-w-[80px]">
            {skin.name}
          </div>
          <div className="text-[9px] font-medium text-white/40 truncate max-w-[80px]">{skin.weapon}</div>
        </div>

        {/* Hover User Info */}
        <div className="absolute left-3 bottom-0 top-0 z-[2] flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <img src="/assets/images/game/unknown-item-2.svg" alt="User" className="w-6 h-6 rounded-full bg-[#1c1d21]" />
          <div className="text-[10px] font-medium text-white truncate max-w-[100px]">Player</div>
        </div>

        {/* Weapon image */}
        <div className="absolute right-1 bottom-0 top-0 z-[2] flex items-center justify-center transition-transform duration-300" style={{ width: 65, height: "100%" }}>
          {/* Hover background effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none">
            <img src="/assets/images/game/unknown-item-2.svg" alt="" className="w-[300%] h-[300%] max-w-none object-contain" />
          </div>

          <div className="relative w-full h-[80%] z-10 transition-transform duration-300 group-hover:scale-110">
            <Image
              src={skin.img}
              alt={skin.name}
              fill
              className="object-contain drop-shadow-md"
              sizes="80px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
