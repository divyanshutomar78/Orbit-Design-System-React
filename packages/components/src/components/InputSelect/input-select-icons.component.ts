import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-input-select-label-info-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.25" />
      <path d="M9 8v4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" />
      <circle cx="9" cy="6" r="0.75" fill="currentColor" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectLabelInfoIconComponent {}

@Component({
  selector: 'orbit-input-select-chevron-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectChevronIconComponent {}

@Component({
  selector: 'orbit-input-select-clear-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectClearIconComponent {}

@Component({
  selector: 'orbit-input-select-field-info-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <path d="M12 11v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectFieldInfoIconComponent {}
