# ButtonCompact

Same API as `ButtonComponent`, using compact platform tokens for dense UIs.

## Import

```ts
import { ButtonCompactComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<orbit-button-compact variant="primary" label="Apply"></orbit-button-compact>
<orbit-button-compact variant="secondary" label="Reset"></orbit-button-compact>
```

## Inputs

Same as `orbit-button` — `variant`, `minWidth`, `iconSize`, `showLeftIcon`, `showRightIcon`, `label`, `disabled`.

Uses `--compact-height` and `--compact-min-width` platform tokens.

## Dashboard examples

```html
<!-- Inline filter bar -->
<div style="display: flex; gap: calc(var(--gap-xs) * 1px)">
  <orbit-button-compact variant="secondary" label="Clear"></orbit-button-compact>
  <orbit-button-compact variant="primary" label="Apply filters"></orbit-button-compact>
</div>

<!-- Table row actions -->
<orbit-button-compact variant="tertiary" label="Edit"></orbit-button-compact>
```

## When to use

| Use ButtonCompact | Use Button |
|-------------------|------------|
| Toolbars, table headers | Page-level CTAs |
| Filter apply/reset | Modal confirm |
| Inline row actions | Form submit |
