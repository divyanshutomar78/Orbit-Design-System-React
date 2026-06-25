import { useMemo } from 'react';
import { ButtonCompact, ListingItem } from 'orbit-ds-components';

import { getTrackedAirports } from '../data/airports';
import { TRACKED_FLIGHTS } from '../data/flights';
import { CloseIcon } from './MapIcons';
import './SidePanel.css';

export interface AirportsPanelProps {
  selectedAirportIata?: string | null;
  onClose?: () => void;
  onSelectAirport?: (iata: string) => void;
}

export function AirportsPanel({
  selectedAirportIata = null,
  onClose,
  onSelectAirport,
}: AirportsPanelProps) {
  const airports = useMemo(() => getTrackedAirports(TRACKED_FLIGHTS), []);

  return (
    <aside className="side-panel" aria-label="Airports">
      <header className="side-panel__header">
        <h2 className="side-panel__title">Airports</h2>
        <div className="side-panel__header-actions">
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Close airports panel"
            leftIcon={<CloseIcon />}
            onClick={onClose}
          />
        </div>
      </header>

      <p className="side-panel__subtitle">{airports.length} airports in region</p>

      <div className="side-panel__body">
        {airports.map((airport) => (
          <ListingItem
            key={airport.iata}
            className={
              selectedAirportIata === airport.iata
                ? 'side-panel__row side-panel__row--selected'
                : 'side-panel__row'
            }
            multiLine
            reorderIcon={false}
            showLeftIcon={false}
            showRightIcon
            showHelper
            title={airport.iata}
            label={airport.name}
            value={airport.city}
            helper={`${airport.icao} · ${airport.activeFlights} active flight${airport.activeFlights === 1 ? '' : 's'}`}
            onClick={() => onSelectAirport?.(airport.iata)}
          />
        ))}
      </div>
    </aside>
  );
}
