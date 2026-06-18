import { useState } from 'react';
import { Button, Modal } from 'orbit-ds-components';

import { EmiCalculator } from './components/EmiCalculator';

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open car loan EMI calculator</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Car loan EMI calculator"
        className="emi-calculator-modal"
        footer={
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <p className="dialog-subtitle">
          Estimate monthly payments, total interest, and repayment schedule.
        </p>
        <EmiCalculator />
      </Modal>
    </div>
  );
}
