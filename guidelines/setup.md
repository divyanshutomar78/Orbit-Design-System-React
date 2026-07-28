# Orbit Design System — Setup

Use this guide when bootstrapping a project that consumes **orbit-ds-components** and **orbit-ds-variables**.

## Required packages

```bash
npm install orbit-ds-components@latest orbit-ds-variables@latest @angular/core @angular/common
```

| Package | Purpose |
|---------|---------|
| `orbit-ds-components` | Angular components (Button, ListingItem, chips, nav, etc.) |
| `orbit-ds-variables` | CSS custom properties for colors, spacing, typography, platform sizing |
| `@angular/core` / `@angular/common` | Peer dependencies (Angular 19+) |

## Minimum app setup

### 1. Import styles (order matters)

Load **tokens first**, then **component styles** (optional if you rely on component `styleUrls`), then your app styles.

```ts
// src/main.ts or styles entry
import 'orbit-ds-variables/dist/css/primitives/variables.css';
import 'orbit-ds-variables/dist/css/themes/d-grey/variables.css';
import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
import 'orbit-ds-components/styles.css';
import './styles/globals.css';
```

> **Note:** Theme `index.css` files use relative `@import` paths that may fail in some bundlers. Import `primitives/variables.css` and `themes/<name>/variables.css` directly as shown above.

### 2. Set font family

Components use `var(--font-family)`. Define it in your global CSS:

```css
/* src/styles/globals.css */
:root {
  --font-family: Roboto, sans-serif;
}
```

Load the matching web font (e.g. Google Fonts Roboto).

### 3. Import components

```ts
import {
  ButtonComponent,
  ListingItemComponent,
  SuccessChipComponent,
  TitlesAndTabsComponent,
} from 'orbit-ds-components';
```

```html
<orbit-button variant="primary" label="Save"></orbit-button>
<orbit-listing-item label="Name" value="Value"></orbit-listing-item>
<orbit-success-chip label="Done"></orbit-success-chip>
<orbit-titles-and-tabs title="Page"></orbit-titles-and-tabs>
```

## Recommended project structure

```
src/
  app.component.ts        # Dashboard shell
  styles/
    globals.css           # --font-family, page layout
    theme.css             # Optional: theme/platform overrides
  components/
    user-table.component.ts
guidelines/               # This folder — read before generating UI
  setup.md
  layering-model.md       # Surface stacking — read before custom layouts
  styles.md
  tokens.md
  components.md
  components/*.md
```

## Theme selection

Pick **one** theme. Do not import multiple themes — they overwrite the same CSS variables.

| Theme ID | Visual mode | Use case |
|----------|-------------|----------|
| `d-grey` | Light UI | Default — warm grey canvas, blue accent |
| `d-green` | Light UI | Light canvas, green accent |
| `n-grey` | Dark UI | Dark neutral grey canvas |
| `n-green` | Dark UI | Dark green-tinted canvas |
| `n-blue` | Dark UI | Dark blue-tinted canvas |

Semantic token names are identical across themes. See [layering-model.md](./layering-model.md) for surface stacking.

Replace `d-grey` in import paths with your chosen theme.

## Platform selection

Pick **one** platform bundle for sizing tokens:

| Platform | Use case |
|----------|----------|
| `web` | Desktop web dashboards (default) |
| `ipad` | Tablet — larger touch targets (44px icon frames) |
| `desktop` | Large desktop displays |

## Icon sizes

Most components accept `iconSize?: 'small' | 'big'`.

| `iconSize` | Web frame | Web glyph |
|------------|-----------|-----------|
| `small` | 18×18 | 18×18 |
| `big` | 24×24 | 24×24 |

On iPad platform tokens, `big` uses a 44×44 frame with a 24×24 glyph centered inside.

## Dashboard composition rules

1. **Always load tokens before components** — without CSS variables, components render unstyled.
2. **Use Orbit components for UI primitives** — do not recreate buttons, chips, or list rows with raw HTML when an Orbit component exists.
3. **Compose, don't hack slots** — read each component's guideline before putting checkboxes, chips, or columns inside slots. Prefer content projection attributes (`orbitLeftIcon`, etc.).
4. **Prefer `LabelValueVertical` / `LabelValueHorizontal`** for label+value pairs instead of custom flex layouts.
5. **Use `SuccessChip`, `WarningChip`, etc.** for status badges with `[showIcon]="false"` — not generic pill divs.
6. **Use `TitlesAndTabs`** for page headers — title only inside; subheading **below** the component. See [components/titles-and-tabs.md](./components/titles-and-tabs.md).
7. **ListingItem is for list rows, not full data tables** — see `components/listing-item.md` for table patterns.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Components look unstyled | Import token CSS + `orbit-ds-components/styles.css` (or rely on component styleUrls) |
| Wrong colors | Check only one theme is imported |
| Icons wrong size | Import correct platform CSS (`web` vs `ipad`) |
| `ENOENT primitives/variables.css` | Import primitives + theme variables directly (see step 1) |
| Vertical "Option" text in rows | Don't put `OptionCheckbox` inside `ListingItem` left-icon slot — see listing-item guide |
