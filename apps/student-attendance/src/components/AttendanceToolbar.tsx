import { Button, InputSelect } from 'orbit-ds-components';

import { classFilterOptions } from '../data/attendanceData';
import './AttendanceToolbar.css';

export interface AttendanceToolbarProps {
  classFilter: string;
  onClassFilterChange: (value: string) => void;
}

export function AttendanceToolbar({
  classFilter,
  onClassFilterChange,
}: AttendanceToolbarProps) {
  return (
    <div className="attendance-toolbar">
      <InputSelect
        className="attendance-toolbar__filter"
        label="Class"
        showLabel={false}
        showLabelInfo={false}
        options={classFilterOptions}
        value={classFilter}
        onValueChange={onClassFilterChange}
      />

      <div className="attendance-toolbar__actions">
        <Button variant="secondary" minWidth={false}>
          Export CSV
        </Button>
        <Button variant="primary" minWidth={false}>
          Mark attendance
        </Button>
      </div>
    </div>
  );
}
