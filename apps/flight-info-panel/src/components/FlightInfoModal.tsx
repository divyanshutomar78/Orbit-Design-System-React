import { useState } from 'react';
import {
  LabelValueVertical,
  Modal,
  NeutralChip,
  TitleTab,
  type ModalProps,
} from 'orbit-ds-components';

import type { FlightInfo } from '../data/flightInfo';
import { FlightProgress } from './FlightProgress';
import './FlightInfoModal.css';

type FlightTab = 'info' | 'position';

export interface FlightInfoModalProps extends Omit<ModalProps, 'title' | 'children' | 'header'> {
  flight: FlightInfo;
}

function EndpointColumn({
  endpoint,
  align,
}: {
  endpoint: FlightInfo['departure'];
  align: 'start' | 'end';
}) {
  return (
    <LabelValueVertical
      className={[
        'flight-info-modal__endpoint',
        align === 'end' ? 'flight-info-modal__endpoint--end' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      layout="L + V + L"
      label={endpoint.date}
      value={endpoint.airport}
      big
      secondaryLabel={`${endpoint.timeLabel} ${endpoint.time}`}
    />
  );
}

function InfoTabContent({
  flight,
  activeLegIndex,
  onLegChange,
}: {
  flight: FlightInfo;
  activeLegIndex: number;
  onLegChange: (index: number) => void;
}) {
  const activeLeg = flight.legs[activeLegIndex] ?? flight.legs[0];

  return (
    <div className="flight-info-modal__info">
      <section className="flight-info-modal__stats-group" aria-label="Flight identity">
        <div className="flight-info-modal__stats-row flight-info-modal__stats-row--four">
          <LabelValueVertical label="Stage" value={flight.stage} />
          <LabelValueVertical label="Call Sign" value={flight.callSign} />
          <LabelValueVertical label="Aircraft" value={flight.aircraft} />
          <LabelValueVertical label="Registration" value={flight.registration} />
        </div>
      </section>

      <div className="flight-info-modal__route">
        <EndpointColumn endpoint={flight.departure} align="start" />
        <FlightProgress
          status={activeLeg.status}
          duration={activeLeg.duration}
          legCount={flight.legs.length}
          activeLegIndex={activeLegIndex}
          onPrevious={() => onLegChange(Math.max(0, activeLegIndex - 1))}
          onNext={() => onLegChange(Math.min(flight.legs.length - 1, activeLegIndex + 1))}
        />
        <EndpointColumn endpoint={flight.arrival} align="end" />
      </div>

      <div className="flight-info-modal__stats-row flight-info-modal__stats-row--three flight-info-modal__stats-row--center-middle">
        <LabelValueVertical label="Departure FOB" value={flight.departureFob} />
        <LabelValueVertical
          className="flight-info-modal__stat--center"
          label="Current UTC"
          value={flight.currentUtc}
        />
        <LabelValueVertical
          className="flight-info-modal__stat--end"
          label="Arrival FOB"
          value={flight.arrivalFob}
        />
      </div>

      <hr className="flight-info-modal__divider" />

      <div className="flight-info-modal__taxi-row">
        <span className="flight-info-modal__taxi-label">Departure &amp; Taxi</span>
        <div className="flight-info-modal__taxi-chips">
          <NeutralChip type="chip" size="compact" showIcon={false}>
            {flight.taxiDepartureTime}
          </NeutralChip>
          <NeutralChip type="chip" size="compact" showIcon={false}>
            {flight.taxiDuration}
          </NeutralChip>
        </div>
      </div>
    </div>
  );
}

function PositionTabContent({ flight }: { flight: FlightInfo }) {
  return (
    <div className="flight-info-modal__position">
      <div className="flight-info-modal__stats-row flight-info-modal__stats-row--three">
        <LabelValueVertical label="Latitude" value={flight.position.latitude} />
        <LabelValueVertical label="Longitude" value={flight.position.longitude} />
        <LabelValueVertical label="Altitude" value={flight.position.altitude} />
      </div>
      <div className="flight-info-modal__stats-row flight-info-modal__stats-row--two">
        <LabelValueVertical label="Ground speed" value={flight.position.groundSpeed} />
        <LabelValueVertical label="Heading" value={flight.position.heading} />
      </div>
    </div>
  );
}

export function FlightInfoModal({ flight, open, onClose, className, ...rest }: FlightInfoModalProps) {
  const [activeTab, setActiveTab] = useState<FlightTab>('info');
  const [activeLegIndex, setActiveLegIndex] = useState(flight.activeLegIndex);

  const classes = ['flight-info-modal', className].filter(Boolean).join(' ');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Flight info"
      ariaLabel="Flight information"
      className={classes}
      header={
        <nav className="flight-info-modal__tabs" aria-label="Flight panel sections">
          <TitleTab selected={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            Info
          </TitleTab>
          <TitleTab selected={activeTab === 'position'} onClick={() => setActiveTab('position')}>
            Position
          </TitleTab>
        </nav>
      }
      {...rest}
    >
      {activeTab === 'info' ? (
        <InfoTabContent
          flight={flight}
          activeLegIndex={activeLegIndex}
          onLegChange={setActiveLegIndex}
        />
      ) : (
        <PositionTabContent flight={flight} />
      )}
    </Modal>
  );
}
