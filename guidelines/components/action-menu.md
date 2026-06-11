# ActionMenu & ActionMenuItem

Dropdown menu surface with selectable rows, checkmarks, and action icons.

## Import

```tsx
import { ActionMenu, ActionMenuItem } from 'orbit-ds-components';
```

## ActionMenu

```tsx
<ActionMenu
  items={[
    { id: 'edit', label: 'Edit', selected: false },
    { id: 'delete', label: 'Delete', showRightIcon2: true },
  ]}
  onItemSelect={(id) => handleAction(id)}
  onItemRightIcon2={(id) => handleRemove(id)}
/>
```

### ActionMenu props

| Prop | Description |
|------|-------------|
| `items` | Array of row configs |
| `addItems` | Enable top "add more" slot |
| `addMoreItem` | Custom top slot content |
| `iconSize` | `'small'` \| `'big'` |
| `onItemSelect` | Row click callback |
| `onItemRightIcon1` / `onItemRightIcon2` | Right icon callbacks |

## ActionMenuItem

```tsx
<ActionMenuItem label="Export CSV" selected leftIconType="checkmark" />
<ActionMenuItem label="Remove" showRightIcon2 rightIcon2={<CloseIcon />} />
```

### ActionMenuItem props

| Prop | Default | Description |
|------|---------|-------------|
| `label` | `'Item'` | Row text |
| `selected` | `false` | Selected state |
| `showLeftIcon` | `true` | Left icon area |
| `leftIconType` | `'checkmark'` | `'checkmark'` \| `'checkbox'` \| `'radio'` \| `'toggle'` |
| `showRightIcon1` / `showRightIcon2` | `true` | Right icon slots |
| `as` | `'button'` | Use `'div'` for non-interactive slots |

## Dashboard examples

```tsx
// Row overflow menu (compose with a trigger button)
<ActionMenu
  items={[
    { id: 'edit', label: 'Edit user' },
    { id: 'suspend', label: 'Suspend' },
    { id: 'delete', label: 'Delete', showRightIcon2: true },
  ]}
  onItemSelect={handleUserAction}
/>

// Used internally by InputSelect when options prop is set
```

## Rules

- `InputSelect` uses ActionMenu internally — don't duplicate dropdown logic.
- Use `leftIconType="checkbox"` for multi-select menus.
- Export `ActionMenuItem` for custom `addMoreItem` slots.
