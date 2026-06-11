# InputSelect

Select/dropdown field with label, helper text, error state, and Action Menu dropdown.

## Import

```tsx
import { InputSelect } from 'orbit-ds-components';
```

## Basic usage

```tsx
<InputSelect
  label="Role"
  placeholder="Select role"
  options={[
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
  ]}
  value={role}
  onValueChange={setRole}
/>
```

When `options` are provided, clicking opens an **ActionMenu** dropdown (not native `<select>`).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showLabel` | boolean | `true` | Show label row |
| `showLabelInfo` | boolean | `true` | Info icon next to label |
| `showHelper` | boolean | `true` | Helper text line |
| `showBottomSpaceHelper` | boolean | `false` | Extra helper spacing |
| `showErrorMessage` | boolean | `false` | Error message line |
| `placeholder` | string | — | Empty state text |
| `options` | `{ value, label }[]` | — | Dropdown items |
| `value` / `onValueChange` | controlled | — | Selected value |
| `menuItems` | — | — | Custom ActionMenu rows |
| `showClearIcon` | boolean | — | Clear button when filled |
| `visualState` | string | auto | Force hover/focus/disabled |

## Dashboard examples

```tsx
// Filter bar
<InputSelect
  showLabel={false}
  showHelper={false}
  placeholder="Status"
  options={statusOptions}
  value={status}
  onValueChange={setStatus}
/>

// Form field with error
<InputSelect
  label="Department"
  options={deptOptions}
  showErrorMessage
  errorMessage="Required"
/>
```

## Rules

- Use in filter bars with `showLabel={false}` for compact layout.
- Don't use native `<select>` alongside Orbit forms.
- Pair with `ActionMenu` props via `actionMenuProps` for custom menu behavior.
