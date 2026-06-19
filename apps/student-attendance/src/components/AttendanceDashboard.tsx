import { useMemo, useState } from 'react';
import { TitlesAndTabs } from 'orbit-ds-components';

import {
  classSummaries,
  dashboardTabs,
  getStats,
  students,
  todayLabel,
  type DashboardTab,
} from '../data/attendanceData';
import { AttendanceTable } from './AttendanceTable';
import { AttendanceToolbar } from './AttendanceToolbar';
import { ClassBreakdown, ClassBreakdownGrid } from './ClassBreakdown';
import { KpiCards } from './KpiCards';
import { ReportsPanel } from './ReportsPanel';
import { WeeklyTrend } from './WeeklyTrend';
import './AttendanceDashboard.css';

export function AttendanceDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [classFilter, setClassFilter] = useState('all');

  const filteredStudents = useMemo(
    () =>
      classFilter === 'all'
        ? students
        : students.filter((student) => student.classId === classFilter),
    [classFilter],
  );

  const stats = useMemo(() => getStats(filteredStudents), [filteredStudents]);

  const filteredClasses = useMemo(
    () =>
      classFilter === 'all'
        ? classSummaries
        : classSummaries.filter((item) => item.id === classFilter),
    [classFilter],
  );

  const tabItems = dashboardTabs.map((tab) => ({
    ...tab,
    selected: tab.id === activeTab,
  }));

  return (
    <div className="attendance-page">
      <header className="attendance-page__header">
        <TitlesAndTabs
          title="Student Attendance"
          showTitleIcon
          showLeftIcon={false}
          showTabs
          tabItems={tabItems}
          onTabSelect={(tabId) => setActiveTab(tabId as DashboardTab)}
          showRightIcons={false}
          showExtraSlot={false}
        />
      </header>

      <main className="attendance-page__content">
        <div className="attendance-page__intro">
          <div>
            <h1 className="attendance-page__heading">Attendance overview</h1>
            <p className="attendance-page__date">{todayLabel}</p>
          </div>
          <AttendanceToolbar
            classFilter={classFilter}
            onClassFilterChange={setClassFilter}
          />
        </div>

        <KpiCards
          total={stats.total}
          attending={stats.attending}
          late={stats.late}
          absent={stats.absent}
          rate={stats.rate}
        />

        {activeTab === 'overview' && (
          <div className="attendance-page__split">
            <AttendanceTable students={filteredStudents} />
            <div className="attendance-page__aside">
              <WeeklyTrend />
              <ClassBreakdown classes={classSummaries} />
            </div>
          </div>
        )}

        {activeTab === 'by-class' && <ClassBreakdownGrid classes={filteredClasses} />}

        {activeTab === 'reports' && <ReportsPanel />}
      </main>
    </div>
  );
}
