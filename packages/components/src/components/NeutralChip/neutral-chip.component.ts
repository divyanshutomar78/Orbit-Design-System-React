import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ChipSelectIconComponent, ChipSelectedIconComponent } from '../Chip/chip-icons.component';
import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';

export type NeutralChipType = 'chip' | 'tag';
export type NeutralChipSize = 'default' | 'compact';

const typeClass: Record<NeutralChipType, string> = {
  chip: 'orbit-chip--chip',
  tag: 'orbit-chip--tag',
};

const sizeClass: Record<NeutralChipSize, string> = {
  default: 'orbit-chip--default',
  compact: 'orbit-chip--compact',
};

@Component({
  selector: 'orbit-neutral-chip',
  standalone: true,
  imports: [IconFrameComponent, ChipSelectIconComponent, ChipSelectedIconComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./NeutralChip.css'],
  template: `
    <button
      type="button"
      [class]="classes"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
      [attr.aria-disabled]="disabled || null"
    >
      <span class="orbit-chip__content">
        @if (showIcon) {
          <orbit-icon-frame [size]="iconSize" [className]="'orbit-chip__icon'">
            @if (selected) {
              <ng-content select="[orbitSelectedIcon]">
                <orbit-chip-selected-icon></orbit-chip-selected-icon>
              </ng-content>
            } @else {
              <ng-content select="[orbitIcon]">
                <orbit-chip-select-icon></orbit-chip-select-icon>
              </ng-content>
            }
          </orbit-icon-frame>
        }
        @if (showLabel) {
          <span class="orbit-chip__label"><ng-content>{{ label }}</ng-content></span>
        }
      </span>
    </button>
  `,
})
export class NeutralChipComponent {
  /** Figma Type — Chip (pill) or Tag (squared). */
  @Input() type: NeutralChipType = 'chip';
  /** Figma Size — Default or Compact. */
  @Input() size: NeutralChipSize = 'default';
  /** Figma State=Selected */
  @Input() selected = false;
  /** small: --icon-frame-size-small; big: --icon-frame-size-default + --icon-default */
  @Input() iconSize: OrbitIconSize = 'small';
  @Input() showIcon = true;
  @Input() label = 'Text';
  @Input() disabled = false;
  @Input() className = '';

  get showLabel(): boolean {
    return this.label != null && this.label !== '';
  }

  get classes(): string {
    return [
      'orbit-chip',
      'orbit-neutral-chip',
      typeClass[this.type],
      sizeClass[this.size],
      this.selected ? 'orbit-neutral-chip--selected' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
