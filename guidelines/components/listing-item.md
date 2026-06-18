# ListingItem

Flexible list row for settings, navigation, and simple lists. **Not a full data-table component.**

## Import

```tsx
import { ListingItem, LabelValueVertical, SuccessChip } from 'orbit-ds-components';
```

## Basic usage

```tsx
// Simple row
<ListingItem
  reorderIcon={false}
  showLeftIcon={false}
  label="Status"
  value="Active"
  onClick={() => {}}
/>

// Multi-line row
<ListingItem
  multiLine
  reorderIcon={false}
  title="Alice Fontaine"
  label="Role"
  value="Owner"
  showHelper
  helper="Last active 2h ago"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `multiLine` | boolean | `false` | Stack title / label-value / helper vertically |
| `reorderIcon` | boolean | `true` | Drag handle on leading edge |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Icon frame size |
| `showLeftIcon` | boolean | `true` | Info icon on left |
| `showRightIcon` | boolean | `true` | Chevron on right |
| `showTitle` | boolean | `false` | Title before label/value (single-line only) |
| `showLabelValue` | boolean | `true` | Built-in label+value row |
| `showHelper` | boolean | `false` | Helper line (multi-line only) |
| `title` / `label` / `value` / `helper` | ReactNode | strings | Text content |
| `leftIcon` / `rightIcon` | ReactNode | default SVGs | **Icon-sized slots only (18–24px)** |
| `labelValue` | ReactNode | — | Replace default label+value |
| `addIconsComponent` | ReactNode | — | Trailing action slot (single widget) |
| `onClick` | function | — | Makes row interactive |

## Correct patterns

### Settings list

```tsx
<ListingItem
  reorderIcon={false}
  showLeftIcon={false}
  showRightIcon
  label="Email notifications"
  value="Enabled"
  onClick={openEmailSettings}
/>
```

### User row with custom cell

```tsx
<ListingItem
  reorderIcon={false}
  showLeftIcon={false}
  showLabelValue={false}
  labelValue={
    <LabelValueVertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io" />
  }
  addIconsComponent={<SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>}
/>
```

### User table with checkbox (correct)

Place checkbox **outside** ListingItem, or use a flex wrapper:

```tsx
<div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
  <OptionCheckbox label="" aria-label="Select Alice" iconSize="small" />
  <div style={{ flex: 1 }}>
    <ListingItem
      reorderIcon={false}
      showLeftIcon={false}
      showRightIcon={false}
      showLabelValue={false}
      labelValue={
        <LabelValueVertical layout="V + L" value="Alice Fontaine" label="alice@orbit.io" />
      }
    />
  </div>
  <SuccessChip type="chip" size="compact" showIcon={false}>Active</SuccessChip>
</div>
```

## Anti-patterns (causes broken layout)

| Don't | Why |
|-------|-----|
| `<OptionCheckbox label="Option" />` in `leftIcon` | Squeezed into 24px frame → vertical "Option" text |
| Multiple table columns in `addIconsComponent` | Slot is ~24px wide — columns overflow |
| Default props for table rows | Turn off `reorderIcon`, `showLeftIcon` when not needed |
| Full-width table with ListingItem alone | `__main` expands; actions slot stays narrow |

## Defaults to change for dashboards

```tsx
<ListingItem
  reorderIcon={false}   // no drag handle
  showLeftIcon={false}  // no info icon
  showRightIcon={true}  // keep chevron for navigation rows
  ...
/>
```
