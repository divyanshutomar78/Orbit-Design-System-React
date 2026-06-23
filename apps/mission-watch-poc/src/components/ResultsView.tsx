import {
  AttentionChip,
  Button,
  CriticalChip,
  DefaultChip,
  InputSelect,
  LabelValueVertical,
  SuccessChip,
  WarningChip,
} from 'orbit-ds-components';
import { useMemo, useState } from 'react';

import type { EvaluationSummary, ScheduledFlight } from '@shared/types';
import {
  buildResultRows,
  countResultRisk,
  formatResultDate,
  formatResultTime,
  type ResultRow,
} from '@shared/resultsData';

import { FlightDetailPanel } from './FlightDetailPanel';
import { AlertIcon } from './icons';
import './ResultsView.css';

type ResultsViewProps = {
  schedule: ScheduledFlight[];
  evaluation: EvaluationSummary | null;
  loading?: boolean;
  onRunScan: () => void;
};

type RiskFilter = 'all' | 'critical' | 'warning';

function rowKey(row: ResultRow) {
  return row.id;
}

function RiskBadge({ level }: { level: ResultRow['riskLevel'] }) {
  if (level === 'critical') {
    return (
      <CriticalChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
        HIGH
      </CriticalChip>
    );
  }
  return (
    <WarningChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
      MEDIUM
    </WarningChip>
  );
}

function TierBadge({ tier }: { tier: ResultRow['tier'] }) {
  if (tier === 'URGENT') {
    return (
      <CriticalChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
        URGENT
      </CriticalChip>
    );
  }
  return (
    <DefaultChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
      {tier}
    </DefaultChip>
  );
}

