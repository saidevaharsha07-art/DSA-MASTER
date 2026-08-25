'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { PracticeScheduler, WeaknessAnalyzer, StrengthAnalyzer } from '@/src/intelligence';
import { JSONViewer } from '../components/JSONViewer';
import { MetricCard } from '../components/MetricCard';

export default function SchedulerPreviewPage() {
  const { profile, logAction } = useDev();
  const scheduler = new PracticeScheduler();

  const [horizon, setHorizon] = useState<'today' | 'tomorrow' | 'weekly' | 'custom'>('weekly');
  const [customDays, setCustomDays] = useState<number>(3);

  const mockAttempts = Array.from(profile.solvedProblemIds).map((id, index) => ({
    id: `att-${index}`,
    userId: profile.userId,
    problemId: id,
    platform: 'codechef' as const,
    status: 'accepted' as const,
    timestamp: new Date().toISOString(),
    durationSeconds: 600,
    xpEarned: 20,
    hintsUsed: 0,
    topic: 'Arrays',
  }));

  const weakness = WeaknessAnalyzer.analyze(mockAttempts, profile);
  const strength = StrengthAnalyzer.analyze(mockAttempts, profile);

  let planData: any = null;
  if (horizon === 'today') {
    planData = scheduler.generateTodayPlan(profile, weakness, strength);
  } else if (horizon === 'tomorrow') {
    planData = scheduler.generateTomorrowPlan(profile, weakness, strength);
  } else if (horizon === 'weekly') {
    planData = scheduler.generateWeeklyPlan(profile, weakness, strength);
  } else {
    planData = scheduler.generateCustomHorizonPlan(profile, weakness, strength, customDays);
  }

  const handleGenerate = () => {
    logAction(`Generated Practice Plan (Horizon: ${horizon})`, 'Practice Scheduler', 4);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>📅</span> Practice Scheduler Preview
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Preview multi-horizon practice schedules (Today, Tomorrow, 7-Day Weekly, and Custom N-day horizons).
        </p>
      </div>

      {/* Horizon Controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-200">Planning Horizon:</span>
          {(['today', 'tomorrow', 'weekly', 'custom'] as const).map((h) => (
            <button
              key={h}
              onClick={() => {
                setHorizon(h);
                handleGenerate();
              }}
              className={`text-xs px-3 py-1.5 rounded border transition-colors capitalize ${
                horizon === h
                  ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        {horizon === 'custom' && (
          <div className="flex items-center gap-2 text-xs">
            <label className="text-slate-400">Days:</label>
            <input
              type="number"
              min={1}
              max={14}
              value={customDays}
              onChange={(e) => setCustomDays(Number(e.target.value))}
              className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 font-mono text-center"
            />
          </div>
        )}
      </div>

      {/* Metrics Header */}
      {horizon === 'weekly' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard title="Active Schedule Days" value={`${planData.dailyPlans.length} Days`} subtext="7-day practice schedule" icon="📅" />
          <MetricCard title="Total Weekly Time" value={`${planData.totalWeeklyMinutes} mins`} subtext="Est practice duration" icon="⏱️" />
          <MetricCard title="Weekly XP Potential" value={`${planData.totalWeeklyXpPotential} XP`} subtext="Max XP available" icon="⭐" />
        </div>
      )}

      {/* Live Plan Model JSON Inspector */}
      <JSONViewer data={planData} title={`Practice Schedule Model Output (${horizon.toUpperCase()})`} defaultExpanded={true} />
    </div>
  );
}
