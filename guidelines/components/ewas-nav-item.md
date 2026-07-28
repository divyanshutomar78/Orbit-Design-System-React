# EWasNavItem

Single icon navigation button with Default / Active / Disabled states.

## Import

```ts
import { EWasNavItemComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-ewas-nav-item navItem="Flights" orientation="horizontal" state="active"></orbit-ewas-nav-item>
<orbit-ewas-nav-item orientation="splitView" state="default"></orbit-ewas-nav-item>
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `navItem` | `'Flights'` | Label text |
| `icon` | rocket icon | Custom icon |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'splitView'` \| `'vertical'` |
| `state` | `'default'` | `'default'` \| `'active'` \| `'disabled'` |
| `iconSize` | `'big'` | Icon frame |

## Rules

- Prefer `EWasNavBarComponent` for full nav — use `EWasNavItemComponent` only for custom nav compositions.
- `splitView` orientation shows icon only (no label).
- Sizes use `--components-e-was-nav-item-*` platform tokens.
