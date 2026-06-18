import { useId, useState } from 'react';
import { Button, Modal, TitleTab } from 'orbit-ds-components';

import { AttachmentZone } from './AttachmentZone';
import { FormField } from './FormField';
import './SendCustomAnswerModal.css';

type AnswerTab = 'personalized' | 'afr-ai';

const TABS: { id: AnswerTab; label: string }[] = [
  { id: 'personalized', label: 'Personalized' },
  { id: 'afr-ai', label: 'AFR AI' },
];

export interface SendCustomAnswerModalProps {
  open: boolean;
  onClose: () => void;
}

export function SendCustomAnswerModal({ open, onClose }: SendCustomAnswerModalProps) {
  const titleFieldId = useId();
  const descriptionFieldId = useId();
  const [activeTab, setActiveTab] = useState<AnswerTab>('personalized');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Send custom answer"
      className="send-custom-answer-modal"
      header={
        <nav className="send-custom-answer-modal__tabs" aria-label="Answer type">
          {TABS.map((tab) => (
            <TitleTab
              key={tab.id}
              selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TitleTab>
          ))}
        </nav>
      }
      footer={
        <div className="send-custom-answer-modal__footer-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      }
    >
      <form
        className="send-custom-answer-modal__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleConfirm();
        }}
      >
        <FormField label="Title" required htmlFor={titleFieldId}>
          <input
            id={titleFieldId}
            type="text"
            className="orbit-form-field__input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </FormField>

        <FormField label="Description" required htmlFor={descriptionFieldId}>
          <textarea
            id={descriptionFieldId}
            className="orbit-form-field__textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </FormField>

        <AttachmentZone files={files} onFilesChange={setFiles} />
      </form>
    </Modal>
  );
}
