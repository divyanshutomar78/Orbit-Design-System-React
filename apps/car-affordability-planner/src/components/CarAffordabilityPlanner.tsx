import { useMemo, useState } from 'react';
import {
  Button,
  InputSelect,
  LabelValueHorizontal,
  LabelValueVertical,
  Modal,
  SuccessChip,
} from 'orbit-ds-components';

import {
  calculateAffordability,
  formatCurrency,
  type AffordabilityInput,
  type ComfortLevel,
} from '../utils/affordability';
import { NumberField } from './NumberField';
import './CarAffordabilityPlanner.css';

const COMFORT_OPTIONS = [
  { value: 'conservative', label: 'Conservative — 10% EMI cap' },
  { value: 'balanced', label: 'Balanced — 15% EMI cap' },
  { value: 'flexible', label: 'Flexible — 20% EMI cap' },
];

const DEFAULTS = {
  salary: '75000',
  existingEmis: '8000',
  expenses: '25000',
  downPayment: '150000',
  rate: '9.5',
  comfort: 'balanced' as ComfortLevel,
};

function parseInputs(
  monthlySalary: string,
  existingEmis: string,
  monthlyExpenses: string,
  downPaymentSavings: string,
  interestRate: string,
  comfortLevel: ComfortLevel,
): AffordabilityInput {
  return {
    monthlySalary: Math.max(0, Number(monthlySalary) || 0),
    existingEmis: Math.max(0, Number(existingEmis) || 0),
    monthlyExpenses: Math.max(0, Number(monthlyExpenses) || 0),
    downPaymentSavings: Math.max(0, Number(downPaymentSavings) || 0),
    interestRate: Math.max(0, Number(interestRate) || 0),
    comfortLevel,
  };
}

export interface CarAffordabilityPlannerProps {
  open: boolean;
  onClose: () => void;
}

