import type { HTMLAttributes, ReactNode } from 'react';

import { LabelValueHorizontal } from '../LabelValueHorizontal/LabelValueHorizontal';
import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  ListingChevronRightIcon,
  ListingDragIcon,
  ListingInfoIcon,
} from './ListingItemIcons';
import './ListingItem.css';

export interface ListingItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma Multi-line — stacked title, label/value, optional helper. */
  multiLine?: boolean;
  /** Figma GF icon reorder — drag handle on the leading edge. */
  reorderIcon?: boolean;
  /** small: --icon-frame-size-small; big: --icon-frame-size-default (24 web, 44 iPad frame). */
  iconSize?: OrbitIconSize;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  /** Figma Show Title — inline title before label/value (single-line only). */
  showTitle?: boolean;
  showLabelValue?: boolean;
  /** Figma Show Helper — secondary line below label/value (multi-line only). */
  showHelper?: boolean;
  title?: ReactNode;
  label?: ReactNode;
  value?: ReactNode;
  helper?: ReactNode;
  /** Figma GF icon left */
  leftIcon?: ReactNode;
  /** Figma right icon (defaults to chevron). */
  rightIcon?: ReactNode;
  /** Figma Add Icons/Component slot between content and trailing icon. */
  addIconsComponent?: ReactNode;
  /** Figma Add more LV — custom label + value row. */
  labelValue?: ReactNode;
}

export function ListingItem({
  multiLine = false,
  reorderIcon = true,
  iconSize = 'big',
  showLeftIcon = true,
  showRightIcon = true,
  showTitle = false,
  showLabelValue = true,
  showHelper = false,
  title = 'Title',
  label = 'Label',
  value = 'Value',
  helper = 'Helper',
  leftIcon,
  rightIcon,
  addIconsComponent,
  labelValue,
  className,
  onClick,
  ...rest
}: ListingItemProps) {
  const interactive = typeof onClick === 'function';

  const classes = [
    'orbit-listing-item',
    multiLine ? 'orbit-listing-item--multi-line' : undefined,
    interactive ? 'orbit-listing-item--interactive' : undefined,
    iconSize === 'big' ? 'orbit-listing-item--icon-big' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showSingleLineTitle = !multiLine && showTitle;
  const showMultiLineTitle = multiLine;
  const showTitleBlock = showSingleLineTitle || showMultiLineTitle;

  const labelValueContent =
    labelValue ??
    (showLabelValue ? (
      <div className="orbit-listing-item__lv">
        <LabelValueHorizontal layout="L + V" label={label} value={value} />
      </div>
    ) : null);

  const rootProps = {
    className: classes,
    onClick,
    role: interactive ? ('button' as const) : undefined,
    tabIndex: interactive ? 0 : undefined,
    ...rest,
  };

  return (
    <div {...rootProps}>
      {reorderIcon ? (
        <div className="orbit-listing-item__reorder">
          <IconFrame size={iconSize}>
            <ListingDragIcon />
          </IconFrame>
        </div>
      ) : null}

      <div className="orbit-listing-item__main">
        {showLeftIcon ? (
          <div className="orbit-listing-item__left-icon">
            <IconFrame size={iconSize}>
              {leftIcon ?? <ListingInfoIcon />}
            </IconFrame>
          </div>
        ) : null}

        <div className="orbit-listing-item__cell">
          {showTitleBlock ? (
            <div className="orbit-listing-item__title">{title}</div>
          ) : null}
          {labelValueContent}
          {multiLine && showHelper ? (
            <p className="orbit-listing-item__helper">{helper}</p>
          ) : null}
        </div>
      </div>

      {multiLine ? (
        <div className="orbit-listing-item__actions-wrap">
          <div className="orbit-listing-item__actions">{addIconsComponent}</div>
        </div>
      ) : (
        <div className="orbit-listing-item__actions">{addIconsComponent}</div>
      )}

      {showRightIcon ? (
        <div className="orbit-listing-item__right">
          <IconFrame size={iconSize}>
            {rightIcon ?? <ListingChevronRightIcon />}
          </IconFrame>
        </div>
      ) : null}
    </div>
  );
}
