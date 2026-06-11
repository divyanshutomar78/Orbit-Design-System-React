# IconFrame

Sizes custom SVG icons to Orbit platform tokens. Use when placing icons in Button slots or custom UI.

## Import

```tsx
import { IconFrame } from 'orbit-ds-components';
```

## Basic usage

```tsx
<IconFrame size="big">
  <MyCustomIcon />
</IconFrame>

<IconFrame size="small">
  <ChevronIcon />
</IconFrame>
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `size` | `'small'` | `'small'` \| `'big'` |
| `className` | — | Extra CSS class |
| `children` | — | SVG or icon element |

## Sizing reference (web platform)

| `size` | Frame | Glyph |
|--------|-------|-------|
| `small` | 18×18 | 18×18 |
| `big` | 24×24 | 24×24 |

## Rules

- **Only put icon-sized content inside IconFrame** — not checkboxes, chips, or multi-column layouts.
- Orbit components (`Button`, `ListingItem`, chips) use IconFrame internally — you usually don't need it directly.
- Use when building custom dashboard widgets that must align with Orbit icon sizing.
