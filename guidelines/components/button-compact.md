# ButtonCompact

Same API as `Button`, using compact platform tokens for dense UIs.

## Import

```tsx
import { ButtonCompact } from 'orbit-ds-components';
```

## Basic usage

```tsx
<ButtonCompact variant="primary">Apply</ButtonCompact>
<ButtonCompact variant="secondary">Reset</ButtonCompact>
```

## Props

Same as `Button` — `variant`, `minWidth`, `iconSize`, `leftIcon`, `rightIcon`, `disabled`.

Uses `--compact-height` and `--compact-min-width` platform tokens.

## Dashboard examples

```tsx
// Inline filter bar
<div style={{ display: 'flex', gap: 'calc(var(--gap-xs) * 1px)' }}>
  <ButtonCompact variant="secondary">Clear</ButtonCompact>
  <ButtonCompact variant="primary">Apply filters</ButtonCompact>
</div>

// Table row actions
<ButtonCompact variant="tertiary">Edit</ButtonCompact>
```

## When to use

| Use ButtonCompact | Use Button |
|-------------------|------------|
| Toolbars, table headers | Page-level CTAs |
| Filter apply/reset | Modal confirm |
| Inline row actions | Form submit |
