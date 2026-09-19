'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight, Flag, Lightbulb } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface RoadmapSnapshotCardProps {
  roadmapSnapshot: DashboardSummary['roadmapSnapshot'];
}

export function RoadmapSnapshotCard({ roadmapSnapshot }: RoadmapSnapshotCardProps) {
  if (!roadmapSnapshot) return null;

  return (
    <div
      data-testid="roadmap-snapshot"
      className="flex flex-col gap-3.5 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 hover:border-[var(--border-strong)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(59,130,246,0.12)] text-[#3B82F6] flex items-center justify-center shrink-0">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Current Focus
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] m-0 leading-tight">
              Adaptive Roadmap Snapshot
            </h3>
          </div>
        </div>

        <Link href={roadmapSnapshot.roadmapUrl || '/journey'} className="no-underline">
          <button
            type="button"
            data-testid="open-roadmap-btn"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs font-medium cursor-pointer transition-colors"
          >
            <span>Open Roadmap</span>
            <ArrowRight className="w-3 h-3 text-[var(--text-secondary)]" />
          </button>
        </Link>
      </div>

      {/* Focus Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs">
        <div>
          <span className="text-[11px] text-[var(--text-secondary)] block">
            Current Learning Area:
          </span>
          <span className="font-bold text-[var(--text-primary)] text-xs">
            {roadmapSnapshot.currentLearningArea}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[var(--text-secondary)] block">
            Focus Subtopic & Pattern:
          </span>
          <span className="font-medium text-[var(--text-primary)] text-xs">
            {roadmapSnapshot.currentSubtopic} • <span className="text-[var(--accent)] font-mono">{roadmapSnapshot.currentPattern}</span>
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[var(--text-secondary)] block">
            Area Mastery Status:
          </span>
          <span className="font-bold text-[#10B981] font-mono text-xs">
            {roadmapSnapshot.masterySignal}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[var(--text-secondary)] block">
            Recommended Concept:
          </span>
          <span className="font-medium text-[var(--text-primary)] text-xs flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-[#F59E0B] shrink-0" />
            <span>{roadmapSnapshot.nextRecommendedConcept}</span>
          </span>
        </div>
      </div>

      {/* Milestone Progress Bar */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-[var(--text-secondary)] flex items-center gap-1">
            <Flag className="w-3 h-3 text-[var(--accent)]" />
            <span>Next Milestone: <strong>{roadmapSnapshot.nextMilestoneTitle}</strong></span>
          </span>
          <span className="font-bold text-[var(--text-primary)]">
            {roadmapSnapshot.progressToNextMilestone}%
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(100, roadmapSnapshot.progressToNextMilestone))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
