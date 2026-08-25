'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { AdaptiveEngine, WeaknessAnalyzer, StrengthAnalyzer, SessionEvaluator, StrategyName } from '@/src/intelligence';
import { JSONViewer } from '../components/JSONViewer';
import { StatusBadge } from '../components/StatusBadge';

export default function AdaptivePracticePage() {
  const { profile, logAction } = useDev();
  const engine = new AdaptiveEngine();

  const [selectedStrategy, setSelectedStrategy] = useState<StrategyName>('Weakness First');
  const [maxProblems, setMaxProblems] = useState<number>(5);

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

  const { session, explanation } = engine.generateSession(profile, weakness, strength, selectedStrategy, { maxProblems });
  const progression = engine.evaluateProgression(profile, weakness);

  const evaluator = new SessionEvaluator();
  const evaluationResult = evaluator.evaluate(session, mockAttempts, 25);

  const handleGenerate = () => {
    logAction(`Generated Adaptive Session (${selectedStrategy})`, 'Adaptive Engine', 5);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>⚡</span> Adaptive Practice & Strategy Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Test 7 adaptive strategies, session generator, constraint engine, progression decisions, and post-session evaluator.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 font-medium mb-1">Select Strategy</label>
          <select
            value={selectedStrategy}
            onChange={(e) => setSelectedStrategy(e.target.value as StrategyName)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200"
          >
            <option value="Weakness First">Weakness First Strategy</option>
            <option value="Balanced Learning">Balanced Learning Strategy</option>
            <option value="Revision Focus">Revision Focus Strategy</option>
            <option value="Contest Preparation">Contest Preparation Strategy</option>
            <option value="Rating Climb">Rating Climb Strategy</option>
            <option value="Topic Mastery">Topic Mastery Strategy</option>
            <option value="Pattern Mastery">Pattern Mastery Strategy</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 font-medium mb-1">Max Session Problems</label>
          <input
            type="number"
            min={1}
            max={10}
            value={maxProblems}
            onChange={(e) => setMaxProblems(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-1.5 rounded transition-colors"
          >
            ⚡ Re-Generate Adaptive Session
          </button>
        </div>
      </div>

      {/* Session Details */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-100">{session.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{session.goal.objective}</p>
          </div>
          <StatusBadge status={session.strategyName} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Target Difficulty: <span className="text-indigo-400 font-bold">{session.goal.targetDifficulty}</span></div>
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Est Duration: <span className="text-slate-200">{session.goal.estimatedDurationMinutes} mins</span></div>
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Selected Count: <span className="text-emerald-400 font-bold">{session.selectedProblems.length}</span></div>
          <div className="bg-slate-950 p-2.5 rounded border border-slate-800">Total XP: <span className="text-amber-400 font-bold">{session.totalXpAvailable} XP</span></div>
        </div>

        <div className="text-xs space-y-1">
          <div className="text-slate-400">Progression Decision: <span className="text-indigo-300 font-mono font-semibold">{progression.action}</span></div>
          <p className="text-slate-500 italic">{progression.reasoning}</p>
        </div>
      </div>

      {/* Live Object Inspector Panels */}
      <div className="space-y-4">
        <JSONViewer data={{ session, explanation }} title="Generated AdaptiveSession & Explanation Models" defaultExpanded={true} />
        <JSONViewer data={evaluationResult} title="SessionEvaluation Post-Session Metrics Model" defaultExpanded={false} />
      </div>
    </div>
  );
}
