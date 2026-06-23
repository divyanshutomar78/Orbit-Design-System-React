import { useState } from 'react';
import { Button, Modal } from 'orbit-ds-components';

import { FixtureGenerator } from './components/FixtureGenerator';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open fixture generator</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Tournament fixture generator"
        className="fixture-generator-modal"
        footer={
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="dialog-subtitle">
          Enter teams, pick a format, and generate a full match schedule — round robin, knockout, or
          groups plus knockout.
        </p>
        <FixtureGenerator />
      </Modal>
    </div>
  );
}
