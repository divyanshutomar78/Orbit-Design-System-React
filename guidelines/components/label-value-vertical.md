# LabelValueVertical

Stacked label and value. Primary choice for user identity cells (name + email).

## Import

```tsx
import { LabelValueVertical } from 'orbit-ds-components';
```

## Basic usage

```tsx
<LabelValueVertical layout="L+V" label="Role" value="Owner" />
<LabelValueVertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io" />
<LabelValueVertical layout="L + V + L" label="Unit" value="kg" secondaryLabel="Metric" />
```

## Layouts

| `layout` | Renders |
|----------|---------|
| `'L+V'` | Label on top, value below (default) |
| `'V + L'` | Value on top, label below — **use for name + email** |
| `'L + V + L'` | Label, value, secondary label |

## Props

| Prop | Type | Default |
|------|------|---------|
| `layout` | see above | `'L+V'` |
| `label` / `value` | ReactNode | `'Label'` / `'Value'` |
| `secondaryLabel` | ReactNode | `'Label'` |
| `big` | boolean | `false` |
| `labelSlot` / `valueSlot` | ReactNode | Custom slots |

## Dashboard examples

```tsx
// User cell — name bold on top, email below
<LabelValueVertical
  layout="V + L"
  value="Alice Fontaine"
  label="alice@orbit.io"
/>

// Stat card
<LabelValueVertical layout="L+V" label="Active users" value="1,284" />

// With big value
<LabelValueVertical layout="L+V" label="Total flights" value="42" big />
```

## Side-by-side columns (grid)

`LabelValueVertical` is a **single stacked cell** (label above value). It does **not** lay out siblings horizontally. To show multiple cells in one row — stat bars, flight info, dashboard metrics — wrap them in a **grid container**.

### Required pattern

1. Parent wrapper: **`display: grid`** — always set this explicitly.
2. Column template: `grid-template-columns: repeat(N, minmax(0, 1fr))` for equal columns.
3. Gap: use `--gap-m` / `--gap-l` tokens.
4. Child cells: `min-width: 0` on each `.orbit-label-value-vertical` so text truncates instead of breaking the grid.

```tsx
<div className="stats-row stats-row--four">
  <LabelValueVertical label="Stage" value="In flight" />
  <LabelValueVertical label="Call Sign" value="AAL532" />
  <LabelValueVertical label="Aircraft" value="B737-8" />
  <LabelValueVertical label="Registration" value="N823NN" />
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

Use `LabelValueVertical` with `layout="L + V + L"` for airport columns (date · code · STD/STA).

### Grouped rows (related cells)

When several cells in a grid row **belong to one logical block** (e.g. flight identity: stage, call sign, aircraft, registration), wrap the grid in a **group container** with a bottom border to separate it from the next section.

```tsx
<section className="stats-group" aria-label="Flight identity">
  <div className="stats-row stats-row--four">
    <LabelValueVertical label="Stage" value="In flight" />
    <LabelValueVertical label="Call Sign" value="AAL532" />
    <LabelValueVertical label="Aircraft" value="B737-8" />
    <LabelValueVertical label="Registration" value="N823NN" />
  </div>
</section>

{/* Next section — route, metrics, etc. */}
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
| Multiple `LabelValueVertical` in a flex column with no grid | Grid wrapper with `display: grid` | Each cell stacks vertically by default |
| `grid-template-columns` without `display: grid` | Both on the parent wrapper | Columns never apply — common bug |
| Expecting `LabelValueVertical` to auto-flow horizontally | Explicit grid or flex row on **parent** | Component is one cell only |
| Wide labels breaking layout | `min-width: 0` on grid children | Prevents overflow in `minmax(0, 1fr)` columns |
| Related cells with no visual grouping | `stats-group` wrapper + bottom border | Reader cannot tell which stats belong together |
| Border on each cell instead of the group | Single border under the whole grid row | Fragments the block visually |
| Section border inset inside padded dialog body | Full-bleed: negative `margin-inline` + matching `padding-inline` | Border must touch modal edges like header |

## Rules

- `V + L` = primary text (value slot) on top, secondary (label slot) below.
- Use inside `ListingItem` `labelValue` prop for custom user cells.
- Don't add custom font-weight — value uses `--text-primary`, label uses `--text-secondary`.
- **Multiple cells in one row** → grid wrapper with `display: grid` + column template — see [Side-by-side columns](#side-by-side-columns-grid).
- **Related cells in one row** → wrap the grid in a `stats-group` with bottom border — see [Grouped rows](#grouped-rows-related-cells).
