export type ComfortLevel = 'conservative' | 'balanced' | 'flexible';

export interface AffordabilityInput {
  monthlySalary: number;
  existingEmis: number;
  monthlyExpenses: number;
  downPaymentSavings: number;
  interestRate: number;
  comfortLevel: ComfortLevel;
}

export interface TenureScenario {
  tenureMonths: number;
  tenureLabel: string;
  emi: number;
  loanAmount: number;
  carBudget: number;
  recommended: boolean;
}

export interface AffordabilityResult {
  idealEmi: number;
  maxSafeEmi: number;
  idealTenureMonths: number;
  idealTenureLabel: string;
  recommendedCarBudget: number;
  conservativeCarBudget: number;
  maxCarBudget: number;
  recommendedDownPayment: number;
  recommendedLoanAmount: number;
  disposableIncome: number;
  emiToIncomePercent: number;
  salaryMonthsCap: number;
  scenarios: TenureScenario[];
  tips: string[];
}

const EMI_PERCENT: Record<ComfortLevel, number> = {
  conservative: 0.1,
  balanced: 0.15,
  flexible: 0.2,
};

const SALARY_MONTHS_CAP: Record<ComfortLevel, number> = {
  conservative: 6,
  balanced: 8,
  flexible: 10,
};

const TOTAL_DEBT_CAP = 0.4;
const IDEAL_TENURE_MONTHS = 60;
const MIN_DOWN_PAYMENT_RATIO = 0.2;

export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent <= 0) return principal / tenureMonths;

  const monthlyRate = annualRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function loanFromEmi(
  emi: number,
  annualRatePercent: number,
  tenureMonths: number,
): number {
  if (emi <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent <= 0) return emi * tenureMonths;

  const monthlyRate = annualRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  return (emi * (factor - 1)) / (monthlyRate * factor);
}

function formatTenure(months: number): string {
  const years = months / 12;
  return Number.isInteger(years) ? `${years} years` : `${months} months`;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function calculateAffordability(input: AffordabilityInput): AffordabilityResult {
  const {
    monthlySalary,
    existingEmis,
    monthlyExpenses,
    downPaymentSavings,
    interestRate,
    comfortLevel,
  } = input;

  const disposableIncome = Math.max(0, monthlySalary - monthlyExpenses - existingEmis);
  const debtHeadroom = Math.max(0, monthlySalary * TOTAL_DEBT_CAP - existingEmis);
  const comfortEmiCap = monthlySalary * EMI_PERCENT[comfortLevel];
  const idealEmi = roundTo(Math.min(comfortEmiCap, debtHeadroom, disposableIncome * 0.35), 500);
  const maxSafeEmi = roundTo(Math.min(monthlySalary * 0.2, debtHeadroom), 500);

  const salaryCapBudget = monthlySalary * SALARY_MONTHS_CAP[comfortLevel];
  const maxSalaryCapBudget = monthlySalary * 12;

  const idealTenureMonths = IDEAL_TENURE_MONTHS;
  const idealLoanFromEmi = loanFromEmi(idealEmi, interestRate, idealTenureMonths);
  const emiBasedBudget = downPaymentSavings + idealLoanFromEmi;

  const recommendedCarBudget = roundTo(
    Math.min(emiBasedBudget, salaryCapBudget, maxSalaryCapBudget),
    10000,
  );

  const conservativeLoan = loanFromEmi(idealEmi * 0.85, interestRate, 48);
  const conservativeCarBudget = roundTo(
    Math.min(downPaymentSavings + conservativeLoan, monthlySalary * 6),
    10000,
  );

  const maxLoanFromEmi = loanFromEmi(maxSafeEmi, interestRate, 84);
  const maxCarBudget = roundTo(
    Math.min(downPaymentSavings + maxLoanFromEmi, maxSalaryCapBudget),
    10000,
  );

  const recommendedDownPayment = roundTo(
    Math.min(
      downPaymentSavings,
      Math.max(recommendedCarBudget * MIN_DOWN_PAYMENT_RATIO, downPaymentSavings * 0.5),
    ),
    5000,
  );

  const recommendedLoanAmount = Math.max(0, recommendedCarBudget - recommendedDownPayment);

  const tenureOptions = [
    { months: 36, label: '3 years' },
    { months: 48, label: '4 years' },
    { months: 60, label: '5 years' },
    { months: 72, label: '6 years' },
    { months: 84, label: '7 years' },
  ];

  const scenarios: TenureScenario[] = tenureOptions.map(({ months, label }) => {
    const loanAmount = loanFromEmi(idealEmi, interestRate, months);
    const carBudget = roundTo(downPaymentSavings + loanAmount, 10000);
    return {
      tenureMonths: months,
      tenureLabel: label,
      emi: idealEmi,
      loanAmount: roundTo(loanAmount, 1000),
      carBudget,
      recommended: months === idealTenureMonths,
    };
  });

  const tips: string[] = [];

  if (monthlySalary <= 0) {
    tips.push('Enter your monthly take-home salary to get personalised recommendations.');
  } else {
    tips.push(
      `Keep your car EMI at or below ${Math.round(EMI_PERCENT[comfortLevel] * 100)}% of take-home pay (about ₹${idealEmi.toLocaleString('en-IN')}/month).`,
    );
    tips.push(
      `A ${formatTenure(idealTenureMonths)} loan balances manageable EMIs with lower total interest than longer tenures.`,
    );
  }

  if (existingEmis > monthlySalary * 0.3) {
    tips.push(
      'Your existing EMIs are high relative to income. Consider clearing some debt before taking a car loan.',
    );
  }

  if (downPaymentSavings < recommendedCarBudget * MIN_DOWN_PAYMENT_RATIO && recommendedCarBudget > 0) {
    tips.push(
      `Aim for at least 20% down payment (₹${roundTo(recommendedCarBudget * MIN_DOWN_PAYMENT_RATIO, 5000).toLocaleString('en-IN')}) to reduce interest and EMI burden.`,
    );
  } else if (downPaymentSavings >= recommendedCarBudget * 0.3) {
    tips.push('Your down payment savings are healthy — this will keep your loan amount lower.');
  }

  if (disposableIncome < idealEmi) {
    tips.push(
      'After expenses and existing EMIs, your free cash flow is tight. A smaller car or longer savings period may be safer.',
    );
  }

  if (comfortLevel === 'flexible') {
    tips.push(
      'Flexible mode allows up to 20% EMI-to-income. Stay closer to 10–15% if you want room for emergencies.',
    );
  }

  return {
    idealEmi,
    maxSafeEmi,
    idealTenureMonths,
    idealTenureLabel: formatTenure(idealTenureMonths),
    recommendedCarBudget,
    conservativeCarBudget,
    maxCarBudget,
    recommendedDownPayment,
    recommendedLoanAmount,
    disposableIncome,
    emiToIncomePercent: monthlySalary > 0 ? (idealEmi / monthlySalary) * 100 : 0,
    salaryMonthsCap: SALARY_MONTHS_CAP[comfortLevel],
    scenarios,
    tips,
  };
}

export function formatCurrency(value: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
