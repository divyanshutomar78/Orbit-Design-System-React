import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import type { OrbitIconSize } from '../Icon/iconSize';
import { ActionMenuItemComponent, type ActionMenuLeftIconType } from './action-menu-item.component';

export interface ActionMenuItemConfig {
  id: string;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  showLeftIcon?: boolean;
  leftIconType?: ActionMenuLeftIconType;
  showRightIcon1?: boolean;
  showRightIcon2?: boolean;
  rightIcon1Label?: string;
  rightIcon2Label?: string;
  className?: string;
}

@Component({
  selector: 'orbit-action-menu',
  standalone: true,
  imports: [CommonModule, ActionMenuItemComponent],
  templateUrl: './action-menu.component.html',
  styleUrls: ['./ActionMenu.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuComponent {
  /** Figma Add Items — shows top "Add more item" row. */
  @Input() addItems = false;
  /** Action menu rows rendered as orbit-action-menu-item. */
  @Input() items?: ActionMenuItemConfig[];
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() className?: string;
  @Input() id?: string;

  @Output() itemSelect = new EventEmitter<string>();
  @Output() itemRightIcon1 = new EventEmitter<string>();
  @Output() itemRightIcon2 = new EventEmitter<string>();

  get classes(): string {
    return ['orbit-action-menu', this.className].filter(Boolean).join(' ');
  }

  onItemSelect(itemId: string): void {
    this.itemSelect.emit(itemId);
  }

  onItemRightIcon1(itemId: string): void {
    this.itemRightIcon1.emit(itemId);
  }

  onItemRightIcon2(itemId: string): void {
    this.itemRightIcon2.emit(itemId);
  }
}
