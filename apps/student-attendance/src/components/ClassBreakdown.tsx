import type { ClassSummary } from '../data/attendanceData';
import { ProgressBar } from './ProgressBar';
import './ClassBreakdown.css';

export interface ClassBreakdownProps {
  classes: ClassSummary[];
}

function ClassRow({ item }: { item: ClassSummary }) {
  return (
    <article className="class-row">
      <div className="class-row__top">
        <span className="class-row__name">{item.name}</span>
        <span className="class-row__rate">{item.rate}%</span>
      </div>
      <ProgressBar value={item.rate} />
      <p className="class-row__meta">
        {item.present} present · {item.absent} absent · {item.enrolled} enrolled
      </p>
    </article>
  );
}

export function ClassBreakdown({ classes }: ClassBreakdownProps) {
  return (
    <section className="attendance-card class-breakdown" aria-label="Attendance by class">
      <header className="class-breakdown__header">
        <h2 className="class-breakdown__title">Class breakdown</h2>
        <p className="class-breakdown__meta">Snapshot for today</p>
      </header>

      <div className="class-breakdown__list">
        {classes.map((item) => (
          <ClassRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export function ClassBreakdownGrid({ classes }: ClassBreakdownProps) {
  return (
    <div className="class-breakdown-grid">
      {classes.map((item) => (
        <section key={item.id} className="attendance-card class-card">
          <header className="class-card__header">
            <h3 className="class-card__title">{item.name}</h3>
            <span className="class-card__rate">{item.rate}%</span>
          </header>
          <ProgressBar value={item.rate} />
          <div className="class-card__stats">
            <div className="class-card__stat">
              <span className="class-card__stat-value">{item.present}</span>
              <span className="class-card__stat-label">Present</span>
            </div>
            <div className="class-card__stat">
              <span className="class-card__stat-value">{item.absent}</span>
              <span className="class-card__stat-label">Absent</span>
            </div>
            <div className="class-card__stat">
              <span className="class-card__stat-value">{item.enrolled}</span>
              <span className="class-card__stat-label">Enrolled</span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
