'use client';

import React from 'react';
import Link from 'next/link';
import { useDev } from './dev-context';
import { MetricCard } from './components/MetricCard';
import { StatusBadge } from './components/StatusBadge';
import { Timeline } from './components/Timeline';
import { JSONViewer } from './components/JSONViewer';

export default function DevOverviewPage() {
  const { metrics, profile, contestHistory, timelineLogs, performanceStats, currentPreset, setPreset } = useDev();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Developer Tools Suite Overview</h1>
        <p className="text-xs text-slate-400 mt-1">
          Internal visualization and debugging dashboard for backend engines (Platform Engine, Intelligence Service, Adaptive Engine, Contest Engine).
        </p>
      </div>

      {/* Profile Preset Quick Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-200">Active Profile Preset:</span>
          <span className="ml-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">{currentPreset}</span>
        </div>
        <div className="flex items-center gap-2">
          {(['Beginner', 'Intermediate', 'Advanced', 'Empty'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`text-xs px-3 py-1 rounded border transition-colors ${
                currentPreset === p
                  ? 'bg-indigo-600 text-white border-indigo-500 font-medium'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Registered Platforms" value={4} subtext="CodeChef, Codeforces, LeetCode, MentorPick" icon="🔌" />
        <MetricCard title="Total Dataset Problems" value="2,166" subtext="1,371 CodeChef + 792 Codeforces + 3 LeetCode" icon="📚" />
        <MetricCard title="User Solved Problems" value={profile.solvedProblemIds.size} subtext={`XP: ${profile.totalXp} | Streak: ${profile.streakInfo.currentStreak}d`} icon="👤" />
        <MetricCard title="Contests Attended" value={contestHistory.length} subtext={`Cache Hit Ratio: ${performanceStats.cacheHitRatio}%`} icon="🏆" />
      </div>

      {/* Engine Status Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <span>⚙️</span> Engine Health & Status Monitor
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.name} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{m.name}</span>
                <StatusBadge status={m.status} />
              </div>
              <div className="mt-3 space-y-1 text-[11px] font-mono text-slate-400">
                <div>Version: <span className="text-slate-200">{m.version}</span></div>
                <div>Executions: <span className="text-slate-200">{m.totalExecutions}</span></div>
                <div>Avg Duration: <span className="text-emerald-400">{m.avgExecutionTimeMs}ms</span></div>
                <div>Last Refresh: <span className="text-slate-300">{m.lastRefresh}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/dev/platforms" className="bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 rounded-lg p-4 transition-all group">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-indigo-400">
            <span>🔌</span> Platform Inspector
          </div>
          <p className="text-xs text-slate-400 mt-1">Inspect registered loaders, dataset health scores, and cache stats.</p>
        </Link>
        <Link href="/dev/adaptive" className="bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 rounded-lg p-4 transition-all group">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-indigo-400">
            <span>⚡</span> Adaptive Practice
          </div>
          <p className="text-xs text-slate-400 mt-1">Test 7 strategies, session generator, constraint engine, & evaluator.</p>
        </Link>
        <Link href="/dev/contest" className="bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 rounded-lg p-4 transition-all group">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 group-hover:text-indigo-400">
            <span>🏆</span> Contest Intelligence
          </div>
          <p className="text-xs text-slate-400 mt-1">Add mock contests, view performance trends, readiness, & rating predictions.</p>
        </Link>
      </div>

      {/* Timeline Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <span>📜</span> Real-Time Developer Execution Timeline
        </h2>
        <Timeline entries={timelineLogs} />
      </div>

      {/* Live Raw Profile JSON */}
      <JSONViewer data={profile} title="Active Profile Model State (LearningProfile)" />
    </div>
  );
}
