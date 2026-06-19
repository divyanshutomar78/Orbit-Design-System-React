import { useState } from 'react';
import { Button } from 'orbit-ds-components';

import { CarAffordabilityPlanner } from './components/CarAffordabilityPlanner';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open car affordability planner</Button>
      <CarAffordabilityPlanner open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
