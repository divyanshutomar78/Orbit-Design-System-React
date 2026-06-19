import type { ScheduledFlight } from './types';

/**
 * Simulated IATA Summer 2026 schedule (SSIM-inspired fixed records).
 * Each entry represents a recurring flight operating on selected weekdays.
 */
export const SUMMER_2026_FLIGHTS: ScheduledFlight[] = [
  {
    id: 'U2-4521',
    flightNumber: 'U2-4521',
    origin: 'BCN',
    destination: 'MAD',
    departureUtc: '2026-07-15T06:30:00Z',
    arrivalUtc: '2026-07-15T07:45:00Z',
    aircraft: 'A320',
    daysOfOperation: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'U2-4522',
    flightNumber: 'U2-4522',
    origin: 'MAD',
    destination: 'BCN',
    departureUtc: '2026-07-15T08:30:00Z',
    arrivalUtc: '2026-07-15T09:45:00Z',
    aircraft: 'A320',
    daysOfOperation: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'BA-304',
    flightNumber: 'BA-304',
    origin: 'LHR',
    destination: 'CDG',
    departureUtc: '2026-07-15T10:15:00Z',
    arrivalUtc: '2026-07-15T12:30:00Z',
    aircraft: 'A319',
    daysOfOperation: [1, 2, 3, 4, 5],
  },
  {
    id: 'BA-305',
    flightNumber: 'BA-305',
    origin: 'CDG',
    destination: 'LHR',
    departureUtc: '2026-07-15T14:00:00Z',
    arrivalUtc: '2026-07-15T14:25:00Z',
    aircraft: 'A319',
    daysOfOperation: [1, 2, 3, 4, 5],
  },
  {
    id: 'LH-1102',
    flightNumber: 'LH-1102',
    origin: 'FRA',
    destination: 'MAD',
    departureUtc: '2026-07-15T11:00:00Z',
    arrivalUtc: '2026-07-15T13:20:00Z',
    aircraft: 'A321',
    daysOfOperation: [1, 3, 5, 7],
  },
  {
    id: 'LH-1103',
    flightNumber: 'LH-1103',
    origin: 'MAD',
    destination: 'FRA',
    departureUtc: '2026-07-15T14:30:00Z',
    arrivalUtc: '2026-07-15T16:45:00Z',
    aircraft: 'A321',
    daysOfOperation: [1, 3, 5, 7],
  },
  {
    id: 'AF-1680',
    flightNumber: 'AF-1680',
    origin: 'CDG',
    destination: 'JFK',
    departureUtc: '2026-07-15T13:30:00Z',
    arrivalUtc: '2026-07-15T16:15:00Z',
    aircraft: 'B777',
    daysOfOperation: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'KL-1004',
    flightNumber: 'KL-1004',
    origin: 'AMS',
    destination: 'MAD',
    departureUtc: '2026-07-15T07:00:00Z',
    arrivalUtc: '2026-07-15T09:30:00Z',
    aircraft: 'B737',
    daysOfOperation: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'EK-142',
    flightNumber: 'EK-142',
    origin: 'DXB',
    destination: 'LHR',
    departureUtc: '2026-07-15T02:30:00Z',
    arrivalUtc: '2026-07-15T07:05:00Z',
    aircraft: 'A380',
    daysOfOperation: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 'TK-1981',
    flightNumber: 'TK-1981',
    origin: 'IST',
    destination: 'MUC',
    departureUtc: '2026-07-15T05:45:00Z',
    arrivalUtc: '2026-07-15T07:30:00Z',
    aircraft: 'A321',
    daysOfOperation: [2, 4, 6],
  },
];

/** Raw SSIM header lines for reference / export in the POC. */
export const SSIM_HEADER = [
  '1AIRLINE STANDARD SCHEDULE DATA SET',
  '2LS2026SUMMER2026033012026092714',
  '3 EJU U2 0001 01JUL26 30SEP26',
  '4 EJU4521 0100007 01JUL26 30SEP26 7  BCN0630 MAD0745',
  '4 EJU4522 0100007 01JUL26 30SEP26 7  MAD0830 BCN0945',
  '4 BAW304  0100125 01JUL26 30SEP26 5  LHR1015 CDG1230',
  '4 BAW305  0100125 01JUL26 30SEP26 5  CDG1400 LHR1425',
].join('\n');

export function expandScheduleHorizon(
  templates: ScheduledFlight[],
  startDate: Date,
  horizonDays: number,
): ScheduledFlight[] {
  const expanded: ScheduledFlight[] = [];

  for (let dayOffset = 0; dayOffset < horizonDays; dayOffset += 1) {
    const date = new Date(startDate);
    date.setUTCDate(date.getUTCDate() + dayOffset);
    const weekday = date.getUTCDay() === 0 ? 7 : date.getUTCDay();

    for (const template of templates) {
      if (!template.daysOfOperation.includes(weekday)) continue;

      const dep = applyDate(template.departureUtc, date);
      const arr = applyDate(template.arrivalUtc, date);

      expanded.push({
        ...template,
        id: `${template.id}-${dep.slice(0, 10)}`,
        departureUtc: dep,
        arrivalUtc: arr,
      });
    }
  }

  return expanded.sort(
    (a, b) => new Date(a.departureUtc).getTime() - new Date(b.departureUtc).getTime(),
  );
}

function applyDate(isoTime: string, date: Date): string {
  const timePart = isoTime.slice(11);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}T${timePart}`;
}

export function parseSsimLine(line: string): Partial<ScheduledFlight> | null {
  const trimmed = line.trim();
  if (!trimmed.startsWith('4 ')) return null;

  const match = trimmed.match(
    /^4\s+\S+\s+\d+\s+\d{2}[A-Z]{3}\d{2}\s+\d{2}[A-Z]{3}\d{2}\s+\d\s+([A-Z]{3})(\d{4})\s+([A-Z]{3})(\d{4})/,
  );
  if (!match) return null;

  const [, origin, depTime, destination, arrTime] = match;
  const depIso = `${formatSsimTime(depTime)}Z`;
  const arrIso = `${formatSsimTime(arrTime)}Z`;

  return {
    origin,
    destination,
    departureUtc: `2026-07-15T${depIso}`,
    arrivalUtc: `2026-07-15T${arrIso}`,
  };
}

function formatSsimTime(hhmm: string): string {
  return `${hhmm.slice(0, 2)}:${hhmm.slice(2, 4)}:00`;
}
