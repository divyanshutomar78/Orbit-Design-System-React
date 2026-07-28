import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

export type OptionCheckboxIconState = 'off' | 'on' | 'partial';

@Component({
  selector: 'orbit-option-checkbox-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      *ngIf="state === 'on'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="var(--background-surface-container-2)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      *ngIf="state === 'partial'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="currentColor" />
      <path d="M8 12h8" stroke="var(--background-surface-container-2)" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <svg
      *ngIf="state === 'off'"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class OptionCheckboxIconComponent {
  @Input() state: OptionCheckboxIconState = 'off';
}
