import { useState } from 'react';
import {
  AttentionChip,
  ButtonCompact,
  DefaultChip,
  NeutralChip,
} from 'orbit-ds-components';

import {
  FIR_FILTERS,
  FIR_REGIONS,
  type FirFilter,
  type FirListEntry,
  type FirRegion,
} from '../data/fir';
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, RefreshIcon } from './MapIcons';
import './FirPanel.css';
import './SidePanel.css';

function CountBadge({
  count,
  variant,
}: {
  count: number;
  variant: 'active' | 'future';
}) {
  if (variant === 'active') {
    return (
      <AttentionChip type="tag" size="compact" showIcon={false} className="fir-panel__count-badge">
        {count}
      </AttentionChip>
    );
  }
  return (
    <DefaultChip type="tag" size="compact" showIcon={false} className="fir-panel__count-badge">
      {count}
    </DefaultChip>
  );
}

function FirBadges({ item }: { item: FirListEntry }) {
  if (item.noData) {
    return (
      <NeutralChip type="tag" size="compact" showIcon={false} className="fir-panel__status-badge">
        No Data
      </NeutralChip>
    );
  }

  return (
    <>
      {item.activeCount != null ? (
        <AttentionChip type="tag" size="compact" showIcon={false} className="fir-panel__status-badge">
          {item.activeCount} Active
        </AttentionChip>
      ) : null}
      {item.futureCount != null ? (
        <DefaultChip type="tag" size="compact" showIcon={false} className="fir-panel__status-badge">
          {item.futureCount} Future
        </DefaultChip>
      ) : null}
    </>
  );
}

function FirRegionSection({
  region,
  expanded,
  onToggle,
}: {
  region: FirRegion;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="fir-panel__region">
      <button type="button" className="fir-panel__region-header" onClick={onToggle}>
        <span className="fir-panel__region-chevron" data-expanded={expanded}>
          <ChevronDownIcon />
        </span>
        <span className="fir-panel__region-code">{region.code}</span>
        <span className="fir-panel__region-name">{region.name}</span>
        <span className="fir-panel__region-badges">
          <CountBadge count={region.activeCount} variant="active" />
          <CountBadge count={region.futureCount} variant="future" />
        </span>
      </button>

      {expanded ? (
        <ul className="fir-panel__items">
          {region.items.map((item) => (
            <li key={item.id}>
              <button type="button" className="fir-panel__item">
                <span className="fir-panel__item-label">{item.label}</span>
                <span className="fir-panel__item-badges">
                  <FirBadges item={item} />
                </span>
                <span className="fir-panel__item-chevron" aria-hidden>
                  <ChevronRightIcon />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export interface FirPanelProps {
  onClose?: () => void;
}

export function FirPanel({ onClose }: FirPanelProps) {
  const [filter, setFilter] = useState<FirFilter>('all');
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({
    eu: true,
    mid: false,
  });

  const toggleRegion = (regionId: string) => {
    setExpandedRegions((current) => ({
      ...current,
      [regionId]: !current[regionId],
    }));
  };

  return (
    <aside className="side-panel fir-panel" aria-label="FIR around flight plan">
      <header className="side-panel__header">
        <h2 className="side-panel__title">FIR around flight plan</h2>
        <div className="side-panel__header-actions">
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Refresh FIR data"
            leftIcon={<RefreshIcon />}
          />
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Close FIR panel"
            leftIcon={<CloseIcon />}
            onClick={onClose}
          />
        </div>
      </header>

      <div className="fir-panel__filters" role="tablist" aria-label="FIR filters">
        {FIR_FILTERS.map((entry) => (
          <NeutralChip
            key={entry.id}
            type="chip"
            size="compact"
            showIcon={false}
            selected={filter === entry.id}
            className="fir-panel__filter"
            onClick={() => setFilter(entry.id)}
          >
            {entry.label}
          </NeutralChip>
        ))}
        <NeutralChip
          type="chip"
          size="compact"
          showIcon={false}
          selected={false}
          className="fir-panel__filter"
        >
          Relevant
        </NeutralChip>
      </div>

      <div className="fir-panel__regions">
        {FIR_REGIONS.map((region) => (
          <FirRegionSection
            key={region.id}
            region={region}
            expanded={expandedRegions[region.id] ?? false}
            onToggle={() => toggleRegion(region.id)}
          />
        ))}
      </div>
    </aside>
  );
}
