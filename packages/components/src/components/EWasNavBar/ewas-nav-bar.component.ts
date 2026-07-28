import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import {
  EWasNavItemComponent,
  type EWasNavItemState,
} from '../EWasNavItem/ewas-nav-item.component';
import {
  EWasNavItemWTextComponent,
  type EWasNavItemWTextCharacters,
  type EWasNavItemWTextState,
} from '../EWasNavItemWText/ewas-nav-item-w-text.component';
import {
  EWasNavBarAircraftIconComponent,
  EWasNavBarAirportIconComponent,
  EWasNavBarDataIconComponent,
  EWasNavBarGearIconComponent,
  EWasNavBarLeafIconComponent,
  EWasNavBarPilotAppIconComponent,
  EWasNavBarSitaLogoIconComponent,
  EWasNavBarUserIconComponent,
  EWasNavBarUsersIconComponent,
} from './ewas-nav-bar-icons.component';

/** Figma Orientation */
export type EWasNavBarOrientation = 'horizontal' | 'vertical' | 'splitView';

export type EWasNavBarIconType =
  | 'aircraft'
  | 'airport'
  | 'leaf'
  | 'data'
  | 'gear'
  | 'user'
  | 'users'
  | 'pilotApp';

export interface EWasNavBarFlightHeaderConfig {
  characters?: EWasNavItemWTextCharacters;
  primaryText?: string;
  secondaryText?: string;
  state?: EWasNavItemWTextState;
}

export interface EWasNavBarItemConfig {
  id: string;
  label?: string;
  iconType?: EWasNavBarIconType;
  /** Use `disabled` instead; only `disabled` is applied from `state`. */
  state?: EWasNavItemState;
  disabled?: boolean;
  /** When false, the item is not clickable (e.g. footer version label). */
  selectable?: boolean;
}

const orientationClass: Record<EWasNavBarOrientation, string> = {
  horizontal: 'orbit-ewas-nav-bar--horizontal',
  vertical: 'orbit-ewas-nav-bar--vertical',
  splitView: 'orbit-ewas-nav-bar--split-view',
};

export const defaultEWasNavBarPrimaryItems: EWasNavBarItemConfig[] = [
  { id: 'flights', label: 'Flights', iconType: 'aircraft' },
  { id: 'airport', label: 'Airport', iconType: 'airport' },
  { id: 'opti', label: 'Opti Flight', iconType: 'leaf' },
];

export const defaultEWasNavBarUtilityItems: EWasNavBarItemConfig[] = [
  { id: 'data', label: 'Data', iconType: 'data' },
  { id: 'config', label: 'Config', iconType: 'gear' },
  { id: 'user', label: 'User', iconType: 'user' },
];

export const defaultEWasNavBarFooterItem: EWasNavBarItemConfig = {
  id: 'version',
  label: 'V1.0',
  iconType: 'pilotApp',
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

@Component({
  selector: 'orbit-ewas-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    EWasNavItemComponent,
    EWasNavItemWTextComponent,
    EWasNavBarAircraftIconComponent,
    EWasNavBarAirportIconComponent,
    EWasNavBarLeafIconComponent,
    EWasNavBarDataIconComponent,
    EWasNavBarGearIconComponent,
    EWasNavBarUserIconComponent,
    EWasNavBarUsersIconComponent,
    EWasNavBarSitaLogoIconComponent,
    EWasNavBarPilotAppIconComponent,
  ],
  templateUrl: './ewas-nav-bar.component.html',
  styleUrls: ['./EWasNavBar.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarComponent implements OnInit {
  /** Figma Flight — shows flight header + flight nav set. */
  @Input() flight = true;
  @Input() orientation: EWasNavBarOrientation = 'horizontal';
  @Input() flightHeader?: EWasNavBarFlightHeaderConfig;
  /** Top nav group (Flights, Airport, Opti Flight). */
  @Input() primaryItems: EWasNavBarItemConfig[] = defaultEWasNavBarPrimaryItems;
  /** When true, projects `[orbitBranding]` shown when `flight` is false (default: SITA logo). */
  @Input() useBrandingSlot = false;
  /** Data, Config, User. */
  @Input() utilityItems: EWasNavBarItemConfig[] = defaultEWasNavBarUtilityItems;
  @Input() footerItem: EWasNavBarItemConfig = defaultEWasNavBarFooterItem;
  /** Controlled active nav item. Omit for uncontrolled selection. */
  @Input() activeItemId?: string | null;
  /** Initial selection when uncontrolled (default: `airport`). */
  @Input() defaultActiveItemId: string | null = 'airport';
  /** Clicking the active item clears selection (default: true). */
  @Input() allowDeselect = true;
  @Output() itemSelect = new EventEmitter<string | null>();
  @Input() className?: string;

  private uncontrolledActiveId: string | null = null;

  ngOnInit(): void {
    this.uncontrolledActiveId = this.defaultActiveItemId;
  }

  private get isControlled(): boolean {
    return this.activeItemId !== undefined;
  }

  get currentActiveItemId(): string | null {
    return this.isControlled ? (this.activeItemId as string | null) : this.uncontrolledActiveId;
  }

  get showLabels(): boolean {
    return this.orientation !== 'splitView';
  }

  get flightCharacters(): EWasNavItemWTextCharacters {
    return (
      this.flightHeader?.characters ?? (this.orientation === 'splitView' ? 'default' : '6')
    );
  }

  get resolvedUtility(): EWasNavBarItemConfig[] {
    if (this.orientation === 'splitView' && !this.flight) {
      return this.utilityItems.map((item) =>
        item.id === 'user' ? { ...item, iconType: 'users' as const } : item,
      );
    }
    return this.utilityItems;
  }

  get classes(): string {
    return ['orbit-ewas-nav-bar', orientationClass[this.orientation], this.className]
      .filter(Boolean)
      .join(' ');
  }

  isSelectable(item: EWasNavBarItemConfig): boolean {
    return item.selectable !== false;
  }

  resolveState(item: EWasNavBarItemConfig): EWasNavItemState {
    return resolveItemState(item, this.currentActiveItemId);
  }

  handleItemSelect(item: EWasNavBarItemConfig): void {
    if (item.selectable === false) return;

    const nextId =
      this.allowDeselect && this.currentActiveItemId === item.id ? null : item.id;

    if (!this.isControlled) {
      this.uncontrolledActiveId = nextId;
    }
    this.itemSelect.emit(nextId);
  }
}
