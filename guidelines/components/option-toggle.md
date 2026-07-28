# OptionToggle

Toggle switch row with Off / On / Partial states.

## Import

```ts
import { OptionToggleComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-option-toggle state="on" label="Enable notifications" (checkedChange)="handleChange($event)"></orbit-option-toggle>
<orbit-option-toggle state="off" label="Dark mode"></orbit-option-toggle>
```

## Inputs

| Input | Type | Default |
|-------|------|---------|
| `label` | string | `'Option'` |
| `state` | `'off'` \| `'on'` \| `'partial'` | `'off'` |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` |
| `showRightIcon` | boolean | `false` |
| `useRightIconSlot` / `[orbitRightIcon]` | projected content | chevron |
| `checked` / `partial` | boolean | aliases |

## Dashboard examples

```html
<!-- Settings list -->
<orbit-option-toggle [state]="notifications ? 'on' : 'off'" label="Push notifications"></orbit-option-toggle>
<orbit-option-toggle [state]="autoSave ? 'on' : 'off'" label="Auto-save"></orbit-option-toggle>
```

## Rules

- Use for boolean settings, not for table row selection (use `OptionCheckboxComponent`).
- `partial` state for indeterminate sync scenarios.
