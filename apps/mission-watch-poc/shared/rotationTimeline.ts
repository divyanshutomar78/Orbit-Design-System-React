import type { FlaggedFlight, ScheduledFlight, WeatherSnapshot } from './types';

export type FlightRiskLevel = 'critical' | 'warning' | 'ok' | 'scheduled';

export type TimelineFlight = {
  id: string;
  flightNumber: string;
  tail: string;
  origin: string;
  destination: string;
  departureUtc: string;
  arrivalUtc: string;
  aircraft: string;
  riskLevel: FlightRiskLevel;
  flags: FlaggedFlight[];
};

export type RiskCounts = {
  critical: number;
  warning: number;
  ok: number;
  scheduled: number;
  total: number;
};

const CRITICAL_CATEGORIES = ['Low visibility operations', 'Thunderstorm / connection risk'];

export function assignTailNumbers(templates: ScheduledFlight[]): Map<string, string> {
  const map = new Map<string, string>();
  const baseIds = [...new Set(templates.map((f) => baseTemplateId(f.id)))];
  baseIds.forEach((baseId, index) => {
    map.set(baseId, `AC-${String(index + 1).padStart(2, '0')}`);
  });
  return map;
}

export function baseTemplateId(flightId: string): string {
  const match = flightId.match(/^(.+)-\d{4}-\d{2}-\d{2}$/);
  return match ? match[1] : flightId;
}

function riskFromFlags(flags: FlaggedFlight[]): FlightRiskLevel {
  if (!flags.length) return 'ok';
  if (flags.some((f) => CRITICAL_CATEGORIES.includes(f.riskCategory))) return 'critical';
  return 'warning';
}

export function buildTimelineFlights(
  flights: ScheduledFlight[],
  flags: FlaggedFlight[],
  scanned: boolean,
): TimelineFlight[] {
  const tails = assignTailNumbers(flights);
  const flagsByFlight = new Map<string, FlaggedFlight[]>();

  for (const flag of flags) {
    const list = flagsByFlight.get(flag.flightId) ?? [];
    list.push(flag);
    flagsByFlight.set(flag.flightId, list);
  }

  return flights.map((flight) => {
    const flightFlags = flagsByFlight.get(flight.id) ?? [];
    const riskLevel: FlightRiskLevel = !scanned
      ? 'scheduled'
      : riskFromFlags(flightFlags);

    return {
      id: flight.id,
      flightNumber: flight.flightNumber,
      tail: tails.get(baseTemplateId(flight.id)) ?? 'AC-??',
      origin: flight.origin,
      destination: flight.destination,
      departureUtc: flight.departureUtc,
      arrivalUtc: flight.arrivalUtc,
      aircraft: flight.aircraft,
      riskLevel,
      flags: flightFlags,
    };
  });
}

export function countRiskLevels(flights: TimelineFlight[]): RiskCounts {
  const counts: RiskCounts = { critical: 0, warning: 0, ok: 0, scheduled: 0, total: flights.length };
  for (const flight of flights) {
    counts[flight.riskLevel] += 1;
  }
  return counts;
}

export function filterFlightsInRange(
  flights: TimelineFlight[],
  rangeStart: Date,
  rangeEnd: Date,
): TimelineFlight[] {
  const startMs = rangeStart.getTime();
  const endMs = rangeEnd.getTime();
  return flights.filter((flight) => {
    const dep = new Date(flight.departureUtc).getTime();
    const arr = new Date(flight.arrivalUtc).getTime();
    return dep < endMs && arr > startMs;
  });
}

export function uniqueTails(flights: TimelineFlight[]): string[] {
  return [...new Set(flights.map((f) => f.tail))].sort();
}

export function flightsForTail(flights: TimelineFlight[], tail: string): TimelineFlight[] {
  return flights.filter((f) => f.tail === tail);
}

export function barPosition(
  flight: TimelineFlight,
  rangeStart: Date,
  rangeEnd: Date,
): { leftPct: number; widthPct: number } {
  const startMs = rangeStart.getTime();
  const endMs = rangeEnd.getTime();
  const duration = endMs - startMs;
  if (duration <= 0) return { leftPct: 0, widthPct: 0 };

  const dep = Math.max(new Date(flight.departureUtc).getTime(), startMs);
  const arr = Math.min(new Date(flight.arrivalUtc).getTime(), endMs);
  const leftPct = ((dep - startMs) / duration) * 100;
  const widthPct = Math.max(((arr - dep) / duration) * 100, 0.8);
  return { leftPct, widthPct };
}

export function formatUtcTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  });
}

export function formatUtcDay(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

export function mergeWeather(flags: FlaggedFlight[]): WeatherSnapshot {
  const merged: WeatherSnapshot = {};
  for (const flag of flags) {
    for (const [key, value] of Object.entries(flag.weather)) {
      if (value != null && merged[key as keyof WeatherSnapshot] == null) {
        merged[key as keyof WeatherSnapshot] = value;
      }
    }
  }
  return merged;
}

export function dayTicks(rangeStart: Date, days: number): Date[] {
  const ticks: Date[] = [];
  for (let i = 0; i <= days; i += 1) {
    const d = new Date(rangeStart);
    d.setUTCDate(d.getUTCDate() + i);
    ticks.push(d);
  }
  return ticks;
}

export function sixHourTicks(rangeStart: Date, days: number): Date[] {
  const ticks: Date[] = [];
  const end = new Date(rangeStart);
  end.setUTCDate(end.getUTCDate() + days);
  const cursor = new Date(rangeStart);
  cursor.setUTCHours(Math.floor(cursor.getUTCHours() / 6) * 6, 0, 0, 0);
  while (cursor <= end) {
    ticks.push(new Date(cursor));
    cursor.setUTCHours(cursor.getUTCHours() + 6);
  }
  return ticks;
}

export function tickPosition(tick: Date, rangeStart: Date, rangeEnd: Date): number {
  const duration = rangeEnd.getTime() - rangeStart.getTime();
  if (duration <= 0) return 0;
  return ((tick.getTime() - rangeStart.getTime()) / duration) * 100;
}
