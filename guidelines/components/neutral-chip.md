# NeutralChip

Neutral grey chip for filters, tags, and non-semantic labels.

## Import

```tsx
import { NeutralChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
{/* Selectable filter — icon appropriate */}
<NeutralChip type="chip" size="default" selected={tab === 'all'} onClick={() => setTab('all')}>
  All
</NeutralChip>

{/* Read-only tag */}
<NeutralChip type="chip" size="compact" showIcon={false}>Category</NeutralChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-neutral-default`, `--chips-neutral-hover`, `--chips-neutral-selected`.

## Dashboard examples

```tsx
// Filter bar
<div style={{ display: 'flex', gap: 'calc(var(--gap-xs) * 1px)' }}>
  <NeutralChip selected={tab === 'all'} onClick={() => setTab('all')}>All</NeutralChip>
  <NeutralChip selected={tab === 'mine'} onClick={() => setTab('mine')}>Mine</NeutralChip>
</div>
```

## When to use

| Chip | When |
|------|------|
| `NeutralChip` | Filters, categories, non-status tags |
| `SuccessChip` | Positive status |
| `WarningChip` | Caution status |
| `CriticalChip` | Error / blocked status |

## Rules

- **Filters:** default `showIcon` + `onClick` + `selected`.
- **Read-only tags:** `showIcon={false}`. See [chips.md](./chips.md).
