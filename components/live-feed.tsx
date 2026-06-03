"use client"

import { useEffect, useRef, useState } from "react"
import Lottie from "lottie-react"
import arrowAnimIdle from "@/public/assets/lottie/arrow-anim-hover.json"

// ── Skin data with real Steam CDN images ─────────────────────────────────────
// Images sourced from community.akamai.steamstatic.com / s3.upgrader.pro
const SKIN_ITEMS = [
  {
    id: 1,
    name: "Sand Dune",
    weapon: "P250",
    img: "https://s3.upgrader.pro/cdn/items/832/medium.png",
    rarity: "rgb(176, 195, 217)",
    chance: "36.22%",
    playerName: "Na1za_riO",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/111a61a368ac8d1752a1704d9b3d7221-6a203de0878a2.jpg",
  },
  {
    id: 2,
    name: "Recoil XM1014",
    weapon: "Sealed Graffiti",
    img: "https://s3.upgrader.pro/cdn/items/23405/medium.png",
    rarity: "rgb(176, 195, 217)",
    chance: "8.15%",
    playerName: "whease",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/6c28f8a2a2870e947c829656eb79e6fb-69c281cab2163.jpg",
  },
  {
    id: 3,
    name: "Magmatude",
    weapon: "Charm",
    img: "https://s3.upgrader.pro/cdn/items/15207/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "74.99%",
    playerName: "Vazik.prime",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/b64124e79bf3d94b9a0a1853d4cae73c-69a831ef25f63.jpg",
  },
  {
    id: 4,
    name: "Gold Toof",
    weapon: "Glock-18",
    img: "https://s3.upgrader.pro/cdn/items/14117/medium.png",
    rarity: "rgb(235, 75, 75)",
    chance: "57.33%",
    playerName: "Hom1k",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/7bc10ef69452e5ba264a2dfa5780924d-6a057ac19657e.jpg",
  },
  {
    id: 5,
    name: "Moonrise",
    weapon: "Glock-18",
    img: "https://s3.upgrader.pro/cdn/items/8948/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "78.92%",
    playerName: "Litschi-ω-",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/d90b485d7b7fe71e5f1fa4a4239125ec-69fcc52662686.jpg",
  },
  {
    id: 6,
    name: "Kiss♥Love",
    weapon: "Sawed-Off",
    img: "https://s3.upgrader.pro/cdn/items/2219/medium.png",
    rarity: "rgb(211, 44, 230)",
    chance: "53.82%",
    playerName: "The Celestial </3",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/89eef987360768bb05b5847a69eb55c0-6a1cf95432244.jpg",
  },
  {
    id: 7,
    name: "Tropical Storm",
    weapon: "Souvenir SSG 08",
    img: "https://s3.upgrader.pro/cdn/items/16329/medium.png",
    rarity: "rgb(94, 152, 217)",
    chance: "78.20%",
    playerName: "ultraseks",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/4851c22247e82a21f2b24298f7e328e3-6a1e89666c464.jpg",
  },
  {
    id: 8,
    name: "Faulty Wiring",
    weapon: "FAMAS",
    img: "https://s3.upgrader.pro/cdn/items/12328/medium.png",
    rarity: "rgb(176, 195, 217)",
    chance: "36.67%",
    playerName: "бурмалда",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/76baee4d478451e448c1c4539795e2b7-691ea69645cfe.jpg",
  },
  {
    id: 9,
    name: "Liquidation",
    weapon: "M4A1-S",
    img: "https://s3.upgrader.pro/cdn/items/3005/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "53.68%",
    playerName: "Glebik_pro777",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/d954aa007022653c7b57f253efe1a57f-6a203f839d8c0.jpg",
  },
  {
    id: 10,
    name: "Half Sleeve",
    weapon: "FAMAS",
    img: "https://s3.upgrader.pro/cdn/items/1039/medium.png",
    rarity: "rgb(94, 152, 217)",
    chance: "35.55%",
    playerName: "milfanyaa",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/28e36b4e5262199addb55fa24872b30a-69885605952da.jpg",
  },
  {
    id: 11,
    name: "USTILO (Foil)",
    weapon: "Sticker",
    img: "https://s3.upgrader.pro/cdn/items/20945/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "14.24%",
    playerName: "nastya.dust2.раза",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/73eace0c93a8d70c04f89dccc14e2933-69f7db041f991.jpg",
  },
  {
    id: 12,
    name: "Ace Devil",
    weapon: "Sticker",
    img: "https://s3.upgrader.pro/cdn/items/12135/medium.png",
    rarity: "rgb(211, 44, 230)",
    chance: "36.98%",
    playerName: "LA",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/a2df8fe62f75d7f49cd3d640426ce67d-6973d3634769c.jpg",
  },
  {
    id: 13,
    name: "Autumn Twilly",
    weapon: "MP5-SD",
    img: "https://s3.upgrader.pro/cdn/items/12351/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "36.69%",
    playerName: "SVINKA PEPE",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/f170056c4b2d42899b4971bbb72cd473-6995d8a133414.jpg",
  },
  {
    id: 14,
    name: "Skadoodle",
    weapon: "Sticker",
    img: "https://s3.upgrader.pro/cdn/items/17644/medium.png",
    rarity: "rgb(75, 105, 255)",
    chance: "13.47%",
    playerName: "filayka +WW",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/048c31f8af5e9f5d46e26951c93fa748-69b2e29b17842.jpg",
  },
  {
    id: 15,
    name: "Chopper",
    weapon: "P90",
    img: "https://s3.upgrader.pro/cdn/items/7448/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "37.00%",
    playerName: "gorilla_7777_",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/39c129ec9495a43da6a6b32d1de48c8c-69178220ae8d7.jpg",
  },
  {
    id: 16,
    name: "Wild Child",
    weapon: "UMP-45",
    img: "https://s3.upgrader.pro/cdn/items/13631/medium.png",
    rarity: "rgb(211, 44, 230)",
    chance: "78.77%",
    playerName: "Dabs",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/ef3b5f28e037b86d96d1ff11657b4876-6a033cb00ffd0.jpg",
  },
  {
    id: 17,
    name: "Falcons (Foil) | Austin 2025",
    weapon: "Sticker Slab",
    img: "https://s3.upgrader.pro/cdn/items/26372/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "35.01%",
    playerName: "𝘦𝘤𝘴𝘵𝘢𝘴𝘺",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/1c96a4352f9accbf6d8c426bde4f2d7b-6999c43338114.jpg",
  },
  {
    id: 18,
    name: "Weasel",
    weapon: "Glock-18",
    img: "https://s3.upgrader.pro/cdn/items/1728/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "54.53%",
    playerName: "Kres",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/36735caf84bc54511acf15ff258d2deb-6a05f447de23f.jpg",
  },
  {
    id: 19,
    name: "Slate",
    weapon: "AK-47",
    img: "https://s3.upgrader.pro/cdn/items/2279/medium.png",
    rarity: "rgb(136, 71, 255)",
    chance: "28.45%",
    playerName: "MUERTE™",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/cd83c96911d094dd5335f0911fb32de9-69cd026d3cd08.jpg",
  },
  {
    id: 20,
    name: "Red Stone",
    weapon: "SSG 08",
    img: "https://s3.upgrader.pro/cdn/items/10886/medium.png",
    rarity: "rgb(176, 195, 217)",
    chance: "21.50%",
    playerName: "Bedoch",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/3c2467a8ca6af3f12792e19bbf9b56fc-69be4acc58317.jpg",
  },
]


