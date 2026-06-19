import type { WeatherField } from './types';

/** Representative DTN hourly forecast fields (subset of ~90 available parameters). */
export const DTN_HOURLY_FIELDS: WeatherField[] = [
  'airTemperatureInCelsius',
  'maxAirTemperatureInCelsius',
  'minAirTemperatureInCelsius',
  'windSpeedInKnots',
  'windDirectionInDegrees',
  'windGustInKnots',
  'precipitationAmountInMillimeter',
  'precipitationProbabilityInPercent',
  'snowAmountInCentimeter',
  'visibilityInMeter',
  'cloudCoverInPercent',
  'relativeHumidityInPercent',
  'airPressureAtSeaLevelInHectoPascal',
];

export const FIELD_LABELS: Record<WeatherField, string> = {
  airTemperatureInCelsius: 'Temperature (°C)',
  maxAirTemperatureInCelsius: 'Max temperature (°C)',
  minAirTemperatureInCelsius: 'Min temperature (°C)',
  windSpeedInKnots: 'Wind speed (kt)',
  windDirectionInDegrees: 'Wind direction (°)',
  windGustInKnots: 'Wind gust (kt)',
  precipitationAmountInMillimeter: 'Precipitation (mm)',
  precipitationProbabilityInPercent: 'Precipitation probability (%)',
  snowAmountInCentimeter: 'Snow (cm)',
  visibilityInMeter: 'Visibility (m)',
  cloudCoverInPercent: 'Cloud cover (%)',
  relativeHumidityInPercent: 'Relative humidity (%)',
  airPressureAtSeaLevelInHectoPascal: 'Pressure (hPa)',
};
