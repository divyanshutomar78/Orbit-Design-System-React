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

## eWAS Nav Item

Maps to Figma **eWAS Nav Item** (`node 4486:143873`) — icon nav control with Default / Active / Disabled and Horizontal / Split View / Vertical layouts.

```tsx
import { EWasNavItem } from '@orbit/components';

<EWasNavItem navItem="Flights" orientation="horizontal" state="active" />
<EWasNavItem orientation="splitView" state="default" />
```

| Prop | Figma | Default |
|------|-------|---------|
| `navItem` | Nav Item | `"Flights"` |
| `icon` | Icon | rocket icon |
| `orientation` | Orientation | `'horizontal'` |
| `state` | State | `'default'` |
| `iconSize` | — | `'big'` (24px glyph) |

Split View shows icon only (no label). Sizes use `--components-e-was-nav-item-*` platform tokens.

## eWAS Nav Item w Text

Maps to Figma **eWAS Nav Item w text** (`node 4487:144286`) — two-line flight nav or Split View info icon.

```tsx
import { EWasNavItemWText } from '@orbit/components';

<EWasNavItemWText characters="6" orientation="horizontal" state="selected" />
<EWasNavItemWText characters="default" orientation="splitView" />
```

| Prop | Figma | Default |
|------|-------|---------|
| `characters` | Characters | `'6'` (`'6'` \| `'7'` \| `'8'` \| `'default'`) |
| `primaryText` / `secondaryText` | — | preset from Characters |
| `orientation` | Orientation | `'horizontal'` |
| `state` | State | `'default'` \| `'selected'` |
| `icon` | Icon (Split View) | info icon |

Uses the same `--components-e-was-nav-item-*` size tokens as **eWAS Nav Item**.

## eWAS Nav Bar

Maps to Figma **eWAS Nav Bar** (`node 4491:87974`) — composes **eWAS Nav Item** and **eWAS Nav Item w Text**.

```tsx
import { EWasNavBar } from '@orbit/components';

<EWasNavBar flight orientation="horizontal" />
<EWasNavBar flight orientation="horizontal" activeItemId={activeId} onItemSelect={setActiveId} />
<EWasNavBar flight={false} orientation="vertical" />
```

| Prop | Figma | Default |
|------|-------|---------|
| `flight` | Flight | `true` |
| `orientation` | Orientation | `'horizontal'` |
| `flightHeader` | — | `EWasNavItemWText` when `flight` |
| `primaryItems` | — | Flights / Airport / Opti Flight |
| `branding` | — | SITA logo when `flight={false}` |
| `utilityItems` | — | Data / Config / User |
| `footerItem` | — | V1.0 + pilot icon |
| `activeItemId` / `onItemSelect` | — | selection callbacks |

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

## Label Value Vertical

Maps to Figma **Label Value_Vertical** (`1832:34754`). Stacked label and value with three layout variants.

```tsx
import { LabelValueVertical } from '@orbit/components';

<LabelValueVertical layout="L+V" label="Status" value="Active" />
<LabelValueVertical layout="V + L" label="Flight" value="AB123" />
<LabelValueVertical layout="L + V + L" secondaryLabel="Unit" big />
```

| Prop | Default | Figma |
|------|---------|-------|
| `layout` | `L+V` | Layout (`V + L`, `L+V`, `L + V + L`) |
| `label` / `value` | `Label` / `Value` | Text content |
| `secondaryLabel` | `Label` | Bottom label (`L + V + L`) |
| `big` | `false` | Only Value — Big (Title 3) |
| `labelSlot` / `valueSlot` | — | Add more Label / Value |

## Option Toggle

Maps to Figma **Option Toggle** (`569:28473`). Toggle switch row with Off / On / Partial states.

```tsx
import { OptionToggle } from '@orbit/components';

<OptionToggle state="on" label="Enable feature" onChange={handleChange} />
<OptionToggle state="partial" label="Sync" showRightIcon />
```

| Prop | Default | Figma |
|------|---------|-------|
| `label` | `Option` | Text Option |
| `state` | `off` | State (Off / On / Partial) |
| `status` | `default` | Status |
| `showRightIcon` | `false` | showRightIcon |
| `checked` / `partial` | — | Convenience aliases |

## Option Checkbox

