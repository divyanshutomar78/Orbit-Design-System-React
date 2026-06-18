export interface UsageLineItem {
  id: string;
  label: string;
  tokens: string;
  usage: string;
  indent?: boolean;
  isCategory?: boolean;
}

export interface OnDemandLineItem {
  id: string;
  type: string;
  tokens: string;
  cost: string;
  qty: string;
  total: string;
}

export const billingCycles = [
  { value: 'current', label: 'Cycle starting Feb 1, 2025' },
  { value: 'previous', label: 'Cycle starting Jan 1, 2025' },
  { value: 'december', label: 'Cycle starting Dec 1, 2024' },
];

export const includedUsageItems: UsageLineItem[] = [
  { id: 'api', label: 'API', tokens: '2.1M', usage: '78%', isCategory: true },
  { id: 'gpt-4o', label: 'gpt-4o', tokens: '1.2M', usage: '45%', indent: true },
  {
    id: 'claude',
    label: 'claude-3-5-sonnet',
    tokens: '890K',
    usage: '33%',
    indent: true,
  },
  {
    id: 'auto',
    label: 'Auto + Composer',
    tokens: '620K',
    usage: '22%',
    isCategory: true,
  },
  { id: 'composer', label: 'Composer', tokens: '500K', usage: '18%', indent: true },
  { id: 'tab', label: 'Tab', tokens: '120K', usage: '4%', indent: true },
];

export const onDemandItems: OnDemandLineItem[] = [];

export const includedUsagePeriod = 'Jan 13, 2025 – Feb 13, 2025';
