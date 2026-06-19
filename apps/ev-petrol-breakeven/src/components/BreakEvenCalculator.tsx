import { useMemo, useState } from 'react';
import {
  AttentionChip,
  Button,
  CriticalChip,
  LabelValueHorizontal,
  LabelValueVertical,
  SuccessChip,
} from 'orbit-ds-components';

import {
  buildCostSnapshots,
  calculateBreakEven,
  formatCurrency,
  formatDuration,
  formatKm,
  type BreakEvenInputs,
} from '../utils/breakeven';
import { NumberField } from './NumberField';
import './BreakEvenCalculator.css';

const DEFAULTS: BreakEvenInputs = {
  evPrice: 1500000,
  petrolPrice: 1000000,
  evMileageKmPerKwh: 6,
  petrolMileageKmPerL: 15,
  dailyKm: 40,
  electricityPricePerKwh: 8,
  petrolFuelPricePerL: 105,
};

function VerdictChip({ verdict }: { verdict: ReturnType<typeof calculateBreakEven>['verdict'] }) {
  if (verdict === 'ev-now') {
    return (
      <SuccessChip type="chip" size="compact" showIcon={false}>
        EV wins now
      </SuccessChip>
    );
  }
  if (verdict === 'ev-later') {
    return (
      <AttentionChip type="chip" size="compact" showIcon={false}>
        EV breaks even later
      </AttentionChip>
    );
  }
  return (
    <CriticalChip type="chip" size="compact" showIcon={false}>
      Petrol wins
    </CriticalChip>
  );
}

