import { useState } from 'react';
import { Button } from 'orbit-ds-components';

import { FlightInfoModal } from './components/FlightInfoModal';
import { sampleFlight } from './data/flightInfo';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open flight info</Button>

      <FlightInfoModal flight={sampleFlight} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
