export type TaskLevel = 'moderate' | 'high' | 'low';

export interface PinnedReport {
  id: string;
  org: string;
  heading: string;
}

export interface ReportRow {
  id: string;
  name: string;
  version: string;
  category: string;
}

export interface MessageItem {
  id: string;
  sender: string;
  time: string;
  newCount: number;
  preview: string;
}

export interface TaskRow {
  id: string;
  title: string;
  reference: string;
  openingDate: string;
  deadline: string;
  type: string;
  level: TaskLevel;
}

export const PINNED_REPORTS: PinnedReport[] = [
  { id: '1', org: 'DSNA', heading: 'Heading of the report' },
  { id: '2', org: 'DSNA', heading: 'Heading of the report' },
  { id: '3', org: 'DSNA', heading: 'Heading of the report' },
  { id: '4', org: 'DSNA', heading: 'Heading of the report' },
];

export const REPORT_ROWS: ReportRow[] = [
  { id: '1', name: 'Airspace Report', version: 'Alpha', category: 'GBSA' },
  { id: '2', name: 'Flight Analysis', version: 'Beta', category: 'Name' },
  { id: '3', name: 'Aerodrome Data', version: 'Gamma', category: 'DSNA' },
  { id: '4', name: 'Avionics System', version: 'Delta', category: 'ASDT' },
];

export const MESSAGES: MessageItem[] = [
  {
    id: '1',
    sender: 'Air France Major GC',
    time: '12:24 PM',
    newCount: 3,
    preview:
      'Divyanshu Tomar : Content of the message goes here with a preview of the latest update from the team.',
  },
  {
    id: '2',
    sender: 'Air France Major GC',
    time: '12:24 PM',
    newCount: 3,
    preview:
      'Divyanshu Tomar : Content of the message goes here with a preview of the latest update from the team.',
  },
  {
    id: '3',
    sender: 'Air France Major GC',
    time: '12:24 PM',
    newCount: 3,
    preview:
      'Divyanshu Tomar : Content of the message goes here with a preview of the latest update from the team.',
  },
];

export const TASK_ROWS: TaskRow[] = [
  {
    id: '1',
    title: 'Airspace Report',
    reference: 'Finding - 2025/11/0234',
    openingDate: '24-01-25',
    deadline: 'Alpha',
    type: 'Alpha',
    level: 'moderate',
  },
  {
    id: '2',
    title: 'Flight Analysis',
    reference: 'Finding - 2025/11/0234',
    openingDate: '24-01-25',
    deadline: 'Beta',
    type: 'Beta',
    level: 'high',
  },
  {
    id: '3',
    title: 'Aerodrome Data',
    reference: 'Finding - 2025/11/0234',
    openingDate: '24-01-25',
    deadline: 'Gamma',
    type: 'Gamma',
    level: 'low',
  },
  {
    id: '4',
    title: 'Avionics System',
    reference: 'Finding - 2025/11/0234',
    openingDate: '24-01-25',
    deadline: 'Delta',
    type: 'Delta',
    level: 'moderate',
  },
];
