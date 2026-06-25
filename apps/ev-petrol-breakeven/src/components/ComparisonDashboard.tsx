import { useMemo, useState } from 'react';
import {
  AttentionChip,
  ButtonCompact,
  CriticalChip,
  LabelValueVertical,
  SuccessChip,
  TitlesAndTabs,
} from 'orbit-ds-components';

import {
  calculateBreakEven,
  formatCurrency,
  formatKm,
  parseInputs,
  type BreakEvenInputs,
  type Verdict,
} from '../utils/breakeven';
import { NumberField } from './NumberField';
import { DashboardCharts } from './DashboardCharts';
import './ComparisonDashboard.css';

type TabId = 'compare' | 'verdict';

const DEFAULTS: BreakEvenInputs = {
  evPrice: 1500000,
  petrolPrice: 1000000,
  evMileageKmPerKwh: 6,
  petrolMileageKmPerL: 15,
  dailyKm: 40,
  electricityPricePerKwh: 8,
  petrolFuelPricePerL: 105,
};

const DEFAULT_STRINGS = {
  evPrice: String(DEFAULTS.evPrice),
  petrolPrice: String(DEFAULTS.petrolPrice),
  evMileage: String(DEFAULTS.evMileageKmPerKwh),
  petrolMileage: String(DEFAULTS.petrolMileageKmPerL),
  dailyKm: String(DEFAULTS.dailyKm),
  electricityPrice: String(DEFAULTS.electricityPricePerKwh),
  petrolFuelPrice: String(DEFAULTS.petrolFuelPricePerL),
};

function VerdictChip({ verdict }: { verdict: Verdict }) {
  if (verdict === 'ev-now') {
    return (
      <SuccessChip type="chip" size="compact" showIcon={false}>
        Get the EV
      </SuccessChip>
    );
  }
  if (verdict === 'ev-later') {
    return (
      <AttentionChip type="chip" size="compact" showIcon={false}>
        EV pays back later
      </AttentionChip>
    );
  }
  return (
    <CriticalChip type="chip" size="compact" showIcon={false}>
      Stick with petrol
    </CriticalChip>
  );
}

