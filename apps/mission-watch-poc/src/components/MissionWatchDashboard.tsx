import { TitlesAndTabs } from 'orbit-ds-components';
import { useCallback, useEffect, useState } from 'react';

import type { ApiStatus, EvaluationSummary, ScheduledFlight, WeatherRule } from '@shared/types';
import {
  fetchLatestEvaluation,
  fetchRules,
  fetchSchedule,
  fetchStatus,
  runEvaluation,
  saveRules,
} from '../api/client';
import { FlaggedFlightsTable } from './FlaggedFlightsTable';
import './MissionWatchDashboard.css';
import { MissionWatchKpis } from './MissionWatchKpis';
import { MissionWatchToolbar } from './MissionWatchToolbar';
import { RulesPanel } from './RulesPanel';
import { SchedulePanel } from './SchedulePanel';

type TabId = 'flags' | 'rules' | 'schedule';

function formatScanTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });
}

export function MissionWatchDashboard() {
  const [tab, setTab] = useState<TabId>('flags');
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [rules, setRules] = useState<WeatherRule[]>([]);
  const [schedule, setSchedule] = useState<ScheduledFlight[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialScanDone, setInitialScanDone] = useState(false);

  const handleEvaluate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await runEvaluation();
      setEvaluation(result);
      setTab('flags');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setError(null);
    const [nextStatus, nextRules, nextSchedule] = await Promise.all([
      fetchStatus(),
      fetchRules(),
      fetchSchedule(),
    ]);
    setStatus(nextStatus);
    setRules(nextRules.rules);
    setSchedule(nextSchedule.flights);

    try {
      const latest = await fetchLatestEvaluation();
      setEvaluation(latest);
    } catch {
      setEvaluation(null);
    }
  }, []);

  useEffect(() => {
    refresh().catch((err: Error) => setError(err.message));
  }, [refresh]);

  useEffect(() => {
    if (initialScanDone || loading) return;
    if (evaluation !== null) {
      setInitialScanDone(true);
      return;
    }
    setInitialScanDone(true);
    handleEvaluate();
  }, [evaluation, initialScanDone, loading, handleEvaluate]);

  const handleRulesChange = async (nextRules: WeatherRule[]) => {
    setRules(nextRules);
    await saveRules(nextRules);
  };

  return (
    <div className="mw-page">
      <header className="mw-page__header">
        <TitlesAndTabs
          title="Mission Watch"
          showTitleIcon
          showLeftIcon={false}
          showRightIcons={false}
          showExtraSlot={false}
          tabItems={[
            { id: 'flags', label: 'Flagged flights', selected: tab === 'flags' },
            { id: 'rules', label: 'Rules', selected: tab === 'rules' },
            { id: 'schedule', label: 'Schedule', selected: tab === 'schedule' },
          ]}
          onTabSelect={(id) => setTab(id as TabId)}
        />
      </header>

      <main className="mw-page__content">
        <MissionWatchToolbar
          loading={loading}
          lastScanLabel={evaluation ? formatScanTime(evaluation.evaluatedAt) : null}
          onScan={handleEvaluate}
        />

        {error && <p className="mw-error">{error}</p>}

        <MissionWatchKpis evaluation={evaluation} status={status} />

        {tab === 'flags' && (
          <FlaggedFlightsTable
            flags={evaluation?.flags ?? []}
            loading={loading}
            onRunScan={handleEvaluate}
          />
        )}

        {tab === 'rules' && <RulesPanel rules={rules} onChange={handleRulesChange} />}

        {tab === 'schedule' && (
          <SchedulePanel flights={schedule.slice(0, 40)} total={schedule.length} />
        )}

        {status && !status.dtnConfigured && (
          <p className="mw-footnote">
            Add DTN credentials to <code>apps/mission-watch-poc/.env</code> (see{' '}
            <code>.env.example</code>). Mock weather is used until credentials are configured.
          </p>
        )}
      </main>
    </div>
  );
}
