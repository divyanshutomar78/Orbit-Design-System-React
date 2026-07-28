# CriticalChip

Red status chip for errors and critical states (Failed, Offline, Error).

## Import

```ts
import { CriticalChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-critical-chip type="chip" size="compact" [showIcon]="false" label="Failed"></orbit-critical-chip>
```

## Inputs

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `label`.

Tokens: `--chips-critical-default`, `--chips-critical-hover`, `--chips-critical-selected`.

## Rules

- **Read-only status:** `[showIcon]="false"`. See [chips.md](./chips.md).

## Dashboard examples

```html
<orbit-critical-chip type="chip" size="compact" [showIcon]="false" label="Suspended"></orbit-critical-chip>
```
