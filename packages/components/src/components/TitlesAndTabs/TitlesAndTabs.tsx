import type { HTMLAttributes, ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import { TitleTab } from './TitleTab';
import {
  TitlesAndTabsBackIcon,
  TitlesAndTabsMenuIcon,
} from './TitlesAndTabsIcons';
import './TitlesAndTabs.css';

export interface TitlesAndTabsTabItem {
  id: string;
  label: ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface TitlesAndTabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma Title — uppercase spaced title (Title 4). */
  title?: ReactNode;
  /** Figma Show Title Icon — header block with back icon + title. */
  showTitleIcon?: boolean;
  /** Figma Show Left Icon */
  showLeftIcon?: boolean;
  leftIcon?: ReactNode;
  iconSize?: OrbitIconSize;
  /** Figma Show Tabs */
  showTabs?: boolean;
  /** Figma Add more tabs — custom tab row. */
  tabs?: ReactNode;
  /** Convenience tabs rendered as TitleTab buttons. */
  tabItems?: TitlesAndTabsTabItem[];
  onTabSelect?: (tabId: string) => void;
  /** Figma Add Extra Components */
  showExtraSlot?: boolean;
  /** Figma Slot */
  extraSlot?: ReactNode;
  /** Figma Show Right Icons */
  showRightIcons?: boolean;
  /** Figma Add more icons */
  rightIcons?: ReactNode;
}

export function TitlesAndTabs({
  title = 'Title',
  showTitleIcon = true,
  showLeftIcon = true,
  showTabs = true,
  tabs,
  tabItems,
  onTabSelect,
  showExtraSlot = true,
  extraSlot,
  showRightIcons = true,
  rightIcons,
  leftIcon,
  iconSize = 'big',
  className,
  ...rest
}: TitlesAndTabsProps) {
  const classes = ['orbit-titles-and-tabs', className].filter(Boolean).join(' ');

  const tabsContent =
    tabs ??
    (tabItems?.map((item) => (
      <TitleTab
        key={item.id}
        selected={item.selected}
        disabled={item.disabled}
        onClick={() => onTabSelect?.(item.id)}
      >
        {item.label}
      </TitleTab>
    )) ??
    (showTabs ? <TitleTab>Tab</TitleTab> : null));

  return (
    <header className={classes} {...rest}>
      <div className="orbit-titles-and-tabs__start">
        {showTitleIcon ? (
          <div className="orbit-titles-and-tabs__header">
            {showLeftIcon ? (
              <IconFrame size={iconSize}>
                {leftIcon ?? <TitlesAndTabsBackIcon />}
              </IconFrame>
            ) : null}
            <span className="orbit-titles-and-tabs__title">{title}</span>
          </div>
        ) : null}
        {showTabs && tabsContent ? (
          <div className="orbit-titles-and-tabs__tabs">{tabsContent}</div>
        ) : null}
      </div>

      <div className="orbit-titles-and-tabs__spacer" aria-hidden />

      <div className="orbit-titles-and-tabs__end">
        {showExtraSlot ? (
          <div className="orbit-titles-and-tabs__slot">{extraSlot}</div>
        ) : null}
        {showRightIcons ? (
          <div className="orbit-titles-and-tabs__actions">
            <IconFrame size={iconSize}>
              {rightIcons ?? <TitlesAndTabsMenuIcon />}
            </IconFrame>
          </div>
        ) : null}
      </div>
    </header>
  );
}
