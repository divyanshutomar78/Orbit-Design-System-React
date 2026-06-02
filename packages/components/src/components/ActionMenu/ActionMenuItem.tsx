import type { ReactNode } from 'react';

import { IconFrame } from '../Icon/IconFrame';
import type { OrbitIconSize } from '../Icon/iconSize';
import {
  ActionMenuCheckIcon,
  ActionMenuCheckboxIcon,
  ActionMenuChevronDownIcon,
  ActionMenuCloseIcon,
  ActionMenuRadioIcon,
  ActionMenuToggleIcon,
} from './ActionMenuIcons';
import './ActionMenu.css';

/** Figma _Action Menu Left icons → Type */
export type ActionMenuLeftIconType = 'checkmark' | 'checkbox' | 'radio' | 'toggle';

export interface ActionMenuItemProps {
  /** Figma - Text */
  label?: ReactNode;
  /** Figma State — Selected shows primary label + selected left icon. */
  selected?: boolean;
  /** Figma Show Left Icon */
  showLeftIcon?: boolean;
  /** Figma left icon Type (nested Action Menu Left icons). */
  leftIconType?: ActionMenuLeftIconType;
  /** Custom left icon (overrides `leftIconType`). */
  leftIcon?: ReactNode;
  /** Figma Right icon 1 — chevron. */
  showRightIcon1?: boolean;
  /** Figma Right icon 2 — close. */
  showRightIcon2?: boolean;
  /** Figma - Right icon 1 (instance swap). */
  rightIcon1?: ReactNode;
  /** Figma - Right icon 2 (instance swap). */
  rightIcon2?: ReactNode;
  iconSize?: OrbitIconSize;
  disabled?: boolean;
  onSelect?: () => void;
  onRightIcon1Click?: () => void;
  onRightIcon2Click?: () => void;
  rightIcon1Label?: string;
  rightIcon2Label?: string;
  className?: string;
  /** Use `div` in the Add more item slot; default `li` inside the menu list. */
  as?: 'li' | 'div';
}

function ActionMenuLeftIcon({
  type,
  selected,
  iconSize,
}: {
  type: ActionMenuLeftIconType;
  selected: boolean;
  iconSize: OrbitIconSize;
}) {
  if (type === 'checkmark' && !selected) {
    return null;
  }

  let glyph: ReactNode;
  switch (type) {
    case 'checkbox':
      glyph = <ActionMenuCheckboxIcon selected={selected} />;
      break;
    case 'radio':
      glyph = <ActionMenuRadioIcon selected={selected} />;
      break;
    case 'toggle':
      glyph = <ActionMenuToggleIcon selected={selected} />;
      break;
    case 'checkmark':
    default:
      glyph = <ActionMenuCheckIcon />;
      break;
  }

  return (
    <IconFrame size={iconSize} className="orbit-action-menu-item__left-icon">
      {glyph}
    </IconFrame>
  );
}

export function ActionMenuItem({
  label = 'Item',
  selected = false,
  showLeftIcon = true,
  leftIconType = 'checkmark',
  leftIcon,
  showRightIcon1 = true,
  showRightIcon2 = true,
  rightIcon1,
  rightIcon2,
  iconSize = 'big',
  disabled = false,
  onSelect,
  onRightIcon1Click,
  onRightIcon2Click,
  rightIcon1Label = 'Expand',
  rightIcon2Label = 'Remove',
  className,
  as: Wrapper = 'li',
}: ActionMenuItemProps) {
  const classes = [
    'orbit-action-menu-item',
    selected ? 'orbit-action-menu-item--selected' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showLeftGlyph =
    leftIcon != null ||
    (showLeftIcon &&
      (leftIconType !== 'checkmark' || selected));

  const leftIsEmptySpacer =
    showLeftIcon && leftIcon == null && leftIconType === 'checkmark' && !selected;

  return (
    <Wrapper className={classes} role={Wrapper === 'li' ? 'none' : undefined}>
      <button
        type="button"
        className="orbit-action-menu-item__main"
        disabled={disabled}
        role="menuitem"
        aria-current={selected ? 'true' : undefined}
        onClick={onSelect}
      >
        {showLeftIcon ? (
          <span
            className={[
              'orbit-action-menu-item__left',
              leftIsEmptySpacer ? 'orbit-action-menu-item__left--empty' : undefined,
              selected && leftIconType === 'checkmark'
                ? 'orbit-action-menu-item__left--check'
                : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {leftIcon ??
              (showLeftGlyph ? (
                <ActionMenuLeftIcon
                  type={leftIconType}
                  selected={selected}
                  iconSize={iconSize}
                />
              ) : null)}
          </span>
        ) : null}
        <span className="orbit-action-menu-item__label">{label}</span>
      </button>

      {(showRightIcon1 || showRightIcon2) && (
        <div className="orbit-action-menu-item__actions">
          {showRightIcon1 ? (
            <button
              type="button"
              className="orbit-action-menu-item__icon-btn"
              disabled={disabled}
              aria-label={rightIcon1Label}
              onClick={(event) => {
                event.stopPropagation();
                onRightIcon1Click?.();
              }}
            >
              <IconFrame size={iconSize}>
                {rightIcon1 ?? <ActionMenuChevronDownIcon />}
              </IconFrame>
            </button>
          ) : null}
          {showRightIcon2 ? (
            <button
              type="button"
              className="orbit-action-menu-item__icon-btn orbit-action-menu-item__icon-btn--close"
              disabled={disabled}
              aria-label={rightIcon2Label}
              onClick={(event) => {
                event.stopPropagation();
                onRightIcon2Click?.();
              }}
            >
              <IconFrame size={iconSize}>
                {rightIcon2 ?? <ActionMenuCloseIcon />}
              </IconFrame>
            </button>
          ) : null}
        </div>
      )}
    </Wrapper>
  );
}
