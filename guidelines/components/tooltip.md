# Tooltip & TooltipPopup

Dark popup for help text. `Tooltip` includes an info-icon trigger; `TooltipPopup` is the surface only.

## Import

```tsx
import { Tooltip, TooltipPopup } from 'orbit-ds-components';
```

## Basic usage

```tsx
// Info icon trigger
<Tooltip text="Number of active users in the last 24 hours" direction="right" />

// Popup only
<TooltipPopup text="Saved successfully" />

// Custom popup content
<Tooltip
  showText={false}
  popupContent={
    <LabelValueHorizontal layout="L + V" label="Latency" value="12ms" />
  }
/>
```

## Props (Tooltip)

| Prop | Default | Description |
|------|---------|-------------|
| `text` | `'Toolem ipsum'` | Default popup text |
| `showText` | `true` | Show default text |
| `popupContent` | — | Custom popup slot |
| `direction` | `'right'` | `'left'` \| `'right'` |
| `open` | — | Controlled visibility |
| `trigger` | info icon | Custom trigger element |

## Dashboard examples

```tsx
// Column header help
<span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
  Active users
  <Tooltip text="Users who logged in within 24h" direction="right" />
</span>

// Inline metric explanation
<Tooltip text="Compared to previous period" />
```

## Rules

- Use sparingly on dashboards — prefer clear labels.
- `direction="right"` for left-column labels; `direction="left"` near right edge.
- Shadow uses `--shadow-action-menu` token.
