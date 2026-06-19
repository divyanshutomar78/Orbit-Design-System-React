import type { TextareaHTMLAttributes } from 'react';

import './FormTextarea.css';

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
}

export function FormTextarea({ className, minRows = 4, ...rest }: FormTextareaProps) {
  return (
    <textarea
      className={['form-textarea', className].filter(Boolean).join(' ')}
      rows={minRows}
      {...rest}
    />
  );
}
