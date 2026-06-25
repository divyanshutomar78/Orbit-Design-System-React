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
import { SettingsPanel } from './components/SettingsPanel';
import { TimelineControl } from './components/TimelineControl';
import { DEFAULT_MAP_SETTINGS, type MapSettings } from './data/settings';
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mapSettings, setMapSettings] = useState<MapSettings>(DEFAULT_MAP_SETTINGS);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedAirportIata, setSelectedAirportIata] = useState<string | null>(null);

  const openFlightDetails = (flightId: string) => {
    setSelectedFlightId(flightId);
    setDetailsOpen(true);
  };

  const openSettings = () => {
    setSettingsOpen(true);
    setSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setSidePanelOpen(false);
    setSettingsOpen(false);
  };

  const renderSidePanel = () => {
    if (!sidePanelOpen) return null;

    if (settingsOpen) {
      return (
        <SettingsPanel
          settings={mapSettings}
          onChange={setMapSettings}
          onClose={closeSidePanel}
          onReset={() => setMapSettings(DEFAULT_MAP_SETTINGS)}
        />
      );
    }

    if (!SIDE_PANEL_NAV_IDS.has(activeNavId)) return null;

    if (activeNavId === 'flights') {
      return (
        <FlightsPanel
          selectedFlightId={selectedFlightId}
          onClose={closeSidePanel}
          onSelectFlight={openFlightDetails}
        />
      );
    }

    if (activeNavId === 'airport') {
      return (
        <AirportsPanel
          selectedAirportIata={selectedAirportIata}
          onClose={closeSidePanel}
          onSelectAirport={setSelectedAirportIata}
        />
      );
    }

    return <FirPanel onClose={closeSidePanel} />;
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
            setSettingsOpen(false);
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
            <MapView settings={mapSettings} />
            <MapToolbar
              settingsActive={settingsOpen}
              onSettingsClick={() => {
                if (settingsOpen) {
                  closeSidePanel();
                } else {
                  openSettings();
                }
              }}
              onCollapse={() => {
                if (sidePanelOpen) {
                  closeSidePanel();
                } else if (settingsOpen) {
                  openSettings();
                } else if (SIDE_PANEL_NAV_IDS.has(activeNavId)) {
                  setSidePanelOpen(true);
                }
              }}
            />
            {mapSettings.showLegend ? <MapLegend /> : null}
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
        <TimelineControl playbackSpeed={mapSettings.playbackSpeed} />
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
