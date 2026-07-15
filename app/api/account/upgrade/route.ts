import { NextResponse } from "next/server"
import type { Skin, InventoryItem, ItemHistoryEntry, GameHistoryEntry, PendingUpgrade } from "@/lib/types"
import { getKey, keyStatus, normalizeCode, getAccount, patchAccount, ADMIN_ACCOUNT } from "@/lib/keys"
import { STATIC_SKINS, applyCatalogPrices, getCatalogAdditionalSkins, getCatalogPriceMeta, getCatalogPrices } from "@/lib/catalog-prices"
import { COMPENSATION_BONUS_ITEMS, DEFAULT_STATE } from "@/lib/default-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

type UpgradeBody = {
  stakeUids: string[]
  stakeBalance: number
  targetSkinId: string
  chance: number
}

async function authorize(code: string, request: Request): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  if (!code) return { ok: false, status: 400, reason: "empty" }

  if (code === ADMIN_ACCOUNT) {
    return { ok: true }
  }

  const key = await getKey(code)
  const status = keyStatus(key)
  if (status !== "active") return { ok: false, status: 403, reason: status }
  return { ok: true }
}

async function getCatalog(): Promise<Skin[]> {
  try {
    const [prices, meta] = await Promise.all([getCatalogPrices(), getCatalogPriceMeta()])
    const additions = await getCatalogAdditionalSkins(meta)
    return [...applyCatalogPrices(STATIC_SKINS, prices), ...additions, ...COMPENSATION_BONUS_ITEMS]
  } catch {
    return [...STATIC_SKINS, ...COMPENSATION_BONUS_ITEMS]
  }
}

