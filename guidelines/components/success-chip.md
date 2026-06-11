# SuccessChip

Green status chip/tag for positive states (Active, Complete, Online).

## Import

```tsx
import { SuccessChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<SuccessChip type="chip" size="compact">Active</SuccessChip>
<SuccessChip type="tag" selected>Verified</SuccessChip>
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
// User status column
<SuccessChip type="chip" size="compact">Active</SuccessChip>

// Filter chip (selectable)
<SuccessChip type="chip" selected={filter === 'active'} onClick={() => setFilter('active')}>
  Active
</SuccessChip>
```

## Rules

- Use `size="compact"` in table rows and dense lists.
- Use `type="chip"` (pill) for status; `type="tag"` (squared) for category labels.
- Tokens: `--chips-success-default`, `--chips-success-hover`, `--chips-success-selected`.
