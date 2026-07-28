# IconFrame

Sizes custom SVG icons to Orbit platform tokens. Use when placing icons in Button slots or custom UI.

## Import

```ts
import { IconFrameComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-icon-frame size="big">
  <!-- MyCustomIcon SVG -->
</orbit-icon-frame>

<orbit-icon-frame size="small">
  <!-- ChevronIcon SVG -->
</orbit-icon-frame>
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `size` | `'small'` | `'small'` \| `'big'` |
| `className` | — | Extra CSS class |
| projected content | — | SVG or icon element via `ng-content` |

## Sizing reference (web platform)

| `size` | Frame | Glyph |
|--------|-------|-------|
| `small` | 18×18 | 18×18 |
| `big` | 24×24 | 24×24 |

## Rules

- **Only put icon-sized content inside IconFrame** — not checkboxes, chips, or multi-column layouts.
- Orbit components (`orbit-button`, `orbit-listing-item`, chips) use IconFrame internally — you usually don't need it directly.
- Use when building custom dashboard widgets that must align with Orbit icon sizing.
