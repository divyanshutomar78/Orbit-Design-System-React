import type { FlaggedFlight, ScheduledFlight, WeatherSnapshot } from './types';

export type ResultRiskLevel = 'critical' | 'warning';
export type ResultTier = 'URGENT' | 'ADVISORY' | 'MONITOR';

export type ResultRow = {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureUtc: string;
  arrivalUtc: string;
  aircraft: string;
  riskLevel: ResultRiskLevel;
  tier: ResultTier;
  flags: FlaggedFlight[];
  findings: string[];
};

const CRITICAL_CATEGORIES = ['Low visibility operations', 'Thunderstorm / connection risk'];

export function riskLevelFromFlags(flags: FlaggedFlight[]): ResultRiskLevel {
  if (flags.some((f) => CRITICAL_CATEGORIES.includes(f.riskCategory))) return 'critical';
  return 'warning';
}

export function tierFromRisk(level: ResultRiskLevel): ResultTier {
  return level === 'critical' ? 'URGENT' : 'ADVISORY';
}

export function formatFinding(flag: FlaggedFlight): string {
  const w = flag.weather;
  if (flag.riskCategory.includes('visibility') && w.visibilityInMeter != null) {
    return `Low visibility — ${w.visibilityInMeter}m at ${flag.airport}`;
  }
  if (flag.riskCategory.includes('Thunderstorm') && w.precipitationProbabilityInPercent != null) {
    return `Thunderstorm risk — ${w.precipitationProbabilityInPercent}% precip at ${flag.airport}`;
  }
  if (flag.riskCategory.includes('snow') && w.snowAmountInCentimeter != null) {
    return `Snow forecast — ${w.snowAmountInCentimeter}cm at ${flag.airport}`;
  }
  if (flag.riskCategory.includes('heat') && w.maxAirTemperatureInCelsius != null) {
    return `Heat / wind — ${w.maxAirTemperatureInCelsius}°C at ${flag.airport}`;
  }
  return `${flag.ruleName} (${flag.checkPoint} · ${flag.airport})`;
}

export function buildResultRows(
  flags: FlaggedFlight[],
  schedule: ScheduledFlight[],
): ResultRow[] {
  const scheduleById = new Map(schedule.map((f) => [f.id, f]));
  const grouped = new Map<string, FlaggedFlight[]>();

  for (const flag of flags) {
    const list = grouped.get(flag.flightId) ?? [];
    list.push(flag);
    grouped.set(flag.flightId, list);
  }

  return Array.from(grouped.entries())
    .map(([flightId, flightFlags]) => {
      const sched = scheduleById.get(flightId);
      const first = flightFlags[0];
      const riskLevel = riskLevelFromFlags(flightFlags);

      return {
        id: flightId,
        flightNumber: first.flightNumber,
        origin: first.origin,
        destination: first.destination,
        departureUtc: sched?.departureUtc ?? first.scheduledTimeUtc,
        arrivalUtc: sched?.arrivalUtc ?? first.scheduledTimeUtc,
        aircraft: sched?.aircraft ?? '—',
        riskLevel,
        tier: tierFromRisk(riskLevel),
        flags: flightFlags,
        findings: flightFlags.map(formatFinding),
      };
    })
    .sort(
      (a, b) =>
        (a.riskLevel === 'critical' ? 0 : 1) - (b.riskLevel === 'critical' ? 0 : 1) ||
        new Date(a.departureUtc).getTime() - new Date(b.departureUtc).getTime(),
    );
}

export function countResultRisk(rows: ResultRow[]) {
  return {
    high: rows.filter((r) => r.riskLevel === 'critical').length,
    medium: rows.filter((r) => r.riskLevel === 'warning').length,
    total: rows.length,
  };
}

export function weatherAtAirport(flags: FlaggedFlight[], airport: string): WeatherSnapshot {
  const merged: WeatherSnapshot = {};
  for (const flag of flags) {
    if (flag.airport !== airport) continue;
    for (const [key, value] of Object.entries(flag.weather)) {
      if (value != null && merged[key as keyof WeatherSnapshot] == null) {
        merged[key as keyof WeatherSnapshot] = value;
      }
    }
  }
  return merged;
}

export function formatResultDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatResultTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  });
}
