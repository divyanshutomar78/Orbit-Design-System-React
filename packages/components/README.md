# @orbit/components

React 18 component library for the Orbit design system. Styles use CSS custom properties from **Orbit Personal Tokens**.

## Icon sizes

Components with icons accept `iconSize?: 'small' | 'big'`. Sizing comes from platform tokens (swap `platforms/web` vs `platforms/ipad` in Storybook):

| `iconSize` | Frame token | Glyph token |
|------------|-------------|-------------|
| `small` | `--icon-frame-size-small` | `--icon-small` |
| `big` | `--icon-frame-size-default` | `--icon-default` |

**Web:** small 18×18, big 24×24 (frame and icon match). **iPad:** small 24×24; big uses a 44×44 frame with a 24×24 icon centered inside.

Use `IconFrame` for custom slots:

```tsx
import { IconFrame } from '@orbit/components';

<IconFrame size="big"><MyIcon /></IconFrame>
```

## Setup

Import a theme and platform token bundle before rendering components:

```css
@import '../../Orbit-Personal-Tokens/dist/css/font-family/roboto/variables.css';
@import '../../Orbit-Personal-Tokens/dist/css/themes/d-green/index.css';
@import '../../Orbit-Personal-Tokens/dist/css/platforms/web/variables.css';
```

## Button

Maps to Figma **Button** (`node 543:32573`) — types Primary, Secondary, Tertiary with hover, press, and disabled via native button states.

```tsx
import { Button } from '@orbit/components';
import '@orbit/components/styles.css';

<Button variant="primary">Save</Button>
<Button variant="secondary" leftIcon={<IconPlus />}>Add</Button>
<Button variant="tertiary" disabled>Cancel</Button>
```

| Prop | Default | Figma |
|------|---------|-------|
| `variant` | `primary` | Button Type |
| `minWidth` | `true` | Min width (84px content) |
| `leftIcon` / `rightIcon` | — | IC_left / IC_right |
| `disabled` | — | Disabled state |

## Attention Chip

Maps to Figma **_Attention Chip** (`node 4917:93419`). Same API as Neutral Chip; uses `--chips-attemtion-*` theme tokens (spelling matches tokens.json).

```tsx
import { AttentionChip } from '@orbit/components';

<AttentionChip type="chip" selected>
  Text
</AttentionChip>
```

## Warning Chip

Maps to Figma **_Warning Chip** (`node 4917:93843`). Same API as other chips; uses `--chips-warning-default`, `--chips-warning-hover`, `--chips-warning-selected`.

```tsx
import { WarningChip } from '@orbit/components';

<WarningChip type="tag" size="compact" selected>
  Text
</WarningChip>
```

## Success Chip

Maps to Figma **_Success Chip** (`node 4917:94234`). Same API as other chips; uses `--chips-success-default`, `--chips-success-hover`, `--chips-success-selected`.

```tsx
import { SuccessChip } from '@orbit/components';

<SuccessChip type="chip" selected>
  Text
</SuccessChip>
```

## Critical Chip

Maps to Figma **_Critical Chip** (`node 4917:94689`). Same API as other chips; uses `--chips-critical-default`, `--chips-critical-hover`, `--chips-critical-selected`.

```tsx
import { CriticalChip } from '@orbit/components';

<CriticalChip type="tag" size="compact" selected>
  Text
</CriticalChip>
```

## Default Chip

Maps to Figma **_Default Chip** (`node 4927:123993`). Same API as other chips; uses blue chip theme tokens `--chips-blue-default`, `--chips-blue-hover`, `--chips-blue-selected`.

```tsx
import { DefaultChip } from '@orbit/components';

<DefaultChip type="chip" selected>
  Text
</DefaultChip>
```

## Neutral Chip

Maps to Figma **_Neutral Chip** (`node 4916:90986`) — Type Chip/Tag, Size Default/Compact, selectable states.

```tsx
import { NeutralChip } from '@orbit/components';

<NeutralChip type="chip" size="default" selected>
  Text
</NeutralChip>
<NeutralChip type="tag" size="compact">
  Label
</NeutralChip>
```

## Action Menu

Maps to Figma **Action Menu** (`node 3705:19982`) — surface container with selectable rows, optional checkmark, chevron, and close actions.

