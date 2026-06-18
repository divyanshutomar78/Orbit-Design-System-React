import type { ReactNode } from 'react';

import './FormField.css';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, required, htmlFor, hint, children, className }: FormFieldProps) {
  return (
    <div className={['orbit-form-field', className].filter(Boolean).join(' ')}>
      <label className="orbit-form-field__label" htmlFor={htmlFor}>
        {label}
        {required ? <span className="orbit-form-field__required" aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="orbit-form-field__hint">{hint}</p> : null}
    </div>
  );
}
