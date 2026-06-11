# Consume Upgrade Input Items Design

## Problem

When an upgrade succeeds, the target skin is added to the user's inventory, but
the inventory items used as the upgrade input remain there. The losing path
already removes those items.

An upgrade must consume every selected inventory item as soon as the user starts
a valid upgrade, regardless of whether the eventual result is a win or a loss.
The consumed items remain visible only in the locked left-side bet card while
the animation runs.

## Scope

This change affects inventory-backed upgrades in `UpgradeSection`.

It does not change upgrade chance calculation, animations, compensation rewards,
balance-only inputs, shop purchases, item selection limits, or game history.

## Behavior

When the user presses `Прокачать` and the existing validations pass:

1. Capture the unique `uid` of every selected inventory item used for the
   upgrade.
2. Copy the selected item data into the locked left-side bet card.
3. Immediately remove exactly those inventory entries from persisted state.
4. Keep rendering the copied items in the left-side bet card until the upgrade
   animation completes.
5. On a win, add one new inventory entry for the selected target skin.
6. On a loss, add no target skin. Existing compensation behavior remains
   unchanged.
7. Deduct the balance portion of the input once and increment upgrade counters
   once.

If multiple inventory entries refer to the same skin, only the selected
instances are consumed. Unselected instances with the same `skinId` remain in
the inventory.

## State Update

The upgrade-start path will remove the captured input items from state before
the wheel animation begins:

`inventory = previousInventory excluding selectedUids`

The locked left-side card stores the selected inventory item objects before that
update. Its display does not depend on the items still existing in
`state.inventory`.

The winning result adds the target item to the already-consumed inventory. The
losing result does not perform a second removal. Balance deduction and counter
updates happen exactly once in the result flow.

The selected input `uid` values must be captured when the upgrade starts so the
operation is based on the locked bet rather than later UI state.

## Error Handling

- The existing login, target, input value, and balance validations remain in
  place.
- While an upgrade animation is active, the existing disabled controls prevent
  starting a second upgrade with the same items.
- The immediate removal runs only after all synchronous validations pass, so an
  invalid click does not consume inventory.
- Filtering by `uid` does not remove unselected instances of the same skin.

## Verification

- Immediately after a valid click on `Прокачать`, all selected items disappear
  from the inventory list and persisted inventory state.
- During the animation, the consumed items remain visible in the locked
  left-side bet card.
- A winning upgrade adds one target item without restoring the consumed items.
- A losing upgrade does not run a second removal and does not restore the
  consumed items.
- If selected and unselected inventory entries have the same `skinId`, only the
  selected `uid` values are removed.
- A balance-only portion is deducted exactly once on either result.
- Upgrade counters increment exactly once on either result.
- Win, loss, fast-loss compensation, and normal compensation flows still finish
  and clear their selection state correctly.
- TypeScript, lint, and production build checks pass.
