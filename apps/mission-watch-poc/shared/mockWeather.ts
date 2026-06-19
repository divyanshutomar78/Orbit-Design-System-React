import { getAirport } from './airports';
import type { WeatherField, WeatherSnapshot } from './types';

type MockProfile = {
  airport: string;
  hour: number;
  overrides: Partial<Record<WeatherField, number>>;
};

const MOCK_PROFILES: MockProfile[] = [
  {
    airport: 'MAD',
    hour: 14,
    overrides: {
      maxAirTemperatureInCelsius: 42,
      airTemperatureInCelsius: 41,
      windDirectionInDegrees: 270,
      windSpeedInKnots: 18,
      windGustInKnots: 28,
    },
  },
  {
    airport: 'CDG',
    hour: 16,
    overrides: {
      precipitationProbabilityInPercent: 65,
      precipitationAmountInMillimeter: 8,
      windGustInKnots: 30,
      cloudCoverInPercent: 90,
    },
  },
  {
    airport: 'LHR',
    hour: 6,
    overrides: {
      visibilityInMeter: 600,
      cloudCoverInPercent: 100,
      relativeHumidityInPercent: 95,
    },
  },
  {
    airport: 'MUC',
    hour: 8,
    overrides: {
      snowAmountInCentimeter: 3,
      airTemperatureInCelsius: -1,
      precipitationAmountInMillimeter: 4,
    },
  },
];

function baseWeather(): WeatherSnapshot {
  return {
    airTemperatureInCelsius: 18,
    maxAirTemperatureInCelsius: 22,
    minAirTemperatureInCelsius: 14,
    windSpeedInKnots: 10,
    windDirectionInDegrees: 220,
    windGustInKnots: 14,
    precipitationAmountInMillimeter: 0,
    precipitationProbabilityInPercent: 10,
    snowAmountInCentimeter: 0,
    visibilityInMeter: 9999,
    cloudCoverInPercent: 35,
    relativeHumidityInPercent: 55,
    airPressureAtSeaLevelInHectoPascal: 1013,
  };
}

export function getMockWeather(airportCode: string, atUtc: string): WeatherSnapshot {
  const airport = getAirport(airportCode);
  const hour = new Date(atUtc).getUTCHours();
  const weather = baseWeather();

  if (airport) {
    weather.airTemperatureInCelsius =
      12 + Math.sin((hour / 24) * Math.PI * 2) * 8 + (airport.lat - 45) * 0.2;
    weather.maxAirTemperatureInCelsius = (weather.airTemperatureInCelsius as number) + 3;
    weather.minAirTemperatureInCelsius = (weather.airTemperatureInCelsius as number) - 4;
  }

  const profile = MOCK_PROFILES.find(
    (entry) => entry.airport === airportCode.toUpperCase() && Math.abs(entry.hour - hour) <= 1,
  );

  if (profile) {
    Object.assign(weather, profile.overrides);
  }

  return weather;
}

export function weatherCacheKey(airportCode: string, atUtc: string): string {
  const hour = atUtc.slice(0, 13);
  return `${airportCode.toUpperCase()}@${hour}`;
}
