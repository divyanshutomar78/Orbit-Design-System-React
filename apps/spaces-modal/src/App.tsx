import { useState } from 'react';
import { Button } from 'orbit-ds-components';

import { SpacesModal } from './components/SpacesModal';
import { sampleSpace } from './data/spacesData';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open space</Button>
      <SpacesModal space={sampleSpace} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
