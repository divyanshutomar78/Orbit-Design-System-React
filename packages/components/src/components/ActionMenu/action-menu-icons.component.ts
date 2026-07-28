import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-action-menu-chevron-down-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M8 10l4 4 4-4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuChevronDownIconComponent {}

@Component({
  selector: 'orbit-action-menu-close-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuCloseIconComponent {}

@Component({
  selector: 'orbit-action-menu-check-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuCheckIconComponent {}

@Component({
  selector: 'orbit-action-menu-checkbox-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        stroke-width="1.5"
        [attr.fill]="selected ? 'currentColor' : 'none'"
      />
      <path
        *ngIf="selected"
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="var(--background-surface-container-2)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuCheckboxIconComponent {
  @Input() selected = false;
}

@Component({
  selector: 'orbit-action-menu-radio-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <circle *ngIf="selected" cx="12" cy="12" r="4.5" fill="currentColor" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuRadioIconComponent {
  @Input() selected = false;
}

@Component({
  selector: 'orbit-action-menu-toggle-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="16" height="8" rx="4" fill="currentColor" [attr.opacity]="selected ? 1 : 0.35" />
      <circle [attr.cx]="selected ? 16 : 8" cy="12" r="3" fill="var(--background-surface-container-2)" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuToggleIconComponent {
  @Input() selected = false;
}
