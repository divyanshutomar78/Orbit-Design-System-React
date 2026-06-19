import type { ApiStatus, EvaluationSummary } from '@shared/types';
import { AlertIcon, CloudIcon, FlightIcon, RulesIcon } from './icons';
import './MissionWatchKpis.css';

type MissionWatchKpisProps = {
  evaluation: EvaluationSummary | null;
  status: ApiStatus | null;
};

export function MissionWatchKpis({ evaluation, status }: MissionWatchKpisProps) {
  const scanned = evaluation?.scannedFlights ?? status?.scheduleFlights;
  const flags = evaluation?.flaggedCount;
  const activeRules = evaluation?.rulesActive ?? status?.rulesCount;

  const weatherLabel = status?.dtnConnected
    ? 'DTN live'
    : status?.dtnConfigured
      ? 'DTN offline'
      : 'Mock data';

  const weatherCaption = evaluation?.weatherSource
    ? `Last scan: ${evaluation.weatherSource.toUpperCase()}`
    : 'Run a scan to fetch forecasts';

  return (
    <section className="mw-kpis" aria-label="Mission Watch summary">
      <article className="mw-kpi mw-kpi--action mw-section">
        <span className="mw-kpi__icon" aria-hidden>
          <FlightIcon />
        </span>
        <div className="mw-kpi__body">
          <span className="mw-kpi__label">Flights scanned</span>
          <span className="mw-kpi__value">{scanned ?? '—'}</span>
          <span className="mw-kpi__caption">15-day SSIM horizon</span>
        </div>
      </article>

      <article className="mw-kpi mw-kpi--critical mw-section">
        <span className="mw-kpi__icon" aria-hidden>
          <AlertIcon />
        </span>
        <div className="mw-kpi__body">
          <span className="mw-kpi__label">Risk flags</span>
          <span className="mw-kpi__value">{flags ?? '—'}</span>
          <span className="mw-kpi__caption">
            {flags != null && flags > 0 ? 'Needs review' : 'No active alerts'}
          </span>
        </div>
      </article>

      <article className="mw-kpi mw-kpi--attention mw-section">
        <span className="mw-kpi__icon" aria-hidden>
          <RulesIcon />
        </span>
        <div className="mw-kpi__body">
          <span className="mw-kpi__label">Active rules</span>
          <span className="mw-kpi__value">{activeRules ?? '—'}</span>
          <span className="mw-kpi__caption">Departure & arrival checks</span>
        </div>
      </article>

      <article className="mw-kpi mw-kpi--success mw-section">
        <span className="mw-kpi__icon" aria-hidden>
          <CloudIcon />
        </span>
        <div className="mw-kpi__body">
          <span className="mw-kpi__label">Weather source</span>
          <span className="mw-kpi__value mw-kpi__value--text">{weatherLabel}</span>
          <span className="mw-kpi__caption">{weatherCaption}</span>
        </div>
      </article>
    </section>
  );
}
