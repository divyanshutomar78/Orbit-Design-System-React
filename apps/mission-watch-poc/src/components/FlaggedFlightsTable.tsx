import { AttentionChip, Button, DefaultChip, WarningChip } from 'orbit-ds-components';
import { useMemo, useState } from 'react';

import type { FlaggedFlight } from '@shared/types';
import { AlertIcon } from './icons';
import './FlaggedFlightsTable.css';

type FlaggedFlightsTableProps = {
  flags: FlaggedFlight[];
  loading?: boolean;
  onRunScan: () => void;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

function weatherSummary(flag: FlaggedFlight) {
  const parts: string[] = [];
  const w = flag.weather;

  if (w.maxAirTemperatureInCelsius != null) {
    parts.push(`${w.maxAirTemperatureInCelsius}°C`);
  }
  if (w.windDirectionInDegrees != null && w.windSpeedInKnots != null) {
    parts.push(`${w.windDirectionInDegrees}°/${w.windSpeedInKnots}kt`);
  }
  if (w.precipitationProbabilityInPercent != null) {
    parts.push(`${w.precipitationProbabilityInPercent}% precip`);
  }
  if (w.snowAmountInCentimeter != null && Number(w.snowAmountInCentimeter) > 0) {
    parts.push(`${w.snowAmountInCentimeter}cm snow`);
  }
  if (w.visibilityInMeter != null && Number(w.visibilityInMeter) < 2000) {
    parts.push(`${w.visibilityInMeter}m vis`);
  }

  return parts.join(' · ') || 'See rule conditions';
}

export function FlaggedFlightsTable({ flags, loading, onRunScan }: FlaggedFlightsTableProps) {
  const [airportFilter, setAirportFilter] = useState('all');

  const airports = useMemo(() => {
    const set = new Set(flags.map((flag) => flag.airport));
    return Array.from(set).sort();
  }, [flags]);

  const filtered = useMemo(
    () =>
      airportFilter === 'all'
        ? flags
        : flags.filter((flag) => flag.airport === airportFilter),
    [airportFilter, flags],
  );

  if (!flags.length && !loading) {
    return (
      <section className="mw-flags mw-section">
        <div className="mw-empty-state">
          <span className="mw-empty-state__icon" aria-hidden>
            <AlertIcon />
          </span>
          <h2 className="mw-empty-state__title">No risk flags yet</h2>
          <p className="mw-empty-state__text">
            Run a 15-day scan to compare your SSIM schedule against hourly weather and surface
            flights that breach your rules.
          </p>
          <Button variant="primary" onClick={onRunScan}>
            Run 15-day scan
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mw-flags mw-section">
      <header className="mw-flags__header">
        <div>
          <h2 className="mw-flags__title">Flagged flights</h2>
          <p className="mw-flags__meta">
            {filtered.length} of {flags.length} flags
            {airportFilter !== 'all' ? ` at ${airportFilter}` : ''}
          </p>
        </div>
        {airports.length > 1 && (
          <div className="mw-flags__filters" role="group" aria-label="Filter by airport">
            <button
              type="button"
              className={`mw-filter ${airportFilter === 'all' ? 'mw-filter--active' : ''}`}
              onClick={() => setAirportFilter('all')}
            >
              All
            </button>
            {airports.map((airport) => (
              <button
                key={airport}
                type="button"
                className={`mw-filter ${airportFilter === airport ? 'mw-filter--active' : ''}`}
                onClick={() => setAirportFilter(airport)}
              >
                {airport}
              </button>
            ))}
          </div>
        )}
      </header>

      {loading ? (
        <p className="mw-flags__loading">Scanning schedule against weather forecasts…</p>
      ) : (
        <div className="mw-table-wrap">
          <table className="mw-table">
            <thead>
              <tr>
                <th>Flight</th>
                <th>Route</th>
                <th>Checkpoint</th>
                <th>Scheduled (UTC)</th>
                <th>Risk</th>
                <th>Weather snapshot</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((flag) => (
                <tr key={`${flag.flightId}-${flag.ruleId}-${flag.checkPoint}`}>
                  <td className="mw-table__flight">{flag.flightNumber}</td>
                  <td>
                    <span className="mw-table__route">
                      {flag.origin}
                      <span className="mw-table__arrow" aria-hidden>
                        →
                      </span>
                      {flag.destination}
                    </span>
                  </td>
                  <td>
                    <span className="mw-table__checkpoint">
                      {flag.checkPoint} · {flag.airport}
                    </span>
                  </td>
                  <td>{formatTime(flag.scheduledTimeUtc)}</td>
                  <td>
                    <div className="mw-table__risk">
                      <WarningChip
                        type="tag"
                        size="compact"
                        showIcon={false}
                        className="mw-status-chip"
                      >
                        {flag.riskCategory}
                      </WarningChip>
                      <span className="mw-table__rule-name">{flag.ruleName}</span>
                    </div>
                  </td>
                  <td className="mw-table__weather">{weatherSummary(flag)}</td>
                  <td>
                    {flag.dataSource === 'dtn' ? (
                      <DefaultChip
                        type="tag"
                        size="compact"
                        showIcon={false}
                        className="mw-status-chip"
                      >
                        DTN
                      </DefaultChip>
                    ) : (
                      <AttentionChip
                        type="tag"
                        size="compact"
                        showIcon={false}
                        className="mw-status-chip"
                      >
                        Mock
                      </AttentionChip>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
