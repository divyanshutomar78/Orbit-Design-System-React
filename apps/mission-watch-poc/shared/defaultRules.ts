import type { WeatherRule } from './types';

export const DEFAULT_RULES: WeatherRule[] = [
  {
    id: 'mad-heat-windshear',
    name: 'MAD heat + westerly wind',
    airport: 'MAD',
    checkPoint: 'departure',
    logic: 'and',
    riskCategory: 'Performance / wind shear risk',
    enabled: true,
    conditions: [
      { field: 'maxAirTemperatureInCelsius', operator: 'gt', value: 40 },
      {
        field: 'windDirectionInDegrees',
        operator: 'between',
        value: 250,
        valueTo: 290,
      },
    ],
  },
  {
    id: 'snow-ops-slowdown',
    name: 'Snow forecast slowdown',
    airport: '*',
    checkPoint: 'both',
    logic: 'or',
    riskCategory: 'Operational slowdown (snow)',
    enabled: true,
    conditions: [
      { field: 'snowAmountInCentimeter', operator: 'gt', value: 0 },
      { field: 'precipitationAmountInMillimeter', operator: 'gt', value: 5 },
    ],
  },
  {
    id: 'cdg-thunderstorm',
    name: 'CDG thunderstorm risk',
    airport: 'CDG',
    checkPoint: 'arrival',
    logic: 'and',
    riskCategory: 'Thunderstorm / connection risk',
    enabled: true,
    conditions: [
      { field: 'precipitationProbabilityInPercent', operator: 'gte', value: 60 },
      { field: 'windGustInKnots', operator: 'gte', value: 25 },
    ],
  },
  {
    id: 'lhr-low-visibility',
    name: 'LHR low visibility',
    airport: 'LHR',
    checkPoint: 'both',
    logic: 'and',
    riskCategory: 'Low visibility operations',
    enabled: true,
    conditions: [{ field: 'visibilityInMeter', operator: 'lt', value: 800 }],
  },
];
