# ListingItem

Flexible list row for settings, navigation, and simple lists. **Not a full data-table component.**

## Import

```ts
import {
  ListingItemComponent,
  LabelValueVerticalComponent,
  SuccessChipComponent,
} from 'orbit-ds-components';
```

## Basic usage

```html
<!-- Simple row -->
<orbit-listing-item
  [reorderIcon]="false"
  [showLeftIcon]="false"
  label="Status"
  value="Active"
  [interactive]="true"
  (click)="onRowClick()"
></orbit-listing-item>

<!-- Multi-line row -->
<orbit-listing-item
  [multiLine]="true"
  [reorderIcon]="false"
  title="Alice Fontaine"
  label="Role"
  value="Owner"
  [showHelper]="true"
  helper="Last active 2h ago"
></orbit-listing-item>
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `multiLine` | boolean | `false` | Stack title / label-value / helper vertically |
| `reorderIcon` | boolean | `true` | Drag handle on leading edge |
| `iconSize` | `'small'` \| `'big'` | `'big'` | Icon frame size |
| `showLeftIcon` | boolean | `true` | Info icon on left |
| `showRightIcon` | boolean | `true` | Chevron on right |
| `showTitle` | boolean | `false` | Title before label/value (single-line only) |
| `showLabelValue` | boolean | `true` | Built-in label+value row |
| `showHelper` | boolean | `false` | Helper line (multi-line only) |
| `title` / `label` / `value` / `helper` | string | strings | Text content |
| `[orbitLeftIcon]` / `[orbitRightIcon]` | projected content | default SVGs | **Icon-sized slots only (18–24px)** |
| `[orbitLabelValue]` | projected content | — | Replace default label+value |
| `[orbitAddIcons]` | projected content | — | Trailing action slot — one **Button**, **Chip**, or icon-sized control |
| `interactive` | boolean | `false` | Set `true` with `(click)` for interactive rows |

## Correct patterns

### Settings list

```html
<orbit-listing-item
  [reorderIcon]="false"
  [showLeftIcon]="false"
  [showRightIcon]="true"
  label="Email notifications"
  value="Enabled"
  [interactive]="true"
  (click)="openEmailSettings()"
></orbit-listing-item>
```

### User row with custom cell

```html
<orbit-listing-item
  [reorderIcon]="false"
  [showLeftIcon]="false"
  [showLabelValue]="false"
>
  <orbit-label-value-vertical
    orbitLabelValue
    layout="V + L"
    value="Alice Fontaine"
    label="alice@orbit.io"
  ></orbit-label-value-vertical>
  <orbit-success-chip
    orbitAddIcons
    type="chip"
    size="compact"
    [showIcon]="false"
    label="Active"
  ></orbit-success-chip>
</orbit-listing-item>
```

### Settings row with trailing button (multi-line)

Use `[multiLine]="true"` + `[orbitAddIcons]` for card rows (plan, payment, billing). The actions slot **sizes to the control** — `orbit-button`, chips, etc.

```html
<orbit-listing-item
  [multiLine]="true"
  [reorderIcon]="false"
  [showLeftIcon]="false"
  [showRightIcon]="false"
  title="Pro Plan"
  label=""
  value="$20/mo."
  [showHelper]="true"
  helper="Manage your subscription and billing cycle."
>
  <orbit-button
    orbitAddIcons
    variant="secondary"
    [minWidth]="false"
    label="Adjust plan"
  ></orbit-button>
</orbit-listing-item>
```

For long button labels (`Manage in Stripe`), use `[minWidth]="false"` so the button grows with text — see [button.md](./button.md).

### User table with checkbox (correct)

Place checkbox **outside** `orbit-listing-item`, or use a flex wrapper:

```html
<div style="display: flex; align-items: center; width: 100%">
  <orbit-option-checkbox label="" aria-label="Select Alice" iconSize="small"></orbit-option-checkbox>
  <div style="flex: 1">
    <orbit-listing-item
      [reorderIcon]="false"
      [showLeftIcon]="false"
      [showRightIcon]="false"
      [showLabelValue]="false"
    >
      <orbit-label-value-vertical
        orbitLabelValue
        layout="V + L"
        value="Alice Fontaine"
        label="alice@orbit.io"
      ></orbit-label-value-vertical>
    </orbit-listing-item>
  </div>
  <orbit-success-chip type="chip" size="compact" [showIcon]="false" label="Active"></orbit-success-chip>
</div>
```

## Anti-patterns (causes broken layout)

| Don't | Why |
|-------|-----|
| `<orbit-option-checkbox label="Option">` in `[orbitLeftIcon]` | Squeezed into 24px frame → vertical "Option" text |
| Multiple table columns in `[orbitAddIcons]` | Slot fits **one** control — use a wrapper layout outside `orbit-listing-item` for multi-column rows |
| Override `.orbit-listing-item__actions` width to icon size | Component sizes to content — fixed width clips `Button` / `Chip` labels |
| Default inputs for table rows | Turn off `reorderIcon`, `showLeftIcon` when not needed |
| Full-width table with ListingItem alone | Put checkbox/chips **beside** the row — see user table pattern above |

## Defaults to change for dashboards

```html
<orbit-listing-item
  [reorderIcon]="false"
  [showLeftIcon]="false"
  [showRightIcon]="true"
  ...
></orbit-listing-item>
```
