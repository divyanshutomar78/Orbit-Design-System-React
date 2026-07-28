import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-titles-and-tabs-back-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M14 8l-4 4 4 4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TitlesAndTabsBackIconComponent {}

@Component({
  selector: 'orbit-titles-and-tabs-menu-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="6" r="1.25" fill="currentColor" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" />
      <circle cx="12" cy="18" r="1.25" fill="currentColor" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class TitlesAndTabsMenuIconComponent {}
