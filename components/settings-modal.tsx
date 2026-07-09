"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"

interface SettingsModalProps {
  onClose: () => void
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { state, setState } = useStore()
  const [nickname, setNickname] = useState(state.username)
  const [tradeUrl, setTradeUrl] = useState("")
  const [privacy, setPrivacy] = useState("private")
  const [streamerMode, setStreamerMode] = useState(false)

  const handleSave = () => {
    setState((p) => ({
      ...p,
      username: nickname,
    }))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      <div tabIndex={0} className="animate-scaleIn bg-[#1C1C20] h-full m-0 max-w-full outline-none overflow-hidden p-[0.125rem] relative rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] lg:h-fit lg:w-[40.75rem] w-full flex flex-col">
        <div className="mb-6 flex min-h-[19px] items-center justify-between px-[0.625rem] pt-[0.625rem] shrink-0">
          <div className="flex items-center gap-1.5 text-base leading-[19px] font-medium text-white">
            <div className="flex items-center gap-1.5">
              <img alt="" className="h-4 w-4" src="/cdn/fa/icons/settings.svg" />
              <span className="text-base font-medium text-white">Настройки</span>
            </div>
          </div>
          <button onClick={onClose} className="bg-[#17181C] border-none cursor-pointer duration-200 flex h-[18px] hover:bg-[#202022] items-center justify-center rounded-[15px] text-white/40 transition-colors w-[18px] z-[1]">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path d="M9.98338 1.51328L8.9867 0.516602L4.99999 4.50331L1.01328 0.516602L0.0166016 1.51328L4.00331 5.49999L0.0166016 9.4867L1.01328 10.4834L4.99999 6.49667L8.9867 10.4834L9.98338 9.4867L5.99667 5.49999L9.98338 1.51328Z" fill="white" fillOpacity="0.4"></path>
            </svg>
          </button>
        </div>

        <div className="lg:max-h-[calc(100vh-200px)] max-h-[calc(100vh-60px)] overflow-x-hidden overflow-y-auto pb-[0.625rem] px-[0.625rem] custom-scroll">
          <div className="flex w-full max-w-[800px] flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-medium text-white">Никнейм</h3>
              <input 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full h-[2.75rem] lg:h-[3.125rem] border border-[#2E2E30] bg-[#17181C] font-normal text-white outline-none lg:text-[0.8125rem] rounded-[0.3125rem] px-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] placeholder:text-gray lg:rounded-[0.625rem]" 
                type="text" 
                placeholder="Введите ваш никнейм" 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base font-medium text-white">Трейд-ссылка</h3>
              <div className="flex flex-col gap-2">
                <input 
                  value={tradeUrl}
                  onChange={(e) => setTradeUrl(e.target.value)}
                  className="w-full h-[2.75rem] lg:h-[3.125rem] border border-[#2E2E30] bg-[#17181C] font-normal text-white outline-none lg:text-[0.8125rem] rounded-[0.3125rem] px-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] placeholder:text-gray lg:rounded-[0.625rem]" 
                  type="text" 
                  placeholder="Введите трейд-ссылку" 
                />
                <a href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank" rel="noopener noreferrer" className="text-xs text-[#a7a7a7] underline hover:text-white transition-colors w-fit">
                  Ссылку можно взять здесь
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-base leading-[19px] font-medium text-white">Приватность Steam</h3>
              <div className="flex flex-col gap-2">
                <label className="flex cursor-pointer items-start gap-2 p-0 group">
                  <input type="radio" name="privacy" value="private" checked={privacy === "private"} onChange={(e) => setPrivacy(e.target.value)} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${privacy === 'private' ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white">Приватный</div>
                    <div className="text-xs leading-[18px] font-normal text-[#a7a7a7]">Значение по умолчанию. Только вы будете видеть свою информацию стим профиля, позволяет скрыть ваш профиль от парсер-ботов, и злоумышленников.</div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2 p-0 group">
                  <input type="radio" name="privacy" value="authorized_only" checked={privacy === "authorized_only"} onChange={(e) => setPrivacy(e.target.value)} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${privacy === 'authorized_only' ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white">Доступен только для друзей</div>
                    <div className="text-xs leading-[18px] font-normal text-[#a7a7a7]">Все авторизованные пользователи могут видеть вашу информацию профиля</div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2 p-0 group">
                  <input type="radio" name="privacy" value="public" checked={privacy === "public"} onChange={(e) => setPrivacy(e.target.value)} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${privacy === 'public' ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white">Публичный</div>
                    <div className="text-xs leading-[18px] font-normal text-[#a7a7a7]">Все пользователи будут видеть вашу информацию профиля</div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <h3 className="m-0 text-base font-medium text-white">Режим стримера</h3>
                  <p className="m-0 text-xs leading-[18px] font-normal text-[#a7a7a7]">Скрывает личную информацию и баланс для безопасности во время стрима</p>
                </div>
                <div 
                  tabIndex={0} 
                  role="switch" 
                  onClick={() => setStreamerMode(!streamerMode)}
                  className={`relative h-[1.25rem] w-[2.25rem] cursor-pointer rounded-[6.25rem] p-[0.125rem] transition-colors duration-200 focus:outline-none ${streamerMode ? 'bg-[#53db42]' : 'bg-[#FFFFFF1A]'}`}
                  aria-checked={streamerMode}
                >
                  <div className={`absolute h-[1rem] w-[1rem] rounded-2xl shadow-[0px_4px_6px_0px_rgba(0,0,0,0.5)] transition-transform duration-200 bg-[#FFFFFF] ${streamerMode ? 'translate-x-[1rem] opacity-100' : 'translate-x-0 opacity-50'}`}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center pb-4 mt-2">
              <button onClick={handleSave} type="button" className="inline-flex items-center justify-center transition-all duration-200 focus:outline-none !leading-[1.25] select-none text-[#FBD506] text-[0.8125rem] rounded-md px-2 py-2 min-h-[1.875rem] lg:min-h-10 lg:px-3 lg:text-base btn-gradient-2 h-11 w-[14.125rem] font-bold cursor-pointer hover:brightness-110">
                Сохранить и закрыть
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
