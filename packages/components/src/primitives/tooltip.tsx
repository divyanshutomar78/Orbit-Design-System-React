import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react';

import { cn } from '../lib/utils';
import '../components/Tooltip/Tooltip.css';
import '../components/Tooltip/TooltipPopup.css';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('orbit-tooltip-popup', className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

function TooltipArrow({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>) {
  return <TooltipPrimitive.Arrow className={cn('orbit-tooltip__arrow', className)} {...props} />;
}

function TooltipContentText({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('orbit-tooltip-popup__text', className)} {...props} />;
}

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipContentText,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
};
