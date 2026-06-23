import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import './TextField.css';

interface TextFieldBaseProps {
  label: string;
  hint?: string;
}

export interface TextFieldProps
  extends TextFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export interface TextAreaFieldProps
  extends TextFieldBaseProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextField({ label, hint, className, id, ...rest }: TextFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className={['orbit-text-field', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className="orbit-text-field__label">{label}</span>
      <div className="orbit-text-field__control">
        <input id={fieldId} type="text" className="orbit-text-field__input" {...rest} />
      </div>
      {hint ? <span className="orbit-text-field__hint">{hint}</span> : null}
    </label>
  );
}

export function TextAreaField({ label, hint, className, id, ...rest }: TextAreaFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className={['orbit-text-field', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className="orbit-text-field__label">{label}</span>
      <div className="orbit-text-field__control orbit-text-field__control--textarea">
        <textarea id={fieldId} className="orbit-text-field__textarea" {...rest} />
      </div>
      {hint ? <span className="orbit-text-field__hint">{hint}</span> : null}
    </label>
  );
}
