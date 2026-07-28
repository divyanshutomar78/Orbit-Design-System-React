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
  OptionCheckboxIconComponent,
  type OptionCheckboxIconState,
} from './option-checkbox-icon.component';

/** Figma State */
export type OptionCheckboxState = 'off' | 'on' | 'partial';

/** Figma Status */
export type OptionCheckboxStatus = 'default' | 'hover' | 'disabled';

function resolveCheckboxState(
  state: OptionCheckboxState | undefined,
  checked?: boolean,
  indeterminate?: boolean,
): OptionCheckboxIconState {
  if (indeterminate || state === 'partial') return 'partial';
  if (checked || state === 'on') return 'on';
  return 'off';
}

@Component({
  selector: 'orbit-option-checkbox',
  standalone: true,
  imports: [CommonModule, IconFrameComponent, OptionCheckboxIconComponent],
  templateUrl: './option-checkbox.component.html',
  styleUrls: ['./OptionCheckbox.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OptionCheckboxComponent implements AfterViewInit, OnChanges {
  /** Figma Text Option */
  @Input() label: string = 'Option';
  /** Figma State (Off / On / Partial) */
  @Input() state: OptionCheckboxState = 'off';
  /** Convenience alias — maps to `state="on"` when true */
  @Input() checked?: boolean;
  /** Convenience alias — maps to `state="partial"` when true */
  @Input() indeterminate?: boolean;
  /** Figma Status — for Storybook / forced preview */
  @Input() status: OptionCheckboxStatus = 'default';
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() className?: string;
  @Input() disabled?: boolean;
  @Input() id?: string;
  @Input() name?: string;
  @Input() value?: string;
  /** When true, projects `[orbitTextSlot]` content instead of the default `label` span. */
  @Input() useTextSlot = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('checkboxInput') private inputRef?: ElementRef<HTMLInputElement>;

  get isDisabled(): boolean {
    return this.disabled ?? this.status === 'disabled';
  }

  get resolvedState(): OptionCheckboxIconState {
    return resolveCheckboxState(this.state, this.checked, this.indeterminate);
  }

  get isOn(): boolean {
    return this.resolvedState === 'on';
  }

  get isPartial(): boolean {
    return this.resolvedState === 'partial';
  }

  get classes(): string {
    return [
      'orbit-option-checkbox',
      this.isOn ? 'orbit-option-checkbox--on' : undefined,
      this.isPartial ? 'orbit-option-checkbox--partial' : undefined,
      this.isDisabled ? 'orbit-option-checkbox--disabled' : undefined,
      this.status === 'hover' && !this.isDisabled ? 'orbit-option-checkbox--hover' : undefined,
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
