import { initials } from '../data/usersData';
import './UserAvatar.css';

export interface UserAvatarProps {
  name: string;
}

export function UserAvatar({ name }: UserAvatarProps) {
  return (
    <span className="user-avatar" aria-hidden>
      {initials(name)}
    </span>
  );
}
