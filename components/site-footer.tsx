import { Logo } from "./logo"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-[#17181C] lg:rounded-tl-xl lg:px-10 lg:pt-10 lg:pb-6 flex flex-col gap-6 px-6 pt-6 pb-10">
      
      {/* Mobile Top */}
      <div className="lg:hidden flex items-center justify-between gap-4">
        <a href="/" className="flex cursor-pointer items-center gap-[0.3125rem] my-auto select-none">
          <img src="/assets/images/header/logo.svg" alt="Logo" className="h-[1.5125rem] w-[1.5125rem]" />
          <span className="font-tektur text-xl font-extrabold"> UPGRADER </span>
        </a>
        <div className="my-auto select-none">
          <div className="flex gap-2">
            <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://t.me/upgraderCS">
              <img className="h-5 w-5" alt="telegram" src="/assets/icons/telegram.svg" />
            </a>
            <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://vk.com/upgraderCS2">
              <img className="h-5 w-5" alt="vk" src="/assets/icons/vk.svg" />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Top */}
      <div className="hidden lg:flex w-full flex-wrap items-start justify-between gap-6">
        <a href="/" className="flex cursor-pointer items-center gap-2 my-auto select-none !my-0 mr-6">
          <img src="/assets/images/header/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-tektur text-2xl font-extrabold"> UPGRADER </span>
        </a>

        <div className="flex flex-col gap-2">
          <p className="font-tektur text-white/50 text-[0.7rem] xl:text-[1rem]"> Поддержка </p>
          <a href="mailto:support@upgrader.pro" className="font-tektur text-[0.875rem] text-white/80 hover:text-white"> support@upgrader.pro </a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-tektur text-white/50 text-[0.7rem] xl:text-[1rem]"> Сотрудничество </p>
          <a href="mailto:marketing@upgrader.pro" className="font-tektur text-[0.875rem] text-white/80 hover:text-white"> marketing@upgrader.pro </a>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-tektur text-white/50 text-[0.7rem] xl:text-[1rem]"> Общие положения </p>
          <div className="flex flex-col gap-1">
            <a className="font-tektur text-[0.875rem] text-white/50 transition-colors hover:text-white" href="/ru/tos"> Пользовательское соглашение </a>
            <a className="font-tektur text-[0.875rem] text-white/50 transition-colors hover:text-white" href="/ru/cookie-policy"> Политика использования Cookie </a>
            <a className="font-tektur text-[0.875rem] text-white/50 transition-colors hover:text-white" href="/ru/privacy-policy"> Политика конфиденциальности </a>
            <a href="/assets/files/offer_uzum.pdf" target="_blank" className="font-tektur text-[0.875rem] text-white/50 transition-colors hover:text-white"> Публичная оферта </a>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6">
          <div className="my-auto select-none">
            <div className="flex gap-2">
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://t.me/upgraderCS">
                <img className="h-5 w-5" alt="telegram" src="/assets/icons/telegram.svg" />
              </a>
              <a target="_blank" className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:brightness-150 bg-[#232325]" href="https://vk.com/upgraderCS2">
                <img className="h-5 w-5" alt="vk" src="/assets/icons/vk.svg" />
              </a>
            </div>
          </div>
          
          <div className="my-auto !my-0 shrink-0">
            <div className="relative">
              <button type="button" aria-haspopup="menu" aria-label="Language selection" className="flex h-8 cursor-pointer items-center gap-3 rounded-md bg-[#232325] px-2" aria-expanded="false">
                <span className="flex items-center gap-1.5">
                  <img alt="flag" className="h-[1.0625rem] w-[1.625rem] rounded-[2px] object-cover" src="/assets/images/game/ru.png" />
                  <span className="font-tektur text-sm font-semibold text-white/80"> RUS </span>
                </span>
                <img src="/assets/images/header/arrow-down.svg" alt="arrow-down" className="h-[0.375rem] w-[0.6875rem] opacity-80 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      <div className="lg:hidden flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <p className="font-tektur text-white/50 text-sm">Поддержка</p>
              <a href="mailto:support@upgrader.pro" className="font-tektur text-sm text-white/80">support@upgrader.pro</a>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="font-tektur text-white/50 text-sm">Сотрудничество</p>
              <a href="mailto:marketing@upgrader.pro" className="font-tektur text-sm text-white/80">marketing@upgrader.pro</a>
            </div>
          </div>
          <div className="my-auto !my-0 shrink-0 self-start">
            <div className="relative">
              <button type="button" aria-haspopup="menu" aria-label="Language selection" className="flex h-8 cursor-pointer items-center gap-3 rounded-md bg-[#232325] px-2" aria-expanded="false">
                <span className="flex items-center gap-1.5">
                  <img alt="flag" className="h-[1.0625rem] w-[1.625rem] rounded-[2px] object-cover" src="/assets/images/game/ru.png" />
                  <span className="font-tektur text-sm font-semibold text-white/80"> RUS </span>
                </span>
                <img src="/assets/images/header/arrow-down.svg" alt="arrow-down" className="h-[0.375rem] w-[0.6875rem] opacity-80 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-tektur text-white/50 text-sm">Общие положения</p>
          <a className="font-tektur text-sm text-white/50" href="/ru/tos">Пользовательское соглашение</a>
          <a className="font-tektur text-sm text-white/50" href="/ru/cookie-policy">Политика использования Cookie</a>
          <a className="font-tektur text-sm text-white/50" href="/ru/privacy-policy">Политика конфиденциальности</a>
          <a href="/assets/files/offer_uzum.pdf" target="_blank" className="font-tektur text-sm text-white/50"> Публичная оферта </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
        <p className="font-tektur xl:text-[0.875rem] text-sm text-white/80">
          <span id="footer-legal-heading">UPGRADER © 2026</span>
        </p>
        <div className="font-tektur text-white/20 lg:max-w-[1154px] lg:text-[0.525rem] xl:text-[0.75rem] text-[10px] leading-[1.2]">
          <p>
            <span id="footer-legal-company">LLC «Transtrade», Company address: Kyrgyz Republic, Bishkek, Leninsky District, 66 Kalyk Akiev Street, Registration number (OGRN): 310961-3301-LLC, Tax ID (INN): 9909710251</span>
          </p>
          <p> На нашем сайте вы можете улучшить CS2 предметы. </p>
        </div>
      </div>
    </footer>
  )
}
