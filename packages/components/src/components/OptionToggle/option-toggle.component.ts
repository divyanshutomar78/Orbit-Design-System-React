import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  OptionToggleChevronIconComponent,
  OptionToggleIconComponent,
  type OptionToggleIconState,
} from './option-toggle-icons.component';

/** Figma State */
export type OptionToggleState = 'off' | 'on' | 'partial';

/** Figma Status */
export type OptionToggleStatus = 'default' | 'hover' | 'disabled';

function resolveToggleState(
  state: OptionToggleState | undefined,
  checked?: boolean,
  partial?: boolean,
): OptionToggleIconState {
  if (partial || state === 'partial') return 'partial';
  if (checked || state === 'on') return 'on';
  return 'off';
}

@Component({
  selector: 'orbit-option-toggle',
  standalone: true,
  imports: [
    CommonModule,
    IconFrameComponent,
    OptionToggleIconComponent,
    OptionToggleChevronIconComponent,
  ],
  templateUrl: './option-toggle.component.html',
  styleUrls: ['./OptionToggle.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OptionToggleComponent implements AfterViewInit, OnChanges {
  /** Figma Text Option */
  @Input() label: string = 'Option';
  /** Figma State (Off / On / Partial) */
  @Input() state: OptionToggleState = 'off';
  /** Convenience alias — maps to `state="on"` when true */
  @Input() checked?: boolean;
  /** Maps to `state="partial"` when true */
  @Input() partial?: boolean;
  /** Figma Status — for Storybook / forced preview */
  @Input() status: OptionToggleStatus = 'default';
  /** Figma showRightIcon — trailing chevron */
  @Input() showRightIcon = false;
  /** When true, projects `[orbitRightIcon]` content instead of the default chevron. */
  @Input() useRightIconSlot = false;
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() className?: string;
  @Input() disabled?: boolean;
  @Input() id?: string;
  @Input() name?: string;
  @Input() value?: string;
  /** When true, projects `[orbitTextSlot]` content instead of the default `label` span. */
  @Input() useTextSlot = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('toggleInput') private inputRef?: ElementRef<HTMLInputElement>;

  get isDisabled(): boolean {
    return this.disabled ?? this.status === 'disabled';
  }

  get resolvedState(): OptionToggleIconState {
    return resolveToggleState(this.state, this.checked, this.partial);
  }

  get isOn(): boolean {
    return this.resolvedState === 'on';
  }

  get isPartial(): boolean {
    return this.resolvedState === 'partial';
  }

  get ariaChecked(): string {
    return this.isPartial ? 'mixed' : String(this.isOn);
  }

  get classes(): string {
    return [
      'orbit-option-toggle',
      this.isOn ? 'orbit-option-toggle--on' : undefined,
      this.isPartial ? 'orbit-option-toggle--partial' : undefined,
      this.isDisabled ? 'orbit-option-toggle--disabled' : undefined,
      this.status === 'hover' && !this.isDisabled ? 'orbit-option-toggle--hover' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  ngAfterViewInit(): void {
    this.updateIndeterminate();
  }

  ngOnChanges(): void {
    this.updateIndeterminate();
  }

  onChange(event: Event): void {
    this.checkedChange.emit((event.target as HTMLInputElement).checked);
  }

  private updateIndeterminate(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.indeterminate = this.isPartial;
    }
  }
}
