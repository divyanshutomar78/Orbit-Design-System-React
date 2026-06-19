import { getAirport } from '../shared/airports';
import { getMockWeather, weatherCacheKey } from '../shared/mockWeather';
import { evaluateRule, ruleAppliesToAirport } from '../shared/ruleEngine';
import { expandScheduleHorizon, SUMMER_2026_FLIGHTS } from '../shared/schedule';
import type {
  EvaluationSummary,
  FlaggedFlight,
  ScheduledFlight,
  WeatherRule,
  WeatherSnapshot,
} from '../shared/types';
import { fetchHourlyForecast, useMockWeather } from './dtnClient';

const HORIZON_DAYS = 15;

type WeatherCache = Map<string, { snapshot: WeatherSnapshot; source: 'dtn' | 'mock' }>;

async function resolveWeather(
  airportCode: string,
  atUtc: string,
  cache: WeatherCache,
): Promise<{ snapshot: WeatherSnapshot; source: 'dtn' | 'mock' }> {
  const key = weatherCacheKey(airportCode, atUtc);
  const cached = cache.get(key);
  if (cached) return cached;

  const airport = getAirport(airportCode);
  if (!airport) {
    const snapshot = getMockWeather(airportCode, atUtc);
    const entry = { snapshot, source: 'mock' as const };
    cache.set(key, entry);
    return entry;
  }

  const hourIso = `${atUtc.slice(0, 13)}:00:00Z`;
  let entry: { snapshot: WeatherSnapshot; source: 'dtn' | 'mock' };

  if (useMockWeather()) {
    entry = { snapshot: getMockWeather(airportCode, atUtc), source: 'mock' };
  } else {
    try {
      const snapshot = await fetchHourlyForecast(airport.lon, airport.lat, hourIso);
      entry = { snapshot, source: 'dtn' };
    } catch {
      entry = { snapshot: getMockWeather(airportCode, atUtc), source: 'mock' };
    }
  }

  cache.set(key, entry);
  return entry;
}

function checkpointsForRule(
  rule: WeatherRule,
  flight: ScheduledFlight,
): Array<{ airport: string; time: string; checkPoint: 'departure' | 'arrival' }> {
  const points: Array<{ airport: string; time: string; checkPoint: 'departure' | 'arrival' }> = [];

  if (rule.checkPoint === 'departure' || rule.checkPoint === 'both') {
    points.push({
      airport: flight.origin,
      time: flight.departureUtc,
      checkPoint: 'departure',
    });
  }

  if (rule.checkPoint === 'arrival' || rule.checkPoint === 'both') {
    points.push({
      airport: flight.destination,
      time: flight.arrivalUtc,
      checkPoint: 'arrival',
    });
  }

  return points;
}

export async function evaluateFlights(
  rules: WeatherRule[],
  startDate = new Date('2026-07-15T00:00:00Z'),
): Promise<EvaluationSummary> {
  const flights = expandScheduleHorizon(SUMMER_2026_FLIGHTS, startDate, HORIZON_DAYS);
  const activeRules = rules.filter((rule) => rule.enabled);
  const cache: WeatherCache = new Map();
  const flags: FlaggedFlight[] = [];
  const sources = new Set<'dtn' | 'mock'>();

  for (const flight of flights) {
    for (const rule of activeRules) {
      for (const point of checkpointsForRule(rule, flight)) {
        if (!ruleAppliesToAirport(rule, point.airport)) continue;

        const { snapshot, source } = await resolveWeather(
          point.airport,
          point.time,
          cache,
        );
        sources.add(source);

        if (!evaluateRule(rule, snapshot)) continue;

        flags.push({
          flightId: flight.id,
          flightNumber: flight.flightNumber,
          origin: flight.origin,
          destination: flight.destination,
          checkPoint: point.checkPoint,
          airport: point.airport,
          scheduledTimeUtc: point.time,
          ruleId: rule.id,
          ruleName: rule.name,
          riskCategory: rule.riskCategory,
          weather: snapshot,
          dataSource: source,
        });
      }
    }
  }

  flags.sort(
    (a, b) =>
      new Date(a.scheduledTimeUtc).getTime() - new Date(b.scheduledTimeUtc).getTime(),
  );

  let weatherSource: EvaluationSummary['weatherSource'] = 'mock';
  if (sources.size === 2) weatherSource = 'mixed';
  else if (sources.has('dtn')) weatherSource = 'dtn';

  return {
    scannedFlights: flights.length,
    flaggedCount: flags.length,
    rulesActive: activeRules.length,
    horizonDays: HORIZON_DAYS,
    evaluatedAt: new Date().toISOString(),
    weatherSource,
    flags,
  };
}

export function getExpandedSchedule(startDate = new Date('2026-07-15T00:00:00Z')) {
  return expandScheduleHorizon(SUMMER_2026_FLIGHTS, startDate, HORIZON_DAYS);
}
