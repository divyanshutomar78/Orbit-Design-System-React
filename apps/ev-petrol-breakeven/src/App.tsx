import { useState } from 'react';
import { Button, Modal } from 'orbit-ds-components';

import { BreakEvenCalculator } from './components/BreakEvenCalculator';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>EV vs petrol break-even</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="EV vs petrol break-even"
        className="breakeven-modal"
        footer={
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="dialog-subtitle">
          Compare purchase price, mileage, and daily driving to find when an EV pays back its
          premium over petrol.
        </p>
        <BreakEvenCalculator />
      </Modal>
    </div>
  );
}
