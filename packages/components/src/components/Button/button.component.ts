import { Component, Input, ViewEncapsulation } from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'orbit-button--primary',
  secondary: 'orbit-button--secondary',
  tertiary: 'orbit-button--tertiary',
};

@Component({
  selector: 'orbit-button',
  standalone: true,
  imports: [IconFrameComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./Button.css'],
  template: `
    <button
      [type]="type"
      [class]="classes"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled || null"
    >
      <span class="orbit-button__content">
        @if (showLeftIcon) {
          <orbit-icon-frame [size]="iconSize" [className]="'orbit-button__icon'">
            <ng-content select="[orbitLeftIcon]"></ng-content>
          </orbit-icon-frame>
        }
        @if (showLabel) {
          <span class="orbit-button__label"><ng-content>{{ label }}</ng-content></span>
        }
        @if (showRightIcon) {
          <orbit-icon-frame [size]="iconSize" [className]="'orbit-button__icon'">
            <ng-content select="[orbitRightIcon]"></ng-content>
          </orbit-icon-frame>
        }
      </span>
    </button>
  `,
})
export class ButtonComponent {
  /** Visual style — maps to Figma Button Type (Primary / Secondary / Tertiary). */
  @Input() variant: ButtonVariant = 'primary';
  /** Enforces the design-system minimum content width (84px). */
  @Input() minWidth = true;
  /** small: 18px web / 24px iPad; big: 24px web, 44px frame on iPad (--icon-frame-size-default). */
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() label = '';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className = '';
  /** Renders the leading icon frame and projects `[orbitLeftIcon]` content into it. */
  @Input() showLeftIcon = false;
  /** Renders the trailing icon frame and projects `[orbitRightIcon]` content into it. */
  @Input() showRightIcon = false;

  get showLabel(): boolean {
    return this.label != null && this.label !== '';
  }

  get classes(): string {
    return [
      'orbit-button',
      variantClass[this.variant],
      this.minWidth ? 'orbit-button--min-width' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
