# OptionRadio

Single radio option row with icon and label.

## Import

```ts
import { OptionRadioComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-option-radio
  name="plan"
  value="pro"
  label="Pro plan"
  [selected]="plan === 'pro'"
  (selectedChange)="setPlan('pro')"
></orbit-option-radio>
```

## Inputs

| Input | Type | Default |
|-------|------|---------|
| `label` | string | `'Option'` |
| `selected` | boolean | `false` |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` |
| `useTextSlot` / `[orbitTextSlot]` | projected content | — |
| `iconSize` | `'small'` \| `'big'` | `'big'` |

## Dashboard examples

```html
<!-- Settings panel -->
<orbit-option-radio name="theme" value="dark" label="Dark mode" [selected]="theme === 'dark'"></orbit-option-radio>
<orbit-option-radio name="theme" value="light" label="Light mode" [selected]="theme === 'light'"></orbit-option-radio>
```

## Rules

- Group radios with the same `name` attribute.
- Stack vertically in settings panels — one `orbit-option-radio` per choice.
