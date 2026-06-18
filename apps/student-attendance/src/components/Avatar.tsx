import type { AvatarTone } from '../data/attendanceData';
import { initials } from '../data/attendanceData';
import './Avatar.css';

export interface AvatarProps {
  name: string;
  tone?: AvatarTone;
}

export function Avatar({ name, tone = 'neutral' }: AvatarProps) {
  return (
    <span className={`avatar avatar--${tone}`} aria-hidden>
      {initials(name)}
    </span>
  );
}
