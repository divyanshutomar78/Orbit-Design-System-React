import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-ewas-nav-bar-aircraft-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 3l1.5 5.5H10.5L12 3zm-6 9l-3 8 5-2.5h2l-1-4.5H6zm12 0h2l-1 4.5h2L21 20l-3-8h-2.5z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarAircraftIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-airport-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 20h16M7 20V9l5-4 5 4v11M10 13h4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarAirportIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-leaf-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 21c-4-3-6-7-6-11a6 6 0 0112 0c0 4-2 8-6 11z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path d="M12 10v11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarLeafIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-data-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4 18c2-2 4-3 8-3s6 1 8 3M6 14c1.5-1.5 3.5-2 6-2s4.5.5 6 2"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <circle cx="12" cy="8" r="2" stroke="currentColor" stroke-width="1.5" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarDataIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-gear-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarGearIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-user-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M6 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarUserIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-users-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M4 18c0-2.5 2.2-4.5 5-4.5M15 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path d="M14 18c0-2.2 1.8-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarUsersIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-sita-logo-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text
        x="16"
        y="20"
        fill="currentColor"
        font-size="11"
        font-weight="700"
        text-anchor="middle"
        font-family="var(--font-family), Roboto, sans-serif"
      >
        SITA
      </text>
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarSitaLogoIconComponent {}

@Component({
  selector: 'orbit-ewas-nav-bar-pilot-app-icon',
  standalone: true,
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EWasNavBarPilotAppIconComponent {}
