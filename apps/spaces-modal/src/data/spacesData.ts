export interface SpaceParticipant {
  id: string;
  name: string;
  handle: string;
  role?: 'host' | 'speaker' | 'listener';
  speaking?: boolean;
}

export interface PinnedPost {
  author: SpaceParticipant;
  text: string;
  postedAt: string;
}

export interface SpaceSession {
  title: string;
  status: 'live' | 'scheduled' | 'ended';
  pinnedPost: PinnedPost;
  speakers: SpaceParticipant[];
  listeners: SpaceParticipant[];
  listenerCount: number;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function getHost(space: SpaceSession): SpaceParticipant {
  return (
    space.speakers.find((speaker) => speaker.role === 'host') ??
    space.pinnedPost.author
  );
}

export function sortSpeakers(speakers: SpaceParticipant[]): SpaceParticipant[] {
  return [...speakers].sort((a, b) => {
    const score = (speaker: SpaceParticipant) =>
      (speaker.role === 'host' ? 0 : 1) + (speaker.speaking ? 0 : 2);
    return score(a) - score(b);
  });
}

export function formatListenerSummary(
  listeners: SpaceParticipant[],
  totalCount: number,
): string {
  const previewNames = listeners.slice(0, 3).map((listener) => listener.name.split(' ')[0]);
  const others = Math.max(0, totalCount - previewNames.length);

  if (previewNames.length === 0) {
    return `${totalCount.toLocaleString('en-US')} people listening`;
  }

  if (others <= 0) {
    return `${previewNames.join(', ')} ${previewNames.length === 1 ? 'is' : 'are'} listening`;
  }

  const namesText =
    previewNames.length === 1
      ? previewNames[0]
      : `${previewNames.slice(0, -1).join(', ')} and ${previewNames.at(-1)}`;

  return `${namesText} and ${others.toLocaleString('en-US')} others are listening`;
}

export const sampleSpace: SpaceSession = {
  title: 'Design systems weekly',
  status: 'live',
  pinnedPost: {
    author: {
      id: 'host-1',
      name: 'Maya Chen',
      handle: 'mayadesign',
      role: 'host',
    },
    text: 'Join us to discuss token naming, dark themes, and how to ship component libraries without slowing product teams down.',
    postedAt: 'Pinned · 2h ago',
  },
  speakers: [
    {
      id: 'speaker-1',
      name: 'Maya Chen',
      handle: 'mayadesign',
      role: 'host',
      speaking: true,
    },
    {
      id: 'speaker-2',
      name: 'Jordan Lee',
      handle: 'jordanbuilds',
      role: 'speaker',
      speaking: true,
    },
    {
      id: 'speaker-3',
      name: 'Sam Ortiz',
      handle: 'samortiz',
      role: 'speaker',
      speaking: false,
    },
  ],
  listeners: [
    { id: 'l-1', name: 'Alex Kim', handle: 'alexkim', role: 'listener' },
    { id: 'l-2', name: 'Priya Nair', handle: 'priyan', role: 'listener' },
    { id: 'l-3', name: 'Chris Lee', handle: 'chrislee', role: 'listener' },
    { id: 'l-4', name: 'Taylor Brooks', handle: 'taylorb', role: 'listener' },
    { id: 'l-5', name: 'Jamie Fox', handle: 'jamief', role: 'listener' },
  ],
  listenerCount: 1248,
};
