# Orbit Design System — Figma Make Guidelines

Read these files **before** generating dashboard UI with `orbit-ds-components` and `orbit-ds-variables`.

## Start here

| File | Purpose |
|------|---------|
| [setup.md](./setup.md) | Install packages, import order, project structure |
| [tokens.md](./tokens.md) | CSS variables — colors, spacing, typography |
| [styles.md](./styles.md) | Global styles, layout patterns, Tailwind rules |
| [components.md](./components.md) | Component index + quick recipes |

## Component guides

Each file in [components/](./components/) documents one component with props, examples, and dashboard patterns.

## Critical rules for Make agents

1. Import token CSS **before** `orbit-ds-components/styles.css`.
2. Set `--font-family` in global CSS.
3. Use Orbit components — don't recreate with Tailwind/HTML.
4. Use chips for status (`SuccessChip`, `WarningChip`, etc.).
5. Use `LabelValueVertical` for name + email cells.
6. **Don't** put `OptionCheckbox` in `ListingItem` `leftIcon`.
7. **Don't** put table columns in `ListingItem` `addIconsComponent`.
8. Use one theme + one platform — never import multiple themes.

## Package versions

```json
{
  "orbit-ds-components": "^1.0.1",
  "orbit-ds-variables": "^1.0.4"
}
```
