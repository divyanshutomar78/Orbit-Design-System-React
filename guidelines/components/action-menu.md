# ActionMenu & ActionMenuItem

Dropdown menu surface with selectable rows, checkmarks, and action icons.

## Import

```ts
import { ActionMenuComponent, ActionMenuItemComponent } from 'orbit-ds-components';
```

## ActionMenu

```html
<orbit-action-menu
  [items]="[
    { id: 'edit', label: 'Edit', selected: false },
    { id: 'delete', label: 'Delete', showRightIcon2: true },
  ]"
  (itemSelect)="handleAction($event)"
  (itemRightIcon2)="handleRemove($event)"
></orbit-action-menu>
```

### ActionMenu inputs

| Input / Output | Description |
|----------------|-------------|
| `items` | Array of row configs |
| `addItems` | Enable top "add more" slot |
| `addMoreItem` | Custom top slot content |
| `iconSize` | `'small'` \| `'big'` |
| `(itemSelect)` | Row click callback |
| `(itemRightIcon1)` / `(itemRightIcon2)` | Right icon callbacks |

## ActionMenuItem

Use the `orbitActionMenuItem` attribute on `<li>` (default, inside menu list) or `<div>` (non-interactive slots):

```html
<li orbitActionMenuItem label="Export CSV" [selected]="true" leftIconType="checkmark"></li>
<li orbitActionMenuItem label="Remove" [showRightIcon2]="true" [useRightIcon2Slot]="true">
  <span orbitRightIcon2><!-- CloseIcon SVG --></span>
</li>
```

### ActionMenuItem inputs

| Input | Default | Description |
|-------|---------|-------------|
| `label` | `'Item'` | Row text |
| `selected` | `false` | Selected state |
| `showLeftIcon` | `true` | Left icon area |
| `leftIconType` | `'checkmark'` | `'checkmark'` \| `'checkbox'` \| `'radio'` \| `'toggle'` |
| `showRightIcon1` / `showRightIcon2` | `true` | Right icon slots |
| host tag | `'li'` | Use `<div orbitActionMenuItem>` for non-interactive slots |

## Dashboard examples

```html
<!-- Row overflow menu (compose with a trigger button) -->
<orbit-action-menu
  [items]="[
    { id: 'edit', label: 'Edit user' },
    { id: 'suspend', label: 'Suspend' },
    { id: 'delete', label: 'Delete', showRightIcon2: true },
  ]"
  (itemSelect)="handleUserAction($event)"
></orbit-action-menu>

<!-- Used internally by InputSelect when options input is set -->
```

## Rules

- `InputSelectComponent` uses ActionMenu internally — don't duplicate dropdown logic.
- Use `leftIconType="checkbox"` for multi-select menus.
- Export `ActionMenuItemComponent` for custom `addMoreItem` slots.
