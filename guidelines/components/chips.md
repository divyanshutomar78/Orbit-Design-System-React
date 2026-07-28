# Chips — shared rules

All chip components (`SuccessChipComponent`, `WarningChipComponent`, `CriticalChipComponent`, `AttentionChipComponent`, `DefaultChipComponent`, `NeutralChipComponent`) share the same API. This guide covers the **select icon** (circle / checkmark) — the most common misuse.

## Select icon ≠ required

Chips default to `[showIcon]="true"`, which renders a **circle icon** (unchecked) or **checkmark** (when `selected`). This looks like a checkbox but is only for **selectable** chips — filters, toggles, multi-select tags.

**Do not show the icon on read-only status badges.** Use `[showIcon]="false"`.

| Use case | `showIcon` | `(click)` / `selected` | Example |
|----------|------------|------------------------|---------|
| Read-only status (Active, Pending, FT) | `false` | Not required | Table status column |
| Selectable filter / toggle | `true` | **Required** — wire both | Filter bar, chip group |
| Category tag (non-interactive) | `false` | Not required | Role label, event type |

## Rules

1. **Only use the select icon when the chip is selectable** — user can click to toggle or pick a filter.
2. **If `[showIcon]="true"`, the chip must be interactive** — bind `(click)` and control `selected` from state. Never show a checkbox-style icon on a chip that does nothing when clicked.
3. **Read-only status → `[showIcon]="false"`** — status in tables, modals, detail views, timeline labels.
4. **Use `size="compact"`** in dense rows (tables, lists, modals).
5. **Use `type="chip"`** (pill) for status; **`type="tag"`** (squared) for category labels.
6. Pick the **semantic color** that matches meaning (`orbit-success-chip` for positive, `orbit-warning-chip` for caution, etc.).

## Read-only status (correct)

```html
<orbit-success-chip type="chip" size="compact" [showIcon]="false" label="Active"></orbit-success-chip>

<orbit-default-chip type="chip" size="compact" [showIcon]="false" label="FT"></orbit-default-chip>
```

## Selectable filter (correct)

```html
<!-- Component class: filter: 'all' | 'active' = 'all'; setFilter(value: 'active') { this.filter = value; } -->
<orbit-success-chip
  type="chip"
  size="compact"
  [showIcon]="true"
  [selected]="filter === 'active'"
  label="Active"
  (click)="setFilter('active')"
></orbit-success-chip>
```

## Anti-patterns

| Wrong | Right | Why |
|-------|-------|-----|
| Status chip with default `showIcon` | `[showIcon]="false"` | Icon implies selectable checkbox |
| `[showIcon]="true"` without `(click)` | Add handler or hide icon | Looks clickable but does nothing |
| `[showIcon]="true"` without `selected` state | Control `selected` from parent | Checkmark state never updates |
| Custom pill div for status | `orbit-success-chip` with `[showIcon]="false"` | Use Orbit tokens and components |

## Shared inputs

| Input | Values | Default |
|-------|--------|---------|
| `type` | `'chip'` \| `'tag'` | `'chip'` |
| `size` | `'default'` \| `'compact'` | `'default'` |
| `selected` | boolean | `false` |
| `showIcon` | boolean | `true` — set **`false`** for read-only status |
| `iconSize` | `'small'` \| `'big'` | `'small'` |
| `(click)` | function | — — **required when `[showIcon]="true"`** |
| `label` | string | `'Text'` |

Variant-specific token families are documented in each chip guide (`success-chip.md`, `warning-chip.md`, etc.).
