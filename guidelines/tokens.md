# Orbit Design Tokens (orbit-ds-variables)

All Orbit components read **CSS custom properties** from `orbit-ds-variables`. Never hardcode hex colors or pixel spacing when a token exists.

## Import pattern

```css
@import 'orbit-ds-variables/dist/css/primitives/variables.css';
@import 'orbit-ds-variables/dist/css/themes/d-grey/variables.css';
@import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
```

## Token layers

```
primitives/variables.css     → Raw palette (green-400, grey-800, etc.)
themes/<name>/variables.css  → Semantic colors (text-primary, border-action, chips-*)
platforms/<name>/variables.css → Sizing (gaps, icon frames, component heights)
```

## Themes

Semantic token **names are the same in every theme** — only color values change.

| Theme ID | Visual mode | Accent |
|----------|-------------|--------|
| `d-grey` | Light UI | Blue |
| `d-green` | Light UI | Green |
| `n-grey` | Dark UI | Blue |
| `n-green` | Dark UI | Green |
| `n-blue` | Dark UI | Blue |

**Rule:** Import exactly one theme. Multiple themes overwrite the same variable names.

**Surface layering:** See [layering-model.md](./layering-model.md) for how `--background-surface-container-*` tokens stack (background → 1 → 2 → 3).

## Platforms

| File | Description |
|------|-------------|
| `platforms/web` | Standard web sizing |
| `platforms/ipad` | Larger touch targets |
| `platforms/desktop` | Desktop sizing |

## Commonly used semantic tokens

### Text

| Token | Usage |
|-------|-------|
| `--text-primary` | Main body text, values |
| `--text-secondary` | Labels, helper text, column headers |
| `--text-disabled` | Disabled controls |
| `--text-action` | Links, selected checkboxes, primary actions |
| `--text-action-hover` | Hover on action text |

### Background & borders

| Token | Usage |
|-------|-------|
| `--background-background` | Page / app shell (lowest layer) |
| `--background-surface-container-1` | First elevation — sections on the page |
| `--background-surface-container-2` | Cards, menus, tooltips (most common) |
| `--background-surface-container-3` | Top elevation — modals, highest cards |
| `--background-input-fields` | Form inputs and selects |
| `--background-inside-surface-1/2` | Recessed areas inside elevated surfaces |
| `--border-primary` | Dividers, input borders |
| `--border-action-hover` | Focus rings |

Full stacking rules and examples: [layering-model.md](./layering-model.md).

### Chips (status badges)

| Token family | Component |
|--------------|-----------|
| `--chips-success-*` | `SuccessChip` |
| `--chips-warning-*` | `WarningChip` |
| `--chips-critical-*` | `CriticalChip` |
| `--chips-attemtion-*` | `AttentionChip` (spelling matches Figma) |
| `--chips-blue-*` | `DefaultChip` |
| `--chips-neutral-*` | `NeutralChip` |

Each chip family has `-default`, `-hover`, and `-selected` variants.

### Spacing (gap)

| Token | Typical use |
|-------|-------------|
| `--gap-0` | Tight / none |
| `--gap-xxs` | Focus outline offset |
| `--gap-xs` | Label-value gaps |
| `--gap-s` | Component internal padding |
| `--gap-m` | Section spacing |
| `--gap-l` | Large section gaps |

Used in CSS as: `calc(var(--gap-s) * 1px)`

### Typography

| Token | Usage |
|-------|-------|
| `--font-family` | Set in your app (e.g. Roboto) |
| `--font-font-size-body` | Body text |
| `--font-font-size-title-3` | Big values |
| `--font-font-size-title-6` | Listing item titles |
| `--font-font-size-comment` | Helper text |
| `--font-font-weight-title` | Bold titles |
| `--font-line-height-body` | Body line height |

### Icons

| Token | Usage |
|-------|-------|
| `--icon-small` | Small glyph size |
| `--icon-default` | Default glyph size |
| `--icon-frame-size-small` | Small icon frame |
| `--icon-frame-size-default` | Big icon frame |

### Components (platform-specific heights)

| Token | Usage |
|-------|-------|
| `--components-input-button-select-default` | Input / option row height |
| `--components-input-button-select-border-width` | Border width |
| `--compact-height` | `ButtonCompact` height |
| `--compact-min-width` | `ButtonCompact` min width |
| `--components-e-was-nav-item-*` | Nav item sizing |

### Shadows

| Token | Usage |
|-------|-------|
| `--shadow-action-menu` | Dropdowns, action menus |
| `--shadow-card` | Cards |
| `--shadow-popup-message` | Tooltips, modals |

## Using tokens in custom CSS

```css
.dashboard-card {
  background: var(--background-surface-container-2);
  border: calc(var(--components-input-button-select-border-width) * 1px) solid var(--border-primary);
  border-radius: calc(var(--radius-s) * 1px);
  padding: calc(var(--gap-m) * 1px);
  color: var(--text-primary);
  font-family: var(--font-family);
  box-shadow: var(--shadow-card);
}
```

## Usage rules

1. **Never** use `#hex` or `rgb()` for colors that have a semantic token.
2. **Never** guess spacing — use `--gap-*` tokens.
3. **Match theme to dashboard** — light canvases use `d-grey` or `d-green`; dark canvases use `n-*` themes. Read [layering-model.md](./layering-model.md) before choosing surface tokens.
4. **Swap platform, not hardcoded px** — for iPad layouts, change the platform import, don't manually resize icons.
5. **Chip colors come from theme** — don't style status pills with Tailwind `bg-green-500`; use `SuccessChip`.
