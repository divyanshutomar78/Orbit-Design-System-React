import { Component, Input, ViewEncapsulation } from '@angular/core';

/** Figma Label Value_Vertical — Layout */
export type LabelValueVerticalLayout = 'V + L' | 'L+V' | 'L + V + L';

export const labelValueVerticalLayouts: LabelValueVerticalLayout[] = ['V + L', 'L+V', 'L + V + L'];

@Component({
  selector: 'orbit-label-value-vertical',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./LabelValueVertical.css'],
  template: `
    <div [class]="classes">
      @if (resolvedLayout === 'V + L') {
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
        </div>
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-vertical__label">{{ label }}</span></ng-content
          >
        </div>
      }
      @if (resolvedLayout === 'L+V') {
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-vertical__label">{{ label }}</span></ng-content
          >
        </div>
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
        </div>
      }
      @if (resolvedLayout === 'L + V + L') {
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-vertical__label">{{ label }}</span></ng-content
          >
        </div>
        <div class="orbit-label-value-vertical__slot">
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
        </div>
        <span class="orbit-label-value-vertical__label">{{ secondaryLabel }}</span>
      }
    </div>
  `,
})
export class LabelValueVerticalComponent {
  /** Figma Layout */
  @Input() layout: LabelValueVerticalLayout = 'L+V';
  @Input() label = 'Label';
  /** Bottom label for `L + V + L`. */
  @Input() secondaryLabel = 'Label';
  @Input() value = 'Value';
  /** Figma Only Value — Big=True (Title 3 typography). */
  @Input() big = false;
  @Input() className = '';

  get resolvedLayout(): LabelValueVerticalLayout {
    return labelValueVerticalLayouts.includes(this.layout) ? this.layout : 'L+V';
  }

  get valueClasses(): string {
    return [
      'orbit-label-value-vertical__value',
      this.big ? 'orbit-label-value-vertical__value--big' : undefined,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get classes(): string {
    return ['orbit-label-value-vertical', this.className].filter(Boolean).join(' ');
  }
}
