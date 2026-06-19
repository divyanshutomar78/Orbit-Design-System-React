import { useEffect, useMemo, useRef, useState } from 'react';
import { ActionMenu, IconFrame, TitlesAndTabs } from 'orbit-ds-components';

import {
  actionMenuItems,
  initialUsers,
  type UserRecord,
} from '../data/usersData';
import { AddRolesModal } from './AddRolesModal';
import { MenuIcon, SearchIcon } from './icons';
import { UsersPagination } from './UsersPagination';
import { UsersTable } from './UsersTable';
import './UsersPage.css';

type FlowMode = 'add-user' | 'add-roles' | null;

export function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(['1']));
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [flowMode, setFlowMode] = useState<FlowMode>(null);
  const [pendingRoles, setPendingRoles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('25');

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.max(1, Math.ceil(users.length / Number(itemsPerPage)));

  const visibleUsers = useMemo(() => {
    const size = Number(itemsPerPage);
    const start = (page - 1) * size;
    return users.slice(start, start + size);
  }, [itemsPerPage, page, users]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuOpen) return;
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [menuOpen]);

  const toggleRow = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAllVisible = () => {
    const allVisibleSelected = visibleUsers.every((user) => selectedIds.has(user.id));
    setSelectedIds((current) => {
      const next = new Set(current);
      visibleUsers.forEach((user) => {
        if (allVisibleSelected) {
          next.delete(user.id);
        } else {
          next.add(user.id);
        }
      });
      return next;
    });
  };

  const openFlow = (mode: FlowMode) => {
    setFlowMode(mode);
    setPendingRoles([]);
    setModalOpen(true);
    setMenuOpen(false);
  };

  const handleMenuSelect = (itemId: string) => {
    if (itemId === 'add-user') {
      openFlow('add-user');
      return;
    }

    if (itemId === 'add-roles') {
      openFlow('add-roles');
      return;
    }

    setMenuOpen(false);
  };

  const handleConfirmRoles = () => {
    if (flowMode === 'add-user') {
      const nextIndex = users.length + 1;
      const newUser: UserRecord = {
        id: String(nextIndex),
        name: 'New User',
        email: `new.user${nextIndex}@example.com`,
        roles: pendingRoles,
        status: 'active',
        lastAccess: new Date().toISOString().slice(0, 16).replace('T', ' '),
      };

      setUsers((current) => [newUser, ...current]);
      setSelectedIds(new Set([newUser.id]));
      setPage(1);
    }

    if (flowMode === 'add-roles') {
      setUsers((current) =>
        current.map((user) =>
          selectedIds.has(user.id)
            ? {
                ...user,
                roles: [...new Set([...user.roles, ...pendingRoles])],
              }
            : user,
        ),
      );
    }

    setModalOpen(false);
    setFlowMode(null);
    setPendingRoles([]);
  };

  return (
    <div className="users-page">
      <section className="users-panel">
        <header className="users-panel__header">
          <TitlesAndTabs
            title="Users"
            showLeftIcon={false}
            showTabs={false}
            showExtraSlot={false}
            showRightIcons={false}
          />
          <div className="users-panel__header-actions">
            <button type="button" className="users-panel__icon-btn" aria-label="Search users">
              <IconFrame size="big">
                <SearchIcon />
              </IconFrame>
            </button>
            <div className="users-panel__menu-wrap">
              <button
                ref={menuButtonRef}
                type="button"
                className="users-panel__icon-btn"
                aria-label="Open actions menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <IconFrame size="big">
                  <MenuIcon />
                </IconFrame>
              </button>

              {menuOpen ? (
                <div ref={menuRef} className="users-panel__menu">
                  <ActionMenu
                    items={actionMenuItems.map((item) => ({
                      id: item.id,
                      label: item.label,
                    }))}
                    onItemSelect={handleMenuSelect}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <UsersTable
          users={visibleUsers}
          selectedIds={selectedIds}
          onToggleRow={toggleRow}
          onToggleAll={toggleAllVisible}
        />

        <UsersPagination
          page={page}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setPage(1);
          }}
        />
      </section>

      <AddRolesModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFlowMode(null);
          setPendingRoles([]);
        }}
        selectedRoles={pendingRoles}
        onSelectedRolesChange={setPendingRoles}
        onConfirm={handleConfirmRoles}
        mode={flowMode === 'add-roles' ? 'add-roles' : 'add-user'}
      />
    </div>
  );
}
