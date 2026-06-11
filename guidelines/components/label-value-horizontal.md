# LabelValueHorizontal

Inline label and value pairs. Use for table cells, metadata rows, and compact data display.

## Import

```tsx
import { LabelValueHorizontal } from 'orbit-ds-components';
```

## Basic usage

```tsx
<LabelValueHorizontal layout="L + V" label="Gate" value="B12" />
<LabelValueHorizontal layout="V + L" label="ETA" value="14:30" />
<LabelValueHorizontal layout="L" label="Owner" />
<LabelValueHorizontal layout="V" value="42" big />
```

## Layouts

| `layout` | Renders |
|----------|---------|
| `'L + V'` | Label then value (default) |
| `'V + L'` | Value then label |
| `'L+V+L'` | Label+value group, then secondary label |
| `'V'` | Value only |
| `'L'` | Label only |

## Props

| Prop | Type | Default |
|------|------|---------|
| `layout` | see above | `'L + V'` |
| `label` / `value` | ReactNode | `'Label'` / `'Value'` |
| `secondaryLabel` | ReactNode | `'Label2'` |
| `big` | boolean | `false` — Title 3 typography for value |
| `labelSlot` / `valueSlot` | ReactNode | Custom slots |

## Dashboard examples

```tsx
// Table column — role
<LabelValueHorizontal layout="L" label="Owner" />

// Table column — last seen
<LabelValueHorizontal layout="L" label="Just now" />

// KPI inline
<LabelValueHorizontal layout="L + V" label="Revenue" value="$12,400" />

// Big metric
<LabelValueHorizontal layout="V" value="128" big />
```

## Rules

- Use `layout="L"` for single text columns (role, date, status text without chip).
- Use `layout="L + V"` for label:value pairs on the same line.
- Prefer `LabelValueVertical` when label should sit below value (name + email).
