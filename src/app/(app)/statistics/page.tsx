'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionStatisticsPage() {
  const { bundle, profile, isLoading } = useAppBackend();

  if (isLoading || !bundle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { weakness, strength } = bundle;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>📊</span> Intelligence & Analytics Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to IntelligenceService, WeaknessAnalyzer, StrengthAnalyzer, and metrics calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Weaknesses */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>🚨</span> Weak Topic Analysis
          </h2>
          {weakness.weakTopics.length > 0 ? (
            <div className="space-y-3">
              {weakness.weakTopics.map((w) => (
                <div key={w.topic} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-200">{w.topic}</h4>
                    <span className="text-slate-400 font-mono">Accuracy: {(w.accuracy * 100).toFixed(0)}%</span>
                  </div>
                  <span className="text-rose-400 font-bold font-mono">Accuracy: {(w.accuracy * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Zero critical weak topics identified!</p>
          )}
        </div>

        {/* Top Strengths */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>🏆</span> Mastered Topic Analysis
          </h2>
          {strength.masteredTopics.length > 0 ? (
            <div className="space-y-3">
              {strength.masteredTopics.map((s) => (
                <div key={s.topic} className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-200">{s.topic}</h4>
                    <span className="text-slate-400 font-mono">Accuracy: {(s.accuracy * 100).toFixed(0)}%</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">Mastery: {s.masteryScore}/100</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Building initial skills across core topics.</p>
          )}
        </div>
      </div>
    </div>
  );
}
