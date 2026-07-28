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
import { OptionRadioIconComponent } from './option-radio-icon.component';

/** Figma Status */
export type OptionRadioStatus = 'default' | 'hover' | 'disabled';

@Component({
  selector: 'orbit-option-radio',
  standalone: true,
  imports: [CommonModule, IconFrameComponent, OptionRadioIconComponent],
  templateUrl: './option-radio.component.html',
  styleUrls: ['./OptionRadio.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OptionRadioComponent {
  /** Figma Text Option */
  @Input() label: string = 'Option';
  /** Figma Selected */
  @Input() selected = false;
  /** Convenience alias — overrides `selected` when set (mirrors native `checked`). */
  @Input() checked?: boolean;
  /** Figma Status — for Storybook / forced preview */
  @Input() status: OptionRadioStatus = 'default';
  @Input() disabled?: boolean;
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() className?: string;
  @Input() id?: string;
  @Input() name?: string;
  @Input() value?: string;
  /** When true, projects `[orbitTextSlot]` content instead of the default `label` span. */
  @Input() useTextSlot = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  get isSelected(): boolean {
    return this.checked ?? this.selected;
  }

  get isDisabled(): boolean {
    return this.disabled ?? this.status === 'disabled';
  }

  get classes(): string {
    return [
      'orbit-option-radio',
      this.isSelected ? 'orbit-option-radio--selected' : undefined,
      this.isDisabled ? 'orbit-option-radio--disabled' : undefined,
      this.status === 'hover' && !this.isDisabled ? 'orbit-option-radio--hover' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedChange.emit(checked);
  }
}
