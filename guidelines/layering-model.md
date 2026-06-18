# Orbit Layering Model

How Orbit **surface tokens** stack to create depth, and which **semantic token** to use for each UI role. Read this before generating layouts, cards, panels, or custom containers.

> Semantic variable **names are identical across all themes**. Only the underlying color values change when you switch themes.

## Token architecture

Orbit variables ship from `orbit-ds-variables` in three layers:

```
primitives/variables.css          Raw palette (--neutral-300, --blue-200, alpha scales)
themes/<theme>/variables.css      Semantic roles (--background-surface-container-2, --text-primary)
platforms/<platform>/variables.css  Sizing (--gap-s, --radius-s, --icon-frame-size-default)
```

Import exactly **one theme** and **one platform**. Semantic names stay the same; values resolve from the chosen theme.

```css
@import 'orbit-ds-variables/dist/css/primitives/variables.css';
@import 'orbit-ds-variables/dist/css/themes/d-grey/variables.css';
@import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
```

---

## Themes

Five themes share the same semantic token names. Pick one per app.

| Theme ID | Visual mode | Accent | Page feel |
|----------|-------------|--------|-----------|
| `d-grey` | Light UI | Blue | Warm grey canvas |
| `d-green` | Light UI | Green | Light grey-green canvas |
| `n-grey` | Dark UI | Blue | Neutral dark grey |
| `n-green` | Dark UI | Green | Dark green tint |
| `n-blue` | Dark UI | Blue | Dark blue tint |

**Naming hint:** `d-*` themes render **light** page backgrounds. `n-*` themes render **dark** page backgrounds. Accent color (blue vs green) is the main difference within each family.

---

## Surface layering model

Surface tokens define **neutral elevation** — how backgrounds stack from the page up. Each new layer sits visually **on top of** the layer below it.

### Critical rule: container numbers vs elevation

**Higher container number = higher elevation (closer to the user).**

| Stack order (bottom → top) | Token | Role |
|----------------------------|-------|------|
| 0 — Page / canvas | `--background-background` | Full page canvas — visible in gaps between cards |
| 1 — First elevation | `--background-surface-container-1` | **Page header bar (`TitlesAndTabs`)**, section strips, modal/dialog panels |
| 2 — Second elevation | `--background-surface-container-2` | Cards, menus, tooltips, nav items, **content inside a modal** |
| 3 — Top elevation | `--background-surface-container-3` | **Only when nested** on container-2 — e.g. popover on a card |

Think of it as: **background → 1 → 2 → 3** (counting up as you go up).

### How to pick the correct layer (read this first)

**Pick the token from the parent surface — not from how “important” the UI feels.**

1. Find what the element sits **directly on top of**.
2. Use the **next** surface-container number above that parent.

| Parent surface | Child element | Correct child token |
|----------------|---------------|---------------------|
| `--background-background` (page) | Modal panel, section wrapper | `--background-surface-container-1` |
| `--background-surface-container-1` (modal, section) | Scoreboard, card, list block | `--background-surface-container-2` |
| `--background-surface-container-2` (card, menu) | Nested card, nested popover | `--background-surface-container-3` |

**Do not** jump to `container-3` just because a modal is “on top” visually. A modal overlay still sits on the page canvas — its **panel** is only the **first** elevation (`container-1`). Reserve `container-3` for elements nested **inside** an already-elevated parent.

### Modals and dialogs

Modals use a **backdrop** over `--background-background`. The dialog **panel** is the first surface above the page:

```
┌─ viewport ─────────────────────────────────────┐
│  background (#e8e8e3)                          │
│    ┌─ modal panel (container-1) ────────────┐  │
│    │  ┌─ inner card (container-2) ────────┐ │  │
│    │  │  stat row / list item (container-2)│ │  │
│    │  └───────────────────────────────────┘ │  │
│    └────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

| Dialog part | Token | Why |
|------------|-------|-----|
| Backdrop (dimmed area) | Transparent / tint over `--background-background` | Not a surface-container layer |
| Dialog panel | `--background-surface-container-1` | First elevation above page |
| Blocks inside the dialog (cards, tables, rows) | `--background-surface-container-2` | Second elevation inside the panel |
| Recessed wells inside the panel | `--background-inside-surface-1` | Inset within container-1 |

Dialog panels should use `--background-surface-container-1` when sitting on the page background.

### Page layout (canvas + elevated blocks)

The **page stays on `--background-background`** — grey canvas visible across the full viewport and in gaps between cards. Do **not** paint the entire `<main>` with `container-1` (that removes the canvas and looks like one flat white sheet).

Elevate **individual blocks** on the canvas:

```
┌─ viewport ─────────────────────────────────────┐
│  background (canvas) — visible everywhere       │
│  ┌─ TitlesAndTabs bar (container-1) ──────────┐ │
│  └────────────────────────────────────────────┘ │
│  ░░░ gap shows background ░░░                   │
│  ┌─ card (container-2) ──────────────────────┐  │
│  └───────────────────────────────────────────┘  │
│  ░░░ gap shows background ░░░                   │
│  ┌─ card (container-2) ──────────────────────┐  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

