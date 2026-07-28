import { Component, Input, ViewEncapsulation } from '@angular/core';

/** Figma Label Value_Horizontal — Type */
export type LabelValueHorizontalLayout = 'L + V' | 'V + L' | 'L+V+L' | 'V' | 'L';

export const labelValueHorizontalLayouts: LabelValueHorizontalLayout[] = [
  'L + V',
  'V + L',
  'L+V+L',
  'V',
  'L',
];

function layoutModifier(layout: LabelValueHorizontalLayout): string {
  const key = layout.replace(/\s+/g, '').replace(/\+/g, '-').toLowerCase();
  return `orbit-label-value-horizontal--layout-${key}`;
}

@Component({
  selector: 'orbit-label-value-horizontal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./LabelValueHorizontal.css'],
  template: `
    <div [class]="classes">
      <div class="orbit-label-value-horizontal__row">
        @if (resolvedLayout === 'L + V') {
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-horizontal__label">{{ label }}</span></ng-content
          >
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
        }
        @if (resolvedLayout === 'V + L') {
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-horizontal__label">{{ label }}</span></ng-content
          >
        }
        @if (resolvedLayout === 'L+V+L') {
          <div class="orbit-label-value-horizontal__cell">
            <ng-content select="[orbitLabelSlot]"
              ><span class="orbit-label-value-horizontal__label">{{ label }}</span></ng-content
            >
            <ng-content select="[orbitValueSlot]"
              ><span [class]="valueClasses">{{ value }}</span></ng-content
            >
          </div>
          <span class="orbit-label-value-horizontal__label">{{ secondaryLabel }}</span>
        }
        @if (resolvedLayout === 'V') {
          <ng-content select="[orbitValueSlot]"
            ><span [class]="valueClasses">{{ value }}</span></ng-content
          >
        }
        @if (resolvedLayout === 'L') {
          <ng-content select="[orbitLabelSlot]"
            ><span class="orbit-label-value-horizontal__label">{{ label }}</span></ng-content
          >
        }
      </div>
    </div>
  `,
})
export class LabelValueHorizontalComponent {
  /** Figma Type */
  @Input() layout: LabelValueHorizontalLayout = 'L + V';
  @Input() label = 'Label';
  /** Second label for `L+V+L` (Figma label2). */
  @Input() secondaryLabel = 'Label2';
  @Input() value = 'Value';
  /** Figma Only Value — Big=True (Title 3 typography). */
  @Input() big = false;
  @Input() className = '';

  get resolvedLayout(): LabelValueHorizontalLayout {
    return labelValueHorizontalLayouts.includes(this.layout) ? this.layout : 'L + V';
  }

  get valueClasses(): string {
    return [
      'orbit-label-value-horizontal__value',
      this.big ? 'orbit-label-value-horizontal__value--big' : undefined,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get classes(): string {
    return ['orbit-label-value-horizontal', layoutModifier(this.resolvedLayout), this.className]
      .filter(Boolean)
      .join(' ');
  }
}
