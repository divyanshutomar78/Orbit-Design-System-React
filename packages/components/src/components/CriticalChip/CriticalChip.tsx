import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { ChipSelectIcon, ChipSelectedIcon } from '../Chip/ChipIcons';
import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import './CriticalChip.css';

export type CriticalChipType = 'chip' | 'tag';
export type CriticalChipSize = 'default' | 'compact';

export interface CriticalChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma Type — Chip (pill) or Tag (squared). */
  type?: CriticalChipType;
  /** Figma Size — Default or Compact. */
  size?: CriticalChipSize;
  /** Figma State=Selected */
  selected?: boolean;
  iconSize?: OrbitIconSize;
  showIcon?: boolean;
  icon?: ReactNode;
  selectedIcon?: ReactNode;
  children?: ReactNode;
}

const typeClass: Record<CriticalChipType, string> = {
  chip: 'orbit-chip--chip',
  tag: 'orbit-chip--tag',
};

const sizeClass: Record<CriticalChipSize, string> = {
  default: 'orbit-chip--default',
  compact: 'orbit-chip--compact',
};

export function CriticalChip({
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
}: CriticalChipProps) {
  const classes = [
    'orbit-chip',
    'orbit-critical-chip',
    typeClass[type],
    sizeClass[size],
    selected ? 'orbit-critical-chip--selected' : undefined,
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
