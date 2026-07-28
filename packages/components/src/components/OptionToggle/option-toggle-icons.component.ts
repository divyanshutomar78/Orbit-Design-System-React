import { Component, Input, ViewEncapsulation } from '@angular/core';

export type OptionToggleIconState = 'off' | 'on' | 'partial';

@Component({
  selector: 'orbit-option-toggle-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="16" height="8" rx="4" fill="currentColor" [attr.opacity]="trackOpacity" />
      <circle [attr.cx]="thumbX" cy="12" r="3" fill="var(--background-surface-container-2)" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class OptionToggleIconComponent {
  @Input() state: OptionToggleIconState = 'off';

  get thumbX(): number {
    return this.state === 'on' ? 16 : this.state === 'partial' ? 12 : 8;
  }

  get trackOpacity(): number {
    return this.state === 'off' ? 0.35 : this.state === 'partial' ? 0.65 : 1;
  }
}

@Component({
  selector: 'orbit-option-toggle-chevron-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M8 10l4 4 4-4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class OptionToggleChevronIconComponent {}
