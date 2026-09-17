'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { progressService } from '@/src/services/progress/progress.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { CanonicalActivityRecord } from '@/src/intelligence/models/canonical-activity';
import { useSettings } from '@/src/context/SettingsContext';

export type PlatformKey = 'leetcode' | 'codeforces' | 'codechef' | 'geeksforgeeks';

export const PLATFORM_CONFIG: Record<PlatformKey, { label: string; color: string }> = {
  leetcode: { label: 'LEETCODE', color: '#10B981' },
  codeforces: { label: 'CODEFORCES', color: '#F59E0B' },
  codechef: { label: 'CODECHEF', color: '#F97316' },
  geeksforgeeks: { label: 'GEEKSFORGEEKS', color: '#A855F7' },
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function resolvePlatform(record: CanonicalActivityRecord): PlatformKey {
  const p = (record.platform || '').toLowerCase();
  const pid = (record.problemId || '').toLowerCase();

  if (p.includes('codeforces') || pid.startsWith('cf:')) return 'codeforces';
  if (p.includes('codechef') || pid.startsWith('codechef') || pid === 'flow016' || pid.includes('500-1000')) return 'codechef';
  if (p.includes('gfg') || p.includes('geeksforgeeks') || pid.startsWith('gfg:')) return 'geeksforgeeks';
  return 'leetcode';
}

export interface DayCellData {
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: CanonicalActivityRecord[];
  totalCount: number;
  activePlatforms: PlatformKey[];
  platformCounts: Record<PlatformKey, number>;
}

export function JourneyCalendarHeatmap() {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const { userId } = useActiveUser();
  const today = useMemo(() => new Date(), []);
  const todayStr = useMemo(() => today.toISOString().split('T')[0], [today]);

  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedCellDateStr, setSelectedCellDateStr] = useState<string>(todayStr);
  const [activityVersion, setActivityVersion] = useState<number>(0);
  const [hoveredCell, setHoveredCell] = useState<DayCellData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subscribe to EventBus updates to refresh heatmap in real-time
  useEffect(() => {
    const handleUpdate = () => {
      setActivityVersion((v) => v + 1);
    };

    const unsub1 = EventBus.subscribe('ProblemSolved', handleUpdate);
    const unsub2 = EventBus.subscribe('ProblemOpened', handleUpdate);
    const unsub3 = EventBus.subscribe('AttemptStarted', handleUpdate);
    const unsub4 = EventBus.subscribe('CodeRun', handleUpdate);
    const unsub5 = EventBus.subscribe('ProblemFailed', handleUpdate);
    const unsub6 = EventBus.subscribe('MemoryReviewed', handleUpdate);
    const unsub7 = EventBus.subscribe('ContestCompleted', handleUpdate);

    return () => {
      unsub1(); unsub2(); unsub3(); unsub4();
      unsub5(); unsub6(); unsub7();
    };
  }, []);

  // Fetch canonical activity logs for active user
  const userActivities = useMemo(() => {
    return activityStoreService.getActivityLog(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, activityVersion]);

  // Fetch canonical user streak
  const userStreak = useMemo(() => {
    const state = progressService.getState(userId);
    return state?.currentStreak || 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, activityVersion]);

  // Group activities by date string YYYY-MM-DD
  const activityMap = useMemo(() => {
    const map = new Map<string, CanonicalActivityRecord[]>();
    for (const record of userActivities) {
      if (!record.timestamp) continue;
      const dateKey = new Date(record.timestamp).toISOString().split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(record);
    }
    return map;
  }, [userActivities]);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const handlePrevMonth = useCallback(() => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setSelectedDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const monthLabel = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedDate]);

  // Generate 42 calendar grid cells (Monday-aligned)
  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells: DayCellData[] = [];

    // Leading days from previous month
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevDate = new Date(year, month - 1, d);
      const dateStr = prevDate.toISOString().split('T')[0];
      const acts = activityMap.get(dateStr) || [];
      const platformCounts: Record<PlatformKey, number> = { leetcode: 0, codeforces: 0, codechef: 0, geeksforgeeks: 0 };
      const platformSet = new Set<PlatformKey>();

      for (const a of acts) {
        const pKey = resolvePlatform(a);
        platformCounts[pKey] = (platformCounts[pKey] || 0) + 1;
        platformSet.add(pKey);
      }

      cells.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        activities: acts,
        totalCount: acts.length,
        activePlatforms: Array.from(platformSet),
        platformCounts,
      });
    }

    // Days in current month
    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      const curDate = new Date(year, month, d);
      const dateStr = curDate.toISOString().split('T')[0];
      const acts = activityMap.get(dateStr) || [];
      const platformCounts: Record<PlatformKey, number> = { leetcode: 0, codeforces: 0, codechef: 0, geeksforgeeks: 0 };
      const platformSet = new Set<PlatformKey>();

      for (const a of acts) {
        const pKey = resolvePlatform(a);
        platformCounts[pKey] = (platformCounts[pKey] || 0) + 1;
        platformSet.add(pKey);
      }

      cells.push({
        dateStr,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: dateStr === todayStr,
        activities: acts,
        totalCount: acts.length,
        activePlatforms: Array.from(platformSet),
        platformCounts,
      });
    }

    // Trailing days to fill 42 slots (6 full weeks)
    let nextMonthDay = 1;
    while (cells.length < 42) {
      const nextDate = new Date(year, month + 1, nextMonthDay);
      const dateStr = nextDate.toISOString().split('T')[0];
      const acts = activityMap.get(dateStr) || [];
      const platformCounts: Record<PlatformKey, number> = { leetcode: 0, codeforces: 0, codechef: 0, geeksforgeeks: 0 };
      const platformSet = new Set<PlatformKey>();

      for (const a of acts) {
        const pKey = resolvePlatform(a);
        platformCounts[pKey] = (platformCounts[pKey] || 0) + 1;
        platformSet.add(pKey);
      }

      cells.push({
        dateStr,
        dayNumber: nextMonthDay,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        activities: acts,
        totalCount: acts.length,
        activePlatforms: Array.from(platformSet),
        platformCounts,
      });
      nextMonthDay++;
    }

    return cells;
  }, [year, month, activityMap, todayStr]);

  const monthTotalActivities = useMemo(() => {
    return calendarCells
      .filter((c) => c.isCurrentMonth)
      .reduce((sum, c) => sum + c.totalCount, 0);
  }, [calendarCells]);

  const selectedCellData = useMemo(() => {
    const found = calendarCells.find((c) => c.dateStr === selectedCellDateStr);
    if (found) return found;

    const acts = activityMap.get(selectedCellDateStr) || [];
    const platformCounts: Record<PlatformKey, number> = { leetcode: 0, codeforces: 0, codechef: 0, geeksforgeeks: 0 };
    const platformSet = new Set<PlatformKey>();

    for (const a of acts) {
      const pKey = resolvePlatform(a);
      platformCounts[pKey] = (platformCounts[pKey] || 0) + 1;
      platformSet.add(pKey);
    }

    return {
      dateStr: selectedCellDateStr,
      dayNumber: new Date(selectedCellDateStr).getDate() || 1,
      isCurrentMonth: true,
      isToday: selectedCellDateStr === todayStr,
      activities: acts,
      totalCount: acts.length,
      activePlatforms: Array.from(platformSet),
      platformCounts,
    };
  }, [calendarCells, selectedCellDateStr, activityMap, todayStr]);

  const selectedDateFormatted = useMemo(() => {
    try {
      const d = new Date(selectedCellDateStr + 'T00:00:00');
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return selectedCellDateStr;
    }
  }, [selectedCellDateStr]);

  const selectedTotalActivity = useMemo(() => {
    const p = selectedCellData.platformCounts;
    return p.leetcode + p.codeforces + p.codechef + p.geeksforgeeks;
  }, [selectedCellData]);

  // Compute intensity styling based on real activity count
  const getCellIntensityStyle = (count: number, isCurrentMonth: boolean): React.CSSProperties => {
    if (!isCurrentMonth) {
      return {
        background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.015)',
        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.03)',
        opacity: isLight ? 0.6 : 0.35,
      };
    }

    if (count === 0) {
      return {
        background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.025)',
        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
      };
    } else if (count <= 2) {
      return {
        background: 'rgba(16, 185, 129, 0.15)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
      };
    } else if (count <= 5) {
      return {
        background: 'rgba(16, 185, 129, 0.3)',
        border: '1px solid rgba(16, 185, 129, 0.5)',
      };
    } else if (count <= 9) {
      return {
        background: 'rgba(16, 185, 129, 0.5)',
        border: '1px solid rgba(16, 185, 129, 0.7)',
      };
    } else {
      return {
        background: 'rgba(16, 185, 129, 0.75)',
        border: '1px solid rgba(16, 185, 129, 0.9)',
      };
    }
  };

  if (!mounted) {
    return (
      <div
        style={{
          padding: '24px',
          borderRadius: 'var(--radius, 16px)',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: 'var(--text-secondary)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--primary)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading learning journey heatmap...</span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: 'var(--radius, 16px)',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* ── 1. HEADER ROW ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Journey Heatmap
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Your daily learning activity at a glance
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Active Streak Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#F59E0B',
            }}
          >
            <Flame size={15} style={{ color: '#F59E0B' }} />
            <span>{userStreak} Day Active Streak 🔥</span>
          </div>

          {/* Month Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
              padding: '4px 8px',
              borderRadius: '10px',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              onClick={handlePrevMonth}
              title="Previous Month"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', minWidth: '100px', textAlign: 'center' }}>
              {monthLabel}
            </span>

            <button
              onClick={handleNextMonth}
              title="Next Month"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. MONTHLY CALENDAR GRID ─────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {/* Weekday Header Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
          {WEEKDAYS.map((day) => (
            <div key={day} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', padding: '4px 0' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Day Cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {calendarCells.map((cell, idx) => {
            const intensityStyle = getCellIntensityStyle(cell.totalCount, cell.isCurrentMonth);
            const isToday = cell.isToday;
            const isSelected = cell.dateStr === selectedCellDateStr;

            return (
              <div
                key={`${cell.dateStr}-${idx}`}
                onClick={() => setSelectedCellDateStr(cell.dateStr)}
                onMouseEnter={() => setHoveredCell(cell)}
                onMouseLeave={() => setHoveredCell(null)}
                style={{
                  position: 'relative',
                  minHeight: '54px',
                  borderRadius: '10px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  ...intensityStyle,
                  ...(isSelected
                    ? {
                        border: '2px solid var(--primary, #0284C7)',
                        boxShadow: '0 0 14px rgba(2, 132, 199, 0.45)',
                      }
                    : isToday
                    ? {
                        border: '1.5px solid #10B981',
                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.35)',
                      }
                    : {}),
                }}
              >
                {/* Day Number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: cell.isCurrentMonth ? 700 : 400,
                      color: cell.isCurrentMonth ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                  >
                    {cell.dayNumber}
                  </span>

                  {isToday && (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Today
                    </span>
                  )}
                </div>

                {/* Daily Platform Dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', minHeight: '8px', marginTop: '4px' }}>
                  {cell.activePlatforms.map((platformKey) => {
                    const config = PLATFORM_CONFIG[platformKey];
                    if (!config) return null;
                    return (
                      <span
                        key={platformKey}
                        title={`${config.label}: ${cell.platformCounts[platformKey]} activity`}
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: config.color,
                          boxShadow: `0 0 6px ${config.color}`,
                          display: 'inline-block',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. HIGHLIGHTED SELECTED-DAY ACTIVITY SUMMARY PANEL ───── */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          background: isLight ? '#F8FAFC' : 'var(--card)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid var(--accent-border)',
          boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : '0 4px 20px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Date: <span style={{ color: 'var(--accent-primary)' }}>{selectedDateFormatted}</span>
          </div>

          <div
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'var(--accent-soft)',
              border: '1px solid var(--accent-border)',
              fontSize: '12px',
              fontWeight: 800,
              color: 'var(--accent-text)',
            }}
          >
            Total Activity: {selectedTotalActivity}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {(Object.keys(PLATFORM_CONFIG) as PlatformKey[]).map((key) => {
            const config = PLATFORM_CONFIG[key];
            const count = selectedCellData.platformCounts[key] || 0;
            return (
              <div
                key={key}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: config.color,
                      boxShadow: `0 0 6px ${config.color}`,
                    }}
                  />
                  <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '11px' }}>{config.label}</span>
                </div>
                <strong style={{ color: 'var(--text-primary)', fontSize: '13px' }}>{count}</strong>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. EMPTY MONTH MESSAGE (IF NO ACTIVITY IN SELECTED MONTH) ── */}
      {monthTotalActivities === 0 && (
        <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', padding: '6px 0' }}>
          No learning activity recorded for this month.
        </div>
      )}

      {/* ── 6. CENTERED LEGEND & INTENSITY BAR ───────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          paddingTop: '8px',
          borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Centered Platform Legend (4 Platforms) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
          {(Object.keys(PLATFORM_CONFIG) as PlatformKey[]).map((key) => {
            const item = PLATFORM_CONFIG[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    boxShadow: `0 0 6px ${item.color}`,
                  }}
                />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Activity Intensity Scale */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>Less Activity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.1)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.2)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.4)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.65)' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(16, 185, 129, 0.9)' }} />
          </div>
          <span>More Activity</span>
        </div>
      </div>
    </div>
  );
}
