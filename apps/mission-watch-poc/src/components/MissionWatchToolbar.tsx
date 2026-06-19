import { Button } from 'orbit-ds-components';

import { ScanIcon } from './icons';
import './MissionWatchToolbar.css';

type MissionWatchToolbarProps = {
  loading: boolean;
  lastScanLabel: string | null;
  onScan: () => void;
};

export function MissionWatchToolbar({ loading, lastScanLabel, onScan }: MissionWatchToolbarProps) {
  return (
    <section className="mw-toolbar mw-section" aria-label="Scan controls">
      <div className="mw-toolbar__intro">
        <h1 className="mw-toolbar__heading">Weather risk outlook</h1>
        <p className="mw-toolbar__desc">
          IATA Summer 2026 schedule cross-checked against hourly DTN forecasts and your business
          rules.
        </p>
        {lastScanLabel && (
          <p className="mw-toolbar__meta">Last scan · {lastScanLabel}</p>
        )}
      </div>
      <div className="mw-toolbar__actions">
        <Button
          variant="primary"
          leftIcon={<ScanIcon />}
          onClick={onScan}
          disabled={loading}
        >
          {loading ? 'Scanning…' : 'Run 15-day scan'}
        </Button>
      </div>
    </section>
  );
}
