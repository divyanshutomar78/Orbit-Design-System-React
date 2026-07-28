import { Component, Input, ViewEncapsulation } from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import type { OrbitIconSize } from '../Icon/iconSize';
import { LabelValueHorizontalComponent } from '../LabelValueHorizontal/label-value-horizontal.component';
import {
  ListingChevronRightIconComponent,
  ListingDragIconComponent,
  ListingInfoIconComponent,
} from './listing-item-icons.component';

@Component({
  selector: 'orbit-listing-item',
  standalone: true,
  imports: [
    IconFrameComponent,
    LabelValueHorizontalComponent,
    ListingChevronRightIconComponent,
    ListingDragIconComponent,
    ListingInfoIconComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ListingItem.css'],
  template: `
    <div [class]="classes" [attr.role]="interactive ? 'button' : null" [attr.tabindex]="interactive ? 0 : null">
      @if (reorderIcon) {
        <div class="orbit-listing-item__reorder">
          <orbit-icon-frame [size]="iconSize">
            <orbit-listing-drag-icon></orbit-listing-drag-icon>
          </orbit-icon-frame>
        </div>
      }

      <div class="orbit-listing-item__main">
        @if (showLeftIcon) {
          <div class="orbit-listing-item__left-icon">
            <orbit-icon-frame [size]="iconSize">
              <ng-content select="[orbitLeftIcon]">
                <orbit-listing-info-icon></orbit-listing-info-icon>
              </ng-content>
            </orbit-icon-frame>
          </div>
        }

        <div class="orbit-listing-item__cell">
          @if (showTitleBlock) {
            <div class="orbit-listing-item__title">{{ title }}</div>
          }
          <ng-content select="[orbitLabelValue]">
            @if (showLabelValue) {
              <div class="orbit-listing-item__lv">
                <orbit-label-value-horizontal
                  layout="L + V"
                  [label]="label"
                  [value]="value"
                ></orbit-label-value-horizontal>
              </div>
            }
          </ng-content>
          @if (multiLine && showHelper) {
            <p class="orbit-listing-item__helper">{{ helper }}</p>
          }
        </div>
      </div>

      @if (multiLine) {
        <div class="orbit-listing-item__actions-wrap">
          <div class="orbit-listing-item__actions">
            <ng-content select="[orbitAddIcons]"></ng-content>
          </div>
        </div>
      } @else {
        <div class="orbit-listing-item__actions">
          <ng-content select="[orbitAddIcons]"></ng-content>
        </div>
      }

      @if (showRightIcon) {
        <div class="orbit-listing-item__right">
          <orbit-icon-frame [size]="iconSize">
            <ng-content select="[orbitRightIcon]">
              <orbit-listing-chevron-right-icon></orbit-listing-chevron-right-icon>
            </ng-content>
          </orbit-icon-frame>
        </div>
      }
    </div>
  `,
})
export class ListingItemComponent {
  /** Figma Multi-line — stacked title, label/value, optional helper. */
  @Input() multiLine = false;
  /** Figma GF icon reorder — drag handle on the leading edge. */
  @Input() reorderIcon = true;
  /** small: --icon-frame-size-small; big: --icon-frame-size-default (24 web, 44 iPad frame). */
  @Input() iconSize: OrbitIconSize = 'big';
  @Input() showLeftIcon = true;
  @Input() showRightIcon = true;
  /** Figma Show Title — inline title before label/value (single-line only). */
  @Input() showTitle = false;
  @Input() showLabelValue = true;
  /** Figma Show Helper — secondary line below label/value (multi-line only). */
  @Input() showHelper = false;
  @Input() title = 'Title';
  @Input() label = 'Label';
  @Input() value = 'Value';
  @Input() helper = 'Helper';
  /** Set to true when a `(click)` handler is bound, to mirror React's onClick-driven interactivity. */
  @Input() interactive = false;
  @Input() className = '';

  get showTitleBlock(): boolean {
    const showSingleLineTitle = !this.multiLine && this.showTitle;
    const showMultiLineTitle = this.multiLine;
    return showSingleLineTitle || showMultiLineTitle;
  }

  get classes(): string {
    return [
      'orbit-listing-item',
      this.multiLine ? 'orbit-listing-item--multi-line' : undefined,
      this.interactive ? 'orbit-listing-item--interactive' : undefined,
      this.iconSize === 'big' ? 'orbit-listing-item--icon-big' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
