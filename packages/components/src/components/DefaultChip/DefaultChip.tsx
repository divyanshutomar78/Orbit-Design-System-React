import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { ChipSelectIcon, ChipSelectedIcon } from '../Chip/ChipIcons';
import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import './DefaultChip.css';

export type DefaultChipType = 'chip' | 'tag';
export type DefaultChipSize = 'default' | 'compact';

export interface DefaultChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma Type — Chip (pill) or Tag (squared). */
  type?: DefaultChipType;
  /** Figma Size — Default or Compact. */
  size?: DefaultChipSize;
  /** Figma State=Selected */
  selected?: boolean;
  iconSize?: OrbitIconSize;
  showIcon?: boolean;
  icon?: ReactNode;
  selectedIcon?: ReactNode;
  children?: ReactNode;
}

const typeClass: Record<DefaultChipType, string> = {
  chip: 'orbit-chip--chip',
  tag: 'orbit-chip--tag',
};

const sizeClass: Record<DefaultChipSize, string> = {
  default: 'orbit-chip--default',
  compact: 'orbit-chip--compact',
};

export function DefaultChip({
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
}: DefaultChipProps) {
  const classes = [
    'orbit-chip',
    'orbit-default-chip',
    typeClass[type],
    sizeClass[size],
    selected ? 'orbit-default-chip--selected' : undefined,
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
