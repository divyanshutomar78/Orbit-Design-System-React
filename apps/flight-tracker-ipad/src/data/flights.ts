import { AIRPORTS } from './airports';

export type FlightStatus = 'en-route' | 'boarding' | 'landed' | 'delayed';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  status: FlightStatus;
  aircraft: string;
  registration: string;
  altitudeFt: number;
  speedKts: number;
  heading: number;
  progress: number;
  departureUtc: string;
  arrivalUtc: string;
  estimatedArrivalUtc: string;
  gate: string;
  terminal: string;
  latitude: number;
  longitude: number;
  passengers: number;
  crew: number;
  fuelKg: number;
}

export const TRACKED_FLIGHTS: Flight[] = [
  {
    id: 'aa-1234',
    flightNumber: 'AA 1234',
    airline: 'American Airlines',
    origin: 'EGLL',
    destination: 'ZSPD',
    status: 'en-route',
    aircraft: 'Boeing 787-9',
    registration: 'N823AN',
    altitudeFt: 38100,
    speedKts: 488,
    heading: 72,
    progress: 58,
    departureUtc: '2026-06-23T06:00:00Z',
    arrivalUtc: '2026-06-23T22:30:00Z',
    estimatedArrivalUtc: '2026-06-23T22:18:00Z',
    gate: 'B22',
    terminal: '5',
    latitude: 48.2,
    longitude: 62.5,
    passengers: 242,
    crew: 12,
    fuelKg: 28500,
  },
  {
    id: 'la-8054',
    flightNumber: 'LA 8054',
    airline: 'LATAM',
    origin: 'GRU',
    destination: 'EZE',
    status: 'en-route',
    aircraft: 'Airbus A320neo',
    registration: 'PR-TQB',
    altitudeFt: 36100,
    speedKts: 452,
    heading: 188,
    progress: 62,
    departureUtc: '2026-06-23T08:15:00Z',
    arrivalUtc: '2026-06-23T11:05:00Z',
    estimatedArrivalUtc: '2026-06-23T11:12:00Z',
    gate: 'B12',
    terminal: '2',
    latitude: -30.4,
    longitude: -52.1,
    passengers: 168,
    crew: 6,
    fuelKg: 4200,
  },
  {
    id: 'g3-1234',
    flightNumber: 'G3 1234',
    airline: 'GOL',
    origin: 'GIG',
    destination: 'GRU',
    status: 'boarding',
    aircraft: 'Boeing 737-800',
    registration: 'PR-GUM',
    altitudeFt: 0,
    speedKts: 0,
    heading: 0,
    progress: 0,
    departureUtc: '2026-06-23T14:30:00Z',
    arrivalUtc: '2026-06-23T15:45:00Z',
    estimatedArrivalUtc: '2026-06-23T15:45:00Z',
    gate: 'A7',
    terminal: '1',
    latitude: AIRPORTS.GIG.lat,
    longitude: AIRPORTS.GIG.lon,
    passengers: 174,
    crew: 5,
    fuelKg: 5100,
  },
  {
    id: 'ar-1302',
    flightNumber: 'AR 1302',
    airline: 'Aerolíneas Argentinas',
    origin: 'EZE',
    destination: 'LIM',
    status: 'delayed',
    aircraft: 'Boeing 737-MAX 8',
    registration: 'LV-GVE',
    altitudeFt: 0,
    speedKts: 0,
    heading: 0,
    progress: 0,
    departureUtc: '2026-06-23T10:00:00Z',
    arrivalUtc: '2026-06-23T15:20:00Z',
    estimatedArrivalUtc: '2026-06-23T16:05:00Z',
    gate: 'C3',
    terminal: '1',
    latitude: AIRPORTS.EZE.lat,
    longitude: AIRPORTS.EZE.lon,
    passengers: 162,
    crew: 6,
    fuelKg: 4800,
  },
  {
    id: 'av-9210',
    flightNumber: 'AV 9210',
    airline: 'Avianca',
    origin: 'BOG',
    destination: 'SCL',
    status: 'en-route',
    aircraft: 'Airbus A320',
    registration: 'N742AV',
    altitudeFt: 37800,
    speedKts: 468,
    heading: 215,
    progress: 41,
    departureUtc: '2026-06-23T06:40:00Z',
    arrivalUtc: '2026-06-23T12:10:00Z',
    estimatedArrivalUtc: '2026-06-23T12:04:00Z',
    gate: 'D14',
    terminal: '1',
    latitude: -8.2,
    longitude: -74.5,
    passengers: 156,
    crew: 5,
    fuelKg: 3900,
  },
  {
    id: 'la-2471',
    flightNumber: 'LA 2471',
    airline: 'LATAM',
    origin: 'SCL',
    destination: 'LIM',
    status: 'landed',
    aircraft: 'Airbus A321',
    registration: 'CC-BEM',
    altitudeFt: 0,
    speedKts: 0,
    heading: 0,
    progress: 100,
    departureUtc: '2026-06-23T04:10:00Z',
    arrivalUtc: '2026-06-23T07:55:00Z',
    estimatedArrivalUtc: '2026-06-23T07:52:00Z',
    gate: '8',
    terminal: 'International',
    latitude: AIRPORTS.LIM.lat,
    longitude: AIRPORTS.LIM.lon,
    passengers: 198,
    crew: 6,
    fuelKg: 1200,
  },
];

export function getFlightById(id: string): Flight | undefined {
  return TRACKED_FLIGHTS.find((flight) => flight.id === id);
}
