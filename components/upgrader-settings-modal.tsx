"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"

interface UpgraderSettingsModalProps {
  onClose: () => void
}

export function UpgraderSettingsModal({ onClose }: UpgraderSettingsModalProps) {
  const { state, setState } = useStore()
  
  const [fastMultipliers, setFastMultipliers] = useState<[number, number, number]>(state.fastMultipliers)
  const [fastPercentages, setFastPercentages] = useState<[number, number, number]>(state.fastPercentages)
  const [soundMode, setSoundMode] = useState<"on" | "off">(state.soundMode)
  const [fastMode, setFastMode] = useState<boolean>(state.fastMode)

  const handleResetMultipliers = () => {
    setFastMultipliers([2, 4, 8])
  }

  const handleResetPercentages = () => {
    setFastPercentages([35, 55, 75])
  }
  
  const handleDefaultAll = () => {
    setFastMultipliers([2, 4, 8])
    setFastPercentages([35, 55, 75])
  }

  const handleSave = () => {
    setState((p) => ({
      ...p,
      fastMultipliers,
      fastPercentages,
      soundMode,
      fastMode
    }))
    onClose()
  }

  const handleMultiplierChange = (index: number, val: string) => {
    const num = parseFloat(val) || 0
    const newMults = [...fastMultipliers] as [number, number, number]
    newMults[index] = num
    setFastMultipliers(newMults)
  }

  const handlePercentageChange = (index: number, val: string) => {
    const num = parseFloat(val) || 0
    const newPercs = [...fastPercentages] as [number, number, number]
    newPercs[index] = num
    setFastPercentages(newPercs)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div tabIndex={0} className="animate-scaleIn bg-[#1C1C20] m-0 outline-none overflow-hidden relative rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-[578px] h-[705px] max-w-[95vw] max-h-[95vh] flex flex-col z-[101]">
        <div className="h-full w-full">
          <div className="invisible-scroll flex h-full max-h-full flex-col gap-[2rem] overflow-y-auto">
            
            <div className="flex items-center justify-between bg-[#1E1F23] p-[1.5rem]">
              <span className="font-exo flex items-center gap-1.5 text-[1.25rem] leading-normal text-white">
                <img alt="settings-icon" className="h-4 w-4 brightness-150" src="https://s3.upgrader.pro/cdn/fa/icons/settings.svg" /> 
                Настройки 
              </span>
              <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g opacity="0.5">
                    <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-center justify-start gap-3 px-[1.5rem]">
              <div className="flex w-full items-center justify-between">
                <span className="font-exo font-medium text-[1.125rem] leading-normal text-[#FFFFFF]"> 
                  Быстрый подбор 
                </span>
                <button onClick={handleDefaultAll} className="font-exo font-medium text-[0.875rem] leading-[1.1875rem] text-[#FBD506] transition-colors duration-200 hover:text-[#FFE44D] active:text-[#FDD911]"> 
                  По умолчанию 
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                
                <div className="flex flex-1 flex-col items-start justify-center rounded-[0.375rem] bg-[#1E1F23] p-3 w-full">
                  <span className="font-normal text-[0.8125rem] leading-[140%] text-[#FFFFFF] opacity-50"> 
                    Настройте кнопки для быстрого подбора по коэффициенту 
                  </span>
                  <div className="mt-4 mb-1 ml-2 flex items-center justify-between w-full pr-2">
                    <div className="flex items-center justify-start gap-5">
                      {[0, 1, 2].map(i => (
                        <div key={`mult-${i}`} className="relative flex h-8 w-10 items-center justify-center">
                          <input 
                            type="number" size={2} required min="1.3" max="100" 
                            value={fastMultipliers[i]}
                            onChange={(e) => handleMultiplierChange(i, e.target.value)}
                            className="bg-[#131315] flex h-[2.4375rem] w-[3.25rem] flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border pl-4.5 text-white transition-colors focus:outline-none border-white/10 hover:border-[#FBD50650] focus:border-[#FBD506] appearance-none" 
                          />
                          <span className="absolute left-1 text-[#FFFFFF] opacity-50">x</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleResetMultipliers} className="-mb-4 h-5 w-5 transition-all duration-200 hover:brightness-150">
                      <img alt="refresh" className="h-5 w-5" src="https://s3.upgrader.pro/cdn/fa/icons/refresh-single-yellow.svg" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-start justify-center rounded-[0.375rem] bg-[#1E1F23] p-3 w-full">
                  <span className="font-normal text-[0.8125rem] leading-[140%] text-[#FFFFFF] opacity-50"> 
                    Настройте кнопки для быстрого подбора по проценту 
                  </span>
                  <div className="mt-4 mb-1 ml-2 flex items-center justify-between w-full pr-2">
                    <div className="flex items-center justify-start gap-5">
                      {[0, 1, 2].map(i => (
                        <div key={`perc-${i}`} className="relative flex h-8 w-10 items-center justify-center">
                          <input 
                            type="number" size={2} required min="0.1" max="80" 
                            value={fastPercentages[i]}
                            onChange={(e) => handlePercentageChange(i, e.target.value)}
                            className="bg-[#131315] flex h-[2.4375rem] w-[3.25rem] flex-1 -skew-x-6 transform cursor-pointer items-center justify-center rounded-md border pr-6 text-right text-white transition-colors focus:outline-none border-white/10 hover:border-[#FBD50650] focus:border-[#FBD506] appearance-none" 
                          />
                          <span className="absolute right-0 text-[#FFFFFF] opacity-50">%</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleResetPercentages} className="-mb-4 h-5 w-5 transition-all duration-200 hover:brightness-150">
                      <img alt="refresh" className="h-5 w-5" src="https://s3.upgrader.pro/cdn/fa/icons/refresh-single-yellow.svg" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="m-0 px-[1.5rem] text-base leading-[19px] font-medium text-white"> Звук в апгрейде </h3>
              <div className="flex flex-col">
                <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                  <input type="radio" name="sound" value="on" checked={soundMode === "on"} onChange={() => setSoundMode("on")} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${soundMode === 'on' ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white"> Включен </div>
                    <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Значение по умолчанию. Звуковые эффекты (нажатия кнопок, щелчки анимации и финальные овации) включены </div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                  <input type="radio" name="sound" value="off" checked={soundMode === "off"} onChange={() => setSoundMode("off")} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${soundMode === 'off' ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
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
                  <input type="radio" name="scroll" value="normal" checked={!fastMode} onChange={() => setFastMode(false)} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${!fastMode ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white"> Обычная </div>
                    <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Значение по умолчанию. Стрелка крутится медленно </div>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2 p-0 px-[1.5rem] py-2 transition-all duration-200 hover:bg-[#FFFFFF05]">
                  <input type="radio" name="scroll" value="fast" checked={fastMode} onChange={() => setFastMode(true)} className="hidden" />
                  <span className={`relative mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border border-[#a7a7a7] bg-[#171820] after:absolute after:top-1/2 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-[#fcd506] after:transition-opacity after:content-[''] ${fastMode ? 'after:opacity-100' : 'after:opacity-0'}`}></span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="text-sm font-normal text-white"> Ускоренная </div>
                    <div className="text-xs leading-[18px] font-normal text-white opacity-50"> Стрелка крутится более быстро, чтобы ускорить процесс игры </div>
                  </div>
                </label>
              </div>
            </div>

            <button onClick={handleSave} className="font-exo mx-auto flex h-[2.5rem] items-center justify-center gap-2 rounded-[0.375rem] px-[1rem] py-[0.625rem] text-[1rem] leading-normal font-semibold text-[#202022] transition-colors duration-200 bg-[#FBD506] hover:bg-[#FFE44D] active:bg-[#FDD911] mb-[1.5rem]"> 
              Сохранить и закрыть 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
