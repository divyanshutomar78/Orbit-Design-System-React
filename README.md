# Orbit Design System

Orbit is a React component library and design system for building consistent web interfaces. It includes reusable UI components, CSS design tokens, component guidance, and a Storybook catalog for previewing the components.

The component package is written in React 18 and TypeScript. It is a library for use in React applications, not a standalone application or an Angular package.

## What's Included

### Components

The public components are exported from `orbit-ds-components`:

| Area | Components | Guide |
| --- | --- | --- |
| Actions | `Button`, `ButtonCompact`, `ActionMenu`, `ActionMenuItem` | [Buttons](guidelines/components/button.md), [compact buttons](guidelines/components/button-compact.md), [action menus](guidelines/components/action-menu.md) |
| Data display | `ListingItem`, `LabelValueHorizontal`, `LabelValueVertical` | [ListingItem](guidelines/components/listing-item.md), [horizontal label/value](guidelines/components/label-value-horizontal.md), [vertical label/value](guidelines/components/label-value-vertical.md) |
| Form controls | `InputSelect`, `OptionCheckbox`, `OptionRadio`, `OptionToggle` | [InputSelect](guidelines/components/input-select.md), [checkbox](guidelines/components/option-checkbox.md), [radio](guidelines/components/option-radio.md), [toggle](guidelines/components/option-toggle.md) |
| Chips and status | `NeutralChip`, `DefaultChip`, `SuccessChip`, `WarningChip`, `CriticalChip`, `AttentionChip` | [Shared chip guidance](guidelines/components/chips.md) |
| Navigation and tabs | `EWasNavBar`, `EWasNavItem`, `EWasNavItemWText`, `TitlesAndTabs`, `TitleTab` | [Navigation bar](guidelines/components/ewas-nav-bar.md), [navigation item](guidelines/components/ewas-nav-item.md), [navigation item with text](guidelines/components/ewas-nav-item-w-text.md), [titles and tabs](guidelines/components/titles-and-tabs.md) |
| Utilities | `IconFrame`, `Tooltip`, `TooltipPopup` | [IconFrame](guidelines/components/icon-frame.md), [Tooltip](guidelines/components/tooltip.md) |

The component guides document props, examples, and composition details. The [component index](guidelines/components.md) also includes common dashboard recipes and usage pitfalls.

### Design tokens

Component styles use CSS custom properties provided by `orbit-ds-variables`. The token package contains:

- Primitive values such as the raw color palette.
- Semantic themes: `d-grey`, `d-green`, `n-grey`, `n-green`, and `n-blue`.
- Platform sizing: `web`, `ipad`, and `desktop`.

Load one theme and one platform bundle in the consuming app. See [token guidance](guidelines/tokens.md) and the [layering model](guidelines/layering-model.md) for details.

### Storybook

The Storybook app lives in `apps/storybook`. It documents the components and provides toolbar controls for switching Orbit themes and platform sizing tokens.

## Installation

In a React 18 application, install the component package, token package, and React peer dependencies:

```sh
npm install orbit-ds-components orbit-ds-variables react react-dom
```

Import tokens before the component styles. This example uses the `d-grey` theme and `web` sizing:

```tsx
// src/main.tsx
import 'orbit-ds-variables/dist/css/primitives/variables.css';
import 'orbit-ds-variables/dist/css/themes/d-grey/variables.css';
import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
import 'orbit-ds-components/styles.css';

import { Button, SuccessChip } from 'orbit-ds-components';
```

Set the font token in your app's global CSS and load the corresponding font:

```css
:root {
  --font-family: Roboto, sans-serif;
}
```

Example usage:

```tsx
function Example() {
  return (
    <div>
      <Button variant="primary">Save changes</Button>
      <SuccessChip type="chip" size="compact" showIcon={false}>
        Active
      </SuccessChip>
    </div>
  );
}
```

Choose exactly one theme and one platform bundle. Importing multiple themes overwrites the same semantic CSS variables. The [setup guide](guidelines/setup.md) covers package setup, fonts, themes, platforms, and troubleshooting.

## Development

Requirements: Node.js 18 or newer and npm.

```sh
npm ci
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006). Other root scripts:

| Command | Purpose |
| --- | --- |
| `npm run build` | Build the component library. |
| `npm run build:storybook` | Build the Storybook site. |
| `npm run verify:tokens` | Check token usage with the repository verification script. |
| `npm run publish:components` | Build and publish `orbit-ds-components` to npm. |

## Repository Layout

```text
apps/storybook/       Component stories and Storybook configuration
guidelines/           Setup, token, style, layering, and component guides
packages/components/  React component library and its CSS
packages/tokens/      Workspace entry points for token CSS from orbit-ds-variables
scripts/              Repository verification scripts
```

The main packages are `orbit-ds-components` and the upstream `orbit-ds-variables` dependency. The `@orbit/tokens` workspace package provides convenient CSS entry points for the upstream token files; see [its README](packages/tokens/README.md).

## Documentation

- [Getting started and setup](guidelines/setup.md)
- [Design tokens](guidelines/tokens.md)
- [Surface layering](guidelines/layering-model.md)
- [Global styles and layout](guidelines/styles.md)
- [Component index and recipes](guidelines/components.md)
- [Component package README](packages/components/README.md)