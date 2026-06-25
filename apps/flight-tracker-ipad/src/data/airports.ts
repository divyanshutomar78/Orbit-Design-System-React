export interface Airport {
  iata: string;
  icao: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
}

export const AIRPORTS: Record<string, Airport> = {
  EGLL: {
    iata: 'EGLL',
    icao: 'EGLL',
    name: 'London Heathrow',
    city: 'London',
    lat: 51.47,
    lon: -0.4543,
    timezone: 'Europe/London',
  },
  ZSPD: {
    iata: 'ZSPD',
    icao: 'ZSPD',
    name: 'Shanghai Pudong',
    city: 'Shanghai',
    lat: 31.1434,
    lon: 121.8052,
    timezone: 'Asia/Shanghai',
  },
  GRU: {
    iata: 'GRU',
    icao: 'SBGR',
    name: 'São Paulo Guarulhos',
    city: 'São Paulo',
    lat: -23.4356,
    lon: -46.4731,
    timezone: 'America/Sao_Paulo',
  },
  GIG: {
    iata: 'GIG',
    icao: 'SBGL',
    name: 'Rio de Janeiro Galeão',
    city: 'Rio de Janeiro',
    lat: -22.809,
    lon: -43.2506,
    timezone: 'America/Sao_Paulo',
  },
  EZE: {
    iata: 'EZE',
    icao: 'SAEZ',
    name: 'Buenos Aires Ezeiza',
    city: 'Buenos Aires',
    lat: -34.8222,
    lon: -58.5358,
    timezone: 'America/Argentina/Buenos_Aires',
  },
  LIM: {
    iata: 'LIM',
    icao: 'SPJC',
    name: 'Jorge Chávez',
    city: 'Lima',
    lat: -12.0219,
    lon: -77.1143,
    timezone: 'America/Lima',
  },
  BOG: {
    iata: 'BOG',
    icao: 'SKBO',
    name: 'El Dorado',
    city: 'Bogotá',
    lat: 4.7016,
    lon: -74.1469,
    timezone: 'America/Bogota',
  },
  SCL: {
    iata: 'SCL',
    icao: 'SCEL',
    name: 'Arturo Merino Benítez',
    city: 'Santiago',
    lat: -33.393,
    lon: -70.7858,
    timezone: 'America/Santiago',
  },
};

export function airportName(iata: string): string {
  return AIRPORTS[iata]?.name ?? iata;
}

export function routeLabel(origin: string, destination: string): string {
  return `${origin} → ${destination}`;
}

export interface TrackedAirport extends Airport {
  activeFlights: number;
}

export function getTrackedAirports(
  flights: { origin: string; destination: string; status: string }[],
): TrackedAirport[] {
  const counts = new Map<string, number>();

  for (const flight of flights) {
    if (flight.status === 'landed') continue;
    counts.set(flight.origin, (counts.get(flight.origin) ?? 0) + 1);
    counts.set(flight.destination, (counts.get(flight.destination) ?? 0) + 1);
  }

  return Object.values(AIRPORTS)
    .map((airport) => ({
      ...airport,
      activeFlights: counts.get(airport.iata) ?? 0,
    }))
    .sort((a, b) => a.iata.localeCompare(b.iata));
}
