import {
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../primitives/popover';
import {
  ActionMenu,
  type ActionMenuItemConfig,
  type ActionMenuProps,
} from '../ActionMenu/ActionMenu';
import type { OrbitIconSize } from '../Icon/iconSize';
import { LabelValueHorizontal } from '../LabelValueHorizontal/LabelValueHorizontal';
import {
  InputSelectChevronIcon,
  InputSelectClearIcon,
  InputSelectFieldInfoIcon,
  InputSelectLabelInfoIcon,
} from './InputSelectIcons';
import './InputSelect.css';

/** Figma _Input_inner_content — Type */
export type InputSelectContentType =
  | 'placeholder'
  | 'value'
  | 'label'
  | 'labelValue'
  | 'valueLabel'
  | 'labelValueLabel';

/** Figma _Input_background — visual state (for docs / forced preview). */
export type InputSelectVisualState =
  | 'default'
  | 'hover'
  | 'selected'
  | 'error'
  | 'disabled';

export interface InputSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface InputSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Field label (Figma Only Label). */
  label?: ReactNode;
  /** Figma Show Label */
  showLabel?: boolean;
  /** Info icon beside the field label. */
  showLabelInfo?: boolean;
  placeholder?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options?: InputSelectOption[];
  /** Override Action Menu rows (defaults from `options`). */
  menuItems?: ActionMenuItemConfig[];
  /** Passed to Action Menu (Add Items, addMoreItem, icon handlers, etc.). */
  actionMenuProps?: Omit<
    ActionMenuProps,
    'items' | 'onItemSelect' | 'className'
  >;
  menuIconSize?: OrbitIconSize;
  /** Figma Helper */
  helper?: ReactNode;
  /** Figma Show Helper */
  showHelper?: boolean;
  /** Figma Show Bottom Space Helper — room for helper / error lines. */
  showBottomSpaceHelper?: boolean;
  /** Figma Error */
  errorMessage?: ReactNode;
  /** Figma Show Error Message */
  showErrorMessage?: boolean;
  /** Inner field content when not driven by `options`. */
  contentType?: InputSelectContentType;
  /** Inline label for `labelValue` / `valueLabel` / `labelValueLabel` content. */
  inlineLabel?: ReactNode;
  /** Inline value text for content types that show a value. */
  displayValue?: ReactNode;
  secondaryInlineLabel?: ReactNode;
  /** Figma _Input_Icons_Right */
  showRightIcons?: boolean;
  showSelectIcon?: boolean;
  showClearIcon?: boolean;
  showFieldInfoIcon?: boolean;
  onClear?: () => void;
  /** Force a visual state (Storybook); `disabled` prop overrides to `disabled`. */
  visualState?: InputSelectVisualState;
  /** Form field name (hidden input when using options dropdown). */
  name?: string;
  disabled?: boolean;
  className?: string;
}

function resolveContentType(
  contentType: InputSelectContentType | undefined,
  hasValue: boolean,
  hasDropdown: boolean,
): InputSelectContentType {
  if (contentType) return contentType;
  if (hasDropdown) {
    return hasValue ? 'value' : 'placeholder';
  }
  return hasValue ? 'value' : 'placeholder';
}

