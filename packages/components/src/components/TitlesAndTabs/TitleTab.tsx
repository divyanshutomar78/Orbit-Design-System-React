import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './TitlesAndTabs.css';

export interface TitleTabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma Tab State=Selected */
  selected?: boolean;
  children?: ReactNode;
}

export function TitleTab({
  selected = false,
  children = 'Tab',
  className,
  disabled,
  ...rest
}: TitleTabProps) {
  const classes = [
    'orbit-title-tab',
    selected ? 'orbit-title-tab--selected' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-selected={selected}
      {...rest}
    >
      <span className="orbit-title-tab__label">{children}</span>
    </button>
  );
}
