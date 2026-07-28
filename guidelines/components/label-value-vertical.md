# LabelValueVertical

Stacked label and value. Primary choice for user identity cells (name + email).

## Import

```ts
import { LabelValueVerticalComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-label-value-vertical layout="L+V" label="Role" value="Owner"></orbit-label-value-vertical>
<orbit-label-value-vertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io"></orbit-label-value-vertical>
<orbit-label-value-vertical layout="L + V + L" label="Unit" value="kg" secondaryLabel="Metric"></orbit-label-value-vertical>
```

## Layouts

| `layout` | Renders |
|----------|---------|
| `'L+V'` | Label on top, value below (default) |
| `'V + L'` | Value on top, label below — **use for name + email** |
| `'L + V + L'` | Label, value, secondary label |

## Inputs

| Input | Type | Default |
|-------|------|---------|
| `layout` | see above | `'L+V'` |
| `label` / `value` | string | `'Label'` / `'Value'` |
| `secondaryLabel` | string | `'Label'` |
| `big` | boolean | `false` |
| `[orbitLabelSlot]` / `[orbitValueSlot]` | projected content | Custom slots |

## Dashboard examples

```html
<!-- User cell — name bold on top, email below -->
<orbit-label-value-vertical
  layout="V + L"
  value="Alice Fontaine"
  label="alice@orbit.io"
></orbit-label-value-vertical>

<!-- Stat card -->
<orbit-label-value-vertical layout="L+V" label="Active users" value="1,284"></orbit-label-value-vertical>

<!-- With big value -->
<orbit-label-value-vertical layout="L+V" label="Total flights" value="42" [big]="true"></orbit-label-value-vertical>
```

## Side-by-side columns (grid)

`orbit-label-value-vertical` is a **single stacked cell** (label above value). It does **not** lay out siblings horizontally. To show multiple cells in one row — stat bars, flight info, dashboard metrics — wrap them in a **grid container**.

### Required pattern

1. Parent wrapper: **`display: grid`** — always set this explicitly.
2. Column template: `grid-template-columns: repeat(N, minmax(0, 1fr))` for equal columns.
3. Gap: use `--gap-m` / `--gap-l` tokens.
4. Child cells: `min-width: 0` on each `.orbit-label-value-vertical` so text truncates instead of breaking the grid.

```html
<div class="stats-row stats-row--four">
  <orbit-label-value-vertical label="Stage" value="In flight"></orbit-label-value-vertical>
  <orbit-label-value-vertical label="Call Sign" value="AAL532"></orbit-label-value-vertical>
  <orbit-label-value-vertical label="Aircraft" value="B737-8"></orbit-label-value-vertical>
  <orbit-label-value-vertical label="Registration" value="N823NN"></orbit-label-value-vertical>
</div>
```

```css
.stats-row {
  display: grid; /* required — grid-template-columns alone does nothing without this */
  width: 100%;
  gap: calc(var(--gap-m) * 1px) calc(var(--gap-l) * 1px);
  align-items: start;
}

.stats-row--four {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stats-row--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.stats-row .orbit-label-value-vertical {
  min-width: 0;
}
```

### Alignment within a row

| Column position | Wrapper class pattern |
|-----------------|------------------------|
| First / default | Default — `align-items: flex-start` on the component |
| Center | `align-items: center; text-align: center` on wrapper + `.orbit-label-value-vertical__slot` |
| Last | `align-items: flex-end; text-align: right` on wrapper + slots |

Use a **3-column grid** for left | center | right stat rows (e.g. Departure FOB · Current UTC · Arrival FOB).

### Route / mixed rows

When one row mixes endpoints with a center widget (e.g. airport codes + progress indicator):

```css
.route-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: calc(var(--gap-m) * 1px);
}
```

Use `orbit-label-value-vertical` with `layout="L + V + L"` for airport columns (date · code · STD/STA).

### Grouped rows (related cells)

When several cells in a grid row **belong to one logical block** (e.g. flight identity: stage, call sign, aircraft, registration), wrap the grid in a **group container** with a bottom border to separate it from the next section.

```html
<section class="stats-group" aria-label="Flight identity">
  <div class="stats-row stats-row--four">
    <orbit-label-value-vertical label="Stage" value="In flight"></orbit-label-value-vertical>
    <orbit-label-value-vertical label="Call Sign" value="AAL532"></orbit-label-value-vertical>
    <orbit-label-value-vertical label="Aircraft" value="B737-8"></orbit-label-value-vertical>
    <orbit-label-value-vertical label="Registration" value="N823NN"></orbit-label-value-vertical>
  </div>
</section>

<!-- Next section — route, metrics, etc. -->
```

```css
.stats-group {
  /* Full-bleed border — cancel dialog
     body padding so the line touches modal edges */
  margin-inline: calc(var(--dialog-body-padding-inline) * -1px);
  padding-inline: calc(var(--dialog-body-padding-inline) * 1px);
  padding-bottom: calc(var(--gap-l) * 1px);
  border-bottom: calc(var(--components-input-button-select-border-width) * 1px) solid
    var(--border-secondary);
}
```

Dialog body must define `--dialog-body-padding-inline` to match its horizontal padding (typically `--gap-m`).

Rules:

1. **One grid per group** — the group wraps a single `stats-row`, not individual cells.
2. **Border on the group**, not on each cell — separates the whole block from content below.
3. Use `--border-secondary` and `--gap-l` padding below the grid (same weight as dialog section dividers).
4. Add `aria-label` on the group when the block has semantic meaning (identity, fuel, position).
5. **Full-bleed borders** — section dividers inside a padded dialog body must span edge-to-edge like the modal header border. Use negative `margin-inline` equal to body padding; restore content inset with matching `padding-inline` on the group. See [styles.md](../styles.md#dialog-body-section-dividers).

## Anti-patterns

| Wrong | Right | Why |
|-------|-------|-----|
| Multiple `orbit-label-value-vertical` in a flex column with no grid | Grid wrapper with `display: grid` | Each cell stacks vertically by default |
| `grid-template-columns` without `display: grid` | Both on the parent wrapper | Columns never apply — common bug |
| Expecting `orbit-label-value-vertical` to auto-flow horizontally | Explicit grid or flex row on **parent** | Component is one cell only |
| Wide labels breaking layout | `min-width: 0` on grid children | Prevents overflow in `minmax(0, 1fr)` columns |
| Related cells with no visual grouping | `stats-group` wrapper + bottom border | Reader cannot tell which stats belong together |
| Border on each cell instead of the group | Single border under the whole grid row | Fragments the block visually |
| Section border inset inside padded dialog body | Full-bleed: negative `margin-inline` + matching `padding-inline` | Border must touch modal edges like header |

## Rules

- `V + L` = primary text (value slot) on top, secondary (label slot) below.
- Use inside `orbit-listing-item` `[orbitLabelValue]` for custom user cells.
- Don't add custom font-weight — value uses `--text-primary`, label uses `--text-secondary`.
- **Multiple cells in one row** → grid wrapper with `display: grid` + column template — see [Side-by-side columns](#side-by-side-columns-grid).
- **Related cells in one row** → wrap the grid in a `stats-group` with bottom border — see [Grouped rows](#grouped-rows-related-cells).
