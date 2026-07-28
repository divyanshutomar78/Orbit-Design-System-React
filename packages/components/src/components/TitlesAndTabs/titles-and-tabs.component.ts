import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import { TitleTabComponent } from './title-tab.component';
import {
  TitlesAndTabsBackIconComponent,
  TitlesAndTabsMenuIconComponent,
} from './titles-and-tabs-icons.component';

export interface TitlesAndTabsTabItem {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'orbit-titles-and-tabs',
  standalone: true,
  imports: [
    CommonModule,
    IconFrameComponent,
    TitleTabComponent,
    TitlesAndTabsBackIconComponent,
    TitlesAndTabsMenuIconComponent,
  ],
  templateUrl: './titles-and-tabs.component.html',
  styleUrls: ['./TitlesAndTabs.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TitlesAndTabsComponent {
  /** Figma Title — uppercase spaced title (Title 4). */
  @Input() title = 'Title';
  /** Figma Show Title Icon — header block with back icon + title. */
  @Input() showTitleIcon = true;
  /** Figma Show Left Icon */
  @Input() showLeftIcon = true;
  /** When true, projects `[orbitLeftIcon]` instead of the default back icon. */
  @Input() useLeftIconSlot = false;
  @Input() iconSize: OrbitIconSize = 'big';
  /** Figma Show Tabs */
  @Input() showTabs = true;
  /** When true, projects `[orbitTabs]` instead of `tabItems` / default tab. */
  @Input() useTabsSlot = false;
  /** Convenience tabs rendered as orbit-title-tab. */
  @Input() tabItems?: TitlesAndTabsTabItem[];
  @Output() tabSelect = new EventEmitter<string>();
  /** Figma Add Extra Components */
  @Input() showExtraSlot = true;
  /** Figma Show Right Icons */
  @Input() showRightIcons = true;
  /** When true, projects `[orbitRightIcons]` instead of the default menu icon. */
  @Input() useRightIconsSlot = false;
  @Input() className?: string;

  get classes(): string {
    return ['orbit-titles-and-tabs', this.className].filter(Boolean).join(' ');
  }

  onTabSelect(tabId: string): void {
    this.tabSelect.emit(tabId);
  }
}
