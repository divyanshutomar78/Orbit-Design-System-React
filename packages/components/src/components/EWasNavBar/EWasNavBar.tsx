import { useState, type HTMLAttributes, type ReactNode } from 'react';

import { EWasNavItem } from '../EWasNavItem/EWasNavItem';
import type {
  EWasNavItemOrientation,
  EWasNavItemState,
} from '../EWasNavItem/EWasNavItem';
import { EWasNavItemWText } from '../EWasNavItemWText/EWasNavItemWText';
import type {
  EWasNavItemWTextCharacters,
  EWasNavItemWTextOrientation,
  EWasNavItemWTextState,
} from '../EWasNavItemWText/EWasNavItemWText';
import {
  EWasNavBarAircraftIcon,
  EWasNavBarAirportIcon,
  EWasNavBarDataIcon,
  EWasNavBarGearIcon,
  EWasNavBarLeafIcon,
  EWasNavBarPilotAppIcon,
  EWasNavBarSitaLogoIcon,
  EWasNavBarUserIcon,
  EWasNavBarUsersIcon,
} from './EWasNavBarIcons';
import './EWasNavBar.css';

/** Figma Orientation */
export type EWasNavBarOrientation = 'horizontal' | 'vertical' | 'splitView';

export interface EWasNavBarFlightHeaderConfig {
  characters?: EWasNavItemWTextCharacters;
  primaryText?: ReactNode;
  secondaryText?: ReactNode;
  state?: EWasNavItemWTextState;
}

export interface EWasNavBarItemConfig {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  /** Use `disabled` instead; only `disabled` is applied from `state`. */
  state?: EWasNavItemState;
  disabled?: boolean;
  /** When false, the item is not clickable (e.g. footer version label). */
  selectable?: boolean;
}

export interface EWasNavBarProps extends HTMLAttributes<HTMLElement> {
  /** Figma Flight — shows flight header + flight nav set. */
  flight?: boolean;
  orientation?: EWasNavBarOrientation;
  flightHeader?: EWasNavBarFlightHeaderConfig;
  /** Top nav group (Flights, Airport, Opti Flight). */
  primaryItems?: EWasNavBarItemConfig[];
  /** Shown when `flight={false}` instead of flight header. */
  branding?: ReactNode;
  /** Data, Config, User. */
  utilityItems?: EWasNavBarItemConfig[];
  footerItem?: EWasNavBarItemConfig;
  /** Controlled active nav item. Omit for uncontrolled selection. */
  activeItemId?: string | null;
  /** Initial selection when uncontrolled (default: `airport`). */
  defaultActiveItemId?: string | null;
  /** Clicking the active item clears selection (default: true). */
  allowDeselect?: boolean;
  onItemSelect?: (itemId: string | null) => void;
}

const orientationClass: Record<EWasNavBarOrientation, string> = {
  horizontal: 'orbit-ewas-nav-bar--horizontal',
  vertical: 'orbit-ewas-nav-bar--vertical',
  splitView: 'orbit-ewas-nav-bar--split-view',
};

function toItemOrientation(
  orientation: EWasNavBarOrientation,
): EWasNavItemOrientation {
  if (orientation === 'splitView') return 'splitView';
  if (orientation === 'vertical') return 'vertical';
  return 'horizontal';
}

function toTextOrientation(
  orientation: EWasNavBarOrientation,
): EWasNavItemWTextOrientation {
  if (orientation === 'splitView') return 'splitView';
  if (orientation === 'vertical') return 'vertical';
  return 'horizontal';
}

export const defaultEWasNavBarPrimaryItems: EWasNavBarItemConfig[] = [
  { id: 'flights', label: 'Flights', icon: <EWasNavBarAircraftIcon /> },
  { id: 'airport', label: 'Airport', icon: <EWasNavBarAirportIcon /> },
  { id: 'opti', label: 'Opti Flight', icon: <EWasNavBarLeafIcon /> },
];

