export type FirFilter = 'all' | 'relevant' | 'active';

export interface FirListEntry {
  id: string;
  label: string;
  activeCount?: number;
  futureCount?: number;
  noData?: boolean;
}

export interface FirRegion {
  id: string;
  code: string;
  name: string;
  activeCount: number;
  futureCount: number;
  items: FirListEntry[];
}

export const FIR_FILTERS: { id: FirFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'relevant', label: 'Relevant' },
  { id: 'active', label: 'Active' },
];

export const FIR_REGIONS: FirRegion[] = [
  {
    id: 'eu',
    code: 'EU',
    name: 'Europe',
    activeCount: 4,
    futureCount: 3,
    items: [
      { id: 'fir-1', label: 'FIR 1', activeCount: 3, futureCount: 1 },
      { id: 'fir-2', label: 'FIR 2', activeCount: 3, futureCount: 1 },
      { id: 'fir-3', label: 'FIR 3', activeCount: 3 },
      { id: 'fir-4', label: 'FIR 4', noData: true },
      { id: 'fir-5', label: 'FIR 5', activeCount: 3, futureCount: 1 },
      { id: 'fir-6', label: 'FIR 6', activeCount: 3 },
      { id: 'fir-7', label: 'FIR 7', activeCount: 3, futureCount: 1 },
    ],
  },
  {
    id: 'mid',
    code: 'MID',
    name: 'Middle East',
    activeCount: 4,
    futureCount: 3,
    items: [
      { id: 'fir-8', label: 'FIR 8', activeCount: 2, futureCount: 1 },
      { id: 'fir-9', label: 'FIR 9', activeCount: 1, futureCount: 2 },
      { id: 'fir-10', label: 'FIR 10', noData: true },
    ],
  },
];
