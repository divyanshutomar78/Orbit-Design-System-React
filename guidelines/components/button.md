# Button

Primary, secondary, and tertiary action button.

## Import

```ts
import { ButtonComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-button variant="primary" label="Save"></orbit-button>
<orbit-button variant="secondary" label="Cancel"></orbit-button>
<orbit-button variant="tertiary" label="Learn more"></orbit-button>
```

## With icons

```html
<orbit-button variant="primary" label="Add user" [showLeftIcon]="true">
  <span orbitLeftIcon><!-- PlusIcon SVG --></span>
</orbit-button>
<orbit-button variant="secondary" label="Next" [showRightIcon]="true">
  <span orbitRightIcon><!-- ChevronIcon SVG --></span>
</orbit-button>
```

Wrap custom SVGs in the projected slot — `orbit-button` uses `orbit-icon-frame` internally.

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'primary'` \| `'secondary'` \| `'tertiary'` | `'primary'` | Visual style |
| `minWidth` | boolean | `true` | Enforce 84px min content width |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Icon frame size |
| `showLeftIcon` / `showRightIcon` | boolean | `false` | Render icon frames; project `[orbitLeftIcon]` / `[orbitRightIcon]` |
| `label` | string | `''` | Button label text |
| `disabled` | boolean | — | Disabled state |

Use `(click)` on the host for click handling.

## Trailing actions in rows

When an `orbit-button` sits in `orbit-listing-item` `[orbitAddIcons]` or a narrow toolbar:

```html
<orbit-button variant="secondary" [minWidth]="false" label="Manage in Stripe"></orbit-button>
```

| Input | When to use |
|-------|-------------|
| `[minWidth]="true"` (default) | Standalone CTAs, toolbars — enforces 84px min **content** width |
| `[minWidth]="false"` | Trailing row actions with long labels — button grows with text |

The actions slot in `orbit-listing-item` sizes to its child. Do **not** CSS-override it to icon width — that clips button text.

## Dashboard examples

```html
<!-- Toolbar -->
<orbit-button variant="secondary" label="Export"></orbit-button>
<orbit-button variant="primary" label="Invite user"></orbit-button>

<!-- Destructive (use tertiary + copy, or CriticalChip nearby) -->
<orbit-button variant="tertiary" label="Delete account"></orbit-button>
```

## Rules

- Use `primary` for the main CTA per screen (one per view).
- Use `secondary` for secondary actions (Export, Filter).
- Use `tertiary` for low-emphasis actions (Cancel, Learn more).
- Don't stack multiple primary buttons side by side.
- In `orbit-listing-item` `[orbitAddIcons]`, use `[minWidth]="false"` for long labels — see [listing-item.md](./listing-item.md).
