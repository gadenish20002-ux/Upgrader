"use client"

import { useRef, useState, useEffect } from "react"
import { useStore, formatNumber } from "@/lib/store"
import { Logo } from "./logo"
import { LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginButton } from "./login-button"
import Image from "next/image"
import Link from "next/link"


export function SiteHeader() {
  const { state, logout, setState } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarMenu, setAvatarMenu] = useState(false)

  // Локальные счетчики, чтобы не дергать базу данных каждые 1.5 секунды
  const [localOnline, setLocalOnline] = useState(state.online)
  const [localUpgrades, setLocalUpgrades] = useState(state.upgrades)

  // Обновляем локальные счетчики, если они сильно отстают или при загрузке
  useEffect(() => {
    setLocalOnline(state.online)
    setLocalUpgrades(state.upgrades)
  }, [state.online, state.upgrades])

  // Имитация изменения онлайна и количества апгрейдов
  useEffect(() => {
    const interval = setInterval(() => {
      setLocalOnline((prev) => {
        const onlineChange = Math.floor(Math.random() * 11) - 5
        const newOnline = prev + onlineChange
        return newOnline < 0 ? 0 : newOnline
      })
      setLocalUpgrades((prev) => {
        const upgradesChange = Math.floor(Math.random() * 41) + 10
        return prev + upgradesChange
      })
    }, 1500) // каждые 1.5 секунды

    return () => clearInterval(interval)
  }, [])

  function handleAvatarClick() {
    setAvatarMenu((v) => !v)
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
    setAvatarMenu(false)
    // reset so same file can be re-selected
    e.target.value = ""
  }

  function handleLogout() {
    logout()
    setAvatarMenu(false)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex flex-col items-center justify-between rounded-b-[0.375rem] px-3 bg-[#17181c] border-b border-[#232325] md:flex-row md:rounded-none md:px-6">
      <div className="flex h-[3.25rem] w-full items-center justify-start space-x-3 md:h-[4.25rem] md:space-x-5">
        <div className="flex h-full w-full flex-1 shrink flex-nowrap items-center justify-start space-x-3 md:space-x-5">
          <div className="my-auto select-none shrink-0">
            <Link className="flex cursor-pointer items-center gap-[0.3125rem] lg:gap-2" href="/">
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
                  <span className="text-[0.875rem] font-semibold font-exo2 tabular-nums leading-5 pb-[2.4px] tracking-[0.04em]">
                    {formatNumber(localUpgrades)}
                  </span>
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
                  <div className="tablet:text-lg flex h-full items-center text-[0.875rem] lg:text-[1.05rem] font-semibold text-white">
                    {formatNumber(Math.round(state.balance))}
                  </div>
                  <img alt="" className="tablet:h-5 tablet:w-5 h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem]" src="https://s3.upgrader.pro/cdn/fa/icons/coin.svg" />
                </button>
                <button className="bg-[#FBD506] z-[2] flex h-[2.25rem] w-[2.75rem] lg:min-h-11 lg:w-auto shrink-1 items-center justify-center space-x-2 rounded-[0.625rem] lg:px-4 px-0 py-0 lg:py-2.5 text-[1.125rem] leading-[1rem] !font-light font-medium text-[#202022] transition-all duration-200 select-none hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] focus:outline-none">
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
                <button onClick={handleAvatarClick} className="shrink-0 cursor-pointer" aria-label="Открыть профиль">
                  <img className="tablet:h-11 tablet:w-11 h-[2rem] w-[2rem] lg:h-[2.25rem] lg:w-[2.25rem] cursor-pointer rounded-full object-cover" src={state.avatar || "https://s3.upgrader.pro/cdn/fa/images/default-avatar-small.webp"} alt="Аватар пользователя" />
                </button>

                {/* Dropdown menu */}
                {avatarMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setAvatarMenu(false)}
                    />
                    <div
                      className="absolute right-0 top-11 z-50 min-w-[180px] overflow-hidden rounded-xl shadow-2xl"
                      style={{
                        background: "#1c1d21",
                        border: "1px solid #2a2b30",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* Username */}
                      <div className="border-b border-[#2a2b30] px-4 py-3">
                        <div className="text-xs text-[#6b6b6b]">Аккаунт</div>
                        <div className="mt-0.5 font-semibold text-white">{state.username}</div>
                      </div>

                      {/* Change avatar */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-[#a7a7a7] transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <Camera className="h-4 w-4" />
                        Сменить аватарку
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 border-t border-[#2a2b30] px-4 py-3 text-sm text-[#eb4b4b] transition-colors hover:bg-[#eb4b4b]/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Выйти
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
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
