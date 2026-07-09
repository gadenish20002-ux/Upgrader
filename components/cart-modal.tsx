"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useStore, getSkin, formatPrice } from "@/lib/store"
import { formatWeaponName, formatSkinName } from "@/lib/utils"

function currentAccountKey() {
  try {
    return window.localStorage.getItem("upgrader_account_key") || ""
  } catch {
    return ""
  }
}

export function CartModal({
  isOpen,
  onClose,
  selectedShopIds,
  onRemoveItem,
  onClearCart,
  onBuy,
}: {
  isOpen: boolean
  onClose: () => void
  selectedShopIds: string[]
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  onBuy: () => void
}) {
  const { state, setState } = useStore()
  const [buying, setBuying] = useState(false)

  if (!isOpen) return null

  const totalPrice = selectedShopIds.reduce((sum, id) => {
    const skin = getSkin(state.skins, id)
    return sum + (skin?.price || 0)
  }, 0)

  async function handleBuy() {
    if (buying || selectedShopIds.length === 0) return
    if (!state.loggedIn || totalPrice > state.balance) {
      onBuy()
      return
    }

    const key = currentAccountKey()
    if (!key) {
      toast.error("Войдите заново")
      return
    }

    setBuying(true)
    try {
      const response = await fetch(`/api/account/buy?key=${encodeURIComponent(key)}&t=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skinIds: selectedShopIds }),
        cache: "no-store",
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload?.success || !payload?.account) {
        toast.error("Покупка не сохранена. Попробуйте ещё раз.")
        return
      }

      setState((prev) => ({
        ...prev,
        ...payload.account,
        skins: prev.skins,
        upgradeSkins: prev.upgradeSkins,
        upgrades: prev.upgrades,
      }))
      toast.success("Предметы успешно куплены!")
      onClearCart()
      onClose()
    } catch (error) {
      console.error("Failed to save cart purchase", error)
      toast.error("Покупка не сохранена. Попробуйте ещё раз.")
    } finally {
      setBuying(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000CC] backdrop-blur-sm p-4 animate-in fade-in duration-200" style={{ fontFamily: "SimpleFont, sans-serif" }}>
      <div tabIndex={0} className="animate-scaleIn bg-block h-full m-0 max-w-full outline-none overflow-hidden p-[0.125rem] relative rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] lg:h-fit lg:w-[40.75rem] w-full flex flex-col">
        <div className="mb-6 flex min-h-[19px] items-center justify-between px-[0.625rem] pt-[0.625rem] shrink-0">
          <div className="flex items-center gap-1.5 text-base leading-[19px] font-medium text-white">
            <img alt="" className="h-3 w-3 lg:h-4 lg:w-4" src="/cdn/fa/icons/card-gray.svg" />
            <span className="text-[0.8125rem] font-medium text-white lg:text-base">Корзина</span>
          </div>
          <button onClick={onClose} className="bg-[#17181C] border-none cursor-pointer duration-200 flex h-[18px] hover:bg-[#202022] items-center justify-center rounded-[15px] text-white/40 transition-colors w-[18px] z-[1]">×</button>
        </div>

        <div className="lg:max-h-[calc(100vh-200px)] max-h-[calc(100vh-60px)] overflow-x-auto overflow-x-hidden pb-[0.625rem] px-[0.625rem] scrollbar-thin">
          <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-10">
            <div className="flex w-full flex-col gap-1.5">
              <div className="flex w-full items-center justify-between">
                <span className="text-xs font-light text-[#A7A7A7]"> {selectedShopIds.length} предмет{selectedShopIds.length === 1 ? "" : selectedShopIds.length > 1 && selectedShopIds.length < 5 ? "а" : "ов"} </span>
                {selectedShopIds.length > 0 && (
                  <button onClick={onClearCart} className="flex cursor-pointer items-center gap-1 transition-all duration-200 hover:brightness-150">
                    <img alt="" className="h-3 w-3 lg:h-4 lg:w-4" src="/cdn/fa/icons/trash.svg" />
                    <span className="text-xs font-light text-[#A7A7A7]"> Удалить все </span>
                  </button>
                )}
              </div>

              <div className="custom-scroll flex h-[15.5rem] flex-col gap-1.5 overflow-y-auto">
                {selectedShopIds.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-sm text-[#A7A7A7]">Корзина пуста</div>
                ) : (
                  selectedShopIds.map((id, index) => {
                    const skin = getSkin(state.skins, id)
                    if (!skin) return null
                    return (
                      <div key={`${id}-${index}`} className="flex h-[110px] w-full shrink-0 items-center justify-between rounded-xl bg-[#202022] px-3 shadow-[0_2px_4px_0_rgba(0,0,0,0.10)]">
                        <div className="flex items-center gap-2 lg:gap-6 w-[55%] lg:w-auto">
                          <img className="w-[80px] lg:w-[121px] object-contain drop-shadow-md" src={skin.image || "/placeholder.svg"} alt={skin.name} />
                          <div className="mr-1 flex flex-col space-y-0.5 max-w-[120px] lg:max-w-none">
                            <span className="text-xs text-[#A7A7A7] truncate">{formatWeaponName(skin.weapon)}</span>
                            <span className="font-[700] text-white text-[13px] lg:text-base leading-tight truncate">{formatSkinName(skin.name)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center space-x-[0.5rem] lg:space-x-[1.6875rem] justify-end">
                          <div className="flex items-center gap-0.5">
                            <span className="text-gradient-yellow font-bold text-white text-sm lg:text-base">{formatPrice(skin.price)}</span>
                            <img alt="" className="h-3.5 w-3.5 lg:h-4.5 lg:w-4.5" src="/cdn/fa/icons/coin-2.svg" />
                          </div>
                          <button onClick={() => onRemoveItem(id)} className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-md border-[1px] border-solid border-[#A7A7A7] bg-[#17181C] transition-colors hover:border-[#FBD506]">
                            <img alt="" className="h-3 w-3 lg:h-4 lg:w-4" src="/cdn/fa/icons/trash.svg" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-[700] text-white" style={{ fontFamily: "SimpleFont, sans-serif" }}>Итого</span>
                <div className="flex items-center gap-0.5">
                  <span className="font-bold text-white text-xl" style={{ fontFamily: "SimpleFont, sans-serif" }}>{formatPrice(totalPrice)}</span>
                  <img alt="" className="h-4.5 w-4.5" src="/cdn/fa/icons/coin-2.svg" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 lg:min-w-[30rem]">
                <button type="button" onClick={onClose} style={{ fontFamily: "SimpleFont, sans-serif" }} className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none !leading-[1.25] select-none bg-block !font-light text-[#FBD506] text-[0.8125rem] rounded-md px-2 py-2 space-x-2 min-h-[1.875rem] lg:min-h-10 lg:px-3 lg:text-base border-yellow-gradient-new mr-1 !h-12 !w-[8rem] !text-xl cursor-pointer">
                  <span className="pointer-events-none select-none"> Отменить </span>
                </button>
                <button type="button" onClick={handleBuy} disabled={selectedShopIds.length === 0 || buying} style={{ fontFamily: "SimpleFont, sans-serif" }} className="flex h-full min-w-[15.125rem] text-xl font-semibold leading-[24px] text-[#020202] cursor-pointer items-center justify-center rounded-[10px] bg-[linear-gradient(93deg,#FBD506_1.16%,#FFDD23_50.58%,#FBD506_100%)] shadow-[0_0_16px_0_rgba(255,193,7,0.60)] hover:shadow-[0_0_20px_0_rgba(255,171,27,0.80)] transition-shadow duration-200 !h-12 !w-[13.75rem] disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="pointer-events-none select-none"> {buying ? "Покупка..." : "Купить"} </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
