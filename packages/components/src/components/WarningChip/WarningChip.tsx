import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { ChipSelectIcon, ChipSelectedIcon } from '../Chip/ChipIcons';
import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import './WarningChip.css';

export type WarningChipType = 'chip' | 'tag';
export type WarningChipSize = 'default' | 'compact';

export interface WarningChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma Type — Chip (pill) or Tag (squared). */
  type?: WarningChipType;
  /** Figma Size — Default or Compact. */
  size?: WarningChipSize;
  /** Figma State=Selected */
  selected?: boolean;
  iconSize?: OrbitIconSize;
  showIcon?: boolean;
  icon?: ReactNode;
  selectedIcon?: ReactNode;
  children?: ReactNode;
}

const typeClass: Record<WarningChipType, string> = {
  chip: 'orbit-chip--chip',
  tag: 'orbit-chip--tag',
};

const sizeClass: Record<WarningChipSize, string> = {
  default: 'orbit-chip--default',
  compact: 'orbit-chip--compact',
};

export function WarningChip({
  type = 'chip',
  size = 'default',
  selected = false,
  iconSize = 'small',
  showIcon = true,
  icon,
  selectedIcon,
  children = 'Text',
  className,
  disabled,
  ...rest
}: WarningChipProps) {
  const classes = [
    'orbit-chip',
    'orbit-warning-chip',
    typeClass[type],
    sizeClass[size],
    selected ? 'orbit-warning-chip--selected' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showLabel = children != null && children !== '';

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className="orbit-chip__content">
        {showIcon ? (
          <IconFrame size={iconSize} className="orbit-chip__icon">
            {selected
              ? (selectedIcon ?? <ChipSelectedIcon />)
              : (icon ?? <ChipSelectIcon />)}
          </IconFrame>
        ) : null}
        {showLabel ? <span className="orbit-chip__label">{children}</span> : null}
      </span>
    </button>
  );
}
