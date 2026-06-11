# AttentionChip

Attention/info status chip (note: token name uses `--chips-attemtion-*` spelling from Figma).

## Import

```tsx
import { AttentionChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<AttentionChip type="chip" size="compact">Needs review</AttentionChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-attemtion-default`, `--chips-attemtion-hover`, `--chips-attemtion-selected`.

## Dashboard examples

```tsx
<AttentionChip type="chip" size="compact">Draft</AttentionChip>
```