export function ComparisonDashboard() {
  const [fields, setFields] = useState(DEFAULT_STRINGS);
  const [activeTab, setActiveTab] = useState<TabId>('compare');

  const inputs = useMemo(() => parseInputs(fields), [fields]);
  const result = useMemo(() => calculateBreakEven(inputs), [inputs]);

  const setField = (key: keyof typeof DEFAULT_STRINGS, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
  };

  const dailyKmSlider = Math.min(200, Math.max(0, Number(fields.dailyKm) || 0));

  return (
    <main className="page-canvas">
      <header className="page-header">
        <TitlesAndTabs
          title="EV vs petrol"
          showLeftIcon={false}
          showRightIcons={false}
          showExtraSlot
          extraSlot={<VerdictChip verdict={result.verdict} />}
          activeTabId={activeTab}
          tabItems={[
            { id: 'compare', label: 'Compare', selected: activeTab === 'compare' },
            { id: 'verdict', label: 'Verdict', selected: activeTab === 'verdict' },
          ]}
          onTabSelect={(tabId) => {
            if (tabId === 'compare' || tabId === 'verdict') {
              setActiveTab(tabId);
            }
          }}
        />
      </header>

      <p className="page-subtitle">
        Enter both cars — we&apos;ll tell you if the EV is worth the premium.
      </p>

      <div className="page-content">
        <section className="dashboard-kpis" aria-label="Summary">
          <div className="dashboard-kpi">
            <LabelValueVertical
              layout="V + L"
              label="Verdict"
              value={<VerdictChip verdict={result.verdict} />}
            />
          </div>
          <div className="dashboard-kpi">
            <LabelValueVertical
              layout="V + L"
              big
              label="Daily running savings"
              value={formatCurrency(Math.abs(result.dailySavings))}
            />
            <p className="dashboard-kpi__hint">
              {result.dailySavings >= 0 ? 'EV cheaper per day' : 'Petrol cheaper per day'}
            </p>
          </div>
          <div className="dashboard-kpi">
            <LabelValueVertical
              layout="V + L"
              big
              label="Purchase price gap"
              value={formatCurrency(Math.abs(result.priceDifference))}
            />
            <p className="dashboard-kpi__hint">
              {result.priceDifference >= 0 ? 'EV costs more upfront' : 'EV costs less upfront'}
            </p>
          </div>
          <div className="dashboard-kpi">
            <LabelValueVertical
              layout="V + L"
              big
              label="5-year total savings"
              value={formatCurrency(Math.abs(result.fiveYearSavings))}
            />
            <p className="dashboard-kpi__hint">
              {result.fiveYearSavings >= 0 ? 'EV wins over 5 years' : 'Petrol wins over 5 years'}
            </p>
          </div>
        </section>

        <DashboardCharts inputs={inputs} result={result} />

        {activeTab === 'compare' ? (
          <>
            <section className="dashboard-compare" aria-label="Vehicle comparison">
              <article className="dashboard-panel" aria-label="Electric vehicle">
                <h2 className="dashboard-panel__title">Electric (EV)</h2>
                <NumberField
                  label="Purchase price"
                  suffix="₹"
                  min={0}
                  step={10000}
                  value={fields.evPrice}
                  onChange={(e) => setField('evPrice', e.target.value)}
                />
                <NumberField
                  label="Efficiency"
                  suffix="km/kWh"
                  min={0.1}
                  step={0.1}
                  value={fields.evMileage}
                  onChange={(e) => setField('evMileage', e.target.value)}
                />
                <NumberField
                  label="Electricity rate"
                  suffix="₹/kWh"
                  min={0}
                  step={0.5}
                  value={fields.electricityPrice}
                  onChange={(e) => setField('electricityPrice', e.target.value)}
                />
                <p className="dashboard-panel__running">
                  Running: <strong>{formatCurrency(result.evCostPerKm)}/km</strong>
                  {' · '}
                  {formatCurrency(result.dailyEvCost)}/day
                </p>
              </article>

              <article className="dashboard-panel" aria-label="Petrol vehicle">
                <h2 className="dashboard-panel__title">Petrol</h2>
                <NumberField
                  label="Purchase price"
                  suffix="₹"
                  min={0}
                  step={10000}
                  value={fields.petrolPrice}
                  onChange={(e) => setField('petrolPrice', e.target.value)}
                />
                <NumberField
                  label="Mileage"
                  suffix="km/L"
                  min={0.1}
                  step={0.1}
                  value={fields.petrolMileage}
                  onChange={(e) => setField('petrolMileage', e.target.value)}
                />
                <NumberField
                  label="Petrol rate"
                  suffix="₹/L"
                  min={0}
                  step={0.5}
                  value={fields.petrolFuelPrice}
                  onChange={(e) => setField('petrolFuelPrice', e.target.value)}
                />
                <p className="dashboard-panel__running">
                  Running: <strong>{formatCurrency(result.petrolCostPerKm)}/km</strong>
                  {' · '}
                  {formatCurrency(result.dailyPetrolCost)}/day
                </p>
              </article>
            </section>

            <section className="dashboard-driving" aria-label="Daily driving">
              <div className="dashboard-driving__header">
                <h2 className="dashboard-driving__title">Daily driving</h2>
                <strong>{dailyKmSlider} km/day</strong>
              </div>
              <input
                type="range"
                className="dashboard-driving__slider"
                min={0}
                max={200}
                step={5}
                value={dailyKmSlider}
                onChange={(e) => setField('dailyKm', e.target.value)}
                aria-label="Daily driving distance"
              />
            </section>
          </>
        ) : null}

        {activeTab === 'verdict' ? (
          <section
            className={`dashboard-verdict dashboard-verdict--${result.verdict}`}
            aria-live="polite"
          >
            <h2 className="dashboard-verdict__title">{result.headline}</h2>
            <p className="dashboard-verdict__summary">{result.summary}</p>

            <div className="dashboard-verdict__stats">
              <LabelValueVertical
                layout="V + L"
                big
                label="EV 5-year total"
                value={formatCurrency(result.fiveYearEvTotal)}
              />
              <LabelValueVertical
                layout="V + L"
                big
                label="Petrol 5-year total"
                value={formatCurrency(result.fiveYearPetrolTotal)}
              />
              <LabelValueVertical
                layout="V + L"
                big
                label={
                  result.fiveYearSavings >= 0 ? 'EV saves over 5 yrs' : 'Petrol saves over 5 yrs'
                }
                value={formatCurrency(Math.abs(result.fiveYearSavings))}
              />
              {result.breakEvenKm != null ? (
                <LabelValueVertical
                  layout="V + L"
                  big
                  label="Break-even distance"
                  value={formatKm(result.breakEvenKm)}
                />
              ) : null}
            </div>
          </section>
        ) : null}

        <div className="dashboard-actions">
          <ButtonCompact variant="tertiary" onClick={() => setFields(DEFAULT_STRINGS)}>
            Reset defaults
          </ButtonCompact>
        </div>
      </div>
    </main>
  );
}
