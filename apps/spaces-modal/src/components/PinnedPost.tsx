import { DefaultChip, SuccessChip } from 'orbit-ds-components';

import type { PinnedPost as PinnedPostData } from '../data/spacesData';
import { Avatar } from './Avatar';
import './PinnedPost.css';

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 4.5h7v2.8L8 11.5 4.5 7.3V4.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8 11.5V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export interface PinnedPostProps {
  post: PinnedPostData;
}

export function PinnedPost({ post }: PinnedPostProps) {
  return (
    <article className="pinned-post">
      <div className="pinned-post__header">
        <span className="pinned-post__badge">
          <PinIcon />
          Pinned
        </span>
        <span className="pinned-post__time">{post.postedAt}</span>
      </div>

      <div className="pinned-post__author">
        <Avatar name={post.author.name} size="compact" />
        <div className="pinned-post__meta">
          <span className="pinned-post__name">{post.author.name}</span>
          <span className="pinned-post__handle">@{post.author.handle}</span>
        </div>
      </div>

      <p className="pinned-post__text">{post.text}</p>
    </article>
  );
}

export function SpeakerRow({
  name,
  handle,
  role,
  speaking,
}: {
  name: string;
  handle: string;
  role?: 'host' | 'speaker';
  speaking?: boolean;
}) {
  return (
    <div className={`spaces-speaker-row${speaking ? ' spaces-speaker-row--active' : ''}`}>
      <Avatar name={name} size="compact" speaking={speaking} />
      <div className="spaces-speaker-row__meta">
        <span className="spaces-speaker-row__name">{name}</span>
        <span className="spaces-speaker-row__handle">@{handle}</span>
      </div>
      <div className="spaces-speaker-row__badges">
        {role === 'host' ? (
          <SuccessChip showIcon={false} size="compact">
            Host
          </SuccessChip>
        ) : null}
        {speaking ? (
          <DefaultChip showIcon={false} size="compact">
            Speaking
          </DefaultChip>
        ) : (
          <span className="spaces-speaker-row__muted">Muted</span>
        )}
      </div>
    </div>
  );
}
