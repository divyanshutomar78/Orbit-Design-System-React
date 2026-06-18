# Orbit Styles Guide

How to style dashboards built with `orbit-ds-components`.

## Style loading order

```tsx
// 1. Primitives + theme + platform (tokens)
import 'orbit-ds-variables/dist/css/primitives/variables.css';
import 'orbit-ds-variables/dist/css/themes/d-grey/variables.css';
import 'orbit-ds-variables/dist/css/platforms/web/variables.css';

// 2. Component library CSS (required)
import 'orbit-ds-components/styles.css';

// 3. Your app styles
import './styles/globals.css';
```

Without step 1 and 2, components render as unstyled HTML.

## Global app styles

```css
/* src/styles/globals.css */

:root {
  --font-family: Roboto, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-family);
  background: var(--background-background);
  color: var(--text-primary);
}
```

## What NOT to override

Orbit components ship with their own CSS classes (`orbit-button`, `orbit-listing-item`, etc.). Avoid overriding these unless intentional:

- Don't set `border`, `padding`, or `font-size` on `.orbit-*` classes with Tailwind utilities.
- Don't wrap Orbit components in Tailwind flex containers that fight their internal layout.
- Don't use `!important` on component styles.

## Layout patterns for dashboards

### Page shell

```tsx
<div style={{ display: 'flex', minHeight: '100vh' }}>
  <EWasNavBar orientation="vertical" flight={false} />
  <main style={{ flex: 1, padding: 'calc(var(--gap-m) * 1px)' }}>
    <TitlesAndTabs title="Dashboard" tabItems={tabs} />
    {/* page content */}
  </main>
</div>
```

### Card container (custom — use tokens)

```css
.orbit-dashboard-card {
  background: var(--background-surface-container-2);
  border-radius: calc(var(--radius-s) * 1px);
  padding: calc(var(--gap-m) * 1px);
  box-shadow: var(--shadow-card);
}
```

### List / table section

Stack `ListingItem` rows inside a container with `overflow: hidden` and optional `border-radius`:

```tsx
<div style={{ borderRadius: 4, overflow: 'hidden', background: 'var(--background-surface-container-2)' }}>
  <ListingItem ... />
  <ListingItem ... />
</div>
```

Listing items no longer have a bottom border by default (v1.0.1+). Add a wrapper border if you need a table outline.

### Status column

Use chips, not custom spans:

```tsx
<SuccessChip type="chip" size="compact">Active</SuccessChip>
```

### Label + value pairs

```tsx
<LabelValueVertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io" />
<LabelValueHorizontal layout="L" label="Owner" />
```

## Tailwind coexistence

When using Tailwind alongside Orbit, follow these rules:

| Use Tailwind for | Use Orbit for |
|------------------|---------------|
| Page grid / layout (`grid`, `flex`, `gap-4`) | Buttons, inputs, chips, list rows |
| Custom dashboard cards (with token-based CSS) | Navigation, tabs, tooltips, menus |
| Spacing between sections | Anything with a Figma component match |

**Don't** use Tailwind color classes (`text-gray-500`, `bg-blue-600`) on Orbit components or their children.

## Dark vs light dashboards

| Dashboard type | Theme import | Page background token |
|----------------|--------------|------------------------|
| Light canvas | `d-grey` or `d-green` | `--background-background` (light grey) |
| Dark canvas | `n-grey`, `n-green`, or `n-blue` | `--background-background` (dark) |

Switch theme by changing the CSS import — don't toggle classes. For surface stacking (cards, menus, modals), see [layering-model.md](./layering-model.md).

## Icon styling

Custom icons inside Orbit slots must fit the icon frame:

```tsx
import { IconFrame } from 'orbit-ds-components';

<IconFrame size="big">
  <MySvgIcon />
</IconFrame>
```

**Don't** pass wide components (checkboxes, multi-column layouts) into `leftIcon` — the frame is 18–24px wide.

## Typography scale

| UI element | Orbit approach |
|------------|----------------|
| Page title | `TitlesAndTabs` `title` prop |
| Section title | `ListingItem` `title` (multi-line) or `LabelValueHorizontal` `big` |
| Body label | `LabelValueHorizontal` / `LabelValueVertical` `label` |
| Body value | `label` / `value` props |
| Helper / meta | `ListingItem` `helper` or `--text-secondary` |
| Column headers | Uppercase, `font-size: 11px`, `letter-spacing: 0.06em`, `color: var(--text-secondary)` |

## Focus & interaction

Orbit components handle their own `:hover`, `:focus-visible`, and `:disabled` states. Pass `onClick` to `ListingItem` for interactive rows — it adds `role="button"` and focus styles automatically.
