import './ProgressBar.css';

export type ProgressTone = 'success' | 'attention' | 'critical' | 'action';

export interface ProgressBarProps {
  value: number;
  tone?: ProgressTone;
}

function toneFor(value: number): ProgressTone {
  if (value >= 90) return 'success';
  if (value >= 80) return 'attention';
  return 'critical';
}

export function ProgressBar({ value, tone }: ProgressBarProps) {
  const resolved = tone ?? toneFor(value);
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className={`progress-bar__fill progress-bar__fill--${resolved}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