// Unique key counter to force re-animation on every newly prepended item
let uidCounter = SKIN_ITEMS.length

type SkinEntry = (typeof SKIN_ITEMS)[0] & { uid: number }

export function LiveFeed({
  selectedId,
  onSelect,
  isMobile,
}: {
  selectedId: string | null
  onSelect: (id: string) => void
  isMobile: boolean
}) {
  const [items, setItems] = useState<SkinEntry[]>(() =>
    SKIN_ITEMS.slice(0, 12).map((s, i) => ({ ...s, uid: i }))
  )
  const counterRef = useRef(12)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const addNextItem = () => {
      const nextIdx = counterRef.current % SKIN_ITEMS.length
      const base = SKIN_ITEMS[nextIdx]
      counterRef.current++
      uidCounter++

      const newEntry: SkinEntry = { ...base, uid: uidCounter }

      setItems((prev) => {
        const arr = [newEntry, ...prev]
        if (arr.length > 20) return arr.slice(0, 20)
        return arr
      })

      const rand = Math.random()
      let nextInterval = 0
      if (rand < 0.3) {
        nextInterval = Math.floor(Math.random() * 250) + 100
      } else if (rand < 0.9) {
        nextInterval = Math.floor(Math.random() * 1200) + 600
      } else {
        nextInterval = Math.floor(Math.random() * 3000) + 2500
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
        <div className="flex items-center mb-2 text-[#f0c000] text-[10px] font-medium tracking-wider">
          Лучший дроп
        </div>
        <div className="flex w-full overflow-x-auto pb-1 custom-scroll snap-x items-center">
          <BestDropCard horizontal />
          {items.map((skin) => (
            <SkinCard key={`m-${skin.uid}`} skin={skin} isNew={false} horizontal />
          ))}
        </div>
      </div>
    )
  }

  /* ── Desktop: vertical pinned list ── */
  return (
    <aside
      className="flex flex-col w-[12.5rem] h-[calc(100vh-4.75rem)] py-1.5 pl-1.5 space-y-1.5 rounded-r-lg sticky top-[4.75rem]"
    >
      {/* Best Drop card — fixed at the top */}
      <div className="relative bg-[#1c1d21] w-full flex-col overflow-hidden rounded-r-lg py-1.5 shrink-0">
        <BestDropCard />
      </div>

      {/* Scrollable live feed — новые элементы появляются сверху */}
      <div className="invisible-scroll flex-1 flex bg-block flex-col space-y-0.5 overflow-y-auto rounded-r-lg !py-1.5 pr-1.5">
        {items.map((skin, idx) => (
          <div key={skin.uid} className="animate-slide-in-top">
            <SkinCard skin={skin} isNew={idx === 0} horizontal={false} />
          </div>
        ))}
      </div>
    </aside>
  )
}

