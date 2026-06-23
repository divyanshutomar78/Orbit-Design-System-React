export type TournamentFormat = 'round-robin' | 'knockout' | 'groups-knockout';

export interface FixtureMatch {
  id: number;
  round: number;
  roundLabel: string;
  home: string;
  away: string;
  group?: string;
  scheduledDate?: string;
  venue?: string;
  isBye?: boolean;
}

export interface FixtureOptions {
  teams: string[];
  format: TournamentFormat;
  groupsCount?: number;
  advancePerGroup?: number;
  startDate?: string;
  matchesPerDay?: number;
  venue?: string;
  shuffle?: boolean;
}

export interface FixtureResult {
  matches: FixtureMatch[];
  totalRounds: number;
  totalMatches: number;
  groups?: string[];
}

export function defaultTeamNames(count: number): string[] {
  return Array.from({ length: count }, (_, index) => `Team ${index + 1}`);
}

export function parseTeamNames(text: string, fallbackCount: number): string[] {
  const names = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (names.length === 0) {
    return defaultTeamNames(fallbackCount);
  }

  return names;
}

export function generateFixture(options: FixtureOptions): FixtureResult {
  const teams = options.shuffle ? shuffleTeams([...options.teams]) : [...options.teams];

  let matches: FixtureMatch[];

  switch (options.format) {
    case 'round-robin':
      matches = generateRoundRobin(teams);
      break;
    case 'knockout':
      matches = generateKnockout(teams);
      break;
    case 'groups-knockout':
      matches = generateGroupsKnockout(
        teams,
        options.groupsCount ?? 2,
        options.advancePerGroup ?? 2,
      );
      break;
  }

  if (options.startDate) {
    matches = assignDates(matches, options.startDate, options.matchesPerDay ?? 2);
  }

  if (options.venue) {
    matches = matches.map((match) => ({ ...match, venue: options.venue }));
  }

  const totalRounds = matches.reduce((max, match) => Math.max(max, match.round), 0);
  const groups =
    options.format === 'groups-knockout'
      ? [...new Set(matches.map((m) => m.group).filter(Boolean) as string[])]
      : undefined;

  return {
    matches,
    totalRounds,
    totalMatches: matches.length,
    groups,
  };
}

function shuffleTeams<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function nextPowerOf2(value: number): number {
  return 2 ** Math.ceil(Math.log2(value));
}

function getKnockoutRoundLabel(matchesInRound: number): string {
  if (matchesInRound === 1) return 'Final';
  if (matchesInRound === 2) return 'Semi-finals';
  if (matchesInRound === 4) return 'Quarter-finals';
  return `Round of ${matchesInRound * 2}`;
}

function generateRoundRobin(teams: string[]): FixtureMatch[] {
  const players = [...teams];
  if (players.length < 2) {
    return [];
  }

  if (players.length % 2 !== 0) {
    players.push('BYE');
  }

  const size = players.length;
  const rounds = size - 1;
  const matches: FixtureMatch[] = [];
  let rotation = [...players];
  let matchId = 1;

  for (let round = 0; round < rounds; round += 1) {
    for (let index = 0; index < size / 2; index += 1) {
      const home = rotation[index];
      const away = rotation[size - 1 - index];

      if (home !== 'BYE' && away !== 'BYE') {
        matches.push({
          id: matchId,
          round: round + 1,
          roundLabel: `Round ${round + 1}`,
          home,
          away,
        });
        matchId += 1;
      }
    }

    const fixed = rotation[0];
    const rest = rotation.slice(1);
    rest.unshift(rest.pop()!);
    rotation = [fixed, ...rest];
  }

  return matches;
}

