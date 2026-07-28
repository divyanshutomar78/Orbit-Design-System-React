# SuccessChip

Green status chip/tag for positive states (Active, Complete, Online).

## Import

```ts
import { SuccessChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<!-- Read-only status — no select icon -->
<orbit-success-chip type="chip" size="compact" [showIcon]="false" label="Active"></orbit-success-chip>

<!-- Selectable filter — icon + handler required -->
<orbit-success-chip
  type="chip"
  [selected]="filter === 'active'"
  label="Active"
  (click)="setFilter('active')"
></orbit-success-chip>
```

## Inputs

| Input | Type | Default |
|-------|------|---------|
| `type` | `'chip'` \| `'tag'` | `'chip'` |
| `size` | `'default'` \| `'compact'` | `'default'` |
| `selected` | boolean | `false` |
| `showIcon` | boolean | `true` |
| `iconSize` | `'small'` \| `'big'` | `'small'` |
| `label` | string | `'Text'` |

## Dashboard examples

```html
<!-- User status column (read-only) -->
<orbit-success-chip type="chip" size="compact" [showIcon]="false" label="Active"></orbit-success-chip>

<!-- Filter chip (selectable — icon + state required) -->
<orbit-success-chip
  type="chip"
  [selected]="filter === 'active'"
  label="Active"
  (click)="setFilter('active')"
></orbit-success-chip>
```

## Rules

- Use `size="compact"` in table rows and dense lists.
- Use `type="chip"` (pill) for status; `type="tag"` (squared) for category labels.
- **Read-only status:** `[showIcon]="false"` — do not show the circle/checkmark icon.
- **Selectable filter:** keep default `showIcon`, and wire `(click)` + `selected`. See [chips.md](./chips.md).
- Tokens: `--chips-success-default`, `--chips-success-hover`, `--chips-success-selected`.
