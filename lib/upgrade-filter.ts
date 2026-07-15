import type { Skin } from "./types"

export const UPGRADE_WIN_FACTOR = 0.92
// Minimum selectable chance is 0.1% (was 1%).
export const MIN_UPGRADE_CHANCE = 0.001
export const MAX_UPGRADE_CHANCE = 0.8

export function clampPercentageTarget(value: number) {
  if (!Number.isFinite(value)) return 0.1
  return Math.min(80, Math.max(0.1, value))
}

export function getUpgradeChance(inputValue: number, skinPrice: number) {
  if (inputValue <= 0 || skinPrice <= 0) return 0
  return (inputValue / skinPrice) * UPGRADE_WIN_FACTOR
}

export function isEligibleUpgradeChance(chance: number) {
  return chance >= MIN_UPGRADE_CHANCE && chance <= MAX_UPGRADE_CHANCE
}

export function rankSkinsByPercentageTarget(
  skins: Skin[],
  inputValue: number,
  targetPercentage: number,
) {
  const clampedTarget = clampPercentageTarget(targetPercentage)

  return skins
    .map((skin, index) => ({
      skin,
      index,
      chance: getUpgradeChance(inputValue, skin.price),
    }))
    .filter(({ chance }) => isEligibleUpgradeChance(chance))
    .sort((a, b) => {
      const chanceDistance =
        Math.abs(a.chance * 100 - clampedTarget) -
        Math.abs(b.chance * 100 - clampedTarget)

      if (chanceDistance !== 0) return chanceDistance
      if (a.skin.price !== b.skin.price) return a.skin.price - b.skin.price
      return a.index - b.index
    })
    .map(({ skin }) => skin)
}
