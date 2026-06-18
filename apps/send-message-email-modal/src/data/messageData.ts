export type MessageChannel = 'email' | 'sms';

export const messageTabs: { id: MessageChannel; label: string }[] = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
];

export const recipientOptions = [
  { value: 'all-parents', label: 'All parents (108)' },
  { value: '10a-parents', label: 'Grade 10-A parents (28)' },
  { value: '10b-parents', label: 'Grade 10-B parents (30)' },
  { value: '11a-parents', label: 'Grade 11-A parents (26)' },
  { value: '11b-parents', label: 'Grade 11-B parents (24)' },
  { value: 'custom', label: 'Custom recipient' },
];

export const templateOptions = [
  { value: 'blank', label: 'Blank message' },
  { value: 'absence', label: 'Absence notification' },
  { value: 'reminder', label: 'Attendance reminder' },
  { value: 'event', label: 'School event update' },
];

export const templateBodies: Record<string, { subject: string; body: string }> = {
  blank: { subject: '', body: '' },
  absence: {
    subject: 'Absence recorded for {{student_name}}',
    body: 'Dear parent/guardian,\n\nThis is to inform you that {{student_name}} was marked absent on {{date}}.\n\nIf you believe this is an error, please contact the school office.\n\nRegards,\nAttendance Office',
  },
  reminder: {
    subject: 'Attendance reminder — {{date}}',
    body: 'Dear parent/guardian,\n\nThis is a friendly reminder to ensure {{student_name}} arrives on time for morning registration.\n\nThank you,\nAttendance Office',
  },
  event: {
    subject: 'Upcoming school event',
    body: 'Dear parent/guardian,\n\nWe would like to share details about an upcoming school event. Further information will follow shortly.\n\nRegards,\nSchool Administration',
  },
};
