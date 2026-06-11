# OptionToggle

Toggle switch row with Off / On / Partial states.

## Import

```tsx
import { OptionToggle } from 'orbit-ds-components';
```

## Basic usage

```tsx
<OptionToggle state="on" label="Enable notifications" onChange={handleChange} />
<OptionToggle state="off" label="Dark mode" />
```

## Props

| Prop | Type | Default |
|------|------|---------|
| `label` | ReactNode | `'Option'` |
| `state` | `'off'` \| `'on'` \| `'partial'` | `'off'` |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` |
| `showRightIcon` | boolean | `false` |
| `rightIcon` | ReactNode | chevron |
| `checked` / `partial` | boolean | aliases |

## Dashboard examples

```tsx
// Settings list
<OptionToggle state={notifications ? 'on' : 'off'} label="Push notifications" />
<OptionToggle state={autoSave ? 'on' : 'off'} label="Auto-save" />
```

## Rules

- Use for boolean settings, not for table row selection (use `OptionCheckbox`).
- `partial` state for indeterminate sync scenarios.
