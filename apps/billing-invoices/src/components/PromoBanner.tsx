import { Button, IconFrame } from 'orbit-ds-components';

import './PromoBanner.css';

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6 10v10h4V10H6zm8 0v10h4V10h-4zM4 10h16V7H4v3z" fill="currentColor" />
      <path
        d="M12 7V4M8.5 5.5 7 4M15.5 5.5 17 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PromoBanner() {
  return (
    <div className="billing-promo" role="note">
      <div className="billing-promo__content">
        <IconFrame size="small" className="billing-promo__icon">
          <GiftIcon />
        </IconFrame>
        <p className="billing-promo__text">Switch to annual billing and save 20%</p>
      </div>
      <Button variant="secondary" minWidth={false}>
        Upgrade Now
      </Button>
    </div>
  );
}
