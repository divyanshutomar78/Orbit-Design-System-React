# EWasNavBar

Full application navigation bar composing nav items. Use as dashboard sidebar or top nav.

## Import

```ts
import { EWasNavBarComponent } from 'orbit-ds-components';
```

## Basic usage

```html
<!-- Flight mode — horizontal top nav -->
<orbit-ewas-nav-bar [flight]="true" orientation="horizontal"></orbit-ewas-nav-bar>

<!-- Admin dashboard — vertical sidebar -->
<orbit-ewas-nav-bar [flight]="false" orientation="vertical"></orbit-ewas-nav-bar>

<!-- Controlled active item -->
<orbit-ewas-nav-bar
  [flight]="false"
  orientation="vertical"
  [activeItemId]="activeId"
  (itemSelect)="activeId = $event"
></orbit-ewas-nav-bar>
```

## Inputs

| Input / Output | Default | Description |
|----------------|---------|-------------|
| `flight` | `true` | Flight header vs branding logo |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'vertical'` |
| `flightHeader` | `EWasNavItemWText` | Top header when `flight` |
| `primaryItems` | Flights/Airport/Opti | Main nav items |
| `branding` | SITA logo | Shown when `[flight]="false"` |
| `utilityItems` | Data/Config/User | Utility nav icons |
| `footerItem` | V1.0 + pilot | Footer row |
| `activeItemId` | — | Controlled selection |
| `(itemSelect)` | — | Selection callback |

## Dashboard layout

```html
<div style="display: flex; min-height: 100vh">
  <orbit-ewas-nav-bar
    [flight]="false"
    orientation="vertical"
    [activeItemId]="page"
    (itemSelect)="page = $event"
  ></orbit-ewas-nav-bar>
  <main style="flex: 1">
    <!-- dashboard content -->
  </main>
</div>
```

## Rules

- Use `[flight]="false"` + `orientation="vertical"` for standard admin dashboards.
- Use `[flight]="true"` + `orientation="horizontal"` for aviation/flight ops UIs.
- Customize items via `primaryItems`, `utilityItems` inputs (see types in package).
