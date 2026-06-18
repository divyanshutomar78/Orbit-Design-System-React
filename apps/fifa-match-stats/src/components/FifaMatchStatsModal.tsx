import { useMemo, useState } from 'react';
import {
  Button,
  DefaultChip,
  Modal,
  SuccessChip,
  WarningChip,
  type ModalProps,
} from 'orbit-ds-components';

import type { FifaMatchEvent, FifaMatchStat, FifaMatchStats } from '../data/fifaMatchStats';
import './FifaMatchStatsModal.css';

export interface FifaMatchStatsModalProps extends Omit<ModalProps, 'title' | 'children'> {
  match: FifaMatchStats;
}

function StatRow({ label, home, away, unit = '' }: FifaMatchStat) {
  const total = home + away || 1;
  const homePct = (home / total) * 100;
  const awayPct = (away / total) * 100;

  return (
    <div className="orbit-fifa-stat-row">
      <div className="orbit-fifa-stat-row__values">
        <span>
          {home}
          {unit}
        </span>
        <span className="orbit-fifa-stat-row__label">{label}</span>
        <span>
          {away}
          {unit}
        </span>
      </div>
      <div className="orbit-fifa-stat-row__bar">
        <div className="orbit-fifa-stat-row__bar-home" style={{ width: `${homePct}%` }} />
        <div className="orbit-fifa-stat-row__bar-away" style={{ width: `${awayPct}%` }} />
      </div>
    </div>
  );
}

function EventChip({ type }: { type: FifaMatchEvent['type'] }) {
  const chipProps = { type: 'chip' as const, size: 'compact' as const, showIcon: false };

  if (type === 'Goal') {
    return <SuccessChip {...chipProps}>Goal</SuccessChip>;
  }

  if (type === 'Yellow Card' || type === 'Red Card') {
    return <WarningChip {...chipProps}>{type === 'Red Card' ? 'Red' : 'Yellow'}</WarningChip>;
  }

  return <DefaultChip {...chipProps}>Sub</DefaultChip>;
}

export function FifaMatchStatsModal({
  match,
  open,
  onClose,
  footer,
  ...rest
}: FifaMatchStatsModalProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'events'>('stats');

  const sortedEvents = useMemo(
    () => [...match.events].sort((a, b) => a.minute - b.minute),
    [match.events],
  );

  const statusChip =
    match.status === 'Live' ? (
      <SuccessChip type="chip" size="compact" showIcon={false}>
        Live
      </SuccessChip>
    ) : (
      <DefaultChip type="chip" size="compact" showIcon={false}>
        {match.status}
      </DefaultChip>
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Match statistics"
      footer={
        footer ?? (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )
      }
      {...rest}
    >
      <div className="orbit-fifa-match-stats">
        <div className="orbit-fifa-match-stats__meta">
          <span>
            {match.competition} · {match.stage}
          </span>
          <span>
            {match.date} · {match.venue}
          </span>
        </div>

        <div className="orbit-fifa-match-stats__scoreboard">
          <div className="orbit-fifa-match-stats__team">
            <span className="orbit-fifa-match-stats__team-abbr">{match.homeTeam.abbr}</span>
            <span className="orbit-fifa-match-stats__team-name">{match.homeTeam.name}</span>
          </div>

          <div className="orbit-fifa-match-stats__score">
            <span className="orbit-fifa-match-stats__score-value">
              {match.homeTeam.score} – {match.awayTeam.score}
            </span>
            {statusChip}
          </div>

          <div className="orbit-fifa-match-stats__team orbit-fifa-match-stats__team--away">
            <span className="orbit-fifa-match-stats__team-abbr">{match.awayTeam.abbr}</span>
            <span className="orbit-fifa-match-stats__team-name">{match.awayTeam.name}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'calc(var(--gap-s) * 1px)' }}>
          <Button
            variant={activeTab === 'stats' ? 'primary' : 'secondary'}
            minWidth={false}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </Button>
          <Button
            variant={activeTab === 'events' ? 'primary' : 'secondary'}
            minWidth={false}
            onClick={() => setActiveTab('events')}
          >
            Timeline
          </Button>
        </div>

        {activeTab === 'stats' ? (
          <section>
            <h3 className="orbit-fifa-match-stats__section-title">Team comparison</h3>
            <div className="orbit-fifa-match-stats__stats">
              {match.stats.map((stat) => (
                <StatRow key={stat.label} {...stat} />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h3 className="orbit-fifa-match-stats__section-title">Key events</h3>
            <div className="orbit-fifa-match-stats__events">
              {sortedEvents.map((event) => {
                const team =
                  event.team === 'home' ? match.homeTeam.abbr : match.awayTeam.abbr;

                return (
                  <div
                    key={`${event.minute}-${event.player}-${event.type}`}
                    className="orbit-fifa-match-stats__event"
                  >
                    <span className="orbit-fifa-match-stats__event-minute">{event.minute}'</span>
                    <span className="orbit-fifa-match-stats__event-player">
                      {event.player}{' '}
                      <span className="orbit-fifa-match-stats__event-type">({team})</span>
                    </span>
                    <EventChip type={event.type} />
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
}
