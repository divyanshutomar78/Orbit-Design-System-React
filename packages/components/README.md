# orbit-ds-components

Angular component library for the Orbit design system. Styles use CSS custom properties from **orbit-ds-variables**.

## Quick start

```bash
npm install orbit-ds-components orbit-ds-variables @angular/core @angular/common
```

```ts
import { ButtonComponent, InputSelectComponent } from 'orbit-ds-components';
import 'orbit-ds-variables/dist/css/themes/d-grey/index.css';
import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
// Optional: bundled stylesheet (components also include styles via styleUrls)
import 'orbit-ds-components/styles.css';
```

```html
<orbit-button variant="primary" label="Save"></orbit-button>
<orbit-input-select [options]="options"></orbit-input-select>
```

Set `--font-family` in your app (e.g. `Roboto, sans-serif`) and load the matching web font.

## Icon sizes

Components with icons accept `iconSize?: 'small' | 'big'`. Sizing comes from platform tokens (swap `platforms/web` vs `platforms/ipad` in Storybook):

| `iconSize` | Frame token | Glyph token |
|------------|-------------|-------------|
| `small` | `--icon-frame-size-small` | `--icon-small` |
| `big` | `--icon-frame-size-default` | `--icon-default` |

**Web:** small 18×18, big 24×24 (frame and icon match). **iPad:** small 24×24; big uses a 44×44 frame with a 24×24 icon centered inside.

Use `IconFrameComponent` for custom slots:

```html
<orbit-icon-frame size="big">
  <my-icon></my-icon>
</orbit-icon-frame>
```

## Setup

Import a theme and platform token bundle before rendering components:

```css
@import 'orbit-ds-variables/dist/css/themes/d-green/index.css';
@import 'orbit-ds-variables/dist/css/platforms/web/variables.css';
```

## Button

```html
<orbit-button variant="primary" label="Save"></orbit-button>
<orbit-button variant="secondary" label="Add" [showLeftIcon]="true">
  <span orbitLeftIcon>+</span>
</orbit-button>
<orbit-button variant="tertiary" label="Cancel" [disabled]="true"></orbit-button>
```

| Input | Default | Figma |
|-------|---------|-------|
| `variant` | `primary` | Button Type |
| `minWidth` | `true` | Min width (84px content) |
| `showLeftIcon` / `showRightIcon` | `false` | IC_left / IC_right slots |
| `label` | `''` | Button text |
| `disabled` | `false` | Disabled state |

## Content projection

Icon and custom content slots use attribute selectors:

| Slot attribute | Used by |
|----------------|---------|
| `[orbitLeftIcon]` / `[orbitRightIcon]` | Button, ButtonCompact, ListingItem |
| `[orbitIcon]` / `[orbitSelectedIcon]` | Chips |
| `[orbitLabelValue]` / `[orbitAddIcons]` | ListingItem |
| `[orbitPopupContent]` | Tooltip |

## Storybook

```bash
npm run storybook
```

Theme and platform toolbars switch `orbit-ds-variables` CSS at runtime.
