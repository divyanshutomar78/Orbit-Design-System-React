import { Button, ListingItem } from 'orbit-ds-components';

import './ReportsPanel.css';

const reportItems = [
  {
    id: 'weekly',
    title: 'Weekly summary',
    helper: 'Attendance trends by class for the past 7 days.',
    action: 'Download PDF',
  },
  {
    id: 'monthly',
    title: 'Monthly report',
    helper: 'Full roster with daily status for June 2025.',
    action: 'Generate',
  },
  {
    id: 'absences',
    title: 'Chronic absences',
    helper: 'Students below 85% attendance this term.',
    action: 'View list',
  },
];

export function ReportsPanel() {
  return (
    <section className="attendance-card reports-panel" aria-label="Attendance reports">
      <header className="reports-panel__header">
        <h2 className="reports-panel__title">Reports</h2>
        <p className="reports-panel__meta">Export and review attendance history</p>
      </header>

      <div className="reports-panel__list">
        {reportItems.map((item) => (
          <article key={item.id} className="reports-panel__item">
            <ListingItem
              multiLine
              reorderIcon={false}
              showLeftIcon={false}
              showRightIcon={false}
              title={item.title}
              showHelper
              helper={item.helper}
              addIconsComponent={
                <Button variant="secondary" minWidth={false}>
                  {item.action}
                </Button>
              }
            />
          </article>
        ))}
      </div>
    </section>
  );
}
