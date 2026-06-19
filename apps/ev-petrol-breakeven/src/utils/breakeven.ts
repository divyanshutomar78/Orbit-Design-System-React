export interface BreakEvenInputs {
  evPrice: number;
  petrolPrice: number;
  evMileageKmPerKwh: number;
  petrolMileageKmPerL: number;
  dailyKm: number;
  electricityPricePerKwh: number;
  petrolFuelPricePerL: number;
}

export interface BreakEvenResult {
  evCostPerKm: number;
  petrolCostPerKm: number;
  dailyEvCost: number;
  dailyPetrolCost: number;
  dailySavings: number;
  monthlyEvCost: number;
  monthlyPetrolCost: number;
  yearlyEvCost: number;
  yearlyPetrolCost: number;
  priceDifference: number;
  breakEvenKm: number | null;
  breakEvenDays: number | null;
  breakEvenMonths: number | null;
  breakEvenYears: number | null;
  verdict: 'ev-now' | 'ev-later' | 'petrol' | 'no-breakeven';
  verdictDetail: string;
}

export interface CostSnapshot {
  label: string;
  km: number;
  evTotal: number;
  petrolTotal: number;
  cheaper: 'ev' | 'petrol' | 'tie';
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

  let breakEvenKm: number | null = null;
  let verdict: BreakEvenResult['verdict'] = 'no-breakeven';
  let verdictDetail = '';

  const runningSavingsPerKm = petrolCostPerKm - evCostPerKm;

  if (Math.abs(runningSavingsPerKm) < 0.0001) {
    if (priceDifference <= 0) {
      verdict = 'ev-now';
      verdictDetail = 'EV purchase price is equal or lower, with similar running costs.';
    } else {
      verdict = 'petrol';
      verdictDetail = 'Running costs are similar, but the petrol car costs less upfront.';
    }
  } else if (runningSavingsPerKm > 0) {
    breakEvenKm = priceDifference / runningSavingsPerKm;
    if (breakEvenKm <= 0) {
      verdict = 'ev-now';
      verdictDetail = 'EV is cheaper to buy and cheaper to run from day one.';
      breakEvenKm = 0;
    } else {
      verdict = 'ev-later';
      verdictDetail = 'EV costs more upfront, but running savings recover the difference over distance.';
    }
  } else if (priceDifference >= 0) {
    verdict = 'petrol';
    verdictDetail = 'Petrol is cheaper upfront and cheaper per km — EV never breaks even.';
  } else {
    verdict = 'petrol';
    verdictDetail = 'EV is cheaper to buy, but petrol running costs are lower over time.';
    breakEvenKm = priceDifference / runningSavingsPerKm;
    if (breakEvenKm < 0) {
      breakEvenKm = Math.abs(breakEvenKm);
      verdictDetail = `Petrol total cost catches up after about ${formatKm(breakEvenKm)}.`;
    }
  }

  const breakEvenDays =
    breakEvenKm != null && breakEvenKm > 0 && dailyKm > 0 ? breakEvenKm / dailyKm : null;
  const breakEvenMonths = breakEvenDays != null ? breakEvenDays / 30.44 : null;
  const breakEvenYears = breakEvenDays != null ? breakEvenDays / 365.25 : null;

  return {
    evCostPerKm,
    petrolCostPerKm,
    dailyEvCost,
    dailyPetrolCost,
    dailySavings,
    monthlyEvCost: dailyEvCost * 30.44,
    monthlyPetrolCost: dailyPetrolCost * 30.44,
    yearlyEvCost: dailyEvCost * 365.25,
    yearlyPetrolCost: dailyPetrolCost * 365.25,
    priceDifference,
    breakEvenKm: breakEvenKm != null && breakEvenKm > 0 ? breakEvenKm : null,
    breakEvenDays,
    breakEvenMonths,
    breakEvenYears,
    verdict,
    verdictDetail,
  };
}

export function buildCostSnapshots(
  inputs: BreakEvenInputs,
  breakEvenKm: number | null,
): CostSnapshot[] {
  const { evPrice, petrolPrice, evMileageKmPerKwh, petrolMileageKmPerL, dailyKm } = inputs;
  const evCpk =
    evMileageKmPerKwh > 0 ? inputs.electricityPricePerKwh / evMileageKmPerKwh : 0;
  const petrolCpk =
    petrolMileageKmPerL > 0 ? inputs.petrolFuelPricePerL / petrolMileageKmPerL : 0;

  const milestones = new Set<number>([0]);

  if (dailyKm > 0) {
    milestones.add(dailyKm * 365.25);
    milestones.add(dailyKm * 365.25 * 3);
    milestones.add(dailyKm * 365.25 * 5);
  }

  if (breakEvenKm != null && breakEvenKm > 0) {
    milestones.add(breakEvenKm);
  }

  const sorted = [...milestones].sort((a, b) => a - b);

  return sorted.map((km) => {
    const evTotal = evPrice + km * evCpk;
    const petrolTotal = petrolPrice + km * petrolCpk;
    let cheaper: CostSnapshot['cheaper'] = 'tie';
    if (evTotal < petrolTotal - 1) cheaper = 'ev';
    else if (petrolTotal < evTotal - 1) cheaper = 'petrol';

    let label = formatKm(km);
    if (km === 0) label = 'Purchase';
    else if (breakEvenKm != null && Math.abs(km - breakEvenKm) < 1) label = 'Break-even';
    else if (dailyKm > 0 && Math.abs(km - dailyKm * 365.25) < 1) label = '1 year';
    else if (dailyKm > 0 && Math.abs(km - dailyKm * 365.25 * 3) < 1) label = '3 years';
    else if (dailyKm > 0 && Math.abs(km - dailyKm * 365.25 * 5) < 1) label = '5 years';

    return { label, km, evTotal, petrolTotal, cheaper };
  });
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
  if (days == null || !Number.isFinite(days) || days <= 0) {
    return '—';
  }
  if (days < 60) {
    return `${Math.round(days)} days`;
  }
  if (days < 730) {
    return `${(days / 30.44).toFixed(1)} months`;
  }
  return `${(days / 365.25).toFixed(1)} years`;
}
