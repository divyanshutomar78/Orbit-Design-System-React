import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ChipSelectIconComponent, ChipSelectedIconComponent } from '../Chip/chip-icons.component';
import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';

export type AttentionChipType = 'chip' | 'tag';
export type AttentionChipSize = 'default' | 'compact';

const typeClass: Record<AttentionChipType, string> = {
  chip: 'orbit-chip--chip',
  tag: 'orbit-chip--tag',
};

const sizeClass: Record<AttentionChipSize, string> = {
  default: 'orbit-chip--default',
  compact: 'orbit-chip--compact',
};

@Component({
  selector: 'orbit-attention-chip',
  standalone: true,
  imports: [IconFrameComponent, ChipSelectIconComponent, ChipSelectedIconComponent],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./AttentionChip.css'],
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
export class AttentionChipComponent {
  /** Figma Type — Chip (pill) or Tag (squared). */
  @Input() type: AttentionChipType = 'chip';
  /** Figma Size — Default or Compact. */
  @Input() size: AttentionChipSize = 'default';
  /** Figma State=Selected */
  @Input() selected = false;
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
      'orbit-attention-chip',
      typeClass[this.type],
      sizeClass[this.size],
      this.selected ? 'orbit-attention-chip--selected' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