```tsx
import { ActionMenu } from '@orbit/components';

<ActionMenu
  items={[
    { id: 'a', label: 'Next 12 hours', showRightIcon1: true, showRightIcon2: true },
    { id: 'b', label: 'This week', selected: true },
  ]}
  onItemSelect={(id) => setSelected(id)}
  onItemRightIcon2={(id) => removeItem(id)}
/>
```

| Prop | Description |
|------|-------------|
| `items` | Row config passed to `ActionMenuItem` |
| `addItems` | Figma Add Items — enables top Add more item slot |
| `addMoreItem` | Content for that slot (e.g. `ActionMenuItem` with `as="div"`) |
| `iconSize` | `small` \| `big` for row icons |
| `onItemSelect` / `onItemRightIcon1` / `onItemRightIcon2` | Row callbacks |

### Action Menu Item (`ActionMenuItem`)

Maps to Figma **Action Menu Item w select** — props mirror the component set:

| Prop | Figma | Default |
|------|-------|---------|
| `label` | - Text | `"Item"` |
| `selected` | State | `false` |
| `showLeftIcon` | Show Left Icon | `true` |
| `leftIconType` | left icon Type | `'checkmark'` |
| `showRightIcon1` | Right icon 1 | `true` |
| `showRightIcon2` | Right icon 2 | `true` |
| `rightIcon1` / `rightIcon2` | - Right icon 1 / 2 | default chevron / close |
| `leftIcon` | custom left slot | — |

`leftIconType` also supports `'checkbox'`, `'radio'`, and `'toggle'` (Figma _Action Menu Left icons).

Export `ActionMenuItem` for custom menus and the Add more item slot.

## Titles and Tabs

Maps to Figma **Title** (`node 99:367`) — header bar with back icon, spaced uppercase title, tabs, optional slot, and menu icon.

```tsx
import { TitlesAndTabs } from '@orbit/components';

<TitlesAndTabs
  title="Title"
  tabItems={[
    { id: 'a', label: 'Tab', selected: true },
    { id: 'b', label: 'Other' },
  ]}
  onTabSelect={(id) => console.log(id)}
/>
```

| Prop | Default | Figma |
|------|---------|-------|
| `showTitleIcon` | `true` | Show Title Icon |
| `showLeftIcon` | `true` | Show left icon (back chevron) |
| `showTabs` | `true` | Show Tabs |
| `tabItems` / `tabs` | one “Tab” | Add more tabs |
| `showExtraSlot` | `true` | Add Extra Components |
| `showRightIcons` | `true` | Show right icons (menu) |
| `iconSize` | `big` | `small` \| `big` icon frames |

Export `TitleTab` for custom tab rows.

## Listing Item

Maps to Figma **Listing item** (`node 908:1711`). Supports single-line and multi-line layouts with optional reorder handle, icons, title, label/value, helper, and action slots.

```tsx
import { ListingItem } from '@orbit/components';

<ListingItem label="Status" value="Active" onClick={() => {}} />
<ListingItem
  multiLine
  title="Section"
  label="Label"
  value="Value"
  showHelper
  helper="Additional context"
/>
```

| Prop | Default | Figma |
|------|---------|-------|
| `multiLine` | `false` | Multi-line |
| `reorderIcon` | `true` | GF icon reorder |
| `showLeftIcon` | `true` | Show left icon |
| `showRightIcon` | `true` | Show right icon |
| `showTitle` | `false` | Show Title (single-line) |
| `showLabelValue` | `true` | Label + value row |
| `showHelper` | `false` | Helper (multi-line) |
| `leftIcon` / `rightIcon` | default SVGs | Icon slots |
| `addIconsComponent` | — | Add Icons/Component |
| `labelValue` | — | Custom label+value slot |

## Button Compact

Maps to Figma **Button Compact** (`node 1970:74393`). Same API as `Button`, using compact platform tokens (`compact-height`, `compact-min-width`, etc.).

```tsx
import { ButtonCompact } from '@orbit/components';

<ButtonCompact variant="secondary">Button</ButtonCompact>
```

## Develop

```bash
npm run storybook   # from repo root
npm run build       # builds @orbit/components
```
