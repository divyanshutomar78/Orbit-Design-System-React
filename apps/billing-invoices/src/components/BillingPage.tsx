import { TitlesAndTabs } from 'orbit-ds-components';

import { includedUsageItems, includedUsagePeriod } from '../data/billingData';
import { OnDemandSection } from './OnDemandSection';
import { PlanCard } from './PlanCard';
import { PromoBanner } from './PromoBanner';
import { UsageTable } from './UsageTable';
import './BillingPage.css';

export function BillingPage() {
  return (
    <div className="billing-page">
      <header className="billing-page__header">
        <TitlesAndTabs
          title="Billing & Invoices"
          showLeftIcon={false}
          showTabs={false}
          showRightIcons={false}
          showExtraSlot={false}
        />
      </header>

      <main className="billing-page__content">
        <PromoBanner />

        <PlanCard
          title="Pro Plan"
          price="$20/mo."
          description="Manage your subscription and billing cycle."
          actionLabel="Adjust plan"
        />

        <PlanCard
          title="Payment"
          description="Update your payment details."
          actionLabel="Manage in Stripe"
        />

        <section className="billing-card billing-usage">
          <header className="billing-usage__header">
            <h2 className="billing-usage__title">Included Usage</h2>
            <p className="billing-usage__period">{includedUsagePeriod}</p>
          </header>
          <UsageTable items={includedUsageItems} />
        </section>

        <OnDemandSection />
      </main>
    </div>
  );
}
