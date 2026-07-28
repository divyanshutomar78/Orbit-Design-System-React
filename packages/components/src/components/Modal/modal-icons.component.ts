import { Component, ViewEncapsulation } from '@angular/core';

/** Simple close (X) glyph for the Modal header action — React `ModalIcons` was missing. */
@Component({
  selector: 'orbit-modal-close-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ModalCloseIconComponent {}
