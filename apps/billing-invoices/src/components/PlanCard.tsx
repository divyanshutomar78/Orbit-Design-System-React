import { Button, ListingItem } from 'orbit-ds-components';

import './PlanCard.css';

export interface PlanCardProps {
  title: string;
  price?: string;
  description: string;
  actionLabel: string;
}

export function PlanCard({ title, price, description, actionLabel }: PlanCardProps) {
  return (
    <section className="billing-card">
      <ListingItem
        multiLine
        reorderIcon={false}
        showLeftIcon={false}
        showRightIcon={false}
        showLabelValue={Boolean(price)}
        title={title}
        label=""
        value={price}
        showHelper
        helper={description}
        addIconsComponent={
          <Button variant="secondary" minWidth={false}>
            {actionLabel}
          </Button>
        }
      />
    </section>
  );
}
