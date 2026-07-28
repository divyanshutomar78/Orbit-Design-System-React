import { Component, Input, ViewEncapsulation } from '@angular/core';

import { iconSizeClass, type OrbitIconSize } from './iconSize';

@Component({
  selector: 'orbit-icon-frame',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  host: {
    style: 'display:inline-flex;align-items:center;justify-content:center;line-height:0;',
  },
  styleUrls: ['./icon-size.css'],
  template: `
    <span [class]="classes" aria-hidden="true">
      <ng-content></ng-content>
    </span>
  `,
})
export class IconFrameComponent {
  @Input() size: OrbitIconSize = 'small';
  @Input() className = '';

  get classes(): string {
    return ['orbit-icon', iconSizeClass(this.size), this.className]
      .filter(Boolean)
      .join(' ');
  }
}
