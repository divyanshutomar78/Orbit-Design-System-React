import { useState } from 'react';
import { Button } from 'orbit-ds-components';

import { SendCustomAnswerModal } from './components/SendCustomAnswerModal';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Open send custom answer</Button>

      <SendCustomAnswerModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
