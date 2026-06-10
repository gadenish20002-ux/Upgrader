import React from 'react'
import { useStore, getSkin, formatPrice } from '@/lib/store'
import { RARITY_COLORS } from '@/lib/default-data'

export function GamesHistory() {
  const { state } = useStore()
  const games = state.gameHistory

  if (games.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-8">
        <span className="text-[#a7a7a7]">У вас пока нет игр</span>
      </div>
    )
  }

  return (
    <div className="!mb-0 grid w-full grid-cols-1 gap-1 px-3 lg:grid-cols-3 lg:gap-3">
      {games.map((g) => {
        let betImage = "/assets/icons/coin.svg"
        let betRarity = "rgb(251, 213, 6)"
        if (g.betSkinId !== "balance") {
          const skin = getSkin(state.skins, g.betSkinId)
          if (skin) {
            betImage = skin.image || "/unknown-item.svg"
            betRarity = RARITY_COLORS[skin.rarity] || "rgb(136, 71, 255)"
          }
        }

        let targetImage = "/unknown-item.svg"
        let targetRarity = "rgb(136, 71, 255)"
        const targetSkin = getSkin(state.skins, g.targetSkinId)
        if (targetSkin) {
          targetImage = targetSkin.image || "/unknown-item.svg"
          targetRarity = RARITY_COLORS[targetSkin.rarity] || "rgb(136, 71, 255)"
        }

        let resultImage = "/unknown-item.svg"
        let resultRarity = "rgb(176, 195, 217)"
        if (g.resultSkinId) {
          const resultSkin = getSkin(state.skins, g.resultSkinId)
          if (resultSkin) {
            resultImage = resultSkin.image || "/unknown-item.svg"
            resultRarity = RARITY_COLORS[resultSkin.rarity] || "rgb(176, 195, 217)"
          }
        }

        return (
          <div key={g.id} className="group/item animate-bounce-in relative flex h-[12.5rem] w-full items-center justify-center gap-1 rounded-[1.125rem] bg-[#1E1F23] p-3 shadow-[0_10px_20px_0_rgba(0,0,0,0.10)] hover:!z-[11]">
            <button className="absolute z-[0] h-full w-full cursor-pointer rounded-[1.125rem] bg-transparent">
              <span></span>
            </button>
            
            <div className="peer/sector-1 flex h-full w-full flex-col items-center justify-center gap-1.5">
              <div className="z-[2] h-[8.125rem] w-full hover:z-[5]">
                <div className="w-full h-full">
                  <div tabIndex={0} role="button" className="group relative h-full w-full rounded-md p-[0.0625rem] shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]" aria-pressed="false" style={{ background: `linear-gradient(137deg, ${betRarity} 10%, rgb(28, 28, 32) 75%)` }}>
                    <div className="bg-block tablet:bg-size-[50%] relative flex h-full w-full items-center justify-center rounded-md bg-cover bg-[length:2.5rem] bg-center bg-no-repeat" style={{ backgroundImage: "url('https://s3.upgrader.pro/cdn/fa/images/light-gray-logo.png')" }}>
                      <img className="z-[1] w-full max-w-[4.375rem] object-cover lg:max-w-[79%]" src={betImage || undefined} alt="" />
                      <div className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200" style={{ background: `radial-gradient(circle, ${betRarity.replace('rgb', 'rgba').replace(')', ', 0.4)').replace('#', 'rgba(')} 0%, ${betRarity.replace('rgb', 'rgba').replace(')', ', 0.2)').replace('#', 'rgba(')} 30%, ${betRarity.replace('rgb', 'rgba').replace(')', ', 0.1)').replace('#', 'rgba(')} 45%, transparent 70%)` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex h-[2.5rem] w-full flex-col items-center justify-center gap-0.5 rounded-[0.5rem] bg-[#FFFFFF0A] py-1.5">
                <span className="font-exo2 text-[0.5rem] text-white opacity-50">Ваша ставка</span>
                <div className="flex items-center justify-center">
                  <span className="font-tektur mr-1 text-[0.75rem] text-white"> {formatPrice(g.betPrice)} </span>
                  <img alt="" className="h-3 w-3" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                </div>
              </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.5864 9.30828L7.99927 4.48622L1.41211 9.30828V4.82206L7.99927 0L14.5864 4.82206V9.30828Z" fill="white" fillOpacity="0.5"></path>
              <path d="M13.3327 11.1325V14.6668L7.99935 10.8679L2.66602 14.6668V11.1325L7.99935 7.3335L13.3327 11.1325Z" fill="white" fillOpacity="0.2"></path>
            </svg>
            
            <div className="peer/sector-2 flex h-full w-full flex-col items-center justify-center gap-1.5">
              <div className="relative z-[2] h-[8.125rem] w-full hover:z-[5] lg:max-w-[10.125rem]">
                <div className="w-full h-full">
                  <div tabIndex={0} role="button" className="group relative h-full w-full rounded-md p-[0.0625rem] shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]" aria-pressed="false" style={{ background: `linear-gradient(137deg, ${targetRarity} 10%, rgb(28, 28, 32) 75%)` }}>
                    <div className="bg-block tablet:bg-size-[50%] relative flex h-full w-full items-center justify-center rounded-md bg-cover bg-[length:2.5rem] bg-center bg-no-repeat" style={{ backgroundImage: "url('https://s3.upgrader.pro/cdn/fa/images/light-gray-logo.png')" }}>
                      <div className="absolute z-[2] flex flex-col items-end justify-center space-x-0.5 top-1.5 right-1.5">
                        <div className="flex items-center justify-center space-x-0.5">
                          <span className="font-tektur text-gradient-yellow text-[0.625rem] font-bold text-white lg:text-[0.6875rem]">{formatPrice(g.targetPrice)}</span>
                          <img alt="" className="h-2 w-2 lg:h-2.5 lg:w-2.5" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                        </div>
                      </div>
                      <img className="z-[1] w-full max-w-[4.375rem] object-cover lg:max-w-[79%]" src={targetImage || undefined} alt="" />
                      <div className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200" style={{ background: `radial-gradient(circle, ${targetRarity.replace('rgb', 'rgba').replace(')', ', 0.4)').replace('#', 'rgba(')} 0%, ${targetRarity.replace('rgb', 'rgba').replace(')', ', 0.2)').replace('#', 'rgba(')} 30%, ${targetRarity.replace('rgb', 'rgba').replace(')', ', 0.1)').replace('#', 'rgba(')} 45%, transparent 70%)` }}></div>
                    </div>
                  </div>
                </div>
                
                {g.status === 'compensation' && (
                  <div className="absolute bottom-1.5 left-1.5 flex items-center justify-center rounded-[0.25rem] bg-[#FBD5061A] px-2 py-1 text-[0.625rem] text-[#FBD506]"> Компенсация </div>
                )}
                {g.status === 'win' && (
                  <div className="absolute bottom-1.5 left-1.5 flex items-center justify-center rounded-[0.25rem] bg-[#24D17A1A] px-2 py-1 text-[0.625rem] text-[#24D17A]"> Победа </div>
                )}
                {g.status === 'loss' && (
                  <div className="absolute bottom-1.5 left-1.5 flex items-center justify-center rounded-[0.25rem] bg-[#E7463D1A] px-2 py-1 text-[0.625rem] text-[#E7463D]"> Проигрыш </div>
                )}
                
                {g.status === 'compensation' && g.resultSkinId && (
                  <div className="absolute -right-0.5 -bottom-4 z-[1] flex h-[3.75rem] max-w-[3.75rem] rotate-15 items-center justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] hover:z-[5]">
                    <div className="w-full h-full">
                      <div tabIndex={0} role="button" className="group relative h-full w-full rounded-md p-[0.0625rem] shadow-[0px_0px_2.407px_0px_rgba(255,255,255,0.10)]" aria-pressed="false" style={{ background: `linear-gradient(137deg, ${resultRarity} 10%, rgb(28, 28, 32) 75%)` }}>
                        <div className="bg-block tablet:bg-size-[50%] relative flex h-full w-full items-center justify-center rounded-md bg-cover bg-[length:2.5rem] bg-center bg-no-repeat" style={{ backgroundImage: "url('https://s3.upgrader.pro/cdn/fa/images/light-gray-logo.png')" }}>
                          <img className="z-[1] w-full max-w-[4.375rem] object-cover lg:max-w-[79%]" src={resultImage || undefined} alt="" />
                          <div className="absolute top-1/2 left-1/2 z-[0] h-full w-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110 group-hover:brightness-200" style={{ background: `radial-gradient(circle, ${resultRarity?.replace('rgb', 'rgba').replace(')', ', 0.4)').replace('#', 'rgba(')} 0%, ${resultRarity?.replace('rgb', 'rgba').replace(')', ', 0.2)').replace('#', 'rgba(')} 30%, ${resultRarity?.replace('rgb', 'rgba').replace(')', ', 0.1)').replace('#', 'rgba(')} 45%, transparent 70%)` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex h-[2.5rem] w-full flex-col items-center justify-center gap-0.5 rounded-[0.5rem] bg-[#FFFFFF0A] py-1.5">
                <span className="font-exo2 text-[0.5rem] text-white opacity-50">Шанс</span>
                <span className="font-tektur text-[0.75rem] text-[#FBD506]"> {g.chance}% </span>
              </div>
            </div>
            
            <button className="animate-scaleIn absolute -top-6 z-[3] hidden w-auto min-w-[8rem] cursor-pointer flex-col items-center justify-center bg-transparent group-hover/item:block peer-hover/sector-1:hidden peer-hover/sector-2:hidden">
              <div className="flex w-full items-center justify-between gap-1 rounded-[0.375rem] bg-[#FFFFFF1A] p-2 text-center shadow-[0_6px_8px_0_rgba(0,0,0,0.15)] backdrop-blur-[5px]">
                <span className="font-exo2 text-[0.75rem] text-white opacity-50"> ID игры </span>
                <span className="font-exo2 max-w-full text-[0.75rem] text-white">{g.id}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="7" viewBox="0 0 24 7" fill="none" className="mx-auto">
                <path d="M24 -4.79524e-05L21.6568 -5.51174e-05C20.596 -5.82362e-05 19.5785 0.421369 18.8284 1.17152L16 3.99993L14.1213 5.87858C12.9497 7.05016 11.0503 7.05016 9.87868 5.87858L8.00002 3.99993L5.17162 1.17152C4.42147 0.421371 3.40405 -5.82362e-05 2.34317 -5.51174e-05L4.79524e-05 -4.79524e-05L6.00004 -4.76152e-05L8.00002 -4.82896e-05L12 -4.79524e-05L16 -4.82896e-05L18 -4.76152e-05L24 -4.79524e-05Z" fill="white" fillOpacity="0.1"></path>
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}
