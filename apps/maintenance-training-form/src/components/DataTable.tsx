import { LabelValueHorizontal } from 'orbit-ds-components';

import type { TableColumn, TableRow } from '../data/formData';
import './DataTable.css';

export interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="data-table" role="table">
      <div className="data-table__head" role="row">
        {columns.map((column) => (
          <div key={column.id} className="data-table__cell" role="columnheader">
            <LabelValueHorizontal layout="L" label={column.label} />
          </div>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row.id} className="data-table__row" role="row">
          {columns.map((column) => (
            <div key={column.id} className="data-table__cell" role="cell">
              <LabelValueHorizontal layout="V" value={row.cells[column.id] ?? ''} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
