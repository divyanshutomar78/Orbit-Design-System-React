import {
  useCallback,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

import { TooltipInfoIcon } from './TooltipIcons';
import { TooltipPopup, type TooltipPopupProps } from './TooltipPopup';
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
  ...popupRest
}: TooltipProps) {
  const [openUncontrolled, setOpenUncontrolled] = useState(defaultOpen);
  const tooltipId = useId();
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : openUncontrolled;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setOpenUncontrolled(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const alignEnd = direction === 'left' && isOpen;
  const classes = [
    'orbit-tooltip',
    alignEnd ? 'orbit-tooltip--align-end' : 'orbit-tooltip--align-start',
    isOpen ? 'orbit-tooltip--open' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const { className: triggerClassName, ...restTriggerProps } =
    triggerProps ?? {};

  return (
    <span
      className={classes}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      {isOpen && (
        <div className="orbit-tooltip__container">
          <TooltipPopup
            id={tooltipId}
            text={text}
            showText={showText && popupContent == null}
            {...popupRest}
          >
            {popupContent}
          </TooltipPopup>
        </div>
      )}
      {trigger ?? (
        <button
          type="button"
          className={['orbit-tooltip__trigger', triggerClassName]
            .filter(Boolean)
            .join(' ')}
          aria-label={triggerLabel}
          aria-expanded={isOpen}
          aria-describedby={isOpen ? tooltipId : undefined}
          {...restTriggerProps}
        >
          <TooltipInfoIcon />
        </button>
      )}
    </span>
  );
}

export { TooltipPopup } from './TooltipPopup';
export type { TooltipPopupProps } from './TooltipPopup';
