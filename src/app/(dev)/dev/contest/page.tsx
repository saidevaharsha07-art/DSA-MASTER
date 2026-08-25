'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { ContestEngine, ContestRecord } from '@/src/intelligence';
import { PlatformId } from '@/src/platforms';
import { MetricCard } from '../components/MetricCard';
import { JSONViewer } from '../components/JSONViewer';
import { StatusBadge } from '../components/StatusBadge';

export default function ContestIntelligencePage() {
  const { profile, contestHistory, addContest, logAction } = useDev();
  const engine = new ContestEngine();

  // Populate engine history with dev contest history
  for (const c of contestHistory) {
    engine.recordContest(profile.userId, c);
  }

  const analysis = engine.analyzeContests(profile.userId);
  const readiness = engine.evaluateReadiness(profile);
  const recommendations = engine.generateRecommendations(profile.userId, profile);
  const statsSummary = engine.getStatisticsSummary(profile.userId);

  const [contestName, setContestName] = useState('Starters 105');
  const [platform, setPlatform] = useState<PlatformId>('codechef');
  const [rank, setRank] = useState(350);
  const [ratingChange, setRatingChange] = useState(40);

  const handleAddContest = () => {
    const newRecord: ContestRecord = {
      id: `contest-${Date.now()}`,
      platform,
      contestId: `CONTEST_${Date.now()}`,
      name: contestName,
      date: new Date().toISOString(),
      durationMinutes: 120,
      lifecycleState: 'completed',
      rank,
      totalParticipants: 5000,
      ratingBefore: 1400,
      ratingAfter: 1400 + ratingChange,
      ratingChange,
      solvedCount: 3,
      attemptedCount: 4,
      penaltiesMinutes: 10,
    };

    addContest(newRecord);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🏆</span> Contest Intelligence & Performance Trend Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Analyze contest history, rank percentiles, performance trends, expressive readiness, and contest recommendations.
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Contests Attended" value={analysis.totalContests} subtext={`Net Rating Gain: ${analysis.netRatingGain}`} icon="🏆" />
        <MetricCard title="Average Percentile" value={`${analysis.averagePercentile}%`} subtext={`Avg Rank: ${analysis.averageRank}`} icon="📊" />
        <MetricCard title="Readiness Level" value={readiness.readinessLevel} subtext={`Confidence: ${readiness.confidenceScore}%`} icon="🎯" />
        <MetricCard title="Solve Speed Avg" value={`${analysis.solveSpeedAvgMinutes}m`} subtext="Per problem solve speed" icon="⏱️" />
      </div>

      {/* Add Mock Contest Record Form */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-200 mb-3">Add Mock Contest Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Contest Name</label>
            <input
              type="text"
              value={contestName}
              onChange={(e) => setContestName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformId)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
            >
              <option value="codechef">CodeChef</option>
              <option value="codeforces">Codeforces</option>
              <option value="leetcode">LeetCode</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Rank achieved</label>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddContest}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded transition-colors"
            >
              + Add Mock Contest Record
            </button>
          </div>
        </div>
      </div>

      {/* Readiness Report Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h2 className="text-sm font-bold text-slate-200">Expressive Contest Readiness Report</h2>
          <StatusBadge status={readiness.readinessLevel} />
        </div>
        <div className="text-xs space-y-2 font-mono">
          <div>Readiness Level: <span className="text-indigo-400 font-bold">{readiness.readinessLevel}</span></div>
          <div>Rated Contest Ready: <span className={readiness.isReadyForRated ? 'text-emerald-400' : 'text-amber-400'}>{readiness.isReadyForRated ? 'YES' : 'NO'}</span></div>
          <div>Estimated Success Probability: <span className="text-slate-100 font-bold">{(readiness.estimatedSuccessProbability * 100).toFixed(0)}%</span></div>
          <p className="text-slate-400 font-sans italic">{readiness.recommendedPreparation}</p>
        </div>
      </div>

      {/* Live Models Inspection */}
      <div className="space-y-4">
        <JSONViewer data={{ analysis, readiness, statsSummary }} title="Contest Analysis & Readiness Models" defaultExpanded={true} />
        <JSONViewer data={recommendations} title="Contest Recommendations Cards" defaultExpanded={false} />
      </div>
    </div>
  );
}
