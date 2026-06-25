import { useState } from 'react';
import {
  ButtonCompact,
  defaultEWasNavBarFooterItem,
  defaultEWasNavBarPrimaryItems,
  defaultEWasNavBarUtilityItems,
  EWasNavBar,
} from 'orbit-ds-components';

import { AirportsPanel } from './components/AirportsPanel';
import { FirPanel } from './components/FirPanel';
import { FlightDetailsModal } from './components/FlightDetailsModal';
import { FlightsPanel } from './components/FlightsPanel';
import { MapLegend } from './components/MapLegend';
import { AircraftIcon, FirDocumentIcon } from './components/MapIcons';
import { MapToolbar } from './components/MapToolbar';
import { MapView } from './components/MapView';
import { TimelineControl } from './components/TimelineControl';
import { TRACKED_FLIGHTS } from './data/flights';
import './styles/FlightTrackerApp.css';

const [flightsNavItem, airportNavItem, optiNavItem] = defaultEWasNavBarPrimaryItems;

const PRIMARY_NAV_ITEMS = [
  flightsNavItem,
  airportNavItem,
  { id: 'fir', label: 'FIR', icon: <FirDocumentIcon /> },
  { ...optiNavItem, label: 'OptiFlight' },
];

const SIDE_PANEL_NAV_IDS = new Set(['flights', 'airport', 'fir']);

export function FlightTrackerApp() {
  const [activeNavId, setActiveNavId] = useState('fir');
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedAirportIata, setSelectedAirportIata] = useState<string | null>(null);

  const openFlightDetails = (flightId: string) => {
    setSelectedFlightId(flightId);
    setDetailsOpen(true);
  };

  const renderSidePanel = () => {
    if (!sidePanelOpen || !SIDE_PANEL_NAV_IDS.has(activeNavId)) return null;

    if (activeNavId === 'flights') {
      return (
        <FlightsPanel
          selectedFlightId={selectedFlightId}
          onClose={() => setSidePanelOpen(false)}
          onSelectFlight={openFlightDetails}
        />
      );
    }

    if (activeNavId === 'airport') {
      return (
        <AirportsPanel
          selectedAirportIata={selectedAirportIata}
          onClose={() => setSidePanelOpen(false)}
          onSelectAirport={setSelectedAirportIata}
        />
      );
    }

    return <FirPanel onClose={() => setSidePanelOpen(false)} />;
  };

  return (
    <div className="flight-tracker-app">
      <aside className="flight-tracker-app__nav">
        <EWasNavBar
          flight
          orientation="vertical"
          flightHeader={{
            primaryText: 'AA1234',
            secondaryText: 'EGLL-ZSPD',
          }}
          primaryItems={PRIMARY_NAV_ITEMS}
          utilityItems={defaultEWasNavBarUtilityItems}
          footerItem={defaultEWasNavBarFooterItem}
          activeItemId={activeNavId}
          onItemSelect={(id) => {
            if (!id) return;
            setActiveNavId(id);
            if (SIDE_PANEL_NAV_IDS.has(id)) {
              setSidePanelOpen(true);
            }
          }}
          allowDeselect={false}
        />
      </aside>

      <div className="flight-tracker-app__main">
        <div className="flight-tracker-app__content-row">
          {renderSidePanel()}
          <div className="flight-tracker-app__map-area">
            <MapView />
            <MapToolbar
              onCollapse={() => {
                if (SIDE_PANEL_NAV_IDS.has(activeNavId)) {
                  setSidePanelOpen((open) => !open);
                }
              }}
            />
            <MapLegend />
            <ButtonCompact
              variant="primary"
              minWidth={false}
              iconSize="big"
              aria-label="Flight details"
              leftIcon={<AircraftIcon />}
              className="flight-tracker-app__fab"
              onClick={() => setDetailsOpen(true)}
            />
          </div>
        </div>
        <TimelineControl />
      </div>

      <FlightDetailsModal
        open={detailsOpen}
        flights={TRACKED_FLIGHTS}
        selectedFlightId={selectedFlightId}
        onClose={() => setDetailsOpen(false)}
        onSelectFlight={setSelectedFlightId}
      />
    </div>
  );
}
