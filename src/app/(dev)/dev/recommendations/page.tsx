'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { RecommendationEngine, WeaknessAnalyzer, StrengthAnalyzer, RecommendationType } from '@/src/intelligence';
import { StatusBadge } from '../components/StatusBadge';
import { JSONViewer } from '../components/JSONViewer';

export default function RecommendationExplorerPage() {
  const { profile, logAction } = useDev();
  const recEngine = new RecommendationEngine();

  const [filterType, setFilterType] = useState<string>('all');

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
  const recommendations = recEngine.generateRecommendations(weakness, strength);

  const filtered = filterType === 'all'
    ? recommendations
    : recommendations.filter((r) => r.type === filterType);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>💡</span> Recommendation Explorer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect generated explainable recommendation cards, confidence scores, human-readable rationale, and supporting metrics.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-200">Filter by Recommendation Type:</span>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200"
        >
          <option value="all">All Types ({recommendations.length})</option>
          <option value="weakness_repair">Weakness Repair</option>
          <option value="pattern_mastery">Pattern Mastery</option>
          <option value="spaced_revision">Spaced Revision</option>
          <option value="topic_focus">Topic Focus</option>
          <option value="contest_prep">Contest Prep</option>
        </select>
      </div>

      {/* Recommendation Cards List */}
      <div className="space-y-4">
        {filtered.map((card) => (
          <div key={card.id} className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">{card.title}</h3>
                <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded">{card.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Confidence: <strong className="text-emerald-400">{card.confidenceScore}%</strong></span>
                <StatusBadge status={card.priority} />
              </div>
            </div>

            <p className="text-xs text-slate-300">{card.description}</p>

            <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs space-y-1">
              <span className="text-indigo-400 font-semibold">Explainable Reason:</span>
              <p className="text-slate-300 font-mono italic">{card.reason}</p>
            </div>

            {card.problemIds.length > 0 && (
              <div className="text-xs font-mono text-slate-400">
                Target Problems: <span className="text-indigo-300 font-bold">{card.problemIds.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Live Object Inspector */}
      <JSONViewer data={recommendations} title="Generated RecommendationCards Models Array" defaultExpanded={true} />
    </div>
  );
}
