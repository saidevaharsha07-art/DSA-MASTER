'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  RotateCcw,
  Timer,
  Trophy,
  AlertTriangle,
  Bot,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { UnifiedRecommendation } from '../types/recommendation.types';
import { RecommendationEngineService } from '../services/recommendation-engine.service';

export interface RecommendationCardProps {
  recommendation: UnifiedRecommendation;
  variant?: 'compact' | 'journey' | 'post-practice' | 'post-interview' | 'post-contest' | 'detailed';
  onDismiss?: (id: string) => void;
  onStart?: (id: string) => void;
  className?: string;
}

export function RecommendationCard({
  recommendation,
  variant = 'compact',
  onDismiss,
  onStart,
  className = '',
}: RecommendationCardProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [showEvidence, setShowEvidence] = useState(false);

  const {
    id,
    actionType,
    title,
    explanation,
    priority,
    topic,
    destinationRoute,
    supportingEvidence,
    targetDifficulty,
    estimatedMinutes,
    mentorContextPayload,
    userId,
  } = recommendation;

  // Icon & Color mapping
  const getActionTheme = () => {
    switch (actionType) {
      case 'REVISE':
        return {
          icon: <RotateCcw size={16} />,
          color: '#EF4444',
          bg: 'rgba(239, 68, 68, 0.12)',
          border: 'rgba(239, 68, 68, 0.25)',
          label: 'REVISE',
        };
      case 'REVIEW_MISTAKE':
        return {
          icon: <AlertTriangle size={16} />,
          color: '#F59E0B',
          bg: 'rgba(245, 158, 11, 0.12)',
          border: 'rgba(245, 158, 11, 0.25)',
          label: 'DEBUG MISTAKE',
        };
      case 'LEARN':
        return {
          icon: <BookOpen size={16} />,
          color: '#3B82F6',
          bg: 'rgba(59, 130, 246, 0.12)',
          border: 'rgba(59, 130, 246, 0.25)',
          label: 'LEARN',
        };
      case 'PRACTICE':
        return {
          icon: <Code2 size={16} />,
          color: '#10B981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.25)',
          label: 'PRACTICE',
        };
      case 'INTERVIEW':
        return {
          icon: <Timer size={16} />,
          color: '#8B5CF6',
          bg: 'rgba(139, 92, 246, 0.12)',
          border: 'rgba(139, 92, 246, 0.25)',
          label: 'MOCK INTERVIEW',
        };
      case 'CONTEST':
        return {
          icon: <Trophy size={16} />,
          color: '#EC4899',
          bg: 'rgba(236, 72, 153, 0.12)',
          border: 'rgba(236, 72, 153, 0.25)',
          label: 'TOURNAMENT',
        };
      case 'ASK_MENTOR':
      default:
        return {
          icon: <Bot size={16} />,
          color: '#06B6D4',
          bg: 'rgba(6, 182, 212, 0.12)',
          border: 'rgba(6, 182, 212, 0.25)',
          label: 'ASK MENTOR',
        };
    }
  };

  const theme = getActionTheme();

  const handleStart = () => {
    RecommendationEngineService.recordStart(userId, id);
    if (onStart) onStart(id);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    RecommendationEngineService.recordDismiss(userId, id);
    if (onDismiss) onDismiss(id);
  };

  const mentorUrl = `/mentor?context=recommendation&topic=${encodeURIComponent(
    topic
  )}&action=${actionType}`;

  // ── JOURNEY / HERO VARIANT ─────────────────────────────────────────
  if (variant === 'journey') {
    return (
      <div
        className={`rounded-3xl p-6 sm:p-8 border relative overflow-hidden flex flex-col justify-between gap-6 shadow-xl ${className}`}
        style={{
          background: 'var(--card)',
          borderColor: theme.border,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
              style={{
                background: theme.bg,
                color: theme.color,
                border: `1px solid ${theme.border}`,
              }}
            >
              {theme.icon}
              <span>{theme.label}</span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] flex items-center gap-1">
                <Clock size={12} /> {estimatedMinutes}m
              </span>
              {targetDifficulty && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {targetDifficulty}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              {explanation}
            </p>
          </div>

          {/* Factual Evidence Accordion */}
          {supportingEvidence && supportingEvidence.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => setShowEvidence(!showEvidence)}
                className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors py-1 cursor-pointer"
              >
                <span>Why am I seeing this? ({supportingEvidence.length} signals)</span>
                {showEvidence ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showEvidence && (
                <ul className="flex flex-col gap-1.5 pl-2 text-xs text-[var(--text-secondary)]">
                  {supportingEvidence.map((ev, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold">•</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            href={mentorUrl}
            className="text-xs font-bold text-[var(--text-muted)] hover:text-indigo-400 transition-colors flex items-center gap-1.5"
          >
            <Bot size={14} /> Ask Mentor
          </Link>

          <Link
            href={destinationRoute}
            onClick={handleStart}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
            style={{ background: theme.color }}
          >
            <span>Launch Action</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // ── COMPACT / DASHBOARD VARIANT (Default) ──────────────────────────
  return (
    <div
      className={`rounded-2xl p-5 border flex flex-col justify-between gap-4 transition-all hover:shadow-lg ${className}`}
      style={{
        background: 'var(--card)',
        borderColor: isLight ? '#E2E8F0' : 'var(--border)',
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
            style={{
              background: theme.bg,
              color: theme.color,
              border: `1px solid ${theme.border}`,
            }}
          >
            {theme.icon}
            <span>{theme.label}</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1">
              <Clock size={11} /> {estimatedMinutes}m
            </span>
            {onDismiss && (
              <button
                onClick={handleDismiss}
                aria-label="Dismiss recommendation"
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0.5 rounded hover:bg-[var(--surface)] transition-colors cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-[var(--text-primary)] hover:text-indigo-400 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Evidence preview */}
        {supportingEvidence && supportingEvidence.length > 0 && (
          <div className="bg-[var(--surface)] p-2 rounded-lg border border-[var(--border)] text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
            <Sparkles size={12} className="text-indigo-400 shrink-0" />
            <span className="truncate">{supportingEvidence[0]}</span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-2">
        <Link
          href={mentorUrl}
          className="text-[11px] font-bold text-[var(--text-muted)] hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          <Bot size={12} /> Ask Mentor
        </Link>

        <Link
          href={destinationRoute}
          onClick={handleStart}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
          style={{ background: theme.color }}
        >
          <span>Start</span>
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
