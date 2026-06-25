export type MapTheme = 'standard' | 'satellite';
export type RefreshInterval = '30' | '60' | '120' | 'off';
export type PlaybackSpeed = '1' | '2' | '4';

export interface MapSettings {
  showFirZones: boolean;
  showFlightPath: boolean;
  showAffectedAreas: boolean;
  showLegend: boolean;
  showAircraft: boolean;
  mapTheme: MapTheme;
  refreshInterval: RefreshInterval;
  autoRefresh: boolean;
  playbackSpeed: PlaybackSpeed;
}

export const DEFAULT_MAP_SETTINGS: MapSettings = {
  showFirZones: true,
  showFlightPath: true,
  showAffectedAreas: true,
  showLegend: true,
  showAircraft: true,
  mapTheme: 'standard',
  refreshInterval: '60',
  autoRefresh: true,
  playbackSpeed: '1',
};

export const MAP_THEME_OPTIONS = [
  { value: 'standard', label: 'Standard' },
  { value: 'satellite', label: 'Satellite' },
] as const;

export const REFRESH_INTERVAL_OPTIONS = [
  { value: '30', label: 'Every 30 seconds' },
  { value: '60', label: 'Every 60 seconds' },
  { value: '120', label: 'Every 2 minutes' },
  { value: 'off', label: 'Off' },
] as const;

export const PLAYBACK_SPEED_OPTIONS = [
  { value: '1', label: '1× real time' },
  { value: '2', label: '2× speed' },
  { value: '4', label: '4× speed' },
] as const;
