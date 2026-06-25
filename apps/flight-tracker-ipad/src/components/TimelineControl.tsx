import { useState } from 'react';
import { ButtonCompact } from 'orbit-ds-components';

import { AircraftIcon, PlayIcon, UploadIcon } from './MapIcons';
import './TimelineControl.css';

const TIME_MARKS = Array.from({ length: 13 }, (_, index) => index);

export function TimelineControl() {
  const [position, setPosition] = useState(42);

  return (
    <footer className="timeline-control" aria-label="UTC timeline">
      <ButtonCompact
        variant="tertiary"
        minWidth={false}
        iconSize="big"
        aria-label="Play timeline"
        leftIcon={<PlayIcon />}
        className="timeline-control__play"
      />

      <div className="timeline-control__track-wrap">
        <div className="timeline-control__track">
          <div className="timeline-control__fill" style={{ width: `${position}%` }} />
          <span
            className="timeline-control__thumb"
            style={{ left: `${position}%` }}
            aria-hidden
          >
            <AircraftIcon />
          </span>
          <input
            type="range"
            className="timeline-control__slider"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label="Timeline position"
          />
        </div>
        <div className="timeline-control__labels">
          {TIME_MARKS.map((hour) => (
            <span key={hour} className="timeline-control__label">
              {String(hour).padStart(2, '0')}:00 Z
            </span>
          ))}
        </div>
      </div>

      <ButtonCompact
        variant="tertiary"
        minWidth={false}
        iconSize="big"
        aria-label="Export timeline"
        leftIcon={<UploadIcon />}
        className="timeline-control__export"
      />
    </footer>
  );
}
