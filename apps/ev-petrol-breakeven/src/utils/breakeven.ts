export interface BreakEvenInputs {
  evPrice: number;
  petrolPrice: number;
  evMileageKmPerKwh: number;
  petrolMileageKmPerL: number;
  dailyKm: number;
  electricityPricePerKwh: number;
  petrolFuelPricePerL: number;
}

export type Verdict = 'ev-now' | 'ev-later' | 'petrol';

export interface BreakEvenResult {
  evCostPerKm: number;
  petrolCostPerKm: number;
  dailyEvCost: number;
  dailyPetrolCost: number;
  dailySavings: number;
  priceDifference: number;
  breakEvenKm: number | null;
  breakEvenDays: number | null;
  fiveYearKm: number;
  fiveYearEvTotal: number;
  fiveYearPetrolTotal: number;
  fiveYearSavings: number;
  verdict: Verdict;
  headline: string;
  summary: string;
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const {
    evPrice,
    petrolPrice,
    evMileageKmPerKwh,
    petrolMileageKmPerL,
    dailyKm,
    electricityPricePerKwh,
    petrolFuelPricePerL,
  } = inputs;

  const evCostPerKm =
    evMileageKmPerKwh > 0 ? electricityPricePerKwh / evMileageKmPerKwh : 0;
  const petrolCostPerKm =
    petrolMileageKmPerL > 0 ? petrolFuelPricePerL / petrolMileageKmPerL : 0;

  const dailyEvCost = dailyKm * evCostPerKm;
  const dailyPetrolCost = dailyKm * petrolCostPerKm;
  const dailySavings = dailyPetrolCost - dailyEvCost;
  const priceDifference = evPrice - petrolPrice;
  const runningSavingsPerKm = petrolCostPerKm - evCostPerKm;

  let breakEvenKm: number | null = null;
  let verdict: Verdict = 'petrol';

  if (Math.abs(runningSavingsPerKm) < 0.0001) {
    verdict = priceDifference <= 0 ? 'ev-now' : 'petrol';
  } else if (runningSavingsPerKm > 0) {
    breakEvenKm = priceDifference / runningSavingsPerKm;
    verdict = breakEvenKm <= 0 ? 'ev-now' : 'ev-later';
    if (breakEvenKm <= 0) breakEvenKm = 0;
  } else {
    verdict = 'petrol';
  }

  const breakEvenDays =
    breakEvenKm != null && breakEvenKm > 0 && dailyKm > 0 ? breakEvenKm / dailyKm : null;

  const fiveYearKm = dailyKm * 365.25 * 5;
  const fiveYearEvTotal = evPrice + fiveYearKm * evCostPerKm;
  const fiveYearPetrolTotal = petrolPrice + fiveYearKm * petrolCostPerKm;
  const fiveYearSavings = fiveYearPetrolTotal - fiveYearEvTotal;

  const { headline, summary } = buildVerdictCopy(
    verdict,
    breakEvenKm,
    breakEvenDays,
    dailySavings,
    fiveYearSavings,
    priceDifference,
  );

  return {
    evCostPerKm,
    petrolCostPerKm,
    dailyEvCost,
    dailyPetrolCost,
    dailySavings,
    priceDifference,
    breakEvenKm: breakEvenKm != null && breakEvenKm > 0 ? breakEvenKm : null,
    breakEvenDays,
    fiveYearKm,
    fiveYearEvTotal,
    fiveYearPetrolTotal,
    fiveYearSavings,
    verdict,
    headline,
    summary,
  };
}

