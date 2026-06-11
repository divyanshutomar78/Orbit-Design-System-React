# NeutralChip

Neutral grey chip for filters, tags, and non-semantic labels.

## Import

```tsx
import { NeutralChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<NeutralChip type="chip" size="default">All</NeutralChip>
<NeutralChip type="chip" selected>Selected filter</NeutralChip>
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
