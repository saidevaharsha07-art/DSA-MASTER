'use client';

import React from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Target,
  Swords,
  AlertTriangle,
  Brain,
  Trophy,
  Shuffle,
  History,
} from 'lucide-react';
import { PracticeMode } from '../services/practice-engine.service';

export interface PlatformConfig {
  id: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';
  label: string;
  color: string;
  count: number;
}

export const PRACTICE_PLATFORMS: PlatformConfig[] = [
  { id: 'leetcode', label: 'LeetCode', color: '#10B981', count: 1000 },
  { id: 'codechef', label: 'CodeChef', color: '#F97316', count: 1000 },
  { id: 'codeforces', label: 'Codeforces', color: '#3B82F6', count: 1000 },
  { id: 'geeksforgeeks', label: 'GeeksForGeeks', color: '#2F9E44', count: 1000 },
];

const MODES: { id: PracticeMode; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'recommended', label: 'Recommended', icon: <Sparkles size={13} />, badge: 'AI' },
  { id: 'area', label: 'By Area', icon: <BookOpen size={13} /> },
  { id: 'subtopic', label: 'By Subtopic', icon: <Layers size={13} /> },
  { id: 'pattern', label: 'By Pattern', icon: <Target size={13} /> },
  { id: 'platform', label: 'By Platform', icon: <Swords size={13} /> },
  { id: 'mistakes', label: 'Mistake Review', icon: <AlertTriangle size={13} />, badge: 'Fix' },
  { id: 'weakness', label: 'Weak Areas', icon: <Brain size={13} />, badge: 'Boost' },
  { id: 'interview', label: 'Interview Practice', icon: <Trophy size={13} />, badge: 'Mock' },
  { id: 'random', label: 'Random', icon: <Shuffle size={13} /> },
  { id: 'history', label: 'History', icon: <History size={13} /> },
];

interface PracticeModeNavProps {
  activeMode: PracticeMode;
  onSelectMode: (mode: PracticeMode) => void;
  selectedPlatform: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';
  onSelectPlatform: (platform: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks') => void;
  areas: { id: string; name: string; number: number; solvedCount: number; totalCount: number }[];
  selectedAreaId: string | null;
  onSelectArea: (areaId: string) => void;
  divisions?: { id: string; name: string; solvedCount: number; totalCount: number }[];
  selectedDivisionId?: string | null;
  onSelectDivision?: (divisionId: string) => void;
  totalPlatformProblems: number;
}

export function PracticeModeNav({
  activeMode,
  onSelectMode,
  selectedPlatform,
  onSelectPlatform,
  areas,
  selectedAreaId,
  onSelectArea,
  divisions,
  selectedDivisionId,
  onSelectDivision,
  totalPlatformProblems,
}: PracticeModeNavProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* ── 1. PRIMARY MODE SEGMENTED CONTROL ──────────────────────── */}
      <div
        data-testid="practice-modes-nav"
        className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] overflow-x-auto scrollbar-none shadow-xs"
        role="tablist"
        aria-label="Practice Modes Navigation"
      >
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold px-2 shrink-0">
          Mode:
        </span>
        {MODES.map((m) => {
          const isSelected = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMode(m.id)}
              data-testid={`mode-tab-${m.id}`}
              role="tab"
              aria-selected={isSelected}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[var(--accent)] text-[var(--text-inverse)] shadow-xs font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
              {m.badge && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-black/20 text-white'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {m.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 2. PLATFORM TABS & LEARNING AREA / DIVISION DROPDOWN ────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        {/* Platform Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold shrink-0">
            Platform:
          </span>
          <div className="flex items-center gap-1.5">
            {PRACTICE_PLATFORMS.map((p) => {
              const isSelected = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectPlatform(p.id)}
                  data-testid={`platform-tab-${p.id}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)] border shadow-xs font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-transparent'
                  }`}
                  style={{
                    borderColor: isSelected ? p.color : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: p.color }}
                  />
                  <span>{p.label}</span>
                  <span className="text-[10px] font-mono opacity-70">
                    ({p.count.toLocaleString()})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Area / Division Dropdown Jump */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <label htmlFor="area-select-input" className="text-[11px] font-mono text-[var(--text-muted)] shrink-0 font-medium">
            {selectedPlatform === 'codeforces' ? 'Division:' : 'Learning Area:'}
          </label>
          {selectedPlatform === 'codeforces' && divisions && onSelectDivision ? (
            <select
              id="area-select-input"
              value={selectedDivisionId || 'all'}
              onChange={(e) => onSelectDivision(e.target.value)}
              data-testid="division-select"
              className="bg-[var(--bg-subtle)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[var(--accent)] cursor-pointer"
            >
              <option value="all">🏆 All Divisions ({totalPlatformProblems} problems)</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.solvedCount}/{d.totalCount} solved)
                </option>
              ))}
            </select>
          ) : (
            <select
              id="area-select-input"
              value={selectedAreaId || 'all'}
              onChange={(e) => onSelectArea(e.target.value)}
              data-testid="area-select"
              className="bg-[var(--bg-subtle)] text-xs font-mono font-medium text-[var(--text-primary)] border border-[var(--border)] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[var(--accent)] cursor-pointer max-w-[280px]"
            >
              <option value="all">📚 All 25 Learning Areas ({totalPlatformProblems} problems)</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>
                  #{String(a.number).padStart(2, '0')} {a.name} ({a.solvedCount}/{a.totalCount} solved)
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
