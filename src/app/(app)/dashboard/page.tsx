'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionDashboardPage() {
  const { snapshot, isLoading, error, refreshData } = useAppBackend();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400 font-mono">Loading live backend OracleDashboardSnapshot...</p>
      </div>
    );
  }

  if (error || !snapshot) {
    return (
      <div className="bg-red-950/40 border border-red-800 rounded-lg p-6 text-center space-y-4">
        <h2 className="text-base font-bold text-red-300">Backend Engine Sync Failed</h2>
        <p className="text-xs text-slate-300 font-mono">{error || 'Unable to retrieve snapshot.'}</p>
        <button onClick={refreshData} className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded text-xs font-semibold">
          Retry Engine Sync
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <span>⚡ ORACLE DASHBOARD SNAPSHOT</span>
            <span>•</span>
            <span>Strategy: {snapshot.activeStrategy}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Welcome Back, Master!</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {snapshot.dailyGoal}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <span className="text-xs text-slate-400 font-mono block">Unified Score</span>
            <strong className="text-xl font-bold text-emerald-400">{snapshot.overallLearningScore.overallScore}/100</strong>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <span className="text-xs text-slate-400 font-mono block">Memory Health</span>
            <strong className="text-xl font-bold text-indigo-400">{snapshot.memoryHealth}/100</strong>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-center min-w-[100px]">
            <span className="text-xs text-slate-400 font-mono block">Rating Target</span>
            <strong className="text-xl font-bold text-amber-400">{snapshot.ratingProjection}</strong>
          </div>
        </div>
      </div>

      {/* Grid Row 1: Active Alerts & Today's Practice Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts & Insights (1 Col) */}
        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>🔔</span> System Alerts & Overdue Reviews
            </h2>
            {snapshot.alerts.length > 0 ? (
              snapshot.alerts.map((alert) => (
                <div key={alert.id} className="bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-xs space-y-1">
                  <span className="font-semibold text-amber-300 block">{alert.message}</span>
                  <span className="text-slate-400 font-mono block">Action: {alert.actionNeeded}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">All systems optimal. Zero memory decay risks detected.</p>
            )}
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>💡</span> Key Intelligence Insights
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Top Strength:</span>
                <span className="font-semibold text-emerald-400">{snapshot.insights.biggestStrength.value}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Primary Weakness:</span>
                <span className="font-semibold text-rose-400">{snapshot.insights.biggestWeakness.value}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Contest Readiness:</span>
                <span className="font-semibold text-amber-400">{snapshot.contestReadiness}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Practice Plan (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <span>🎯</span> Today&apos;s Oracle Study Plan
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Generated by Oracle AI Engine ({snapshot.todayPractice.totalMinutes} mins total)</p>
            </div>
            <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded">
              3 Structured Blocks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Morning ({snapshot.todayPractice.morning.durationMinutes}m)</span>
              <h4 className="font-semibold text-slate-200">{snapshot.todayPractice.morning.title}</h4>
              <p className="text-slate-400">{snapshot.todayPractice.morning.reason}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Afternoon ({snapshot.todayPractice.afternoon.durationMinutes}m)</span>
              <h4 className="font-semibold text-slate-200">{snapshot.todayPractice.afternoon.title}</h4>
              <p className="text-slate-400">{snapshot.todayPractice.afternoon.reason}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Evening ({snapshot.todayPractice.evening.durationMinutes}m)</span>
              <h4 className="font-semibold text-slate-200">{snapshot.todayPractice.evening.title}</h4>
              <p className="text-slate-400">{snapshot.todayPractice.evening.reason}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <span>🤖</span> Oracle AI Unified Recommendations
        </h2>
        <div className="space-y-3">
          {snapshot.recommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">{rec.category}</span>
                  <h3 className="text-sm font-bold text-slate-100">{rec.title}</h3>
                </div>
                <p className="text-xs text-slate-400">{rec.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-400">Score: <strong className="text-emerald-400">{rec.rankingScore}/100</strong></span>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium transition-colors">
                  Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
