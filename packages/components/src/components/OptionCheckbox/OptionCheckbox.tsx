import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  OptionCheckboxIcon,
  type OptionCheckboxIconState,
} from './OptionCheckboxIcons';
import './OptionCheckbox.css';

/** Figma State */
export type OptionCheckboxState = 'off' | 'on' | 'partial';

/** Figma Status */
export type OptionCheckboxStatus = 'default' | 'hover' | 'disabled';

export interface OptionCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Figma Text Option */
  label?: ReactNode;
  /** Figma State (Off / On / Partial) */
  state?: OptionCheckboxState;
  /** Convenience alias — maps to `state="on"` when true */
  checked?: boolean;
  /** Convenience alias — maps to `state="partial"` when true */
  indeterminate?: boolean;
  /** Figma Status — for Storybook / forced preview */
  status?: OptionCheckboxStatus;
  /** Figma textComponent slot */
  textSlot?: ReactNode;
  iconSize?: OrbitIconSize;
  className?: string;
}

function resolveCheckboxState(
  state: OptionCheckboxState | undefined,
  checked?: boolean,
  indeterminate?: boolean,
): OptionCheckboxIconState {
  if (indeterminate || state === 'partial') return 'partial';
  if (checked || state === 'on') return 'on';
  return 'off';
}

export function OptionCheckbox({
  label = 'Option',
  state = 'off',
  checked,
  indeterminate,
  status = 'default',
  textSlot,
  iconSize = 'big',
  className,
  disabled: disabledProp,
  id,
  ...inputRest
}: OptionCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = disabledProp ?? status === 'disabled';
  const resolvedState = resolveCheckboxState(state, checked, indeterminate);
  const isOn = resolvedState === 'on';
  const isPartial = resolvedState === 'partial';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isPartial;
    }
  }, [isPartial]);

  const classes = [
    'orbit-option-checkbox',
    isOn ? 'orbit-option-checkbox--on' : undefined,
    isPartial ? 'orbit-option-checkbox--partial' : undefined,
    isDisabled ? 'orbit-option-checkbox--disabled' : undefined,
    status === 'hover' && !isDisabled ? 'orbit-option-checkbox--hover' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        className="orbit-option-checkbox__input"
        checked={isOn}
        disabled={isDisabled}
        {...inputRest}
      />
      <IconFrame size={iconSize} className="orbit-option-checkbox__icon">
        <OptionCheckboxIcon state={resolvedState} />
      </IconFrame>
      <span className="orbit-option-checkbox__text">
        {textSlot ?? (
          <span className="orbit-option-checkbox__label">{label}</span>
        )}
      </span>
    </label>
  );
}
