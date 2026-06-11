# EWasNavItem

Single icon navigation button with Default / Active / Disabled states.

## Import

```tsx
import { EWasNavItem } from 'orbit-ds-components';
```

## Basic usage

```tsx
<EWasNavItem navItem="Flights" orientation="horizontal" state="active" />
<EWasNavItem orientation="splitView" state="default" />
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `navItem` | `'Flights'` | Label text |
| `icon` | rocket icon | Custom icon |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'splitView'` \| `'vertical'` |
| `state` | `'default'` | `'default'` \| `'active'` \| `'disabled'` |
| `iconSize` | `'big'` | Icon frame |

## Rules

- Prefer `EWasNavBar` for full nav — use `EWasNavItem` only for custom nav compositions.
- `splitView` orientation shows icon only (no label).
- Sizes use `--components-e-was-nav-item-*` platform tokens.
