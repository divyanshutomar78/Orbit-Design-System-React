# Button

Primary, secondary, and tertiary action button.

## Import

```tsx
import { Button } from 'orbit-ds-components';
```

## Basic usage

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Learn more</Button>
```

## With icons

```tsx
<Button variant="primary" leftIcon={<PlusIcon />}>Add user</Button>
<Button variant="secondary" rightIcon={<ChevronIcon />}>Next</Button>
```

Wrap custom SVGs in nothing — pass directly; Button uses `IconFrame` internally.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary'` \| `'secondary'` \| `'tertiary'` | `'primary'` | Visual style |
| `minWidth` | boolean | `true` | Enforce 84px min content width |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Icon frame size |
| `leftIcon` / `rightIcon` | ReactNode | — | Icon slots |
| `disabled` | boolean | — | Disabled state |
| `onClick` | function | — | Click handler |

## Trailing actions in rows

When a `Button` sits in `ListingItem` `addIconsComponent` or a narrow toolbar:

```tsx
<Button variant="secondary" minWidth={false}>
  Manage in Stripe
</Button>
```

| Prop | When to use |
|------|-------------|
| `minWidth={true}` (default) | Standalone CTAs, toolbars — enforces 84px min **content** width |
| `minWidth={false}` | Trailing row actions with long labels — button grows with text |

The actions slot in `ListingItem` sizes to its child. Do **not** CSS-override it to icon width — that clips button text.

## Dashboard examples

```tsx
// Toolbar
<Button variant="secondary">Export</Button>
<Button variant="primary">Invite user</Button>

// Destructive (use tertiary + copy, or CriticalChip nearby)
<Button variant="tertiary">Delete account</Button>
```

## Rules

- Use `primary` for the main CTA per screen (one per view).
- Use `secondary` for secondary actions (Export, Filter).
- Use `tertiary` for low-emphasis actions (Cancel, Learn more).
- Don't stack multiple primary buttons side by side.
- In `ListingItem` `addIconsComponent`, use `minWidth={false}` for long labels — see [listing-item.md](./listing-item.md).
