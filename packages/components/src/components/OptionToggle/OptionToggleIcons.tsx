export type OptionToggleIconState = 'off' | 'on' | 'partial';

export function OptionToggleIcon({
  state = 'off',
}: {
  state?: OptionToggleIconState;
}) {
  const thumbX = state === 'on' ? 16 : state === 'partial' ? 12 : 8;
  const trackOpacity =
    state === 'off' ? 0.35 : state === 'partial' ? 0.65 : 1;

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect
        x="4"
        y="8"
        width="16"
        height="8"
        rx="4"
        fill="currentColor"
        opacity={trackOpacity}
      />
      <circle
        cx={thumbX}
        cy="12"
        r="3"
        fill="var(--background-surface-container-2)"
      />
    </svg>
  );
}

export function OptionToggleChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8 10l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
