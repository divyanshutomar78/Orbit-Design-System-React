import { Component, ViewEncapsulation } from '@angular/core';

/** Figma _ic_Info (Split View). */
@Component({
  selector: 'orbit-ewas-nav-item-w-text-info-icon',
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
export class EWasNavItemWTextInfoIconComponent {}
