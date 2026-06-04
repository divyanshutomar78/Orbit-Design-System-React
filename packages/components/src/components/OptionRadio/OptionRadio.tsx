import type { InputHTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import { OptionRadioIcon } from './OptionRadioIcons';
import './OptionRadio.css';

/** Figma Status */
export type OptionRadioStatus = 'default' | 'hover' | 'disabled';

export interface OptionRadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Figma Text Option */
  label?: ReactNode;
  /** Figma Selected */
  selected?: boolean;
  /** Figma Status — for Storybook / forced preview */
  status?: OptionRadioStatus;
  /** Figma textComponent slot */
  textSlot?: ReactNode;
  iconSize?: OrbitIconSize;
  className?: string;
}

export function OptionRadio({
  label = 'Option',
  selected = false,
  status = 'default',
  textSlot,
  iconSize = 'big',
  className,
  disabled: disabledProp,
  checked,
  id,
  ...inputRest
}: OptionRadioProps) {
  const isDisabled = disabledProp ?? status === 'disabled';
  const isSelected = checked ?? selected;

  const classes = [
    'orbit-option-radio',
    isSelected ? 'orbit-option-radio--selected' : undefined,
    isDisabled ? 'orbit-option-radio--disabled' : undefined,
    status === 'hover' && !isDisabled ? 'orbit-option-radio--hover' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        type="radio"
        id={id}
        className="orbit-option-radio__input"
        checked={isSelected}
        disabled={isDisabled}
        {...inputRest}
      />
      <IconFrame size={iconSize} className="orbit-option-radio__icon">
        <OptionRadioIcon selected={isSelected} />
      </IconFrame>
      <span className="orbit-option-radio__text">
        {textSlot ?? <span className="orbit-option-radio__label">{label}</span>}
      </span>
    </label>
  );
}
