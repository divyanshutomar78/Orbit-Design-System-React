import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  OptionToggleChevronIcon,
  OptionToggleIcon,
  type OptionToggleIconState,
} from './OptionToggleIcons';
import './OptionToggle.css';

/** Figma State */
export type OptionToggleState = 'off' | 'on' | 'partial';

/** Figma Status */
export type OptionToggleStatus = 'default' | 'hover' | 'disabled';

export interface OptionToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Figma Text Option */
  label?: ReactNode;
  /** Figma State (Off / On / Partial) */
  state?: OptionToggleState;
  /** Convenience alias — maps to `state="on"` when true */
  checked?: boolean;
  /** Maps to `state="partial"` when true */
  partial?: boolean;
  /** Figma Status — for Storybook / forced preview */
  status?: OptionToggleStatus;
  /** Figma showRightIcon — trailing chevron */
  showRightIcon?: boolean;
  rightIcon?: ReactNode;
  /** Figma textComponent slot */
  textSlot?: ReactNode;
  iconSize?: OrbitIconSize;
  className?: string;
}

function resolveToggleState(
  state: OptionToggleState | undefined,
  checked?: boolean,
  partial?: boolean,
): OptionToggleIconState {
  if (partial || state === 'partial') return 'partial';
  if (checked || state === 'on') return 'on';
  return 'off';
}

export function OptionToggle({
  label = 'Option',
  state = 'off',
  checked,
  partial,
  status = 'default',
  showRightIcon = false,
  rightIcon,
  textSlot,
  iconSize = 'big',
  className,
  disabled: disabledProp,
  id,
  ...inputRest
}: OptionToggleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = disabledProp ?? status === 'disabled';
  const resolvedState = resolveToggleState(state, checked, partial);
  const isOn = resolvedState === 'on';
  const isPartial = resolvedState === 'partial';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isPartial;
    }
  }, [isPartial]);

  const classes = [
    'orbit-option-toggle',
    isOn ? 'orbit-option-toggle--on' : undefined,
    isPartial ? 'orbit-option-toggle--partial' : undefined,
    isDisabled ? 'orbit-option-toggle--disabled' : undefined,
    status === 'hover' && !isDisabled ? 'orbit-option-toggle--hover' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        type="checkbox"
        role="switch"
        id={id}
        className="orbit-option-toggle__input"
        checked={isOn}
        disabled={isDisabled}
        aria-checked={isPartial ? 'mixed' : isOn}
        {...inputRest}
      />
      <IconFrame size={iconSize} className="orbit-option-toggle__icon">
        <OptionToggleIcon state={resolvedState} />
      </IconFrame>
      <span className="orbit-option-toggle__text">
        {textSlot ?? <span className="orbit-option-toggle__label">{label}</span>}
      </span>
      {showRightIcon ? (
        <span className="orbit-option-toggle__right-icon" aria-hidden>
          {rightIcon ?? <OptionToggleChevronIcon />}
        </span>
      ) : null}
    </label>
  );
}
