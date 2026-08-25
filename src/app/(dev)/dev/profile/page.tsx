'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { JSONViewer } from '../components/JSONViewer';
import { MetricCard } from '../components/MetricCard';

export default function ProfileSimulatorPage() {
  const { profile, currentPreset, setPreset, recordSolve, recordFailure, resetAll } = useDev();

  const [simProblemId, setSimProblemId] = useState<string>('FLOW001');
  const [simTopic, setSimTopic] = useState<string>('Arrays');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>👤</span> Profile Simulator
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulate problem solves/failures, trigger streak updates, switch presets, and inspect the resulting LearningProfile.
        </p>
      </div>

      {/* Preset Toolbar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-200">Preset Selector:</span>
          <span className="ml-2 text-xs font-mono text-indigo-400 font-bold">{currentPreset}</span>
        </div>
        <div className="flex items-center gap-2">
          {(['Beginner', 'Intermediate', 'Advanced', 'Empty'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
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

      {/* Profile Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Solved Problems" value={profile.solvedProblemIds.size} subtext={`Attempted: ${profile.attemptedProblemIds.size}`} icon="✅" />
        <MetricCard title="Total XP Earned" value={profile.totalXp} subtext="XP from solved problems" icon="⭐" />
        <MetricCard title="Current Streak" value={`${profile.streakInfo.currentStreak} days`} subtext={`Longest: ${profile.streakInfo.longestStreak} days`} icon="🔥" />
        <MetricCard title="Active Days" value={profile.streakInfo.activeDaysCount} subtext={`Last active: ${profile.streakInfo.lastActiveDate || 'N/A'}`} icon="📅" />
      </div>

      {/* Interactive Solve Simulator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-200 mb-3">Simulate Problem Solve / Failure Event</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Problem ID</label>
            <input
              type="text"
              value={simProblemId}
              onChange={(e) => setSimProblemId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Topic</label>
            <select
              value={simTopic}
              onChange={(e) => setSimTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
            >
              <option value="Arrays">Arrays</option>
              <option value="Strings">Strings</option>
              <option value="Math">Math</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
              <option value="Bit Manipulation">Bit Manipulation</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={() => recordSolve(simProblemId, simTopic)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded transition-colors"
            >
              + Trigger Solve (AC)
            </button>
            <button
              onClick={() => recordFailure(simProblemId, simTopic)}
              className="flex-1 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 font-medium py-1.5 rounded transition-colors"
            >
              + Trigger Failure (WA)
            </button>
          </div>
        </div>
      </div>

      {/* Live Profile Model Inspector */}
      <JSONViewer data={profile} title="Live LearningProfile Model State" defaultExpanded={true} />
    </div>
  );
}