Maps to Figma **Option Checkbox** (`570:29495`). Checkbox row with Off / On / Partial states.

```tsx
import { OptionCheckbox } from '@orbit/components';

<OptionCheckbox state="on" label="Option A" onChange={handleChange} />
<OptionCheckbox state="partial" label="Select all" />
```

| Prop | Default | Figma |
|------|---------|-------|
| `label` | `Option` | Text Option |
| `state` | `off` | State (Off / On / Partial) |
| `status` | `default` | Status (Default / Hover / Disabled) |
| `checked` / `indeterminate` | — | HTML convenience aliases |
| `textSlot` | — | textComponent slot |

## Option Radio

Maps to Figma **Option Radio** (`570:29315`). Single radio row with icon and label; height uses `--components-input-button-select-default`.

```tsx
import { OptionRadio } from '@orbit/components';

<OptionRadio name="plan" value="a" label="Option A" selected={value === 'a'} onChange={() => setValue('a')} />
```

| Prop | Default | Figma |
|------|---------|-------|
| `label` | `Option` | Text Option |
| `selected` | `false` | Selected On/Off |
| `status` | `default` | Status (Default / Hover / Disabled) |
| `textSlot` | — | textComponent slot |
| `iconSize` | `big` | 24px icon frame |

## Input Select

Maps to Figma **Input Select** (`800:4645`). Select field with label, optional info icon, helper/error lines, and input background states.

```tsx
import { InputSelect } from '@orbit/components';

<InputSelect placeholder="Placeholder" />
<InputSelect
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  value={value}
  onValueChange={setValue}
  showBottomSpaceHelper
  showClearIcon
/>
```

When `options` are provided, clicking the field opens an **Action Menu** dropdown (not the native browser select).

| Prop | Default | Figma |
|------|---------|-------|
| `showLabel` | `true` | Show Label |
| `showLabelInfo` | `true` | Only Label info icon |
| `showHelper` | `true` | Show Helper |
| `showBottomSpaceHelper` | `false` | Show Bottom Space Helper |
| `showErrorMessage` | `false` | Show Error Message |
| `contentType` | auto | _Input_inner_content Type |
| `visualState` | auto | _Input_background State |
| `showRightIcons` | auto when filled | _Input_Icons_Right |
| `options` | — | Mapped to Action Menu items |
| `menuItems` | — | Custom Action Menu rows |
| `actionMenuProps` | — | Passed to `ActionMenu` |

## Tooltip

Maps to Figma **Tooltip popup** (`3511:83124`) and **Tooltip with i** (`2887:39517`). Dark surface popup with action-menu shadow; optional info-icon trigger with hover/focus.

```tsx
import { Tooltip, TooltipPopup } from '@orbit/components';

<TooltipPopup text="Toolem ipsum" />
<Tooltip text="Short help copy" direction="right" />
<Tooltip
  open
  showText={false}
  popupContent={<LabelValueHorizontal layout="L + V" label="Lat" value="51.4780" />}
/>
```

| Prop | Default | Figma |
|------|---------|-------|
| `text` | `Toolem ipsum` | Default text |
| `showText` | `true` | Show Default Text |
| `popupContent` | — | Add more components |
| `direction` | `right` | Direction (`left` / `right`) |
| `open` | — | State (controlled) |
| `trigger` | info icon | Custom trigger slot |

## Label Value Horizontal

Maps to Figma **Label Value_Horizontal** (`94:156`). Inline label and value with five type variants.

```tsx
import { LabelValueHorizontal } from '@orbit/components';

<LabelValueHorizontal layout="L + V" label="Gate" value="B12" />
<LabelValueHorizontal layout="V + L" label="ETA" value="14:30" />
<LabelValueHorizontal layout="L+V+L" secondaryLabel="Label2" />
<LabelValueHorizontal layout="V" value="42" big />
```

| Prop | Default | Figma |
|------|---------|-------|
| `layout` | `L + V` | Type (`L + V`, `V + L`, `L+V+L`, `V`, `L`) |
| `label` / `value` | `Label` / `Value` | Text content |
| `secondaryLabel` | `Label2` | Second label (`L+V+L`) |
| `big` | `false` | Only Value — Big (Title 3) |
| `labelSlot` / `valueSlot` | — | Add more Label / Value |

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
