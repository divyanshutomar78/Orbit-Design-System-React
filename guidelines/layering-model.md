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
| 0 — Page / canvas | `--background-background` | Full page canvas — visible in gaps between sections |
| 1 — First elevation | `--background-surface-container-1` | Anything **directly on** the page: header, KPI cards, panels, table wrappers, modal/dialog panels |
| 2 — Second elevation | `--background-surface-container-2` | Anything **on top of** container-1: row hover, active filters, inner blocks, menus, tooltips, content inside a modal |
| 3 — Top elevation | `--background-surface-container-3` | **Only when nested** on container-2 — e.g. popover on a menu |

Think of it as: **background → 1 → 2 → 3** (counting up as you go up).

### How to pick the correct layer (read this first)

**Pick the token from the parent surface — not from how “important” the UI feels.**

1. Find what the element sits **directly on top of**.
2. Use the **next** surface-container number above that parent.

| Parent surface | Child element | Correct child token |
|----------------|---------------|---------------------|
| `--background-background` (page) | Header, KPI card, panel, table wrapper, modal panel | `--background-surface-container-1` |
| `--background-surface-container-1` (section, modal) | Row hover, active filter, inner card, list block | `--background-surface-container-2` |
| `--background-surface-container-2` (menu, inner block) | Nested card, nested popover | `--background-surface-container-3` |

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

### Page layout (canvas + sections)

The stack is always: **`background` → `container-1` → `container-2` → `container-3`**. Count from the **parent surface** — never skip a step, never assign a token because something “looks like a card.”

The **page stays on `--background-background`** — canvas visible across the full viewport and in gaps between sections. Do **not** paint the entire `<main>` with `container-1` (that removes the canvas and looks like one flat sheet).

Every block that sits **directly on the page canvas** uses **`container-1`**: the header, KPI cards, content panels, and table wrappers are **siblings at the same elevation**. Content **inside** those sections steps up to `container-2` (or uses inset tokens for recessed areas).

```
┌─ viewport ─────────────────────────────────────┐
│  background (canvas) — visible in gaps          │
│  ┌─ TitlesAndTabs bar (container-1) ──────────┐ │
│  └────────────────────────────────────────────┘ │
│  ░░░ gap shows background ░░░                   │
│  ┌─ KPI card (container-1) ──────────────────┐  │
│  └───────────────────────────────────────────┘  │
│  ░░░ gap shows background ░░░                   │
│  ┌─ table / rules panel (container-1) ────────┐  │
│  │  filter bar (inside-surface-1)             │  │
│  │  table header (inside-surface-1)           │  │
│  │  row hover (container-2)                   │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

| Element | Token | Notes |
|---------|-------|-------|
| Page / `<main>` canvas | `--background-background` | Full page — **not** container-1 |
| Header, KPI cards, panels, table wrappers | **`--background-surface-container-1`** | All siblings on canvas — **same token** |
| Table header, filter bar, rule row (inside panel) | `--background-inside-surface-1` | Recessed within container-1 |
| Row hover, active filter, inner block | `--background-surface-container-2` | One step up **inside** the section |
| KPI icon wells, status chips | Semantic containers | **Not** surface-container — see status tokens |
| Modal / dialog panel | `--background-surface-container-1` | Sits on page background |
| Blocks inside modal | `--background-surface-container-2` | Parent is modal panel |

Page sections do **not** use `--shadow-card`. Shadows are for floating overlays (menus, modals, tooltips) — not for dashboard sections on the canvas.

```tsx
<div className="app-shell">
  <EWasNavBar /> {/* nav chrome on background */}
  <main className="page-canvas">
    <header className="page-header">
      <TitlesAndTabs title="Billing & Invoices" showTabs={false} ... />
    </header>
    <section className="page-section">{/* KPI cards → container-1 */}</section>
    <section className="page-section">{/* table panel → container-1 */}</section>
  </main>
</div>
```

```css
.page-canvas {
  flex: 1;
  min-height: 100vh;
  background-color: var(--background-background);
}

.page-header,
.page-section {
  background-color: var(--background-surface-container-1);
}

.panel__filters,
.panel__table-head {
  background-color: var(--background-inside-surface-1);
}

