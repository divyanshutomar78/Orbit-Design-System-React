import type { Airport } from './types';

export const AIRPORTS: Record<string, Airport> = {
  MAD: { iata: 'MAD', icao: 'LEMD', name: 'Madrid-Barajas', lat: 40.4936, lon: -3.5668 },
  BCN: { iata: 'BCN', icao: 'LEBL', name: 'Barcelona El Prat', lat: 41.2971, lon: 2.0785 },
  LHR: { iata: 'LHR', icao: 'EGLL', name: 'London Heathrow', lat: 51.47, lon: -0.4543 },
  CDG: { iata: 'CDG', icao: 'LFPG', name: 'Paris Charles de Gaulle', lat: 49.0097, lon: 2.5479 },
  FRA: { iata: 'FRA', icao: 'EDDF', name: 'Frankfurt', lat: 50.0264, lon: 8.5431 },
  AMS: { iata: 'AMS', icao: 'EHAM', name: 'Amsterdam Schiphol', lat: 52.3105, lon: 4.7683 },
  JFK: { iata: 'JFK', icao: 'KJFK', name: 'New York JFK', lat: 40.6413, lon: -73.7781 },
  DXB: { iata: 'DXB', icao: 'OMDB', name: 'Dubai International', lat: 25.2532, lon: 55.3657 },
  IST: { iata: 'IST', icao: 'LTFM', name: 'Istanbul', lat: 41.2753, lon: 28.7519 },
  MUC: { iata: 'MUC', icao: 'EDDM', name: 'Munich', lat: 48.3538, lon: 11.7861 },
};

export function getAirport(code: string): Airport | undefined {
  return AIRPORTS[code.toUpperCase()];
}

export function airportCoords(code: string): { lat: number; lon: number } | undefined {
  const airport = getAirport(code);
  if (!airport) return undefined;
  return { lat: airport.lat, lon: airport.lon };
}
