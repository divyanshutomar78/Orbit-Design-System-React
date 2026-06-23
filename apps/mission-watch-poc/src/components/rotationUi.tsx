import {
  CriticalChip,
  DefaultChip,
  NeutralChip,
  SuccessChip,
  WarningChip,
} from 'orbit-ds-components';

import type { FlightRiskLevel } from '@shared/rotationTimeline';

export function riskLevelLabel(level: FlightRiskLevel) {
  switch (level) {
    case 'critical':
      return 'High';
    case 'warning':
      return 'Medium';
    case 'ok':
      return 'OK';
    case 'scheduled':
      return 'Scheduled';
  }
}

export function RiskLevelChip({
  level,
  label,
  readOnly = true,
  selected,
  onClick,
}: {
  level: FlightRiskLevel;
  label: string;
  readOnly?: boolean;
  selected?: boolean;
  onClick?: () => void;
}) {
  const common = {
    type: 'chip' as const,
    size: 'compact' as const,
    showIcon: !readOnly,
    selected,
    onClick,
    className: 'mw-status-chip',
  };

  switch (level) {
    case 'critical':
      return <CriticalChip {...common}>{label}</CriticalChip>;
    case 'warning':
      return <WarningChip {...common}>{label}</WarningChip>;
    case 'ok':
      return <SuccessChip {...common}>{label}</SuccessChip>;
    case 'scheduled':
      return <DefaultChip {...common}>{label}</DefaultChip>;
  }
}

export function RiskFilterChip({
  level,
  selected,
  onSelect,
}: {
  level: 'all' | FlightRiskLevel;
  selected: boolean;
  onSelect: () => void;
}) {
  const label =
    level === 'all'
      ? 'All'
      : level === 'critical'
        ? 'High'
        : level.charAt(0).toUpperCase() + level.slice(1);

  if (level === 'all') {
    return (
      <NeutralChip
        type="chip"
        size="compact"
        showIcon
        selected={selected}
        onClick={onSelect}
      >
        {label}
      </NeutralChip>
    );
  }

  return (
    <RiskLevelChip
      level={level}
      label={label}
      readOnly={false}
      selected={selected}
      onClick={onSelect}
    />
  );
}
