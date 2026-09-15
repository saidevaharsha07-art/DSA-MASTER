'use client';

import React from 'react';
import { BookOpen, RotateCcw, Clock, AlertTriangle, CheckCircle2, Brain, Activity } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';

export function RevisionSettings() {
  const { settings, updateSetting } = useSettings();
  const { revisionPerDay, memoryStrength } = settings.revision;
  const isLight = settings.appearance.theme === 'light';

  const weakConcepts = [
    { name: 'Dynamic Programming', mastery: '35%', risk: 'High', color: '#EF4444', last: '3 days ago' },
    { name: 'Graph Algorithms', mastery: '42%', risk: 'High', color: '#EF4444', last: '5 days ago' },
    { name: 'Advanced Trees', mastery: '58%', risk: 'Medium', color: '#F59E0B', last: '2 days ago' },
    { name: 'Segment Trees', mastery: '62%', risk: 'Medium', color: '#F59E0B', last: '7 days ago' },
    { name: 'Sliding Window', mastery: '68%', risk: 'Medium', color: '#F59E0B', last: '1 day ago' },
  ];

  const revisionQueue = [
    { problem: 'LRU Cache', topic: 'Design & Hashing', reviewTime: 'Today, 10:00 AM', estTime: '20m', xp: '30 XP' },
    { problem: 'Coin Change', topic: 'Dynamic Programming', reviewTime: 'Today, 11:00 AM', estTime: '15m', xp: '20 XP' },
    { problem: 'Course Schedule', topic: 'Graphs (Topological)', reviewTime: 'Today, 2:00 PM', estTime: '15m', xp: '20 XP' },
    { problem: 'Longest Increasing Subsequence', topic: 'DP & Binary Search', reviewTime: 'Tomorrow, 9:00 AM', estTime: '20m', xp: '25 XP' },
  ];

  const summaryTileSt: React.CSSProperties = {
    padding: '18px',
    borderRadius: '16px',
    background: 'var(--card)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    boxShadow: 'var(--card-shadow)',
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<BookOpen size={18} />}
        title="Revision Center"
        subtitle="Manage reviews and strengthen weak concepts."
      />

      {/* ── 1. TOP SUMMARY CARDS ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={summaryTileSt}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Due Today</span>
          <strong style={{ fontSize: '22px', fontWeight: 900, color: '#0284C7' }}>{revisionPerDay * 2}</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Scheduled Reviews</span>
        </div>

        <div style={summaryTileSt}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Overdue</span>
          <strong style={{ fontSize: '22px', fontWeight: 900, color: '#EF4444' }}>3</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Requires Attention</span>
        </div>

        <div style={summaryTileSt}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Upcoming (48h)</span>
          <strong style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary)' }}>18</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>In Spaced Queue</span>
        </div>

        <div style={summaryTileSt}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Completed</span>
          <strong style={{ fontSize: '22px', fontWeight: 900, color: '#10B981' }}>42</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mastered Problems</span>
        </div>
      </div>

      {/* ── 2. WEAK CONCEPTS & MEMORY HEALTH ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {/* Weak Concepts Card */}
        <div
          style={{
            padding: '22px',
            borderRadius: '18px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              At-Risk &amp; Weak Concepts
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Patterns showing high decay rate or low recall confidence.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {weakConcepts.map((c) => (
              <div
                key={c.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                }}
              >
                <div>
                  <strong style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'block' }}>{c.name}</strong>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Last review: {c.last}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)' }}>{c.mastery}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: c.color,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: `${c.color}18`,
                    }}
                  >
                    {c.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Health Card */}
        <div
          style={{
            padding: '22px',
            borderRadius: '18px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Memory Health &amp; SRS Parameters
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Cognitive decay thresholds and daily repetition cadence.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>REVIEWS PER DAY</span>
                <strong style={{ color: 'var(--primary)' }}>{revisionPerDay} Problems</strong>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={revisionPerDay}
                onChange={(e) => updateSetting('revision', 'revisionPerDay', Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>MEMORY STABILITY THRESHOLD</span>
                <strong style={{ color: '#10B981' }}>{memoryStrength}</strong>
              </div>
              <select
                value={memoryStrength}
                onChange={(e) => updateSetting('revision', 'memoryStrength', e.target.value as any)}
                style={selectStyle}
              >
                <option value="Standard">Standard (Forgetting Curve: 3d / 7d / 14d)</option>
                <option value="Aggressive">Aggressive (Active Recall: 1d / 3d / 7d)</option>
                <option value="Relaxed">Relaxed (Spaced: 5d / 14d / 30d)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. REVISION QUEUE ──────────────────────────────────────── */}
      <div
        style={{
          padding: '22px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Active Revision Queue
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Questions prioritized by spaced repetition intervals.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {revisionQueue.map((item) => (
            <div
              key={item.problem}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{item.problem}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.topic} • {item.reviewTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.estTime}</span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#F59E0B' }}>+{item.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
