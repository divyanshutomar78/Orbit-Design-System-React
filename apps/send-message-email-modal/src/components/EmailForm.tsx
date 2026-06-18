import { useId } from 'react';
import { InputSelect } from 'orbit-ds-components';

import {
  recipientOptions,
  templateBodies,
  templateOptions,
} from '../data/messageData';
import { AttachmentZone } from './AttachmentZone';
import { FormField } from './FormField';

export interface EmailFormProps {
  recipient: string;
  onRecipientChange: (value: string) => void;
  customEmail: string;
  onCustomEmailChange: (value: string) => void;
  template: string;
  onTemplateChange: (value: string) => void;
  subject: string;
  onSubjectChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function EmailForm({
  recipient,
  onRecipientChange,
  customEmail,
  onCustomEmailChange,
  template,
  onTemplateChange,
  subject,
  onSubjectChange,
  body,
  onBodyChange,
  files,
  onFilesChange,
}: EmailFormProps) {
  const customEmailFieldId = useId();
  const subjectFieldId = useId();
  const bodyFieldId = useId();

  const handleTemplateChange = (value: string) => {
    onTemplateChange(value);
    const preset = templateBodies[value];
    if (preset) {
      onSubjectChange(preset.subject);
      onBodyChange(preset.body);
    }
  };

  return (
    <div className="dialog-form-grid">
      <FormField label="Recipients" required>
        <InputSelect
          showLabel={false}
          showLabelInfo={false}
          options={recipientOptions}
          value={recipient}
          onValueChange={onRecipientChange}
        />
      </FormField>

      <FormField label="Template">
        <InputSelect
          showLabel={false}
          showLabelInfo={false}
          options={templateOptions}
          value={template}
          onValueChange={handleTemplateChange}
        />
      </FormField>

      {recipient === 'custom' ? (
        <FormField label="To" required htmlFor={customEmailFieldId} className="dialog-form-grid__full">
          <input
            id={customEmailFieldId}
            type="email"
            className="orbit-form-field__input"
            placeholder="name@school.edu"
            value={customEmail}
            onChange={(event) => onCustomEmailChange(event.target.value)}
            required
          />
        </FormField>
      ) : null}

      <FormField label="Subject" required htmlFor={subjectFieldId} className="dialog-form-grid__full">
        <input
          id={subjectFieldId}
          type="text"
          className="orbit-form-field__input"
          placeholder="Email subject"
          value={subject}
          onChange={(event) => onSubjectChange(event.target.value)}
          required
        />
      </FormField>

      <FormField label="Message" required htmlFor={bodyFieldId} className="dialog-form-grid__full">
        <textarea
          id={bodyFieldId}
          className="orbit-form-field__textarea"
          placeholder="Write your message…"
          value={body}
          onChange={(event) => onBodyChange(event.target.value)}
          required
        />
      </FormField>

      <div className="dialog-form-grid__full">
        <AttachmentZone files={files} onFilesChange={onFilesChange} />
      </div>
    </div>
  );
}
