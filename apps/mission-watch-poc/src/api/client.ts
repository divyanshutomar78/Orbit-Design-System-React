import type { ApiStatus, EvaluationSummary, ScheduledFlight, WeatherRule } from '@shared/types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, init);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error((error as { error?: string }).error ?? 'Request failed');
  }
  return response.json() as Promise<T>;
}

export function fetchStatus() {
  return request<ApiStatus>('/api/status');
}

export function fetchSchedule() {
  return request<{ season: string; horizonDays: number; flights: ScheduledFlight[] }>(
    '/api/schedule',
  );
}

export function fetchRules() {
  return request<{ rules: WeatherRule[] }>('/api/rules');
}

export function saveRules(rules: WeatherRule[]) {
  return request<{ rules: WeatherRule[] }>('/api/rules', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rules }),
  });
}

export function runEvaluation() {
  return request<EvaluationSummary>('/api/evaluate', { method: 'POST' });
}

export function fetchLatestEvaluation() {
  return request<EvaluationSummary>('/api/evaluate/latest');
}