export const defaultEWasNavBarUtilityItems: EWasNavBarItemConfig[] = [
  { id: 'data', label: 'Data', icon: <EWasNavBarDataIcon /> },
  { id: 'config', label: 'Config', icon: <EWasNavBarGearIcon /> },
  { id: 'user', label: 'User', icon: <EWasNavBarUserIcon /> },
];

export const defaultEWasNavBarFooterItem: EWasNavBarItemConfig = {
  id: 'version',
  label: 'V1.0',
  icon: <EWasNavBarPilotAppIcon />,
  selectable: false,
};

function resolveItemState(
  item: EWasNavBarItemConfig,
  activeItemId?: string | null,
): EWasNavItemState {
  if (item.disabled || item.state === 'disabled') return 'disabled';
  if (activeItemId && item.id === activeItemId) return 'active';
  return 'default';
}

export function EWasNavBar({
  flight = true,
  orientation = 'horizontal',
  flightHeader,
  primaryItems = defaultEWasNavBarPrimaryItems,
  branding,
  utilityItems = defaultEWasNavBarUtilityItems,
  footerItem = defaultEWasNavBarFooterItem,
  activeItemId: activeItemIdProp,
  defaultActiveItemId = 'airport',
  allowDeselect = true,
  onItemSelect,
  className,
  ...rest
}: EWasNavBarProps) {
  const isControlled = activeItemIdProp !== undefined;
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<
    string | null
  >(defaultActiveItemId);
  const activeItemId = isControlled ? activeItemIdProp : uncontrolledActiveId;

  const handleItemSelect = (item: EWasNavBarItemConfig) => {
    if (item.selectable === false) return;

    const nextId =
      allowDeselect && activeItemId === item.id ? null : item.id;

    if (!isControlled) {
      setUncontrolledActiveId(nextId);
    }
    onItemSelect?.(nextId);
  };

  const itemOrientation = toItemOrientation(orientation);
  const textOrientation = toTextOrientation(orientation);
  const showLabels = orientation !== 'splitView';

  const headerConfig = flightHeader ?? {};
  const flightCharacters =
    headerConfig.characters ??
    (orientation === 'splitView' ? 'default' : '6');

  const resolvedUtility =
    orientation === 'splitView' && !flight
      ? utilityItems.map((item) =>
          item.id === 'user' && !item.icon
            ? { ...item, icon: <EWasNavBarUsersIcon /> }
            : item,
        )
      : utilityItems;

  const classes = [
    'orbit-ewas-nav-bar',
    orientationClass[orientation],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderNavItem = (item: EWasNavBarItemConfig) => {
    const isSelectable = item.selectable !== false;

    return (
      <EWasNavItem
        key={item.id}
        navItem={showLabels ? item.label : undefined}
        icon={item.icon}
        orientation={itemOrientation}
        state={resolveItemState(item, activeItemId)}
        disabled={item.disabled}
        onClick={isSelectable ? () => handleItemSelect(item) : undefined}
      />
    );
  };

  return (
    <nav className={classes} aria-label="eWAS navigation" {...rest}>
      <div className="orbit-ewas-nav-bar__section">
        {flight ? (
          <EWasNavItemWText
            characters={flightCharacters}
            primaryText={headerConfig.primaryText}
            secondaryText={headerConfig.secondaryText}
            orientation={textOrientation}
            state={headerConfig.state ?? 'default'}
          />
        ) : null}

        <div className="orbit-ewas-nav-bar__section">
          {!flight && branding != null ? (
            <div className="orbit-ewas-nav-bar__branding">{branding}</div>
          ) : null}
          {!flight && branding == null ? (
            <div className="orbit-ewas-nav-bar__branding">
              <EWasNavBarSitaLogoIcon />
            </div>
          ) : null}
          {primaryItems.map(renderNavItem)}
        </div>
      </div>

      <div className="orbit-ewas-nav-bar__section">
        <div className="orbit-ewas-nav-bar__section">
          {resolvedUtility.map(renderNavItem)}
        </div>
        {renderNavItem(footerItem)}
      </div>
    </nav>
  );
}
