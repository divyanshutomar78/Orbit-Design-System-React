import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ActionMenuComponent, type ActionMenuItemConfig } from '../ActionMenu/action-menu.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  InputSelectChevronIconComponent,
  InputSelectClearIconComponent,
  InputSelectFieldInfoIconComponent,
  InputSelectLabelInfoIconComponent,
} from './input-select-icons.component';

/** Figma _Input_inner_content — Type */
export type InputSelectContentType =
  | 'placeholder'
  | 'value'
  | 'label'
  | 'labelValue'
  | 'valueLabel'
  | 'labelValueLabel';

/** Figma _Input_background — visual state (for docs / forced preview). */
export type InputSelectVisualState = 'default' | 'hover' | 'selected' | 'error' | 'disabled';

export interface InputSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

let inputSelectIdCounter = 0;

function resolveContentType(
  contentType: InputSelectContentType | undefined,
  hasValue: boolean,
  _hasDropdown: boolean,
): InputSelectContentType {
  if (contentType) return contentType;
  return hasValue ? 'value' : 'placeholder';
}

function optionsToMenuItems(options: InputSelectOption[], value: string): ActionMenuItemConfig[] {
  return options.map((option) => ({
    id: option.value,
    label: option.label,
    selected: option.value === value,
    disabled: option.disabled,
    showLeftIcon: true,
    leftIconType: 'checkmark',
    showRightIcon1: false,
    showRightIcon2: false,
  }));
}

@Component({
  selector: 'orbit-input-select',
  standalone: true,
  imports: [
    CommonModule,
    ActionMenuComponent,
    InputSelectLabelInfoIconComponent,
    InputSelectChevronIconComponent,
    InputSelectClearIconComponent,
    InputSelectFieldInfoIconComponent,
  ],
  templateUrl: './input-select.component.html',
  styleUrls: ['./InputSelect.css', '../LabelValueHorizontal/LabelValueHorizontal.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSelectComponent implements OnInit {
  /** Field label (Figma Only Label). */
  @Input() label = 'Label';
  /** Figma Show Label */
  @Input() showLabel = true;
  /** Info icon beside the field label. */
  @Input() showLabelInfo = true;
  @Input() placeholder = 'Placeholder';
  @Input() value?: string;
  @Input() defaultValue = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() options?: InputSelectOption[];
  /** Override Action Menu rows (defaults from `options`). */
  @Input() menuItems?: ActionMenuItemConfig[];
  @Input() menuIconSize: OrbitIconSize = 'big';
  /** Figma Helper */
  @Input() helper = 'Helper';
  /** Figma Show Helper */
  @Input() showHelper = true;
  /** Figma Show Bottom Space Helper — room for helper / error lines. */
  @Input() showBottomSpaceHelper = false;
  /** Figma Error */
  @Input() errorMessage = 'ErrorMessage';
  /** Figma Show Error Message */
  @Input() showErrorMessage = false;
  /** Inner field content when not driven by `options`. */
  @Input() contentType?: InputSelectContentType;
  /** Inline label for `labelValue` / `valueLabel` / `labelValueLabel` content. */
  @Input() inlineLabel = 'Label';
  /** Inline value text for content types that show a value. */
  @Input() displayValue = 'Value';
  @Input() secondaryInlineLabel = 'Label';
  /** Figma _Input_Icons_Right */
  @Input() showRightIcons?: boolean;
  @Input() showSelectIcon = true;
  @Input() showClearIcon = false;
  @Input() showFieldInfoIcon = false;
  @Output() clear = new EventEmitter<void>();
  /** Force a visual state (Storybook); `disabled` overrides to `disabled`. */
  @Input() visualState?: InputSelectVisualState;
  /** Form field name (hidden input when using options dropdown). */
  @Input() name?: string;
  @Input() disabled = false;
  @Input() className?: string;
  @Input() id?: string;

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('container') private containerRef!: ElementRef<HTMLElement>;

  isOpen = false;
  private uncontrolledValue = '';
  private readonly generatedId = `orbit-input-select-${++inputSelectIdCounter}`;

  ngOnInit(): void {
    this.uncontrolledValue = this.defaultValue;
  }

  get fieldId(): string {
    return this.id ?? this.generatedId;
  }

  get menuId(): string {
    return `${this.fieldId}-menu`;
  }

  private get isControlled(): boolean {
    return this.value !== undefined;
  }

  get currentValue(): string {
    return this.isControlled ? (this.value as string) : this.uncontrolledValue;
  }

  get hasValue(): boolean {
    return this.currentValue.length > 0;
  }

  get hasDropdown(): boolean {
    return !!(this.options && this.options.length);
  }

  get resolvedContent(): InputSelectContentType {
    return resolveContentType(this.contentType, this.hasValue, this.hasDropdown);
  }

  get selectedOption(): InputSelectOption | undefined {
    return this.options?.find((option) => option.value === this.currentValue);
  }

  get actionMenuItems(): ActionMenuItemConfig[] | undefined {
    return this.menuItems ?? (this.options ? optionsToMenuItems(this.options, this.currentValue) : undefined);
  }

  get resolvedVisualState(): InputSelectVisualState {
    if (this.disabled) return 'disabled';
    if (this.showErrorMessage) return 'error';
    if (this.isOpen) return 'selected';
    return this.visualState ?? (this.hasValue ? 'selected' : 'default');
  }

  get showIcons(): boolean {
    if (this.showRightIcons !== undefined) return this.showRightIcons;
    return (
      this.hasDropdown &&
      !this.disabled &&
      (this.hasValue || this.isOpen || this.resolvedContent !== 'placeholder')
    );
  }

  get horizontalLayoutClass(): string {
    if (this.resolvedContent === 'valueLabel') return 'orbit-label-value-horizontal--layout-v-l';
    if (this.resolvedContent === 'labelValueLabel') return 'orbit-label-value-horizontal--layout-l-v-l';
    return 'orbit-label-value-horizontal--layout-l-v';
  }

  get classes(): string {
    return [
      'orbit-input-select',
      `orbit-input-select--${this.resolvedVisualState}`,
      this.isOpen ? 'orbit-input-select--open' : undefined,
      this.disabled ? 'orbit-input-select--disabled' : undefined,
      this.hasDropdown ? 'orbit-input-select--has-menu' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get showBottomHelperText(): boolean {
    return this.showBottomSpaceHelper && (this.showHelper || this.showErrorMessage);
  }

  private setValue(next: string): void {
    if (!this.isControlled) {
      this.uncontrolledValue = next;
    }
    this.valueChange.emit(next);
  }

  private setOpen(next: boolean): void {
    this.isOpen = next;
    this.openChange.emit(next);
  }

  onItemSelect(itemId: string): void {
    this.setValue(itemId);
    this.setOpen(false);
  }

  onClear(): void {
    this.setValue('');
    this.clear.emit();
    this.setOpen(false);
  }

  toggleOpen(): void {
    if (this.disabled || !this.hasDropdown) return;
    this.setOpen(!this.isOpen);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.isOpen) return;
    const target = event.target as Node;
    if (this.containerRef && !this.containerRef.nativeElement.contains(target)) {
      this.setOpen(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (event.key === 'Escape') {
      this.setOpen(false);
    }
  }
}
