# Tooltip & TooltipPopup

Dark popup for help text. `TooltipComponent` includes an info-icon trigger; `TooltipPopupComponent` is the surface only.

## Import

```ts
import { TooltipComponent, TooltipPopupComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<!-- Info icon trigger -->
<orbit-tooltip text="Number of active users in the last 24 hours" direction="right"></orbit-tooltip>

<!-- Popup only -->
<orbit-tooltip-popup text="Saved successfully"></orbit-tooltip-popup>

<!-- Custom popup content -->
<orbit-tooltip [showText]="false" [usePopupContentSlot]="true">
  <orbit-label-value-horizontal
    orbitPopupContent
    layout="L + V"
    label="Latency"
    value="12ms"
  ></orbit-label-value-horizontal>
</orbit-tooltip>
```

## Inputs (Tooltip)

| Input | Default | Description |
|-------|---------|-------------|
| `text` | `'Toolem ipsum'` | Default popup text |
| `showText` | `true` | Show default text |
| `usePopupContentSlot` / `[orbitPopupContent]` | — | Custom popup slot |
| `direction` | `'right'` | `'left'` \| `'right'` |
| `open` | — | Controlled visibility |
| `useTriggerSlot` / `[orbitTrigger]` | info icon | Custom trigger element |

## Dashboard examples

```html
<!-- Column header help -->
<span style="display: flex; align-items: center; gap: 4px">
  Active users
  <orbit-tooltip text="Users who logged in within 24h" direction="right"></orbit-tooltip>
</span>

<!-- Inline metric explanation -->
<orbit-tooltip text="Compared to previous period"></orbit-tooltip>
```

## Rules

- Use sparingly on dashboards — prefer clear labels.
- `direction="right"` for left-column labels; `direction="left"` near right edge.
- Shadow uses `--shadow-action-menu` token.
