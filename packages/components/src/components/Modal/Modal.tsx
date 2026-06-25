import { type HTMLAttributes, type ReactNode } from 'react';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../primitives/dialog';
import { ButtonCompact } from '../ButtonCompact/ButtonCompact';
import { ModalCloseIcon } from './ModalIcons';
import './Modal.css';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  /** Extra header content after `title` (e.g. tab navigation). Close control stays on the right. */
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Close when clicking the backdrop. Default true. */
  closeOnBackdrop?: boolean;
  /** Accessible label when title is omitted. */
  ariaLabel?: string;
}

export function Modal({
  open,
  onClose,
  title,
  header,
  children,
  footer,
  closeOnBackdrop = true,
  ariaLabel = 'Dialog',
  className,
  ...rest
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent
        className={className}
        aria-label={title ? undefined : ariaLabel}
        onPointerDownOutside={closeOnBackdrop ? undefined : (event) => event.preventDefault()}
        onInteractOutside={closeOnBackdrop ? undefined : (event) => event.preventDefault()}
        onEscapeKeyDown={closeOnBackdrop ? undefined : (event) => event.preventDefault()}
        {...rest}
      >
        <DialogHeader>
          {header ? (
            <div className="orbit-modal__header-slot">
              {title ? <DialogTitle>{title}</DialogTitle> : null}
              {header}
            </div>
          ) : title ? (
            <DialogTitle>{title}</DialogTitle>
          ) : (
            <span />
          )}
          <div className="orbit-modal__header-actions">
            <DialogClose asChild>
              <ButtonCompact
                variant="tertiary"
                minWidth={false}
                iconSize="big"
                aria-label="Close dialog"
                leftIcon={<ModalCloseIcon />}
              />
            </DialogClose>
          </div>
        </DialogHeader>
        {children != null ? <DialogBody>{children}</DialogBody> : null}
        {footer != null ? <DialogFooter>{footer}</DialogFooter> : null}
      </DialogContent>
    </Dialog>
  );
}
