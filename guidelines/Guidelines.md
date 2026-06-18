# Orbit Design System Guidelines

Read these files **before** generating dashboard UI with `orbit-ds-components` and `orbit-ds-variables`.

## Start here

| File | Purpose |
|------|---------|
| [setup.md](./setup.md) | Install packages, import order, project structure |
| [tokens.md](./tokens.md) | CSS variables — colors, spacing, typography |
| [layering-model.md](./layering-model.md) | Surface stacking — which background token to use where |
| [styles.md](./styles.md) | Global styles, layout patterns, Tailwind rules |
| [components.md](./components.md) | Component index + quick recipes |

## Component guides

Each file in [components/](./components/) documents one component with props, examples, and dashboard patterns.

## Critical rules

1. Import token CSS **before** `orbit-ds-components/styles.css`.
2. Set `--font-family` in global CSS.
3. Use Orbit components — don't recreate with Tailwind/HTML.
4. Use chips for status (`SuccessChip`, `WarningChip`, etc.) with **`showIcon={false}`** on read-only badges — see [components/chips.md](./components/chips.md).
5. Use `LabelValueVertical` for name + email cells. **Multiple `LabelValueVertical` in one row** need a grid wrapper with `display: grid` — see [components/label-value-vertical.md](./components/label-value-vertical.md).
6. **Don't** put `OptionCheckbox` in `ListingItem` `leftIcon`.
7. **Don't** put table columns in `ListingItem` `addIconsComponent`.
8. Use one theme + one platform — never import multiple themes.
9. **`TitlesAndTabs` is for full pages only** — not dialogs or modals. Page subheading below the component; dialog subheading in dialog body. **`TitleTab` is for selectable tabs only** — never for dialog titles. Page body must share header width — see [styles.md](./styles.md#page-width-alignment-header--body) and [components/titles-and-tabs.md](./components/titles-and-tabs.md).
10. **Page canvas = `background`** — visible full page and in gaps. **`TitlesAndTabs` header bar = `container-1`**. Cards = `container-2`. Do **not** paint all of `<main>` with `container-1`. See [layering-model.md](./layering-model.md#page-layout-canvas--elevated-blocks).

## Package versions

```json
{
  "orbit-ds-components": "^1.0.1",
  "orbit-ds-variables": "^1.0.4"
}
```
