# WarningChip

Amber/warning status chip for caution states (Pending, Review needed).

## Import

```tsx
import { WarningChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<WarningChip type="chip" size="compact" showIcon={false}>Pending</WarningChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-warning-default`, `--chips-warning-hover`, `--chips-warning-selected`.

## Rules

- **Read-only status:** `showIcon={false}`.
- **Selectable filter:** `showIcon` + `onClick` + `selected`. See [chips.md](./chips.md).

## Dashboard examples

```tsx
<WarningChip type="chip" size="compact" showIcon={false}>Awaiting approval</WarningChip>
```
