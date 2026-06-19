export type Airport = {
  iata: string;
  icao: string;
  name: string;
  lat: number;
  lon: number;
};

export type ScheduledFlight = {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureUtc: string;
  arrivalUtc: string;
  aircraft: string;
  daysOfOperation: number[];
};

export type RuleOperator = 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'between' | 'contains';

export type RuleCondition = {
  field: WeatherField;
  operator: RuleOperator;
  value: number | string;
  valueTo?: number;
};

export type WeatherRule = {
  id: string;
  name: string;
  airport: string;
  checkPoint: 'departure' | 'arrival' | 'both';
  conditions: RuleCondition[];
  logic: 'and' | 'or';
  riskCategory: string;
  enabled: boolean;
};

export type WeatherField =
  | 'airTemperatureInCelsius'
  | 'maxAirTemperatureInCelsius'
  | 'minAirTemperatureInCelsius'
  | 'windSpeedInKnots'
  | 'windDirectionInDegrees'
  | 'windGustInKnots'
  | 'precipitationAmountInMillimeter'
  | 'precipitationProbabilityInPercent'
  | 'snowAmountInCentimeter'
  | 'visibilityInMeter'
  | 'cloudCoverInPercent'
  | 'relativeHumidityInPercent'
  | 'airPressureAtSeaLevelInHectoPascal';

export type WeatherSnapshot = Partial<Record<WeatherField, number | string | null>>;

export type FlaggedFlight = {
  flightId: string;
  flightNumber: string;
  origin: string;
  destination: string;
  checkPoint: 'departure' | 'arrival';
  airport: string;
  scheduledTimeUtc: string;
  ruleId: string;
  ruleName: string;
  riskCategory: string;
  weather: WeatherSnapshot;
  dataSource: 'dtn' | 'mock';
};

export type EvaluationSummary = {
  scannedFlights: number;
  flaggedCount: number;
  rulesActive: number;
  horizonDays: number;
  evaluatedAt: string;
  weatherSource: 'dtn' | 'mock' | 'mixed';
  flags: FlaggedFlight[];
};

export type ApiStatus = {
  dtnConfigured: boolean;
  dtnConnected: boolean;
  mockWeather: boolean;
  scheduleFlights: number;
  rulesCount: number;
};