/* ── Single skin card ── */
function SkinCard({
  skin,
  isNew,
  horizontal = false,
}: {
  skin: SkinEntry
  isNew: boolean
  horizontal?: boolean
}) {
  return (
    <button
      className={`group bg-card relative flex overflow-hidden
        ${horizontal
          ? "shrink-0 h-[3.75rem] w-[7.5rem] snap-start mr-1 rounded-lg p-1 items-end"
          : "h-[5rem] w-[11.75rem] items-end rounded-r-lg p-2"
        } ${isNew && horizontal ? "animate-slide-in-left" : ""}`}
      style={horizontal ? { border: `1px solid ${skin.rarity}` } : undefined}
    >
      {horizontal ? (
        <div className="pointer-events-none absolute inset-0 z-[4] flex items-end justify-between p-1 select-none">
          <img
            className="h-4 w-4 rounded-full object-cover border-[1px] border-[#FFFFFF1A]"
            src={skin.playerAvatar}
            alt="Аватар пользователя"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp' }}
          />
          <div className="flex items-center space-x-0.5 rounded-[0.25rem] bg-black/60 px-1 py-[0.125rem]">
            <img alt="up-arrow-up" className="h-[0.45rem] w-[0.45rem]" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
            <span className="font-exo text-[0.45rem] font-bold text-white leading-none">{skin.chance}</span>
          </div>
        </div>
      ) : (
        <div className="pointer-events-none relative z-[2] flex h-full w-full flex-col items-start justify-start space-x-0.5 select-none">
          {/* Chance badge — top-left */}
          <div className="absolute -top-1 -left-1.5 flex items-center justify-start space-x-1 rounded-r-lg bg-black/40 px-1.5 py-0.5">
            <img alt="up-arrow-up" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
            <span className="font-exo text-xxxs font-normal text-white">{skin.chance}</span>
          </div>

          {/* Default state: item name + weapon (slides up on hover) */}
          <div className="absolute bottom-0 left-0 flex flex-col items-start justify-start space-x-0.5 text-left transition-all duration-700 group-hover:translate-y-[-100%] group-hover:opacity-0">
            <span className="font-tektur text-xxs max-w-[4.875rem] truncate font-bold uppercase text-white">
              {skin.name}
            </span>
            <span className="text-[#FFFFFF80] font-exo text-xxxs max-w-[5.8125rem] truncate font-semibold">
              {skin.weapon}
            </span>
          </div>

          {/* Hover state: player avatar + name (slides up from below) */}
          <div className="absolute bottom-0 left-0 flex translate-y-[50%] flex-col items-start justify-start space-y-1 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <img
              className="h-6 w-6 cursor-pointer rounded-full object-cover"
              src={skin.playerAvatar}
              alt="Аватар пользователя"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp' }}
            />
            <span className="font-exo text-xxs max-w-[11rem] truncate font-normal text-white">
              {skin.playerName}
            </span>
          </div>
        </div>
      )}

      {/* Item image — right side */}
      <img
        alt="drop-item"
        className={`absolute top-1/2 z-[2] h-full object-contain -translate-y-1/2
          ${horizontal
            ? "left-1/2 -translate-x-1/2 max-w-[80%] max-h-[80%]"
            : "right-0 max-h-[5.6875rem] w-full max-w-[5.8125rem]"
          }`}
        src={skin.img}
        onError={(e) => { 
          const btn = e.currentTarget.closest('button'); 
          if (btn) btn.style.display = 'none'; 
        }}
      />

      {/* Left color stripe */}
      {!horizontal && (
        <div
          className="absolute top-0 left-0 h-full w-0.5"
          style={{ background: skin.rarity }}
        />
      )}

      {/* Rarity gradient overlay */}
      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{
          background: horizontal
            ? `linear-gradient(180deg, rgba(35,35,37,0) 0%, ${skin.rarity.replace("rgb", "rgba").replace(")", ", 0.15)")} 100%)`
            : `linear-gradient(270deg, rgba(35,35,37,0.2) 25.06%, ${skin.rarity.replace("rgb", "rgba").replace(")", ", 0.3)")} 100%)`,
        }}
      />

      {/* Hover arrow — right edge */}
      {!horizontal && (
        <img
          alt=""
          className="absolute top-1/2 -right-1.5 h-[6.6875rem] w-[4.125rem] -translate-y-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          src="https://s3.upgrader.pro/cdn/fa/images/upgrader-arrow-up.svg"
        />
      )}
    </button>
  )
}

