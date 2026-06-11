# WarningChip

Amber/warning status chip for caution states (Pending, Review needed).

## Import

```tsx
import { WarningChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<WarningChip type="chip" size="compact">Pending</WarningChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-warning-default`, `--chips-warning-hover`, `--chips-warning-selected`.

## Dashboard examples

```tsx
<WarningChip type="chip" size="compact">Awaiting approval</WarningChip>
```
