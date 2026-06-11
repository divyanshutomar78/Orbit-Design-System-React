# EWasNavItemWText

Navigation item with two lines of text (flight number style) or split-view info icon.

## Import

```tsx
import { EWasNavItemWText } from 'orbit-ds-components';
```

## Basic usage

```tsx
<EWasNavItemWText characters="6" orientation="horizontal" state="selected" />
<EWasNavItemWText characters="default" orientation="splitView" />
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `characters` | `'6'` | `'6'` \| `'7'` \| `'8'` \| `'default'` — presets primary/secondary text |
| `primaryText` / `secondaryText` | from preset | Override text lines |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'splitView'` |
| `state` | `'default'` | `'default'` \| `'selected'` |
| `icon` | info icon | Split view icon |

## Rules

- Used as `EWasNavBar` flight header by default.
- `characters` presets control how much text fits in the nav cell.
- Use `splitView` for icon-only compact mode.
