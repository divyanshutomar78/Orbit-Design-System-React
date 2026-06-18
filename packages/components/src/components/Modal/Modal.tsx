import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { ButtonCompact } from '../ButtonCompact/ButtonCompact';
import { ModalCloseIcon } from './ModalIcons';
import './Modal.css';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
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
  children,
  footer,
  closeOnBackdrop = true,
  ariaLabel = 'Dialog',
  className,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      onClose();
    }
  };

  const classes = ['orbit-modal', className].filter(Boolean).join(' ');

  return createPortal(
    <div className="orbit-modal__backdrop" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        className={classes}
        {...rest}
      >
        <header className="orbit-modal__header">
          {title ? (
            <h2 id={titleId} className="orbit-modal__title">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Close dialog"
            onClick={onClose}
            leftIcon={<ModalCloseIcon />}
          />
        </header>
        {children != null ? <div className="orbit-modal__body">{children}</div> : null}
        {footer != null ? <footer className="orbit-modal__footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  );
}
