'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Play, Check, ArrowRight, Activity, Zap, Sparkles } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export function LearningEngineSettings() {
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();
  const { reviewMode, reviewCount, masteryThreshold } = settings.learningEngine;
  const isLight = settings.appearance.theme === 'light';
  const [schedulerTab, setSchedulerTab] = useState<'today' | 'tomorrow'>('today');

  const algorithms = [
    { id: 'spaced', title: 'Spaced Repetition', desc: 'Optimal spacing interval based on forgetting curves' },
    { id: 'recall', title: 'Active Recall', desc: 'Prioritizes flashcard-style concept reconstruction' },
    { id: 'difficulty', title: 'Memory Difficulty', desc: 'Dynamically scales problem challenge by topic rating' },
    { id: 'interval', title: 'Review Interval', desc: 'Fixed cadence review scheduling for daily discipline' },
    { id: 'forgetting', title: 'Forgetting Curve', desc: 'Ebbinghaus mathematical memory decay tracking' },
    { id: 'adaptive', title: 'Adaptive Learning', desc: 'AI-assisted calibration of problem recommendations' },
  ];

  const memoryMetrics = [
    { title: 'Mastery Score', value: `${masteryThreshold}`, status: 'Good', color: 'var(--primary)' },
    { title: 'Retention Rate', value: '95%', status: 'Excellent', color: '#10B981' },
    { title: 'Avg Recall Time', value: '2.4s', status: 'Fast', color: '#0284C7' },
    { title: 'Memory Stability', value: '68%', status: 'Good', color: '#F59E0B' },
    { title: 'Learning Velocity', value: '1.8x', status: 'High', color: '#10B981' },
    { title: 'Recall Accuracy', value: '89%', status: 'Excellent', color: 'var(--primary)' },
  ];

  const todaySchedulerItems = [
    { topic: 'Arrays & Hashing', count: `${Math.max(3, reviewCount)} Problems`, time: '25m' },
    { topic: 'Two Pointers & Sliding Window', count: '4 Problems', time: '20m' },
    { topic: 'Trees & Binary Search', count: '5 Problems', time: '25m' },
    { topic: 'Dynamic Programming', count: '3 Problems', time: '30m' },
  ];

  const tomorrowSchedulerItems = [
    { topic: 'Graphs & BFS/DFS', count: '6 Problems', time: '35m' },
    { topic: 'Backtracking', count: '3 Problems', time: '20m' },
    { topic: 'Trie & String Algorithms', count: '2 Problems', time: '15m' },
    { topic: 'Greedy & Intervals', count: '4 Problems', time: '25m' },
  ];

  const currentScheduler = schedulerTab === 'today' ? todaySchedulerItems : tomorrowSchedulerItems;

  const handleSelectAlgorithm = (id: string) => {
    updateSetting('learningEngine', 'reviewMode', id);
    const chosen = algorithms.find((a) => a.id === id);
    toast(`Learning strategy set to ${chosen?.title || id}`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── 1. LEARNING ENGINE HEADER ───────────────────────────────── */}
      <SettingsHeader
        icon={<Brain size={18} />}
        title="Learning Preferences"
        subtitle="Configure how Journey adapts to the way you learn."
      />

      {/* ── 2. TOP SECTION: LEARNING STRATEGY & MEMORY ENGINE ──────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 320px) minmax(0, 1fr)',
          gap: '20px',
          alignItems: 'stretch',
        }}
      >
        {/* Left: Learning Strategy Selector */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Learning Strategy
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {algorithms.map((alg) => {
              const isSelected = reviewMode === alg.id;

              return (
                <button
                  key={alg.id}
                  type="button"
                  onClick={() => handleSelectAlgorithm(alg.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: isSelected
                      ? isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.15)'
                      : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected
                      ? isLight ? '1.5px solid #0284C7' : '1px solid var(--primary)'
                      : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '12px', color: isSelected ? 'var(--primary)' : 'var(--text-primary)', fontWeight: isSelected ? 800 : 600 }}>
                      {alg.title}
                    </strong>
                    {isSelected && <Check size={12} style={{ color: 'var(--primary)' }} strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    {alg.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Memory Engine Analytics Panel */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Memory Engine Telemetry
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
            }}
          >
            {memoryMetrics.map((m) => (
              <div
                key={m.title}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{m.title}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>{m.value}</span>
                  <span style={{ fontSize: '10px', color: m.color, fontWeight: 800 }}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '10px',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.02)',
              border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.06)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
            }}
          >
            <span>Algorithm Mode: <strong style={{ color: 'var(--text-primary)' }}>{reviewMode}</strong></span>
            <span>Mastery Threshold: <strong style={{ color: 'var(--text-primary)' }}>{masteryThreshold}%</strong></span>
          </div>
        </div>
      </div>

      {/* ── 3. ROW: TODAY'S LEARNING & MEMORY HEALTH ───────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Today's Learning Action Card */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Today's Learning
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Reviews Due: <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{Math.max(6, reviewCount * 2)}</strong></span>
              <span>Estimated Time: <strong style={{ color: 'var(--text-primary)', fontSize: '14px' }}>45 min</strong></span>
            </div>
          </div>

          <Link
            href="/revision"
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              background: 'var(--primary)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px var(--accent-glow)',
              transition: 'all 0.15s ease',
            }}
          >
            <Play size={13} fill="#FFF" /> Start Review Queue
          </Link>
        </div>

        {/* Memory Health Section */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Circular Gauge */}
          <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="26" stroke={isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)'} strokeWidth="5" fill="none" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#10B981"
                strokeWidth="5"
                fill="none"
                strokeDasharray="163"
                strokeDashoffset="28"
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
              />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, color: 'var(--text-primary)' }}>
              74%
            </span>
          </div>

          <div>
            <strong style={{ fontSize: '14px', fontWeight: 800, color: '#10B981', display: 'block' }}>
              74% Memory Health
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
              Active Engine: <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{reviewMode}</strong>
            </span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
              Retention decay pacing within nominal boundaries.
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. ROW: REVIEW QUEUE & LEARNING FORECAST ───────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Review Queue Summary */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Review Queue Status
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Due Today</span>
              <strong style={{ color: 'var(--primary)' }}>{reviewCount} Problems</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Due Soon (24–48h)</span>
              <strong style={{ color: '#F59E0B' }}>5 Problems</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Upcoming Queue</span>
              <strong style={{ color: '#10B981' }}>56 Problems</strong>
            </div>
          </div>
        </div>

        {/* Learning Forecast Panel */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Learning Forecast
          </span>

          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.08)',
              border: isLight ? '1px solid rgba(2, 132, 199, 0.2)' : '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Zap size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                Cognitive Mastery Pacing
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Mode: <strong style={{ color: 'var(--text-primary)' }}>{reviewMode}</strong> • Calibration Threshold: <strong style={{ color: 'var(--text-primary)' }}>{masteryThreshold}%</strong>
              </span>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Next algorithmic mastery milestone forecasted within <strong>3 days</strong> of consistent reviews.
          </div>
        </div>
      </div>

      {/* ── 5. REVIEW SCHEDULER ────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Review Scheduler
            </h4>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Upcoming pattern review sessions generated by spaced intervals
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '4px',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
              padding: '3px',
              borderRadius: '8px',
              border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              type="button"
              onClick={() => setSchedulerTab('today')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: schedulerTab === 'today' ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: schedulerTab === 'today' ? '#FFF' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setSchedulerTab('tomorrow')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: schedulerTab === 'tomorrow' ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: schedulerTab === 'tomorrow' ? '#FFF' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {currentScheduler.map((item) => (
            <div
              key={item.topic}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '12px',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.topic}</span>
              <div style={{ display: 'flex', gap: '10px', color: 'var(--text-secondary)' }}>
                <span>{item.count}</span>
                <strong style={{ color: 'var(--primary)' }}>{item.time}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. LEARNING ANALYTICS OVERVIEW ─────────────────────────── */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Learning Analytics Overview
        </span>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Retention Graph</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#10B981', display: 'block', marginTop: '4px' }}>95% Steady</span>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Learning Curve</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', display: 'block', marginTop: '4px' }}>+18% Velocity</span>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Mastery Distribution</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#0284C7', display: 'block', marginTop: '4px' }}>{masteryThreshold}% Avg</span>
          </div>

          <div style={{ padding: '12px 14px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Review Calendar</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#F59E0B', display: 'block', marginTop: '4px', letterSpacing: '0.1em' }}>S M T W T F S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
