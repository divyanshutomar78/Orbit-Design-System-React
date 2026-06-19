import type { SpaceParticipant } from '../data/spacesData';
import { Avatar } from './Avatar';
import './ParticipantStack.css';

export interface ParticipantStackProps {
  participants: SpaceParticipant[];
  maxVisible?: number;
  overflowCount?: number;
}

export function ParticipantStack({
  participants,
  maxVisible = 5,
  overflowCount,
}: ParticipantStackProps) {
  const visible = participants.slice(0, maxVisible);
  const overflow =
    overflowCount ?? Math.max(0, participants.length - visible.length);

  return (
    <div className="participant-stack" aria-hidden>
      {visible.map((participant, index) => (
        <span
          key={participant.id}
          className="participant-stack__item"
          style={{ zIndex: visible.length - index }}
        >
          <Avatar name={participant.name} size="compact" />
        </span>
      ))}
      {overflow > 0 ? (
        <span className="participant-stack__overflow">+{overflow.toLocaleString('en-US')}</span>
      ) : null}
    </div>
  );
}
