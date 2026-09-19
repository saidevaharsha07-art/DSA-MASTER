'use client';

import React from 'react';
import {
  Check,
  Code2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Target,
  Sparkles,
  Inbox,
  RotateCcw,
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { getPlatformMeta } from '@/src/curriculum/services';

interface ProblemTableListProps {
  problems: ProblemModel[];
  totalFiltered: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isProblemChecked: (prob: ProblemModel) => boolean;
  onToggleSolved: (prob: ProblemModel) => void;
  onOpenWorkspace: (prob: ProblemModel) => void;
  getProblemNumber: (prob: ProblemModel) => string;
  onResetFilters: () => void;
  platformColor?: string;
  platformName?: string;
}

export function ProblemTableList({
  problems,
  totalFiltered,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  isProblemChecked,
  onToggleSolved,
  onOpenWorkspace,
  getProblemNumber,
  onResetFilters,
  platformColor = '#3B82F6',
  platformName = 'All Platforms',
}: ProblemTableListProps) {
  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)] gap-3">
        <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)]">
          <Inbox size={24} />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
          No problems matched your current filters
        </h3>
        <p className="text-xs text-[var(--text-muted)] max-w-sm">
          Try expanding your search query, clearing specific subtopics or patterns, or adjusting the difficulty level.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--accent)] text-[var(--text-inverse)] hover:brightness-110 transition-all shadow-xs cursor-pointer mt-1"
        >
          <RotateCcw size={13} />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ── Table Header / Summary ── */}
      <div className="flex items-center justify-between gap-2 px-1 text-xs text-[var(--text-muted)] font-medium">
        <div className="flex items-center gap-2">
          <span>
            Showing{' '}
            <strong className="text-[var(--text-primary)] font-semibold">
              {(currentPage - 1) * pageSize + 1}
            </strong>
            –
            <strong className="text-[var(--text-primary)] font-semibold">
              {Math.min(currentPage * pageSize, totalFiltered)}
            </strong>{' '}
            of{' '}
            <strong className="text-[var(--text-primary)] font-semibold">
              {totalFiltered.toLocaleString()}
            </strong>{' '}
            problems
          </span>
          {platformName && (
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] px-2 py-0.5 rounded bg-[var(--surface-elevated)] border border-[var(--border)]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: platformColor }} />
              {platformName}
            </span>
          )}
        </div>

        <span className="font-mono text-[11px]">
          Page {currentPage} of {totalPages || 1}
        </span>
      </div>

      {/* ── Problems Stack / Dense Row List ── */}
      <div className="flex flex-col gap-2">
        {problems.map((prob) => {
          const isSolved = isProblemChecked(prob);
          const platformMeta = getPlatformMeta(prob);
          const diff = (prob.difficulty || prob.level || 'Medium').toLowerCase();
          const diffColor =
            diff === 'easy' || prob.level === 'Learn'
              ? 'var(--success)'
              : diff === 'hard' || prob.level === 'Master'
              ? 'var(--danger)'
              : 'var(--warning)';

          return (
            <div
              key={prob.id}
              data-testid="problem-row"
              className={`group flex items-center justify-between p-3 sm:px-4 sm:py-3 rounded-xl transition-all ${
                isSolved
                  ? 'bg-emerald-500/[0.04] border border-emerald-500/20 hover:border-emerald-500/40'
                  : 'bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)]'
              }`}
            >
              {/* Left Details: Status Check, ID, Title, Curriculum Metadata */}
              <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                {/* Solved Toggle Checkbox */}
                <button
                  type="button"
                  onClick={() => onToggleSolved(prob)}
                  aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                    isSolved
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'border-2 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-muted)] text-transparent'
                  }`}
                >
                  {isSolved ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <div className="w-1 h-1 rounded-xs bg-[var(--border)] opacity-0 group-hover:opacity-100" />
                  )}
                </button>

                {/* Monospace Problem Number */}
                <span className="font-mono text-xs font-semibold text-[var(--text-muted)] shrink-0 w-12 sm:w-16">
                  {getProblemNumber(prob)}
                </span>

                {/* Title & Tags */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenWorkspace(prob)}
                      className={`text-left text-xs sm:text-sm font-semibold truncate hover:text-[var(--accent)] transition-colors cursor-pointer ${
                        isSolved
                          ? 'line-through text-[var(--text-muted)]'
                          : 'text-[var(--text-primary)]'
                      }`}
                      title={prob.title}
                    >
                      {prob.title}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[var(--text-muted)] truncate">
                    <span
                      className="font-semibold shrink-0"
                      style={{ color: platformMeta.color }}
                    >
                      {platformMeta.name}
                    </span>
                    <span className="text-[var(--border-strong)]">•</span>
                    <span className="truncate">{prob.categoryTitle || 'General'}</span>
                    {prob.patternTitle && (
                      <>
                        <span className="text-[var(--border-strong)] hidden sm:inline">•</span>
                        <span className="truncate hidden sm:inline-flex items-center gap-1 text-[var(--text-secondary)]">
                          <Target size={10} />
                          {prob.patternTitle}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Difficulty, XP, Solve Action, External Platform Link */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md"
                  style={{
                    color: diffColor,
                    backgroundColor: `${diffColor}18`,
                    border: `1px solid ${diffColor}33`,
                  }}
                >
                  {prob.difficulty || prob.level || 'Medium'}
                </span>

                <span className="hidden md:inline-block text-[11px] font-mono font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                  +{prob.xp || 50} XP
                </span>

                <button
                  type="button"
                  onClick={() => onOpenWorkspace(prob)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--surface-elevated)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--text-inverse)] border border-[var(--border)] hover:border-[var(--accent)] transition-all cursor-pointer shadow-xs"
                >
                  <Code2 size={12} />
                  <span className="hidden sm:inline">Solve</span>
                </button>

                {prob.url && (
                  <a
                    href={prob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
                    title={`Open on ${platformMeta.name}`}
                    aria-label={`Open on ${platformMeta.name}`}
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Pagination Bar ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--border)]">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none py-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = Math.min(currentPage - 2 + i, totalPages - 4 + i);
              }
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
