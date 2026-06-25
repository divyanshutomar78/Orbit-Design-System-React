import {
  useCallback,
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipContentText,
  TooltipProvider,
  TooltipTrigger,
} from '../../primitives/tooltip';
import { cn } from '../../lib/utils';
import { TooltipInfoIcon } from './TooltipIcons';
import type { TooltipPopupProps } from './TooltipPopup';
import './Tooltip.css';

/** Figma Direction */
export type TooltipDirection = 'left' | 'right';

export interface TooltipProps
  extends Omit<TooltipPopupProps, 'children' | 'text' | 'showText' | 'content'> {
  /** Figma Direction */
  direction?: TooltipDirection;
  /** Figma State — open popup (for Storybook / controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Popup copy when `popupContent` is not used. */
  text?: ReactNode;
  /** Figma Show Default Text */
  showText?: boolean;
  /** Figma Add more components */
  popupContent?: ReactNode;
  /** Custom trigger; defaults to 18×18 info icon. */
  trigger?: ReactNode;
  /** Accessible name for the default info trigger. */
  triggerLabel?: string;
  triggerProps?: Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'children' | 'onClick'
  >;
  className?: string;
}

export function Tooltip({
  direction = 'right',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  text = 'Toolem ipsum',
  showText = true,
  popupContent,
  trigger,
  triggerLabel = 'More information',
  triggerProps,
  className,
}: TooltipProps) {
  const tooltipId = useId();
  const isControlled = openProp !== undefined;

  const setOpen = useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const alignEnd = direction === 'left';
  const classes = cn(
    'orbit-tooltip',
    alignEnd ? 'orbit-tooltip--align-end' : 'orbit-tooltip--align-start',
    className,
  );

  const { className: triggerClassName, ...restTriggerProps } = triggerProps ?? {};

  return (
    <TooltipProvider delayDuration={200}>
      <TooltipRoot
        open={isControlled ? openProp : undefined}
        defaultOpen={!isControlled ? defaultOpen : undefined}
        onOpenChange={setOpen}
      >
        <span className={classes}>
        <TooltipTrigger asChild>
          {trigger ?? (
            <button
              type="button"
              className={cn('orbit-tooltip__trigger', triggerClassName)}
              aria-label={triggerLabel}
              {...restTriggerProps}
            >
              <TooltipInfoIcon />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent id={tooltipId} side={direction === 'left' ? 'left' : 'right'}>
          {popupContent ?? (
            showText ? <TooltipContentText>{text}</TooltipContentText> : null
          )}
          {popupContent ? (
            <div className="orbit-tooltip-popup__slot">{popupContent}</div>
          ) : null}
        </TooltipContent>
        </span>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export { TooltipPopup } from './TooltipPopup';
export type { TooltipPopupProps } from './TooltipPopup';
