import { ButtonCompact } from 'orbit-ds-components';

import './FlightProgress.css';

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M14 8l-4 4 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4.5 12.5 19 7l-2.5 5.5L19 18l-4.5-1.5L12 21l-1-3.5L4.5 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface FlightProgressProps {
  status: string;
  duration: string;
  legCount: number;
  activeLegIndex: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function FlightProgress({
  status,
  duration,
  legCount,
  activeLegIndex,
  onPrevious,
  onNext,
}: FlightProgressProps) {
  return (
    <div className="flight-progress">
      <div className="flight-progress__compass" aria-hidden>
        <span className="flight-progress__ring flight-progress__ring--outer" />
        <span className="flight-progress__ring flight-progress__ring--inner" />
        <span className="flight-progress__icon">
          <FlightIcon />
        </span>
      </div>

      <p className="flight-progress__status">{status}</p>

      <div className="flight-progress__duration-row">
        <ButtonCompact
          variant="tertiary"
          minWidth={false}
          iconSize="small"
          aria-label="Previous leg"
          disabled={activeLegIndex <= 0}
          onClick={onPrevious}
          leftIcon={<ChevronLeftIcon />}
        />
        <span className="flight-progress__duration">{duration}</span>
        <ButtonCompact
          variant="tertiary"
          minWidth={false}
          iconSize="small"
          aria-label="Next leg"
          disabled={activeLegIndex >= legCount - 1}
          onClick={onNext}
          leftIcon={<ChevronRightIcon />}
        />
      </div>

      <div className="flight-progress__dots" aria-hidden>
        {Array.from({ length: legCount }, (_, index) => (
          <span
            key={index}
            className={[
              'flight-progress__dot',
              index === activeLegIndex ? 'flight-progress__dot--active' : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
