'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { MemoryEngine, ConceptMemory, ReviewOutcome } from '@/src/intelligence';
import { MetricCard } from '../components/MetricCard';
import { StatusBadge } from '../components/StatusBadge';
import { JSONViewer } from '../components/JSONViewer';

export default function MemoryInspectorPage() {
  const { profile, logAction } = useDev();
  const [engine] = useState(() => new MemoryEngine());

  // Initialize demo memory concepts if empty
  if (engine.getAllConcepts(profile.userId).length === 0) {
    const demoConcepts: ConceptMemory[] = [
      {
        conceptId: 'concept-arrays-two-pointers',
        userId: profile.userId,
        topic: 'Arrays',
        pattern: 'Two Pointers',
        state: 'Reinforcing',
        masteryScore: 75,
        memoryStrength: 80,
        stabilityScore: 6.25,
        retentionRate: 85,
        forgettingRisk: 15,
        reviewCount: 3,
        successfulReviews: 3,
        failedReviews: 0,
        firstLearned: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
        lastReviewed: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        nextReview: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
        estimatedRecallProbability: 0.88,
      },
      {
        conceptId: 'concept-dp-knapsack',
        userId: profile.userId,
        topic: 'Dynamic Programming',
        pattern: '0/1 Knapsack',
        state: 'AtRisk',
        masteryScore: 40,
        memoryStrength: 45,
        stabilityScore: 2.0,
        retentionRate: 50,
        forgettingRisk: 65,
        reviewCount: 1,
        successfulReviews: 1,
        failedReviews: 1,
        firstLearned: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
        lastReviewed: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
        nextReview: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
        estimatedRecallProbability: 0.35,
      },
    ];

    for (const c of demoConcepts) {
      engine.saveConcept(profile.userId, c);
    }
  }

  const concepts = engine.getAllConcepts(profile.userId);
  const healthReport = engine.getMemoryHealth(profile.userId);
  const revisionQueue = engine.getRevisionQueue(profile.userId);
  const reviewHistory = engine.getReviewHistory(profile.userId);

  const [simConceptId, setSimConceptId] = useState<string>('concept-dp-knapsack');

  const handleSimulateReview = (outcome: ReviewOutcome) => {
    engine.processReview(profile.userId, simConceptId, outcome);
    logAction(`Simulated Memory Review (${outcome}) for ${simConceptId}`, 'Memory Engine', 3);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🧠</span> Learning Memory & Forgetting Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect concept memory states, Ebbinghaus decay risk, spaced repetition stability growth, review queues, and memory health.
        </p>
      </div>

      {/* Memory Health Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Overall Memory Score" value={`${healthReport.overallMemoryScore}/100`} subtext={`Avg Retention: ${healthReport.averageRetention}%`} icon="⭐" />
        <MetricCard title="Concepts Tracked" value={healthReport.totalConceptsTracked} subtext={`Stable: ${healthReport.stableConceptsCount}`} icon="📚" />
        <MetricCard title="Concepts At Risk" value={healthReport.conceptsAtRiskCount} subtext={`Overdue: ${healthReport.overdueReviewsCount}`} icon="⚠️" />
        <MetricCard title="Est Weekly Workload" value={`${healthReport.estimatedWeeklyWorkloadMinutes}m`} subtext={`Coverage: ${healthReport.reviewCoveragePercentage}%`} icon="⏱️" />
      </div>

      {/* Interactive Review Simulator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-200 mb-3">Simulate Concept Spaced Repetition Review</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Select Target Concept</label>
            <select
              value={simConceptId}
              onChange={(e) => setSimConceptId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono"
            >
              {concepts.map((c) => (
                <option key={c.conceptId} value={c.conceptId}>
                  {c.pattern} ({c.state})
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 flex items-end gap-2">
            <button
              onClick={() => handleSimulateReview('success')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 rounded transition-colors"
            >
              + Review Success (2.5x Stability)
            </button>
            <button
              onClick={() => handleSimulateReview('failure')}
              className="flex-1 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 font-medium py-1.5 rounded transition-colors"
            >
              - Review Failure (0.5x Stability)
            </button>
          </div>
        </div>
      </div>

      {/* Concept Memory Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-200 mb-3">Tracked Concept Memories Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-2">Concept / Pattern</th>
                <th className="p-2">State</th>
                <th className="p-2">Stability (Days)</th>
                <th className="p-2">Recall Prob</th>
                <th className="p-2">Forgetting Risk</th>
                <th className="p-2">Next Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {concepts.map((c) => (
                <tr key={c.conceptId} className="text-slate-200">
                  <td className="p-2 font-bold">{c.pattern} <span className="text-slate-500 font-sans">({c.topic})</span></td>
                  <td className="p-2"><StatusBadge status={c.state} /></td>
                  <td className="p-2 text-indigo-400 font-bold">{c.stabilityScore}d</td>
                  <td className="p-2 text-emerald-400">{(c.estimatedRecallProbability * 100).toFixed(0)}%</td>
                  <td className="p-2 text-amber-400">{c.forgettingRisk}%</td>
                  <td className="p-2 text-slate-400">{new Date(c.nextReview).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Object Inspector */}
      <div className="space-y-4">
        <JSONViewer data={{ healthReport, revisionQueue }} title="MemoryHealthReport & RevisionQueue Models" defaultExpanded={true} />
        <JSONViewer data={reviewHistory} title="Immutable ReviewEvent History Log" defaultExpanded={false} />
      </div>
    </div>
  );
}
