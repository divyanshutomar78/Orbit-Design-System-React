import { useState } from 'react';
import { Button, InputSelect } from 'orbit-ds-components';

import { FifaMatchStatsModal } from './components/FifaMatchStatsModal';
import { SAMPLE_FIFA_MATCHES } from './data/fifaMatchStats';

export function App() {
  const [open, setOpen] = useState(false);
  const [matchId, setMatchId] = useState(SAMPLE_FIFA_MATCHES[0].id);

  const match =
    SAMPLE_FIFA_MATCHES.find((item) => item.id === matchId) ?? SAMPLE_FIFA_MATCHES[0];

  return (
    <div className="app-shell">
      <InputSelect
        label="Select match"
        value={matchId}
        options={SAMPLE_FIFA_MATCHES.map((item) => ({
          value: item.id,
          label: `${item.homeTeam.name} vs ${item.awayTeam.name} (${item.stage})`,
        }))}
        onValueChange={setMatchId}
      />
      <Button onClick={() => setOpen(true)}>View match statistics</Button>
      <FifaMatchStatsModal open={open} match={match} onClose={() => setOpen(false)} />
    </div>
  );
}
