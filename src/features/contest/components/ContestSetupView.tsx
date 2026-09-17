'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Zap,
  Target,
  ShieldAlert,
  Play,
  Layers,
  Sparkles,
  CheckCircle2,
  Info,
  Swords,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { ContestConfig, ContestFormat, ContestMode } from '../types/contest.types';

interface ContestSetupViewProps {
  initialConfig?: Partial<ContestConfig>;
  onStartContest: (config: ContestConfig) => void;
  onCancel: () => void;
}

export function ContestSetupView({
  initialConfig,
  onStartContest,
  onCancel,
}: ContestSetupViewProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  const [title, setTitle] = useState(initialConfig?.title || 'Custom Algorithmic Clash');
  const [durationMinutes, setDurationMinutes] = useState<number>(initialConfig?.durationMinutes || 60);
  const [problemCount, setProblemCount] = useState<number>(initialConfig?.problemCount || 3);
  const [difficultyMix, setDifficultyMix] = useState<ContestConfig['difficultyMix']>(
    initialConfig?.difficultyMix || 'Mixed'
  );
  const [topic, setTopic] = useState<string>(initialConfig?.topic || 'General DSA');
  const [mode, setMode] = useState<ContestMode>(initialConfig?.mode || 'real');
  const [targetWeaknesses, setTargetWeaknesses] = useState<boolean>(initialConfig?.targetWeaknesses ?? false);

  const durationOptions = [30, 60, 90, 120];
  const problemOptions = [2, 3, 4, 5];
  const difficultyOptions: Array<ContestConfig['difficultyMix']> = [
    'Easy',
    'Easy+Medium',
    'Mixed',
    'Medium-heavy',
    'Hard',
  ];
  const topicOptions = [
    'General DSA',
    'Arrays',
    'Strings',
    'Linked List',
    'Stack / Queue',
    'Trees',
    'Graphs',
    'Dynamic Programming',
  ];

  const handleStart = () => {
    const config: ContestConfig = {
      id: `custom_${Date.now()}`,
      title,
      description: `Custom ${durationMinutes}m contest with ${problemCount} problems (${difficultyMix}) on ${topic}.`,
      format: (initialConfig?.format as ContestFormat) || 'custom',
      durationMinutes,
      problemCount,
      difficultyMix,
      topic,
      mode,
      targetWeaknesses,
    };

    onStartContest(config);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* ── HEADER ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Lobby
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/30 flex items-center gap-1.5">
          <Swords size={13} /> Contest Configuration
        </span>
      </div>

      <div
        className="rounded-3xl p-6 sm:p-10 border flex flex-col gap-8"
        style={{
          background: 'var(--card)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isLight ? '0 8px 30px rgba(0,0,0,0.04)' : '0 16px 40px rgba(0,0,0,0.3)',
        }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Configure Your Contest
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Customize duration, difficulty curve, and topic targeting before the timer starts.
          </p>
        </div>

        {/* ── 1. CONTEST TITLE ─────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)]">
            Contest Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3.5 rounded-xl border bg-[var(--surface)] text-[var(--text-primary)] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
            style={{ borderColor: isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>

        {/* ── 2. DURATION SELECTOR ─────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
            <Clock size={14} className="text-blue-500" /> Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {durationOptions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDurationMinutes(d)}
                className="py-3 px-4 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center gap-1"
                style={{
                  background: durationMinutes === d ? (isLight ? '#0F172A' : '#FFFFFF') : 'var(--surface)',
                  color: durationMinutes === d ? (isLight ? '#FFFFFF' : '#0F172A') : 'var(--text-primary)',
                  borderColor: durationMinutes === d ? 'transparent' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-base font-extrabold">{d}m</span>
                <span className="text-[10px] opacity-70">
                  {d === 30 ? 'Speed Sprint' : d === 60 ? 'Standard' : d === 90 ? 'Deep Dive' : 'Marathon'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. PROBLEM COUNT & DIFFICULTY ───────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Problem Count */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Layers size={14} className="text-purple-500" /> Problem Count
            </label>
            <div className="grid grid-cols-4 gap-2">
              {problemOptions.map((pc) => (
                <button
                  key={pc}
                  type="button"
                  onClick={() => setProblemCount(pc)}
                  className="py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer text-center"
                  style={{
                    background: problemCount === pc ? 'var(--primary)' : 'var(--surface)',
                    color: problemCount === pc ? '#FFFFFF' : 'var(--text-primary)',
                    borderColor: problemCount === pc ? 'transparent' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {pc} Problems
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Mix */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
              <Target size={14} className="text-amber-500" /> Difficulty Curve
            </label>
            <select
              value={difficultyMix}
              onChange={(e) => setDifficultyMix(e.target.value as ContestConfig['difficultyMix'])}
              className="p-3 rounded-xl border bg-[var(--surface)] text-[var(--text-primary)] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-pink-500"
              style={{ borderColor: isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.1)' }}
            >
              {difficultyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── 4. TOPIC SELECTION ───────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-muted)]">
            Topic Focus
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topicOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className="py-2 px-3 rounded-xl border font-semibold text-xs text-center transition-all cursor-pointer truncate"
                style={{
                  background: topic === t ? 'rgba(236, 72, 153, 0.15)' : 'var(--surface)',
                  color: topic === t ? '#EC4899' : 'var(--text-primary)',
                  borderColor: topic === t ? '#EC4899' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                  fontWeight: topic === t ? 700 : 500,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── 5. WEAKNESS TARGETING & MODE ─────────────────────────── */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500 mt-0.5">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-bold text-xs text-[var(--text-primary)]">
                Target My Learning Weaknesses
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Uses genuine Mistake Intelligence signals to prioritize topics where you have active mistake history.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTargetWeaknesses(!targetWeaknesses)}
            className="px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap self-end sm:self-center"
            style={{
              background: targetWeaknesses ? '#EC4899' : 'var(--card)',
              color: targetWeaknesses ? '#FFFFFF' : 'var(--text-primary)',
              borderColor: targetWeaknesses ? 'transparent' : isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)',
            }}
          >
            {targetWeaknesses ? '✓ Enabled' : 'Disabled'}
          </button>
        </div>

        {/* ── 6. TRANSPARENT SCORING NOTE ──────────────────────────── */}
        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-xs text-blue-400 flex items-start gap-3">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[var(--text-primary)] block mb-0.5">Official Scoring Model:</strong>
            100 points per solved problem. Total ICPC Penalty = Solve time in minutes + 20 minutes for every failed attempt prior to acceptance.
          </div>
        </div>

        {/* ── 7. START ACTION ──────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl font-bold text-xs border bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
              boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)',
            }}
          >
            <Play size={16} /> Begin Contest Countdown
          </button>
        </div>
      </div>
    </div>
  );
}
