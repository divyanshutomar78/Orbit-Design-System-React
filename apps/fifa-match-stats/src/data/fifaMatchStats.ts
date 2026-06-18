export interface FifaTeamStats {
  name: string;
  abbr: string;
  score: number;
}

export interface FifaMatchStat {
  label: string;
  home: number;
  away: number;
  unit?: string;
}

export interface FifaMatchEvent {
  minute: number;
  type: 'Goal' | 'Yellow Card' | 'Red Card' | 'Substitution';
  player: string;
  team: 'home' | 'away';
}

export interface FifaMatchStats {
  id: string;
  competition: string;
  stage: string;
  date: string;
  venue: string;
  status: 'FT' | 'HT' | 'Live';
  homeTeam: FifaTeamStats;
  awayTeam: FifaTeamStats;
  stats: FifaMatchStat[];
  events: FifaMatchEvent[];
}

export const SAMPLE_FIFA_MATCHES: FifaMatchStats[] = [
  {
    id: 'wc-2022-final',
    competition: 'FIFA World Cup',
    stage: 'Final',
    date: '18 Dec 2022',
    venue: 'Lusail Stadium, Qatar',
    status: 'FT',
    homeTeam: { name: 'Argentina', abbr: 'ARG', score: 3 },
    awayTeam: { name: 'France', abbr: 'FRA', score: 3 },
    stats: [
      { label: 'Ball possession', home: 54, away: 46, unit: '%' },
      { label: 'Shots', home: 10, away: 7 },
      { label: 'Shots on target', home: 7, away: 5 },
      { label: 'Passes', home: 532, away: 463 },
      { label: 'Pass accuracy', home: 86, away: 84, unit: '%' },
      { label: 'Fouls', home: 18, away: 11 },
      { label: 'Corners', home: 6, away: 5 },
      { label: 'Offsides', home: 2, away: 1 },
    ],
    events: [
      { minute: 23, type: 'Goal', player: 'Messi', team: 'home' },
      { minute: 36, type: 'Goal', player: 'Di Maria', team: 'home' },
      { minute: 80, type: 'Goal', player: 'Mbappe', team: 'away' },
      { minute: 81, type: 'Goal', player: 'Mbappe', team: 'away' },
      { minute: 108, type: 'Goal', player: 'Messi', team: 'home' },
      { minute: 118, type: 'Goal', player: 'Mbappe', team: 'away' },
    ],
  },
  {
    id: 'wc-2018-semi',
    competition: 'FIFA World Cup',
    stage: 'Semi-final',
    date: '10 Jul 2018',
    venue: 'Saint Petersburg Stadium, Russia',
    status: 'FT',
    homeTeam: { name: 'France', abbr: 'FRA', score: 1 },
    awayTeam: { name: 'Belgium', abbr: 'BEL', score: 0 },
    stats: [
      { label: 'Ball possession', home: 44, away: 56, unit: '%' },
      { label: 'Shots', home: 12, away: 14 },
      { label: 'Shots on target', home: 4, away: 3 },
      { label: 'Passes', home: 401, away: 519 },
      { label: 'Pass accuracy', home: 81, away: 87, unit: '%' },
      { label: 'Fouls', home: 14, away: 16 },
      { label: 'Corners', home: 3, away: 7 },
      { label: 'Offsides', home: 1, away: 3 },
    ],
    events: [{ minute: 51, type: 'Goal', player: 'Umtiti', team: 'home' }],
  },
  {
    id: 'wc-2014-final',
    competition: 'FIFA World Cup',
    stage: 'Final',
    date: '13 Jul 2014',
    venue: 'Maracana, Brazil',
    status: 'FT',
    homeTeam: { name: 'Germany', abbr: 'GER', score: 1 },
    awayTeam: { name: 'Argentina', abbr: 'ARG', score: 0 },
    stats: [
      { label: 'Ball possession', home: 52, away: 48, unit: '%' },
      { label: 'Shots', home: 7, away: 10 },
      { label: 'Shots on target', home: 3, away: 2 },
      { label: 'Passes', home: 478, away: 439 },
      { label: 'Pass accuracy', home: 83, away: 80, unit: '%' },
      { label: 'Fouls', home: 16, away: 19 },
      { label: 'Corners', home: 2, away: 4 },
      { label: 'Offsides', home: 3, away: 2 },
    ],
    events: [{ minute: 113, type: 'Goal', player: 'Gotze', team: 'home' }],
  },
];
