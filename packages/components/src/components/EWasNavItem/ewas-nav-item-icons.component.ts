import { Component, ViewEncapsulation } from '@angular/core';

/** Default Figma Icon slot (_ic_rocket). */
@Component({
  selector: 'orbit-ewas-nav-item-rocket-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 4.5l1.2 4.8H10.8L12 4.5zM8.5 11.5L5 18.5l5.5-2.5 1.5-.5-1-4.5-2.5 1zm7 0l2.5 1 1 4.5 1.5.5 5.5 2.5-3.5-7-2.5-1z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M14 10l4 4M16 8l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavItemRocketIconComponent {}
