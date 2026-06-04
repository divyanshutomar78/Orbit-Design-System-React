import type { HTMLAttributes, ReactNode } from 'react';

import './TooltipPopup.css';

export interface TooltipPopupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma default text (Toolem ipsum). */
  text?: ReactNode;
  /** Figma Show Default Text */
  showText?: boolean;
  /** Figma Add more components — custom body below or instead of text. */
  children?: ReactNode;
}

export function TooltipPopup({
  text = 'Toolem ipsum',
  showText = true,
  children,
  className,
  ...rest
}: TooltipPopupProps) {
  const classes = ['orbit-tooltip-popup', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tooltip" {...rest}>
      {showText && text != null && text !== '' && (
        <p className="orbit-tooltip-popup__text">{text}</p>
      )}
      {children != null && (
        <div className="orbit-tooltip-popup__slot">{children}</div>
      )}
    </div>
  );
}
