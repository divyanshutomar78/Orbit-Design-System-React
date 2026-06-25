import { useMemo } from 'react';

import {
  buildCumulativeCostSeries,
  buildOwnershipBreakdown,
  formatCompactCurrency,
  formatCurrency,
  type BreakEvenInputs,
  type BreakEvenResult,
} from '../utils/breakeven';
import './DashboardCharts.css';

const CHART = {
  width: 420,
  height: 220,
  padLeft: 52,
  padRight: 16,
  padTop: 12,
  padBottom: 32,
};

function scale(value: number, min: number, max: number, start: number, end: number): number {
  if (max === min) return (start + end) / 2;
  return start + ((value - min) / (max - min)) * (end - start);
}

function buildPolyline(
  points: { x: number; y: number }[],
): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}

interface DashboardChartsProps {
  inputs: BreakEvenInputs;
  result: BreakEvenResult;
}

export function DashboardCharts({ inputs, result }: DashboardChartsProps) {
  const cumulativeSeries = useMemo(() => buildCumulativeCostSeries(inputs), [inputs]);
  const breakdown = useMemo(() => buildOwnershipBreakdown(inputs, result), [inputs, result]);

  const breakEvenYear =
    result.breakEvenKm != null && inputs.dailyKm > 0
      ? result.breakEvenKm / inputs.dailyKm / 365.25
      : null;

  const lineChart = useMemo(() => {
    const plotLeft = CHART.padLeft;
    const plotRight = CHART.width - CHART.padRight;
    const plotTop = CHART.padTop;
    const plotBottom = CHART.height - CHART.padBottom;

    const maxCost = Math.max(
      ...cumulativeSeries.map((point) => Math.max(point.evTotal, point.petrolTotal)),
      1,
    );
    const minCost = Math.min(
      ...cumulativeSeries.map((point) => Math.min(point.evTotal, point.petrolTotal)),
      0,
    );

    const xForYear = (year: number) => scale(year, 0, 5, plotLeft, plotRight);
    const yForCost = (cost: number) => scale(cost, minCost, maxCost, plotBottom, plotTop);

    const evPoints = cumulativeSeries.map((point) => ({
      x: xForYear(point.year),
      y: yForCost(point.evTotal),
    }));
    const petrolPoints = cumulativeSeries.map((point) => ({
      x: xForYear(point.year),
      y: yForCost(point.petrolTotal),
    }));

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
      const value = minCost + (maxCost - minCost) * ratio;
      return { value, y: yForCost(value) };
    });

    const xTicks = [0, 1, 2, 3, 4, 5].map((year) => ({
      year,
      x: xForYear(year),
      label: year === 0 ? 'Now' : `Y${year}`,
    }));

    return {
      evPath: buildPolyline(evPoints),
      petrolPath: buildPolyline(petrolPoints),
      yTicks,
      xTicks,
      breakEvenX:
        breakEvenYear != null && breakEvenYear > 0 && breakEvenYear <= 5
          ? xForYear(breakEvenYear)
          : null,
      plotTop,
      plotBottom,
      plotLeft,
      plotRight,
    };
  }, [cumulativeSeries, breakEvenYear]);

  const barChart = useMemo(() => {
    const maxTotal = Math.max(
      breakdown.evPurchase + breakdown.evRunning,
      breakdown.petrolPurchase + breakdown.petrolRunning,
      1,
    );
    const barAreaHeight = CHART.height - CHART.padTop - CHART.padBottom;
    const barWidth = 72;
    const gap = 48;
    const centerX = CHART.width / 2;
    const baseY = CHART.height - CHART.padBottom;

    const evX = centerX - gap - barWidth;
    const petrolX = centerX + gap;

    const heightFor = (value: number) => (value / maxTotal) * barAreaHeight;

    return {
      maxTotal,
      baseY,
      evX,
      petrolX,
      barWidth,
      evPurchaseH: heightFor(breakdown.evPurchase),
      evRunningH: heightFor(breakdown.evRunning),
      petrolPurchaseH: heightFor(breakdown.petrolPurchase),
      petrolRunningH: heightFor(breakdown.petrolRunning),
    };
  }, [breakdown]);

  return (
    <section className="dashboard-charts" aria-label="Cost charts">
      <article className="dashboard-chart">
        <header className="dashboard-chart__header">
          <h2 className="dashboard-chart__title">Cumulative cost over 5 years</h2>
          <p className="dashboard-chart__subtitle">
            Total ownership cost including purchase price and running costs
          </p>
        </header>
        <div className="dashboard-chart__canvas">
          <svg
            className="dashboard-chart__svg"
            viewBox={`0 0 ${CHART.width} ${CHART.height}`}
            role="img"
            aria-label="Line chart comparing EV and petrol cumulative costs over five years"
          >
            {lineChart.yTicks.map((tick) => (
              <g key={tick.value}>
                <line
                  className="dashboard-chart__grid"
                  x1={lineChart.plotLeft}
                  x2={lineChart.plotRight}
                  y1={tick.y}
                  y2={tick.y}
                />
                <text className="dashboard-chart__axis-label dashboard-chart__axis-label--y" x={lineChart.plotLeft - 8} y={tick.y + 4} textAnchor="end">
                  {formatCompactCurrency(tick.value)}
                </text>
              </g>
            ))}

            {lineChart.xTicks.map((tick) => (
              <text
                key={tick.year}
                className="dashboard-chart__axis-label"
                x={tick.x}
                y={CHART.height - 8}
                textAnchor="middle"
              >
                {tick.label}
              </text>
            ))}

            {lineChart.breakEvenX != null ? (
              <g>
                <line
                  className="dashboard-chart__break-even"
                  x1={lineChart.breakEvenX}
                  x2={lineChart.breakEvenX}
                  y1={lineChart.plotTop}
                  y2={lineChart.plotBottom}
                />
                <text
                  className="dashboard-chart__break-even-label"
                  x={lineChart.breakEvenX}
                  y={lineChart.plotTop - 2}
                  textAnchor="middle"
                >
                  Break-even
                </text>
              </g>
            ) : null}

            <path className="dashboard-chart__line dashboard-chart__line--ev" d={lineChart.evPath} />
            <path className="dashboard-chart__line dashboard-chart__line--petrol" d={lineChart.petrolPath} />
          </svg>
          <ul className="dashboard-chart__legend">
            <li className="dashboard-chart__legend-item">
              <span className="dashboard-chart__swatch dashboard-chart__swatch--ev" aria-hidden />
              EV total
            </li>
            <li className="dashboard-chart__legend-item">
              <span className="dashboard-chart__swatch dashboard-chart__swatch--petrol" aria-hidden />
              Petrol total
            </li>
          </ul>
        </div>
      </article>

      <article className="dashboard-chart">
        <header className="dashboard-chart__header">
          <h2 className="dashboard-chart__title">5-year ownership breakdown</h2>
          <p className="dashboard-chart__subtitle">
            Purchase price vs running costs at {inputs.dailyKm} km/day
          </p>
        </header>
        <div className="dashboard-chart__canvas">
          <svg
            className="dashboard-chart__svg"
            viewBox={`0 0 ${CHART.width} ${CHART.height}`}
            role="img"
            aria-label="Stacked bar chart comparing EV and petrol ownership costs"
          >
            <g>
              <rect
                className="dashboard-chart__bar dashboard-chart__bar--running"
                x={barChart.evX}
                y={barChart.baseY - barChart.evRunningH}
                width={barChart.barWidth}
                height={barChart.evRunningH}
                rx={2}
              />
              <rect
                className="dashboard-chart__bar dashboard-chart__bar--purchase"
                x={barChart.evX}
                y={barChart.baseY - barChart.evRunningH - barChart.evPurchaseH}
                width={barChart.barWidth}
                height={barChart.evPurchaseH}
                rx={2}
              />
              <text className="dashboard-chart__bar-label" x={barChart.evX + barChart.barWidth / 2} y={CHART.height - 8} textAnchor="middle">
                EV
              </text>
              <text
                className="dashboard-chart__bar-value"
                x={barChart.evX + barChart.barWidth / 2}
                y={barChart.baseY - barChart.evRunningH - barChart.evPurchaseH - 6}
                textAnchor="middle"
              >
                {formatCompactCurrency(breakdown.evPurchase + breakdown.evRunning)}
              </text>
            </g>

            <g>
              <rect
                className="dashboard-chart__bar dashboard-chart__bar--running dashboard-chart__bar--petrol"
                x={barChart.petrolX}
                y={barChart.baseY - barChart.petrolRunningH}
                width={barChart.barWidth}
                height={barChart.petrolRunningH}
                rx={2}
              />
              <rect
                className="dashboard-chart__bar dashboard-chart__bar--purchase dashboard-chart__bar--petrol"
                x={barChart.petrolX}
                y={barChart.baseY - barChart.petrolRunningH - barChart.petrolPurchaseH}
                width={barChart.barWidth}
                height={barChart.petrolPurchaseH}
                rx={2}
              />
              <text className="dashboard-chart__bar-label" x={barChart.petrolX + barChart.barWidth / 2} y={CHART.height - 8} textAnchor="middle">
                Petrol
              </text>
              <text
                className="dashboard-chart__bar-value"
                x={barChart.petrolX + barChart.barWidth / 2}
                y={barChart.baseY - barChart.petrolRunningH - barChart.petrolPurchaseH - 6}
                textAnchor="middle"
              >
                {formatCompactCurrency(breakdown.petrolPurchase + breakdown.petrolRunning)}
              </text>
            </g>
          </svg>
          <ul className="dashboard-chart__legend">
            <li className="dashboard-chart__legend-item">
              <span className="dashboard-chart__swatch dashboard-chart__swatch--purchase" aria-hidden />
              Purchase ({formatCurrency(breakdown.evPurchase)} EV · {formatCurrency(breakdown.petrolPurchase)} petrol)
            </li>
            <li className="dashboard-chart__legend-item">
              <span className="dashboard-chart__swatch dashboard-chart__swatch--running" aria-hidden />
              Running over 5 yrs
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
