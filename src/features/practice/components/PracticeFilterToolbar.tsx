'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';
import { SubtopicModel, PatternModel } from '@/src/curriculum/types';

interface PracticeFilterToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  subtopic: string;
  onSubtopicChange: (val: string) => void;
  availableSubtopics: SubtopicModel[];
  pattern: string;
  onPatternChange: (val: string) => void;
  availablePatterns: PatternModel[];
  difficulty: 'all' | 'Easy' | 'Medium' | 'Hard';
  onDifficultyChange: (val: 'all' | 'Easy' | 'Medium' | 'Hard') => void;
  status: 'all' | 'unsolved' | 'solved';
  onStatusChange: (val: 'all' | 'unsolved' | 'solved') => void;
  onResetFilters: () => void;
}

export function PracticeFilterToolbar({
  search,
  onSearchChange,
  subtopic,
  onSubtopicChange,
  availableSubtopics,
  pattern,
  onPatternChange,
  availablePatterns,
  difficulty,
  onDifficultyChange,
  status,
  onStatusChange,
  onResetFilters,
}: PracticeFilterToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener: ⌘K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasActiveFilters =
    search.trim() !== '' ||
    subtopic !== 'all' ||
    pattern !== 'all' ||
    difficulty !== 'all' ||
    status !== 'all';

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* ── Top Filters Row ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
            <Search size={14} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search by title, pattern, topic, or #..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            data-testid="search-input"
            aria-label="Search problems"
            className="w-full pl-9 pr-12 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Subtopic Filter */}
        <div className="shrink-0">
          <select
            aria-label="Filter by subtopic"
            value={subtopic}
            onChange={(e) => onSubtopicChange(e.target.value)}
            data-testid="subtopic-select"
            className="bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)] cursor-pointer max-w-[200px]"
          >
            <option value="all">Subtopic: All Subtopics</option>
            {availableSubtopics.map((s) => (
              <option key={s.id} value={s.slug || s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Pattern Filter */}
        <div className="shrink-0">
          <select
            aria-label="Filter by pattern"
            value={pattern}
            onChange={(e) => onPatternChange(e.target.value)}
            data-testid="pattern-select"
            className="bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)] cursor-pointer max-w-[200px]"
          >
            <option value="all">Pattern: All Patterns</option>
            {availablePatterns.map((p) => (
              <option key={p.id} value={p.slug || p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="shrink-0">
          <select
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value as any)}
            data-testid="difficulty-select"
            aria-label="Filter by difficulty"
            className="bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)] cursor-pointer"
          >
            <option value="all">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="shrink-0">
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as any)}
            data-testid="status-select"
            aria-label="Filter by status"
            className="bg-[var(--surface)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)] cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      {/* ── Active Filter Removable Chips ───────────────────────────── */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium mr-1">
            Active Filters:
          </span>

          {search && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              <span>Query: &quot;{search}&quot;</span>
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="hover:text-rose-400"
                aria-label="Remove search filter"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {subtopic !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              <span>Subtopic: {subtopic}</span>
              <button
                type="button"
                onClick={() => onSubtopicChange('all')}
                className="hover:text-rose-400"
                aria-label="Remove subtopic filter"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {pattern !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              <span>Pattern: {pattern}</span>
              <button
                type="button"
                onClick={() => onPatternChange('all')}
                className="hover:text-rose-400"
                aria-label="Remove pattern filter"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {difficulty !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              <span>Difficulty: {difficulty}</span>
              <button
                type="button"
                onClick={() => onDifficultyChange('all')}
                className="hover:text-rose-400"
                aria-label="Remove difficulty filter"
              >
                <X size={11} />
              </button>
            </span>
          )}

          {status !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]">
              <span>Status: {status}</span>
              <button
                type="button"
                onClick={() => onStatusChange('all')}
                className="hover:text-rose-400"
                aria-label="Remove status filter"
              >
                <X size={11} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] font-mono text-[var(--accent)] hover:underline ml-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
