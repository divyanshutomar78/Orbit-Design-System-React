import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { Checkbox, CheckboxIndicator } from '../../primitives/checkbox';
import { cn } from '../../lib/utils';
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
  extends Omit<ComponentPropsWithoutRef<typeof Checkbox>, 'type' | 'children' | 'checked'> {
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
  onCheckedChange,
  ...checkboxRest
}: OptionCheckboxProps) {
  const isDisabled = disabledProp ?? status === 'disabled';
  const resolvedState = resolveCheckboxState(state, checked, indeterminate);
  const isOn = resolvedState === 'on';
  const isPartial = resolvedState === 'partial';

  const classes = cn(
    'orbit-option-checkbox',
    isOn && 'orbit-option-checkbox--on',
    isPartial && 'orbit-option-checkbox--partial',
    isDisabled && 'orbit-option-checkbox--disabled',
    status === 'hover' && !isDisabled && 'orbit-option-checkbox--hover',
    className,
  );

  const radixChecked = isPartial ? 'indeterminate' : isOn;

  return (
    <label className={classes} htmlFor={id}>
      <Checkbox
        id={id}
        disabled={isDisabled}
        checked={radixChecked}
        onCheckedChange={onCheckedChange}
        {...checkboxRest}
      >
        <CheckboxIndicator asChild forceMount>
          <IconFrame size={iconSize} className="orbit-option-checkbox__icon">
            <OptionCheckboxIcon state={resolvedState} />
          </IconFrame>
        </CheckboxIndicator>
      </Checkbox>
      <span className="orbit-option-checkbox__text">
        {textSlot ?? (
          <span className="orbit-option-checkbox__label">{label}</span>
        )}
      </span>
    </label>
  );
}
