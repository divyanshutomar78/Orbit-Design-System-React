import type { ScheduledFlight } from '@shared/types';
import './SchedulePanel.css';

type SchedulePanelProps = {
  flights: ScheduledFlight[];
  total: number;
};

function formatTime(iso: string) {
  return new Date(iso).toISOString().slice(11, 16);
}

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

export function SchedulePanel({ flights, total }: SchedulePanelProps) {
  return (
    <section className="mw-schedule mw-section">
      <header className="mw-schedule__header">
        <h2 className="mw-schedule__title">Simulated SSIM schedule</h2>
        <p className="mw-schedule__meta">
          IATA Summer 2026 · {total} flight instances across a 15-day horizon ·{' '}
          <a href="/api/schedule/ssim" target="_blank" rel="noreferrer">
            Download SSIM excerpt
          </a>
        </p>
      </header>

      <div className="mw-table-wrap">
        <table className="mw-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Flight</th>
              <th>Route</th>
              <th>Dep (UTC)</th>
              <th>Arr (UTC)</th>
              <th>Aircraft</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{formatDate(flight.departureUtc)}</td>
                <td>{flight.flightNumber}</td>
                <td>
                  {flight.origin} → {flight.destination}
                </td>
                <td>{formatTime(flight.departureUtc)}</td>
                <td>{formatTime(flight.arrivalUtc)}</td>
                <td>{flight.aircraft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > flights.length && (
        <p className="mw-schedule__more">Showing first {flights.length} of {total} instances.</p>
      )}
    </section>
  );
}