export function ResultsView({ schedule, evaluation, loading, onRunScan }: ResultsViewProps) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [depFilter, setDepFilter] = useState('all');
  const [arrFilter, setArrFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = useMemo(
    () => buildResultRows(evaluation?.flags ?? [], schedule),
    [evaluation, schedule],
  );

  const counts = useMemo(() => countResultRisk(rows), [rows]);
  const scannedTotal = evaluation?.scannedFlights ?? schedule.length;

  const depAirports = useMemo(
    () => ['all', ...new Set(rows.map((r) => r.origin))].sort(),
    [rows],
  );
  const arrAirports = useMemo(
    () => ['all', ...new Set(rows.map((r) => r.destination))].sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (riskFilter !== 'all' && row.riskLevel !== riskFilter) return false;
      if (depFilter !== 'all' && row.origin !== depFilter) return false;
      if (arrFilter !== 'all' && row.destination !== arrFilter) return false;
      if (!query) return true;
      return (
        row.flightNumber.toLowerCase().includes(query) ||
        row.origin.toLowerCase().includes(query) ||
        row.destination.toLowerCase().includes(query) ||
        row.findings.some((f) => f.toLowerCase().includes(query))
      );
    });
  }, [rows, search, riskFilter, depFilter, arrFilter]);

  const selectedRow = useMemo(
    () => rows.find((r) => rowKey(r) === selectedId) ?? null,
    [rows, selectedId],
  );

  const handleRowSelect = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  const airportOptions = (codes: string[]) =>
    codes.map((code) => ({ value: code, label: code === 'all' ? 'All airports' : code }));

  if (!loading && !rows.length) {
    return (
      <section className="mw-results mw-section">
        <div className="mw-results__empty">
          <span className="mw-results__empty-icon" aria-hidden>
            <AlertIcon />
          </span>
          <LabelValueVertical
            layout="V + L"
            value="No results yet"
            label="Run analysis to compare your SSIM schedule against hourly weather and surface flagged flights."
          />
          <Button variant="primary" onClick={onRunScan}>
            Run analysis
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mw-results mw-section" aria-label="Analysis results">
      <header className="mw-results__top">
        <div className="mw-results__stats">
          <LabelValueVertical layout="L+V" label="Flights scanned" value={String(scannedTotal)} />
          {counts.high > 0 && (
            <div className="mw-results__stat-chip">
              <CriticalChip type="chip" size="compact" showIcon={false}>
                {counts.high} HIGH
              </CriticalChip>
            </div>
          )}
          {counts.medium > 0 && (
            <div className="mw-results__stat-chip">
              <WarningChip type="chip" size="compact" showIcon={false}>
                {counts.medium} MEDIUM
              </WarningChip>
            </div>
          )}
          {scannedTotal - counts.total > 0 && (
            <div className="mw-results__stat-chip">
              <SuccessChip type="chip" size="compact" showIcon={false}>
                {scannedTotal - counts.total} OK
              </SuccessChip>
            </div>
          )}
        </div>
        <Button variant="primary" onClick={onRunScan} disabled={loading}>
          {loading ? 'Analyzing…' : 'Run analysis'}
        </Button>
      </header>

      <div className="mw-results__filters">
        <label className="mw-results__search">
          <span className="mw-results__search-label">Search</span>
          <input
            type="search"
            className="mw-results__search-input"
            placeholder="Flight, airport, route, finding…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <InputSelect
          className="mw-results__filter-select"
          label="Risk level"
          showLabelInfo={false}
          showHelper={false}
          showBottomSpaceHelper={false}
          value={riskFilter}
          onValueChange={(v) => setRiskFilter(v as RiskFilter)}
          options={[
            { value: 'all', label: 'All levels' },
            { value: 'critical', label: 'High' },
            { value: 'warning', label: 'Medium' },
          ]}
        />
        <InputSelect
          className="mw-results__filter-select"
          label="Departure"
          showLabelInfo={false}
          showHelper={false}
          showBottomSpaceHelper={false}
          value={depFilter}
          onValueChange={setDepFilter}
          options={airportOptions(depAirports)}
        />
        <InputSelect
          className="mw-results__filter-select"
          label="Arrival"
          showLabelInfo={false}
          showHelper={false}
          showBottomSpaceHelper={false}
          value={arrFilter}
          onValueChange={setArrFilter}
          options={airportOptions(arrAirports)}
        />
      </div>

      {loading && (
        <div className="mw-results__loading">
          <AttentionChip type="chip" size="compact" showIcon={false}>
            Running analysis…
          </AttentionChip>
        </div>
      )}

      {selectedRow && (
        <FlightDetailPanel row={selectedRow} onClose={() => setSelectedId(null)} />
      )}

      <div className="mw-results__table-area mw-section">
          <div className="mw-results__table-meta">
            <LabelValueVertical
              layout="L+V"
              label="Showing"
              value={`${filtered.length} of ${rows.length} flagged flights`}
            />
          </div>

          <div className="mw-results__table-wrap">
            <table className="mw-results-table">
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Tier</th>
                  <th>Flight</th>
                  <th>Date</th>
                  <th>Route</th>
                  <th>STD</th>
                  <th>STA</th>
                  <th>A/C</th>
                  <th>Findings</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const selected = selectedId === rowKey(row);
                  return (
                    <tr
                      key={rowKey(row)}
                      className={selected ? 'mw-results-table__row--selected' : undefined}
                      tabIndex={0}
                      onClick={() => handleRowSelect(rowKey(row))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleRowSelect(rowKey(row));
                        }
                      }}
                    >
                      <td>
                        <RiskBadge level={row.riskLevel} />
                      </td>
                      <td>
                        <TierBadge tier={row.tier} />
                      </td>
                      <td className="mw-results-table__flight">{row.flightNumber}</td>
                      <td>{formatResultDate(row.departureUtc)}</td>
                      <td>
                        <span className="mw-results-table__route">
                          {row.origin}
                          <span aria-hidden> → </span>
                          {row.destination}
                        </span>
                      </td>
                      <td>{formatResultTime(row.departureUtc)}</td>
                      <td>{formatResultTime(row.arrivalUtc)}</td>
                      <td>{row.aircraft}</td>
                      <td>
                        <div className="mw-results-table__findings">
                          {row.findings.slice(0, 2).map((finding) => (
                            <AttentionChip
                              key={finding}
                              type="tag"
                              size="compact"
                              showIcon={false}
                              className="mw-status-chip"
                            >
                              {finding}
                            </AttentionChip>
                          ))}
                          {row.findings.length > 2 && (
                            <DefaultChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
                              +{row.findings.length - 2} more
                            </DefaultChip>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </section>
  );
}
