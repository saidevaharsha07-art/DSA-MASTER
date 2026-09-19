'use client';

import React from 'react';
import { History, Award, BarChart3 } from 'lucide-react';
import { InterviewHistoryRecord, InterviewArenaReport } from '../types/interview.types';

interface InterviewHistoryListProps {
  isLight: boolean;
  history: InterviewHistoryRecord[];
  onViewReport: (report: InterviewArenaReport) => void;
}

export function InterviewHistoryList({
  isLight,
  history,
  onViewReport,
}: InterviewHistoryListProps) {
  return (
    <div className="space-y-3 pt-2" data-testid="interview-history-section">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
          <h2 className={`text-base sm:text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Interview History & Diagnostic Reports
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          {history.length} {history.length === 1 ? 'round recorded' : 'rounds recorded'}
        </span>
      </div>

      {history.length === 0 ? (
        <div
          className={`p-8 sm:p-10 rounded-2xl border text-center space-y-2.5 ${
            isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-slate-900/40 border-slate-800'
          }`}
        >
          <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
            <Award className="w-5 h-5" />
          </div>
          <div className={`font-bold text-sm ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
            No simulated interview rounds recorded yet
          </div>
          <p className={`text-xs max-w-sm mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Configure and launch your first timed technical round above to build your performance scorecard and diagnosis.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="col-span-3">Date / Mode</div>
            <div className="col-span-2 text-center">Duration</div>
            <div className="col-span-2 text-center">Problems</div>
            <div className="col-span-2 text-center">Solved</div>
            <div className="col-span-1 text-center">Accuracy</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* List Rows */}
          {history.map((item) => (
            <div
              key={item.id}
              data-testid={`history-card-${item.id}`}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-12 gap-3 items-center text-xs">
                <div className="col-span-3">
                  <span className="text-[10px] font-mono font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider block">
                    {item.type}
                  </span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {item.date}
                  </span>
                </div>

                <div className="col-span-2 text-center font-mono text-slate-500 dark:text-slate-400">
                  {item.timeUsedMinutes} / {item.durationMinutes}m
                </div>

                <div className="col-span-2 text-center font-mono text-slate-500 dark:text-slate-400">
                  {item.totalProblems} {item.totalProblems === 1 ? 'prob' : 'probs'}
                </div>

                <div className="col-span-2 text-center font-mono font-bold text-emerald-500 dark:text-emerald-400">
                  {item.problemsCompleted} / {item.totalProblems}
                </div>

                <div className="col-span-1 text-center font-mono font-bold text-cyan-500 dark:text-cyan-400">
                  {item.report?.accuracyPercent ?? item.score}%
                </div>

                <div className="col-span-2 text-right">
                  <button
                    type="button"
                    onClick={() => onViewReport(item.report)}
                    data-testid={`view-report-btn-${item.id}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors inline-flex items-center gap-1.5 ${
                      isLight
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    <BarChart3 className="w-3 h-3 text-cyan-400" />
                    <span>Scorecard</span>
                  </button>
                </div>
              </div>

              {/* Mobile View (<768px Stacked Card) */}
              <div className="md:hidden space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider block">
                      {item.type}
                    </span>
                    <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {item.date}
                    </h4>
                  </div>
                  <div className="px-2 py-0.5 rounded-md text-xs font-mono font-black bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
                    {item.report?.accuracyPercent ?? item.score}% Acc
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>{item.problemsCompleted}/{item.totalProblems} Solved</span>
                  <span>{item.timeUsedMinutes} / {item.durationMinutes}m</span>
                  <span className="font-semibold text-amber-500 dark:text-amber-400">{item.difficulty}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onViewReport(item.report)}
                  data-testid={`view-report-btn-${item.id}`}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Factual Scorecard</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
