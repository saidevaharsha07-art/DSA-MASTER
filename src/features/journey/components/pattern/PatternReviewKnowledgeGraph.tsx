'use client';

import React from 'react';
import Link from 'next/link';
import {
  FolderTree,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Compass,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { PatternLearningDetail } from '../../services/pattern-learning-adapter.service';

interface PatternReviewKnowledgeGraphProps {
  readonly detail: PatternLearningDetail;
  readonly isLight: boolean;
}

export function PatternReviewKnowledgeGraph({
  detail,
  isLight,
}: PatternReviewKnowledgeGraphProps) {
  const {
    pattern,
    category,
    subtopic,
    prerequisites,
    relatedPatterns,
    nextPatterns,
    hasMistakes,
    mistakesCount,
    mistakesList,
    mistakePracticeUrl,
    hasDueRevision,
    dueRevisionCount,
    revisionPracticeUrl,
  } = detail;

  // Canonical prev & next pattern links
  const prevPattern = prerequisites.length > 0 ? prerequisites[prerequisites.length - 1] : null;
  const nextPattern = nextPatterns.length > 0 ? nextPatterns[0] : null;

  return (
    <section id="stage-review" className="flex flex-col gap-6 scroll-mt-16 pt-6 border-t border-[var(--border)]">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
          <FolderTree size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-indigo-500">06 //</span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Stage 6: Review &amp; Connected Knowledge Graph
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Navigate prerequisites, next progressions, and structurally related algorithmic patterns.
          </p>
        </div>
      </div>

      {/* ── CONNECTED BANNERS: MISTAKES & REVISION ── */}
      {(hasMistakes || hasDueRevision) && (
        <div className="flex flex-col gap-3">
          {hasMistakes && (
            <div
              className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs"
              style={{
                background: isLight ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.1)',
                borderColor: isLight ? '#FCA5A5' : 'rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-500 shrink-0 mt-0.5">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-rose-600 dark:text-rose-400">
                    Your Mistakes ({mistakesCount} Recorded)
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    You have logged recent mistake attempts on this pattern. Review and fix edge cases.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mistakesList.slice(0, 3).map((m) => (
                      <span
                        key={m.problem.id}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] truncate max-w-[200px]"
                      >
                        {m.problem.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href={mistakePracticeUrl}
                className="py-2 px-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-xs"
              >
                <span>Practice Mistakes</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {hasDueRevision && (
            <div
              className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-xs"
              style={{
                background: isLight ? 'rgba(147, 51, 234, 0.05)' : 'rgba(147, 51, 234, 0.1)',
                borderColor: isLight ? '#D8B4FE' : 'rgba(147, 51, 234, 0.3)',
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-500 shrink-0 mt-0.5">
                  <RotateCcw size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    SRS Revision Due ({dueRevisionCount} Problems)
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Spaced repetition intervals are active for this pattern. Reinforce your retention today.
                  </p>
                </div>
              </div>

              <Link
                href={revisionPracticeUrl}
                className="py-2 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-xs"
              >
                <span>Start Revision</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* ── COMPACT KNOWLEDGE GRAPH (Prerequisites -> Current -> Next) ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Curriculum Progression Graph
          </span>
          <span className="text-[11px] font-semibold text-[var(--text-muted)]">
            {subtopic.title}
          </span>
        </div>

        {/* 3-Stage Connected Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Node 1: Prerequisite */}
          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Prerequisite
            </span>
            {prerequisites.length > 0 ? (
              <Link
                href={prerequisites[0].url}
                className="font-bold text-xs text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
              >
                {prerequisites[0].title}
              </Link>
            ) : (
              <span className="text-xs text-[var(--text-muted)] italic">
                Foundational (No hard prereq)
              </span>
            )}
            <span className="text-[10px] text-[var(--text-muted)]">
              {prerequisites.length > 0 ? prerequisites[0].difficulty : 'Foundational Level'}
            </span>
          </div>

          {/* Node 2: Current Pattern (Focal) */}
          <div className="p-3.5 rounded-xl bg-[var(--accent)]/10 border-2 border-[var(--accent)] flex flex-col gap-1.5 shadow-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--accent)]">
              Current Pattern
            </span>
            <span className="font-extrabold text-xs text-[var(--text-primary)] line-clamp-1">
              {pattern.title}
            </span>
            <span className="text-[10px] font-bold text-[var(--accent)]">
              {pattern.difficulty} Difficulty
            </span>
          </div>

          {/* Node 3: Next Progression */}
          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Next Progression
            </span>
            {nextPatterns.length > 0 ? (
              <Link
                href={nextPatterns[0].url}
                className="font-bold text-xs text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors line-clamp-1"
              >
                {nextPatterns[0].title}
              </Link>
            ) : (
              <span className="text-xs text-[var(--text-muted)] italic">
                Culmination of subtopic
              </span>
            )}
            <span className="text-[10px] text-[var(--text-muted)]">
              {nextPatterns.length > 0 ? nextPatterns[0].difficulty : 'Subtopic Milestone'}
            </span>
          </div>
        </div>
      </div>

      {/* ── 3-COLUMN DETAILS: PREREQUISITES, RELATED PATTERNS, NEXT PROGRESSION ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Prerequisites */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Prerequisites
          </span>
          {prerequisites.length > 0 ? (
            <div className="flex flex-col gap-2">
              {prerequisites.map((p) => (
                <Link
                  key={p.slug}
                  href={p.url}
                  className="p-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all group"
                >
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {p.difficulty}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[var(--text-muted)] italic">
              Foundational pattern (No hard prerequisites)
            </span>
          )}
        </div>

        {/* Related Patterns */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Related Patterns
          </span>
          {relatedPatterns.length > 0 ? (
            <div className="flex flex-col gap-2">
              {relatedPatterns.slice(0, 4).map((r) => (
                <Link
                  key={r.slug}
                  href={r.url}
                  className="p-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all group"
                >
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                      {r.title}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {r.difficulty}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[var(--text-muted)] italic">
              No direct related patterns linked
            </span>
          )}
        </div>

        {/* Next Progression Patterns */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Next Progression
          </span>
          {nextPatterns.length > 0 ? (
            <div className="flex flex-col gap-2">
              {nextPatterns.map((n) => (
                <Link
                  key={n.slug}
                  href={n.url}
                  className="p-2.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all group"
                >
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] truncate">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {n.difficulty}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          ) : (
            <span className="text-xs text-[var(--text-muted)] italic">
              Culmination pattern for this subtopic
            </span>
          )}
        </div>
      </div>

      {/* ── CONCEPT NAVIGATION FOOTER ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {prevPattern ? (
            <Link
              href={prevPattern.url}
              className="flex items-center gap-1.5 font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Previous: {prevPattern.title}</span>
            </Link>
          ) : (
            <Link
              href={`/journey/${category.slug}`}
              className="flex items-center gap-1.5 font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to {subtopic.title}</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/journey/${category.slug}`}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-semibold"
          >
            Back to {category.title}
          </Link>

          {nextPattern && (
            <Link
              href={nextPattern.url}
              className="flex items-center gap-1.5 font-bold text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              <span>Next: {nextPattern.title}</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