function buildVerdictCopy(
  verdict: Verdict,
  breakEvenKm: number | null,
  breakEvenDays: number | null,
  dailySavings: number,
  fiveYearSavings: number,
  priceDifference: number,
): { headline: string; summary: string } {
  if (verdict === 'ev-now') {
    return {
      headline: 'Yes — EV is worth it',
      summary:
        priceDifference <= 0
          ? 'The EV costs the same or less upfront and is cheaper to run every day.'
          : `You save ${formatCurrency(Math.abs(dailySavings))}/day on running costs, and the price gap is already covered.`,
    };
  }

  if (verdict === 'ev-later' && breakEvenKm != null && breakEvenDays != null) {
    return {
      headline: 'Maybe — EV pays back over time',
      summary: `The EV costs ${formatCurrency(priceDifference)} more to buy, but you save ${formatCurrency(Math.abs(dailySavings))}/day on fuel. Break-even is around ${formatKm(breakEvenKm)} (${formatDuration(breakEvenDays)} at your daily driving). Over 5 years you'd save ${formatCurrency(Math.abs(fiveYearSavings))}.`,
    };
  }

  return {
    headline: 'No — petrol is the better buy',
    summary:
      dailySavings < 0
        ? `Petrol is cheaper per km and saves you ${formatCurrency(Math.abs(dailySavings))}/day. The EV premium won't recover at your driving level.`
        : 'Running costs are similar, but the petrol car is cheaper upfront with no payback period.',
  };
}

export function parseInputs(raw: Record<string, string>): BreakEvenInputs {
  return {
    evPrice: Math.max(0, Number(raw.evPrice) || 0),
    petrolPrice: Math.max(0, Number(raw.petrolPrice) || 0),
    evMileageKmPerKwh: Math.max(0.1, Number(raw.evMileage) || 0.1),
    petrolMileageKmPerL: Math.max(0.1, Number(raw.petrolMileage) || 0.1),
    dailyKm: Math.max(0, Number(raw.dailyKm) || 0),
    electricityPricePerKwh: Math.max(0, Number(raw.electricityPrice) || 0),
    petrolFuelPricePerL: Math.max(0, Number(raw.petrolFuelPrice) || 0),
  };
}

export function formatCurrency(value: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export function formatKm(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k km`;
  }
  return `${Math.round(value)} km`;
}

export function formatDuration(days: number | null): string {
  if (days == null || !Number.isFinite(days) || days <= 0) return '—';
  if (days < 60) return `${Math.round(days)} days`;
  if (days < 730) return `${(days / 30.44).toFixed(1)} months`;
  return `${(days / 365.25).toFixed(1)} years`;
}

export interface CumulativeCostPoint {
  year: number;
  label: string;
  evTotal: number;
  petrolTotal: number;
}

export function buildCumulativeCostSeries(inputs: BreakEvenInputs): CumulativeCostPoint[] {
  const evCostPerKm =
    inputs.evMileageKmPerKwh > 0 ? inputs.electricityPricePerKwh / inputs.evMileageKmPerKwh : 0;
  const petrolCostPerKm =
    inputs.petrolMileageKmPerL > 0 ? inputs.petrolFuelPricePerL / inputs.petrolMileageKmPerL : 0;
  const kmPerYear = inputs.dailyKm * 365.25;

  const points: CumulativeCostPoint[] = [];
  for (let year = 0; year <= 5; year += 0.5) {
    const km = kmPerYear * year;
    points.push({
      year,
      label: year === 0 ? 'Now' : year % 1 === 0 ? `Y${year}` : '',
      evTotal: inputs.evPrice + km * evCostPerKm,
      petrolTotal: inputs.petrolPrice + km * petrolCostPerKm,
    });
  }
  return points;
}

export interface OwnershipBreakdown {
  evPurchase: number;
  evRunning: number;
  petrolPurchase: number;
  petrolRunning: number;
}

export function buildOwnershipBreakdown(
  inputs: BreakEvenInputs,
  result: BreakEvenResult,
): OwnershipBreakdown {
  const runningEv = result.fiveYearKm * result.evCostPerKm;
  const runningPetrol = result.fiveYearKm * result.petrolCostPerKm;

  return {
    evPurchase: inputs.evPrice,
    evRunning: runningEv,
    petrolPurchase: inputs.petrolPrice,
    petrolRunning: runningPetrol,
  };
}

export function formatCompactCurrency(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return formatCurrency(value);
}
