'use client';

import React from 'react';
import Link from 'next/link';
import { Timer, Play } from 'lucide-react';

interface InterviewSnapshotCardProps {
  interviewReadiness: {
    level: string;
    totalCompletedSessions: number;
    historicalAccuracyPercent: number;
    speedPacingScore: number;
    patternCoverageCount: number;
  };
}

export function InterviewSnapshotCard({ interviewReadiness }: InterviewSnapshotCardProps) {
  if (!interviewReadiness) return null;

  return (
    <div
      data-testid="interview-snapshot-card"
      className="flex flex-col gap-3.5 p-4 rounded-xl border border-[rgba(6,182,212,0.25)] bg-[rgba(6,182,212,0.03)] shadow-sm transition-all duration-200 hover:border-[rgba(6,182,212,0.4)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(6,182,212,0.15)] text-[#06B6D4] flex items-center justify-center shrink-0">
            <Timer className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Simulation Arena
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h3 className="text-xs font-bold text-[var(--text-primary)] m-0 leading-tight">
                Technical Interview Simulator
              </h3>
              <span
                data-testid="dashboard-interview-readiness-badge"
                className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[rgba(6,182,212,0.12)] text-[#06B6D4] border border-[rgba(6,182,212,0.25)]"
              >
                {interviewReadiness.level}
              </span>
            </div>
          </div>
        </div>

        <Link href="/interview" className="no-underline">
          <button
            type="button"
            data-testid="start-mock-interview-btn"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#06B6D4] hover:bg-[#0891B2] text-[#020617] text-xs font-bold cursor-pointer transition-colors shadow-sm"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Start Mock Interview</span>
          </button>
        </Link>
      </div>

      {/* 4 Factual Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-muted)] block">Sessions</span>
          <span className="text-xs font-mono font-bold text-[var(--text-primary)] mt-0.5 block">
            {interviewReadiness.totalCompletedSessions} Rounds
          </span>
        </div>

        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-muted)] block">Accuracy</span>
          <span className="text-xs font-mono font-bold text-[#10B981] mt-0.5 block">
            {interviewReadiness.historicalAccuracyPercent}%
          </span>
        </div>

        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-muted)] block">Speed</span>
          <span className="text-xs font-mono font-bold text-[#06B6D4] mt-0.5 block">
            {interviewReadiness.speedPacingScore > 0 ? `${interviewReadiness.speedPacingScore}m/p` : 'No data'}
          </span>
        </div>

        <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
          <span className="text-[10px] text-[var(--text-muted)] block">Patterns</span>
          <span className="text-xs font-mono font-bold text-[#A855F7] mt-0.5 block">
            {interviewReadiness.patternCoverageCount}/113
          </span>
        </div>
      </div>
    </div>
  );
}
