import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '../../lib/utils';
import { Switch } from '../../primitives/switch';
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
  extends Omit<ComponentPropsWithoutRef<typeof Switch>, 'type' | 'children' | 'checked'> {
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
  onCheckedChange,
  ...switchRest
}: OptionToggleProps) {
  const isDisabled = disabledProp ?? status === 'disabled';
  const resolvedState = resolveToggleState(state, checked, partial);
  const isOn = resolvedState === 'on';
  const isPartial = resolvedState === 'partial';

  const classes = cn(
    'orbit-option-toggle',
    isOn && 'orbit-option-toggle--on',
    isPartial && 'orbit-option-toggle--partial',
    isDisabled && 'orbit-option-toggle--disabled',
    status === 'hover' && !isDisabled && 'orbit-option-toggle--hover',
    className,
  );

  return (
    <label className={classes} htmlFor={id}>
      <Switch
        id={id}
        disabled={isDisabled}
        checked={isOn}
        onCheckedChange={onCheckedChange}
        aria-checked={isPartial ? 'mixed' : isOn}
        {...switchRest}
      >
        <IconFrame size={iconSize} className="orbit-option-toggle__icon">
          <OptionToggleIcon state={resolvedState} />
        </IconFrame>
      </Switch>
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
