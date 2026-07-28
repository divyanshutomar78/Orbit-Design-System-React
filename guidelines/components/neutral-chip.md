# NeutralChip

Neutral grey chip for filters, tags, and non-semantic labels.

## Import

```ts
import { NeutralChipComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<!-- Selectable filter — icon appropriate -->
<orbit-neutral-chip
  type="chip"
  size="default"
  [selected]="tab === 'all'"
  label="All"
  (click)="setTab('all')"
></orbit-neutral-chip>

<!-- Read-only tag -->
<orbit-neutral-chip type="chip" size="compact" [showIcon]="false" label="Category"></orbit-neutral-chip>
```

## Inputs

Same as all chips: `type`, `size`, `selected`, `showIcon`, `iconSize`, `label`.

Tokens: `--chips-neutral-default`, `--chips-neutral-hover`, `--chips-neutral-selected`.

## Dashboard examples

```html
<!-- Filter bar -->
<div style="display: flex; gap: calc(var(--gap-xs) * 1px)">
  <orbit-neutral-chip [selected]="tab === 'all'" label="All" (click)="setTab('all')"></orbit-neutral-chip>
  <orbit-neutral-chip [selected]="tab === 'mine'" label="Mine" (click)="setTab('mine')"></orbit-neutral-chip>
</div>
```

## When to use

| Chip | When |
|------|------|
| `NeutralChipComponent` | Filters, categories, non-status tags |
| `SuccessChipComponent` | Positive status |
| `WarningChipComponent` | Caution status |
| `CriticalChipComponent` | Error / blocked status |

## Rules

- **Filters:** default `showIcon` + `(click)` + `selected`.
- **Read-only tags:** `[showIcon]="false"`. See [chips.md](./chips.md).
