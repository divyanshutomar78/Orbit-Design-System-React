import { useEffect, useState } from 'react';
import {
  ButtonCompact,
  LabelValueVertical,
  ListingItem,
  Modal,
} from 'orbit-ds-components';

import { airportName, routeLabel } from '../data/airports';
import type { Flight } from '../data/flights';
import { formatUtcDateTime, formatUtcTime } from '../utils/time';
import { FlightStatusChip, flightStatusSummary } from './FlightStatusChip';
import './FlightDetailsModal.css';

export interface FlightDetailsModalProps {
  open: boolean;
  flights: Flight[];
  selectedFlightId?: string | null;
  onClose: () => void;
  onSelectFlight?: (flightId: string) => void;
}

export function FlightDetailsModal({
  open,
  flights,
  selectedFlightId = null,
  onClose,
  onSelectFlight,
}: FlightDetailsModalProps) {
  const [activeId, setActiveId] = useState<string | null>(selectedFlightId);

  useEffect(() => {
    if (open) {
      setActiveId(selectedFlightId ?? flights[0]?.id ?? null);
    }
  }, [open, selectedFlightId, flights]);

  const selectedFlight = flights.find((flight) => flight.id === activeId) ?? null;

  const selectFlight = (flightId: string) => {
    setActiveId(flightId);
    onSelectFlight?.(flightId);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Flight details"
      className="flight-details-modal"
      ariaLabel="Flight details"
      footer={
        <ButtonCompact variant="tertiary" onClick={onClose}>
          Close
        </ButtonCompact>
      }
    >
      <p className="dialog-subtitle">
        Select a flight to view route, schedule, and live position data.
      </p>

      <div className="flight-details-modal__layout">
        <section className="flight-details-modal__list" aria-label="Flight list">
          <h3 className="flight-details-modal__section-title">Tracked flights</h3>
          <ul className="flight-details-modal__list-items">
            {flights.map((flight) => {
              const isSelected = flight.id === activeId;

              return (
                <li key={flight.id}>
                  <ListingItem
                    className={
                      isSelected ? 'flight-details-modal__item flight-details-modal__item--selected' : 'flight-details-modal__item'
                    }
                    multiLine
                    reorderIcon={false}
                    showLeftIcon={false}
                    showRightIcon
                    showHelper
                    title={flight.flightNumber}
                    label={routeLabel(flight.origin, flight.destination)}
                    value={flightStatusSummary(flight.status)}
                    helper={`${flight.airline} · ${formatUtcTime(flight.departureUtc)} UTC`}
                    addIconsComponent={<FlightStatusChip status={flight.status} />}
                    onClick={() => selectFlight(flight.id)}
                  />
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flight-details-modal__detail" aria-label="Flight detail">
          {selectedFlight ? (
            <>
              <header className="flight-details-modal__detail-header">
                <div>
                  <h3 className="flight-details-modal__flight-number">
                    {selectedFlight.flightNumber}
                  </h3>
                  <p className="flight-details-modal__airline">{selectedFlight.airline}</p>
                </div>
                <FlightStatusChip status={selectedFlight.status} />
              </header>

              <div className="flight-details-modal__route">
                <div className="flight-details-modal__endpoint">
                  <span className="flight-details-modal__iata">{selectedFlight.origin}</span>
                  <span className="flight-details-modal__airport">
                    {airportName(selectedFlight.origin)}
                  </span>
                  <span className="flight-details-modal__time">
                    {formatUtcDateTime(selectedFlight.departureUtc)} UTC
                  </span>
                </div>
                <div className="flight-details-modal__route-line" aria-hidden>
                  <span className="flight-details-modal__progress" style={{ width: `${selectedFlight.progress}%` }} />
                </div>
                <div className="flight-details-modal__endpoint flight-details-modal__endpoint--end">
                  <span className="flight-details-modal__iata">{selectedFlight.destination}</span>
                  <span className="flight-details-modal__airport">
                    {airportName(selectedFlight.destination)}
                  </span>
                  <span className="flight-details-modal__time">
                    {formatUtcDateTime(selectedFlight.estimatedArrivalUtc)} UTC
                  </span>
                </div>
              </div>

              <div className="flight-details-modal__stats">
                <LabelValueVertical
                  layout="V + L"
                  label="Aircraft"
                  value={selectedFlight.aircraft}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Registration"
                  value={selectedFlight.registration}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Altitude"
                  value={`${selectedFlight.altitudeFt.toLocaleString()} ft`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Ground speed"
                  value={`${selectedFlight.speedKts} kts`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Heading"
                  value={`${selectedFlight.heading}°`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Progress"
                  value={`${selectedFlight.progress}%`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Gate"
                  value={selectedFlight.gate}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Terminal"
                  value={selectedFlight.terminal}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="On board"
                  value={`${selectedFlight.passengers} pax / ${selectedFlight.crew} crew`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Fuel remaining"
                  value={`${selectedFlight.fuelKg.toLocaleString()} kg`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Position"
                  value={`${selectedFlight.latitude.toFixed(2)}°, ${selectedFlight.longitude.toFixed(2)}°`}
                />
                <LabelValueVertical
                  layout="V + L"
                  label="Scheduled arrival"
                  value={`${formatUtcDateTime(selectedFlight.arrivalUtc)} UTC`}
                />
              </div>
            </>
          ) : (
            <div className="flight-details-modal__empty">
              <p>Select a flight from the list to view full details.</p>
            </div>
          )}
        </section>
      </div>
    </Modal>
  );
}
