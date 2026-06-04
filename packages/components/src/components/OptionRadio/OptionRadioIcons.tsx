export function OptionRadioIcon({ selected = false }: { selected?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      {selected ? <circle cx="12" cy="12" r="4.5" fill="currentColor" /> : null}
    </svg>
  );
}