export function BreakEvenCalculator() {
  const [evPrice, setEvPrice] = useState(String(DEFAULTS.evPrice));
  const [petrolPrice, setPetrolPrice] = useState(String(DEFAULTS.petrolPrice));
  const [evMileage, setEvMileage] = useState(String(DEFAULTS.evMileageKmPerKwh));
  const [petrolMileage, setPetrolMileage] = useState(String(DEFAULTS.petrolMileageKmPerL));
  const [dailyKm, setDailyKm] = useState(String(DEFAULTS.dailyKm));
  const [electricityPrice, setElectricityPrice] = useState(String(DEFAULTS.electricityPricePerKwh));
  const [petrolFuelPrice, setPetrolFuelPrice] = useState(String(DEFAULTS.petrolFuelPricePerL));
  const [submitted, setSubmitted] = useState(DEFAULTS);

  const result = useMemo(() => calculateBreakEven(submitted), [submitted]);
  const snapshots = useMemo(
    () => buildCostSnapshots(submitted, result.breakEvenKm),
    [submitted, result.breakEvenKm],
  );

  const handleAnalyze = () => {
    setSubmitted({
      evPrice: Math.max(0, Number(evPrice) || 0),
      petrolPrice: Math.max(0, Number(petrolPrice) || 0),
      evMileageKmPerKwh: Math.max(0.1, Number(evMileage) || 0.1),
      petrolMileageKmPerL: Math.max(0.1, Number(petrolMileage) || 0.1),
      dailyKm: Math.max(0, Number(dailyKm) || 0),
      electricityPricePerKwh: Math.max(0, Number(electricityPrice) || 0),
      petrolFuelPricePerL: Math.max(0, Number(petrolFuelPrice) || 0),
    });
  };

  const handleReset = () => {
    setEvPrice(String(DEFAULTS.evPrice));
    setPetrolPrice(String(DEFAULTS.petrolPrice));
    setEvMileage(String(DEFAULTS.evMileageKmPerKwh));
    setPetrolMileage(String(DEFAULTS.petrolMileageKmPerL));
    setDailyKm(String(DEFAULTS.dailyKm));
    setElectricityPrice(String(DEFAULTS.electricityPricePerKwh));
    setPetrolFuelPrice(String(DEFAULTS.petrolFuelPricePerL));
    setSubmitted(DEFAULTS);
  };

  return (
    <section className="breakeven-calculator">
      <form
        className="breakeven-calculator__form dialog-form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          handleAnalyze();
        }}
      >
        <h3 className="breakeven-calculator__section-title dialog-form-grid__full">Car prices</h3>

        <NumberField
          label="EV price"
          suffix="₹"
          min={0}
          step={10000}
          value={evPrice}
          onChange={(event) => setEvPrice(event.target.value)}
          placeholder="1500000"
        />
        <NumberField
          label="Petrol price"
          suffix="₹"
          min={0}
          step={10000}
          value={petrolPrice}
          onChange={(event) => setPetrolPrice(event.target.value)}
          placeholder="1000000"
        />

        <h3 className="breakeven-calculator__section-title dialog-form-grid__full">Mileage</h3>

        <NumberField
          label="EV efficiency"
          suffix="km/kWh"
          min={0.1}
          step={0.1}
          value={evMileage}
          onChange={(event) => setEvMileage(event.target.value)}
          placeholder="6"
        />
        <NumberField
          label="Petrol mileage"
          suffix="km/L"
          min={0.1}
          step={0.1}
          value={petrolMileage}
          onChange={(event) => setPetrolMileage(event.target.value)}
          placeholder="15"
        />

        <h3 className="breakeven-calculator__section-title dialog-form-grid__full">Usage &amp; fuel rates</h3>

        <NumberField
          label="Daily distance"
          suffix="km/day"
          min={0}
          step={1}
          value={dailyKm}
          onChange={(event) => setDailyKm(event.target.value)}
          placeholder="40"
        />
        <NumberField
          label="Electricity rate"
          suffix="₹/kWh"
          min={0}
          step={0.5}
          value={electricityPrice}
          onChange={(event) => setElectricityPrice(event.target.value)}
          placeholder="8"
        />

        <NumberField
          label="Petrol rate"
          suffix="₹/L"
          min={0}
          step={0.5}
          value={petrolFuelPrice}
          onChange={(event) => setPetrolFuelPrice(event.target.value)}
          placeholder="105"
          className="dialog-form-grid__full"
        />

        <div className="breakeven-calculator__actions dialog-form-grid__full">
          <Button type="submit">Analyze break-even</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      <div className="breakeven-calculator__results">
        <div className="breakeven-calculator__hero">
          <div className="breakeven-calculator__hero-top">
            <span className="breakeven-calculator__hero-label">Break-even distance</span>
            <VerdictChip verdict={result.verdict} />
          </div>
          <span className="breakeven-calculator__hero-value">
            {result.breakEvenKm != null ? formatKm(result.breakEvenKm) : 'No break-even'}
          </span>
          {result.breakEvenDays != null && result.breakEvenDays > 0 ? (
            <span className="breakeven-calculator__hero-meta">
              ≈ {formatDuration(result.breakEvenDays)} at {submitted.dailyKm} km/day
            </span>
          ) : (
            <span className="breakeven-calculator__hero-meta">{result.verdictDetail}</span>
          )}
        </div>

        <div className="breakeven-calculator__stats">
          <LabelValueVertical
            layout="V + L"
            big
            value={formatCurrency(result.dailyEvCost)}
            label="EV daily cost"
          />
          <LabelValueVertical
            layout="V + L"
            big
            value={formatCurrency(result.dailyPetrolCost)}
            label="Petrol daily cost"
          />
          <LabelValueVertical
            layout="V + L"
            big
            value={formatCurrency(Math.abs(result.dailySavings))}
            label={result.dailySavings >= 0 ? 'Daily EV savings' : 'Daily petrol savings'}
          />
          <LabelValueVertical
            layout="V + L"
            big
            value={formatCurrency(Math.abs(result.priceDifference))}
            label={result.priceDifference >= 0 ? 'EV price premium' : 'Petrol price premium'}
          />
        </div>

        <div className="breakeven-calculator__summary">
          <LabelValueHorizontal
            layout="L + V"
            label="EV cost per km"
            value={formatCurrency(result.evCostPerKm)}
          />
          <LabelValueHorizontal
            layout="L + V"
            label="Petrol cost per km"
            value={formatCurrency(result.petrolCostPerKm)}
          />
          <LabelValueHorizontal
            layout="L + V"
            label="EV running / year"
            value={formatCurrency(result.yearlyEvCost)}
          />
          <LabelValueHorizontal
            layout="L + V"
            label="Petrol running / year"
            value={formatCurrency(result.yearlyPetrolCost)}
          />
        </div>
      </div>

      <div className="breakeven-calculator__table-section">
        <h2 className="breakeven-calculator__table-title">Total cost comparison</h2>
        <p className="breakeven-calculator__table-meta">
          Purchase price + fuel cost at key milestones
        </p>
        <div className="breakeven-calculator__table">
          <div className="breakeven-calculator__table-head">
            <span>Milestone</span>
            <span>EV total</span>
            <span>Petrol total</span>
            <span>Cheaper</span>
          </div>
          {snapshots.map((row) => (
            <div key={`${row.label}-${row.km}`} className="breakeven-calculator__table-row">
              <span>{row.label}</span>
              <span>{formatCurrency(row.evTotal)}</span>
              <span>{formatCurrency(row.petrolTotal)}</span>
              <span>
                {row.cheaper === 'ev' ? (
                  <SuccessChip type="chip" size="compact" showIcon={false}>
                    EV
                  </SuccessChip>
                ) : row.cheaper === 'petrol' ? (
                  <AttentionChip type="chip" size="compact" showIcon={false}>
                    Petrol
                  </AttentionChip>
                ) : (
                  '—'
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
