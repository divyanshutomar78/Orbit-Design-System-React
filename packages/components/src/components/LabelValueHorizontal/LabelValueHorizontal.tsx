import type { HTMLAttributes, ReactNode } from 'react';

import './LabelValueHorizontal.css';

/** Figma Label Value_Horizontal — Type */
export type LabelValueHorizontalLayout = 'L + V' | 'V + L' | 'L+V+L' | 'V' | 'L';

export const labelValueHorizontalLayouts: LabelValueHorizontalLayout[] = [
  'L + V',
  'V + L',
  'L+V+L',
  'V',
  'L',
];

export interface LabelValueHorizontalProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Figma Type */
  layout?: LabelValueHorizontalLayout;
  label?: ReactNode;
  /** Second label for `L+V+L` (Figma label2). */
  secondaryLabel?: ReactNode;
  value?: ReactNode;
  /** Figma Only Value — Big=True (Title 3 typography). */
  big?: boolean;
  /** Figma Add more Label */
  labelSlot?: ReactNode;
  /** Figma Add more Value */
  valueSlot?: ReactNode;
}

function layoutModifier(layout: LabelValueHorizontalLayout): string {
  const key = layout.replace(/\s+/g, '').replace(/\+/g, '-').toLowerCase();
  return `orbit-label-value-horizontal--layout-${key}`;
}

function LabelPart({ children }: { children: ReactNode }) {
  return <span className="orbit-label-value-horizontal__label">{children}</span>;
}

function ValuePart({
  children,
  big = false,
}: {
  children: ReactNode;
  big?: boolean;
}) {
  const classes = [
    'orbit-label-value-horizontal__value',
    big ? 'orbit-label-value-horizontal__value--big' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}

export function LabelValueHorizontal({
  layout = 'L + V',
  label = 'Label',
  secondaryLabel = 'Label2',
  value = 'Value',
  big = false,
  labelSlot,
  valueSlot,
  className,
  ...rest
}: LabelValueHorizontalProps) {
  const resolvedLayout = labelValueHorizontalLayouts.includes(layout)
    ? layout
    : 'L + V';

  const labelEl = labelSlot ?? <LabelPart>{label}</LabelPart>;
  const valueEl = valueSlot ?? <ValuePart big={big}>{value}</ValuePart>;
  const secondaryLabelEl = <LabelPart>{secondaryLabel}</LabelPart>;

  const classes = [
    'orbit-label-value-horizontal',
    layoutModifier(resolvedLayout),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="orbit-label-value-horizontal__row">
        {resolvedLayout === 'L + V' ? (
          <>
            {labelEl}
            {valueEl}
          </>
        ) : null}
        {resolvedLayout === 'V + L' ? (
          <>
            {valueEl}
            {labelEl}
          </>
        ) : null}
        {resolvedLayout === 'L+V+L' ? (
          <>
            <div className="orbit-label-value-horizontal__cell">
              {labelEl}
              {valueEl}
            </div>
            {secondaryLabelEl}
          </>
        ) : null}
        {resolvedLayout === 'V' ? valueEl : null}
        {resolvedLayout === 'L' ? labelEl : null}
      </div>
    </div>
  );
}
