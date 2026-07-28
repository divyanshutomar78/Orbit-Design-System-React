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
import { EWasNavItemRocketIconComponent } from './ewas-nav-item-icons.component';

/** Figma Orientation */
export type EWasNavItemOrientation = 'horizontal' | 'splitView' | 'vertical';

/** Figma State */
export type EWasNavItemState = 'default' | 'active' | 'disabled';

const orientationClass: Record<EWasNavItemOrientation, string> = {
  horizontal: 'orbit-ewas-nav-item--horizontal',
  splitView: 'orbit-ewas-nav-item--split-view',
  vertical: 'orbit-ewas-nav-item--vertical',
};

const stateClass: Record<EWasNavItemState, string | undefined> = {
  default: undefined,
  active: 'orbit-ewas-nav-item--active',
  disabled: 'orbit-ewas-nav-item--disabled',
};

@Component({
  selector: 'orbit-ewas-nav-item',
  standalone: true,
  imports: [CommonModule, IconFrameComponent, EWasNavItemRocketIconComponent],
  templateUrl: './ewas-nav-item.component.html',
  styleUrls: ['./EWasNavItem.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavItemComponent {
  /** Figma Nav Item */
  @Input() navItem: string | undefined = 'Flights';
  /** When true, projects default content instead of the rocket icon. */
  @Input() useIconSlot = false;
  @Input() orientation: EWasNavItemOrientation = 'horizontal';
  @Input() state: EWasNavItemState = 'default';
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() disabled?: boolean;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className?: string;

  @Output() itemClick = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled ?? this.state === 'disabled';
  }

  get showLabel(): boolean {
    return this.orientation !== 'splitView';
  }

  get classes(): string {
    return [
      'orbit-ewas-nav-item',
      orientationClass[this.orientation],
      stateClass[this.state],
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(): void {
    if (!this.isDisabled) {
      this.itemClick.emit();
    }
  }
}
