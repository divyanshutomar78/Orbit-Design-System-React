import { useState } from 'react';

import {
  descriptionText,
  documentColumns,
  documentRows,
  filesColumns,
  filesRows,
  panelTitle,
} from '../data/formData';
import { DataTable } from './DataTable';
import { FormTextarea } from './FormTextarea';
import { PanelHeader, SectionHeader } from './SectionHeader';
import './MaintenanceTrainingPanel.css';

export function MaintenanceTrainingPanel() {
  const [description, setDescription] = useState(descriptionText);
  const [guidance, setGuidance] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <article className="maintenance-panel">
      <PanelHeader title={panelTitle} />

      <section className="maintenance-panel__section">
        <SectionHeader number={1} title="Files" />
        <div className="maintenance-panel__section-body">
          <DataTable columns={filesColumns} rows={filesRows} />
        </div>
      </section>

      <section className="maintenance-panel__section maintenance-panel__section--field">
        <SectionHeader number={2} title="Description" />
        <div className="maintenance-panel__section-body">
          <FormTextarea
            className="form-textarea--description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-label="Description"
          />
        </div>
      </section>

      <section className="maintenance-panel__section maintenance-panel__section--field">
        <SectionHeader number={3} title="Guidance" />
        <div className="maintenance-panel__section-body">
          <FormTextarea
            className="form-textarea--tall"
            placeholder="Enter Description of the Report"
            value={guidance}
            onChange={(event) => setGuidance(event.target.value)}
            aria-label="Guidance"
          />
        </div>
      </section>

      <section className="maintenance-panel__section">
        <SectionHeader number={4} title="Document References" />
        <div className="maintenance-panel__section-body">
          <DataTable columns={documentColumns} rows={documentRows} />
        </div>
      </section>

      <section className="maintenance-panel__section maintenance-panel__section--field">
        <SectionHeader number={5} title="Notes" />
        <div className="maintenance-panel__section-body">
          <FormTextarea
            className="form-textarea--description"
            placeholder="Enter Notes here...."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            aria-label="Notes"
          />
        </div>
      </section>
    </article>
  );
}
