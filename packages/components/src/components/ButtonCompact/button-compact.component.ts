import { Component, Input, ViewEncapsulation } from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';

export type ButtonCompactVariant = 'primary' | 'secondary' | 'tertiary';

const variantClass: Record<ButtonCompactVariant, string> = {
  primary: 'orbit-button-compact--primary',
  secondary: 'orbit-button-compact--secondary',
  tertiary: 'orbit-button-compact--tertiary',
};

@Component({
  selector: 'orbit-button-compact',
  standalone: true,
  imports: [IconFrameComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ButtonCompact.css'],
  template: `
    <button
      [type]="type"
      [class]="classes"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled || null"
    >
      <span class="orbit-button-compact__content">
        @if (showLeftIcon) {
          <orbit-icon-frame [size]="iconSize" [className]="'orbit-button-compact__icon'">
            <ng-content select="[orbitLeftIcon]"></ng-content>
          </orbit-icon-frame>
        }
        @if (showLabel) {
          <span class="orbit-button-compact__label"><ng-content>{{ label }}</ng-content></span>
        }
        @if (showRightIcon) {
          <orbit-icon-frame [size]="iconSize" [className]="'orbit-button-compact__icon'">
            <ng-content select="[orbitRightIcon]"></ng-content>
          </orbit-icon-frame>
        }
      </span>
    </button>
  `,
})
export class ButtonCompactComponent {
  /** Visual style — maps to Figma Button Type (Primary / Secondary / Tertiary). */
  @Input() variant: ButtonCompactVariant = 'primary';
  /** Enforces compact minimum content width (66px on web). */
  @Input() minWidth = true;
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
      'orbit-button-compact',
      variantClass[this.variant],
      this.minWidth ? 'orbit-button-compact--min-width' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
