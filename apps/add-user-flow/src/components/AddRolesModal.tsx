import { useMemo, useState } from 'react';
import { Button, Modal, OptionCheckbox } from 'orbit-ds-components';

import { allRoles } from '../data/usersData';
import { CloseIcon, SearchIcon } from './icons';
import './AddRolesModal.css';

const VISIBLE_CHIP_LIMIT = 6;

export interface AddRolesModalProps {
  open: boolean;
  onClose: () => void;
  selectedRoles: string[];
  onSelectedRolesChange: (roles: string[]) => void;
  onConfirm: () => void;
  mode: 'add-user' | 'add-roles';
}

export function AddRolesModal({
  open,
  onClose,
  selectedRoles,
  onSelectedRolesChange,
  onConfirm,
  mode,
}: AddRolesModalProps) {
  const [search, setSearch] = useState('');
  const [expandedChips, setExpandedChips] = useState(false);

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [...allRoles];
    return allRoles.filter((role) => role.toLowerCase().includes(query));
  }, [search]);

  const allFilteredSelected =
    filteredRoles.length > 0 &&
    filteredRoles.every((role) => selectedRoles.includes(role));
  const someFilteredSelected =
    filteredRoles.some((role) => selectedRoles.includes(role)) && !allFilteredSelected;

  const hasSelection = selectedRoles.length > 0;
  const hiddenChipCount = expandedChips ? 0 : Math.max(0, selectedRoles.length - VISIBLE_CHIP_LIMIT);
  const visibleChips = expandedChips
    ? selectedRoles
    : selectedRoles.slice(0, VISIBLE_CHIP_LIMIT);

  const toggleRole = (role: string) => {
    onSelectedRolesChange(
      selectedRoles.includes(role)
        ? selectedRoles.filter((item) => item !== role)
        : [...selectedRoles, role],
    );
  };

  const toggleAllRoles = () => {
    if (allFilteredSelected) {
      onSelectedRolesChange(
        selectedRoles.filter((role) => !filteredRoles.includes(role as (typeof allRoles)[number])),
      );
      return;
    }

    const merged = new Set([...selectedRoles, ...filteredRoles]);
    onSelectedRolesChange([...merged]);
  };

  const removeRole = (role: string) => {
    onSelectedRolesChange(selectedRoles.filter((item) => item !== role));
  };

  const handleClose = () => {
    setSearch('');
    setExpandedChips(false);
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    setSearch('');
    setExpandedChips(false);
  };

  const primaryLabel = hasSelection ? 'Add' : 'Save';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add roles"
      className="add-roles-modal"
      footer={
        <div className="add-roles-modal__footer">
          <Button variant="secondary" minWidth={false} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            minWidth={false}
            disabled={!hasSelection}
            onClick={handleConfirm}
          >
            {primaryLabel}
          </Button>
        </div>
      }
    >
      {mode === 'add-user' ? (
        <p className="add-roles-modal__intro">
          Assign roles to the new user. Select one or more roles below, then click Add to finish
          creating the user.
        </p>
      ) : null}

      <div className="add-roles-modal__search">
        <SearchIcon className="add-roles-modal__search-icon" aria-hidden />
        <input
          type="search"
          className="add-roles-modal__search-input"
          placeholder="Search role"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search role"
        />
      </div>

      {hasSelection ? (
        <div className="add-roles-modal__chips">
          {visibleChips.map((role) => (
            <span key={role} className="add-roles-modal__chip">
              <span className="add-roles-modal__chip-label">{role}</span>
              <button
                type="button"
                className="add-roles-modal__chip-remove"
                aria-label={`Remove ${role}`}
                onClick={() => removeRole(role)}
              >
                <CloseIcon />
              </button>
            </span>
          ))}
          {hiddenChipCount > 0 ? (
            <button
              type="button"
              className="add-roles-modal__see-more"
              onClick={() => setExpandedChips(true)}
            >
              ({String(hiddenChipCount).padStart(2, '0')}) See More
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="add-roles-modal__tree">
        <OptionCheckbox
          label="User roles"
          checked={allFilteredSelected}
          indeterminate={someFilteredSelected}
          onChange={toggleAllRoles}
        />

        <ul className="add-roles-modal__role-list">
          {filteredRoles.map((role) => (
            <li key={role} className="add-roles-modal__role-item">
              <OptionCheckbox
                label={role}
                checked={selectedRoles.includes(role)}
                onChange={() => toggleRole(role)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
