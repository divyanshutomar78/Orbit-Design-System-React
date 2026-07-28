# InputSelect

Select/dropdown field with label, helper text, error state, and Action Menu dropdown.

## Import

```ts
import { InputSelectComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-input-select
  label="Role"
  placeholder="Select role"
  [options]="[
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
  ]"
  [value]="role"
  (valueChange)="role = $event"
></orbit-input-select>
```

When `options` are provided, clicking opens an **ActionMenu** dropdown (not native `<select>`).

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `showLabel` | boolean | `true` | Show label row |
| `showLabelInfo` | boolean | `true` | Info icon next to label |
| `showHelper` | boolean | `true` | Helper text line |
| `showBottomSpaceHelper` | boolean | `false` | Extra helper spacing |
| `showErrorMessage` | boolean | `false` | Error message line |
| `placeholder` | string | — | Empty state text |
| `options` | `{ value, label }[]` | — | Dropdown items |
| `value` / `(valueChange)` | controlled | — | Selected value |
| `menuItems` | — | — | Custom ActionMenu rows |
| `showClearIcon` | boolean | — | Clear button when filled |
| `visualState` | string | auto | Force hover/focus/disabled |

## Dashboard examples

```html
<!-- Filter bar -->
<orbit-input-select
  [showLabel]="false"
  [showHelper]="false"
  placeholder="Status"
  [options]="statusOptions"
  [value]="status"
  (valueChange)="status = $event"
></orbit-input-select>

<!-- Form field with error -->
<orbit-input-select
  label="Department"
  [options]="deptOptions"
  [showErrorMessage]="true"
  errorMessage="Required"
></orbit-input-select>
```

## Rules

- Use in filter bars with `[showLabel]="false"` for compact layout.
- Don't use native `<select>` alongside Orbit forms.
- Pair with `ActionMenu` inputs via menu configuration for custom menu behavior.
- **Dialog forms:** override default `max-width: 460px` so selects fill the column — see [styles.md](../styles.md#dialog-form-layout).
- **Wide dialogs:** pair related `orbit-input-select` / short inputs in a two-column `.dialog-form-grid`; keep textareas and attachments full width.
