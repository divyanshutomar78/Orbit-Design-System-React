import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import './ButtonCompact.css';

export type ButtonCompactVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonCompactProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — maps to Figma Button Type (Primary / Secondary / Tertiary). */
  variant?: ButtonCompactVariant;
  /** Enforces compact minimum content width (66px on web). */
  minWidth?: boolean;
  iconSize?: OrbitIconSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantClass: Record<ButtonCompactVariant, string> = {
  primary: 'orbit-button-compact--primary',
  secondary: 'orbit-button-compact--secondary',
  tertiary: 'orbit-button-compact--tertiary',
};

export function ButtonCompact({
  variant = 'primary',
  minWidth = true,
  iconSize = 'big',
  leftIcon,
  rightIcon,
  children,
  className,
  type = 'button',
  disabled,
  ...rest
}: ButtonCompactProps) {
  const classes = [
    'orbit-button-compact',
    variantClass[variant],
    minWidth ? 'orbit-button-compact--min-width' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showLabel = children != null && children !== '';

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className="orbit-button-compact__content">
        {leftIcon ? (
          <IconFrame size={iconSize} className="orbit-button-compact__icon">
            {leftIcon}
          </IconFrame>
        ) : null}
        {showLabel ? (
          <span className="orbit-button-compact__label">{children}</span>
        ) : null}
        {rightIcon ? (
          <IconFrame size={iconSize} className="orbit-button-compact__icon">
            {rightIcon}
          </IconFrame>
        ) : null}
      </span>
    </button>
  );
}
