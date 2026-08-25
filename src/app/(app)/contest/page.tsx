'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionContestPage() {
  const { bundle, isLoading } = useAppBackend();

  if (isLoading || !bundle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { contestAnalysis, contestReadiness, ratingPrediction } = bundle;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🏆</span> Contest Intelligence & Rating Predictor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to ContestEngine, RatingEngine, and platform rating normalizers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Average Percentile</span>
          <strong className="text-xl font-bold text-indigo-400">{contestAnalysis.averagePercentile}%</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Current Rating</span>
          <strong className="text-xl font-bold text-emerald-400">{ratingPrediction.currentRating}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Projected Rating</span>
          <strong className="text-xl font-bold text-amber-400">{ratingPrediction.projectedRating}</strong>
        </div>
      </div>

      {/* Contest Readiness Report */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-100">Live Contest Readiness Evaluation</h2>
        <div className="space-y-2 text-xs">
          <p className="text-slate-300">Readiness Tier: <strong className="text-indigo-400">{contestReadiness.readinessLevel}</strong> (Confidence: {(contestReadiness.confidenceScore * 100).toFixed(0)}%)</p>
          <p className="text-slate-400">{contestReadiness.recommendedPreparation}</p>
        </div>
      </div>
    </div>
  );
}
