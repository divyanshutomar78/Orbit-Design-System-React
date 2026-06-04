import type { HTMLAttributes, ReactNode } from 'react';

import './LabelValueVertical.css';

/** Figma Label Value_Vertical — Layout */
export type LabelValueVerticalLayout = 'V + L' | 'L+V' | 'L + V + L';

export const labelValueVerticalLayouts: LabelValueVerticalLayout[] = [
  'V + L',
  'L+V',
  'L + V + L',
];

export interface LabelValueVerticalProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma Layout */
  layout?: LabelValueVerticalLayout;
  label?: ReactNode;
  /** Bottom label for `L + V + L`. */
  secondaryLabel?: ReactNode;
  value?: ReactNode;
  /** Figma Only Value — Big=True (Title 3 typography). */
  big?: boolean;
  /** Figma Add more Label */
  labelSlot?: ReactNode;
  /** Figma Add more Value */
  valueSlot?: ReactNode;
}

function LabelPart({ children }: { children: ReactNode }) {
  return <span className="orbit-label-value-vertical__label">{children}</span>;
}

function ValuePart({
  children,
  big = false,
}: {
  children: ReactNode;
  big?: boolean;
}) {
  const classes = [
    'orbit-label-value-vertical__value',
    big ? 'orbit-label-value-vertical__value--big' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
}

export function LabelValueVertical({
  layout = 'L+V',
  label = 'Label',
  secondaryLabel = 'Label',
  value = 'Value',
  big = false,
  labelSlot,
  valueSlot,
  className,
  ...rest
}: LabelValueVerticalProps) {
  const resolvedLayout = labelValueVerticalLayouts.includes(layout)
    ? layout
    : 'L+V';

  const labelEl = labelSlot ?? <LabelPart>{label}</LabelPart>;
  const valueEl = valueSlot ?? <ValuePart big={big}>{value}</ValuePart>;
  const secondaryLabelEl = <LabelPart>{secondaryLabel}</LabelPart>;

  const classes = ['orbit-label-value-vertical', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {resolvedLayout === 'V + L' ? (
        <>
          <div className="orbit-label-value-vertical__slot">{valueEl}</div>
          <div className="orbit-label-value-vertical__slot">{labelEl}</div>
        </>
      ) : null}
      {resolvedLayout === 'L+V' ? (
        <>
          <div className="orbit-label-value-vertical__slot">{labelEl}</div>
          <div className="orbit-label-value-vertical__slot">{valueEl}</div>
        </>
      ) : null}
      {resolvedLayout === 'L + V + L' ? (
        <>
          <div className="orbit-label-value-vertical__slot">{labelEl}</div>
          <div className="orbit-label-value-vertical__slot">{valueEl}</div>
          {secondaryLabelEl}
        </>
      ) : null}
    </div>
  );
}
