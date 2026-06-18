import type { UsageLineItem } from '../data/billingData';
import './UsageTable.css';

export interface UsageTableProps {
  items: UsageLineItem[];
}

export function UsageTable({ items }: UsageTableProps) {
  return (
    <div className="usage-table">
      <div className="usage-table__head" role="row">
        <span className="usage-table__cell usage-table__cell--item" role="columnheader">
          Item
        </span>
        <span className="usage-table__cell usage-table__cell--tokens" role="columnheader">
          Tokens
        </span>
        <span className="usage-table__cell usage-table__cell--usage" role="columnheader">
          Usage
        </span>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className={[
            'usage-table__row',
            item.isCategory ? 'usage-table__row--category' : undefined,
            item.indent ? 'usage-table__row--indent' : undefined,
          ]
            .filter(Boolean)
            .join(' ')}
          role="row"
        >
          <span className="usage-table__cell usage-table__cell--item" role="cell">
            {item.label}
          </span>
          <span className="usage-table__cell usage-table__cell--tokens" role="cell">
            {item.tokens}
          </span>
          <span className="usage-table__cell usage-table__cell--usage" role="cell">
            {item.usage}
          </span>
        </div>
      ))}
    </div>
  );
}
