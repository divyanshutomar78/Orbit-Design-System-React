# OptionRadio

Single radio option row with icon and label.

## Import

```tsx
import { OptionRadio } from 'orbit-ds-components';
```

## Basic usage

```tsx
<OptionRadio
  name="plan"
  value="pro"
  label="Pro plan"
  selected={plan === 'pro'}
  onChange={() => setPlan('pro')}
/>
```

## Props

| Prop | Type | Default |
|------|------|---------|
| `label` | ReactNode | `'Option'` |
| `selected` | boolean | `false` |
| `status` | `'default'` \| `'hover'` \| `'disabled'` | `'default'` |
| `textSlot` | ReactNode | — |
| `iconSize` | `'small'` \| `'big'` | `'big'` |

## Dashboard examples

```tsx
// Settings panel
<OptionRadio name="theme" value="dark" label="Dark mode" selected={theme === 'dark'} />
<OptionRadio name="theme" value="light" label="Light mode" selected={theme === 'light'} />
```

## Rules

- Group radios with the same `name` attribute.
- Stack vertically in settings panels — one `OptionRadio` per choice.
