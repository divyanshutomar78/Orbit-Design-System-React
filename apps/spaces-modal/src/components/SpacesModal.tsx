import { useEffect, useMemo, useState } from 'react';
import { Button, LabelValueVertical, Modal, SuccessChip } from 'orbit-ds-components';

import {
  formatListenerSummary,
  getHost,
  sortSpeakers,
  type SpaceSession,
} from '../data/spacesData';
import { ParticipantStack } from './ParticipantStack';
import { PinnedPost, SpeakerRow } from './PinnedPost';
import './SpacesModal.css';

export interface SpacesModalProps {
  space: SpaceSession;
  open: boolean;
  onClose: () => void;
}

export function SpacesModal({ space, open, onClose }: SpacesModalProps) {
  const [requested, setRequested] = useState(false);
  const host = getHost(space);
  const speakers = useMemo(() => sortSpeakers(space.speakers), [space.speakers]);
  const speakingCount = speakers.filter((speaker) => speaker.speaking).length;
  const listenerOverflow = Math.max(0, space.listenerCount - space.listeners.length);
  const listenerSummary = formatListenerSummary(space.listeners, space.listenerCount);

  useEffect(() => {
    if (!open) {
      setRequested(false);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={space.title}
      className="spaces-modal"
      header={
        space.status === 'live' ? (
          <SuccessChip showIcon={false} size="compact" className="spaces-modal__live-chip">
            Live
          </SuccessChip>
        ) : null
      }
      footer={
        <div className="spaces-modal__footer">
          <Button
            type="button"
            variant="primary"
            disabled={requested}
            onClick={() => setRequested(true)}
          >
            {requested ? 'Request sent' : 'Request to speak'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Leave space
          </Button>
        </div>
      }
    >
      <p className="dialog-subtitle">
        Hosted by {host.name} · {space.listenerCount.toLocaleString('en-US')} listening now
      </p>

      <div className="spaces-modal__content">
        <PinnedPost post={space.pinnedPost} />

        <div className="spaces-modal__summary">
          <LabelValueVertical
            layout="V + L"
            big
            value={String(speakers.length)}
            label="Speakers"
          />
          <LabelValueVertical
            layout="V + L"
            big
            value={space.listenerCount.toLocaleString('en-US')}
            label="Listeners"
          />
          <LabelValueVertical
            layout="V + L"
            big
            value={String(speakingCount)}
            label="Speaking now"
          />
        </div>

        <section className="spaces-modal__panel" aria-labelledby="spaces-speakers-heading">
          <header className="spaces-modal__panel-header">
            <h2 id="spaces-speakers-heading" className="spaces-modal__panel-title">
              Speakers
            </h2>
            <span className="spaces-modal__panel-meta">
              {speakingCount} of {speakers.length} live
            </span>
          </header>

          <div className="spaces-modal__speaker-list">
            {speakers.map((speaker) => (
              <SpeakerRow
                key={speaker.id}
                name={speaker.name}
                handle={speaker.handle}
                role={speaker.role === 'host' ? 'host' : 'speaker'}
                speaking={speaker.speaking}
              />
            ))}
          </div>
        </section>

        <section className="spaces-modal__panel" aria-labelledby="spaces-listeners-heading">
          <header className="spaces-modal__panel-header">
            <h2 id="spaces-listeners-heading" className="spaces-modal__panel-title">
              Listeners
            </h2>
            <span className="spaces-modal__panel-meta">
              {space.listenerCount.toLocaleString('en-US')} total
            </span>
          </header>

          <div className="spaces-modal__listeners">
            <ParticipantStack
              participants={space.listeners}
              maxVisible={6}
              overflowCount={listenerOverflow}
            />
            <p className="spaces-modal__listeners-copy">{listenerSummary}</p>
          </div>
        </section>
      </div>
    </Modal>
  );
}