// ── Diamond path constants (shared between idle and hover lottie SVGs) ──────
const D34 = "M34,24 C34,24 17,11.6 17,11.6 C17,11.6 0,24 0,24 C0,24 0,12.4 0,12.4 C0,12.4 17,0 17,0 C17,0 34,12.4 34,12.4 C34,12.4 34,24 34,24z"
const D48 = "M48,34 C48,34 24,16.4 24,16.4 C24,16.4 0,34 0,34 C0,34 0,17.6 0,17.6 C0,17.6 24,0 24,0 C24,0 48,17.6 48,17.6 C48,17.6 48,34 48,34z"
const D60 = "M60,42 C60,42 30,20.2 30,20.2 C30,20.2 0,42 0,42 C0,42 0,21.8 0,21.8 C0,21.8 30,0 30,0 C30,0 60,21.8 60,21.8 C60,21.8 60,42 60,42z"

type BestDropItemData = {
  name: string
  weapon: string
  chance: string
  price: string
  playerName: string
  playerAvatar: string
  img: string
}

const BEST_DROPS: BestDropItemData[] = [
  {
    name: "Dragon Lore",
    weapon: "AWP",
    chance: "25.07%",
    price: "574170.93",
    playerName: "bigPenis",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/2c9e6ed092ea72100ab54c5f5c175f5d-6a0349e82c94c.jpg",
    img: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa-kBkupjDLw96pcX6TZg5yCZJ5TbNZtxjtwNS2NemztgDbidoQyH-sjCga6no-6_FCD_QEyQmfGQ/360fx360f"
  },
  {
    name: "Gungnir",
    weapon: "AWP",
    chance: "5.16%",
    price: "999547.78",
    playerName: "bigPenis",
    playerAvatar: "https://s3.upgrader.pro/cdn/avatars/2c9e6ed092ea72100ab54c5f5c175f5d-6a0349e82c94c.jpg",
    img: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ/360fx360f"
  }
]

