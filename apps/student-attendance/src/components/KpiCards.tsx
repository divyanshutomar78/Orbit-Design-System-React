import type { ReactNode } from 'react';

import { AlertIcon, CheckIcon, ClockIcon, TrendDownIcon, TrendUpIcon, UsersIcon } from './icons';
import './KpiCards.css';

export type KpiTone = 'action' | 'success' | 'attention' | 'critical';

interface KpiCardProps {
  tone: KpiTone;
  icon: ReactNode;
  label: string;
  value: string;
  delta?: { value: string; direction: 'up' | 'down' };
  caption?: string;
}

function KpiCard({ tone, icon, label, value, delta, caption }: KpiCardProps) {
  return (
    <article className={`kpi-card kpi-card--${tone}`}>
      <span className="kpi-card__icon" aria-hidden>
        {icon}
      </span>
      <div className="kpi-card__body">
        <span className="kpi-card__label">{label}</span>
        <div className="kpi-card__value-row">
          <span className="kpi-card__value">{value}</span>
          {delta ? (
            <span className={`kpi-card__delta kpi-card__delta--${delta.direction}`}>
              {delta.direction === 'up' ? <TrendUpIcon /> : <TrendDownIcon />}
              {delta.value}
            </span>
          ) : null}
        </div>
        {caption ? <span className="kpi-card__caption">{caption}</span> : null}
      </div>
    </article>
  );
}

export interface KpiCardsProps {
  total: number;
  attending: number;
  late: number;
  absent: number;
  rate: number;
}

export function KpiCards({ total, attending, late, absent, rate }: KpiCardsProps) {
  return (
    <section className="kpi-cards" aria-label="Today's attendance summary">
      <KpiCard
        tone="action"
        icon={<UsersIcon />}
        label="Enrolled"
        value={String(total)}
        caption="Students in view"
      />
      <KpiCard
        tone="success"
        icon={<CheckIcon />}
        label="Attendance rate"
        value={`${rate}%`}
        delta={{ value: '2.4%', direction: 'up' }}
        caption={`${attending} of ${total} present`}
      />
      <KpiCard
        tone="attention"
        icon={<ClockIcon />}
        label="Late arrivals"
        value={String(late)}
        delta={{ value: '1', direction: 'down' }}
        caption="Checked in after 08:15"
      />
      <KpiCard
        tone="critical"
        icon={<AlertIcon />}
        label="Absent"
        value={String(absent)}
        caption="No check-in recorded"
      />
    </section>
  );
}
