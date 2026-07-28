import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-chip-select-icon',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
    </svg>
  `,
})
export class ChipSelectIconComponent {}

@Component({
  selector: 'orbit-chip-selected-icon',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
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
})
export class ChipSelectedIconComponent {}
