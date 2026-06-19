import { OptionToggle, WarningChip } from 'orbit-ds-components';

import { FIELD_LABELS } from '@shared/weatherFields';
import type { WeatherRule } from '@shared/types';
import './RulesPanel.css';

type RulesPanelProps = {
  rules: WeatherRule[];
  onChange: (rules: WeatherRule[]) => void;
};

export function RulesPanel({ rules, onChange }: RulesPanelProps) {
  const toggleRule = (id: string, enabled: boolean) => {
    onChange(rules.map((rule) => (rule.id === id ? { ...rule, enabled } : rule)));
  };

  const enabledCount = rules.filter((rule) => rule.enabled).length;

  return (
    <section className="mw-rules mw-section">
      <header className="mw-rules__header">
        <div>
          <h2 className="mw-rules__title">Business rules</h2>
          <p className="mw-rules__meta">
            {enabledCount} of {rules.length} active · evaluated at scheduled departure and arrival
            times
          </p>
        </div>
      </header>

      <ul className="mw-rules__list">
        {rules.map((rule) => (
          <li
            key={rule.id}
            className={`mw-rule ${rule.enabled ? '' : 'mw-rule--disabled'}`}
          >
            <div className="mw-rule__top">
              <div className="mw-rule__heading">
                <h3 className="mw-rule__name">{rule.name}</h3>
                <WarningChip
                  type="tag"
                  size="compact"
                  showIcon={false}
                  className="mw-status-chip"
                >
                  {rule.riskCategory}
                </WarningChip>
              </div>
              <OptionToggle
                label="Enabled"
                checked={rule.enabled}
                onChange={(event) => toggleRule(rule.id, event.target.checked)}
                aria-label={`Enable ${rule.name}`}
              />
            </div>
            <dl className="mw-rule__details">
              <div>
                <dt>Airport</dt>
                <dd>{rule.airport === '*' ? 'All airports' : rule.airport}</dd>
              </div>
              <div>
                <dt>Checkpoint</dt>
                <dd>{rule.checkPoint}</dd>
              </div>
              <div>
                <dt>Logic</dt>
                <dd>{rule.logic.toUpperCase()}</dd>
              </div>
            </dl>
            <ul className="mw-rule__conditions">
              {rule.conditions.map((condition, index) => (
                <li key={`${rule.id}-${index}`}>
                  {FIELD_LABELS[condition.field]}{' '}
                  {condition.operator === 'between'
                    ? `between ${condition.value} and ${condition.valueTo}`
                    : `${condition.operator} ${condition.value}`}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
