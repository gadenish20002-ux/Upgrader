# Consume Upgrade Input Items Design

## Problem

When an upgrade succeeds, the target skin is added to the user's inventory, but
the inventory items used as the upgrade input remain there. The losing path
already removes those items.

An upgrade must consume every selected inventory item regardless of whether the
result is a win or a loss.

## Scope

This change affects inventory-backed upgrades in `UpgradeSection`.

It does not change upgrade chance calculation, animations, compensation rewards,
balance-only inputs, shop purchases, item selection limits, or game history.

## Behavior

When an upgrade finishes:

1. Capture the unique `uid` of every selected inventory item used for the
   upgrade.
2. Remove exactly those inventory entries for both winning and losing results.
3. On a win, add one new inventory entry for the selected target skin.
4. On a loss, add no target skin. Existing compensation behavior remains
   unchanged.
5. Deduct the balance portion of the input once and increment upgrade counters
   once.

If multiple inventory entries refer to the same skin, only the selected
instances are consumed. Unselected instances with the same `skinId` remain in
the inventory.

## State Update

The winning path will perform inventory consumption and reward insertion in the
same `setState` update:

`inventory = [wonItem, ...previousInventory excluding selectedUids]`

The losing path will use the same `uid`-based filtering rule without inserting
a target item.

Keeping each result's inventory, balance, and counter changes in one state
update prevents an intermediate state from being synchronized where the reward
has been added but the input items have not been removed.

The selected input `uid` values must be captured when the upgrade starts so the
operation is based on the locked bet rather than later UI state.

## Error Handling

- The existing login, target, input value, and balance validations remain in
  place.
- While an upgrade animation is active, the existing disabled controls prevent
  starting a second upgrade with the same items.
- Filtering by `uid` is idempotent: an already missing selected item is not
  recreated and does not cause an unrelated item to be removed.

## Verification

- A winning upgrade with one selected item removes that item and adds one target
  item.
- A winning upgrade with several selected items removes all selected items and
  adds one target item.
- A losing upgrade continues to remove all selected items.
- If selected and unselected inventory entries have the same `skinId`, only the
  selected `uid` values are removed.
- A balance-only portion is deducted exactly once on either result.
- Upgrade counters increment exactly once on either result.
- Win, loss, fast-loss compensation, and normal compensation flows still finish
  and clear their selection state correctly.
- TypeScript, lint, and production build checks pass.
