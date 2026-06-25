import { useMemo, type HTMLAttributes, type ReactNode } from 'react';

import { Tabs, TabsList, TabsTrigger } from '../../primitives/tabs';
import { cn } from '../../lib/utils';
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
  /** Controlled active tab id (pairs with `tabItems`). */
  activeTabId?: string;
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
  activeTabId,
  showExtraSlot = true,
  extraSlot,
  showRightIcons = true,
  rightIcons,
  leftIcon,
  iconSize = 'big',
  className,
  ...rest
}: TitlesAndTabsProps) {
  const classes = cn('orbit-titles-and-tabs', className);

  const selectedTabId = useMemo(() => {
    if (activeTabId) return activeTabId;
    return tabItems?.find((item) => item.selected)?.id ?? tabItems?.[0]?.id;
  }, [activeTabId, tabItems]);

  const tabsContent =
    tabs ??
    (tabItems && selectedTabId ? (
      <Tabs
        value={selectedTabId}
        onValueChange={(value) => onTabSelect?.(value)}
      >
        <TabsList>
          {tabItems.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              disabled={item.disabled}
              className={item.selected ? 'orbit-title-tab--selected' : undefined}
            >
              <span className="orbit-title-tab__label">{item.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    ) : (
      tabItems?.map((item) => (
        <TitleTab
          key={item.id}
          selected={item.selected}
          disabled={item.disabled}
          onClick={() => onTabSelect?.(item.id)}
        >
          {item.label}
        </TitleTab>
      )) ?? (showTabs ? <TitleTab>Tab</TitleTab> : null)
    ));

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
