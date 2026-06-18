import type { StudentRecord } from '../data/attendanceData';
import { AttendanceStatusChip } from './AttendanceStatusChip';
import { Avatar } from './Avatar';
import { ProgressBar } from './ProgressBar';
import './AttendanceTable.css';

export interface AttendanceTableProps {
  students: StudentRecord[];
}

export function AttendanceTable({ students }: AttendanceTableProps) {
  return (
    <section className="attendance-card attendance-table-section">
      <header className="attendance-table-section__header">
        <div>
          <h2 className="attendance-table-section__title">Today's roster</h2>
          <p className="attendance-table-section__meta">
            {students.length} student{students.length === 1 ? '' : 's'} in view
          </p>
        </div>
      </header>

      {students.length === 0 ? (
        <p className="attendance-table-section__empty">No students match this filter.</p>
      ) : (
        <div className="attendance-table">
          <div className="attendance-table__head" role="row">
            <span className="attendance-table__cell attendance-table__cell--student" role="columnheader">
              Student
            </span>
            <span className="attendance-table__cell attendance-table__cell--class" role="columnheader">
              Class
            </span>
            <span className="attendance-table__cell attendance-table__cell--checkin" role="columnheader">
              Check-in
            </span>
            <span className="attendance-table__cell attendance-table__cell--weekly" role="columnheader">
              Weekly rate
            </span>
            <span className="attendance-table__cell attendance-table__cell--status" role="columnheader">
              Status
            </span>
          </div>

          {students.map((student) => (
            <div key={student.id} className="attendance-table__row" role="row">
              <span className="attendance-table__cell attendance-table__cell--student" role="cell">
                <Avatar name={student.name} tone={student.tone} />
                <span className="attendance-table__person">
                  <span className="attendance-table__name">{student.name}</span>
                  <span className="attendance-table__email">{student.email}</span>
                </span>
              </span>
              <span className="attendance-table__cell attendance-table__cell--class" role="cell">
                {student.className}
              </span>
              <span className="attendance-table__cell attendance-table__cell--checkin" role="cell">
                {student.checkIn}
              </span>
              <span className="attendance-table__cell attendance-table__cell--weekly" role="cell">
                <span className="attendance-table__weekly">
                  <ProgressBar value={student.weeklyRate} />
                  <span className="attendance-table__weekly-value">{student.weeklyRate}%</span>
                </span>
              </span>
              <span className="attendance-table__cell attendance-table__cell--status" role="cell">
                <AttendanceStatusChip status={student.status} />
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
