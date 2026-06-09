"use client"

import { useRef } from "react"
import { useStore, formatNumber, getSkin } from "@/lib/store"
import { LogOut, Settings, Camera } from "lucide-react"

export function UserProfile({ onClose }: { onClose?: () => void }) {
  const { state, logout, setState } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const withdrawnItems = state.withdrawnItems || []
  const withdrawnCount = withdrawnItems.length
  const withdrawnTotal = withdrawnItems.reduce((acc, skinId) => {
    const skin = getSkin(state.skins, skinId)
    return acc + (skin?.price || 0)
  }, 0)

  function handleLogout() {
    logout()
    if (onClose) onClose()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      setState((p) => ({ ...p, avatar: base64 }))
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  return (
    <div className="flex h-full w-full max-w-[1132px] mx-auto flex-1 flex-col items-center space-y-3 pt-3 pb-10 lg:space-y-6 font-exo2">
      {/* VIP Club Banner */}
      <div className="lg:w-full w-fit">
        <a href="https://vip.upgrader.pro/" target="_blank" aria-label="Открыть vip.upgrader.pro" className="hidden w-full items-center justify-between rounded-[0.75rem] border-[0.0625rem] border-dashed border-[#FFFFFF33] bg-[#1C1D1F] p-2 pl-4 lg:flex">
          <div className="flex flex-col items-start justify-center gap-[0.125rem] lg:flex-row lg:items-center lg:gap-2">
            <div className="flex items-center justify-center gap-2">
              <img alt="crown-icon" className="h-[1rem] w-[1rem] lg:mb-[0.0625rem] lg:h-[1.125rem] lg:w-[1.125rem]" src="https://s3.upgrader.pro/cdn/fa/icons/profile/crown-silver.svg" />
              <span className="text-gradient-vip-club-silver text-[0.875rem] font-semibold uppercase">VIP CLUB</span>
            </div>
            <span className="text-[0.625rem] text-white opacity-50 lg:text-[0.875rem]">Проверь свой уровень и забирай подарки</span>
          </div>
          <div className="relative flex h-[1.75rem] items-center justify-center overflow-hidden rounded-[0.375rem] bg-[radial-gradient(circle,#363636_0%,#808080_100%)] p-[0.0625rem] shadow-[0_0_0_1px_rgba(255,255,255,0.20),0_4px_10px_0_rgba(0,0,0,0.35)] inset-shadow-[0_0_4px_1px_rgba(255,255,255,0.25)] lg:h-[2rem] lg:rounded-[0.5rem]">
            <div className="flex items-center justify-center gap-2 rounded-[0.375rem] bg-[linear-gradient(175deg,#808080_-15.4%,#363636_114.09%)] px-[0.5625rem] py-[0.3125rem] transition-opacity duration-200 lg:rounded-[0.5rem] lg:px-[0.6875rem]">
              <img alt="crown-icon" className="absolute left-0 h-full" src="https://s3.upgrader.pro/cdn/fa/images/profile/vip/ellipse-left.svg" />
              <img alt="crown-icon" className="absolute h-full" src="https://s3.upgrader.pro/cdn/fa/images/profile/vip/rectangle-center.svg" />
              <img alt="crown-icon" className="absolute right-0 h-full" src="https://s3.upgrader.pro/cdn/fa/images/profile/vip/ellipse-right.svg" />
              <img alt="crown-icon" className="h-[0.875rem] w-[0.875rem] lg:h-[1rem] lg:w-[1rem]" src="https://s3.upgrader.pro/cdn/fa/icons/profile/crown-silver.svg" />
              <span className="font-exo2 text-[0.8125rem] leading-normal font-semibold text-[#C2C2C2] lg:text-[0.875rem]">VIP CLUB</span>
            </div>
          </div>
        </a>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:rounded-[1.5rem] lg:border-[1px] lg:border-[#FFFFFF1A] lg:bg-[#282A2D] lg:bg-[radial-gradient(circle,#4E5054_0%,#282A2D_100%)] lg:p-4 lg:h-[309px]">
        {/* User Info */}
        <div>
          <div className="shadow-block flex h-full w-full flex-col justify-between rounded-xl p-4 lg:min-h-[14.0625rem] lg:bg-[#00000066]">
            <div className="flex items-center justify-start space-x-2.5">
              <div 
                className="group relative flex items-center justify-center rounded-[0.75rem] border-[1px] border-[#FFFFFF1A] p-1 cursor-pointer overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <img className="relative h-[3.75rem] w-[3.75rem] min-w-[3.75rem] rounded-[0.5rem] bg-[linear-gradient(175deg,#808080_-15.4%,#363636_114.09%)] lg:h-[5rem] lg:w-[5rem] lg:min-w-[5rem] object-cover transition-opacity group-hover:opacity-50" src={state.avatar || "https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp"} alt={state.username} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="@container flex w-full flex-col items-start justify-start space-y-3">
                <div className="relative mb-1.5 flex items-center justify-start space-x-1.5">
                  <span className="text-gray !pointer-events-auto max-w-[90cqw] truncate text-sm font-medium !select-auto"> {state.username} </span>
                </div>
                <div className="flex items-center justify-start">
                  <span className="!pointer-events-auto mr-1 rounded-[0.375rem] border-[1px] border-[#FFFFFF1A] px-2 pb-[1px] text-[0.8125rem] font-medium text-white/50 !select-auto"> ID {state.userId} </span>
                  <button onClick={handleLogout} className="flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-md bg-transparent transition-all duration-200 hover:brightness-150">
                    <img alt="" className="h-4 w-4" src="/assets/logout.svg" />
                  </button>
                </div>
              </div>
            </div>
            <button className="flex h-11 w-full mt-4 items-center justify-center gap-1.5 rounded-[0.5rem] bg-[#FFFFFF0D] p-3 transition-all duration-200 hover:opacity-80">
              <Settings className="h-4 w-4 text-white" />
              <span className="text-white text-[0.875rem] leading-normal font-medium">Настройки аккаунта</span>
            </button>
          </div>
        </div>

        {/* User Balance */}
        <div>
          <div className="shadow-block flex h-full w-full flex-col justify-start rounded-xl bg-[#FFFFFF1A] p-4 lg:min-h-[14.0625rem] lg:justify-between lg:bg-[#00000066]">
            <div className="mb-4 flex w-full items-end justify-between">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="flex w-full items-center justify-between">
                  <span className="text-[1rem] font-medium text-white"> Баланс </span>
                  <img alt="" className="h-5 w-5" src="/assets/balance-gray.svg" />
                </div>
                <div className="mt-[0.4375rem] flex items-center justify-start space-x-1.5 lg:mt-[1.5rem]">
                  <span className="text-[1.5rem] leading-normal font-bold text-white lg:text-[2rem]">{formatNumber(Math.floor(state.balance))}</span>
                  <img alt="" className="h-5 w-5 lg:h-7 lg:w-7" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                </div>
                <button className="flex items-center justify-start space-x-1.5 text-white/50 transition-all duration-200 hover:opacity-80 mt-1">
                  <span className="text-[0.875rem]">История платежей</span>
                  <img alt="" className="h-[0.75rem] w-[0.75rem]" src="https://s3.upgrader.pro/cdn/fa/icons/profile/arrow-right.svg" />
                </button>
              </div>
            </div>
            <div className="flex w-full gap-1.5 lg:order-2">
              <button className="bg-[#FBD506] inline-flex min-h-[41px] w-full items-center justify-center gap-1.5 space-x-1.5 rounded-[0.5rem] px-3 py-2 text-[0.875rem] !leading-[1.25] font-semibold text-[#17181C] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-200 select-none hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] focus:outline-none lg:space-x-3 lg:py-3 lg:text-[1rem]">
                <img alt="top-up-icon" className="h-[1.125rem] w-[1.125rem]" src="https://s3.upgrader.pro/cdn/fa/icons/top-up-mobile.svg" /> Пополнить баланс
              </button>
            </div>
            <div className="w-full mt-1.5 lg:order-1 lg:mt-auto lg:mb-3">
              <label htmlFor="promocode" className="box-border flex w-full flex-1 items-start justify-center gap-3 rounded-[0.5rem] border-[1px] border-dashed border-[#FFFFFF1A] bg-[#FFFFFF0D] p-1.5">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-[0.375rem]" style={{ background: "linear-gradient(93deg, #fbc206 1.16%, #ffdd23 50.58%, #fbd506 100%), rgba(255, 255, 255, 0.1)" }}>
                  <img alt="" className="absolute" src="https://s3.upgrader.pro/cdn/fa/images/profile/promocode/kupon-decor.svg" />
                  <img alt="" className="h-6 w-6 flex-shrink-0" src="/assets/kupon-black.svg" />
                </div>
                <input id="promocode" type="text" className="ml-1.5 flex h-8 w-full min-w-10 flex-1 flex-shrink-1 rounded-[0.375rem] border-transparent bg-transparent text-[1rem] leading-[1.375rem] transition-colors duration-200 placeholder:text-[#A7A7A7] focus:outline-none lg:ml-0 lg:h-10 text-white" placeholder="Введите купон" />
                <button className="group h-8 cursor-pointer items-center justify-center rounded-[0.375rem] px-3 transition-all duration-200 lg:h-10 pointer-events-none cursor-default bg-[#FFFFFF1A]">
                  <span className="text-[0.875rem] transition-all duration-200 text-[#FFFFFF]"> Применить </span>
                </button>
              </label>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div>
          <div className="shadow-block flex w-full flex-col gap-3 rounded-xl lg:h-full">
            <div className="shadow-block relative flex h-full min-h-[8.75rem] w-full flex-col justify-between overflow-hidden rounded-xl bg-[#282A2D] p-3 lg:bg-[#00000066]">
              <div className="z-[3] flex items-end justify-between">
                <span className="text-[0.875rem] text-white/50">Лучший дроп</span>
              </div>
              <img alt="" className="absolute top-1/2 right-[1rem] z-[2] h-auto w-[11.36625rem] -translate-y-1/2" src="/assets/ak47.webp" />
              <span className="text-gray w-1/2 text-xs text-[#a7a7a7]">Отобразится после первой игры</span>
            </div>
            <div className="flex h-full w-full items-center gap-3">
              <div className="flex h-full min-h-[6rem] w-full flex-1 flex-col items-start justify-start space-y-1.5 rounded-xl bg-[#00000066] p-4">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <span className="text-[0.875rem] lg:text-[1rem] font-medium text-white">Выведено</span>
                  <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.5rem] bg-[#FFFFFF0D]">
                    <img alt="" className="h-[1.2rem] w-[1.2rem]" src="/assets/steam-gray.svg" />
                  </div>
                </div>
                <div className="flex items-center justify-start space-x-1 lg:mt-auto lg:mb-0 text-[#a7a7a7]">
                  <span className="text-[0.875rem] lg:text-[1rem] font-normal">{withdrawnCount} предметов</span>
                </div>
                <div className="flex items-center justify-start space-x-1 text-[#FBD506]">
                  <span className="text-[0.875rem] lg:text-[1rem] font-bold">{formatNumber(withdrawnTotal)}</span>
                  <img alt="" className="h-4 w-4" src="https://s3.upgrader.pro/cdn/fa/icons/coin-2.svg" />
                </div>
              </div>
              <div className="flex h-full min-h-[6rem] w-full flex-1 flex-col items-start justify-start rounded-xl bg-[#00000066] p-4">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <span className="text-[0.875rem] lg:text-[1rem] font-medium text-white">Апгрейдов</span>
                  <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.5rem] bg-[#FFFFFF0D]">
                    <img alt="" className="h-[1.2rem] w-[1.2rem]" src="/assets/up-arrow-gray.svg" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 lg:mt-auto lg:mb-0 text-[#FBD506]">
                  <span className="font-exo2 text-[1.125rem] font-semibold">{state.userUpgrades || 0}</span>
                  <img alt="" className="h-5 w-5" src="https://s3.upgrader.pro/cdn/fa/icons/arrow-logo.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="w-full">
        <div className="bg-block shadow-block flex w-full flex-col items-center justify-center space-y-6 rounded-xl pb-3 lg:rounded-md">
          <div className="flex w-full flex-col items-center justify-between rounded-t-xl bg-[#FFFFFF08] p-3 shadow-[0_2px_20px_0_rgba(0,0,0,0.20)] lg:flex-row">
            <div className="flex h-[2rem] w-full items-center gap-1 rounded-[0.625rem] lg:h-[2.375rem] lg:max-w-[50%] lg:bg-[#17181C] lg:p-1">
              <button className="flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-[0.375rem] py-1 pr-2.5 pl-1.5 transition-colors duration-200 lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] bg-[#FFDD24]">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 flex-shrink-0 lg:h-4 lg:w-4 opacity-100" style={{ color: "rgb(32, 32, 34)" }}>
                  <path d="M15.6443 3.95755C15.6443 3.94063 15.6443 3.94063 15.6443 3.92372C15.6274 3.88989 15.6274 3.85607 15.6104 3.82224V3.80533C15.5935 3.77151 15.5597 3.73768 15.5428 3.72077L15.5259 3.70386C15.509 3.68694 15.4751 3.67003 15.4582 3.65312L15.4413 3.63621H15.4244L15.4075 3.61929L8.21964 0.0507378C8.08434 -0.0169126 7.91522 -0.0169126 7.763 0.0507378L5.3445 1.25153L12.5662 4.95539L12.5831 4.9723C12.6 4.9723 12.6 4.98921 12.6169 4.98921C12.6338 5.00613 12.6338 5.02304 12.6507 5.03995C12.6507 5.05686 12.6507 5.05686 12.6507 5.07378V5.09069V9.01441C12.6507 9.08206 12.6169 9.1328 12.5662 9.16662L11.1117 9.92769C11.0271 9.97843 10.9257 9.9446 10.8749 9.86004C10.858 9.84313 10.858 9.8093 10.858 9.77547V5.93632L3.55177 2.16481L3.53486 2.1479L0.60898 3.60238L0.592068 3.61929H0.575155L0.558243 3.63621C0.54133 3.65312 0.507505 3.67003 0.490592 3.68694L0.47368 3.70386C0.439854 3.73768 0.422942 3.77151 0.389117 3.80533V3.82224C0.372204 3.85607 0.355291 3.88989 0.355291 3.92372C0.355291 3.94063 0.355291 3.94063 0.355291 3.95755C0.355291 3.99137 0.338379 4.00828 0.338379 4.04211V4.05902V11.9403C0.338379 12.1263 0.439854 12.3124 0.625893 12.3969L7.74609 15.9486C7.84757 15.9993 7.96596 16.0162 8.08434 15.9824L8.11817 15.9655C8.15199 15.9655 8.16891 15.9486 8.20273 15.9317L15.3737 12.38C15.5428 12.2955 15.6612 12.1263 15.6612 11.9234V4.05902V4.04211C15.6443 4.00828 15.6443 3.99137 15.6443 3.95755Z" fill="currentColor"></path>
                </svg>
                <span className="text-[0.625rem] lg:text-[0.8125rem] text-[#202022] opacity-100 font-medium"> Инвентарь </span>
              </button>
              <button className="flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-[0.375rem] py-1 pr-2.5 pl-1.5 transition-colors duration-200 lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] bg-[#FFFFFF1A] lg:bg-transparent lg:hover:bg-[#FFFFFF08]">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[0.72725rem] w-[0.72725rem] flex-shrink-0 lg:h-4 lg:w-4 opacity-50" style={{ color: "rgb(255, 255, 255)" }}>
                  <path d="M15 8C15 9.85652 14.2625 11.637 12.9497 12.9498C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9498C1.7375 11.637 1 9.85652 1 8C1 7.8674 1.05268 7.74022 1.14645 7.64645C1.24021 7.55268 1.36739 7.5 1.5 7.5C1.63261 7.5 1.75979 7.55268 1.85355 7.64645C1.94732 7.74022 2 7.8674 2 8C1.998 9.33903 2.4433 10.6404 3.26523 11.6975C4.08716 12.7545 5.23861 13.5068 6.53684 13.8349C7.83506 14.1629 9.20566 14.048 10.4311 13.5082C11.6565 12.9685 12.6666 12.0349 13.3009 10.8557C13.9353 9.67642 14.1576 8.31909 13.9325 6.9991C13.7075 5.67912 13.048 4.47212 12.0588 3.56968C11.0695 2.66724 9.80719 2.12107 8.47214 2.01787C7.13709 1.91466 5.80582 2.26033 4.68963 3H5C5.13261 3 5.25979 3.05268 5.35355 3.14645C5.44732 3.24022 5.5 3.3674 5.5 3.5C5.5 3.63261 5.44732 3.75979 5.35355 3.85356C5.25979 3.94733 5.13261 4 5 4H3.5C3.43433 4.00004 3.36929 3.98713 3.30861 3.96202C3.24793 3.93691 3.1928 3.90008 3.14636 3.85364C3.09993 3.8072 3.0631 3.75207 3.03798 3.69139C3.01287 3.63071 2.99996 3.56568 3 3.5V2C3 1.8674 3.05268 1.74022 3.14645 1.64645C3.24021 1.55268 3.36739 1.5 3.5 1.5C3.63261 1.5 3.75979 1.55268 3.85355 1.64645C3.94732 1.74022 4 1.8674 4 2V2.25696C5.04939 1.52555 6.27917 1.09574 7.5557 1.01423C8.83224 0.932714 10.1067 1.20262 11.2406 1.79462C12.3745 2.38662 13.3244 3.27807 13.9872 4.37209C14.65 5.46612 15.0003 6.72087 15 8ZM12.5 8C12.5 8.89002 12.2361 9.76005 11.7416 10.5001C11.2471 11.2401 10.5443 11.8169 9.72208 12.1575C8.89981 12.4981 7.99501 12.5872 7.12209 12.4135C6.24918 12.2399 5.44736 11.8113 4.81802 11.182C4.18868 10.5526 3.7601 9.75082 3.58647 8.87791C3.41283 8.005 3.50195 7.1002 3.84254 6.27793C4.18314 5.45566 4.75991 4.75286 5.49993 4.25839C6.23995 3.76392 7.10998 3.5 8 3.5C9.19307 3.50131 10.3369 3.97583 11.1805 4.81946C12.0242 5.66309 12.4987 6.80693 12.5 8ZM9.77734 8.584L8.5 7.73242V5.5C8.5 5.3674 8.44732 5.24022 8.35355 5.14645C8.25979 5.05268 8.13261 5 8 5C7.86739 5 7.74021 5.05268 7.64645 5.14645C7.55268 5.24022 7.5 5.3674 7.5 5.5V8C7.50002 8.08231 7.52035 8.16334 7.55919 8.23591C7.59803 8.30848 7.65418 8.37034 7.72265 8.416L9.22266 9.416C9.333 9.48802 9.4673 9.51358 9.59638 9.48711C9.72546 9.46064 9.83887 9.38429 9.91196 9.27466C9.98506 9.16503 10.0119 9.03097 9.98671 8.90164C9.9615 8.77231 9.88626 8.65816 9.77734 8.584Z" fill="currentColor"></path>
                </svg>
                <span className="xxs:whitespace-nowrap text-[0.625rem] leading-normal font-medium lg:text-[0.8125rem] text-[#FFFFFF] opacity-50"> История предметов </span>
              </button>
              <button className="flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-[0.375rem] py-1 pr-2.5 pl-1.5 transition-colors duration-200 lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] bg-[#FFFFFF1A] lg:bg-transparent lg:hover:bg-[#FFFFFF08]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="h-[0.72725rem] w-[0.72725rem] flex-shrink-0 lg:h-4 lg:w-4 opacity-50" style={{ color: "rgb(255, 255, 255)" }}>
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.5864 9.30828L7.99927 4.48622L1.41211 9.30828V4.82206L7.99927 0L14.5864 4.82206V9.30828Z" fill="currentColor"></path>
                  <path d="M13.3327 11.1325V14.6668L7.99935 10.8679L2.66602 14.6668V11.1325L7.99935 7.3335L13.3327 11.1325Z" fill="currentColor"></path>
                </svg>
                <span className="xxs:whitespace-nowrap text-[0.625rem] leading-normal font-medium lg:text-[0.8125rem] text-[#FFFFFF] opacity-50"> История игр </span>
              </button>
            </div>
            <div className="mt-3 flex w-full items-center justify-end space-x-6 lg:mt-0">
              <div className="flex shrink-0 items-center justify-center space-x-2">
                <span className="text-[#a7a7a7] text-sm font-normal">Доступно для продажи</span>
                <div tabIndex={0} role="switch" className="relative h-[1.25rem] w-[2.25rem] cursor-pointer rounded-[6.25rem] p-[0.125rem] transition-colors duration-200 focus:outline-none bg-[#FFFFFF1A]" aria-checked="false" aria-disabled="false">
                  <div className="absolute h-[1rem] w-[1rem] rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.5)] transition-transform duration-200 translate-x-0 bg-[#FFFFFF] opacity-50"></div>
                </div>
              </div>
              <button type="button" disabled className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-transparent text-[#a7a7a7] rounded-md px-3 space-x-2 min-h-[2.0625rem] text-xs lg:text-sm border border-[#a7a7a7] border-solid hover:bg-[#a7a7a7]/10 !justify-end !transition-none !text-[0.8125rem] !px-2 !py-2 !min-h-[1.875rem] lg:!min-h-10 lg:!px-3 lg:!text-base !font-light opacity-50 cursor-not-allowed pointer-events-none">
                <span className="pointer-events-none select-none text-[#a7a7a7]"> Продать все </span>
              </button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center py-8">
            <span className="text-[#a7a7a7]">У вас пока нет предметов</span>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
