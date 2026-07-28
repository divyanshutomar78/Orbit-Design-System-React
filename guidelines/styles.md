# Orbit Styles Guide

How to style dashboards built with `orbit-ds-components`.

## Style loading order

```ts
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

```html
<div style="display: flex; min-height: 100vh; background: var(--background-background)">
  <orbit-ewas-nav-bar orientation="vertical" [flight]="false"></orbit-ewas-nav-bar>
  <main class="page-canvas" style="flex: 1; background: var(--background-background)">
    <header class="page-header" style="background: var(--background-surface-container-1)">
      <orbit-titles-and-tabs title="Dashboard" [tabItems]="tabs"></orbit-titles-and-tabs>
    </header>
    <p class="page-subtitle">Optional description — always outside orbit-titles-and-tabs.</p>
    <div class="page-content">
      <!-- sections on canvas → container-1; inner content → container-2 -->
    </div>
  </main>
</div>
```

```css
.page-canvas {
  flex: 1;
  min-height: 100vh;
  background-color: var(--background-background);
}

.page-header {
  background-color: var(--background-surface-container-1);
}

.page-content {
  width: 100%;
  padding: calc(var(--gap-m) * 1px);
  box-sizing: border-box;
}
```

The page canvas stays **`background`**. Top-level sections (header, KPI cards, panels, tables) use **`container-1`**. Content inside those sections uses **`container-2`** or inset tokens. Do **not** paint all of `<main>` with `container-1`. See [layering-model.md](./layering-model.md#page-layout-canvas--sections).

### Page width alignment (header + body)

`orbit-titles-and-tabs` spans the **full width** of the main area (edge-to-edge border). Page body below it must use the **same horizontal bounds** — do not center content in a narrower column while the header stays full width.

| Pattern | Structure | When to use |
|---------|-----------|-------------|
| **Full page shell** (default) | `orbit-titles-and-tabs` full width → content `width: 100%` + `--gap-m` padding | Dashboards, settings, billing pages |
| **Centered panel** | One wrapper around **both** header and body with shared `max-width` + `margin: 0 auto` | Compact flows, preview panels — **do not** use full-width `orbit-titles-and-tabs` outside the wrapper |

```html
<!-- ✅ Page shell — canvas background, sections container-1 -->
<main class="page-canvas">
  <header class="page-header">
    <orbit-titles-and-tabs title="Billing & Invoices" [showTabs]="false"></orbit-titles-and-tabs>
  </header>
  <section class="page-section"><!-- KPI row → container-1 --></section>
  <section class="page-section"><!-- table panel → container-1; row hover → container-2 --></section>
</main>

<!-- ✅ Centered panel — header AND body inside the same box -->
<div class="page-panel">
  <header class="page-panel__header">Billing & Invoices</header>
  <div class="page-panel__body"><!-- content --></div>
</div>

<!-- ❌ Misaligned — full-width header, narrow centered body -->
<main>
  <orbit-titles-and-tabs title="Billing & Invoices"></orbit-titles-and-tabs>
  <div style="max-width: 960px; margin: 0 auto">...</div>
</main>
```

```css
.page-content {
  width: 100%;
  padding: calc(var(--gap-m) * 1px);
  box-sizing: border-box;
}

.page-canvas {
  background-color: var(--background-background);
}

.page-header {
  background-color: var(--background-surface-container-1);
}
```

Note: `.page-canvas` is `background`. Header and all page sections use `container-1`. Inner content (filters, row hover) uses `container-2` or inset tokens. See [layering-model.md](./layering-model.md#page-layout-canvas--sections).

/* Centered panel only — wraps header + body together */
.page-panel {
  width: min(100%, 960px);
  margin-inline: auto;
  padding: calc(var(--gap-m) * 1px);
}
```

### Section container (custom — use tokens)

Page sections sit on the canvas at **`container-1`**. Inner strips and hover states step up from there:

```css
.orbit-dashboard-section {
  background: var(--background-surface-container-1);
  border-radius: calc(var(--radius-s) * 1px);
  padding: calc(var(--gap-m) * 1px);
}

.orbit-dashboard-section__filters {
  background: var(--background-inside-surface-1);
}

.orbit-dashboard-section__row:hover {
  background: var(--background-surface-container-2);
}
```

### List / table section

Stack `orbit-listing-item` rows inside a section wrapper with `overflow: hidden` and optional `border-radius`:

```html
<div style="border-radius: 4px; overflow: hidden; background: var(--background-surface-container-1)">
  <orbit-listing-item ...></orbit-listing-item>
  <orbit-listing-item ...></orbit-listing-item>
</div>
```

Listing items no longer have a bottom border by default (v1.0.1+). Add a wrapper border if you need a table outline.

### Status column

Use chips, not custom spans:

```html
<orbit-success-chip type="chip" size="compact" [showIcon]="false" label="Active"></orbit-success-chip>
```

### Label + value pairs

Single cell:

```html
<orbit-label-value-vertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io"></orbit-label-value-vertical>
<orbit-label-value-horizontal layout="L" label="Owner"></orbit-label-value-horizontal>
```

Multiple `orbit-label-value-vertical` cells in one row (stats, metrics, info panels) — **always wrap in a grid**:

```html
<div class="stats-row stats-row--four">
  <orbit-label-value-vertical label="Stage" value="In flight"></orbit-label-value-vertical>
  <orbit-label-value-vertical label="Call Sign" value="AAL532"></orbit-label-value-vertical>
  <!-- … -->
</div>
```

```css
.stats-row {
  display: grid;
  width: 100%;
  gap: calc(var(--gap-m) * 1px) calc(var(--gap-l) * 1px);
}
.stats-row--four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.stats-row .orbit-label-value-vertical { min-width: 0; }
```

