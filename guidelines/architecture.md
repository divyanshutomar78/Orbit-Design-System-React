# Orbit Components Architecture

Orbit components follow a **shadcn-style** layered architecture: **Radix UI** handles behavior and accessibility; **Orbit CSS variables** handle visual design.

## Layers

```
┌─────────────────────────────────────────────┐
│  High-level components (Modal, InputSelect) │  ← Same public API as before
├─────────────────────────────────────────────┤
│  Primitives (Dialog, Popover, Checkbox…)    │  ← Radix + orbit-* CSS classes
├─────────────────────────────────────────────┤
│  Radix UI (@radix-ui/react-*)               │  ← Focus trap, keyboard, ARIA
├─────────────────────────────────────────────┤
│  orbit-ds-variables (CSS custom properties) │  ← Colors, spacing, typography
└─────────────────────────────────────────────┘
```

## Primitives (`orbit-ds-components` exports)

Import composable primitives when building custom UI:

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TooltipProvider,
  TooltipPrimitive,
  TooltipTrigger,
  TooltipContent,
  cn,
} from 'orbit-ds-components';
```

## Composition example (custom dialog)

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="my-dialog">
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogClose asChild>
        <ButtonCompact variant="tertiary" minWidth={false} aria-label="Close">
          ×
        </ButtonCompact>
      </DialogClose>
    </DialogHeader>
    <DialogBody>
      <p>Are you sure?</p>
    </DialogBody>
    <DialogFooter>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Radix mapping

| Orbit component | Radix primitive | Composable exports |
|-----------------|-----------------|-------------------|
| `Modal` | `@radix-ui/react-dialog` | `Dialog`, `DialogContent`, … |
| `ActionMenu` | `@radix-ui/react-dropdown-menu` | `DropdownMenu`, `DropdownMenuItem`, … |
| `InputSelect` | `@radix-ui/react-popover` | `Popover`, `PopoverContent`, … |
| `OptionCheckbox` | `@radix-ui/react-checkbox` | `Checkbox`, `CheckboxIndicator` |
| `OptionToggle` | `@radix-ui/react-switch` | `Switch`, `SwitchThumb` |
| `OptionRadioGroup` | `@radix-ui/react-radio-group` | `RadioGroup`, `RadioGroupItem` |
| `Tooltip` | `@radix-ui/react-tooltip` | `TooltipProvider`, `TooltipPrimitive`, … |
| `TitlesAndTabs` | `@radix-ui/react-tabs` | `Tabs`, `TabsList`, `TabsTrigger` |

Presentational components (`Button`, chips, `ListingItem`, `LabelValue*`, `EWasNavBar`) remain custom — no Radix equivalent needed.

## Styling rules

1. Primitives apply existing `orbit-*` BEM classes — visual design unchanged.
2. Use `cn()` to merge classes when composing: `cn('orbit-dialog-content', className)`.
3. Never hardcode colors — use `orbit-ds-variables` tokens in CSS.
4. Use `asChild` + `Slot` to attach behavior to Orbit-styled triggers without extra DOM.

## `cn()` helper

```tsx
import { cn } from 'orbit-ds-components';

<div className={cn('orbit-button-compact', isActive && 'orbit-button-compact--primary')} />
```
