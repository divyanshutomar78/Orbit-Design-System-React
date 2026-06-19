import type { RuleCondition, WeatherRule, WeatherSnapshot } from './types';

export function evaluateCondition(
  condition: RuleCondition,
  weather: WeatherSnapshot,
): boolean {
  const actual = weather[condition.field];
  if (actual === null || actual === undefined) return false;

  const numericActual = typeof actual === 'number' ? actual : Number(actual);
  const numericValue =
    typeof condition.value === 'number' ? condition.value : Number(condition.value);

  switch (condition.operator) {
    case 'gt':
      return numericActual > numericValue;
    case 'gte':
      return numericActual >= numericValue;
    case 'lt':
      return numericActual < numericValue;
    case 'lte':
      return numericActual <= numericValue;
    case 'eq':
      return numericActual === numericValue;
    case 'between':
      return (
        numericActual >= numericValue &&
        numericActual <= (condition.valueTo ?? numericValue)
      );
    case 'contains':
      return String(actual).toLowerCase().includes(String(condition.value).toLowerCase());
    default:
      return false;
  }
}

export function evaluateRule(
  rule: WeatherRule,
  weather: WeatherSnapshot,
): boolean {
  if (!rule.enabled) return false;

  const results = rule.conditions.map((condition) =>
    evaluateCondition(condition, weather),
  );

  return rule.logic === 'and' ? results.every(Boolean) : results.some(Boolean);
}

export function ruleAppliesToAirport(rule: WeatherRule, airport: string): boolean {
  if (rule.airport === '*') return true;
  return rule.airport.toUpperCase() === airport.toUpperCase();
}
