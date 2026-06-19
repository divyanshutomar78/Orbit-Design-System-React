export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: UserStatus;
  lastAccess: string;
}

export const allRoles = [
  'Role 1',
  'Admin 12A',
  'Role 4',
  'Role 2',
  'Cyber security',
  'SF Auditor',
  'Role 7',
  'SF CUBE AD',
  'Role 3',
  'Role 6',
] as const;

export type RoleName = (typeof allRoles)[number];

export const initialUsers: UserRecord[] = [
  {
    id: '1',
    name: 'First Last',
    email: 'first.last@example.com',
    roles: ['Role 1', 'Admin 12A', 'Role 4', 'Role 2', 'Cyber security', 'SF Auditor'],
    status: 'active',
    lastAccess: '2024-03-12 14:32',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    roles: ['Role 2', 'SF Auditor'],
    status: 'inactive',
    lastAccess: '2024-02-28 09:15',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    roles: ['Admin 12A'],
    status: 'blocked',
    lastAccess: '2024-01-05 11:00',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    roles: ['Role 7', 'SF CUBE AD'],
    status: 'active',
    lastAccess: '2024-03-10 16:45',
  },
  {
    id: '5',
    name: 'Chris Lee',
    email: 'chris.lee@example.com',
    roles: ['Role 3'],
    status: 'active',
    lastAccess: '2024-03-11 08:20',
  },
];

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatRoles(roles: string[]): string {
  return roles.join(', ');
}

export const itemsPerPageOptions = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
];

export const actionMenuItems = [
  { id: 'add-user', label: 'Add user' },
  { id: 'delete-user', label: 'Delete user' },
  { id: 'move-users', label: 'Move users' },
  { id: 'import-users', label: 'Import users' },
  { id: 'export-users', label: 'Export users' },
  { id: 'add-roles', label: 'Add roles' },
  { id: 'remove-roles', label: 'Remove roles' },
] as const;

export type ActionMenuId = (typeof actionMenuItems)[number]['id'];

export type AddUserFlowStep = 'users-list' | 'add-roles-empty' | 'add-roles-selected' | 'add-roles-expanded';
