import { useMemo, useState } from 'react';
import {
  Button,
  InputSelect,
  LabelValueHorizontal,
} from 'orbit-ds-components';

import {
  buildAmortizationSchedule,
  calculateEmi,
  formatCurrency,
} from '../utils/emi';
import { NumberField } from './NumberField';
import './EmiCalculator.css';

const TENURE_OPTIONS = [
  { value: '12', label: '1 year' },
  { value: '24', label: '2 years' },
  { value: '36', label: '3 years' },
  { value: '48', label: '4 years' },
  { value: '60', label: '5 years' },
  { value: '72', label: '6 years' },
  { value: '84', label: '7 years' },
];

const DEFAULT_LOAN = 800000;
const DEFAULT_RATE = 9.5;

export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(String(DEFAULT_LOAN));
  const [interestRate, setInterestRate] = useState(String(DEFAULT_RATE));
  const [tenureMonths, setTenureMonths] = useState('60');
  const [submitted, setSubmitted] = useState({
    principal: DEFAULT_LOAN,
    rate: DEFAULT_RATE,
    months: 60,
  });

  const breakdown = useMemo(
    () => calculateEmi(submitted.principal, submitted.rate, submitted.months),
    [submitted],
  );

  const schedule = useMemo(
    () => buildAmortizationSchedule(submitted.principal, submitted.rate, submitted.months),
    [submitted],
  );

  const handleCalculate = () => {
    const principal = Math.max(0, Number(loanAmount) || 0);
    const rate = Math.max(0, Number(interestRate) || 0);
    const months = Math.max(1, Number(tenureMonths) || 1);

    setSubmitted({ principal, rate, months });
  };

  const handleReset = () => {
    setLoanAmount(String(DEFAULT_LOAN));
    setInterestRate(String(DEFAULT_RATE));
    setTenureMonths('60');
    setSubmitted({ principal: DEFAULT_LOAN, rate: DEFAULT_RATE, months: 60 });
  };

  return (
    <section className="emi-calculator">
      <form
        className="emi-calculator__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleCalculate();
        }}
      >
        <NumberField
          label="Loan amount"
          suffix="₹"
          min={0}
          step={10000}
          value={loanAmount}
          onChange={(event) => setLoanAmount(event.target.value)}
          placeholder="800000"
        />
        <NumberField
          label="Interest rate"
          suffix="% p.a."
          min={0}
          max={30}
          step={0.1}
          value={interestRate}
          onChange={(event) => setInterestRate(event.target.value)}
          placeholder="9.5"
        />
        <InputSelect
          label="Loan tenure"
          value={tenureMonths}
          options={TENURE_OPTIONS}
          onValueChange={setTenureMonths}
        />
        <div className="emi-calculator__actions">
          <Button type="submit">Calculate EMI</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <div className="emi-calculator__results">
        <div className="emi-calculator__emi-highlight">
          <span className="emi-calculator__emi-label">Monthly EMI</span>
          <span className="emi-calculator__emi-value">{formatCurrency(breakdown.emi)}</span>
        </div>

        <div className="emi-calculator__summary">
          <LabelValueHorizontal
            layout="L + V"
            label="Principal"
            value={formatCurrency(submitted.principal)}
          />
          <LabelValueHorizontal
            layout="L + V"
            label="Total interest"
            value={formatCurrency(breakdown.totalInterest)}
          />
          <LabelValueHorizontal
            layout="L + V"
            label="Total payable"
            value={formatCurrency(breakdown.totalPayment)}
          />
        </div>
      </div>

      {schedule.length > 0 ? (
        <div className="emi-calculator__schedule">
          <h2 className="emi-calculator__schedule-title">Repayment schedule</h2>
          <div className="emi-calculator__schedule-table">
            <div className="emi-calculator__schedule-head">
              <span>Mo</span>
              <span>Principal</span>
              <span>Interest</span>
              <span>Balance</span>
            </div>
            <div className="emi-calculator__schedule-scroll">
              {schedule.map((row) => (
                <div key={row.month} className="emi-calculator__schedule-row">
                  <span>{row.month}</span>
                  <span>{formatCurrency(row.principal)}</span>
                  <span>{formatCurrency(row.interest)}</span>
                  <span>{formatCurrency(row.balance)}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="emi-calculator__schedule-note">
            Showing all {schedule.length} monthly instalments.
          </p>
        </div>
      ) : null}
    </section>
  );
}