function BestDropItem({ item, horizontal = false }: { item: BestDropItemData; horizontal?: boolean }) {
  const lottieRef = useRef<any>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const playPeriodically = () => {
      if (!isHoveredRef.current && lottieRef.current) {
        lottieRef.current.play();
        setTimeout(() => {
          if (!isHoveredRef.current && lottieRef.current) {
            lottieRef.current.stop();
          }
        }, 2000); // 5 loops at 60fps (2.0s)
      }
      timeoutId = setTimeout(playPeriodically, 8000);
    };

    timeoutId = setTimeout(playPeriodically, 8000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    lottieRef.current?.stop();
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-gradient-to-t from-[#b09711] to-[#312d23] relative flex h-full w-full items-end overflow-hidden rounded-lg p-2"
    >
      {horizontal ? (
        <div className="pointer-events-none absolute inset-0 z-[4] flex items-end justify-between p-1 select-none">
          <img
            className="h-4 w-4 rounded-full object-cover border-[1px] border-[#FFFFFF1A]"
            src={item.playerAvatar}
            alt="Аватар пользователя"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp' }}
          />
          <div className="flex items-center space-x-0.5 rounded-[0.25rem] bg-black/40 px-1 py-[0.125rem]">
            <img alt="up-arrow-up" className="h-[0.45rem] w-[0.45rem]" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
            <span className="font-exo text-[0.45rem] font-bold text-white leading-none">{item.chance}</span>
          </div>
        </div>
      ) : (
        <div className="pointer-events-none relative z-[2] flex h-full w-full flex-col items-start justify-start space-x-0.5 select-none">
          <div className="absolute -top-1 -left-2 flex items-center justify-start space-x-1 rounded-r-lg bg-black/40 px-1.5 py-0.5">
            <img alt="up-arrow-up" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/up-arrow-yellow.svg" />
            <span className="font-exo text-xxxs font-bold text-white">{item.chance}</span>
          </div>

          <div className="absolute bottom-0 left-0 flex flex-col items-start justify-start space-x-0.5 text-left transition-all duration-700 group-hover:translate-y-[-100%] group-hover:opacity-0">
            <span className="font-tektur text-xxs max-w-[6.875rem] truncate font-bold uppercase text-white">{item.name}</span>
            <span className="font-exo text-xxxs max-w-[6.8125rem] truncate font-semibold text-[#826e01]">{item.weapon}</span>
          </div>

          <div className="absolute bottom-0 left-0 flex translate-y-[50%] flex-col items-start justify-start space-y-1 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <img 
              className="h-6 w-6 cursor-pointer rounded-full object-cover" 
              src={item.playerAvatar} 
              alt="Аватар пользователя" 
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp' }}
            />
            <span className="font-tektur text-xxs max-w-[11rem] truncate font-bold text-white uppercase">{item.playerName}</span>
          </div>
        </div>
      )}

      {/* Coin price — top-right, slides in on hover */}
      {!horizontal && (
        <div className="absolute top-2 right-2 z-[3] flex translate-y-[-50%] items-center justify-center space-x-0.5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.625rem] leading-none font-semibold text-white">{item.price}</span>
          <img alt="" className="h-2.5 w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
        </div>
      )}

      {/* Item image */}
      <img
        alt="drop-item"
        className={`absolute top-1/2 z-[2] h-full object-contain -translate-y-1/2 ${
          horizontal
            ? "left-1/2 -translate-x-1/2 max-w-[80%] max-h-[80%]"
            : "right-0 max-h-[5.6875rem] w-full max-w-[5.8125rem]"
        }`}
        src={item.img}
        onError={(e) => { 
          const btn = e.currentTarget.closest('button'); 
          if (btn) btn.style.display = 'none'; 
        }}
      />

      {/* Background glow — exact SVG from reference with feGaussianBlur */}
      <svg
        width="188"
        height="80"
        viewBox="0 0 188 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 z-[0]"
      >
        <g filter="url(#best-drop-filter0)">
          <ellipse cx="126" cy="105.5" rx="198" ry="93.5" fill="url(#best-drop-radial0)" />
        </g>
        <defs>
          <filter
            id="best-drop-filter0"
            x="-102"
            y="-18"
            width="456"
            height="247"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur" />
          </filter>
          <radialGradient
            id="best-drop-radial0"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(126 105.5) rotate(90) scale(93.5 198)"
          >
            <stop stopColor="#FBD506" />
            <stop offset="1" stopColor="#FBD506" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>

      {/* Horizontal mode arrows */}
      {horizontal && (
        <>
          <img
            alt=""
            className="absolute top-1/2 -left-1.5 h-[3.5rem] w-[2.1rem] -translate-y-1/2 z-[3] pointer-events-none"
            src="/assets/images/upgrader-arrow-up.svg"
          />
          <img
            alt=""
            className="absolute top-1/2 -right-1.5 h-[3.5rem] w-[2.1rem] -translate-y-1/2 z-[3] pointer-events-none"
            src="/assets/images/upgrader-arrow-up.svg"
          />
        </>
      )}

      {/* Desktop mode background arrows */}
      {!horizontal && (
        <Lottie
          lottieRef={lottieRef}
          autoplay={false}
          animationData={arrowAnimIdle}
          loop={true}
          className="absolute top-1/2 -right-1.5 h-[6.6875rem] w-[4.125rem] -translate-y-1/2 z-[1] pointer-events-none"
        />
      )}
    </button>
  )
}

/* ── Best drop card ── */
function BestDropCard({ horizontal = false }: { horizontal?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(Math.floor(Math.random() * BEST_DROPS.length));
  }, []);

  const item = BEST_DROPS[activeIndex];

  return (
    <div
      className={`shrink-0 z-10 relative ${
        horizontal ? "h-[3.75rem] w-[8.25rem] snap-start pr-1 pl-0" : "h-[5rem] w-full"
      }`}
    >
      <div className="relative w-full h-full overflow-hidden">
        <BestDropItem item={item} horizontal={horizontal} />
      </div>
    </div>
  )
}

