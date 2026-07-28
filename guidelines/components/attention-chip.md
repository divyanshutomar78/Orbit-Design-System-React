# AttentionChip

Attention/info status chip (note: token name uses `--chips-attemtion-*` spelling from Figma).

## Import

```ts
import { AttentionChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-attention-chip type="chip" size="compact" [showIcon]="false" label="Needs review"></orbit-attention-chip>
```

## Inputs

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `label`.

Tokens: `--chips-attemtion-default`, `--chips-attemtion-hover`, `--chips-attemtion-selected`.

## Rules

- **Read-only status:** `[showIcon]="false"`. See [chips.md](./chips.md).

## Dashboard examples

```html
<orbit-attention-chip type="chip" size="compact" [showIcon]="false" label="Draft"></orbit-attention-chip>
```
