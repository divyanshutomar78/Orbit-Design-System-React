import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — maps to Figma Button Type (Primary / Secondary / Tertiary). */
  variant?: ButtonVariant;
  /** Enforces the design-system minimum content width (84px). */
  minWidth?: boolean;
  /** small: 18px web / 24px iPad; big: 24px web, 44px frame on iPad (--icon-frame-size-default). */
  iconSize?: OrbitIconSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'orbit-button--primary',
  secondary: 'orbit-button--secondary',
  tertiary: 'orbit-button--tertiary',
};

export function Button({
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
}: ButtonProps) {
  const classes = [
    'orbit-button',
    variantClass[variant],
    minWidth ? 'orbit-button--min-width' : undefined,
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
      <span className="orbit-button__content">
        {leftIcon ? (
          <IconFrame size={iconSize} className="orbit-button__icon">
            {leftIcon}
          </IconFrame>
        ) : null}
        {showLabel ? <span className="orbit-button__label">{children}</span> : null}
        {rightIcon ? (
          <IconFrame size={iconSize} className="orbit-button__icon">
            {rightIcon}
          </IconFrame>
        ) : null}
      </span>
    </button>
  );
}
