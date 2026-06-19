import { DTN_HOURLY_FIELDS } from '../shared/weatherFields';
import type { WeatherSnapshot } from '../shared/types';

const AUTH_URL = 'https://auth.weather.mg/oauth/token';
const FORECAST_URL = 'https://point-forecast.weather.mg/forecast/hourly';

type TokenCache = {
  token: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

export function isDtnConfigured(): boolean {
  return Boolean(process.env.DTN_CLIENT_ID && process.env.DTN_CLIENT_SECRET);
}

export function useMockWeather(): boolean {
  return process.env.USE_MOCK_WEATHER === 'true' || !isDtnConfigured();
}

async function fetchAccessToken(): Promise<string> {
  const clientId = process.env.DTN_CLIENT_ID;
  const clientSecret = process.env.DTN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('DTN credentials not configured');
  }

  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`DTN auth failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in?: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token;
}

export async function testDtnConnection(): Promise<boolean> {
  if (!isDtnConfigured()) return false;
  try {
    await fetchAccessToken();
    return true;
  } catch {
    return false;
  }
}

export async function fetchHourlyForecast(
  lon: number,
  lat: number,
  validFrom: string,
): Promise<WeatherSnapshot> {
  const token = await fetchAccessToken();
  const validUntil = new Date(new Date(validFrom).getTime() + 60 * 60 * 1000).toISOString();
  const fields = DTN_HOURLY_FIELDS.join(',');

  const url = new URL(FORECAST_URL);
  url.searchParams.set('locatedAt', `${lon},${lat}`);
  url.searchParams.set('validFrom', validFrom);
  url.searchParams.set('validUntil', validUntil);
  url.searchParams.set('validPeriod', 'PT0S');
  url.searchParams.set('fields', fields);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`DTN forecast failed (${response.status}): ${body}`);
  }

  const payload = (await response.json()) as {
    data?: Array<{ parameters?: Record<string, unknown> }>;
  };

  const parameters = payload.data?.[0]?.parameters ?? {};
  const snapshot: WeatherSnapshot = {};

  for (const field of DTN_HOURLY_FIELDS) {
    const value = parameters[field];
    snapshot[field] = typeof value === 'number' ? value : value == null ? null : Number(value);
  }

  return snapshot;
}
