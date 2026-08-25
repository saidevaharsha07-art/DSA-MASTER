'use client';

import React, { useState, useEffect } from 'react';
import { AchievementService } from '@/src/intelligence/achievements/services/achievement.service';
import { AchievementStateSnapshot } from '@/src/intelligence/achievements/services/achievement-state.service';
import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { JSONViewer } from '../components/JSONViewer';

export default function DevAchievementsPage() {
  const [service] = useState<AchievementService>(() => {
    if (!Container.has('AchievementService')) {
      Container.registerSingleton('AchievementService', new AchievementService());
    }
    return Container.resolve<AchievementService>('AchievementService');
  });

  const [state, setState] = useState<AchievementStateSnapshot>(() => service.stateService.getState());

  useEffect(() => {
    const unsub = service.stateService.subscribe((next) => setState(next));
    return unsub;
  }, [service]);

  const handleSimulateProblemSolved = () => {
    EventBus.publish('ProblemSolved', { problemId: 'P-101', solveTimeSec: 120 });
  };

  const handleSimulateContestCompleted = () => {
    EventBus.publish('ContestCompleted', { contestId: 'ROUND-1' });
  };

  const handleSimulateStreak7 = () => {
    EventBus.publish('ProfileUpdated', { streak: 7, xp: 1200 });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🏆</span> Event-Driven Achievement Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect unlocked achievements, badges, title inventory, points, and trigger event simulations.
        </p>
      </div>

      {/* Simulator Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Event Simulator & Triggers</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={handleSimulateProblemSolved} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Simulate Problem Solved (&lt;5 min)
          </button>
          <button onClick={handleSimulateContestCompleted} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">
            Simulate Contest Completed
          </button>
          <button onClick={handleSimulateStreak7} className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium">
            Simulate 7-Day Streak & 1200 XP
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Unlocked</span>
          <strong className="text-xl font-bold text-emerald-400">{state.unlockedCount}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Total Points</span>
          <strong className="text-xl font-bold text-amber-400">{state.totalPoints}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Badges Earned</span>
          <strong className="text-xl font-bold text-indigo-400">{state.badges.length}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Titles Unlocked</span>
          <strong className="text-xl font-bold text-purple-400">{state.titles.length}</strong>
        </div>
      </div>

      <JSONViewer data={state} title="Raw Achievement State & Inventories" defaultExpanded={true} />
    </div>
  );
}
