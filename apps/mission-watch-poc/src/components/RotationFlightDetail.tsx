import {
  AttentionChip,
  ButtonCompact,
  CriticalChip,
  LabelValueVertical,
  ListingItem,
  SuccessChip,
  WarningChip,
} from 'orbit-ds-components';

import { formatUtcTime, mergeWeather, type TimelineFlight } from '@shared/rotationTimeline';

import { RiskLevelChip } from './rotationUi';

type RotationFlightDetailProps = {
  flight: TimelineFlight;
  onRemove: () => void;
};

function alertChip(flight: TimelineFlight) {
  const primaryFlag = flight.flags[0];
  if (!primaryFlag) {
    return (
      <SuccessChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
        Clear
      </SuccessChip>
    );
  }
  if (flight.riskLevel === 'critical') {
    return (
      <CriticalChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
        {primaryFlag.ruleName}
      </CriticalChip>
    );
  }
  return (
    <WarningChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
      {primaryFlag.ruleName}
    </WarningChip>
  );
}

export function RotationFlightDetail({ flight, onRemove }: RotationFlightDetailProps) {
  const weather = mergeWeather(flight.flags);

  const wind =
    weather.windDirectionInDegrees != null && weather.windSpeedInKnots != null
      ? `${weather.windDirectionInDegrees}°/${weather.windSpeedInKnots} kt`
      : '—';
  const gusts = weather.windGustInKnots != null ? `${weather.windGustInKnots} kt` : '—';
  const vis =
    weather.visibilityInMeter != null ? `${(Number(weather.visibilityInMeter) / 1000).toFixed(1)} km` : '—';
  const pressure =
    weather.airPressureAtSeaLevelInHectoPascal != null
      ? `${weather.airPressureAtSeaLevelInHectoPascal} hPa`
      : '—';
  const temp =
    weather.airTemperatureInCelsius != null ? `${weather.airTemperatureInCelsius}°C` : '—';
  const humidity =
    weather.relativeHumidityInPercent != null ? `${weather.relativeHumidityInPercent}%` : '—';

  const lowVis = weather.visibilityInMeter != null && Number(weather.visibilityInMeter) < 2000;

  return (
    <div className="mw-rotation-detail">
      <ListingItem
        multiLine
        reorderIcon={false}
        showLeftIcon={false}
        showRightIcon={false}
        showLabelValue={false}
        labelValue={
          <div className="mw-rotation-detail__content">
            <div className="mw-rotation-detail__head">
              <LabelValueVertical
                layout="V + L"
                value={flight.flightNumber}
                label={`${flight.origin} → ${flight.destination} · ${flight.tail} · ${formatUtcTime(flight.departureUtc)} UTC`}
              />
              <div className="mw-rotation-detail__chips">
                <RiskLevelChip
                  level={flight.riskLevel}
                  label={
                    flight.riskLevel === 'critical'
                      ? 'URGENT'
                      : flight.riskLevel === 'warning'
                        ? 'MEDIUM'
                        : flight.riskLevel === 'ok'
                          ? 'OK'
                          : 'SCHEDULED'
                  }
                />
                {flight.flags[0]?.dataSource === 'mock' && (
                  <AttentionChip type="tag" size="compact" showIcon={false} className="mw-status-chip">
                    Mock weather
                  </AttentionChip>
                )}
              </div>
            </div>
            <div className="mw-rotation-detail__alert">{alertChip(flight)}</div>
            <div className={`mw-rotation-detail__stats ${lowVis ? 'mw-rotation-detail__stats--alert' : ''}`}>
              <LabelValueVertical layout="L+V" label="Wind" value={wind} />
              <LabelValueVertical layout="L+V" label="Gusts" value={gusts} />
              <LabelValueVertical layout="L+V" label="Visibility" value={vis} />
              <LabelValueVertical layout="L+V" label="Pressure" value={pressure} />
              <LabelValueVertical layout="L+V" label="Temp" value={temp} />
              <LabelValueVertical layout="L+V" label="Humidity" value={humidity} />
            </div>
          </div>
        }
        addIconsComponent={
          <ButtonCompact variant="tertiary" minWidth={false} onClick={onRemove}>
            Close
          </ButtonCompact>
        }
      />
    </div>
  );
}
