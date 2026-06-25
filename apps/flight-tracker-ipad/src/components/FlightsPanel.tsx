import { ButtonCompact, ListingItem } from 'orbit-ds-components';

import { routeLabel } from '../data/airports';
import { TRACKED_FLIGHTS } from '../data/flights';
import { formatUtcTime } from '../utils/time';
import { CloseIcon } from './MapIcons';
import { FlightStatusChip, flightStatusSummary } from './FlightStatusChip';
import './SidePanel.css';

export interface FlightsPanelProps {
  selectedFlightId?: string | null;
  onClose?: () => void;
  onSelectFlight?: (flightId: string) => void;
}

export function FlightsPanel({
  selectedFlightId = null,
  onClose,
  onSelectFlight,
}: FlightsPanelProps) {
  return (
    <aside className="side-panel" aria-label="Tracked flights">
      <header className="side-panel__header">
        <h2 className="side-panel__title">Flights</h2>
        <div className="side-panel__header-actions">
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Close flights panel"
            leftIcon={<CloseIcon />}
            onClick={onClose}
          />
        </div>
      </header>

      <p className="side-panel__subtitle">{TRACKED_FLIGHTS.length} tracked flights</p>

      <div className="side-panel__body">
        {TRACKED_FLIGHTS.map((flight) => (
          <ListingItem
            key={flight.id}
            className={
              selectedFlightId === flight.id
                ? 'side-panel__row side-panel__row--selected'
                : 'side-panel__row'
            }
            multiLine
            reorderIcon={false}
            showLeftIcon={false}
            showRightIcon
            showHelper
            title={flight.flightNumber}
            label={routeLabel(flight.origin, flight.destination)}
            value={flightStatusSummary(flight.status)}
            helper={`${flight.airline} · Dep ${formatUtcTime(flight.departureUtc)} UTC`}
            addIconsComponent={<FlightStatusChip status={flight.status} />}
            onClick={() => onSelectFlight?.(flight.id)}
          />
        ))}
      </div>
    </aside>
  );
}
