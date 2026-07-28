# LabelValueHorizontal

Inline label and value pairs. Use for table cells, metadata rows, and compact data display.

## Import

```ts
import { LabelValueHorizontalComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-label-value-horizontal layout="L + V" label="Gate" value="B12"></orbit-label-value-horizontal>
<orbit-label-value-horizontal layout="V + L" label="ETA" value="14:30"></orbit-label-value-horizontal>
<orbit-label-value-horizontal layout="L" label="Owner"></orbit-label-value-horizontal>
<orbit-label-value-horizontal layout="V" value="42" [big]="true"></orbit-label-value-horizontal>
```

## Layouts

| `layout` | Renders |
|----------|---------|
| `'L + V'` | Label then value (default) |
| `'V + L'` | Value then label |
| `'L+V+L'` | Label+value group, then secondary label |
| `'V'` | Value only |
| `'L'` | Label only |

## Inputs

| Input | Type | Default |
|-------|------|---------|
| `layout` | see above | `'L + V'` |
| `label` / `value` | string | `'Label'` / `'Value'` |
| `secondaryLabel` | string | `'Label2'` |
| `big` | boolean | `false` — Title 3 typography for value |
| `[orbitLabelSlot]` / `[orbitValueSlot]` | projected content | Custom slots |

## Dashboard examples

```html
<!-- Table column — role -->
<orbit-label-value-horizontal layout="L" label="Owner"></orbit-label-value-horizontal>

<!-- Table column — last seen -->
<orbit-label-value-horizontal layout="L" label="Just now"></orbit-label-value-horizontal>

<!-- KPI inline -->
<orbit-label-value-horizontal layout="L + V" label="Revenue" value="$12,400"></orbit-label-value-horizontal>

<!-- Big metric -->
<orbit-label-value-horizontal layout="V" value="128" [big]="true"></orbit-label-value-horizontal>
```

## Rules

- Use `layout="L"` for single text columns (role, date, status text without chip).
- Use `layout="L + V"` for label:value pairs on the same line.
- Prefer `orbit-label-value-vertical` when label should sit below value (name + email).
