'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X, Layers, Map, Filter, Check, Sparkles } from 'lucide-react';

export type BandFilterOption = 'all' | 'foundations' | 'pattern-building' | 'data-structures' | 'algorithmic-thinking' | 'advanced';
export type StatusFilterOption = 'all' | 'in-progress' | 'mastered' | 'not-started';

interface JourneyToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBand: BandFilterOption;
  onSelectBand: (band: BandFilterOption) => void;
  selectedStatus: StatusFilterOption;
  onSelectStatus: (status: StatusFilterOption) => void;
  viewMode: 'curriculum' | 'adaptive';
  onViewModeChange: (mode: 'curriculum' | 'adaptive') => void;
  totalFilteredCount: number;
  totalCount: number;
}

const BAND_TABS: { id: BandFilterOption; label: string; count: number }[] = [
  { id: 'all', label: 'All Bands', count: 25 },
  { id: 'foundations', label: 'Foundations', count: 5 },
  { id: 'pattern-building', label: 'Pattern Building', count: 7 },
  { id: 'data-structures', label: 'Data Structures', count: 6 },
  { id: 'algorithmic-thinking', label: 'Algorithms', count: 6 },
  { id: 'advanced', label: 'Advanced', count: 1 },
];

const STATUS_OPTIONS: { id: StatusFilterOption; label: string }[] = [
  { id: 'all', label: 'All Status' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'mastered', label: 'Mastered' },
  { id: 'not-started', label: 'Not Started' },
];

export function JourneyToolbar({
  searchQuery,
  onSearchChange,
  selectedBand,
  onSelectBand,
  selectedStatus,
  onSelectStatus,
  viewMode,
  onViewModeChange,
  totalFilteredCount,
  totalCount,
}: JourneyToolbarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener: ⌘K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        // Only trigger if not already typing in another input/textarea
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

  const isFiltering = searchQuery.trim().length > 0 || selectedBand !== 'all' || selectedStatus !== 'all';

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top row: Search Bar, Status Filter, and View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-muted)]">
            <Search size={15} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 25 areas, 61 subtopics, 113 patterns..."
            aria-label="Search curriculum by area, subtopic, or pattern"
            className="w-full pl-9 pr-14 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Right side controls: Status filter & View Switcher */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1.5 rounded-xl">
            <Filter size={13} className="text-[var(--text-muted)]" />
            <select
              value={selectedStatus}
              onChange={(e) => onSelectStatus(e.target.value as StatusFilterOption)}
              aria-label="Filter areas by mastery status"
              className="bg-transparent text-xs font-semibold text-[var(--text-primary)] focus:outline-none cursor-pointer pr-1"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-[var(--surface)] text-[var(--text-primary)]">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
            <button
              type="button"
              onClick={() => onViewModeChange('curriculum')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'curriculum'
                  ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={viewMode === 'curriculum'}
            >
              <Map size={13} />
              <span>Curriculum</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('adaptive')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'adaptive'
                  ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={viewMode === 'adaptive'}
            >
              <Layers size={13} />
              <span>Adaptive Graph</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Curriculum Band Tabs (Only in curriculum view) */}
      {viewMode === 'curriculum' && (
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            {BAND_TABS.map((tab) => {
              const isActive = selectedBand === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectBand(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] font-semibold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] border border-transparent'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtering Summary Badge */}
          {isFiltering && (
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)]">
                Showing <strong className="text-[var(--text-primary)]">{totalFilteredCount}</strong> of {totalCount} areas
              </span>
              <button
                type="button"
                onClick={() => {
                  onSearchChange('');
                  onSelectBand('all');
                  onSelectStatus('all');
                }}
                className="text-[11px] font-mono text-[var(--accent)] hover:underline"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
