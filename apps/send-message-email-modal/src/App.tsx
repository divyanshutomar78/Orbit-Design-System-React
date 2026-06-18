import { useState } from 'react';
import { Button } from 'orbit-ds-components';

import { SendMessageEmailModal } from './components/SendMessageEmailModal';

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-shell">
      <Button onClick={() => setOpen(true)}>Send message</Button>

      <SendMessageEmailModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
