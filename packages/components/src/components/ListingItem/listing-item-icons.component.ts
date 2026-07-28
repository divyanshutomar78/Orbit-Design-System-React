import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-listing-drag-icon',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="8" r="1.25" fill="currentColor" />
      <circle cx="15" cy="8" r="1.25" fill="currentColor" />
      <circle cx="9" cy="12" r="1.25" fill="currentColor" />
      <circle cx="15" cy="12" r="1.25" fill="currentColor" />
      <circle cx="9" cy="16" r="1.25" fill="currentColor" />
      <circle cx="15" cy="16" r="1.25" fill="currentColor" />
    </svg>
  `,
})
export class ListingDragIconComponent {}

@Component({
  selector: 'orbit-listing-info-icon',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <path d="M12 11v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  `,
})
export class ListingInfoIconComponent {}

@Component({
  selector: 'orbit-listing-chevron-right-icon',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 8l4 4-4 4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
})
export class ListingChevronRightIconComponent {}
