import { useState } from 'react';
import { Button, Modal, TitleTab } from 'orbit-ds-components';

import { messageTabs, type MessageChannel } from '../data/messageData';
import { EmailForm } from './EmailForm';
import { SmsForm } from './SmsForm';
import './SendMessageEmailModal.css';

export interface SendMessageEmailModalProps {
  open: boolean;
  onClose: () => void;
}

export function SendMessageEmailModal({ open, onClose }: SendMessageEmailModalProps) {
  const [activeTab, setActiveTab] = useState<MessageChannel>('email');
  const [recipient, setRecipient] = useState('all-parents');
  const [customEmail, setCustomEmail] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [template, setTemplate] = useState('blank');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    onClose();
  };

  const sendLabel = activeTab === 'email' ? 'Send email' : 'Send SMS';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Send message"
      className="send-message-email-modal"
      header={
        <nav className="send-message-email-modal__tabs" aria-label="Message channel">
          {messageTabs.map((tab) => (
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
        <div className="send-message-email-modal__footer-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSend}>
            {sendLabel}
          </Button>
        </div>
      }
    >
      <p className="send-message-email-modal__intro">
        Compose and send a message to selected recipients. Email supports attachments and
        templates; SMS is limited to 160 characters.
      </p>

      <form
        className="send-message-email-modal__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSend();
        }}
      >
        {activeTab === 'email' ? (
          <EmailForm
            recipient={recipient}
            onRecipientChange={setRecipient}
            customEmail={customEmail}
            onCustomEmailChange={setCustomEmail}
            template={template}
            onTemplateChange={setTemplate}
            subject={subject}
            onSubjectChange={setSubject}
            body={body}
            onBodyChange={setBody}
            files={files}
            onFilesChange={setFiles}
          />
        ) : (
          <SmsForm
            recipient={recipient}
            onRecipientChange={setRecipient}
            customPhone={customPhone}
            onCustomPhoneChange={setCustomPhone}
            body={body}
            onBodyChange={setBody}
          />
        )}
      </form>
    </Modal>
  );
}
