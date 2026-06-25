import {
  AttentionChip,
  DefaultChip,
  NeutralChip,
  SuccessChip,
} from 'orbit-ds-components';

import type { FlightStatus } from '../data/flights';

export function FlightStatusChip({ status }: { status: FlightStatus }) {
  if (status === 'en-route') {
    return (
      <SuccessChip type="chip" size="compact" showIcon={false}>
        En route
      </SuccessChip>
    );
  }
  if (status === 'delayed') {
    return (
      <AttentionChip type="chip" size="compact" showIcon={false}>
        Delayed
      </AttentionChip>
    );
  }
  if (status === 'boarding') {
    return (
      <DefaultChip type="chip" size="compact" showIcon={false}>
        Boarding
      </DefaultChip>
    );
  }
  return (
    <NeutralChip type="chip" size="compact" showIcon={false}>
      Landed
    </NeutralChip>
  );
}

export function flightStatusSummary(status: FlightStatus): string {
  if (status === 'en-route') return 'In flight';
  if (status === 'delayed') return 'Delayed departure';
  if (status === 'boarding') return 'At gate';
  return 'Arrived';
}
