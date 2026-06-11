# Custom Percentage Filter Design

## Problem

The upgrader's percentage quick filters currently convert a selected chance into
a fixed range of plus or minus four percentage points. For a custom value of
10%, that range becomes 6-14%, so skins with a chance near 6% can appear as
matching results.

The selected percentage should instead act as an exact ranking target. Skins
whose calculated chance is closest to that target must appear first.

## Scope

This change affects percentage quick filters, including both default values
(35%, 55%, and 75%) and custom values saved in the upgrader settings.

Multiplier quick filters such as x2, x4, and x8 keep their existing behavior.
Manual catalog search, price filters, and sorting keep their existing behavior
when no percentage quick filter is active.

## Behavior

When the user clicks a percentage quick-filter button:

1. Calculate each eligible skin's chance using the same formula as the upgrade:

   `chance = inputValue / skin.price * WIN_FACTOR`

2. Exclude skins outside the currently supported upgrade chance range of
   1-80%.
3. Sort eligible skins by absolute distance from the selected target:

   `distance = abs(chance * 100 - targetPercentage)`

4. Use price and stable source order as deterministic tie-breakers.
5. Display the sorted catalog from the closest match to the furthest match.
6. Automatically select the first skin in that sorted list.

For a selected value of 10%, a skin with a 10.1% chance must be shown before a
skin with a 9.5% chance, and both must be shown before a skin with a 6% chance.

## State And Data Flow

`UpgradeSection` will store the active percentage target separately from the
existing external price range. Clicking a percentage button sets this target
and selects the closest eligible skin.

`CatalogPanel` will receive the active percentage target and input value. When
the target is present, it will rank the currently searchable catalog results by
chance distance instead of the normal price sort.

Actions that explicitly replace quick-filter behavior, such as manually
selecting a target skin or clearing the upgrade selection, will clear the
active percentage target. Clicking a multiplier button will also clear it and
continue using the existing multiplier price range.

## Edge Cases

- If the input value is zero, retain the current validation message and do not
  activate percentage ranking.
- Clamp custom percentage settings to the supported 1-80% range before saving
  or applying them.
- If there are no eligible skins, clear the selected target and show no
  percentage-ranked result.
- Decimal custom percentages remain supported.
- Changing the selected input items after applying a percentage filter should
  recalculate ranking against the new input value while the filter remains
  active.

## Verification

- A custom 10% button ranks the closest available chance first and does not
  prioritize a 6% skin over a closer result.
- Default 35%, 55%, and 75% buttons use the same closest-first behavior.
- The automatically selected target is the first ranked skin.
- Multiplier filters retain their existing price-range behavior.
- Clearing or manually overriding the quick filter restores normal catalog
  sorting and filtering.
- TypeScript, lint, and production build checks pass.
