import type { InputHTMLAttributes } from 'react';

import './NumberField.css';

export interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  suffix?: string;
}

export function NumberField({ label, suffix, className, id, ...rest }: NumberFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className={['orbit-number-field', className].filter(Boolean).join(' ')} htmlFor={fieldId}>
      <span className="orbit-number-field__label">{label}</span>
      <div className="orbit-number-field__control">
        <input id={fieldId} type="number" className="orbit-number-field__input" {...rest} />
        {suffix ? <span className="orbit-number-field__suffix">{suffix}</span> : null}
      </div>
    </label>
  );
}
