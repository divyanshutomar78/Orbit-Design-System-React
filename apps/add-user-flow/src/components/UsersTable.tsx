import { ButtonCompact, LabelValueHorizontal, OptionCheckbox } from 'orbit-ds-components';

import type { UserRecord } from '../data/usersData';
import { formatRoles } from '../data/usersData';
import { EditIcon, SortIcon } from './icons';
import { UserAvatar } from './UserAvatar';
import { UserStatusChip } from './UserStatusChip';
import './UsersTable.css';

export interface UsersTableProps {
  users: UserRecord[];
  selectedIds: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
}

export function UsersTable({
  users,
  selectedIds,
  onToggleRow,
  onToggleAll,
}: UsersTableProps) {
  const allSelected = users.length > 0 && users.every((user) => selectedIds.has(user.id));
  const someSelected = users.some((user) => selectedIds.has(user.id)) && !allSelected;

  return (
    <div className="users-table">
      <div className="users-table__head" role="row">
        <span className="users-table__cell users-table__cell--check" role="columnheader">
          <OptionCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onToggleAll}
            label=""
            aria-label="Select all users"
          />
        </span>
        <span className="users-table__cell users-table__cell--name" role="columnheader">
          <LabelValueHorizontal label="User name" layout="L" />
          <SortIcon className="users-table__sort" aria-hidden />
        </span>
        <span className="users-table__cell users-table__cell--role" role="columnheader">
          <LabelValueHorizontal label="User role" layout="L" />
        </span>
        <span className="users-table__cell users-table__cell--status" role="columnheader">
          <LabelValueHorizontal label="User status" layout="L" />
        </span>
        <span className="users-table__cell users-table__cell--access" role="columnheader">
          <LabelValueHorizontal label="Last access" layout="L" />
          <SortIcon className="users-table__sort" aria-hidden />
        </span>
        <span className="users-table__cell users-table__cell--controls" role="columnheader">
          <LabelValueHorizontal label="Controls" layout="L" />
        </span>
      </div>

      {users.map((user) => {
        const selected = selectedIds.has(user.id);

        return (
          <div
            key={user.id}
            className={`users-table__row${selected ? ' users-table__row--selected' : ''}`}
            role="row"
          >
            <span className="users-table__cell users-table__cell--check" role="cell">
              <OptionCheckbox
                checked={selected}
                onChange={() => onToggleRow(user.id)}
                label=""
                aria-label={`Select ${user.name}`}
              />
            </span>
            <span className="users-table__cell users-table__cell--name" role="cell">
              <UserAvatar name={user.name} />
              <span className="users-table__person">
                <span className="users-table__name">{user.name}</span>
                <span className="users-table__email">{user.email}</span>
              </span>
            </span>
            <span className="users-table__cell users-table__cell--role" role="cell">
              <span className="users-table__roles">{formatRoles(user.roles)}</span>
            </span>
            <span className="users-table__cell users-table__cell--status" role="cell">
              <UserStatusChip status={user.status} />
            </span>
            <span className="users-table__cell users-table__cell--access" role="cell">
              {user.lastAccess}
            </span>
            <span className="users-table__cell users-table__cell--controls" role="cell">
              <ButtonCompact aria-label={`Edit ${user.name}`}>
                <EditIcon />
              </ButtonCompact>
            </span>
          </div>
        );
      })}
    </div>
  );
}
