# AttentionChip

Attention/info status chip (note: token name uses `--chips-attemtion-*` spelling from Figma).

## Import

```tsx
import { AttentionChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<AttentionChip type="chip" size="compact" showIcon={false}>Needs review</AttentionChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-attemtion-default`, `--chips-attemtion-hover`, `--chips-attemtion-selected`.

## Rules

- **Read-only status:** `showIcon={false}`. See [chips.md](./chips.md).

## Dashboard examples

```tsx
<AttentionChip type="chip" size="compact" showIcon={false}>Draft</AttentionChip>
```
