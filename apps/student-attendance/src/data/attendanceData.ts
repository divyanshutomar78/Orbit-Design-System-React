export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export type DashboardTab = 'overview' | 'by-class' | 'reports';

export type AvatarTone = 'blue' | 'green' | 'orange' | 'magenta' | 'neutral';

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  classId: string;
  className: string;
  status: AttendanceStatus;
  checkIn: string;
  weeklyRate: number;
  tone: AvatarTone;
}

export interface ClassSummary {
  id: string;
  name: string;
  enrolled: number;
  present: number;
  absent: number;
  rate: number;
}

export interface WeekdayTrend {
  day: string;
  rate: number;
}

export const classFilterOptions = [
  { value: 'all', label: 'All classes' },
  { value: '10a', label: 'Grade 10-A' },
  { value: '10b', label: 'Grade 10-B' },
  { value: '11a', label: 'Grade 11-A' },
  { value: '11b', label: 'Grade 11-B' },
];

export const dashboardTabs: { id: DashboardTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'by-class', label: 'By class' },
  { id: 'reports', label: 'Reports' },
];

export const todayLabel = 'Wednesday, 18 June 2025';

export const weeklyTrend: WeekdayTrend[] = [
  { day: 'Mon', rate: 94 },
  { day: 'Tue', rate: 91 },
  { day: 'Wed', rate: 96 },
  { day: 'Thu', rate: 88 },
  { day: 'Fri', rate: 92 },
];

export const students: StudentRecord[] = [
  {
    id: 's1',
    name: 'Aisha Khan',
    email: 'aisha.khan@school.edu',
    classId: '10a',
    className: 'Grade 10-A',
    status: 'present',
    checkIn: '08:02',
    weeklyRate: 96,
    tone: 'blue',
  },
  {
    id: 's2',
    name: 'Ben Carter',
    email: 'ben.carter@school.edu',
    classId: '10a',
    className: 'Grade 10-A',
    status: 'late',
    checkIn: '08:18',
    weeklyRate: 88,
    tone: 'orange',
  },
  {
    id: 's3',
    name: 'Chloe Nguyen',
    email: 'chloe.nguyen@school.edu',
    classId: '10b',
    className: 'Grade 10-B',
    status: 'present',
    checkIn: '08:01',
    weeklyRate: 100,
    tone: 'green',
  },
  {
    id: 's4',
    name: 'Daniel Ortiz',
    email: 'daniel.ortiz@school.edu',
    classId: '10b',
    className: 'Grade 10-B',
    status: 'absent',
    checkIn: '—',
    weeklyRate: 72,
    tone: 'magenta',
  },
  {
    id: 's5',
    name: 'Emma Wilson',
    email: 'emma.wilson@school.edu',
    classId: '11a',
    className: 'Grade 11-A',
    status: 'present',
    checkIn: '07:58',
    weeklyRate: 94,
    tone: 'neutral',
  },
  {
    id: 's6',
    name: 'Finn O’Brien',
    email: 'finn.obrien@school.edu',
    classId: '11a',
    className: 'Grade 11-A',
    status: 'excused',
    checkIn: '—',
    weeklyRate: 91,
    tone: 'blue',
  },
  {
    id: 's7',
    name: 'Grace Liu',
    email: 'grace.liu@school.edu',
    classId: '11b',
    className: 'Grade 11-B',
    status: 'present',
    checkIn: '08:04',
    weeklyRate: 98,
    tone: 'green',
  },
  {
    id: 's8',
    name: 'Hassan Ali',
    email: 'hassan.ali@school.edu',
    classId: '11b',
    className: 'Grade 11-B',
    status: 'absent',
    checkIn: '—',
    weeklyRate: 80,
    tone: 'orange',
  },
  {
    id: 's9',
    name: 'Isla Martin',
    email: 'isla.martin@school.edu',
    classId: '10a',
    className: 'Grade 10-A',
    status: 'present',
    checkIn: '08:00',
    weeklyRate: 92,
    tone: 'magenta',
  },
  {
    id: 's10',
    name: 'James Patel',
    email: 'james.patel@school.edu',
    classId: '10b',
    className: 'Grade 10-B',
    status: 'late',
    checkIn: '08:22',
    weeklyRate: 85,
    tone: 'neutral',
  },
];

export const classSummaries: ClassSummary[] = [
  { id: '10a', name: 'Grade 10-A', enrolled: 28, present: 26, absent: 2, rate: 93 },
  { id: '10b', name: 'Grade 10-B', enrolled: 30, present: 27, absent: 3, rate: 90 },
  { id: '11a', name: 'Grade 11-A', enrolled: 26, present: 24, absent: 2, rate: 92 },
  { id: '11b', name: 'Grade 11-B', enrolled: 24, present: 22, absent: 2, rate: 92 },
];

export function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getStats(records: StudentRecord[]) {
  const total = records.length;
  const present = records.filter((s) => s.status === 'present').length;
  const late = records.filter((s) => s.status === 'late').length;
  const absent = records.filter((s) => s.status === 'absent').length;
  const excused = records.filter((s) => s.status === 'excused').length;
  const attending = present + late;
  const rate = total ? Math.round((attending / total) * 100) : 0;

  return { total, present, late, absent, excused, attending, rate };
}
