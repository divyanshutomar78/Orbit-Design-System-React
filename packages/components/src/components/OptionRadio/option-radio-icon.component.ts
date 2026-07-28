import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-option-radio-icon',
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
export class OptionRadioIconComponent {
  @Input() selected = false;
}
