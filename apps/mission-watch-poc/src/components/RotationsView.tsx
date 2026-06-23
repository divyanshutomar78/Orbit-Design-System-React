import {
  AttentionChip,
  Button,
  ButtonCompact,
  InputSelect,
  LabelValueVertical,
  Tooltip,
} from 'orbit-ds-components';
import { useMemo, useState, type CSSProperties } from 'react';

import type { EvaluationSummary, ScheduledFlight } from '@shared/types';
import {
  barPosition,
  buildTimelineFlights,
  countRiskLevels,
  dayTicks,
  filterFlightsInRange,
  flightsForTail,
  formatUtcDay,
  formatUtcTime,
  sixHourTicks,
  tickPosition,
  type FlightRiskLevel,
  type TimelineFlight,
  uniqueTails,
} from '@shared/rotationTimeline';

import { RotationFlightDetail } from './RotationFlightDetail';
import { RiskFilterChip, RiskLevelChip } from './rotationUi';
import './RotationsView.css';

type RotationsViewProps = {
  schedule: ScheduledFlight[];
  evaluation: EvaluationSummary | null;
  loading?: boolean;
  onRunScan: () => void;
};

type RiskFilter = 'all' | FlightRiskLevel;

const DAY_OPTIONS = [
  { value: '3', label: '3 days' },
  { value: '5', label: '5 days' },
  { value: '7', label: '7 days' },
] as const;

const RISK_FILTERS: RiskFilter[] = ['all', 'critical', 'warning', 'ok', 'scheduled'];

function FlightBar({
  flight,
  selected,
  leftPct,
  widthPct,
  onSelect,
}: {
  flight: TimelineFlight;
  selected: boolean;
  leftPct: number;
  widthPct: number;
  onSelect: (additive: boolean) => void;
}) {
  const tooltip = `${flight.origin} → ${flight.destination} · ${formatUtcTime(flight.departureUtc)}–${formatUtcTime(flight.arrivalUtc)} UTC`;

  return (
    <div
      className="mw-rotations__bar-wrap"
      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
    >
      <Tooltip
        text={tooltip}
        direction="right"
        trigger={
          <button
            type="button"
            className={`mw-rotations__bar mw-rotations__bar--${flight.riskLevel} ${selected ? 'mw-rotations__bar--selected' : ''}`}
            aria-pressed={selected}
            aria-label={`${flight.flightNumber}, ${tooltip}`}
            onClick={(e) => onSelect(e.shiftKey)}
          >
            <span className="mw-rotations__bar-label">{flight.flightNumber}</span>
          </button>
        }
      />
    </div>
  );
}

