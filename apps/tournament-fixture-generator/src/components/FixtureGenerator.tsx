import { useMemo, useState } from 'react';
import {
  Button,
  InputSelect,
  LabelValueHorizontal,
  NeutralChip,
  OptionCheckbox,
} from 'orbit-ds-components';

import {
  defaultTeamNames,
  generateFixture,
  groupMatchesByRound,
  parseTeamNames,
  type FixtureResult,
  type TournamentFormat,
} from '../utils/fixture';
import { NumberField } from './NumberField';
import { TextAreaField, TextField } from './TextField';
import './FixtureGenerator.css';

const FORMAT_OPTIONS = [
  { value: 'round-robin', label: 'Round robin (league)' },
  { value: 'knockout', label: 'Single elimination (knockout)' },
  { value: 'groups-knockout', label: 'Group stage + knockout' },
];

const DEFAULT_PLAYER_COUNT = 8;

export function FixtureGenerator() {
  const [tournamentName, setTournamentName] = useState('Summer Cup');
  const [playerCount, setPlayerCount] = useState(String(DEFAULT_PLAYER_COUNT));
  const [teamNamesText, setTeamNamesText] = useState(defaultTeamNames(DEFAULT_PLAYER_COUNT).join('\n'));
  const [format, setFormat] = useState<TournamentFormat>('round-robin');
  const [groupsCount, setGroupsCount] = useState('2');
  const [advancePerGroup, setAdvancePerGroup] = useState('2');
  const [startDate, setStartDate] = useState('');
  const [matchesPerDay, setMatchesPerDay] = useState('2');
  const [venue, setVenue] = useState('');
  const [shuffle, setShuffle] = useState(true);
  const [submitted, setSubmitted] = useState<FixtureResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePlayerCountChange = (value: string) => {
    setPlayerCount(value);
    const count = Math.max(2, Number(value) || 2);
    const currentNames = parseTeamNames(teamNamesText, count);
    const isDefaultPattern = currentNames.every((name, index) => name === `Team ${index + 1}`);

    if (isDefaultPattern || currentNames.length !== Number(playerCount)) {
      setTeamNamesText(defaultTeamNames(count).join('\n'));
    }
  };

  const handleGenerate = () => {
    const count = Math.max(2, Math.min(64, Number(playerCount) || 2));
    const teams = parseTeamNames(teamNamesText, count);

    if (teams.length < 2) {
      setError('Enter at least 2 teams or players.');
      setSubmitted(null);
      return;
    }

    if (format === 'groups-knockout') {
      const groups = Math.max(2, Number(groupsCount) || 2);
      const advance = Math.max(1, Number(advancePerGroup) || 1);

      if (groups > teams.length) {
        setError('Number of groups cannot exceed the number of teams.');
        setSubmitted(null);
        return;
      }

      if (advance * groups > teams.length) {
        setError('Too many knockout spots for the teams provided.');
        setSubmitted(null);
        return;
      }
    }

    setError(null);
    setSubmitted(
      generateFixture({
        teams,
        format,
        groupsCount: Number(groupsCount) || 2,
        advancePerGroup: Number(advancePerGroup) || 2,
        startDate: startDate || undefined,
        matchesPerDay: Number(matchesPerDay) || 2,
        venue: venue.trim() || undefined,
        shuffle,
      }),
    );
  };

  const handleReset = () => {
    setTournamentName('Summer Cup');
    setPlayerCount(String(DEFAULT_PLAYER_COUNT));
    setTeamNamesText(defaultTeamNames(DEFAULT_PLAYER_COUNT).join('\n'));
    setFormat('round-robin');
    setGroupsCount('2');
    setAdvancePerGroup('2');
    setStartDate('');
    setMatchesPerDay('2');
    setVenue('');
    setShuffle(true);
    setSubmitted(null);
    setError(null);
  };

  const groupedMatches = useMemo(
    () => (submitted ? groupMatchesByRound(submitted.matches) : new Map()),
    [submitted],
  );

  return (
    <section className="fixture-generator">
      <form
        className="fixture-generator__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleGenerate();
        }}
      >
        <div className="fixture-generator__form-grid">
          <TextField
            label="Tournament name"
            value={tournamentName}
            onChange={(event) => setTournamentName(event.target.value)}
            placeholder="Summer Cup"
          />

          <NumberField
            label="Number of players / teams"
            min={2}
            max={64}
            value={playerCount}
            onChange={(event) => handlePlayerCountChange(event.target.value)}
          />

          <InputSelect
            label="Tournament format"
            value={format}
            options={FORMAT_OPTIONS}
            onValueChange={(value) => setFormat(value as TournamentFormat)}
          />

          {format === 'groups-knockout' ? (
            <>
              <NumberField
                label="Number of groups"
                min={2}
                max={16}
                value={groupsCount}
                onChange={(event) => setGroupsCount(event.target.value)}
              />
              <NumberField
                label="Teams advancing per group"
                min={1}
                max={8}
                value={advancePerGroup}
                onChange={(event) => setAdvancePerGroup(event.target.value)}
              />
            </>
          ) : null}

          <TextField
            label="Venue (optional)"
            value={venue}
            onChange={(event) => setVenue(event.target.value)}
            placeholder="Main arena"
          />

          <label className="fixture-generator__date-field">
            <span className="fixture-generator__date-label">Start date (optional)</span>
            <input
              type="date"
              className="fixture-generator__date-input"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          <NumberField
            label="Matches per day"
            min={1}
            max={32}
            value={matchesPerDay}
            onChange={(event) => setMatchesPerDay(event.target.value)}
            suffix="matches"
          />
        </div>

        <TextAreaField
          label="Team / player names"
          hint="One name per line. Leave as defaults or replace with your own names."
          value={teamNamesText}
          onChange={(event) => setTeamNamesText(event.target.value)}
        />

        <OptionCheckbox
          label="Shuffle teams before drawing fixtures"
          checked={shuffle}
          onChange={(event) => setShuffle(event.target.checked)}
        />

        <div className="fixture-generator__actions">
          <Button type="submit">Generate fixture</Button>
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>

      {error ? <p className="fixture-generator__error">{error}</p> : null}

      {submitted ? (
        <div className="fixture-generator__results">
          <header className="fixture-generator__results-header">
            <div>
              <h3 className="fixture-generator__results-title">
                {tournamentName.trim() || 'Tournament'} fixture
              </h3>
              <p className="fixture-generator__results-subtitle">
                {FORMAT_OPTIONS.find((option) => option.value === format)?.label}
              </p>
            </div>
            <div className="fixture-generator__stats">
              <NeutralChip type="chip" size="compact" showIcon={false}>
                {submitted.totalMatches} matches
              </NeutralChip>
              <NeutralChip type="chip" size="compact" showIcon={false}>
                {submitted.totalRounds} rounds
              </NeutralChip>
              {submitted.groups ? (
                <NeutralChip type="chip" size="compact" showIcon={false}>
                  {submitted.groups.length} groups
                </NeutralChip>
              ) : null}
            </div>
          </header>

          <div className="fixture-generator__summary">
            <LabelValueHorizontal label="Teams" value={String(parseTeamNames(teamNamesText, Number(playerCount)).length)} />
            <LabelValueHorizontal
              label="Format"
              value={FORMAT_OPTIONS.find((option) => option.value === format)?.label ?? format}
            />
            {venue.trim() ? <LabelValueHorizontal label="Venue" value={venue.trim()} /> : null}
            {startDate ? <LabelValueHorizontal label="Starts" value={startDate} /> : null}
          </div>

          <div className="fixture-generator__rounds">
            {[...groupedMatches.entries()].map(([roundLabel, matches]) => (
              <section key={roundLabel} className="fixture-generator__round">
                <h4 className="fixture-generator__round-title">{roundLabel}</h4>
                <div className="fixture-generator__table">
                  <div className="fixture-generator__table-head">
                    <span>#</span>
                    <span>Home</span>
                    <span>Away</span>
                    <span>Date</span>
                  </div>
                  <div className="fixture-generator__table-body">
                    {matches.map((match) => (
                      <div key={match.id} className="fixture-generator__table-row">
                        <span>{match.id}</span>
                        <span>{match.home}</span>
                        <span className={match.isBye ? 'fixture-generator__bye' : undefined}>
                          {match.away}
                        </span>
                        <span>{match.scheduledDate ?? '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
