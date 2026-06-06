import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useStore } from "@/lib/store"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { state, setState } = useStore()

  const [multipliers, setMultipliers] = useState<[number, number, number]>(state.fastMultipliers)
  const [percentages, setPercentages] = useState<[number, number, number]>(state.fastPercentages)
  const [soundMode, setSoundMode] = useState<"on" | "off">(state.soundMode)
  const [scrollType, setScrollType] = useState<"normal" | "fast">(state.fastMode ? "fast" : "normal")

  useEffect(() => {
    if (isOpen) {
      setMultipliers(state.fastMultipliers)
      setPercentages(state.fastPercentages)
      setSoundMode(state.soundMode)
      setScrollType(state.fastMode ? "fast" : "normal")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleSave = () => {
    setState((p) => ({
      ...p,
      fastMultipliers: multipliers,
      fastPercentages: percentages,
      soundMode,
      fastMode: scrollType === "fast",
    }))
    onClose()
  }

  const handleReset = () => {
    setMultipliers([2, 4, 8])
    setPercentages([35, 55, 75])
    setSoundMode("on")
    setScrollType("normal")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="p-0 border-none bg-transparent shadow-none max-w-[23.4375rem] md:max-w-[36.25rem] [&>button]:hidden">
        <DialogTitle className="sr-only">Настройки</DialogTitle>
        <div tabIndex={0} className="animate-scaleIn bg-[#17181C] border-[#FFFFFF0D] border-[1px] flex flex-col gap-[2rem] items-center max-h-full min-w-full overflow-hidden pb-[1.5rem] relative rounded-[1.5rem] shadow-[0_10px_30px_0_rgba(0,0,0,0.35)] w-full">
          <div className="h-full w-full">
            <div className="custom-scroll flex max-h-[85vh] flex-col gap-[2rem] overflow-y-auto">
              <div className="flex items-center justify-between bg-[#1E1F23] p-[1.5rem] shrink-0">
                <span className="font-exo flex items-center gap-1.5 text-[1.25rem] leading-normal text-white">
                  <img alt="settings-icon" className="h-4 w-4 brightness-150" src="/assets/icons/settings.svg" /> Настройки 
                </span>
                <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g opacity="0.5">
                      <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center justify-start gap-3 px-[1.5rem]">
                <div className="flex w-full items-center justify-between">
                  <span className="font-exo font-medium text-[1.125rem] leading-normal text-[#FFFFFF]"> Быстрый подбор </span>
                  <button onClick={handleReset} className="font-exo font-medium text-[0.875rem] leading-[1.1875rem] text-[#FBD506] transition-colors duration-200 hover:text-[#FFE44D] active:text-[#FDD911]"> По умолчанию </button>
                </div>
                <div className="md:flex-row flex flex-col items-center justify-center gap-3 w-full">
                  <div className="flex-1 flex-col items-start justify-center rounded-[0.375rem] bg-[#1E1F23] p-3 w-full">
                    <span className="font-normal text-[0.8125rem] leading-[140%] text-[#FFFFFF] opacity-50"> Настройте кнопки для быстрого подбора по коэффициенту </span>
                    <div className="mt-4 mb-1 ml-2 flex items-center justify-between">
                      <div className="flex items-center justify-start gap-5">
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] mr-[1px]">x</span>
                            <input type="number" required min="1.3" max="100" step="0.1" value={multipliers[0]} onChange={(e) => setMultipliers([Number(e.target.value), multipliers[1], multipliers[2]])} className="w-[1.2rem] bg-transparent text-white outline-none p-0 text-left text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                          </div>
                        </label>
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] mr-[1px]">x</span>
                            <input type="number" required min="1.3" max="100" step="0.1" value={multipliers[1]} onChange={(e) => setMultipliers([multipliers[0], Number(e.target.value), multipliers[2]])} className="w-[1.2rem] bg-transparent text-white outline-none p-0 text-left text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                          </div>
                        </label>
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] mr-[1px]">x</span>
                            <input type="number" required min="1.3" max="100" step="0.1" value={multipliers[2]} onChange={(e) => setMultipliers([multipliers[0], multipliers[1], Number(e.target.value)])} className="w-[1.2rem] bg-transparent text-white outline-none p-0 text-left text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                          </div>
                        </label>
                      </div>
                      <button onClick={() => setMultipliers([2, 4, 8])} className="-mb-4 h-5 w-5 transition-all duration-200 hover:brightness-150">
                        <img alt="refresh" className="h-5 w-5" src="/assets/refresh-single-yellow.svg" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex-col items-start justify-center rounded-[0.375rem] bg-[#1E1F23] p-3 w-full">
                    <span className="font-normal text-[0.8125rem] leading-[140%] text-[#FFFFFF] opacity-50"> Настройте кнопки для быстрого подбора по проценту </span>
                    <div className="mt-4 mb-1 ml-2 flex items-center justify-between">
                      <div className="flex items-center justify-start gap-5">
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <input type="number" required min="0.1" max="80" step="0.1" value={percentages[0]} onChange={(e) => setPercentages([Number(e.target.value), percentages[1], percentages[2]])} className="w-[1.4rem] bg-transparent text-white outline-none p-0 text-right text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] ml-[2px]">%</span>
                          </div>
                        </label>
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <input type="number" required min="0.1" max="80" step="0.1" value={percentages[1]} onChange={(e) => setPercentages([percentages[0], Number(e.target.value), percentages[2]])} className="w-[1.4rem] bg-transparent text-white outline-none p-0 text-right text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] ml-[2px]">%</span>
                          </div>
                        </label>
                        <label className="relative flex items-center justify-center w-[3.25rem] h-[2.4375rem] bg-[#1c1d21] rounded-md border border-white/10 transition-colors focus-within:border-[#FBD506] hover:border-[#FBD50650] -skew-x-6 transform cursor-text">
                          <div className="flex items-center justify-center skew-x-6 transform w-full h-full">
                            <input type="number" required min="0.1" max="80" step="0.1" value={percentages[2]} onChange={(e) => setPercentages([percentages[0], percentages[1], Number(e.target.value)])} className="w-[1.4rem] bg-transparent text-white outline-none p-0 text-right text-[15px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]" />
                            <span className="text-[#FFFFFF] opacity-50 text-[15px] ml-[2px]">%</span>
                          </div>
                        </label>
                      </div>
                      <button onClick={() => setPercentages([35, 55, 75])} className="-mb-4 h-5 w-5 transition-all duration-200 hover:brightness-150">
                        <img alt="refresh" className="h-5 w-5" src="/assets/refresh-single-yellow.svg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="m-0 px-[1.5rem] text-base leading-[19px] font-medium text-white"> Звук в апгрейде </h3>
                <div className="flex flex-col">
                  <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                    <input type="radio" name="sound" value="on" checked={soundMode === "on"} onChange={() => setSoundMode("on")} className="peer hidden" />
                    <span className="relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] peer-checked:after:opacity-100 after:opacity-0"></span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="text-sm font-normal text-white"> Включен </div>
                      <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Значение по умолчанию. Звуковые эффекты (нажатия кнопок, щелчки анимации и финальные овации) включены </div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                    <input type="radio" name="sound" value="off" checked={soundMode === "off"} onChange={() => setSoundMode("off")} className="peer hidden" />
                    <span className="relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] peer-checked:after:opacity-100 after:opacity-0"></span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="text-sm font-normal text-white"> Выключен </div>
                      <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Звуковые эффекты в апгрейде теперь в беззвучном режиме </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="m-0 px-[1.5rem] text-base leading-[19px] font-medium text-white"> Тип прокрутки </h3>
                <div className="flex flex-col">
                  <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                    <input type="radio" name="scroll_type" value="normal" checked={scrollType === "normal"} onChange={() => setScrollType("normal")} className="peer hidden" />
                    <span className="relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] peer-checked:after:opacity-100 after:opacity-0"></span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="text-sm font-normal text-white"> Обычная </div>
                      <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Значение по умолчанию. Стрелка крутится медленно </div>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                    <input type="radio" name="scroll_type" value="fast" checked={scrollType === "fast"} onChange={() => setScrollType("fast")} className="peer hidden" />
                    <span className="relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] peer-checked:after:opacity-100 after:opacity-0"></span>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="text-sm font-normal text-white"> Ускоренная </div>
                      <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Стрелка крутится более быстро, чтобы ускорить процесс игры </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="px-[1.5rem] shrink-0 mt-[-0.5rem]">
                <button onClick={handleSave} className="font-exo mx-auto flex h-[2.5rem] items-center justify-center gap-2 rounded-[0.375rem] px-[1rem] py-[0.625rem] text-[1rem] leading-normal font-semibold text-[#202022] transition-colors duration-200 bg-[#FBD506] hover:bg-[#FFE44D] active:bg-[#FDD911]"> 
                  Сохранить и закрыть 
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
