export interface EmiBreakdown {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

export interface AmortizationRow {
  month: number;
  emi: number;
  interest: number;
  principal: number;
  balance: number;
}

export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): EmiBreakdown {
  if (principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0 };
  }

  if (annualRatePercent <= 0) {
    const emi = principal / tenureMonths;
    return {
      emi,
      totalPayment: emi * tenureMonths,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalPayment, totalInterest };
}

export function buildAmortizationSchedule(
  principal: number,
  annualRatePercent: number,
  tenureMonths: number,
): AmortizationRow[] {
  const { emi } = calculateEmi(principal, annualRatePercent, tenureMonths);
  if (emi <= 0) {
    return [];
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  let balance = principal;
  const rows: AmortizationRow[] = [];

  for (let month = 1; month <= tenureMonths; month += 1) {
    const interest = monthlyRate > 0 ? balance * monthlyRate : 0;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);

    rows.push({
      month,
      emi,
      interest,
      principal: principalPaid,
      balance,
    });
  }

  return rows;
}

export function formatCurrency(value: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
