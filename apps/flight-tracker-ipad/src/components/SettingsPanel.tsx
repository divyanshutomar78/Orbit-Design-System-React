import { ButtonCompact, InputSelect, OptionToggle } from 'orbit-ds-components';

import {
  DEFAULT_MAP_SETTINGS,
  MAP_THEME_OPTIONS,
  PLAYBACK_SPEED_OPTIONS,
  REFRESH_INTERVAL_OPTIONS,
  type MapSettings,
} from '../data/settings';
import { CloseIcon } from './MapIcons';
import './SettingsPanel.css';
import './SidePanel.css';

export interface SettingsPanelProps {
  settings: MapSettings;
  onChange: (settings: MapSettings) => void;
  onClose?: () => void;
  onReset?: () => void;
}

export function SettingsPanel({ settings, onChange, onClose, onReset }: SettingsPanelProps) {
  const update = <K extends keyof MapSettings>(key: K, value: MapSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <aside className="side-panel settings-panel" aria-label="Map settings">
      <header className="side-panel__header">
        <h2 className="side-panel__title">Settings</h2>
        <div className="side-panel__header-actions">
          <ButtonCompact
            variant="tertiary"
            minWidth={false}
            iconSize="big"
            aria-label="Close settings panel"
            leftIcon={<CloseIcon />}
            onClick={onClose}
          />
        </div>
      </header>

      <p className="side-panel__subtitle">Configure map display and simulation</p>

      <div className="settings-panel__body">
        <section className="settings-panel__section" aria-labelledby="settings-map-display">
          <h3 id="settings-map-display" className="settings-panel__section-title">
            Map display
          </h3>
          <div className="settings-panel__options">
            <OptionToggle
              label="FIR zones"
              checked={settings.showFirZones}
              onCheckedChange={(checked) => update('showFirZones', checked)}
            />
            <OptionToggle
              label="Flight path"
              checked={settings.showFlightPath}
              onCheckedChange={(checked) => update('showFlightPath', checked)}
            />
            <OptionToggle
              label="Affected areas"
              checked={settings.showAffectedAreas}
              onCheckedChange={(checked) => update('showAffectedAreas', checked)}
            />
            <OptionToggle
              label="Aircraft position"
              checked={settings.showAircraft}
              onCheckedChange={(checked) => update('showAircraft', checked)}
            />
            <OptionToggle
              label="Map legend"
              checked={settings.showLegend}
              onCheckedChange={(checked) => update('showLegend', checked)}
            />
          </div>
          <InputSelect
            className="settings-panel__field"
            label="Map style"
            options={[...MAP_THEME_OPTIONS]}
            value={settings.mapTheme}
            onValueChange={(value) => update('mapTheme', value as MapSettings['mapTheme'])}
            showSelectIcon
          />
        </section>

        <section className="settings-panel__section" aria-labelledby="settings-data">
          <h3 id="settings-data" className="settings-panel__section-title">
            Data refresh
          </h3>
          <div className="settings-panel__options">
            <OptionToggle
              label="Auto-refresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => update('autoRefresh', checked)}
            />
          </div>
          <InputSelect
            className="settings-panel__field"
            label="Refresh interval"
            options={[...REFRESH_INTERVAL_OPTIONS]}
            value={settings.refreshInterval}
            onValueChange={(value) =>
              update('refreshInterval', value as MapSettings['refreshInterval'])
            }
            disabled={!settings.autoRefresh}
            showSelectIcon
          />
        </section>

        <section className="settings-panel__section" aria-labelledby="settings-simulation">
          <h3 id="settings-simulation" className="settings-panel__section-title">
            Simulation
          </h3>
          <InputSelect
            className="settings-panel__field"
            label="Timeline playback speed"
            options={[...PLAYBACK_SPEED_OPTIONS]}
            value={settings.playbackSpeed}
            onValueChange={(value) =>
              update('playbackSpeed', value as MapSettings['playbackSpeed'])
            }
            showSelectIcon
          />
        </section>
      </div>

      <footer className="settings-panel__footer">
        <ButtonCompact
          variant="tertiary"
          onClick={() => onReset?.() ?? onChange(DEFAULT_MAP_SETTINGS)}
        >
          Reset defaults
        </ButtonCompact>
      </footer>
    </aside>
  );
}
