'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { revisionEngine } from '@/src/engines/revision';

interface RevisionCalendarProps {
  onSelectDateFilter?: (dateIso: string | null) => void;
  selectedDateFilter?: string | null;
}

export function RevisionCalendar({ onSelectDateFilter, selectedDateFilter }: RevisionCalendarProps) {
  // Default to August 2026 where first revision schedule begins
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 1)); // August 2026

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = revisionEngine.getCalendarMatrix(year, monthIndex);
  const firstDayOffset = new Date(year, monthIndex, 1).getDay(); // 0 = Sun, 6 = Sat

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, monthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, monthIndex + 1, 1));
  };

  const handleTodayMonth = () => {
    setCurrentDate(new Date());
    onSelectDateFilter?.(null);
  };

  return (
    <div style={{ padding: '24px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
      
      {/* Calendar Header with Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
            <CalendarIcon size={18} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
              {monthNames[monthIndex]} {year}
            </h2>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>Dynamic Spaced Repetition Review Calendar</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {selectedDateFilter && (
            <button
              type="button"
              onClick={() => onSelectDateFilter?.(null)}
              style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Filter size={12} /> Reset Filter ({selectedDateFilter})
            </button>
          )}

          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button type="button" onClick={handlePrevMonth} style={{ padding: '6px 10px', background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', borderRadius: '6px' }}>
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={handleTodayMonth} style={{ padding: '6px 12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#C084FC', cursor: 'pointer', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
              Today
            </button>
            <button type="button" onClick={handleNextMonth} style={{ padding: '6px 10px', background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', borderRadius: '6px' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginBottom: '10px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>
            {day}
          </div>
        ))}
      </div>

      {/* Month Days Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {/* Padding cells for first day of week alignment */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`offset-${i}`} style={{ minHeight: '68px', opacity: 0.15 }} />
        ))}

        {calendarDays.map((dayData) => {
          const isSelected = selectedDateFilter === dayData.dateIso;

          return (
            <motion.div
              key={dayData.dateIso}
              whileHover={{ scale: 1.04, borderColor: '#A855F7' }}
              onClick={() => onSelectDateFilter?.(isSelected ? null : dayData.dateIso)}
              style={{
                padding: '12px',
                borderRadius: '14px',
                background: isSelected
                  ? 'rgba(168, 85, 247, 0.3)'
                  : dayData.isToday
                  ? 'rgba(168, 85, 247, 0.18)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: isSelected
                  ? '2px solid #C084FC'
                  : dayData.isToday
                  ? '2px solid #A855F7'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: isSelected || dayData.isToday ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
                minHeight: '68px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: dayData.isToday ? 900 : 600, color: dayData.isToday ? '#FFF' : '#CBD5E1' }}>
                  {dayData.dayNumber}
                </span>
                {dayData.isToday && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A855F7', boxShadow: '0 0 8px #A855F7' }} />
                )}
              </div>

              {/* Day Counts Badges - NO FAKE OVERDUE BADGES */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '6px' }}>
                {dayData.scheduledCount > 0 && (
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#C084FC', background: 'rgba(168, 85, 247, 0.2)', padding: '1px 5px', borderRadius: '4px' }}>
                    {dayData.scheduledCount} Scheduled
                  </span>
                )}
                {dayData.completedCount > 0 && (
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '1px 5px', borderRadius: '4px' }}>
                    ✓ {dayData.completedCount} Done
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
