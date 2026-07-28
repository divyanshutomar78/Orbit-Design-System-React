import { Component, ViewEncapsulation } from '@angular/core';

/** Figma _ic_Info — 18×18 info trigger (matches Input Select label info). */
@Component({
  selector: 'orbit-tooltip-info-icon',
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
export class TooltipInfoIconComponent {}
