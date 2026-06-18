# DefaultChip

Blue default/info chip for neutral informational tags.

## Import

```tsx
import { DefaultChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
<DefaultChip type="chip" size="compact" showIcon={false}>Beta</DefaultChip>
```

## Props

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `children`.

Tokens: `--chips-blue-default`, `--chips-blue-hover`, `--chips-blue-selected`.

## Rules

- **Read-only labels:** `showIcon={false}`.
- **Selectable tags:** `showIcon` + `onClick` + `selected`. See [chips.md](./chips.md).

## Dashboard examples

```tsx
<DefaultChip type="tag" size="compact" showIcon={false}>Admin</DefaultChip>
```
