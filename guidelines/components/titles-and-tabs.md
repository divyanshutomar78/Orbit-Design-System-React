# TitlesAndTabs & TitleTab

Page header bar with back icon, uppercase title, tabs, extra slot, and menu icon.

## Import

```tsx
import { TitlesAndTabs, TitleTab } from 'orbit-ds-components';
```

## Basic usage

```tsx
<TitlesAndTabs
  title="Users"
  tabItems={[
    { id: 'all', label: 'All', selected: true },
    { id: 'active', label: 'Active' },
    { id: 'invited', label: 'Invited' },
  ]}
  onTabSelect={(id) => setTab(id)}
/>
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `title` | `'Title'` | Page title (uppercase styling applied) |
| `showTitleIcon` | `true` | Icon next to title |
| `showLeftIcon` | `true` | Back chevron |
| `showTabs` | `true` | Tab row |
| `tabItems` / `tabs` | one tab | Tab configuration |
| `showExtraSlot` | `true` | Middle slot for extra components |
| `showRightIcons` | `true` | Menu icon on right |
| `iconSize` | `'big'` | Icon frame size |
| `onTabSelect` | — | Tab click callback |

## Dashboard examples

```tsx
// Standard dashboard page header
<TitlesAndTabs
  title="Analytics"
  tabItems={[
    { id: 'overview', label: 'Overview', selected: tab === 'overview' },
    { id: 'reports', label: 'Reports', selected: tab === 'reports' },
  ]}
  onTabSelect={setTab}
/>

// Minimal — title only
<TitlesAndTabs
  showTabs={false}
  showRightIcons={false}
  title="Settings"
/>
```

## Rules

- One `TitlesAndTabs` per page/view at the top.
- Control selected tab via `tabItems[].selected` or state + `onTabSelect`.
- Export `TitleTab` for fully custom tab rows.
