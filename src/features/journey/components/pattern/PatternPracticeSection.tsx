'use client';

import React from 'react';
import Link from 'next/link';
import {
  Target,
  Sparkles,
  Play,
  CalendarCheck,
  Timer,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { PatternLearningDetail } from '../../services/pattern-learning-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { ProblemModel } from '@/src/curriculum/types';

interface PatternPracticeSectionProps {
  readonly detail: PatternLearningDetail;
  readonly areaSlug: string;
  readonly subtopicSlug: string;
  readonly patternSlug: string;
  readonly userId: string;
  readonly sprintDifficulty: 'all' | 'easy' | 'medium' | 'hard';
  readonly onSetSprintDifficulty: (diff: 'all' | 'easy' | 'medium' | 'hard') => void;
  readonly onLaunchSprint: () => void;
  readonly isGeneratingSprint: boolean;
  readonly addedToPlan: boolean;
  readonly onAddToDailyPlan: () => void;
  readonly curatedTier: 'all' | 'learn' | 'practice' | 'master';
  readonly onSetCuratedTier: (tier: 'all' | 'learn' | 'practice' | 'master') => void;
  readonly activeProblems: ProblemModel[];
  readonly isLight: boolean;
}

export function PatternPracticeSection({
  detail,
  areaSlug,
  subtopicSlug,
  patternSlug,
  userId,
  sprintDifficulty,
  onSetSprintDifficulty,
  onLaunchSprint,
  isGeneratingSprint,
  addedToPlan,
  onAddToDailyPlan,
  curatedTier,
  onSetCuratedTier,
  activeProblems,
  isLight,
}: PatternPracticeSectionProps) {
  const platformColors: Record<string, { text: string; bg: string; border: string }> = {
    leetcode: { text: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)' },
    codechef: { text: '#F97316', bg: 'rgba(249, 115, 22, 0.1)', border: 'rgba(249, 115, 22, 0.2)' },
    codeforces: { text: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)' },
    geeksforgeeks: { text: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)' },
    dsa: { text: '#6366F1', bg: 'rgba(99, 102, 241, 0.1)', border: 'rgba(99, 102, 241, 0.2)' },
  };

  return (
    <section id="practice-section" className="flex flex-col gap-6 scroll-mt-16">
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
            <Target size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-500">05 //</span>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                Stage 5: Practice This Pattern ({detail.totalAvailable} Problems)
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Seamlessly transition from concept mastery into targeted Arena drills.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={onAddToDailyPlan}
            data-testid="add-pattern-to-plan-btn"
            className="py-2 px-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--card)] text-[var(--text-primary)] border border-[var(--border)] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <CalendarCheck size={14} className="text-emerald-500" />
            <span>{addedToPlan ? 'Added to Plan ✓' : "Add to Today's Plan"}</span>
          </button>

          <Link
            href={`/interview?mode=topic&area=${encodeURIComponent(areaSlug)}&subtopic=${encodeURIComponent(subtopicSlug)}&pattern=${encodeURIComponent(patternSlug)}`}
            data-testid="interview-this-pattern-btn"
            className="py-2 px-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--card)] text-[var(--text-primary)] border border-[var(--border)] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Timer size={14} className="text-[var(--accent)]" />
            <span>Interview This Pattern</span>
          </Link>

          <Link
            href={detail.practiceUrl}
            className="py-2 px-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <span>Practice All in Arena</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── READY TO PRACTICE? SPRINT GENERATOR ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                Ready to Practice?
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                Smart Pattern Sprint (5 Problems)
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Adaptive problem selection calibrated to your current mastery state.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty Segments */}
            <div className="flex items-center bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
              {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => onSetSprintDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    sprintDifficulty === diff
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {diff === 'all' ? 'Mixed' : diff}
                </button>
              ))}
            </div>

            {/* Launch Button */}
            <button
              type="button"
              onClick={onLaunchSprint}
              disabled={isGeneratingSprint}
              data-testid="start-smart-sprint-btn"
              className="py-2 px-3.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Play size={12} className="fill-white" />
              <span>Start Sprint</span>
            </button>
          </div>
        </div>

        {/* Quick Direct Difficulty Links */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)] flex-wrap">
          <span className="font-semibold text-[11px]">Direct Links:</span>
          <Link
            href={detail.easyPracticeUrl}
            className="px-2.5 py-0.5 rounded-md bg-[var(--surface)] hover:bg-[var(--border)] text-emerald-600 dark:text-emerald-400 font-semibold transition-colors"
          >
            Practice Easy
          </Link>
          <Link
            href={detail.mediumPracticeUrl}
            className="px-2.5 py-0.5 rounded-md bg-[var(--surface)] hover:bg-[var(--border)] text-amber-600 dark:text-amber-400 font-semibold transition-colors"
          >
            Practice Medium
          </Link>
          <Link
            href={detail.hardPracticeUrl}
            className="px-2.5 py-0.5 rounded-md bg-[var(--surface)] hover:bg-[var(--border)] text-rose-600 dark:text-rose-400 font-semibold transition-colors"
          >
            Practice Hard
          </Link>
        </div>
      </div>

      {/* ── CURATED PROBLEM TIERS: COMPACT DEVELOPER ROWS ── */}
      <div className="flex flex-col gap-3">
        {/* Tier Tabs */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: `All Problems (${detail.curatedProblems.all.length})` },
              { id: 'learn', label: `Learn Tier (${detail.curatedProblems.learn.length})` },
              { id: 'practice', label: `Practice Tier (${detail.curatedProblems.practice.length})` },
              { id: 'master', label: `Master Tier (${detail.curatedProblems.master.length})` },
            ] as const
          ).map((tab) => {
            const isActive = curatedTier === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSetCuratedTier(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Problem Rows Table Container */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-4 w-12 text-center">Status</th>
                  <th className="py-2.5 px-4">Problem</th>
                  <th className="py-2.5 px-3 w-28">Platform</th>
                  <th className="py-2.5 px-3 w-24">Difficulty</th>
                  <th className="py-2.5 px-4 w-32 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {activeProblems.slice(0, 15).map((problem) => {
                  const solved = PracticeEngineService.isProblemSolved(problem, userId);
                  const platKey = (problem.platform || 'leetcode').toLowerCase();
                  const platConfig = platformColors[platKey] || platformColors.dsa;

                  const diffBadgeColors: Record<string, string> = {
                    Easy: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                    Medium: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
                    Hard: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
                  };

                  const diffStr = problem.difficulty || problem.level || 'Medium';
                  const diffClass = diffBadgeColors[diffStr] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-[var(--surface)]/60 transition-colors group"
                    >
                      {/* Solved Status */}
                      <td className="py-2.5 px-4 text-center">
                        {solved ? (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500 inline-block"
                            aria-label="Solved"
                          />
                        ) : (
                          <div
                            className="w-3.5 h-3.5 rounded-full border-2 border-[var(--border)] inline-block group-hover:border-[var(--text-muted)] transition-colors"
                            aria-label="Unsolved"
                          />
                        )}
                      </td>

                      {/* Problem Title & Optimal Idea */}
                      <td className="py-2.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {problem.title}
                          </span>
                          {problem.optimalIdea && (
                            <span className="text-[11px] text-[var(--text-muted)] line-clamp-1 mt-0.5">
                              {problem.optimalIdea}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-2.5 px-3">
                        <span
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider inline-block border"
                          style={{
                            color: platConfig.text,
                            backgroundColor: platConfig.bg,
                            borderColor: platConfig.border,
                          }}
                        >
                          {problem.platform || 'dsa'}
                        </span>
                      </td>

                      {/* Difficulty */}
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border inline-block ${diffClass}`}>
                          {diffStr}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/practice?area=${detail.category.slug}&subtopic=${detail.subtopic.slug}&pattern=${detail.pattern.slug}&search=${encodeURIComponent(problem.title)}`}
                            className="text-xs font-bold text-[var(--accent)] hover:opacity-80 transition-opacity flex items-center gap-1"
                          >
                            <span>Drill in Arena</span>
                            <ArrowRight size={12} />
                          </Link>

                          {problem.url && (
                            <a
                              href={problem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded transition-colors"
                              title="Open on platform"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* View All Link */}
          {activeProblems.length > 15 && (
            <div className="p-3 bg-[var(--surface)] border-t border-[var(--border)] text-center">
              <Link
                href={detail.practiceUrl}
                className="text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1.5"
              >
                <span>View all {activeProblems.length} problems in Practice Arena</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
