# OptionCheckbox

Checkbox row with label. Use in forms and selection lists — **not inside ListingItem icon slots**.

## Import

```tsx
import { OptionCheckbox } from 'orbit-ds-components';
```

## Basic usage

```tsx
<OptionCheckbox state="on" label="Email me updates" onChange={handleChange} />
<OptionCheckbox state="partial" label="Select all" />
<OptionCheckbox state="off" label="Option A" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | ReactNode | `'Option'` | Visible label text |
| `state` | `'off'` \| `'on'` \| `'partial'` | `'off'` | Visual state |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` | Interaction state |
| `checked` | boolean | — | Alias for `state="on"` |
| `indeterminate` | boolean | — | Alias for `state="partial"` |
| `textSlot` | ReactNode | — | Replace label area |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Checkbox icon frame |

## Dashboard examples

```tsx
// Table select-all header
<OptionCheckbox
  state={allSelected ? 'on' : someSelected ? 'partial' : 'off'}
  label="Select all"
  onChange={toggleAll}
/>

// Row checkbox — hide label, keep aria-label
<OptionCheckbox label="" aria-label="Select Alice Fontaine" iconSize="small" />
```

## Rules

- **Never** pass full `OptionCheckbox` into `ListingItem` `leftIcon` — it gets crushed into a 24px icon frame.
- For table rows, place checkbox beside the row in a flex wrapper (see `listing-item.md`).
- Use `label=""` + `aria-label` for icon-only checkboxes in tables.
