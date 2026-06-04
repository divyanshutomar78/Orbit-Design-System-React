import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import { EWasNavItemWTextInfoIcon } from './EWasNavItemWTextIcons';
import './EWasNavItemWText.css';

/** Figma Orientation (Default → horizontal). */
export type EWasNavItemWTextOrientation = 'horizontal' | 'splitView' | 'vertical';

/** Figma State */
export type EWasNavItemWTextState = 'default' | 'selected';

/** Figma Characters — text length presets for Storybook / Figma parity. */
export type EWasNavItemWTextCharacters = 'default' | '6' | '7' | '8';

const CHARACTER_PRESETS: Record<
  Exclude<EWasNavItemWTextCharacters, 'default'>,
  { primary: string; secondary: string }
> = {
  '6': { primary: 'AA1234', secondary: 'EGLL-ZSPD' },
  '7': { primary: 'AA1234X', secondary: 'EGLL-ZSPD' },
  '8': { primary: 'AAL1234X', secondary: 'EGLL-ZSPD' },
};

export interface EWasNavItemWTextProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma Characters — uses preset flight/route copy when primary/secondary omitted. */
  characters?: EWasNavItemWTextCharacters;
  /** Top line (flight id). Overrides Characters preset. */
  primaryText?: ReactNode;
  /** Bottom line (route). Overrides Characters preset. */
  secondaryText?: ReactNode;
  orientation?: EWasNavItemWTextOrientation;
  state?: EWasNavItemWTextState;
  /** Figma Icon slot (Split View). */
  icon?: ReactNode;
  iconSize?: OrbitIconSize;
}

const orientationClass: Record<EWasNavItemWTextOrientation, string> = {
  horizontal: 'orbit-ewas-nav-item-w-text--horizontal',
  splitView: 'orbit-ewas-nav-item-w-text--split-view',
  vertical: 'orbit-ewas-nav-item-w-text--vertical',
};

const stateClass: Record<EWasNavItemWTextState, string | undefined> = {
  default: undefined,
  selected: 'orbit-ewas-nav-item-w-text--selected',
};

export function EWasNavItemWText({
  characters = '6',
  primaryText,
  secondaryText,
  orientation = 'horizontal',
  state = 'default',
  icon,
  iconSize = 'big',
  className,
  type = 'button',
  disabled,
  ...rest
}: EWasNavItemWTextProps) {
  const isSplitView = orientation === 'splitView';
  const showIconOnly = isSplitView || characters === 'default';

  const preset =
    characters === 'default' ? undefined : CHARACTER_PRESETS[characters];

  const primary = primaryText ?? preset?.primary;
  const secondary = secondaryText ?? preset?.secondary;

  const classes = [
    'orbit-ewas-nav-item-w-text',
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
      disabled={disabled}
      aria-current={state === 'selected' ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      <span className="orbit-ewas-nav-item-w-text__content">
        {showIconOnly ? (
          <IconFrame size={iconSize} className="orbit-ewas-nav-item-w-text__icon">
            {icon ?? <EWasNavItemWTextInfoIcon />}
          </IconFrame>
        ) : (
          <>
            {primary != null && primary !== '' ? (
              <span className="orbit-ewas-nav-item-w-text__primary">
                {primary}
              </span>
            ) : null}
            {secondary != null && secondary !== '' ? (
              <span className="orbit-ewas-nav-item-w-text__secondary">
                {secondary}
              </span>
            ) : null}
          </>
        )}
      </span>
    </button>
  );
}
