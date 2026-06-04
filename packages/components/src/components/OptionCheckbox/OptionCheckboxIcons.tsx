export type OptionCheckboxIconState = 'off' | 'on' | 'partial';

export function OptionCheckboxIcon({
  state = 'off',
}: {
  state?: OptionCheckboxIconState;
}) {
  if (state === 'on') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
        />
        <path
          d="M8 12.5l2.5 2.5L16 9.5"
          stroke="var(--background-surface-container-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (state === 'partial') {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="currentColor"
        />
        <path
          d="M8 12h8"
          stroke="var(--background-surface-container-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
