# Orbit Components — Index

Complete reference for `orbit-ds-components`. Read `setup.md`, `tokens.md`, and `styles.md` first.

## Import

```tsx
import { Button, ListingItem, SuccessChip } from 'orbit-ds-components';
import 'orbit-ds-components/styles.css';
```

## Component guides

| Component | Guide | Dashboard use |
|-----------|-------|---------------|
| **Chips (shared)** | [chips.md](./components/chips.md) | Select icon rules — read first |
| Button | [button.md](./components/button.md) | Primary actions, form submit |
| ButtonCompact | [button-compact.md](./components/button-compact.md) | Dense toolbars |
| ListingItem | [listing-item.md](./components/listing-item.md) | List rows, settings rows |
| LabelValueHorizontal | [label-value-horizontal.md](./components/label-value-horizontal.md) | Inline label+value, table cells |
| LabelValueVertical | [label-value-vertical.md](./components/label-value-vertical.md) | Stacked name+email, user cells |
| SuccessChip | [success-chip.md](./components/success-chip.md) | Active / success status |
| WarningChip | [warning-chip.md](./components/warning-chip.md) | Warning status |
| CriticalChip | [critical-chip.md](./components/critical-chip.md) | Error / critical status |
| AttentionChip | [attention-chip.md](./components/attention-chip.md) | Attention / info status |
| DefaultChip | [default-chip.md](./components/default-chip.md) | Default / info tags |
| NeutralChip | [neutral-chip.md](./components/neutral-chip.md) | Neutral filters, tags |
| InputSelect | [input-select.md](./components/input-select.md) | Dropdowns, filters |
| OptionCheckbox | [option-checkbox.md](./components/option-checkbox.md) | Checkbox rows, select-all |
| OptionRadio | [option-radio.md](./components/option-radio.md) | Radio option rows |
| OptionToggle | [option-toggle.md](./components/option-toggle.md) | Toggle settings rows |
| ActionMenu | [action-menu.md](./components/action-menu.md) | Dropdown menus |
| ActionMenuItem | [action-menu.md](./components/action-menu.md) | Menu rows |
| TitlesAndTabs | [titles-and-tabs.md](./components/titles-and-tabs.md) | Page header with tabs |
| Tooltip | [tooltip.md](./components/tooltip.md) | Help text, info popups |
| EWasNavBar | [ewas-nav-bar.md](./components/ewas-nav-bar.md) | App sidebar / top nav |
| EWasNavItem | [ewas-nav-item.md](./components/ewas-nav-item.md) | Single nav icon button |
| EWasNavItemWText | [ewas-nav-item-w-text.md](./components/ewas-nav-item-w-text.md) | Nav item with two lines |
| IconFrame | [icon-frame.md](./components/icon-frame.md) | Custom icon sizing |

## Chips — shared API

All chip components share the same props. **Read [chips.md](./components/chips.md) before using chips** — especially the select-icon (checkbox) rules.

```tsx
<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>
```

| Prop | Values | Default |
|------|--------|---------|
| `type` | `'chip'` (pill) \| `'tag'` (squared) | `'chip'` |
| `size` | `'default'` \| `'compact'` | `'default'` |
| `selected` | boolean | `false` |
| `showIcon` | boolean | `true` — use **`false`** for read-only status |
| `iconSize` | `'small'` \| `'big'` | `'small'` |
| `children` | string | `'Text'` |

**Quick rule:** read-only status → `showIcon={false}`. Selectable filter → `showIcon` + `onClick` + `selected`.

Only the **color tokens** differ between chip variants. Pick the semantic color that matches the status.

## Quick dashboard recipes

### Page header

```tsx
<TitlesAndTabs
  title="Users"
  tabItems={[
    { id: 'all', label: 'All', selected: true },
    { id: 'active', label: 'Active' },
  ]}
  onTabSelect={setTab}
/>

{/* Subheading goes OUTSIDE TitlesAndTabs — see titles-and-tabs.md */}
<p className="page-subtitle">Manage accounts and permissions.</p>
```

### Filter bar

```tsx
<div style={{ display: 'flex', gap: 'calc(var(--gap-s) * 1px)' }}>
  <InputSelect placeholder="Role" options={roleOptions} value={role} onValueChange={setRole} />
  <Button variant="secondary">Export</Button>
</div>
```

### Simple list row

```tsx
<ListingItem
  reorderIcon={false}
  showLeftIcon={false}
  label="Notifications"
  value="On"
  onClick={() => openSettings()}
/>
```

### Status badge

```tsx
<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>
```

## Anti-patterns (do not do this)

| Wrong | Right |
|-------|-------|
| `<button className="bg-blue-500">` | `<Button variant="primary">` |
| Custom pill for status | `SuccessChip` / `WarningChip` with `showIcon={false}` |
| Status chip with default icon (looks like dead checkbox) | `showIcon={false}` on read-only chips — see [chips.md](./components/chips.md) |
| `OptionCheckbox` in `ListingItem leftIcon` | Checkbox beside row — see listing-item guide |
| Multiple columns in `addIconsComponent` | One control per slot — see [listing-item.md](./components/listing-item.md) |
| Button label clipped in `ListingItem` row | `minWidth={false}` on `Button`; don't fix actions slot to icon width — see [listing-item.md](./components/listing-item.md) |
| Skip token CSS imports | Always load primitives + theme + platform |
| Import multiple themes | One theme only |
| Subheading inside `TitlesAndTabs` | Subheading below (pages) or in dialog body — see [titles-and-tabs.md](./components/titles-and-tabs.md) |
| `showTitleIcon={false}` to hide back icon only | `showTitleIcon` + `showLeftIcon={false}` — `showTitleIcon={false}` removes the title |
| Extra `padding-block` on `TitleTab` or modal header | Fixed 36px row; tabs stretch with no vertical padding |
| Dialog title as `TitleTab` | Static dialog title + `TitleTab` for tabs only — see [titles-and-tabs.md](./components/titles-and-tabs.md) |
| Close icon misaligned in tabbed dialog | Fixed header height + actions slot — see [titles-and-tabs.md](./components/titles-and-tabs.md) |
| Multiple `LabelValueVertical` stacked vertically | Grid wrapper with `display: grid` + column template — see [label-value-vertical.md](./components/label-value-vertical.md) |
| `grid-template-columns` only, no `display: grid` | Both on parent wrapper | Columns never apply |
| Related stat cells with no group border | `stats-group` wrapper + `--border-secondary` below — see [label-value-vertical.md](./components/label-value-vertical.md) |
| Section border inset in padded dialog | Full-bleed divider — see [styles.md](./styles.md#dialog-body-section-dividers) |
| `InputSelect` at 460px max-width in wide dialog | `max-width: none` on form fields — see [styles.md](./styles.md#dialog-form-layout) |
| All dialog form fields stacked in one column on wide modal | `.dialog-form-grid` for paired selects/short inputs — see [styles.md](./styles.md#dialog-form-layout) |
| Full-width `TitlesAndTabs` + narrow centered page body | Same-width page shell — see [styles.md](./styles.md#page-width-alignment-header--body) |
| Page content on `--background-background` | Page canvas `background`; header `container-1`; cards `container-2` — see [layering-model.md](./layering-model.md#page-layout-canvas--elevated-blocks) |
| Entire `<main>` painted `container-1` | Keep page canvas as `background` | Flat white page — no visible canvas |
| Dialog heading on page instead of in dialog | Title in dialog header; subtitle in dialog body |
