import { initials } from '../data/spacesData';
import './Avatar.css';

export interface AvatarProps {
  name: string;
  size?: 'default' | 'compact';
  speaking?: boolean;
}

export function Avatar({ name, size = 'default', speaking = false }: AvatarProps) {
  return (
    <span
      className={[
        'spaces-avatar',
        `spaces-avatar--${size}`,
        speaking ? 'spaces-avatar--speaking' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
