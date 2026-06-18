# SuccessChip

Green status chip/tag for positive states (Active, Complete, Online).

## Import

```tsx
import { SuccessChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
{/* Read-only status — no select icon */}
<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>

{/* Selectable filter — icon + handler required */}
<SuccessChip type="chip" selected={filter === 'active'} onClick={() => setFilter('active')}>
  Active
</SuccessChip>
```

## Props

| Prop | Type | Default |
|------|------|---------|
| `type` | `'chip'` \| `'tag'` | `'chip'` |
| `size` | `'default'` \| `'compact'` | `'default'` |
| `selected` | boolean | `false` |
| `showIcon` | boolean | `true` |
| `iconSize` | `'small'` \| `'big'` | `'small'` |
| `children` | ReactNode | `'Text'` |

## Dashboard examples

```tsx
// User status column (read-only)
<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>

// Filter chip (selectable — icon + state required)
<SuccessChip type="chip" selected={filter === 'active'} onClick={() => setFilter('active')}>
  Active
</SuccessChip>
```

## Rules

- Use `size="compact"` in table rows and dense lists.
- Use `type="chip"` (pill) for status; `type="tag"` (squared) for category labels.
- **Read-only status:** `showIcon={false}` — do not show the circle/checkmark icon.
- **Selectable filter:** keep default `showIcon`, and wire `onClick` + `selected`. See [chips.md](./chips.md).
- Tokens: `--chips-success-default`, `--chips-success-hover`, `--chips-success-selected`.
