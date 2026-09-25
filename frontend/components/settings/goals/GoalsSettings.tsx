'use client';

import React from 'react';
import { Target, Award, Flame, Zap, Trophy, Shield, CheckCircle2, Star } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';
import { useRoadmap } from '@frontend/hooks/use-roadmap';

export function GoalsSettings() {
  const { settings, updateSetting } = useSettings();
  const { state: roadmapState } = useRoadmap();
  const { dailyTarget, weeklyTarget, monthlyTarget } = settings.goals;
  const isLight = settings.appearance.theme === 'light';
  const yearlyTarget = monthlyTarget * 12;

  const solvedCount = roadmapState?.completed?.length || 0;
  const currentXp = roadmapState?.xp || solvedCount * 50;

  const currentGoals = [
    { title: 'Daily Goal', current: Math.min(dailyTarget, solvedCount % (dailyTarget + 1)), total: dailyTarget, percent: `${Math.min(100, Math.round(((solvedCount % (dailyTarget + 1)) / dailyTarget) * 100))}%`, color: '#0284C7', key: 'dailyTarget' },
    { title: 'Weekly Goal', current: Math.min(weeklyTarget, solvedCount), total: weeklyTarget, percent: `${Math.min(100, Math.round((solvedCount / weeklyTarget) * 100))}%`, color: '#10B981', key: 'weeklyTarget' },
    { title: 'Monthly Goal', current: Math.min(monthlyTarget, solvedCount), total: monthlyTarget, percent: `${Math.min(100, Math.round((solvedCount / monthlyTarget) * 100))}%`, color: 'var(--primary)', key: 'monthlyTarget' },
    { title: 'Yearly Goal', current: Math.min(yearlyTarget, solvedCount), total: yearlyTarget, percent: `${Math.min(100, Math.round((solvedCount / yearlyTarget) * 100))}%`, color: '#F59E0B', key: 'yearlyTarget' },
  ];

  const milestones = [
    { title: 'Novice Solver', threshold: 10, status: solvedCount >= 10 ? 'Completed' : 'Current', icon: Shield, color: '#10B981' },
    { title: 'Apprentice Coder', threshold: 50, status: solvedCount >= 50 ? 'Completed' : solvedCount >= 10 ? 'Current' : 'Locked', icon: Zap, color: '#0284C7' },
    { title: 'Pattern Explorer', threshold: 150, status: solvedCount >= 150 ? 'Completed' : solvedCount >= 50 ? 'Current' : 'Locked', icon: Star, color: 'var(--primary)' },
    { title: 'Master Strategist', threshold: 300, status: solvedCount >= 300 ? 'Completed' : solvedCount >= 150 ? 'Current' : 'Locked', icon: Trophy, color: '#F59E0B' },
    { title: 'Grandmaster Legend', threshold: 500, status: solvedCount >= 500 ? 'Completed' : 'Locked', icon: Award, color: '#EC4899' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Target size={18} />}
        title="Goals & Targets"
        subtitle="Track goals and mastery milestones."
      />

      {/* ── 1. TOP 4 GOAL CARDS ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {currentGoals.map((g) => (
          <div
            key={g.title}
            style={{
              padding: '18px',
              borderRadius: '16px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>{g.title}</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: g.color }}>{g.percent}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>{g.current}</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ {g.total} Solves</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: g.percent, height: '100%', background: g.color, borderRadius: '3px' }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── 2. LEVEL & PROGRESS OVERVIEW ───────────────────────────── */}
      <div
        style={{
          padding: '22px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current Level &amp; XP Progression
          </span>
          <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>
            Level {Math.floor(currentXp / 500) + 1} — Algorithmic Explorer
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            Earn +50 XP per accepted problem. Reach { (Math.floor(currentXp / 500) + 1) * 500 } XP to unlock next rank.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>XP Progress</span>
            <strong style={{ color: '#10B981' }}>{currentXp} XP / {(Math.floor(currentXp / 500) + 1) * 500} XP</strong>
          </div>
          <div style={{ width: '100%', height: '6px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, Math.round(((currentXp % 500) / 500) * 100))}%`, height: '100%', background: '#10B981', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* ── 3. MILESTONES ROADMAP ──────────────────────────────────── */}
      <div
        style={{
          padding: '22px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Mastery Milestones
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Achieve milestone badges through sustained problem solving and mastery progression.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {milestones.map((m) => {
            const isCompleted = m.status === 'Completed';
            const isCurrent = m.status === 'Current';
            const Icon = m.icon;

            return (
              <div
                key={m.title}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: isCompleted
                    ? 'rgba(16, 185, 129, 0.06)'
                    : isCurrent
                    ? isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.1)'
                    : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: isCompleted
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : isCurrent
                    ? isLight ? '1px solid #0284C7' : '1px solid rgba(56, 189, 248, 0.35)'
                    : '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: isCompleted
                        ? 'rgba(16, 185, 129, 0.2)'
                        : isCurrent
                        ? isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.2)'
                        : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted ? '#10B981' : isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: isCompleted ? '#10B981' : isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isCompleted
                        ? 'rgba(16, 185, 129, 0.1)'
                        : isCurrent
                        ? isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.1)'
                        : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    {m.status}
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: isCompleted || isCurrent ? 'var(--text-primary)' : 'var(--text-muted)', display: 'block' }}>
                    {m.title}
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Target: {m.threshold} Solves
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
