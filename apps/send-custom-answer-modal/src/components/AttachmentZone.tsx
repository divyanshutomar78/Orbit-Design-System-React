import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';

import './AttachmentZone.css';

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M16.5 6.5v9.75a4.25 4.25 0 0 1-8.5 0V7.25a2.75 2.75 0 0 1 5.5 0v8.5a1.5 1.5 0 0 1-3 0V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface AttachmentZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export function AttachmentZone({ files, onFilesChange }: AttachmentZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming?.length) {
      return;
    }
    onFilesChange([...files, ...Array.from(incoming)]);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    addFiles(event.dataTransfer.files);
  };

  const onBrowse = () => {
    inputRef.current?.click();
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files);
    event.target.value = '';
  };

  return (
    <section className="attachment-zone">
      <h3 className="attachment-zone__heading">Attachment ({files.length})</h3>

      <div
        className={['attachment-zone__drop', dragOver ? 'attachment-zone__drop--active' : undefined]
          .filter(Boolean)
          .join(' ')}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <p className="attachment-zone__hint">
          Drag files to attach or{' '}
          <button type="button" className="attachment-zone__browse" onClick={onBrowse}>
            browse
          </button>
          .
        </p>
        <span className="attachment-zone__icon">
          <PaperclipIcon />
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="attachment-zone__input"
          onChange={onInputChange}
          tabIndex={-1}
        />
      </div>
    </section>
  );
}
