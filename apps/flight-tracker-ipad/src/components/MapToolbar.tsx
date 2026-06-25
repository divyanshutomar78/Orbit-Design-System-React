import { ButtonCompact } from 'orbit-ds-components';

import { CollapseIcon, GlobeIcon, LayersIcon, SettingsIcon } from './MapIcons';
import './MapToolbar.css';

export interface MapToolbarProps {
  onCollapse?: () => void;
  onSettingsClick?: () => void;
  settingsActive?: boolean;
}

export function MapToolbar({ onCollapse, onSettingsClick, settingsActive }: MapToolbarProps) {
  return (
    <div className="map-toolbar" role="toolbar" aria-label="Map controls">
      <ButtonCompact
        variant="tertiary"
        minWidth={false}
        iconSize="big"
        aria-label="Layers"
        leftIcon={<LayersIcon />}
      />
      <ButtonCompact
        variant="tertiary"
        minWidth={false}
        iconSize="big"
        aria-label="Globe view"
        leftIcon={<GlobeIcon />}
      />
      <ButtonCompact
        variant={settingsActive ? 'secondary' : 'tertiary'}
        minWidth={false}
        iconSize="big"
        aria-label="Settings"
        aria-pressed={settingsActive}
        leftIcon={<SettingsIcon />}
        onClick={onSettingsClick}
      />
      <ButtonCompact variant="secondary" className="map-toolbar__sim">
        SIM Position
      </ButtonCompact>
      <ButtonCompact
        variant="tertiary"
        minWidth={false}
        iconSize="big"
        aria-label="Collapse panel"
        leftIcon={<CollapseIcon />}
        onClick={onCollapse}
      />
    </div>
  );
}
