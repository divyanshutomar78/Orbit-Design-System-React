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

## Rules

- `V + L` = primary text (value slot) on top, secondary (label slot) below.
- Use inside `ListingItem` `labelValue` prop for custom user cells.
- Don't add custom font-weight — value uses `--text-primary`, label uses `--text-secondary`.