| Element | Token | Notes |
|---------|-------|-------|
| Page / `<main>` canvas | `--background-background` | Full page — **not** container-1 |
| `TitlesAndTabs` header row | `--background-surface-container-1` | Header bar only — **not** bare background |
| Dashboard cards, table wrappers | `--background-surface-container-2` | Sit on canvas; gaps show background |
| Modal / dialog panel (full overlay) | `--background-surface-container-1` | Entire panel — exception to page rule |
| Cards **inside** a modal | `--background-surface-container-2` | Parent is modal panel |

```tsx
<div className="app-shell">
  <EWasNavBar /> {/* nav chrome on background */}
  <main className="page-canvas">
    <header className="page-header">
      <TitlesAndTabs title="Billing & Invoices" showTabs={false} ... />
    </header>
    <div className="page-content">
      {/* cards → container-2; gaps between cards show background */}
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
```

### Common mistakes (avoid these)

| Wrong | Right | Why |
|-------|-------|-----|
| Modal panel → `container-3` | Modal panel → `container-1` | Modal sits on page background, not on container-2 |
| Modal panel → `container-2` | Modal panel → `container-1` | Skips the first elevation step |
| Inner card in modal → `container-1` | Inner card in modal → `container-2` | Same level as parent — no visible depth |
| “Highest UI” → always `container-3` | Count from **parent** surface | Container number reflects stack depth, not prominence |
| Inverted stack `background → 3 → 2 → 1` | `background → 1 → 2 → 3` | Lower numbers are closer to the page |
| Entire `<main>` painted `container-1` | Page canvas stays `background`; header bar `container-1`; cards `container-2` | Whole page looks flat white — no canvas |
| `TitlesAndTabs` directly on background (no fill) | Header wrapper with `container-1` | Title row must not sit on bare canvas |

### Light theme stack (`d-grey`, `d-green`)

Each layer becomes **progressively lighter** — similar to Carbon's light theme alternating white and grey, but Orbit uses a continuous lightening scale.

```
┌─────────────────────────────────────────┐
│  surface-container-3  (#ffffff)       │  ← top / brightest
│  ┌───────────────────────────────────┐  │
│  │  surface-container-2  (#fafafa)   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  surface-container-1        │  │  │
│  │  │  (#f5f5f5)                   │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  background           │  │  │  │
│  │  │  │  (#e8e8e3)            │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

| Token | `d-grey` resolves to | Hex |
|-------|----------------------|-----|
| `--background-background` | `--neutral-300` | `#e8e8e3` |
| `--background-surface-container-1` | `--neutral-200` | `#f5f5f5` |
| `--background-surface-container-2` | `--neutral-100` | `#fafafa` |
| `--background-surface-container-3` | `--neutral-0` | `#ffffff` |

### Dark theme stack (`n-grey`, `n-green`, `n-blue`)

Each layer becomes **progressively lighter** — like Carbon's dark theme stepping from Gray 100 → 90 → 80 → 70.

```
┌─────────────────────────────────────────┐
│  surface-container-3  (#363636)         │  ← top / lightest surface
│  ┌───────────────────────────────────┐  │
│  │  surface-container-2  (#2e2e2e)   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  surface-container-1        │  │  │
│  │  │  (#242424)                   │  │  │
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │  background           │  │  │  │
│  │  │  │  (#1d1d1d)            │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

| Token | `n-grey` resolves to | Hex |
|-------|----------------------|-----|
| `--background-background` | `--neutral-600` | `#1d1d1d` |
| `--background-surface-container-1` | `--neutral-500` | `#242424` |
| `--background-surface-container-2` | `--neutral-400` | `#2e2e2e` |
| `--background-surface-container-3` | `--neutral-350` | `#363636` |

