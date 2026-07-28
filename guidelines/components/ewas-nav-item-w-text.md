# EWasNavItemWText

Navigation item with two lines of text (flight number style) or split-view info icon.

## Import

```ts
import { EWasNavItemWTextComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-ewas-nav-item-w-text characters="6" orientation="horizontal" state="selected"></orbit-ewas-nav-item-w-text>
<orbit-ewas-nav-item-w-text characters="default" orientation="splitView"></orbit-ewas-nav-item-w-text>
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `characters` | `'6'` | `'6'` \| `'7'` \| `'8'` \| `'default'` — presets primary/secondary text |
| `primaryText` / `secondaryText` | from preset | Override text lines |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'splitView'` |
| `state` | `'default'` | `'default'` \| `'selected'` |
| `icon` | info icon | Split view icon |

## Rules

- Used as `EWasNavBarComponent` flight header by default.
- `characters` presets control how much text fits in the nav cell.
- Use `splitView` for icon-only compact mode.
