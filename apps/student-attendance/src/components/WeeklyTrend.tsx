import { weeklyTrend } from '../data/attendanceData';
import './WeeklyTrend.css';

export function WeeklyTrend() {
  const average = Math.round(
    weeklyTrend.reduce((sum, day) => sum + day.rate, 0) / weeklyTrend.length,
  );

  return (
    <section className="attendance-card weekly-trend" aria-label="Weekly attendance trend">
      <header className="weekly-trend__header">
        <div>
          <h2 className="weekly-trend__title">Weekly trend</h2>
          <p className="weekly-trend__meta">Daily attendance rate</p>
        </div>
        <div className="weekly-trend__average">
          <span className="weekly-trend__average-value">{average}%</span>
          <span className="weekly-trend__average-label">avg</span>
        </div>
      </header>

      <div className="weekly-trend__chart">
        {weeklyTrend.map((day) => (
          <div key={day.day} className="weekly-trend__col">
            <span className="weekly-trend__bar-value">{day.rate}%</span>
            <div className="weekly-trend__track">
              <span
                className="weekly-trend__bar"
                style={{ height: `${day.rate}%` }}
              />
            </div>
            <span className="weekly-trend__day">{day.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