Related cells in one block (e.g. identity fields) — wrap the grid in a group with a bottom border. See [Dialog body section dividers](#dialog-body-section-dividers) for full-bleed borders.

See [components/label-value-vertical.md](./components/label-value-vertical.md) for alignment and anti-patterns.

## Dialog body section dividers

Modal and dialog **headers** (`orbit-titles-and-tabs`, tabbed dialog header) render bottom borders **edge-to-edge** — no horizontal inset. Section dividers **inside** a padded dialog body must match that behavior.

### Pattern

1. Set a CSS variable on the dialog body for horizontal padding.
2. On any section border (`stats-group`, `<hr>`, footer separator): **negative `margin-inline`** cancels body padding so the line spans the full modal width.
3. Restore content alignment with matching **`padding-inline`** on grouped sections (not needed on bare `<hr>` dividers).

```css
.orbit-modal__body {
  --dialog-body-padding-inline: var(--gap-m);
  padding: calc(var(--gap-l) * 1px) calc(var(--dialog-body-padding-inline) * 1px);
}

.stats-group {
  margin-inline: calc(var(--dialog-body-padding-inline) * -1px);
  padding-inline: calc(var(--dialog-body-padding-inline) * 1px);
  padding-bottom: calc(var(--gap-l) * 1px);
  border-bottom: calc(var(--components-input-button-select-border-width) * 1px) solid
    var(--border-secondary);
}

.dialog-section-divider {
  margin-inline: calc(var(--dialog-body-padding-inline) * -1px);
  border: none;
  border-top: calc(var(--components-input-button-select-border-width) * 1px) solid
    var(--border-secondary);
}
```

| Element | Full-bleed | Content padding restored |
|---------|------------|--------------------------|
| `stats-group` with border-bottom | `margin-inline: negative` | `padding-inline: positive` |
| `<hr>` / divider only | `margin-inline: negative` | Not needed |
| Modal header border | Built-in — no body padding | N/A |

**Do not** leave section borders inset inside padded dialog bodies — they should touch the left and right edges like the title/header border.

## Dialog form layout

Form fields inside modals and dialogs must **fill the available body width** and use a **two-column grid** when the dialog is wide enough for paired short fields.

### Full-width fields (required)

Every control in a dialog form must stretch to the full width of its column:

1. **Native inputs and textareas** — `width: 100%` on the control.
2. **`orbit-input-select`** — component default is `max-width: 460px`. **Override in dialog forms:**

```css
.orbit-form-field .orbit-input-select {
  width: 100%;
  max-width: none;
}
```

3. **Form field wrapper** — `width: 100%` and `min-width: 0` so grid cells don't overflow.

**Do not** leave `orbit-input-select` at its 460px cap inside a wide modal — fields will look short and misaligned with full-width inputs beside them.

### Two-column grid (wide dialogs)

When the modal is wider than the default (~560px), e.g. `width: min(100%, 640px)`, place **related short fields side by side**:

| Field type | Layout |
|------------|--------|
| `orbit-input-select`, short text inputs (To, phone, date) | One column each in a 2-column row |
| Subject (long), textarea, attachment zone, file upload | Full width — `grid-column: 1 / -1` |

```css
.dialog-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: calc(var(--gap-m) * 1px);
  width: 100%;
}

.dialog-form-grid__full {
  grid-column: 1 / -1;
}

@media (max-width: 520px) {
  .dialog-form-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
```

```html
<div class="dialog-form-grid">
  <FormField label="Recipients"><orbit-input-select …></orbit-input-select></FormField>
  <FormField label="Template"><orbit-input-select …></orbit-input-select></FormField>
  <FormField label="Subject" class="dialog-form-grid__full">…</FormField>
  <FormField label="Message" class="dialog-form-grid__full">…</FormField>
</div>
```

Rules:

1. **Dialog body form** — `width: 100%` on the form container.
2. **Wide modal + multiple selects/short inputs** → use `.dialog-form-grid`; don't stack everything in one column when two fit.
3. **Long content** (textarea, rich text, attachments) → always `.dialog-form-grid__full`.
4. **Conditional fields** (e.g. custom recipient) → full row when alone; share a row when paired (e.g. Recipients + Phone).
5. **Collapse to one column** below ~520px viewport.

See also [titles-and-tabs.md](./components/titles-and-tabs.md) for dialog header/body structure.

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

```ts
import { IconFrameComponent } from 'orbit-ds-components';
```

```html
<orbit-icon-frame size="big">
  <!-- MySvgIcon -->
</orbit-icon-frame>
```

**Don't** pass wide components (checkboxes, multi-column layouts) into `leftIcon` — the frame is 18–24px wide.

## Typography scale

| UI element | Orbit approach |
|------------|----------------|
| Page title | `orbit-titles-and-tabs` `title` input (single line only) |
| Page subheading / description | Separate element below `orbit-titles-and-tabs` — not inside the component |
| Section title | `orbit-listing-item` `title` (multi-line) or `orbit-label-value-horizontal` `[big]="true"` |
| Body label | `orbit-label-value-horizontal` / `orbit-label-value-vertical` `label` |
| Body value | `label` / `value` inputs |
| Helper / meta | `orbit-listing-item` `helper` or `--text-secondary` |
| Column headers | Uppercase, `font-size: 11px`, `letter-spacing: 0.06em`, `color: var(--text-secondary)` |

## Focus & interaction

Orbit components handle their own `:hover`, `:focus-visible`, and `:disabled` states. Bind `(click)` with `[interactive]="true"` on `orbit-listing-item` for interactive rows — it adds `role="button"` and focus styles automatically.
