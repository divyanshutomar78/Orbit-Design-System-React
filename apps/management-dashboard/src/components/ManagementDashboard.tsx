import { useState } from 'react';
import {
  AttentionChip,
  Button,
  CriticalChip,
  DefaultChip,
  EWasNavBar,
  TitlesAndTabs,
} from 'orbit-ds-components';

import {
  MESSAGES,
  PINNED_REPORTS,
  REPORT_ROWS,
  TASK_ROWS,
  type TaskLevel,
} from '../data/dashboardData';
import {
  CalendarIcon,
  ChatIcon,
  ChevronDownIcon,
  ClockIcon,
  CompassIcon,
  DocumentIcon,
  FolderIcon,
  GridIcon,
  HomeIcon,
  PinIcon,
  SearchIcon,
  SectionIcon,
  ShareIcon,
  UserAvatar,
} from './DashboardIcons';
import './ManagementDashboard.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'dashboard', label: 'Dashboard', icon: <GridIcon /> },
  { id: 'folder', label: 'Folder', icon: <FolderIcon /> },
  { id: 'share', label: 'Share', icon: <ShareIcon /> },
  { id: 'compass', label: 'Compass', icon: <CompassIcon /> },
  { id: 'documents', label: 'Documents', icon: <DocumentIcon /> },
];

function PanelHeader({
  title,
  iconColor,
}: {
  title: string;
  iconColor: 'blue' | 'orange' | 'pink';
}) {
  return (
    <div className="mgmt-panel__header-bar">
      <TitlesAndTabs
        title={title}
        showTitleIcon
        showLeftIcon
        leftIcon={<SectionIcon color={iconColor} />}
        showTabs={false}
        showRightIcons={false}
        showExtraSlot={false}
      />
    </div>
  );
}

function LevelBadge({ level }: { level: TaskLevel }) {
  if (level === 'high') {
    return (
      <CriticalChip type="chip" size="compact" showIcon={false}>
        High
      </CriticalChip>
    );
  }
  if (level === 'low') {
    return (
      <DefaultChip type="chip" size="compact" showIcon={false}>
        Low
      </DefaultChip>
    );
  }
  return (
    <AttentionChip type="chip" size="compact" showIcon={false}>
      Moderate
    </AttentionChip>
  );
}

export function ManagementDashboard() {
  const [activeNavId, setActiveNavId] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = REPORT_ROWS.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mgmt-dashboard">
      <aside className="mgmt-dashboard__nav">
        <EWasNavBar
          flight={false}
          orientation="vertical"
          branding={
            <span className="mgmt-brand-logo" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill="var(--text-action)" />
              </svg>
            </span>
          }
          primaryItems={NAV_ITEMS}
          utilityItems={[]}
          footerItem={{ id: 'version', label: 'V1.0', selectable: false }}
          activeItemId={activeNavId}
          onItemSelect={(id) => {
            if (id) setActiveNavId(id);
          }}
          allowDeselect={false}
        />
      </aside>

      <div className="mgmt-dashboard__main">
        <header className="mgmt-topbar">
          <div className="mgmt-topbar__left">
            <span className="mgmt-topbar__home">
              <HomeIcon />
              Home
            </span>
          </div>

          <div className="mgmt-topbar__right">
            <button type="button" className="mgmt-topbar__icon-btn" aria-label="Messages">
              <ChatIcon />
              <span className="mgmt-topbar__badge">2</span>
            </button>

            <span className="mgmt-topbar__datetime">
              <ClockIcon />
              <span>12:36PM</span>
              <span className="mgmt-topbar__date">28-08-2000</span>
            </span>

            <Button
              variant="primary"
              minWidth={false}
              rightIcon={<ChevronDownIcon />}
            >
              Management
            </Button>

            <button type="button" className="mgmt-topbar__profile" aria-label="User menu">
              <UserAvatar />
              <ChevronDownIcon />
            </button>
          </div>
        </header>

        <div className="mgmt-dashboard__content">
          <div className="mgmt-dashboard__top-row">
            <section className="mgmt-panel mgmt-panel--reports">
              <PanelHeader title="Create a report" iconColor="blue" />

              <div className="mgmt-panel__body">
              <div className="mgmt-pinned-row">
                {PINNED_REPORTS.map((report) => (
                  <article key={report.id} className="mgmt-pinned-card">
                    <div className="mgmt-pinned-card__top">
                      <span className="mgmt-pinned-card__org">{report.org}</span>
                      <PinIcon className="mgmt-pinned-card__pin" />
                    </div>
                    <p className="mgmt-pinned-card__heading">{report.heading}</p>
                  </article>
                ))}
              </div>

              <div className="mgmt-search">
                <SearchIcon className="mgmt-search__icon" />
                <input
                  type="search"
                  className="mgmt-search__input"
                  placeholder="Start typing a report name"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>

              <table className="mgmt-table mgmt-table--compact">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Version</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((row) => (
                    <tr key={row.id}>
                      <td>{row.name}</td>
                      <td>{row.version}</td>
                      <td>{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </section>

            <section className="mgmt-panel mgmt-panel--messages">
              <PanelHeader title="New Messages" iconColor="orange" />

              <div className="mgmt-panel__body">
              <ul className="mgmt-messages">
                {MESSAGES.map((message) => (
                  <li key={message.id} className="mgmt-message">
                    <span className="mgmt-message__avatar" aria-hidden>
                      AR
                    </span>
                    <div className="mgmt-message__body">
                      <div className="mgmt-message__meta">
                        <strong>{message.sender}</strong>
                        <span>
                          {message.time} {message.newCount} New
                        </span>
                      </div>
                      <p>{message.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
              </div>
            </section>
          </div>

          <section className="mgmt-panel mgmt-panel--tasks">
            <PanelHeader title="Task actions needed" iconColor="pink" />

            <div className="mgmt-panel__body">
            <table className="mgmt-table mgmt-table--tasks">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Reference</th>
                  <th>Opening Date</th>
                  <th>Deadline</th>
                  <th>Type</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {TASK_ROWS.map((row) => (
                  <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.reference}</td>
                    <td>
                      <span className="mgmt-table__date">
                        <CalendarIcon />
                        {row.openingDate}
                      </span>
                    </td>
                    <td>{row.deadline}</td>
                    <td>{row.type}</td>
                    <td>
                      <LevelBadge level={row.level} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