> `n-green` and `n-blue` use the same stack logic with green- or blue-tinted primitives. Token **names** are unchanged.

---

## Inset surfaces (recessed areas)

Use inset tokens **inside** an elevated surface to show depth *within* a layer — wells, grouped fields, secondary panels.

| Token | Use when | Parent surface |
|-------|----------|----------------|
| `--background-inside-surface-2` | Recessed area inside a **container-2** surface | Menus, cards using container-2 |
| `--background-inside-surface-1` | Recessed area inside a **container-1** surface | Modals, first-level panels |
| `--background-input-fields` | Text inputs, selects, text areas | Any form field on a surface |

**Example:** An `InputSelect` uses `--background-input-fields`. Checkbox cutouts in menus use `--background-surface-container-2` as the stroke/fill reference so icons blend with the menu surface.

---

## Status & action backgrounds (not part of the surface stack)

These tokens carry **semantic meaning** (success, warning, action). They do not follow the neutral elevation order.

| Token | Use for |
|-------|---------|
| `--background-action` | Primary buttons, selected nav items |
| `--background-action-hover` | Hover on action buttons / nav |
| `--background-disabled` | Disabled button backgrounds |
| `--background-neutral-container` | Neutral tinted info blocks |
| `--background-success-container` | Success alerts, success sections |
| `--background-success-container-variant` | Lighter success variant |
| `--background-attention-container` | Attention / info highlights |
| `--background-attention-container-variant` | Lighter attention variant |
| `--background-warning-container` | Warning alerts |
| `--background-warning-container-variant` | Lighter warning variant |
| `--background-critical-container` | Error / critical alerts |
| `--background-critical-container-variant` | Lighter critical variant |

Pair with matching `--text-on-*-container` tokens for readable labels inside these blocks.

---

## Which token goes where

Use this table when building custom UI (not covered by Orbit components).

| UI element | Token | Elevation |
|------------|-------|-----------|
| Page canvas, app shell, gaps between cards | `--background-background` | 0 |
| Sidebar / nav bar background | `--background-background` | 0 |
| Page header bar (`TitlesAndTabs` wrapper) | `--background-surface-container-1` | 1 |
| Page section wrapper (full-width strip) | `--background-surface-container-1` | 1 |
| Dashboard card, table wrapper on page | `--background-surface-container-2` | 2 |
| Dropdown, action menu, tooltip | `--background-surface-container-2` | 2 |
| Modal, dialog on page background | `--background-surface-container-1` | 1 |
| Popover on elevated surface | `--background-surface-container-2` or `-3` | 2–3 |
| Form input background | `--background-input-fields` | inset |
| Recessed panel inside a card | `--background-inside-surface-2` | inset |
| Primary CTA button | `--background-action` | action |
| Secondary / ghost button on page | `--background-background` | 0 |
| Status banner (success) | `--background-success-container` | semantic |

### Orbit components (built-in token usage)

| Component | Background token |
|-----------|------------------|
| `EWasNavBar` | `--background-background` |
| `TitlesAndTabs` | Transparent — **header wrapper uses `container-1`** on page canvas |
| `EWasNavItem`, `EWasNavItemWText` | `--background-surface-container-2` (default), `--background-action` (selected) |
| `ActionMenu`, `Tooltip` | `--background-surface-container-2` |
| `Button` primary | `--background-action` |
| `Button` secondary | `--background-background` |
| `InputSelect` | `--background-input-fields` |

When composing dashboards, **match parent/child layers**: a menu (container-2) on a card (container-2 or -3) is correct; a menu on bare page background should sit on container-1 or -2, not directly on `background-background` unless intentional.

**Dialog composition example:**

| Element | Token |
|---------|-------|
| Dialog panel | `container-1` |
| Card / table wrapper inside dialog | `container-2` |
| List row inside dialog | `container-2` |
| Recessed track / well | `--background-inside-surface-1` or `-2` (inset) |

---

## Layering decision flow (for AI agents)

**Before choosing a token:** identify the **parent surface** the element sits on, then pick the **next** container number. Never assign `container-3` to a modal panel.

