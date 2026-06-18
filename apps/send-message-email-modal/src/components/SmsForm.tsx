import { useId } from 'react';
import { InputSelect } from 'orbit-ds-components';

import { recipientOptions } from '../data/messageData';
import { FormField } from './FormField';

const SMS_LIMIT = 160;

export interface SmsFormProps {
  recipient: string;
  onRecipientChange: (value: string) => void;
  customPhone: string;
  onCustomPhoneChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
}

export function SmsForm({
  recipient,
  onRecipientChange,
  customPhone,
  onCustomPhoneChange,
  body,
  onBodyChange,
}: SmsFormProps) {
  const phoneFieldId = useId();
  const bodyFieldId = useId();
  const remaining = SMS_LIMIT - body.length;

  return (
    <div className="dialog-form-grid">
      <FormField label="Recipients" required className={recipient === 'custom' ? undefined : 'dialog-form-grid__full'}>
        <InputSelect
          showLabel={false}
          showLabelInfo={false}
          options={recipientOptions}
          value={recipient}
          onValueChange={onRecipientChange}
        />
      </FormField>

      {recipient === 'custom' ? (
        <FormField label="Phone number" required htmlFor={phoneFieldId}>
          <input
            id={phoneFieldId}
            type="tel"
            className="orbit-form-field__input"
            placeholder="+1 555 0100"
            value={customPhone}
            onChange={(event) => onCustomPhoneChange(event.target.value)}
            required
          />
        </FormField>
      ) : null}

      <FormField
        label="Message"
        required
        htmlFor={bodyFieldId}
        hint={`${remaining} characters remaining`}
        className="dialog-form-grid__full"
      >
        <textarea
          id={bodyFieldId}
          className="orbit-form-field__textarea orbit-form-field__textarea--compact"
          placeholder="Write a short SMS message…"
          value={body}
          maxLength={SMS_LIMIT}
          onChange={(event) => onBodyChange(event.target.value)}
          required
        />
      </FormField>
    </div>
  );
}