function makeUid(): string {
  return `inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function makeHistoryId(): string {
  return `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = normalizeCode(searchParams.get("key"))
    const auth = await authorize(code, request)
    if (!auth.ok) return NextResponse.json({ error: auth.reason }, { status: auth.status })

    const body = (await request.json()) as UpgradeBody
    const { stakeUids = [], stakeBalance = 0, targetSkinId } = body
    if (!targetSkinId) return NextResponse.json({ error: "missing_target" }, { status: 400 })
    if (stakeUids.length === 0 && stakeBalance <= 0) return NextResponse.json({ error: "empty_stake" }, { status: 400 })

    const [account, catalog] = await Promise.all([
      getAccount(code),
      getCatalog(),
    ])
    if (account.pendingUpgrade) {
      return NextResponse.json({ error: "pending_upgrade", pendingUpgrade: account.pendingUpgrade }, { status: 409 })
    }
    const byId = new Map(catalog.map((skin) => [skin.id, skin]))
    const targetSkin = byId.get(targetSkinId)
    if (!targetSkin) return NextResponse.json({ error: "unknown_target_skin" }, { status: 400 })

    if (account.balance < stakeBalance) return NextResponse.json({ error: "insufficient_balance" }, { status: 400 })

    // Validate inventory stakes
    const stakeItems: InventoryItem[] = []
    const inventory = account.inventory || []
    for (const uid of stakeUids) {
      const item = inventory.find(i => i.uid === uid)
      if (!item) return NextResponse.json({ error: "item_not_found" }, { status: 400 })
      stakeItems.push(item)
    }

    let stakeSkinsTotal = 0
    for (const item of stakeItems) {
      const skin = byId.get(item.skinId)
      if (skin) stakeSkinsTotal += skin.price
    }

    const totalStake = stakeBalance + stakeSkinsTotal
    if (totalStake <= 0) return NextResponse.json({ error: "invalid_stake" }, { status: 400 })

    // Calculate chance exactly as client does
    let calculatedChance = totalStake / targetSkin.price
    calculatedChance = Math.max(0.001, Math.min(0.92, calculatedChance))
    
    // Forced outcome is a PER-KEY setting: read it from THIS account only, so one
    // key's "win"/"lose" mode never applies to another key (the reported bug).
    const predict = { ...DEFAULT_STATE.predict, ...(account.predict || {}) }
    const outcome = predict.outcome || "off"
    let isWin = false
    
    let currentLosses = predict.currentLosses || 0
    const targetLosses = predict.targetLosses || 3
    
    if (outcome === "win") {
      isWin = true
    } else if (outcome === "lose") {
      isWin = false
    } else if (outcome === "win_after_losses") {
      if (currentLosses >= targetLosses) {
        isWin = true
        currentLosses = 0 // Reset after win
      } else {
        isWin = false
        currentLosses += 1 // Increment after loss
      }
    } else {
      // "off" or default - honest random
      isWin = Math.random() < calculatedChance
    }

    const now = Date.now()
    const uniqueStakeUids = [...new Set(stakeUids)]
    if (uniqueStakeUids.length !== stakeUids.length) {
      return NextResponse.json({ error: "duplicate_stake" }, { status: 400 })
    }
    const nextInventory = inventory.filter(i => !uniqueStakeUids.includes(i.uid))
    const itemHistory = account.itemHistory || []
    
    // Add staked items to history as consumed
    const newHistoryEntries: ItemHistoryEntry[] = stakeItems.map(item => ({
      id: makeHistoryId(),
      skinId: item.skinId,
      action: "upgrade",
      date: now
    }))

    let wonItem: InventoryItem | undefined
    let wonItemHistory: ItemHistoryEntry | undefined
    if (isWin) {
      wonItem = { uid: makeUid(), skinId: targetSkin.id }
      wonItemHistory = {
        id: makeHistoryId(),
        skinId: targetSkin.id,
        action: "upgrade",
        date: now
      }
      newHistoryEntries.push(wonItemHistory)
    }

    const gameHistoryEntry: GameHistoryEntry = {
      id: makeHistoryId(),
      betPrice: totalStake,
      betSkinId: stakeItems.length > 0 ? stakeItems[0].skinId : "balance",
      targetPrice: targetSkin.price,
      targetSkinId: targetSkin.id,
      chance: Math.round(calculatedChance * 10000) / 100, // percentage like 35.50
      status: isWin ? "win" : "loss"
    }

    const pendingUpgrade: PendingUpgrade | null = isWin && wonItem
      ? {
          id: `upgrade-${now}-${Math.random().toString(36).slice(2, 9)}`,
          createdAt: now,
          targetSkinId: targetSkin.id,
          wonItem,
          itemHistoryEntries: newHistoryEntries,
          gameHistoryEntry,
        }
      : null

    // The win_after_losses counter is part of THIS key's predict, so persist it
    // back onto the account (never onto the shared global state).
    const predictChanged = currentLosses !== (predict.currentLosses || 0)

    const nextAccount = await patchAccount(code, {
      balance: Math.max(0, account.balance - stakeBalance),
      inventory: nextInventory,
      itemHistory: isWin ? itemHistory : [...newHistoryEntries, ...itemHistory].slice(0, 500),
      gameHistory: isWin ? (account.gameHistory || []) : [gameHistoryEntry, ...(account.gameHistory || [])].slice(0, 500),
      userUpgrades: isWin ? (account.userUpgrades || 0) : (account.userUpgrades || 0) + 1,
      pendingUpgrade,
      loggedIn: true,
      ...(predictChanged ? { predict: { ...predict, currentLosses } } : {}),
    })

    console.info("[account-upgrade]", {
      code,
      totalStake,
      targetPrice: targetSkin.price,
      isWin,
      outcome
    })

    return NextResponse.json({ 
      success: true, 
      account: nextAccount, 
      result: isWin ? 'win' : 'loss',
      pendingUpgrade,
      gameHistoryEntry,
    })
  } catch (error) {
    console.error("[account-upgrade]", error)
    return NextResponse.json({ error: "upgrade_failed" }, { status: 500 })
  }
}
