# DefaultChip

Blue default/info chip for neutral informational tags.

## Import

```ts
import { DefaultChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-default-chip type="chip" size="compact" [showIcon]="false" label="Beta"></orbit-default-chip>
```

## Inputs

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `label`.

Tokens: `--chips-blue-default`, `--chips-blue-hover`, `--chips-blue-selected`.

## Rules

- **Read-only labels:** `[showIcon]="false"`.
- **Selectable tags:** `showIcon` + `(click)` + `selected`. See [chips.md](./chips.md).

## Dashboard examples

```html
<orbit-default-chip type="tag" size="compact" [showIcon]="false" label="Admin"></orbit-default-chip>
```
