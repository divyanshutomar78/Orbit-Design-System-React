import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { TooltipInfoIconComponent } from './tooltip-icons.component';
import { TooltipPopupComponent } from './tooltip-popup.component';

/** Figma Direction */
export type TooltipDirection = 'left' | 'right';

let tooltipIdCounter = 0;

@Component({
  selector: 'orbit-tooltip',
  standalone: true,
  imports: [CommonModule, TooltipInfoIconComponent, TooltipPopupComponent],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./Tooltip.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
  /** Figma Direction */
  @Input() direction: TooltipDirection = 'right';
  /** Figma State — open popup (for Storybook / controlled). */
  @Input() open?: boolean;
  @Input() defaultOpen = false;
  @Output() openChange = new EventEmitter<boolean>();
  /** Popup copy when `popupContent` slot is not used. */
  @Input() text: string | null = 'Toolem ipsum';
  /** Figma Show Default Text */
  @Input() showText = true;
  /** When true, projects `[orbitPopupContent]` instead of `text`. */
  @Input() usePopupContentSlot = false;
  /** When true, projects `[orbitTrigger]` instead of the default 18×18 info trigger. */
  @Input() useTriggerSlot = false;
  /** Accessible name for the default info trigger. */
  @Input() triggerLabel = 'More information';
  @Input() triggerClassName?: string;
  @Input() className?: string;

  private uncontrolledOpen = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  readonly tooltipId = `orbit-tooltip-${++tooltipIdCounter}`;

  ngOnInit(): void {
    this.uncontrolledOpen = this.defaultOpen;
  }

  get isOpen(): boolean {
    return this.open !== undefined ? this.open : this.uncontrolledOpen;
  }

  setOpen(next: boolean): void {
    if (this.open === undefined) {
      this.uncontrolledOpen = next;
    }
    this.openChange.emit(next);
  }

  onFocusOut(event: FocusEvent): void {
    const related = event.relatedTarget as Node | null;
    if (!related || !this.elementRef.nativeElement.contains(related)) {
      this.setOpen(false);
    }
  }

  get classes(): string {
    const alignEnd = this.direction === 'left' && this.isOpen;
    return [
      'orbit-tooltip',
      alignEnd ? 'orbit-tooltip--align-end' : 'orbit-tooltip--align-start',
      this.isOpen ? 'orbit-tooltip--open' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get triggerClasses(): string {
    return ['orbit-tooltip__trigger', this.triggerClassName].filter(Boolean).join(' ');
  }
}
