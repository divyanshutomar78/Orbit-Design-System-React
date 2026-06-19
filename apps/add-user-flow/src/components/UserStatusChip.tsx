import {
  CriticalChip,
  DefaultChip,
  SuccessChip,
} from 'orbit-ds-components';

import type { UserStatus } from '../data/usersData';

const labels: Record<UserStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  blocked: 'Blocked',
};

export interface UserStatusChipProps {
  status: UserStatus;
}

export function UserStatusChip({ status }: UserStatusChipProps) {
  const label = labels[status];

  if (status === 'active') {
    return (
      <SuccessChip showIcon={false} size="compact">
        {label}
      </SuccessChip>
    );
  }

  if (status === 'blocked') {
    return (
      <CriticalChip showIcon={false} size="compact">
        {label}
      </CriticalChip>
    );
  }

  return (
    <DefaultChip showIcon={false} size="compact">
      {label}
    </DefaultChip>
  );
}