export function RotationsView({ schedule, evaluation, loading, onRunScan }: RotationsViewProps) {
  const [visibleDays, setVisibleDays] = useState<(typeof DAY_OPTIONS)[number]['value']>('5');
  const [dayOffset, setDayOffset] = useState(0);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const scanned = evaluation != null;
  const allFlights = useMemo(
    () => buildTimelineFlights(schedule, evaluation?.flags ?? [], scanned),
    [schedule, evaluation, scanned],
  );

  const horizonStart = useMemo(() => {
    if (!schedule.length) return new Date('2026-07-15T00:00:00Z');
    return new Date(`${schedule[0].departureUtc.slice(0, 10)}T00:00:00Z`);
  }, [schedule]);

  const rangeStart = useMemo(() => {
    const d = new Date(horizonStart);
    d.setUTCDate(d.getUTCDate() + dayOffset);
    return d;
  }, [horizonStart, dayOffset]);

  const rangeEnd = useMemo(() => {
    const d = new Date(rangeStart);
    d.setUTCDate(d.getUTCDate() + Number(visibleDays));
    return d;
  }, [rangeStart, visibleDays]);

  const visibleFlights = useMemo(() => {
    let flights = filterFlightsInRange(allFlights, rangeStart, rangeEnd);
    if (riskFilter !== 'all') {
      flights = flights.filter((f) => f.riskLevel === riskFilter);
    }
    return flights;
  }, [allFlights, rangeStart, rangeEnd, riskFilter]);

  const counts = useMemo(
    () => countRiskLevels(filterFlightsInRange(allFlights, rangeStart, rangeEnd)),
    [allFlights, rangeStart, rangeEnd],
  );

  const tails = useMemo(() => uniqueTails(visibleFlights), [visibleFlights]);
  const hourTicks = useMemo(() => sixHourTicks(rangeStart, Number(visibleDays)), [rangeStart, visibleDays]);
  const dayLabels = useMemo(() => dayTicks(rangeStart, Number(visibleDays)), [rangeStart, visibleDays]);
  const maxDayOffset = Math.max(0, 15 - Number(visibleDays));

  const selectedFlights = useMemo(
    () => allFlights.filter((f) => selectedIds.includes(f.id)),
    [allFlights, selectedIds],
  );

  const toggleSelect = (flight: TimelineFlight, additive: boolean) => {
    setSelectedIds((prev) => {
      if (additive) {
        if (prev.includes(flight.id)) return prev.filter((id) => id !== flight.id);
        return [...prev, flight.id];
      }
      if (prev.length === 1 && prev[0] === flight.id) return [];
      return [flight.id];
    });
  };

  const nowPct = useMemo(() => {
    if (!evaluation) return null;
    const now = new Date(evaluation.evaluatedAt);
    if (now < rangeStart || now > rangeEnd) return null;
    return tickPosition(now, rangeStart, rangeEnd);
  }, [evaluation, rangeStart, rangeEnd]);

  if (!schedule.length) {
    return (
      <section className="mw-rotations mw-section">
        <p className="mw-rotations__empty">No schedule loaded.</p>
      </section>
    );
  }

  return (
    <section className="mw-rotations mw-section" aria-label="Rotations timeline">
      <header className="mw-rotations__header">
        <LabelValueVertical
          layout="V + L"
          value="Rotations"
          label={`${counts.total} flights · ${tails.length} aircraft in view`}
          big
        />

        <div className="mw-rotations__summary" role="group" aria-label="Risk summary">
          {counts.critical > 0 && (
            <RiskLevelChip level="critical" label={`${counts.critical} HIGH`} />
          )}
          {counts.warning > 0 && (
            <RiskLevelChip level="warning" label={`${counts.warning} MEDIUM`} />
          )}
          {counts.ok > 0 && <RiskLevelChip level="ok" label={`${counts.ok} OK`} />}
          {counts.scheduled > 0 && (
            <RiskLevelChip level="scheduled" label={`${counts.scheduled} SCHED`} />
          )}
        </div>
      </header>

      <div className="mw-rotations__controls">
        <InputSelect
          className="mw-rotations__window-select"
          label="Window"
          showLabelInfo={false}
          showHelper={false}
          showBottomSpaceHelper={false}
          value={visibleDays}
          onValueChange={setVisibleDays}
          options={[...DAY_OPTIONS]}
        />

        <div className="mw-rotations__range">
          <ButtonCompact
            variant="secondary"
            disabled={dayOffset <= 0}
            onClick={() => setDayOffset((offset) => Math.max(0, offset - 1))}
          >
            Previous
          </ButtonCompact>
          <LabelValueVertical
            layout="L+V"
            label="Visible range (UTC)"
            value={`${formatUtcDay(rangeStart.toISOString())} — ${formatUtcDay(rangeEnd.toISOString())}`}
          />
          <ButtonCompact
            variant="secondary"
            disabled={dayOffset >= maxDayOffset}
            onClick={() => setDayOffset((offset) => Math.min(maxDayOffset, offset + 1))}
          >
            Next
          </ButtonCompact>
        </div>

        <div className="mw-rotations__filters" role="group" aria-label="Filter by risk">
          {RISK_FILTERS.map((level) => (
            <RiskFilterChip
              key={level}
              level={level}
              selected={riskFilter === level}
              onSelect={() => setRiskFilter(level)}
            />
          ))}
        </div>
      </div>

      {loading && (
        <div className="mw-rotations__loading">
          <AttentionChip type="chip" size="compact" showIcon={false}>
            Scanning schedule…
          </AttentionChip>
        </div>
      )}

      {!scanned && !loading && (
        <div className="mw-rotations__banner">
          <LabelValueVertical
            layout="V + L"
            value="Analysis not run yet"
            label="Run a scan to color-code flights by weather risk on the timeline."
          />
          <Button variant="primary" onClick={onRunScan}>
            Run 15-day scan
          </Button>
        </div>
      )}

      <div className="mw-rotations__workspace">
        <aside className="mw-rotations__sidebar">
          <div className="mw-rotations__sidebar-head">
            <LabelValueVertical
              layout="L+V"
              label="Selection"
              value={`${selectedFlights.length} flight${selectedFlights.length === 1 ? '' : 's'}`}
            />
            {selectedFlights.length > 0 && (
              <ButtonCompact variant="secondary" minWidth={false} onClick={() => setSelectedIds([])}>
                Clear
              </ButtonCompact>
            )}
          </div>

          {selectedFlights.length === 0 ? (
            <div className="mw-rotations__sidebar-hint">
              <LabelValueVertical
                layout="V + L"
                value="Select flights on the timeline"
                label="Click a bar for details. Shift+click to compare multiple flights."
              />
            </div>
          ) : (
            <div className="mw-rotations__details">
              {selectedFlights.map((flight) => (
                <RotationFlightDetail
                  key={flight.id}
                  flight={flight}
                  onRemove={() => setSelectedIds((ids) => ids.filter((id) => id !== flight.id))}
                />
              ))}
            </div>
          )}
        </aside>

        <div className="mw-rotations__gantt-wrap">
          <div
            className="mw-rotations__gantt"
            style={{ '--mw-days': Number(visibleDays) } as CSSProperties}
          >
            <div className="mw-rotations__gantt-axis">
              <div className="mw-rotations__gantt-corner">Aircraft</div>
              <div className="mw-rotations__gantt-timecol">
                <div className="mw-rotations__gantt-days">
                  {dayLabels.slice(0, -1).map((day) => (
                    <span
                      key={day.toISOString()}
                      className="mw-rotations__day"
                      style={{
                        left: `${tickPosition(day, rangeStart, rangeEnd)}%`,
                        width: `${100 / Number(visibleDays)}%`,
                      }}
                    >
                      {formatUtcDay(day.toISOString())}
                    </span>
                  ))}
                </div>
                <div className="mw-rotations__gantt-times">
                  {hourTicks.map((tick) => (
                    <span
                      key={tick.toISOString()}
                      className="mw-rotations__tick"
                      style={{ left: `${tickPosition(tick, rangeStart, rangeEnd)}%` }}
                    >
                      {formatUtcTime(tick.toISOString())}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mw-rotations__gantt-body">
              {nowPct != null && (
                <div className="mw-rotations__now-overlay" aria-hidden>
                  <div className="mw-rotations__now" style={{ left: `${nowPct}%` }} />
                </div>
              )}

              {tails.length === 0 ? (
                <p className="mw-rotations__no-rows">
                  No flights in this window. Try another date range or clear the risk filter.
                </p>
              ) : (
                tails.map((tail) => (
                  <div key={tail} className="mw-rotations__row">
                    <div className="mw-rotations__tail">{tail}</div>
                    <div className="mw-rotations__lane">
                      {hourTicks.map((tick) => (
                        <div
                          key={tick.toISOString()}
                          className="mw-rotations__grid-line"
                          style={{ left: `${tickPosition(tick, rangeStart, rangeEnd)}%` }}
                        />
                      ))}

                      {flightsForTail(visibleFlights, tail).map((flight) => {
                        const { leftPct, widthPct } = barPosition(flight, rangeStart, rangeEnd);
                        return (
                          <FlightBar
                            key={flight.id}
                            flight={flight}
                            selected={selectedIds.includes(flight.id)}
                            leftPct={leftPct}
                            widthPct={widthPct}
                            onSelect={(additive) => toggleSelect(flight, additive)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mw-rotations__legend" role="group" aria-label="Timeline legend">
        <RiskLevelChip level="critical" label="High risk" />
        <RiskLevelChip level="warning" label="Medium" />
        <RiskLevelChip level="ok" label="OK" />
        <RiskLevelChip level="scheduled" label="Not scanned" />
      </div>
    </section>
  );
}