export function CarAffordabilityPlanner({ open, onClose }: CarAffordabilityPlannerProps) {
  const [monthlySalary, setMonthlySalary] = useState(DEFAULTS.salary);
  const [existingEmis, setExistingEmis] = useState(DEFAULTS.existingEmis);
  const [monthlyExpenses, setMonthlyExpenses] = useState(DEFAULTS.expenses);
  const [downPaymentSavings, setDownPaymentSavings] = useState(DEFAULTS.downPayment);
  const [interestRate, setInterestRate] = useState(DEFAULTS.rate);
  const [comfortLevel, setComfortLevel] = useState<ComfortLevel>(DEFAULTS.comfort);

  const inputs = useMemo(
    () =>
      parseInputs(
        monthlySalary,
        existingEmis,
        monthlyExpenses,
        downPaymentSavings,
        interestRate,
        comfortLevel,
      ),
    [
      monthlySalary,
      existingEmis,
      monthlyExpenses,
      downPaymentSavings,
      interestRate,
      comfortLevel,
    ],
  );

  const result = useMemo(() => calculateAffordability(inputs), [inputs]);

  const handleReset = () => {
    setMonthlySalary(DEFAULTS.salary);
    setExistingEmis(DEFAULTS.existingEmis);
    setMonthlyExpenses(DEFAULTS.expenses);
    setDownPaymentSavings(DEFAULTS.downPayment);
    setInterestRate(DEFAULTS.rate);
    setComfortLevel(DEFAULTS.comfort);
  };

  const hasSalary = inputs.monthlySalary > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Car affordability"
      className="car-affordability-modal"
      footer={
        <div className="car-affordability-modal__footer">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <p className="dialog-subtitle">
        Enter your income and savings — your recommended budget, EMI, and loan tenure update
        instantly as you adjust the numbers.
      </p>

      <div className="car-affordability">
        <form
          className="car-affordability__form dialog-form-grid"
          onSubmit={(event) => event.preventDefault()}
        >
          <h3 className="car-affordability__section-title dialog-form-grid__full">
            Income & obligations
          </h3>

          <NumberField
            className="dialog-form-grid__full"
            label="Monthly take-home salary"
            suffix="₹"
            min={0}
            step={1000}
            value={monthlySalary}
            onChange={(event) => setMonthlySalary(event.target.value)}
            placeholder="75000"
            hint="Salary after tax and PF deductions."
            required
          />
          <NumberField
            label="Other monthly EMIs"
            suffix="₹"
            min={0}
            step={500}
            value={existingEmis}
            onChange={(event) => setExistingEmis(event.target.value)}
            placeholder="8000"
            hint="Home loan, personal loan, credit card EMIs."
          />
          <NumberField
            label="Monthly living expenses"
            suffix="₹"
            min={0}
            step={1000}
            value={monthlyExpenses}
            onChange={(event) => setMonthlyExpenses(event.target.value)}
            placeholder="25000"
            hint="Rent, groceries, utilities, and bills."
          />

          <h3 className="car-affordability__section-title dialog-form-grid__full">
            Savings & loan terms
          </h3>

          <NumberField
            label="Down payment savings"
            suffix="₹"
            min={0}
            step={10000}
            value={downPaymentSavings}
            onChange={(event) => setDownPaymentSavings(event.target.value)}
            placeholder="150000"
            hint="Cash available upfront for the car."
          />
          <NumberField
            label="Expected loan interest rate"
            suffix="% p.a."
            min={0}
            max={30}
            step={0.1}
            value={interestRate}
            onChange={(event) => setInterestRate(event.target.value)}
            placeholder="9.5"
          />
          <div className="dialog-form-grid__full">
            <InputSelect
              label="Risk comfort"
              showLabelInfo={false}
              value={comfortLevel}
              options={COMFORT_OPTIONS}
              onValueChange={(value) => setComfortLevel(value as ComfortLevel)}
            />
          </div>
        </form>

        <div className="car-affordability__results">
          <div className="car-affordability__hero">
            <span className="car-affordability__hero-label">Recommended car budget</span>
            <span className="car-affordability__hero-value">
              {hasSalary ? formatCurrency(result.recommendedCarBudget) : '—'}
            </span>
            <p className="car-affordability__hero-note">
              {hasSalary
                ? `Comfortable on-road target (${result.salaryMonthsCap} months of salary cap).`
                : 'Enter your monthly salary to see a personalised budget.'}
            </p>
          </div>

          <div className="car-affordability__stats">
            <LabelValueVertical
              layout="V + L"
              big
              value={hasSalary ? formatCurrency(result.idealEmi) : '—'}
              label="Ideal monthly EMI"
            />
            <LabelValueVertical
              layout="V + L"
              big
              value={hasSalary ? result.idealTenureLabel : '—'}
              label="Ideal loan tenure"
            />
            <LabelValueVertical
              layout="V + L"
              big
              value={hasSalary ? formatCurrency(result.recommendedDownPayment) : '—'}
              label="Suggested down payment"
            />
            <LabelValueVertical
              layout="V + L"
              big
              value={hasSalary ? formatCurrency(result.recommendedLoanAmount) : '—'}
              label="Loan amount"
            />
          </div>

          <div className="car-affordability__summary">
            <h2 className="car-affordability__section-title">Budget range</h2>
            <LabelValueHorizontal
              layout="L + V"
              label="Conservative"
              value={hasSalary ? formatCurrency(result.conservativeCarBudget) : '—'}
            />
            <LabelValueHorizontal
              layout="L + V"
              label="Recommended"
              value={hasSalary ? formatCurrency(result.recommendedCarBudget) : '—'}
            />
            <LabelValueHorizontal
              layout="L + V"
              label="Upper limit"
              value={hasSalary ? formatCurrency(result.maxCarBudget) : '—'}
            />
            <LabelValueHorizontal
              layout="L + V"
              label="Max safe EMI"
              value={hasSalary ? formatCurrency(result.maxSafeEmi) : '—'}
            />
            <LabelValueHorizontal
              layout="L + V"
              label="Free cash after bills"
              value={hasSalary ? formatCurrency(result.disposableIncome) : '—'}
            />
          </div>
        </div>

        <div className="car-affordability__table-section">
          <h2 className="car-affordability__section-title">Tenure comparison</h2>
          <p className="car-affordability__table-meta">
            {hasSalary
              ? `At your ideal EMI of ${formatCurrency(result.idealEmi)}/month across loan lengths:`
              : 'Tenure comparison appears once salary is entered.'}
          </p>
          <div className="car-affordability__table">
            <div className="car-affordability__table-head">
              <span>Tenure</span>
              <span>Loan</span>
              <span>Car budget</span>
            </div>
            {result.scenarios.map((scenario) => (
              <div
                key={scenario.tenureMonths}
                className={`car-affordability__table-row${scenario.recommended ? ' car-affordability__table-row--recommended' : ''}`}
              >
                <span>
                  {scenario.tenureLabel}
                  {scenario.recommended ? (
                    <SuccessChip showIcon={false} size="compact" className="car-affordability__badge">
                      Ideal
                    </SuccessChip>
                  ) : null}
                </span>
                <span>{hasSalary ? formatCurrency(scenario.loanAmount) : '—'}</span>
                <span>{hasSalary ? formatCurrency(scenario.carBudget) : '—'}</span>
              </div>
            ))}
          </div>
        </div>

        {hasSalary ? (
          <div className="car-affordability__guidance">
            <h2 className="car-affordability__section-title">Guidance</h2>
            <ul className="car-affordability__tips-list">
              {result.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
