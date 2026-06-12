"use client"

import { useRef, useState, useEffect } from "react"
import { useStore, formatNumber } from "@/lib/store"
import { Logo } from "./logo"
import { LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginButton } from "./login-button"
import { OdometerCounter } from "./odometer-counter"
import Image from "next/image"
import Link from "next/link"


export function SiteHeader({ onProfileClick, onLogoClick }: { onProfileClick?: () => void, onLogoClick?: () => void }) {
  const { state, logout, setState } = useStore()

  // Локальные счетчики, чтобы не дергать базу данных каждые 1.5 секунды
  const [localOnline, setLocalOnline] = useState(state.online)
  const [localUpgrades, setLocalUpgrades] = useState(state.upgrades)

  // Обновляем локальные счетчики, если они сильно отстают или при загрузке
  useEffect(() => {
    setLocalOnline(state.online)
    setLocalUpgrades(state.upgrades)
  }, [state.online, state.upgrades])

  // Имитация живых счётчиков (онлайн + апгрейды), как на референсе:
  // апгрейды тикают часто и небольшими шагами, чтобы одометр плавно прокручивался.
  useEffect(() => {
    let upgradesTimer: ReturnType<typeof setTimeout>
    let onlineTimer: ReturnType<typeof setTimeout>

    const bumpUpgrades = () => {
      setLocalUpgrades((prev) => prev + (Math.floor(Math.random() * 3) + 1))
      // 0.6–1.4s между апгрейдами — живой, но реалистичный темп прокрутки
      upgradesTimer = setTimeout(bumpUpgrades, Math.floor(Math.random() * 800) + 600)
    }

    const bumpOnline = () => {
      setLocalOnline((prev) => {
        const next = prev + (Math.floor(Math.random() * 11) - 5)
        return next < 0 ? 0 : next
      })
      onlineTimer = setTimeout(bumpOnline, 2500)
    }

    upgradesTimer = setTimeout(bumpUpgrades, 800)
    onlineTimer = setTimeout(bumpOnline, 2500)

    return () => {
      clearTimeout(upgradesTimer)
      clearTimeout(onlineTimer)
    }
  }, [])

  function handleLogout() {
    logout()
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex flex-col items-center justify-between rounded-b-[0.375rem] px-3 bg-[#17181c] border-b border-[#232325] md:flex-row md:rounded-none md:px-6">
      <div className="flex h-[3.25rem] w-full items-center justify-start space-x-3 md:h-[4.25rem] md:space-x-5">
        <div className="flex h-full w-full flex-1 shrink flex-nowrap items-center justify-start space-x-3 md:space-x-5">
          <div className="my-auto select-none shrink-0">
            <Link className="flex cursor-pointer items-center gap-[0.3125rem] lg:gap-2" href="/" onClick={onLogoClick}>
              <img src="/assets/images/header/logo.svg" alt="Logo" className="h-[1.25rem] w-[1.25rem] lg:h-8 lg:w-8" />
              <span className="font-tektur text-xl font-extrabold text-white hidden lg:block lg:text-2xl"> UPGRADER </span>
            </Link>
          </div>

          <div className="flex items-center justify-start space-x-3">
            {/* Online counter */}
            <div className="h-full">
              <div className="flex h-full items-center gap-2">
                <img src="/assets/images/header/online-yellow.svg" alt="Online" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray tablet:block hidden text-sm font-exo2"> Онлайн </span>
                  <span className="text-[0.875rem] font-semibold font-exo2 tabular-nums leading-5 pb-[2.4px] tracking-[0.04em]">
                    {formatNumber(localOnline)}
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrades counter */}
            <div className="h-full hidden tablet:block">
              <div className="flex h-full items-center gap-2">
                <img src="/assets/images/header/logo.svg" alt="Upgrades" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray tablet:block hidden text-sm font-exo2">Апгрейдов</span>
                  <OdometerCounter
                    value={localUpgrades}
                    className="text-[0.875rem] font-semibold font-exo2 tabular-nums leading-5 pb-[2.4px] tracking-[0.04em]"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="h-full flex items-center justify-end shrink-1 flex-[2] lg:flex-1">
          <div className="my-auto select-none z-[0] mr-4 hidden lg:block">
            <div className="flex gap-2">
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://t.me/upgraderCS">
                <Image className="h-5 w-5" alt="telegram" src="/assets/icons/telegram.svg" width={20} height={20} />
              </a>
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://vk.com/upgraderCS2">
                <Image className="h-5 w-5" alt="vk" src="/assets/icons/vk.svg" width={20} height={20} />
              </a>
            </div>
          </div>

          {state.loggedIn ? (
            <div className="z-[2] !mr-0 flex h-full items-center justify-end space-x-2">
              <div className="tablet:h-12 tablet:space-x-[-0.875rem] flex h-[2.5rem] shrink-1 items-center justify-center space-x-[-0.5rem] lg:space-x-[-0.625rem]">
                <button className="tablet:h-full tablet:pr-6 tablet:pl-3 z-[1] flex h-[2rem] lg:h-[2.25rem] shrink-0 items-center justify-center space-x-1 rounded-l-[0.625rem] border-[1px] border-r-0 border-[#FEDB1A33] bg-[#FEDB1A0D] pr-3 lg:pr-4 pl-2 transition-all duration-200 hover:brightness-110">
                  <div className="tablet:text-lg flex h-full items-center text-[0.875rem] lg:text-[1.05rem] font-semibold text-white font-exo2">
                    {formatNumber(Math.round(state.balance))}
                  </div>
                  <img alt="" className="tablet:h-5 tablet:w-5 h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                </button>
                <button className="bg-[#FBD506] z-[2] flex h-[2.25rem] w-[2.75rem] lg:min-h-11 lg:w-auto shrink-1 items-center justify-center space-x-2 rounded-[0.625rem] lg:px-4 px-0 py-0 lg:py-2.5 text-[1.125rem] leading-[1rem] !font-light font-medium font-exo2 text-[#202022] transition-all duration-200 select-none hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] focus:outline-none">
                  <div className="h-[1.1rem] w-[1.1rem] lg:h-[1.25rem] lg:w-[1.25rem]">
                    <img className="h-[1.1rem] w-[1.1rem] lg:h-[1.25rem] lg:w-[1.25rem]" alt="top-up-mobile-icon" src="data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22%231C1C20%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cstyle%3E*%20%7B%20fill%3A%20%231C1C20%20!important%3B%20%7D%3C%2Fstyle%3E%0A%3Cpath%20d%3D%22M13.237%203.78997C13.9766%204.16309%2014.2735%205.06549%2013.9004%205.80512L13.802%205.99985H6.98853L9.14507%201.72613L13.237%203.78997Z%22%20fill%3D%22%231C1C20%22%2F%3E%0A%3Cpath%20d%3D%22M6.53433%202.08918C6.89483%201.37453%207.74833%201.07562%208.47283%201.39261L6.14849%205.99985H4.56165L6.53433%202.08918Z%22%20fill%3D%22%231C1C20%22%2F%3E%0A%3Cpath%20d%3D%22M14.25%206.75C15.4926%206.75%2016.5%207.75736%2016.5%209V14.5C16.5%2015.7426%2015.4926%2016.75%2014.25%2016.75H3.75C2.50736%2016.75%201.5%2015.7426%201.5%2014.5V9C1.5%207.75736%202.50736%206.75%203.75%206.75H14.25ZM9%209C8.72386%209%208.5%209.22386%208.5%209.5V11.25H6.75C6.47386%2011.25%206.25%2011.4739%206.25%2011.75C6.25%2012.0261%206.47386%2012.25%206.75%2012.25H8.5V14C8.5%2014.2761%208.72386%2014.5%209%2014.5C9.27614%2014.5%209.5%2014.2761%209.5%2014V12.25H11.25C11.5261%2012.25%2011.75%2012.0261%2011.75%2011.75C11.75%2011.4739%2011.5261%2011.25%2011.25%2011.25H9.5V9.5C9.5%209.22386%209.27614%209%209%209Z%22%20fill%3D%22%231C1C20%22%2F%3E%0A%3C%2Fsvg%3E%0A" />
                  </div>
                  <span className="hidden lg:inline">Пополнить</span>
                </button>
              </div>
              <div className="tablet:mr-[0.375rem] tablet:h-11 relative mr-[0.3125rem] flex shrink-1 items-center justify-center ml-1">
                <button className="bg-[#202022] duration-200 flex h-[2rem] w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] hover:brightness-150 items-center justify-center relative rounded-[0.625rem] tablet:h-11 tablet:w-11 transition-all">
                  <img alt="" className="tablet:h-6 tablet:w-6 h-[1.1rem] w-[1.1rem] lg:h-[1.45rem] lg:w-[1.45rem]" src="https://s3.upgrader.pro/cdn/fa/icons/bell.svg" />
                </button>
              </div>
              <div className="relative flex shrink-0">
                <button onClick={onProfileClick} className="shrink-0 cursor-pointer" aria-label="Открыть профиль">
                  <img className="tablet:h-11 tablet:w-11 h-[2rem] w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] cursor-pointer rounded-full object-cover" src={state.avatar || "https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp"} alt="Аватар пользователя" />
                </button>
              </div>
            </div>
          ) : (
            <div className="z-[2] !mr-0 flex h-full items-center justify-end space-x-2">
              <LoginButton className="!w-[167px] !h-[44px] !text-sm whitespace-nowrap" />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
