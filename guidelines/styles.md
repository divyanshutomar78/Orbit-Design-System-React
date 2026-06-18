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
<div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background-background)' }}>
  <EWasNavBar orientation="vertical" flight={false} />
  <main className="page-canvas" style={{ flex: 1, background: 'var(--background-background)' }}>
    <header className="page-header" style={{ background: 'var(--background-surface-container-1)' }}>
      <TitlesAndTabs title="Dashboard" tabItems={tabs} />
    </header>
    <p className="page-subtitle">Optional description — always outside TitlesAndTabs.</p>
    <div className="page-content">
      {/* cards → container-2; canvas visible in gaps */}
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

The page canvas stays **`background`**. Only the **header bar** uses **`container-1`**. Cards use **`container-2`**. Do **not** paint all of `<main>` with `container-1`. See [layering-model.md](./layering-model.md#page-layout-canvas--elevated-blocks).

### Page width alignment (header + body)

`TitlesAndTabs` spans the **full width** of the main area (edge-to-edge border). Page body below it must use the **same horizontal bounds** — do not center content in a narrower column while the header stays full width.

| Pattern | Structure | When to use |
|---------|-----------|-------------|
| **Full page shell** (default) | `TitlesAndTabs` full width → content `width: 100%` + `--gap-m` padding | Dashboards, settings, billing pages |
| **Centered panel** | One wrapper around **both** header and body with shared `max-width` + `margin: 0 auto` | Compact flows, preview panels — **do not** use full-width `TitlesAndTabs` outside the wrapper |

```tsx
// ✅ Full page shell — canvas background, header container-1, cards container-2
<main className="page-canvas">
  <header className="page-header">
    <TitlesAndTabs title="Billing & Invoices" showTabs={false} ... />
  </header>
  <div className="page-content">{/* cards → container-2 */}</div>
</main>

// ✅ Centered panel — header AND body inside the same box
<div className="page-panel">
  <header className="page-panel__header">Billing & Invoices</header>
  <div className="page-panel__body">{/* content */}</div>
</div>

// ❌ Misaligned — full-width header, narrow centered body
<main>
  <TitlesAndTabs title="Billing & Invoices" />
  <div style={{ maxWidth: 960, margin: '0 auto' }}>...</div>
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

Note: `.page-canvas` is the full page background. Only `.page-header` uses `container-1`. See [layering-model.md](./layering-model.md#page-layout-canvas--elevated-blocks).

/* Centered panel only — wraps header + body together */
.page-panel {
  width: min(100%, 960px);
  margin-inline: auto;
  padding: calc(var(--gap-m) * 1px);
}
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
<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>
```

### Label + value pairs

Single cell:

```tsx
<LabelValueVertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io" />
<LabelValueHorizontal layout="L" label="Owner" />
```

Multiple `LabelValueVertical` cells in one row (stats, metrics, info panels) — **always wrap in a grid**:

```tsx
<div className="stats-row stats-row--four">
  <LabelValueVertical label="Stage" value="In flight" />
  <LabelValueVertical label="Call Sign" value="AAL532" />
  {/* … */}
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

Modal and dialog **headers** (`TitlesAndTabs`, tabbed dialog header) render bottom borders **edge-to-edge** — no horizontal inset. Section dividers **inside** a padded dialog body must match that behavior.

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
2. **`InputSelect`** — component default is `max-width: 460px`. **Override in dialog forms:**

```css
.orbit-form-field .orbit-input-select {
  width: 100%;
  max-width: none;
}
```

3. **Form field wrapper** — `width: 100%` and `min-width: 0` so grid cells don't overflow.

**Do not** leave `InputSelect` at its 460px cap inside a wide modal — fields will look short and misaligned with full-width inputs beside them.

### Two-column grid (wide dialogs)

When the modal is wider than the default (~560px), e.g. `width: min(100%, 640px)`, place **related short fields side by side**:

| Field type | Layout |
|------------|--------|
| `InputSelect`, short text inputs (To, phone, date) | One column each in a 2-column row |
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

```tsx
<div className="dialog-form-grid">
  <FormField label="Recipients"><InputSelect … /></FormField>
  <FormField label="Template"><InputSelect … /></FormField>
  <FormField label="Subject" className="dialog-form-grid__full">…</FormField>
  <FormField label="Message" className="dialog-form-grid__full">…</FormField>
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
| Page title | `TitlesAndTabs` `title` prop (single line only) |
| Page subheading / description | Separate element below `TitlesAndTabs` — not inside the component |
| Section title | `ListingItem` `title` (multi-line) or `LabelValueHorizontal` `big` |
| Body label | `LabelValueHorizontal` / `LabelValueVertical` `label` |
| Body value | `label` / `value` props |
| Helper / meta | `ListingItem` `helper` or `--text-secondary` |
| Column headers | Uppercase, `font-size: 11px`, `letter-spacing: 0.06em`, `color: var(--text-secondary)` |

## Focus & interaction

Orbit components handle their own `:hover`, `:focus-visible`, and `:disabled` states. Pass `onClick` to `ListingItem` for interactive rows — it adds `role="button"` and focus styles automatically.
