'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { RatingEngine } from '@/src/intelligence';
import { PlatformId } from '@/src/platforms';
import { MetricCard } from '../components/MetricCard';
import { JSONViewer } from '../components/JSONViewer';

export default function RatingInspectorPage() {
  const { contestHistory, logAction } = useDev();
  const ratingEngine = new RatingEngine();

  const [platform, setPlatform] = useState<PlatformId>('codechef');
  const [targetContests, setTargetContests] = useState<number>(3);

  const normalizedCc = ratingEngine.normalizeRating('codechef', 1650);
  const normalizedCf = ratingEngine.normalizeRating('codeforces', 1500);

  const prediction = ratingEngine.predictRating(platform, contestHistory, targetContests);
  const ratingSummary = ratingEngine.getRatingSummary(contestHistory);

  const handlePredict = () => {
    logAction(`Triggered Rating Prediction (${platform})`, 'Rating Engine', 3);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>📈</span> Rating Inspector & Predictor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect cross-platform rating normalization, division mappings, and deterministic future rating predictions.
        </p>
      </div>

      {/* Cross-Platform Rating Normalization Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
        <h2 className="text-sm font-bold text-slate-200 mb-4">Cross-Platform Rating Normalization Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">CodeChef Raw Rating:</span>
              <span className="text-slate-100 font-bold">1650</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Normalized Score (0-100):</span>
              <span className="text-emerald-400 font-bold">{normalizedCc.normalizedScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Division Rank:</span>
              <span className="text-indigo-400 font-bold">{normalizedCc.division}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Codeforces Raw Rating:</span>
              <span className="text-slate-100 font-bold">1500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Normalized Score (0-100):</span>
              <span className="text-emerald-400 font-bold">{normalizedCf.normalizedScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Division Rank:</span>
              <span className="text-indigo-400 font-bold">{normalizedCf.division}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deterministic Predictor Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-200">Deterministic Rating Predictor Configuration</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Target Platform</label>
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
            <label className="block text-slate-400 mb-1">Future Contests Horizon</label>
            <input
              type="number"
              min={1}
              max={10}
              value={targetContests}
              onChange={(e) => setTargetContests(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handlePredict}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-1.5 rounded transition-colors"
            >
              📈 Run Rating Predictor
            </button>
          </div>
        </div>

        {/* Prediction Results Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard title="Current Rating" value={prediction.currentRating} subtext={`Platform: ${prediction.platform}`} icon="📍" />
          <MetricCard title="Projected Rating" value={prediction.projectedRating} subtext={`Over ${targetContests} contests`} icon="🎯" trend={`+${prediction.projectedRating - prediction.currentRating}`} />
          <MetricCard title="Confidence Score" value={`${prediction.confidenceScore}%`} subtext="Deterministic algorithm confidence" icon="⭐" />
        </div>
      </div>

      {/* Live Models Inspection */}
      <div className="space-y-4">
        <JSONViewer data={prediction} title="RatingPredictionReport Model Output" defaultExpanded={true} />
        <JSONViewer data={ratingSummary} title="PlatformRatingSummary Models" defaultExpanded={false} />
      </div>
    </div>
  );
}
