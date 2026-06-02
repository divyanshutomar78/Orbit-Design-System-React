import type { HTMLAttributes, ReactNode } from 'react';

import type { OrbitIconSize } from '../Icon/iconSize';
import './ActionMenu.css';
import { ActionMenuItem, type ActionMenuItemProps } from './ActionMenuItem';

export interface ActionMenuItemConfig
  extends Omit<ActionMenuItemProps, 'className'> {
  id: string;
}

export interface ActionMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma Add Items — shows top “Add more item” row. */
  addItems?: boolean;
  /** Figma Add more item slot — e.g. an extra ActionMenuItem above the list. */
  addMoreItem?: ReactNode;
  /** Action menu rows rendered as ActionMenuItem. */
  items?: ActionMenuItemConfig[];
  iconSize?: OrbitIconSize;
  onItemSelect?: (itemId: string) => void;
  onItemRightIcon1?: (itemId: string) => void;
  onItemRightIcon2?: (itemId: string) => void;
}

export function ActionMenu({
  addItems = false,
  addMoreItem,
  items,
  iconSize = 'big',
  onItemSelect,
  onItemRightIcon1,
  onItemRightIcon2,
  className,
  ...rest
}: ActionMenuProps) {
  const classes = ['orbit-action-menu', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="menu" {...rest}>
      {addItems ? (
        <div className="orbit-action-menu__add-item">{addMoreItem}</div>
      ) : null}
      <ul className="orbit-action-menu__list">
        {items?.map(({ id, ...itemProps }) => (
          <ActionMenuItem
            key={id}
            iconSize={iconSize}
            onSelect={() => onItemSelect?.(id)}
            onRightIcon1Click={() => onItemRightIcon1?.(id)}
            onRightIcon2Click={() => onItemRightIcon2?.(id)}
            {...itemProps}
          />
        ))}
      </ul>
    </div>
  );
}
