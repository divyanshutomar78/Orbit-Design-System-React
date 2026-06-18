# CriticalChip

Red status chip for errors and critical states (Failed, Offline, Error).

## Import

```tsx
import { CriticalChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<CriticalChip type="chip" size="compact" showIcon={false}>Failed</CriticalChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-critical-default`, `--chips-critical-hover`, `--chips-critical-selected`.

## Rules

- **Read-only status:** `showIcon={false}`. See [chips.md](./chips.md).

## Dashboard examples

```tsx
<CriticalChip type="chip" size="compact" showIcon={false}>Suspended</CriticalChip>
```
