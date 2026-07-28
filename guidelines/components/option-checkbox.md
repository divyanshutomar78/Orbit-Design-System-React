# OptionCheckbox

Checkbox row with label. Use in forms and selection lists — **not inside ListingItem icon slots**.

## Import

```ts
import { OptionCheckboxComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-option-checkbox state="on" label="Email me updates" (checkedChange)="handleChange($event)"></orbit-option-checkbox>
<orbit-option-checkbox state="partial" label="Select all"></orbit-option-checkbox>
<orbit-option-checkbox state="off" label="Option A"></orbit-option-checkbox>
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | string | `'Option'` | Visible label text |
| `state` | `'off'` \| `'on'` \| `'partial'` | `'off'` | Visual state |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` | Interaction state |
| `checked` | boolean | — | Alias for `state="on"` |
| `indeterminate` | boolean | — | Alias for `state="partial"` |
| `useTextSlot` / `[orbitTextSlot]` | projected content | — | Replace label area |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Checkbox icon frame |

## Dashboard examples

```html
<!-- Table select-all header -->
<orbit-option-checkbox
  [state]="allSelected ? 'on' : someSelected ? 'partial' : 'off'"
  label="Select all"
  (checkedChange)="toggleAll($event)"
></orbit-option-checkbox>

<!-- Row checkbox — hide label, keep aria-label -->
<orbit-option-checkbox label="" aria-label="Select Alice Fontaine" iconSize="small"></orbit-option-checkbox>
```

## Rules

- **Never** pass full `orbit-option-checkbox` into `orbit-listing-item` `[orbitLeftIcon]` — it gets crushed into a 24px icon frame.
- For table rows, place checkbox beside the row in a flex wrapper (see `listing-item.md`).
- Use `label=""` + `aria-label` for icon-only checkboxes in tables.