function optionsToMenuItems(
  options: InputSelectOption[],
  value: string,
): ActionMenuItemConfig[] {
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

export function InputSelect({
  label = 'Label',
  showLabel = true,
  showLabelInfo = true,
  placeholder = 'Placeholder',
  value: valueProp,
  defaultValue = '',
  onValueChange,
  options,
  menuItems,
  actionMenuProps,
  menuIconSize = 'big',
  helper = 'Helper',
  showHelper = true,
  showBottomSpaceHelper = false,
  errorMessage = 'ErrorMessage',
  showErrorMessage = false,
  contentType,
  inlineLabel = 'Label',
  displayValue = 'Value',
  secondaryInlineLabel = 'Label',
  showRightIcons,
  showSelectIcon = true,
  showClearIcon = false,
  showFieldInfoIcon = false,
  onClear,
  visualState,
  disabled = false,
  className,
  id: idProp,
  name,
  ...rest
}: InputSelectProps) {
  const generatedId = useId();
  const fieldId = idProp ?? generatedId;
  const menuId = `${fieldId}-menu`;

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const value = isControlled ? valueProp : uncontrolledValue;
  const hasValue = value.length > 0;
  const hasDropdown = Boolean(options?.length);

  const resolvedContent = resolveContentType(
    contentType,
    hasValue,
    hasDropdown,
  );
  const selectedOption = options?.find((option) => option.value === value);

  const actionMenuItems = useMemo(
    () =>
      menuItems ??
      (options ? optionsToMenuItems(options, value) : undefined),
    [menuItems, options, value],
  );

  const resolvedVisualState: InputSelectVisualState = disabled
    ? 'disabled'
    : showErrorMessage
      ? 'error'
      : open
        ? 'selected'
        : (visualState ?? (hasValue ? 'selected' : 'default'));

  const showIcons =
    showRightIcons ??
    (hasDropdown && !disabled && (hasValue || open || resolvedContent !== 'placeholder'));

  const setValue = (next: string) => {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  };

  const handleItemSelect = (itemId: string) => {
    setValue(itemId);
    setOpen(false);
  };

  const handleClear = () => {
    setValue('');
    onClear?.();
    setOpen(false);
  };

  const horizontalLayout =
    resolvedContent === 'valueLabel'
      ? 'V + L'
      : resolvedContent === 'labelValueLabel'
        ? 'L+V+L'
        : 'L + V';

  const renderFieldContent = () => {
    if (hasDropdown && hasValue && selectedOption) {
      return (
        <span className="orbit-input-select__value-text">
          {selectedOption.label}
        </span>
      );
    }

    if (
      resolvedContent === 'labelValue' ||
      resolvedContent === 'valueLabel' ||
      resolvedContent === 'labelValueLabel'
    ) {
      return (
        <LabelValueHorizontal
          layout={horizontalLayout}
          label={inlineLabel}
          value={displayValue}
          secondaryLabel={secondaryInlineLabel}
        />
      );
    }

    if (resolvedContent === 'label') {
      return (
        <span className="orbit-input-select__inline-label">{inlineLabel}</span>
      );
    }

    if (resolvedContent === 'value') {
      return (
        <span className="orbit-input-select__value-text">{displayValue}</span>
      );
    }

    return (
      <span className="orbit-input-select__placeholder">{placeholder}</span>
    );
  };

  const classes = cn(
    'orbit-input-select',
    `orbit-input-select--${resolvedVisualState}`,
    open && 'orbit-input-select--open',
    disabled && 'orbit-input-select--disabled',
    hasDropdown && 'orbit-input-select--has-menu',
    className,
  );

  const fieldButton = (
    <button
      type="button"
      id={fieldId}
      className="orbit-input-select__field"
      disabled={disabled}
      aria-labelledby={showLabel ? `${fieldId}-label` : undefined}
      aria-invalid={showErrorMessage || undefined}
      aria-describedby={
        showBottomSpaceHelper && (showHelper || showErrorMessage)
          ? `${fieldId}-helper`
          : undefined
      }
    >
      <span className="orbit-input-select__background" aria-hidden />
      <span className="orbit-input-select__content">{renderFieldContent()}</span>
      {showIcons ? (
        <span className="orbit-input-select__icons">
          {showClearIcon && hasValue ? (
            <span
              role="button"
              tabIndex={-1}
              className="orbit-input-select__icon-button"
              aria-label="Clear selection"
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation();
                handleClear();
              }}
            >
              <InputSelectClearIcon />
            </span>
          ) : null}
          {showSelectIcon && hasDropdown ? (
            <span className="orbit-input-select__icon-button" aria-hidden>
              <InputSelectChevronIcon />
            </span>
          ) : null}
          {showFieldInfoIcon ? (
            <>
              <span className="orbit-input-select__divider" aria-hidden />
              <span className="orbit-input-select__icon-button" aria-hidden>
                <InputSelectFieldInfoIcon />
              </span>
            </>
          ) : null}
        </span>
      ) : (
        <span className="orbit-input-select__icons-spacer" aria-hidden />
      )}
    </button>
  );

  return (
    <div className={classes} {...rest}>
      {showLabel ? (
        <div className="orbit-input-select__label-row">
          <span className="orbit-input-select__label" id={`${fieldId}-label`}>
            {label}
          </span>
          {showLabelInfo ? (
            <span className="orbit-input-select__label-info" aria-hidden>
              <InputSelectLabelInfoIcon />
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="orbit-input-select__field-wrap">
        {name && hasDropdown ? (
          <input type="hidden" name={name} value={value} />
        ) : null}

        {hasDropdown ? (
          <Popover open={open && !disabled} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {fieldButton}
            </PopoverTrigger>
            {actionMenuItems ? (
              <PopoverContent
                id={menuId}
                side="bottom"
                onOpenAutoFocus={(event) => event.preventDefault()}
              >
                <ActionMenu
                  className="orbit-input-select__menu"
                  items={actionMenuItems}
                  iconSize={menuIconSize}
                  onItemSelect={handleItemSelect}
                  {...actionMenuProps}
                />
              </PopoverContent>
            ) : null}
          </Popover>
        ) : (
          fieldButton
        )}
      </div>

      {showBottomSpaceHelper ? (
        <div className="orbit-input-select__footer" id={`${fieldId}-helper`}>
          {showHelper ? (
            <p className="orbit-input-select__helper">{helper}</p>
          ) : null}
          {showErrorMessage ? (
            <p className="orbit-input-select__error">{errorMessage}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
