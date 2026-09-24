'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Target,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { RoadmapTopicNode } from '../types/journey.types';

interface TopicDetailModalProps {
  topic: RoadmapTopicNode | null;
  onClose: () => void;
}

export function TopicDetailModal({ topic, onClose }: TopicDetailModalProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  // Close on Escape key
  React.useEffect(() => {
    if (!topic) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topic, onClose]);

  if (!topic) return null;

  const mentorQuery = `I'm working on the "${topic.title}" topic on DSA Magna.
Current Mastery: ${topic.masteryScore}% (Status: ${topic.status}).
Evidence: ${topic.evidence.practiceSolved} solved, ${topic.evidence.failedAttemptsCount} failed attempts, Accuracy: ${topic.evidence.recentAccuracyPercent}%, Revision Retention: ${topic.evidence.revisionRetentionPercent}%.
Reason: ${topic.statusReason}
Recommended Action: ${topic.recommendedAction}.
Please explain how I can address my weak areas in this topic and guide me through the most crucial patterns.`;

  const mentorUrl = `/mentor?context=roadmap&topic=${encodeURIComponent(
    topic.title
  )}&mastery=${topic.masteryScore}&status=${topic.status}`;

  const statusColor =
    topic.status === 'MASTERED'
      ? '#10B981'
      : topic.status === 'STRONG'
      ? '#3B82F6'
      : topic.status === 'PRACTICING'
      ? '#EC4899'
      : topic.status === 'NEEDS_REVIEW'
      ? '#EF4444'
      : topic.status === 'BLOCKED'
      ? '#64748B'
      : '#F59E0B';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border flex flex-col gap-6 shadow-2xl relative cursor-default"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 p-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 pr-10">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                style={{
                  background: `${statusColor}18`,
                  color: statusColor,
                  border: `1px solid ${statusColor}33`,
                }}
              >
                {topic.status.replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                {topic.category} • {topic.tier}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              {topic.title}
            </h2>
          </div>

          {/* Mastery Ring / Metric */}
          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-pink-500 block">
              {topic.masteryScore}%
            </span>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
              Mastery Score
            </span>
          </div>
        </div>

        {/* ── WHY THIS STATUS WAS ASSIGNED (Ground Truth Explanation) ─ */}
        <div
          className="p-4 rounded-2xl border text-xs leading-relaxed"
          style={{
            background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
            borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.06)',
          }}
        >
          <strong className="text-[var(--text-primary)] block font-bold mb-1 flex items-center gap-1.5">
            <Target size={14} className="text-pink-500" /> Grounded Intelligence Analysis:
          </strong>
          <p className="text-[var(--text-secondary)] font-medium">
            {topic.statusReason}
          </p>
        </div>

        {/* ── FACTUAL EVIDENCE MATRIX ──────────────────────────────── */}
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Recorded Activity & Telemetry
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Solves</span>
              <strong className="text-sm font-black text-[var(--text-primary)]">
                {topic.evidence.practiceSolved} / {topic.totalCurriculumProblems}
              </strong>
              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                {topic.evidence.easySolved}E • {topic.evidence.medSolved}M • {topic.evidence.hardSolved}H
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Recent Accuracy</span>
              <strong className="text-sm font-black text-emerald-500">
                {topic.evidence.recentAccuracyPercent}%
              </strong>
              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                {topic.evidence.practiceAttempted} attempts
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">SRS Retention</span>
              <strong className="text-sm font-black text-blue-500">
                {topic.evidence.revisionRetentionPercent}%
              </strong>
              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                {topic.evidence.revisionRetentionPercent >= 75 ? 'Healthy' : 'Decaying'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Tournaments</span>
              <strong className="text-sm font-black text-purple-500">
                {topic.evidence.interviewSuccessCount + topic.evidence.contestSolveCount} Solved
              </strong>
              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                {topic.evidence.contestFailCount} contest fails
              </span>
            </div>
          </div>
        </div>

        {/* ── PREREQUISITES & DEPENDENTS ───────────────────────────── */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Dependency Map
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
              <span className="font-bold text-[var(--text-secondary)]">Prerequisites:</span>
              <span className="text-[var(--text-primary)] font-semibold">
                {topic.prerequisites.length > 0
                  ? topic.prerequisites.join(', ')
                  : 'None (Fundamental Core Topic)'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
              <span className="font-bold text-[var(--text-secondary)]">Unlocks Topics:</span>
              <span className="text-[var(--text-primary)] font-semibold">
                {topic.dependentTopicIds.length > 0
                  ? topic.dependentTopicIds.join(', ')
                  : 'Advanced Mastery Peak'}
              </span>
            </div>
          </div>
        </div>

        {/* ── ACTIONS (Practice & AI Mentor) ───────────────────────── */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border)]">
          <Link
            href={mentorUrl}
            className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bot size={15} className="text-pink-500" />
            <Sparkles size={13} className="text-purple-500" />
            Ask AI Mentor About {topic.title}
          </Link>

          <Link
            href={`/practice?area=${encodeURIComponent(topic.slug || topic.id)}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-700 transition-all flex items-center justify-center gap-1.5 shadow-md"
          >
            Practice {topic.title} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
