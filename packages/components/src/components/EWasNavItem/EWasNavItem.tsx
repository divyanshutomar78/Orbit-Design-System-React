import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import { EWasNavItemRocketIcon } from './EWasNavItemIcons';
import './EWasNavItem.css';

/** Figma Orientation */
export type EWasNavItemOrientation = 'horizontal' | 'splitView' | 'vertical';

/** Figma State */
export type EWasNavItemState = 'default' | 'active' | 'disabled';

export interface EWasNavItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma Nav Item */
  navItem?: ReactNode;
  /** Figma Icon (instance swap). */
  icon?: ReactNode;
  orientation?: EWasNavItemOrientation;
  state?: EWasNavItemState;
  iconSize?: OrbitIconSize;
}

const orientationClass: Record<EWasNavItemOrientation, string> = {
  horizontal: 'orbit-ewas-nav-item--horizontal',
  splitView: 'orbit-ewas-nav-item--split-view',
  vertical: 'orbit-ewas-nav-item--vertical',
};

const stateClass: Record<EWasNavItemState, string | undefined> = {
  default: undefined,
  active: 'orbit-ewas-nav-item--active',
  disabled: 'orbit-ewas-nav-item--disabled',
};

export function EWasNavItem({
  navItem = 'Flights',
  icon,
  orientation = 'horizontal',
  state = 'default',
  iconSize = 'big',
  className,
  type = 'button',
  disabled,
  ...rest
}: EWasNavItemProps) {
  const isDisabled = disabled ?? state === 'disabled';
  const showLabel = orientation !== 'splitView';

  const classes = [
    'orbit-ewas-nav-item',
    orientationClass[orientation],
    stateClass[state],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-current={state === 'active' ? 'page' : undefined}
      aria-disabled={isDisabled || undefined}
      {...rest}
    >
      <span className="orbit-ewas-nav-item__content">
        <IconFrame size={iconSize} className="orbit-ewas-nav-item__icon">
          {icon ?? <EWasNavItemRocketIcon />}
        </IconFrame>
        {showLabel ? (
          <span className="orbit-ewas-nav-item__label">{navItem}</span>
        ) : null}
      </span>
    </button>
  );
}