```
1. What is the outermost area?
   → Page / shell → --background-background

2. Does this sit directly on the page background?
   → Section wrapper → --background-surface-container-1
   → Modal / dialog panel → --background-surface-container-1   ← NOT container-3

3. Does this sit inside container-1 (modal, section)?
   → Card, scoreboard, list block → --background-surface-container-2

4. Is this a menu, tooltip, or nav item on the page or in a layout?
   → Yes → --background-surface-container-2

5. Does this sit inside container-2 (card, menu)?
   → Nested card / popover → --background-surface-container-3

6. Is this a form field?
   → Yes → --background-input-fields

7. Is this recessed INSIDE an elevated surface?
   → On container-2 parent → --background-inside-surface-2
   → On container-1 parent → --background-inside-surface-1

8. Is this a status or CTA block?
   → Use --background-{action|success|warning|critical|attention}-container
   → Never substitute a surface-container token for semantic status colors
```

---

## Text, border, and icon tokens on surfaces

Semantic names are theme-stable. Match text/icon tokens to content role, not to surface level.

### Text

| Token | Use for |
|-------|---------|
| `--text-primary` | Main content, values, titles |
| `--text-secondary` | Labels, helpers, column headers |
| `--text-disabled` | Disabled control labels |
| `--text-action` | Links, interactive labels |
| `--text-action-hover` | Hover on action text |
| `--text-on-action` | Text on primary buttons |
| `--text-success`, `--text-warning`, `--text-critical`, `--text-attention` | Status text |
| `--text-on-success-container`, etc. | Text inside status containers |

### Borders

| Token | Use for |
|-------|---------|
| `--border-primary` | Dividers, input outlines, card borders |
| `--border-secondary` | Subtle separators |
| `--border-action` | Focus rings, action outlines |
| `--border-action-hover` | Hover/focus emphasis |
| `--border-attention` | Attention highlights |
| `--border-neutral` | Neutral tinted borders |

### Icons

| Token | Use for |
|-------|---------|
| `--icon-primary` | Default icons |
| `--icon-secondary` | De-emphasized icons |
| `--icon-action` | Interactive / link icons |
| `--icon-disabled` | Disabled icons |
| `--icon-on-action` | Icons on primary buttons |
| `--icon-attention` | Attention-state icons |

---

## Shadows reinforce elevation

Pair surface tokens with shadow tokens when a layer should feel lifted.

| Token | Typical pairing |
|-------|-----------------|
| `--shadow-navigation` | Nav bars on page background |
| `--shadow-card` | Cards using container-2 or -3 |
| `--shadow-action-menu` | Dropdowns, action menus |
| `--shadow-popup-message` | Modals (`container-1`), tooltips, popovers |
| `--shadow-submit-section` | Sticky footer bars |
| `--shadow-chip` | Floating chips |

---

## Rules for consistent designs

1. **Never hardcode hex or rgb** when a semantic token exists.
2. **Never skip layers** without reason — if a menu floats on the page, give it at least container-2, not the same token as the page.
3. **Higher container number = higher up** — `container-3` is above `container-2`, which is above `container-1`.
4. **Pick tokens from the parent surface** — count up one level from the parent; do not assign `container-3` to a modal because it feels “topmost”.
5. **Modal panel = container-1** — always, when the modal sits on `--background-background`. Inner modal content uses `container-2` or inset tokens.
6. **One theme per app** — switching themes changes values, not variable names.
7. **Status colors ≠ surface colors** — use `--background-success-container`, not `--background-surface-container-1`, for a success banner.
8. **Prefer Orbit components** — they already bind the correct tokens; custom markup should follow the same mapping.
9. **Inputs always use** `--background-input-fields`, not a surface-container token.

---

## Quick reference: all surface-related tokens

```css
/* Elevation stack (bottom → top) */
--background-background
--background-surface-container-1
--background-surface-container-2
--background-surface-container-3

/* Inset / fields */
--background-inside-surface-2
--background-inside-surface-1
--background-input-fields

/* Action & status (parallel system) */
--background-action
--background-action-hover
--background-disabled
--background-neutral-container
--background-success-container
--background-success-container-variant
--background-attention-container
--background-attention-container-variant
--background-warning-container
--background-warning-container-variant
--background-critical-container
--background-critical-container-variant
```

See [tokens.md](./tokens.md) for spacing, typography, chips, and platform tokens.
