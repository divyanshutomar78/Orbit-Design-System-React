import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import { EWasNavItemWTextInfoIconComponent } from './ewas-nav-item-w-text-icons.component';

/** Figma Orientation (Default → horizontal). */
export type EWasNavItemWTextOrientation = 'horizontal' | 'splitView' | 'vertical';

/** Figma State */
export type EWasNavItemWTextState = 'default' | 'selected';

/** Figma Characters — text length presets for Storybook / Figma parity. */
export type EWasNavItemWTextCharacters = 'default' | '6' | '7' | '8';

const CHARACTER_PRESETS: Record<
  Exclude<EWasNavItemWTextCharacters, 'default'>,
  { primary: string; secondary: string }
> = {
  '6': { primary: 'AA1234', secondary: 'EGLL-ZSPD' },
  '7': { primary: 'AA1234X', secondary: 'EGLL-ZSPD' },
  '8': { primary: 'AAL1234X', secondary: 'EGLL-ZSPD' },
};

const orientationClass: Record<EWasNavItemWTextOrientation, string> = {
  horizontal: 'orbit-ewas-nav-item-w-text--horizontal',
  splitView: 'orbit-ewas-nav-item-w-text--split-view',
  vertical: 'orbit-ewas-nav-item-w-text--vertical',
};

const stateClass: Record<EWasNavItemWTextState, string | undefined> = {
  default: undefined,
  selected: 'orbit-ewas-nav-item-w-text--selected',
};

@Component({
  selector: 'orbit-ewas-nav-item-w-text',
  standalone: true,
  imports: [CommonModule, IconFrameComponent, EWasNavItemWTextInfoIconComponent],
  templateUrl: './ewas-nav-item-w-text.component.html',
  styleUrls: ['./EWasNavItemWText.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavItemWTextComponent {
  /** Figma Characters — uses preset flight/route copy when primary/secondary omitted. */
  @Input() characters: EWasNavItemWTextCharacters = '6';
  /** Top line (flight id). Overrides Characters preset. */
  @Input() primaryText?: string;
  /** Bottom line (route). Overrides Characters preset. */
  @Input() secondaryText?: string;
  @Input() orientation: EWasNavItemWTextOrientation = 'horizontal';
  @Input() state: EWasNavItemWTextState = 'default';
  /** When true, projects default content instead of the info icon (Split View). */
  @Input() useIconSlot = false;
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() disabled?: boolean;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className?: string;

  @Output() itemClick = new EventEmitter<void>();

  get isSplitView(): boolean {
    return this.orientation === 'splitView';
  }

  get showIconOnly(): boolean {
    return this.isSplitView || this.characters === 'default';
  }

  private get preset() {
    return this.characters === 'default' ? undefined : CHARACTER_PRESETS[this.characters];
  }

  get primary(): string | undefined {
    return this.primaryText ?? this.preset?.primary;
  }

  get secondary(): string | undefined {
    return this.secondaryText ?? this.preset?.secondary;
  }

  get classes(): string {
    return [
      'orbit-ewas-nav-item-w-text',
      orientationClass[this.orientation],
      stateClass[this.state],
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.itemClick.emit();
    }
  }
}
