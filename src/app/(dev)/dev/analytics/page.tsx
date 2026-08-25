'use client';

import React, { useState, useEffect } from 'react';
import { AnalyticsService } from '@/src/lib/analytics/services/analytics.service';
import { AnalyticsDashboardState } from '@/src/lib/analytics/services/analytics-state.service';
import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { JSONViewer } from '../components/JSONViewer';

export default function DevAnalyticsPage() {
  const [service] = useState<AnalyticsService>(() => {
    if (!Container.has('AnalyticsService')) {
      Container.registerSingleton('AnalyticsService', new AnalyticsService());
    }
    return Container.resolve<AnalyticsService>('AnalyticsService');
  });

  const [state, setState] = useState<AnalyticsDashboardState>(() => service.stateService.getState());

  useEffect(() => {
    const unsub = service.stateService.subscribe((next) => setState(next));
    return unsub;
  }, [service]);

  const handleSimulateProblemSolved = () => {
    EventBus.publish('ProblemSolved', { problemId: 'P-909', solveTimeSec: 140 });
  };

  const handleSimulateMemoryReviewed = () => {
    EventBus.publish('MemoryReviewed', { conceptId: 'c-bfs' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>📊</span> Anonymous Product Analytics Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect live event stream, privacy consent status, session analytics, learning funnels, and derived KPIs.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Telemetry Event Simulator</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={handleSimulateProblemSolved} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Simulate Problem Solved Event
          </button>
          <button onClick={handleSimulateMemoryReviewed} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">
            Simulate Memory Review Event
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Total Events Collected</span>
          <strong className="text-xl font-bold text-indigo-400">{state.eventsCount}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Active Provider</span>
          <strong className="text-xl font-bold text-emerald-400">{state.activeProviderName}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Weekly Retention</span>
          <strong className="text-xl font-bold text-amber-400">{state.kpis?.weeklyRetentionPercent || 0}%</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Avg Solve Time</span>
          <strong className="text-xl font-bold text-purple-400">{state.kpis?.avgSolveTimeSec || 0}s</strong>
        </div>
      </div>

      <JSONViewer data={state} title="Raw Analytics State & Funnels Inspector" defaultExpanded={true} />
    </div>
  );
}
