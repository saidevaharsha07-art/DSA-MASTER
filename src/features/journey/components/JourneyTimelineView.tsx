'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Lock,
  AlertTriangle,
  Play,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  RotateCcw,
  Timer,
  Trophy,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import {
  RoadmapTopicNode,
  TopicStatus,
  AdaptiveRoadmapState,
} from '../types/journey.types';

interface JourneyTimelineViewProps {
  roadmap: AdaptiveRoadmapState;
  onSelectTopic: (topic: RoadmapTopicNode) => void;
}

export function JourneyTimelineView({ roadmap, onSelectTopic }: JourneyTimelineViewProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [stageFilter, setStageFilter] = useState<'all' | 'current' | 'needsAttention' | 'completed' | 'upcoming'>('all');

  const filteredTopics =
    stageFilter === 'current'
      ? roadmap.stages.current
      : stageFilter === 'needsAttention'
      ? roadmap.stages.needsAttention
      : stageFilter === 'completed'
      ? roadmap.stages.completed
      : stageFilter === 'upcoming'
      ? roadmap.stages.upcoming
      : roadmap.topics;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── 1. STAGE FILTER TABS ───────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex rounded-xl bg-[var(--surface)] p-1 border border-[var(--border)] overflow-x-auto">
          <button
            onClick={() => setStageFilter('all')}
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
            style={{
              background: stageFilter === 'all' ? 'var(--card)' : 'transparent',
              color: stageFilter === 'all' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            All Topics ({roadmap.totalTopics})
          </button>

          <button
            onClick={() => setStageFilter('current')}
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
            style={{
              background: stageFilter === 'current' ? 'var(--card)' : 'transparent',
              color: stageFilter === 'current' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            Active Focus ({roadmap.stages.current.length})
          </button>

          {roadmap.stages.needsAttention.length > 0 && (
            <button
              onClick={() => setStageFilter('needsAttention')}
              className="px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 text-red-400"
              style={{
                background: stageFilter === 'needsAttention' ? 'var(--card)' : 'transparent',
              }}
            >
              <AlertTriangle size={13} /> Needs Attention ({roadmap.stages.needsAttention.length})
            </button>
          )}

          <button
            onClick={() => setStageFilter('completed')}
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
            style={{
              background: stageFilter === 'completed' ? 'var(--card)' : 'transparent',
              color: stageFilter === 'completed' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            Mastered ({roadmap.stages.completed.length})
          </button>

          <button
            onClick={() => setStageFilter('upcoming')}
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
            style={{
              background: stageFilter === 'upcoming' ? 'var(--card)' : 'transparent',
              color: stageFilter === 'upcoming' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            Upcoming ({roadmap.stages.upcoming.length})
          </button>
        </div>

        <span className="text-xs text-[var(--text-muted)] font-semibold">
          Overall Roadmap Mastery: <strong className="text-pink-500">{roadmap.overallMasteryPercent}%</strong>
        </span>
      </div>

      {/* ── 2. TOPIC GRAPH CARDS GRID ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => {
          const isMastered = topic.status === 'MASTERED';
          const isStrong = topic.status === 'STRONG';
          const isPracticing = topic.status === 'PRACTICING';
          const isNeedsReview = topic.status === 'NEEDS_REVIEW';
          const isBlocked = topic.status === 'BLOCKED';

          const statusColor = isMastered
            ? '#10B981'
            : isStrong
            ? '#3B82F6'
            : isPracticing
            ? '#EC4899'
            : isNeedsReview
            ? '#EF4444'
            : isBlocked
            ? '#64748B'
            : '#F59E0B';

          return (
            <div
              key={topic.id}
              className="rounded-2xl p-5 border flex flex-col justify-between gap-4 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: 'var(--card)',
                borderColor: isNeedsReview
                  ? 'rgba(239, 68, 68, 0.4)'
                  : isLight
                  ? '#E2E8F0'
                  : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex flex-col gap-3">
                {/* Header row with Status & Mastery */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1"
                    style={{
                      background: `${statusColor}18`,
                      color: statusColor,
                      border: `1px solid ${statusColor}33`,
                    }}
                  >
                    {isMastered && <CheckCircle2 size={12} />}
                    {isBlocked && <Lock size={11} />}
                    {isNeedsReview && <AlertTriangle size={11} />}
                    {topic.status.replace('_', ' ')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[var(--text-primary)]">
                      {topic.masteryScore}%
                    </span>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">
                      Mastery
                    </span>
                  </div>
                </div>

                {/* Title & Category */}
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] hover:text-pink-500 transition-colors">
                    {topic.order}. {topic.title}
                  </h4>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    {topic.category} • {topic.tier}
                  </span>
                </div>

                {/* Grounded Reason Preview */}
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {topic.statusReason}
                </p>

                {/* Mini Stats Strip */}
                <div className="flex items-center gap-2 flex-wrap pt-1 text-[10px] font-bold text-[var(--text-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)]">
                    {topic.evidence.practiceSolved} Solved
                  </span>
                  {topic.evidence.recentAccuracyPercent > 0 && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {topic.evidence.recentAccuracyPercent}% Accuracy
                    </span>
                  )}
                  {topic.evidence.revisionRetentionPercent > 0 && (
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      {topic.evidence.revisionRetentionPercent}% Retention
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectTopic(topic)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                >
                  View Details
                </button>

                <Link
                  href={
                    topic.recommendedAction === 'INTERVIEW'
                      ? '/interview'
                      : topic.recommendedAction === 'CONTEST'
                      ? '/contest'
                      : topic.recommendedAction === 'REVISE'
                      ? '/revision'
                      : `/practice?topic=${encodeURIComponent(topic.title)}`
                  }
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>{topic.recommendedAction}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