function generateKnockout(teams: string[]): FixtureMatch[] {
  if (teams.length < 2) {
    return [];
  }

  let bracket = [...teams];
  const size = nextPowerOf2(bracket.length);

  while (bracket.length < size) {
    bracket.push('BYE');
  }

  const matches: FixtureMatch[] = [];
  let matchId = 1;
  let roundNum = 1;
  let currentSlots = bracket;

  while (currentSlots.length > 1) {
    const matchesInRound = currentSlots.length / 2;
    const roundLabel = getKnockoutRoundLabel(matchesInRound);
    const nextSlots: string[] = [];

    for (let index = 0; index < currentSlots.length; index += 2) {
      const home = currentSlots[index];
      const away = currentSlots[index + 1];
      const isBye = home === 'BYE' || away === 'BYE';
      const matchNumber = matchId;

      if (isBye) {
        const advancing = home === 'BYE' ? away : home;
        matches.push({
          id: matchId,
          round: roundNum,
          roundLabel,
          home: advancing,
          away: 'BYE',
          isBye: true,
        });
        nextSlots.push(advancing);
      } else {
        matches.push({
          id: matchId,
          round: roundNum,
          roundLabel,
          home,
          away,
        });
        nextSlots.push(`Winner of Match ${matchNumber}`);
      }

      matchId += 1;
    }

    currentSlots = nextSlots;
    roundNum += 1;
  }

  return matches;
}

function distributeIntoGroups(teams: string[], groupsCount: number): [string, string[]][] {
  const count = Math.max(2, Math.min(groupsCount, teams.length));
  const groups: string[][] = Array.from({ length: count }, () => []);

  teams.forEach((team, index) => {
    groups[index % count].push(team);
  });

  return groups.map((groupTeams, index) => [
    `Group ${String.fromCharCode(65 + index)}`,
    groupTeams,
  ]);
}

function generateGroupsKnockout(
  teams: string[],
  groupsCount: number,
  advancePerGroup: number,
): FixtureMatch[] {
  const groups = distributeIntoGroups(teams, groupsCount);
  const allMatches: FixtureMatch[] = [];
  let matchId = 1;
  let maxGroupRound = 0;

  for (const [groupName, groupTeams] of groups) {
    if (groupTeams.length < 2) continue;

    const groupMatches = generateRoundRobin(groupTeams);
    for (const match of groupMatches) {
      allMatches.push({
        ...match,
        id: matchId,
        group: groupName,
        roundLabel: `${groupName} — Round ${match.round}`,
      });
      matchId += 1;
      maxGroupRound = Math.max(maxGroupRound, match.round);
    }
  }

  const knockoutSeeds = groups.flatMap(([groupName]) =>
    Array.from({ length: advancePerGroup }, (_, index) => {
      const place = index + 1;
      const suffix = place === 1 ? 'st' : place === 2 ? 'nd' : place === 3 ? 'rd' : 'th';
      return `${groupName} ${place}${suffix}`;
    }),
  );

  if (knockoutSeeds.length >= 2) {
    const knockoutMatches = generateKnockout(knockoutSeeds);
    for (const match of knockoutMatches) {
      allMatches.push({
        ...match,
        id: matchId,
        round: maxGroupRound + match.round,
        roundLabel: `Knockout — ${match.roundLabel}`,
      });
      matchId += 1;
    }
  }

  return allMatches;
}

function assignDates(
  matches: FixtureMatch[],
  startDate: string,
  matchesPerDay: number,
): FixtureMatch[] {
  const start = new Date(`${startDate}T00:00:00`);
  const perDay = Math.max(1, matchesPerDay);

  return matches.map((match, index) => ({
    ...match,
    scheduledDate: formatDate(addDays(start, Math.floor(index / perDay))),
  }));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function groupMatchesByRound(matches: FixtureMatch[]): Map<string, FixtureMatch[]> {
  const grouped = new Map<string, FixtureMatch[]>();

  for (const match of matches) {
    const key = match.roundLabel;
    const existing = grouped.get(key) ?? [];
    existing.push(match);
    grouped.set(key, existing);
  }

  return grouped;
}
