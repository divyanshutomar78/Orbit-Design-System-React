import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  ActionMenuCheckboxIconComponent,
  ActionMenuCheckIconComponent,
  ActionMenuChevronDownIconComponent,
  ActionMenuCloseIconComponent,
  ActionMenuRadioIconComponent,
  ActionMenuToggleIconComponent,
} from './action-menu-icons.component';

/** Figma _Action Menu Left icons → Type */
export type ActionMenuLeftIconType = 'checkmark' | 'checkbox' | 'radio' | 'toggle';

/**
 * Renders as either an `<li>` (default, inside `orbit-action-menu`'s list) or a
 * `<div>` (e.g. projected into the "Add more item" slot) — apply the
 * `orbitActionMenuItem` attribute to the host tag you need, matching the React
 * `as="li" | "div"` prop. The host tag itself is used (no extra wrapper element)
 * so `:last-child` / `>` CSS in `ActionMenu.css` keeps working.
 */
@Component({
  selector: 'li[orbitActionMenuItem], div[orbitActionMenuItem]',
  standalone: true,
  imports: [
    CommonModule,
    IconFrameComponent,
    ActionMenuCheckIconComponent,
    ActionMenuCheckboxIconComponent,
    ActionMenuRadioIconComponent,
    ActionMenuToggleIconComponent,
    ActionMenuChevronDownIconComponent,
    ActionMenuCloseIconComponent,
  ],
  templateUrl: './action-menu-item.component.html',
  styleUrls: ['./ActionMenu.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuItemComponent {
  /** Figma - Text */
  @Input() label = 'Item';
  /** When true, projects `[orbitLabel]` instead of `label`. */
  @Input() useLabelSlot = false;
  /** Figma State — Selected shows primary label + selected left icon. */
  @Input() selected = false;
  /** Figma Show Left Icon */
  @Input() showLeftIcon = true;
  /** Figma left icon Type (nested Action Menu Left icons). */
  @Input() leftIconType: ActionMenuLeftIconType = 'checkmark';
  /** When true, projects `[orbitLeftIcon]` instead of the resolved `leftIconType` glyph. */
  @Input() useLeftIconSlot = false;
  /** Figma Right icon 1 — chevron. */
  @Input() showRightIcon1 = true;
  /** Figma Right icon 2 — close. */
  @Input() showRightIcon2 = true;
  /** When true, projects `[orbitRightIcon1]` instead of the default chevron. */
  @Input() useRightIcon1Slot = false;
  /** When true, projects `[orbitRightIcon2]` instead of the default close icon. */
  @Input() useRightIcon2Slot = false;
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() disabled = false;
  @Input() rightIcon1Label = 'Expand';
  @Input() rightIcon2Label = 'Remove';
  @Input() className?: string;

  @Output() itemSelect = new EventEmitter<void>();
  @Output() rightIcon1Click = new EventEmitter<void>();
  @Output() rightIcon2Click = new EventEmitter<void>();

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  @HostBinding('class')
  get hostClass(): string {
    return [
      'orbit-action-menu-item',
      this.selected ? 'orbit-action-menu-item--selected' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  @HostBinding('attr.role')
  get hostRole(): string | null {
    return this.host.nativeElement.tagName.toLowerCase() === 'li' ? 'none' : null;
  }

  get showLeftGlyph(): boolean {
    return this.useLeftIconSlot || (this.showLeftIcon && (this.leftIconType !== 'checkmark' || this.selected));
  }

  get leftIsEmptySpacer(): boolean {
    return (
      this.showLeftIcon &&
      !this.useLeftIconSlot &&
      this.leftIconType === 'checkmark' &&
      !this.selected
    );
  }

  get leftSpanClasses(): string {
    return [
      'orbit-action-menu-item__left',
      this.leftIsEmptySpacer ? 'orbit-action-menu-item__left--empty' : undefined,
      this.selected && this.leftIconType === 'checkmark' ? 'orbit-action-menu-item__left--check' : undefined,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onSelect(): void {
    this.itemSelect.emit();
  }

  onRightIcon1Click(event: Event): void {
    event.stopPropagation();
    this.rightIcon1Click.emit();
  }

  onRightIcon2Click(event: Event): void {
    event.stopPropagation();
    this.rightIcon2Click.emit();
  }
}
