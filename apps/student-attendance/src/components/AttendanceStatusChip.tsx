import type { AttendanceStatus } from '../data/attendanceData';
import {
  CriticalChip,
  DefaultChip,
  SuccessChip,
  WarningChip,
} from 'orbit-ds-components';

const statusConfig: Record<
  AttendanceStatus,
  { label: string; Chip: typeof SuccessChip }
> = {
  present: { label: 'Present', Chip: SuccessChip },
  late: { label: 'Late', Chip: WarningChip },
  absent: { label: 'Absent', Chip: CriticalChip },
  excused: { label: 'Excused', Chip: DefaultChip },
};

export interface AttendanceStatusChipProps {
  status: AttendanceStatus;
}

export function AttendanceStatusChip({ status }: AttendanceStatusChipProps) {
  const { label, Chip } = statusConfig[status];

  return (
    <Chip type="chip" size="compact" showIcon={false}>
      {label}
    </Chip>
  );
}
