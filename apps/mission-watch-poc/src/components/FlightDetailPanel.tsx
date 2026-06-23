import {
  AttentionChip,
  ButtonCompact,
  CriticalChip,
  DefaultChip,
  LabelValueVertical,
  WarningChip,
} from 'orbit-ds-components';

import {
  formatResultDate,
  formatResultTime,
  weatherAtAirport,
  type ResultRow,
} from '@shared/resultsData';

import { RiskLevelChip } from './rotationUi';
import './FlightDetailPanel.css';

type FlightDetailPanelProps = {
  row: ResultRow;
  onClose: () => void;
};

function WeatherBlock({
  airport,
  label,
  weather,
}: {
  airport: string;
  label: string;
  weather: ReturnType<typeof weatherAtAirport>;
}) {
  const wind =
    weather.windDirectionInDegrees != null && weather.windSpeedInKnots != null
      ? `${weather.windDirectionInDegrees}°/${weather.windSpeedInKnots}kt`
      : '—';
  const vis = weather.visibilityInMeter != null ? `${weather.visibilityInMeter}m` : '—';
  const temp =
    weather.airTemperatureInCelsius != null
      ? `${weather.airTemperatureInCelsius}°C`
      : weather.maxAirTemperatureInCelsius != null
        ? `${weather.maxAirTemperatureInCelsius}°C`
        : '—';

  return (
    <div className="mw-detail-weather">
      <h3 className="mw-detail-weather__title">
        {label} · {airport}
      </h3>
      <div className="mw-detail-weather__grid">
        <LabelValueVertical layout="L+V" label="Wind" value={wind} />
        <LabelValueVertical layout="L+V" label="Visibility" value={vis} />
        <LabelValueVertical layout="L+V" label="Temp" value={temp} />
      </div>
    </div>
  );
}

export function FlightDetailPanel({ row, onClose }: FlightDetailPanelProps) {
  const depWeather = weatherAtAirport(row.flags, row.origin);
  const arrWeather = weatherAtAirport(row.flags, row.destination);

  return (
    <section className="mw-detail-panel mw-section" aria-label={`Details for ${row.flightNumber}`}>
      <header className="mw-detail-panel__toolbar">
        <LabelValueVertical layout="L+V" label="Selected flight" value={row.flightNumber} />
        <ButtonCompact variant="secondary" minWidth={false} onClick={onClose}>
          Close
        </ButtonCompact>
      </header>

      <div className="mw-detail-panel__body">
        <div className="mw-detail-panel__summary">
          <div className="mw-detail-panel__title-row">
            <LabelValueVertical layout="V + L" value={row.flightNumber} label="Flight" big />
            <div className="mw-detail-panel__badges">
              <RiskLevelChip
                level={row.riskLevel === 'critical' ? 'critical' : 'warning'}
                label={row.riskLevel === 'critical' ? 'HIGH' : 'MEDIUM'}
              />
              {row.tier === 'URGENT' ? (
                <CriticalChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
                  URGENT
                </CriticalChip>
              ) : (
                <WarningChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
                  {row.tier}
                </WarningChip>
              )}
            </div>
          </div>
          <LabelValueVertical
            layout="L+V"
            label="Route"
            value={`${row.origin} → ${row.destination}`}
          />
          <div className="mw-detail-panel__times">
            <LabelValueVertical
              layout="L+V"
              label="Departure (UTC)"
              value={`${formatResultDate(row.departureUtc)} · ${formatResultTime(row.departureUtc)}`}
            />
            <LabelValueVertical
              layout="L+V"
              label="Arrival (UTC)"
              value={`${formatResultDate(row.arrivalUtc)} · ${formatResultTime(row.arrivalUtc)}`}
            />
          </div>
        </div>

        <section className="mw-detail-panel__section">
          <h3 className="mw-detail-panel__section-title">Risk factors</h3>
          <ul className="mw-detail-panel__findings">
            {row.findings.map((finding) => (
              <li key={finding}>
                <AttentionChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
                  {finding}
                </AttentionChip>
              </li>
            ))}
          </ul>
        </section>

        <section className="mw-detail-panel__section">
          <h3 className="mw-detail-panel__section-title">Weather &amp; runway</h3>
          <WeatherBlock airport={row.origin} label="Departure" weather={depWeather} />
          <WeatherBlock airport={row.destination} label="Arrival" weather={arrWeather} />
        </section>

        {row.flags[0]?.dataSource === 'mock' && (
          <DefaultChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
            Mock weather data
          </DefaultChip>
        )}
      </div>
    </section>
  );
}
