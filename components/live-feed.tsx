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
      setItems((prev) => {
        const arr = [...prev, newItem]
        if (arr.length > 12) return arr.slice(arr.length - 12)
        return arr
      })

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
        <div className="flex items-center mb-2 text-[#f0c000] text-[10px] font-medium tracking-wider">
          Лучший дроп
        </div>
        <div className="flex w-full overflow-x-auto pb-1 custom-scroll snap-x items-center">
          <BestDropCard horizontal />

          {items.map((skin) => (
            <SkinCard key={`${skin.id}-m`} skin={skin} isEntering={entering === skin.id} horizontal />
          ))}
        </div>
      </div>
    )
  }

  /* ── Desktop: vertical pinned list ── */
  return (
    <aside className="flex flex-col w-[12.5rem] h-full py-1.5 pl-1.5 space-y-1.5 rounded-r-lg lg:top-[4.6rem]" style={{ height: "100%" }}>
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feed-enter {
          animation: slide-up 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes chevron-slide {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .chevron-bg { animation: chevron-slide 4s linear infinite; }
        .invisible-scroll::-webkit-scrollbar {
          display: none;
        }
        .invisible-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="relative bg-[#1c1d21] w-full flex-col overflow-hidden rounded-r-lg py-1.5">
        <BestDropCard />
      </div>

      {/* Scrollable animated feed */}
      <div className="invisible-scroll flex bg-[#1c1d21] flex-col space-y-0.5 overflow-y-auto rounded-r-lg py-1.5 pr-1.5 h-[calc(100vh-10.75rem)]">
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
      className={`shrink-0 ${horizontal ? "h-[3.75rem] w-[7.5rem] snap-start pr-1" : "h-[5rem] w-[11.75rem]"} ${isEntering && !horizontal ? "feed-enter" : ""}`}
    >
      <button 
        className={`group bg-card relative flex h-[100%] w-full items-end overflow-hidden ${horizontal ? "rounded-lg p-1" : "rounded-r-lg p-2"}`}
        style={horizontal ? { border: `1px solid ${skin.rarity}` } : undefined}
      >
        {horizontal ? (
          <div className="pointer-events-none absolute inset-0 z-[4] flex items-end justify-between p-1 select-none">
            <img className="h-4 w-4 rounded-full object-cover border-[1px] border-[#FFFFFF1A]" src="/assets/images/game/unknown-item-2.svg" alt="Аватар пользователя" />
            <div className="flex items-center space-x-0.5 rounded-[0.25rem] bg-black/60 px-1 py-[0.125rem]">
              <img alt="up-arrow-up" className="h-[0.45rem] w-[0.45rem]" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
              <span className="font-exo text-[0.45rem] font-bold text-white leading-none">{(Math.random() * 100).toFixed(2)}%</span>
            </div>
          </div>
        ) : (
          <div className="pointer-events-none relative z-[2] flex h-full w-full flex-col items-start justify-start space-x-0.5 select-none">
            <div className="absolute -top-1 -left-1.5 flex items-center justify-start space-x-1 rounded-r-lg bg-black/40 px-1.5 py-0.5">
              <img alt="up-arrow-up" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
              <span className="font-exo text-xxxs font-normal text-white">
                {(Math.random() * 100).toFixed(2)}%
              </span>
            </div>
            
            <div className="absolute bottom-0 left-0 flex flex-col items-start justify-start space-x-0.5 text-left transition-all duration-700 group-hover:translate-y-[-100%] group-hover:opacity-0">
              <span className="font-tektur text-xxs max-w-[4.875rem] truncate font-bold uppercase text-white">
                {skin.name}
              </span>
              <span className="text-[#FFFFFF80] font-exo text-xxxs max-w-[5.8125rem] truncate font-semibold">
                {skin.weapon}
              </span>
            </div>
            
            <div className="absolute bottom-0 left-0 flex translate-y-[50%] flex-col items-start justify-start space-y-1 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <img className="h-6 w-6 cursor-pointer rounded-full object-cover" src="/assets/images/game/unknown-item-2.svg" alt="Аватар пользователя" />
              <span className="font-exo text-xxs max-w-[11rem] truncate font-normal text-white">
                Player
              </span>
            </div>
          </div>
        )}
        
        <img alt="drop-item" className={`absolute top-1/2 z-[2] h-full object-contain -translate-y-1/2 ${horizontal ? "left-1/2 -translate-x-1/2 max-w-[80%] max-h-[80%]" : "right-0 max-h-[5.6875rem] w-full max-w-[5.8125rem]"}`} src={skin.img} />
        
        {!horizontal && (
          <div className="absolute top-0 left-0 h-full w-0.5" style={{ background: skin.rarity }}></div>
        )}
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none" style={{ background: horizontal ? `linear-gradient(180deg, rgba(35, 35, 37, 0) 0%, ${skin.rarity}26 100%)` : `linear-gradient(270deg, rgba(35, 35, 37, 0.2) 25.06%, ${skin.rarity}4d 100%)` }}></div>
        {!horizontal && (
          <img alt="" className="absolute top-1/2 -right-1.5 h-[6.6875rem] w-[4.125rem] -translate-y-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100" src="https://s3.upgrader.pro/cdn/fa/images/upgrader-arrow-up.svg" />
        )}
      </button>
    </div>
  )
}

/* ── Best drop card ── */
function BestDropCard({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <div className={`shrink-0 z-10 relative ${horizontal ? "h-[3.75rem] w-[8.25rem] snap-start pr-1 pl-0" : "h-[5rem] w-[11.75rem]"}`}>
      <button className={`group bg-card relative flex h-full w-full items-end overflow-hidden rounded-lg ${horizontal ? "border-[1px] border-[#f0c000]" : "p-2"}`}>
        {horizontal ? (
          <div className="pointer-events-none absolute inset-0 z-[4] flex items-end justify-between p-1 select-none">
            <img className="h-4 w-4 rounded-full object-cover border-[1px] border-[#FFFFFF1A]" src="/assets/images/game/unknown-item-2.svg" alt="Аватар пользователя" />
            <div className="flex items-center space-x-0.5 rounded-[0.25rem] bg-[#f0c000]/20 px-1 py-[0.125rem]">
              <img alt="up-arrow-up" className="h-[0.45rem] w-[0.45rem]" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
              <span className="font-exo text-[0.45rem] font-bold text-[#f0c000] leading-none">79.07%</span>
            </div>
          </div>
        ) : (
          <div className="pointer-events-none relative z-[2] flex h-full w-full flex-col items-start justify-start space-x-0.5 select-none">
            <div className="absolute -top-1 -left-2 flex items-center justify-start space-x-1 rounded-r-lg bg-black/40 px-1.5 py-0.5">
              <img alt="up-arrow-up" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
              <span className="font-exo text-xxxs font-normal text-white">79.07%</span>
            </div>
            
            <div className="absolute bottom-0 left-0 flex flex-col items-start justify-start space-x-0.5 text-left transition-all duration-700 group-hover:translate-y-[-100%] group-hover:opacity-0">
              <span className="font-tektur text-xxs max-w-[4.875rem] truncate font-bold uppercase text-white">Slaughter</span>
              <span className="font-exo text-xxxs max-w-[5.8125rem] truncate font-semibold text-[#FFFFFF80]">★ StatTrak™ Butterfly Knife</span>
            </div>
            
            <div className="absolute bottom-0 left-0 flex translate-y-[50%] flex-col items-start justify-start space-y-1 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
              <img className="h-6 w-6 cursor-pointer rounded-full object-cover" src="/assets/images/game/unknown-item-2.svg" alt="Аватар пользователя" />
              <span className="font-tektur text-xxs max-w-[11rem] truncate font-bold text-white uppercase">Player</span>
            </div>
          </div>
        )}
        
        {!horizontal && (
          <div className="absolute top-2 right-2 z-[3] flex translate-y-[-50%] items-center justify-center space-x-0.5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[0.625rem] leading-none font-semibold text-white">128099.22</span>
            <img alt="" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
          </div>
        )}
        
        <img alt="drop-item" className={`absolute top-1/2 z-[2] h-full object-contain -translate-y-1/2 ${horizontal ? "left-1/2 -translate-x-1/2 max-w-[80%] max-h-[80%]" : "right-0 max-h-[5.6875rem] w-full max-w-[5.8125rem]"}`} src="/assets/images/game/butterfly.avif" />
        
        <div 
          className="absolute top-0 left-0 w-full h-full z-[0] pointer-events-none"
          style={{
            background: 'radial-gradient(198px 93.5px at 126px 105.5px, #FBD506 0%, rgba(251,213,6,0.1) 100%)',
            filter: 'blur(15px)',
            opacity: 0.8
          }}
        />

        <div className="absolute top-0 -right-2 h-full w-16 overflow-hidden z-[1] transition-opacity duration-500 opacity-60 group-hover:opacity-100 pointer-events-none mask-image-gradient">
          <div className="w-full h-[200%] flex flex-col items-center justify-around chevron-bg">
            {[...Array(6)].map((_, i) => (
              <img key={i} src="https://s3.upgrader.pro/cdn/fa/images/upgrader-arrow-up.svg" alt="" className="w-[4.125rem] h-auto shrink-0 mb-4" />
            ))}
          </div>
        </div>
      </button>
      <style>{`
        .mask-image-gradient {
          mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
        }
      `}</style>
    </div>
  )
}
