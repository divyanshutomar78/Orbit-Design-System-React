import type { MapSettings } from '../data/settings';
import './MapView.css';

/** Simplified Central Asia / Middle East land outlines for the dark map canvas. */
const LAND_PATHS = [
  'M 120 80 L 180 70 L 240 85 L 300 75 L 360 90 L 420 80 L 480 95 L 520 120 L 510 160 L 480 200 L 440 230 L 400 250 L 350 260 L 300 245 L 250 220 L 200 190 L 150 160 L 120 130 Z',
  'M 180 250 L 230 240 L 280 255 L 320 280 L 340 320 L 330 360 L 290 390 L 240 400 L 190 385 L 160 350 L 155 300 Z',
  'M 350 300 L 400 290 L 450 310 L 480 350 L 470 390 L 430 420 L 380 425 L 340 400 L 330 350 Z',
  'M 100 320 L 150 310 L 180 340 L 170 380 L 130 400 L 90 385 L 80 350 Z',
];

const FIR_ZONES = [
  { d: 'M 200 120 Q 280 100 360 130 T 440 180', color: 'var(--text-attention)' },
  { d: 'M 250 200 Q 320 180 400 210 T 460 280', color: 'var(--text-action)' },
  { d: 'M 180 280 Q 240 260 300 290', color: 'var(--text-secondary)', opacity: 0.5 },
];

const FLIGHT_PATH =
  'M 140 180 Q 220 150 300 170 T 420 220 T 480 300';

export interface MapViewProps {
  settings: MapSettings;
}

export function MapView({ settings }: MapViewProps) {
  return (
    <div
      className={
        settings.mapTheme === 'satellite'
          ? 'map-view map-view--satellite'
          : 'map-view'
      }
    >
      <svg
        className="map-view__svg"
        viewBox="0 0 600 480"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Flight map over Central Asia and Middle East"
      >
        <rect className="map-view__ocean" width="600" height="480" />

        {LAND_PATHS.map((path, index) => (
          <path key={index} className="map-view__land" d={path} />
        ))}

        {settings.showFirZones
          ? FIR_ZONES.map((zone, index) => (
              <path
                key={index}
                className="map-view__fir-zone"
                d={zone.d}
                stroke={zone.color}
                style={{ opacity: zone.opacity ?? 1 }}
              />
            ))
          : null}

        {settings.showFlightPath ? (
          <path className="map-view__flight-path" d={FLIGHT_PATH} />
        ) : null}

        {settings.showAffectedAreas ? (
          <circle className="map-view__affected-area" cx="360" cy="175" r="18" />
        ) : null}

        {settings.showAircraft ? (
          <g className="map-view__aircraft" transform="translate(300, 168) rotate(25)">
            <path d="M-10 0 L10 0 M0-6 L8 0 L0 6 Z" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}
