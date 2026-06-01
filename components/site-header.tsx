"use client"

import { useRef, useState } from "react"
import { useStore, formatNumber } from "@/lib/store"
import { Logo } from "./logo"
import { LogOut, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginButton } from "./login-button"
import Image from "next/image"

export function SiteHeader() {
  const { state, logout, setState } = useStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarMenu, setAvatarMenu] = useState(false)

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
            <a className="flex cursor-pointer items-center gap-[0.3125rem] lg:gap-2" href="/">
              <img src="/assets/images/header/logo.svg" alt="Logo" className="h-[1.5125rem] w-[1.5125rem] lg:h-8 lg:w-8" />
              <span className="font-tektur text-xl font-extrabold text-white lg:text-2xl"> UPGRADER </span>
            </a>
          </div>

          <div className="hidden items-center justify-start space-x-3 md:flex">
            <div className="h-full">
              <div className="flex h-full items-center gap-1 md:gap-2">
                <img src="/assets/images/header/online-yellow.svg" alt="Online" className="h-[1.06rem] w-[1.06rem] md:h-4 md:w-4" />
                <div className="flex flex-col">
                  <span className="hidden text-sm text-[#A7A7A7] md:block leading-none"> Онлайн </span>
                  <span className="text-[0.9075rem] font-semibold md:text-sm text-white leading-none">
                    {formatNumber(state.online)}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-full">
              <div className="flex h-full items-center gap-1 md:gap-2">
                <img src="/assets/images/header/logo.svg" alt="Upgrades" className="h-[1.06rem] w-[1.06rem] md:h-4 md:w-4" />
                <div className="flex flex-col">
                  <span className="hidden text-sm text-[#A7A7A7] md:block leading-none">Апгрейдов</span>
                  <span className="text-[0.9075rem] font-semibold md:text-sm text-white leading-none">
                    {formatNumber(state.upgrades)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full shrink flex-[2] items-center justify-end lg:flex-1">
          <div className="z-[0] my-auto mr-4 hidden select-none lg:block">
            <div className="flex gap-2">
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232325] transition-all duration-200 hover:brightness-150" href="https://t.me/upgraderCS" aria-label="Telegram">
                <Image className="h-5 w-5" alt="telegram" src="/assets/icons/telegram.svg" width={20} height={20} />
              </a>
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232325] transition-all duration-200 hover:brightness-150" href="https://vk.com/upgraderCS2" aria-label="VK">
                <Image className="h-5 w-5" alt="vk" src="/assets/icons/vk.svg" width={20} height={20} />
              </a>
            </div>
          </div>

          {state.loggedIn ? (
            <div className="flex items-center gap-2">
              {/* Balance */}
              <div className="rounded bg-white/5 px-3 py-1.5 text-sm font-bold text-white">
                {formatNumber(Math.round(state.balance))} ₽
              </div>

              {/* Avatar button */}
              <div className="relative">
                <button
                  onClick={handleAvatarClick}
                  aria-label="Аватарка"
                  className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-200"
                  style={{
                    borderColor: avatarMenu ? "#f0c000" : "rgba(255,255,255,0.15)",
                    background: "#232325",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#f0c000" }}
                  onMouseLeave={(e) => { if (!avatarMenu) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)" }}
                >
                  {state.avatar ? (
                    <img
                      src={state.avatar}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {state.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                  {/* Camera overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
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
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  )
}
