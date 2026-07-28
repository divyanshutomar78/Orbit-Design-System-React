# WarningChip

Amber/warning status chip for caution states (Pending, Review needed).

## Import

```ts
import { WarningChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-warning-chip type="chip" size="compact" [showIcon]="false" label="Pending"></orbit-warning-chip>
```

## Inputs

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `label`.

Tokens: `--chips-warning-default`, `--chips-warning-hover`, `--chips-warning-selected`.

## Rules

- **Read-only status:** `[showIcon]="false"`.
- **Selectable filter:** `showIcon` + `(click)` + `selected`. See [chips.md](./chips.md).

## Dashboard examples

```html
<orbit-warning-chip type="chip" size="compact" [showIcon]="false" label="Awaiting approval"></orbit-warning-chip>
```
