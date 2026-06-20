"use client"

import { useState, useEffect } from "react"
import { useStore, formatNumber } from "@/lib/store"
import { LoginButton } from "./login-button"
import { currentGlobalUpgrades } from "@/lib/default-data"
import Image from "next/image"
import Link from "next/link"

function publicLoginKey() {
  try {
    const key = window.localStorage.getItem("upgrader_account_key") || "none"
    return `upgrader_public_logged_in:${key}`
  } catch {
    return "upgrader_public_logged_in:none"
  }
}

function readPublicLogin() {
  try {
    return window.localStorage.getItem(publicLoginKey()) === "1"
  } catch {
    return false
  }
}

function clearPublicLogin() {
  try {
    window.localStorage.setItem(publicLoginKey(), "0")
  } catch {}
}

export function SiteHeader({ onProfileClick, onLogoClick }: { onProfileClick?: () => void, onLogoClick?: () => void }) {
  const { state, logout } = useStore()
  const [localOnline, setLocalOnline] = useState(state.online)
  const [localUpgrades, setLocalUpgrades] = useState(() => currentGlobalUpgrades())
  const [persistedLogin, setPersistedLogin] = useState(false)

  useEffect(() => {
    setPersistedLogin(readPublicLogin())
    function refresh() {
      setPersistedLogin(readPublicLogin())
    }
    window.addEventListener("storage", refresh)
    window.addEventListener("upgrader-account-key-changed", refresh as EventListener)
    window.addEventListener("upgrader-public-login-changed", refresh as EventListener)
    return () => {
      window.removeEventListener("storage", refresh)
      window.removeEventListener("upgrader-account-key-changed", refresh as EventListener)
      window.removeEventListener("upgrader-public-login-changed", refresh as EventListener)
    }
  }, [])

  useEffect(() => {
    setLocalOnline(state.online)
  }, [state.online])

  useEffect(() => {
    let onlineTimer: ReturnType<typeof setTimeout>
    const upgradesInterval = setInterval(() => {
      setLocalUpgrades((prev) => {
        const next = currentGlobalUpgrades()
        return next > prev ? next : prev
      })
    }, 300)

    const bumpOnline = () => {
      setLocalOnline((prev) => Math.max(0, prev + (Math.floor(Math.random() * 11) - 5)))
      onlineTimer = setTimeout(bumpOnline, 2500)
    }
    onlineTimer = setTimeout(bumpOnline, 2500)

    return () => {
      clearInterval(upgradesInterval)
      clearTimeout(onlineTimer)
    }
  }, [])

  function handleLogout() {
    clearPublicLogin()
    window.dispatchEvent(new CustomEvent("upgrader-public-login-changed"))
    logout()
  }

  const loggedIn = state.loggedIn || persistedLogin

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
            <div className="h-full">
              <div className="flex h-full items-center gap-2">
                <img src="/assets/images/header/online-yellow.svg" alt="Online" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray tablet:block hidden text-sm font-exo2"> Онлайн </span>
                  <span className="text-[0.875rem] font-semibold font-exo2 tabular-nums leading-5 pb-[2.4px] tracking-[0.04em]">{formatNumber(localOnline)}</span>
                </div>
              </div>
            </div>

            <div className="h-full hidden tablet:block">
              <div className="flex h-full items-center gap-2">
                <img src="/assets/images/header/logo.svg" alt="Upgrades" className="h-[1.125rem] w-[1.125rem] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray tablet:block hidden text-sm font-exo2">Апгрейдов</span>
                  <span className="text-[0.875rem] font-semibold font-exo2 tabular-nums leading-5 pb-[2.4px] tracking-[0.04em]">{formatNumber(localUpgrades)}</span>
                </div>
              </div>
            </div>

            <div className="hidden tablet:flex h-[2.375rem] w-[13.4375rem] shrink-0 items-center justify-center rounded-[0.375rem] bg-[linear-gradient(90deg,#ECD591_0%,#897237_50%,#ECD591_100%)] p-[0.0625rem] transition-all duration-300">
              <div className="tablet:rounded-[0.375rem] tablet:bg-cover tablet:px-[0.5625rem] tablet:py-[0.5625rem] relative flex h-full w-full items-center justify-between overflow-hidden rounded-t-none rounded-b-[0.375rem] bg-[linear-gradient(90deg,rgba(23,24,28,0.70)_0%,rgba(23,24,28,0.40)_100%),linear-gradient(183deg,#595977_-97.81%,#28282D_141%)] px-[0.625rem] py-[0.6875rem]">
                <img alt="event" className="tablet:-right-6 absolute right-5 h-full flex-shrink-0" src="/assets/images/league/streamer-battle-dots.svg" />
                <img alt="event" className="tablet:right-2 tablet:left-auto absolute right-auto left-22 h-full flex-shrink-0" src="/assets/images/league/streamer-battle-rectangle-center.svg" />
                <img alt="event" className="tablet:block absolute left-0.5 hidden h-[1rem] flex-shrink-0" src="/assets/images/league/streamer-battle-rectangle-left.svg" />
                <img alt="event" className="tablet:block absolute right-0.5 hidden h-[1rem] flex-shrink-0" src="/assets/images/league/streamer-battle-rectangle-right.svg" />
                <img alt="event" className="tablet:block absolute right-2 hidden h-full flex-shrink-0" src="/assets/images/league/streamer-battle-swords.webp" />
                <img alt="event" className="tablet:right-0 tablet:hidden absolute right-[3rem] block h-full flex-shrink-0" src="/assets/images/league/streamer-battle-swords-mobile.webp" />
                <span className="font-exo text-gradient-streamer-battle z-[1] flex flex-shrink-1 flex-wrap items-center justify-center text-[1rem] leading-[1rem] font-semibold"> Битва Стримеров </span>
                <span className="font-exo tablet:hidden absolute right-0 flex max-h-[1.25rem] w-[2.5rem] items-center justify-center gap-[0.5rem] rounded-l-[0.25rem] bg-[#17181C] bg-[linear-gradient(270deg,#ECD591_0%,#A68B47_72.21%,#ECD591_100%)] px-[0.9375rem] py-[0.375rem] text-[0.75rem] leading-[0.875rem] font-bold text-[#1C1C20] uppercase"> new </span>
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

          {loggedIn ? (
            <div className="z-[2] !mr-0 flex h-full items-center justify-end space-x-2">
              <div className="tablet:h-12 tablet:space-x-[-0.875rem] flex h-[2.5rem] shrink-1 items-center justify-center space-x-[-0.5rem] lg:space-x-[-0.625rem]">
                <button className="tablet:h-full tablet:pr-6 tablet:pl-3 z-[1] flex h-[2rem] lg:h-[2.25rem] shrink-0 items-center justify-center space-x-1 rounded-l-[0.625rem] border-[1px] border-r-0 border-[#FEDB1A33] bg-[#FEDB1A0D] pr-3 lg:pr-4 pl-2 transition-all duration-200 hover:brightness-110">
                  <div className="tablet:text-lg flex h-full items-center text-[0.875rem] lg:text-[1.05rem] font-semibold text-white font-exo2">{formatNumber(Math.round(state.balance))}</div>
                  <img alt="" className="tablet:h-5 tablet:w-5 h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                </button>
                <button className="bg-[#FBD506] z-[2] flex h-[2.25rem] w-[2.75rem] lg:min-h-11 lg:w-auto shrink-1 items-center justify-center space-x-2 rounded-[0.625rem] lg:px-4 px-0 py-0 lg:py-2.5 text-[1.125rem] leading-[1rem] !font-light font-medium font-exo2 text-[#202022] transition-all duration-200 select-none hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] focus:outline-none">
                  <img className="h-[1.1rem] w-[1.1rem] lg:h-[1.25rem] lg:w-[1.25rem]" alt="top-up" src="/assets/top-up-mobile.svg" />
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
