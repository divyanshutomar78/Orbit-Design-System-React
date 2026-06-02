import type { ReactNode } from 'react';

import './icon-size.css';
import { iconSizeClass, type OrbitIconSize } from './iconSize';

export interface IconFrameProps {
  size?: OrbitIconSize;
  className?: string;
  children?: ReactNode;
}

export function IconFrame({
  size = 'small',
  className,
  children,
}: IconFrameProps) {
  const classes = ['orbit-icon', iconSizeClass(size), className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} aria-hidden>
      {children}
    </span>
  );
}