.panel__row:hover {
  background-color: var(--background-surface-container-2);
}
```

### Common mistakes (avoid these)

| Wrong | Right | Why |
|-------|-------|-----|
| Header `container-1`, KPI cards / panels `container-2` as **siblings on canvas** | All top-level sections → **`container-1`** | Anything on `background` is container-1 |
| Dashboard section with `--shadow-card` | No shadow on page sections | Shadows are for floating overlays only |
| Modal panel → `container-3` | Modal panel → `container-1` | Modal sits on page background, not on container-2 |
| Modal panel → `container-2` | Modal panel → `container-1` | Skips the first elevation step |
| Inner block in section → `container-1` | Inner block → `container-2` | Same level as parent — no visible depth |
| “Highest UI” → always `container-3` | Count from **parent** surface | Container number reflects stack depth, not prominence |
| “It's a card” → `container-2` on page canvas | Card on canvas → **`container-1`** | Shape ≠ elevation; parent is `background` |
| Inverted stack `background → 3 → 2 → 1` | `background → 1 → 2 → 3` | Lower numbers are closer to the page |
| Entire `<main>` painted `container-1` | Page canvas stays `background`; sections use `container-1` individually | One sheet — no visible canvas |
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
| Page canvas, app shell, gaps between sections | `--background-background` | 0 |
| Sidebar / nav bar background | `--background-background` | 0 |
| Page header bar (`TitlesAndTabs` wrapper) | `--background-surface-container-1` | 1 — on background |
| KPI cards, panels, table wrappers on page | `--background-surface-container-1` | 1 — same as header |
| Filter bar / table header inside section | `--background-inside-surface-1` | inset in container-1 |
| Row hover / active filter inside section | `--background-surface-container-2` | 2 — on container-1 |
| Inner card / block inside section or modal | `--background-surface-container-2` | 2 — on container-1 |
| Dropdown, action menu, tooltip | `--background-surface-container-2` | 2 — floating overlay |
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

When composing dashboards:

1. **Page canvas = `background`**. Every section on the canvas = **`container-1`** (header, KPIs, panels, tables).
2. **Content inside a section** steps up to `container-2`, or uses inset tokens for recessed strips.
3. **Never put page sections on `container-2`** — that skips a layer and implies false elevation.
4. **Menus and tooltips** (container-2) on a section (container-1) are correct — they float above the section.

**Dialog composition example:**

| Element | Token |
|---------|-------|
| Dialog panel | `container-1` |
| Card / table wrapper inside dialog | `container-2` |
| List row inside dialog | `container-2` |
| Recessed track / well | `--background-inside-surface-1` or `-2` (inset) |

---

## Layering decision flow (for AI agents)

**Before choosing a token:** identify the **parent surface**, then use the **next** container number. Never assign `container-3` to a modal panel. Never put page sections on `container-2`.

```
1. What is the outermost area?
   → Page / shell → --background-background

2. Does this sit directly on the page background?
   → Header, KPI card, panel, table wrapper, modal panel → container-1

3. Does this sit inside container-1 (section, modal)?
   → Row hover, active filter, inner block → container-2
   → Recessed strip (filters, table head) → --background-inside-surface-1

4. Is this a menu, tooltip, or floating overlay?
   → Yes → --background-surface-container-2

5. Does this sit inside container-2?
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
| `--shadow-card` | Rare — only if a block is genuinely nested at container-2/-3. **Not** for page sections on canvas |
| `--shadow-action-menu` | Dropdowns, action menus |
| `--shadow-popup-message` | Modals (`container-1`), tooltips, popovers |
| `--shadow-submit-section` | Sticky footer bars |
| `--shadow-chip` | Floating chips |

---

## Rules for consistent designs

1. **Never hardcode hex or rgb** when a semantic token exists.
2. **Stack is always `background → 1 → 2 → 3`** — count from the parent surface; never skip a step.
3. **Page sections on canvas = `container-1`** — header, KPI cards, panels, and table wrappers share one elevation.
4. **`container-2` is for content inside sections** — row hover, inner blocks, menus — not for top-level page blocks.
5. **Higher container number = higher up** — `container-3` is above `container-2`, which is above `container-1`.
6. **Modal panel = container-1** — always, when the modal sits on `--background-background`. Inner modal content uses `container-2` or inset tokens.
7. **One theme per app** — switching themes changes values, not variable names.
8. **Status colors ≠ surface colors** — use `--background-success-container`, not `--background-surface-container-1`, for a success banner.
9. **Prefer Orbit components** — they already bind the correct tokens; custom markup should follow the same mapping.
10. **Inputs always use** `--background-input-fields`, not a surface-container token.

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
