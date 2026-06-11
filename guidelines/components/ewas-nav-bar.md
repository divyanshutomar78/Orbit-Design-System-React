# EWasNavBar

Full application navigation bar composing nav items. Use as dashboard sidebar or top nav.

## Import

```tsx
import { EWasNavBar } from 'orbit-ds-components';
```

## Basic usage

```tsx
// Flight mode — horizontal top nav
<EWasNavBar flight orientation="horizontal" />

// Admin dashboard — vertical sidebar
<EWasNavBar flight={false} orientation="vertical" />

// Controlled active item
<EWasNavBar
  flight={false}
  orientation="vertical"
  activeItemId={activeId}
  onItemSelect={setActiveId}
/>
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `flight` | `true` | Flight header vs branding logo |
| `orientation` | `'horizontal'` | `'horizontal'` \| `'vertical'` |
| `flightHeader` | `EWasNavItemWText` | Top header when `flight` |
| `primaryItems` | Flights/Airport/Opti | Main nav items |
| `branding` | SITA logo | Shown when `flight={false}` |
| `utilityItems` | Data/Config/User | Utility nav icons |
| `footerItem` | V1.0 + pilot | Footer row |
| `activeItemId` | — | Controlled selection |
| `onItemSelect` | — | Selection callback |

## Dashboard layout

```tsx
<div style={{ display: 'flex', minHeight: '100vh' }}>
  <EWasNavBar
    flight={false}
    orientation="vertical"
    activeItemId={page}
    onItemSelect={setPage}
  />
  <main style={{ flex: 1 }}>
    {/* dashboard content */}
  </main>
</div>
```

## Rules

- Use `flight={false}` + `orientation="vertical"` for standard admin dashboards.
- Use `flight={true}` + `orientation="horizontal"` for aviation/flight ops UIs.
- Customize items via `primaryItems`, `utilityItems` props (see types in package).
