import { useState } from 'react';
import { InputSelect } from 'orbit-ds-components';

import {
  billingCycles,
  onDemandItems,
  type OnDemandLineItem,
} from '../data/billingData';
import './OnDemandSection.css';

function OnDemandTable({ items }: { items: OnDemandLineItem[] }) {
  if (items.length === 0) {
    return (
      <p className="on-demand-section__empty">No on-demand usage this cycle.</p>
    );
  }

  return (
    <div className="on-demand-table">
      <div className="on-demand-table__head" role="row">
        <span role="columnheader">Type</span>
        <span role="columnheader">Tokens</span>
        <span role="columnheader">Cost</span>
        <span role="columnheader">Qty</span>
        <span role="columnheader">Total</span>
      </div>
      {items.map((item) => (
        <div key={item.id} className="on-demand-table__row" role="row">
          <span role="cell">{item.type}</span>
          <span role="cell">{item.tokens}</span>
          <span role="cell">{item.cost}</span>
          <span role="cell">{item.qty}</span>
          <span role="cell">{item.total}</span>
        </div>
      ))}
    </div>
  );
}

export function OnDemandSection() {
  const [cycle, setCycle] = useState('current');

  return (
    <section className="billing-card on-demand-section">
      <header className="on-demand-section__header">
        <h2 className="on-demand-section__title">On-Demand Usage</h2>
        <InputSelect
          className="on-demand-section__cycle"
          showLabel={false}
          showLabelInfo={false}
          options={billingCycles}
          value={cycle}
          onValueChange={setCycle}
        />
      </header>

      <p className="on-demand-section__total">US$0.00</p>

      <OnDemandTable items={onDemandItems} />
    </section>
  );
}
