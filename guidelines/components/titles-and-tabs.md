# TitlesAndTabs & TitleTab

Page header bar with back icon, uppercase title, tabs, extra slot, and menu icon. **Single-line title only** — no subheading support.

> **Scope:** `TitlesAndTabsComponent` is for **full-page views** only. Do not use it inside dialogs, modals, cards, or drawers.

> **Surface:** Page canvas is `--background-background`. Give the **header row** `container-1` (e.g. wrap `orbit-titles-and-tabs` in `.page-header`). Do not paint the whole page `container-1`. See [layering-model.md](../layering-model.md#page-layout-canvas--sections).

## Import

```ts
import { TitlesAndTabsComponent, TitleTabComponent } from 'orbit-ds-components';
```

## What this component is

`orbit-titles-and-tabs` is a **fixed-height page header row** with:

- One uppercase **title** (`title` input)
- Optional **tabs** on the same row
- A **compulsory bottom border** (`--border-secondary`) — always rendered, do not remove or override

It is **not** a general heading block. There is **no `subtitle` or `subheading` input** and none should be added inside the component.

## Basic usage

```html
<orbit-titles-and-tabs
  title="Users"
  [tabItems]="[
    { id: 'all', label: 'All', selected: true },
    { id: 'active', label: 'Active' },
    { id: 'invited', label: 'Invited' },
  ]"
  (tabSelect)="setTab($event)"
></orbit-titles-and-tabs>
```

## Subheadings on a page

On a **full page**, if you need a description below the title, render it as **separate markup after** `orbit-titles-and-tabs`. Never pass it into `title`, `extraSlot`, or projected content inside the header row.

```html
<orbit-titles-and-tabs title="Users" [showTabs]="false" [showRightIcons]="false"></orbit-titles-and-tabs>

<p class="page-subtitle">
  Manage accounts and permissions.
</p>

<!-- Page content below -->
```

Subheading styling (use tokens):

```css
.page-subtitle {
  margin: 0;
  padding: calc(var(--gap-s) * 1px) calc(var(--gap-m) * 1px);
  font-size: calc(var(--font-font-size-comment) * 1px);
  line-height: calc(var(--font-line-height-comment) * 1px);
  color: var(--text-secondary);
}
```

## Dialogs and modals — not TitlesAndTabs

When content opens in a **dialog or modal**, the heading pattern is different. **`TitlesAndTabsComponent` does not apply.**

| Context | Title | Subheading / description |
|---------|-------|--------------------------|
| Full page | `orbit-titles-and-tabs` `title` input | `.page-subtitle` **below** `orbit-titles-and-tabs` |
| Dialog / modal | Single-line title in the **dialog header** | First element in the **dialog body** |
| Card / panel on a page | Section heading inside the card | `<p>` below the heading, same container |

### Dialog title and subheading rules

1. **Title in the dialog header only** — one line, with a close control. Same idea as `orbit-titles-and-tabs` (single title, no subtitle in the header row) but the component itself is never used here.
2. **Subheading in the dialog body** — first content inside the body, before forms or data. Never in the header row, never on the page behind the overlay.
3. **Page stays minimal** — a trigger (button, link) on the page is enough. The dialog owns its own title and description.
4. **Do not mirror the dialog heading on the page** — no `orbit-titles-and-tabs` + subtitle on the page for content that only appears inside a dialog.

### Dialog header with tabs

Some dialogs show a **static title** and **selectable tabs** on the same header row (same visual row as `orbit-titles-and-tabs`, but built with dialog markup — not the component).

| Element | Component / markup | Interactive? | Selected indicator? |
|---------|-------------------|--------------|---------------------|
| Dialog title | Plain text (`<h2>` or `<span>`) — same typography as dialog title | **No** | **No** — never underline or highlight |
| Tabs | `orbit-title-tab` only | **Yes** | **Yes** — selected tab only |

Rules:

1. **Never use `orbit-title-tab` for the dialog title.** The title identifies the dialog; it is not a tab and must not be clickable.
2. **Only tab labels use `orbit-title-tab`.** Each tab gets `selected` + `(tabClick)`. The title does not.
3. **Do not put the dialog title in `tabItems`.** On pages, `orbit-titles-and-tabs` keeps `title` and `tabItems` separate — apply the same split in dialogs.
4. **Selected underline / bar applies to tabs only**, never under the title.

### Dialog header alignment (title + tabs + close)

Match the **same fixed-height row** as `orbit-titles-and-tabs` so title text, tabs, and the close icon sit on one baseline.

| Property | Token / value |
|----------|----------------|
| Header row height | `--components-titles-and-tabs-header` |
| Title ↔ tabs gap | `--gap-m` |
| Title padding | `--padding-horizontal-s` inline |
| Title typography | Title 4 (`--font-font-size-title-4`, `--font-line-height-title-4`) |
| Close icon frame | `orbit-button-compact` with `iconSize="big"` (24px) |
| Close actions padding | `--gap-s` block (same as `orbit-titles-and-tabs` right actions) |
| Vertical alignment | `align-items: center` on the header row — **not** `stretch` on the outer header |
| Bottom border | `--border-secondary` |

Layout rules:

1. **Fixed header height** — `height` and `min-height` both `--components-titles-and-tabs-header`. Do not let title, tabs, or close control define the row height independently.
2. **Vertically center all header items** — title, tab row, and close icon use `align-items: center` within the 36px row. Title uses `display: flex; align-items: center; height: 100%`.
3. **Close icon in a right actions slot** — wrap the close `orbit-button-compact` in an actions container with `padding-block: var(--gap-s)` so the 24px icon centers in the 36px row (6 + 24 + 6 = 36).
4. **Tabs row matches page tabs** — `orbit-title-tab` list uses `align-items: center; height: 100%`. Do not override tab `min-height` or add extra vertical padding on the tab container.
5. **Group title + tabs on the left** — same start cluster as `TitlesAndTabs__start`: title then tabs with `--gap-m` between them.
6. **Row height is exactly `--components-titles-and-tabs-header` (36px)** — do not add extra `padding-block` on tabs or modal headers; tabs stretch to the row height with `align-self: stretch` and **no vertical padding** on `orbit-title-tab`.

```html
<!-- Dialog header: static title + selectable tabs (not orbit-titles-and-tabs) -->
<header class="dialog-header">
  <div class="dialog-header__start">
    <h2 class="dialog-header__title">Send custom answer</h2>
    <nav class="dialog-header__tabs" aria-label="Answer type">
      <orbit-title-tab
        [selected]="tab === 'personalized'"
        label="Personalized"
        (tabClick)="setTab('personalized')"
      ></orbit-title-tab>
      <orbit-title-tab
        [selected]="tab === 'afr-ai'"
        label="AFR AI"
        (tabClick)="setTab('afr-ai')"
      ></orbit-title-tab>
    </nav>
  </div>
  <div class="dialog-header__actions">
    <orbit-button-compact variant="tertiary" [minWidth]="false" iconSize="big" aria-label="Close dialog"></orbit-button-compact>
  </div>
</header>
```

Reference CSS (use tokens):

```css
.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(var(--components-titles-and-tabs-header) * 1px);
  min-height: calc(var(--components-titles-and-tabs-header) * 1px);
  padding-inline-end: calc(var(--padding-horizontal-s) * 1px);
  border-bottom: calc(var(--components-input-button-select-border-width) * 1px) solid
    var(--border-secondary);
}

.dialog-header__start {
  display: flex;
  align-items: center;
  gap: calc(var(--gap-m) * 1px);
  height: 100%;
  min-width: 0;
}

.dialog-header__title {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding-inline: calc(var(--padding-horizontal-s) * 1px);
  font-size: calc(var(--font-font-size-title-4) * 1px);
  font-weight: var(--font-font-weight-title);
  line-height: calc(var(--font-line-height-title-4) * 1px);
  letter-spacing: calc(var(--font-letter-spacing-title-4) * 0.01em);
  text-transform: uppercase;
  white-space: nowrap;
}

.dialog-header__tabs {
  display: flex;
  align-items: center;
  height: 100%;
}

.dialog-header__actions {
  display: flex;
  align-items: center;
  align-self: stretch;
  padding-block: calc(var(--gap-s) * 1px);
}
```

Structure with tabs:

```
┌─ dialog panel ─────────────────────────────────────┐
│  HEADER: [title — static] [Tab] [Tab*] … [close]   │  ← title not selectable
├────────────────────────────────────────────────────┤
│  BODY: form / content                              │
├────────────────────────────────────────────────────┤
│  FOOTER: actions (optional)                        │
└────────────────────────────────────────────────────┘
```

**Dialog body forms:** fields must fill column width; override `orbit-input-select` `max-width: 460px` in forms. On wide modals (~640px), use a two-column `.dialog-form-grid` for paired selects/short inputs — textareas and attachments stay full width. See [styles.md](../styles.md#dialog-form-layout).

Subheading inside a dialog body (use tokens):

```css
.dialog-subtitle {
  margin: 0 0 calc(var(--gap-m) * 1px);
  font-size: calc(var(--font-font-size-comment) * 1px);
  line-height: calc(var(--font-line-height-comment) * 1px);
  color: var(--text-secondary);
}
```

Structure (conceptual — implement with your dialog markup):

```
┌─ dialog panel ─────────────────────┐
│  HEADER: title + close             │  ← single-line title only (no tabs)
├────────────────────────────────────┤
│  BODY:                             │
│    dialog-subtitle (description)   │  ← subheading here
│    form / content                  │
├────────────────────────────────────┤
│  FOOTER: actions (optional)        │
└────────────────────────────────────┘
```

For dialog headers **with tabs**, see [Dialog header with tabs](#dialog-header-with-tabs) above.

For dialog surface tokens, see [layering-model.md](../layering-model.md).

## Bottom border (compulsory)

The component always renders:

```css
border-bottom: … solid var(--border-secondary);
```

- **Do not** remove this border with CSS overrides.
- **Do not** build a custom page header without the border when `orbit-titles-and-tabs` fits the use case.
- The border separates the header row from page content — it is part of the design spec.
- Page content below must share the **same width** as `orbit-titles-and-tabs` — see [Page width alignment](../styles.md#page-width-alignment-header--body) in styles.md.

## Inputs

| Input / Output | Default | Description |
|----------------|---------|-------------|
| `title` | `'Title'` | Page title only — uppercase styling applied. **Not** for subheadings. |
| `showTitleIcon` | `true` | Title block (back icon optional via `showLeftIcon`). **`false` hides the title entirely** — use `[showLeftIcon]="false"` to hide only the back chevron. |
| `showLeftIcon` | `true` | Back chevron |
| `showTabs` | `true` | Tab row |
| `tabItems` / `tabs` | one tab | Tab configuration |
| `showExtraSlot` | `true` | Middle slot — **not** for subheadings |
| `showRightIcons` | `true` | Menu icon on right |
| `iconSize` | `'big'` | Icon frame size |
| `(tabSelect)` | — | Tab click callback |

## Dashboard examples

```html
<!-- Standard dashboard page header + tabs -->
<orbit-titles-and-tabs
  title="Analytics"
  [tabItems]="[
    { id: 'overview', label: 'Overview', selected: tab === 'overview' },
    { id: 'reports', label: 'Reports', selected: tab === 'reports' },
  ]"
  (tabSelect)="setTab($event)"
></orbit-titles-and-tabs>

<!-- Title only (no tabs) — still has bottom border -->
<orbit-titles-and-tabs
  [showTabs]="false"
  [showRightIcons]="false"
  [showLeftIcon]="false"
  [showExtraSlot]="false"
  title="Settings"
></orbit-titles-and-tabs>

<!-- Page with subheading — subtitle is OUTSIDE -->
<orbit-titles-and-tabs title="Users" [showTabs]="false" [showRightIcons]="false"></orbit-titles-and-tabs>
<p class="page-subtitle">Manage accounts and permissions.</p>
```

## TitleTab

`orbit-title-tab` is a **selectable tab control** — a button with optional selected state.

- Use **only** for tabs the user can switch between.
- **Do not** use for page titles, dialog titles, section headings, or any non-interactive label.
- On pages, `orbit-titles-and-tabs` renders the title as static text and tabs as `orbit-title-tab`.
- In dialogs with tabs, same split: static title + `orbit-title-tab` row (see [Dialog header with tabs](#dialog-header-with-tabs)).

```html
<orbit-title-tab
  [selected]="tab === 'active'"
  label="Active"
  (tabClick)="setTab('active')"
></orbit-title-tab>
```

## Anti-patterns

| Wrong | Right | Why |
|-------|-------|-----|
| Subheading inside `orbit-titles-and-tabs` (`title`, `extraSlot`, etc.) | Subheading below (pages) or in dialog body (modals) | Component has no subheading API |
| Custom page header mimicking TitlesAndTabs without bottom border | `orbit-titles-and-tabs` + optional `.page-subtitle` | Border is compulsory on page headers |
| `orbit-titles-and-tabs` inside a dialog, modal, or card | Dialog header + `.dialog-subtitle` in body | Wrong component for overlays |
| Dialog title + subtitle on the page behind the overlay | Title in dialog header; subtitle in dialog body | Heading belongs to the dialog |
| Two-line title in `title` input | One line in `title`; second line below (page or dialog body) | Title is single-line typography |
| Dialog title as `orbit-title-tab` | Static title text + `orbit-title-tab` for tabs only | Title is not selectable; no underline on title |
| Dialog title in `tabItems` / tab list | `title` input (page) or `<h2>` (dialog) separate from tabs | Same split as `orbit-titles-and-tabs` |
| Full-width `orbit-titles-and-tabs` + narrow centered body | Same-width page shell or wrap header + body in one panel — see [styles.md](../styles.md#page-width-alignment-header--body) | Header border and content columns misalign |
| `orbit-titles-and-tabs` on bare canvas (no header fill) | Wrap in `.page-header` with `container-1` — see [layering-model.md](../layering-model.md#page-layout-canvas--sections) | Title row must not sit on background |
| Entire page / `<main>` as `container-1` | Page canvas `background`; header bar only `container-1` | Whole page looks flat white |
| Close icon misaligned in tabbed dialog header | Fixed `--components-titles-and-tabs-header` row + `dialog-header__actions` with `--gap-s` block padding | 24px icon must center in 36px row |
| `align-items: stretch` on dialog header row | `align-items: center` on header; `height: 100%` on title/tabs only | Prevents close icon vertical drift |

## Rules

1. **One `orbit-titles-and-tabs` per full-page view** at the top of the main content area.
2. **Title only inside the component** — on pages, subheadings go directly below; in dialogs, they go in the body.
3. **Bottom border is compulsory** — do not override or omit.
4. Control selected tab via `tabItems[].selected` + `(tabSelect)`.
5. **Never use `orbit-titles-and-tabs` in dialogs, modals, or cards** — use the dialog header + body pattern above.
6. Export `TitleTabComponent` for selectable tabs only — never for dialog or page titles.
7. In dialog headers with tabs: static title + `orbit-title-tab` row; title is not clickable and has no selected indicator.
8. Tabbed dialog headers use `--components-titles-and-tabs-header` height; close icon in an actions slot with `--gap-s` block padding — see [Dialog header alignment](#dialog-header-alignment-title--tabs--close).
9. On full pages, body content below `orbit-titles-and-tabs` uses the same horizontal width — never a narrower centered column under a full-width header — see [styles.md](../styles.md#page-width-alignment-header--body).
10. **`orbit-titles-and-tabs` header bar uses `container-1`** on a `background` page canvas — not the whole page, not bare background on the title row — see [layering-model.md](../layering-model.md#page-layout-canvas--sections).
