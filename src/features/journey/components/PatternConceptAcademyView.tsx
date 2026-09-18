'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Target,
  Clock,
  Cpu,
  AlertTriangle,
  RotateCcw,
  Play,
  Brain,
  Lightbulb,
  CheckSquare,
  XCircle,
  TrendingUp,
  FolderTree,
  ChevronRight,
} from 'lucide-react';
import {
  PatternLearningAdapterService,
  PatternLearningDetail,
  PatternMasteryState,
} from '../services/pattern-learning-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { useSettings } from '@/src/context/SettingsContext';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useToast } from '@/src/context/ToastContext';
import { ProblemModel } from '@/src/curriculum/types';

interface PatternConceptAcademyViewProps {
  readonly initialDetail: PatternLearningDetail;
  readonly areaSlug: string;
  readonly subtopicSlug: string;
  readonly patternSlug: string;
}

interface WorkedExampleStep {
  readonly stepNumber: number;
  readonly state: string;
  readonly explanation: string;
  readonly invariant: string;
}

interface WorkedExampleData {
  readonly problemTitle: string;
  readonly prompt: string;
  readonly input: string;
  readonly output: string;
  readonly steps: WorkedExampleStep[];
}

function getWorkedExample(patternSlug: string, patternTitle: string): WorkedExampleData {
  const slug = patternSlug.toLowerCase();

  if (slug.includes('opposite-pointer') || slug.includes('two-sum') || slug.includes('two-pointer')) {
    return {
      problemTitle: 'Two Sum II (Sorted Array Target)',
      prompt: 'Given a 1-indexed sorted array of integers nums, find two numbers such that they add up to a specific target number.',
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: 'Indices [1, 2] (values 2 + 7 = 9)',
      steps: [
        {
          stepNumber: 1,
          state: 'left = 0 (2), right = 3 (15)',
          explanation: 'Sum = 2 + 15 = 17. Since 17 > target (9), right pointer must move left to decrease sum.',
          invariant: 'Sum > target: decrement right',
        },
        {
          stepNumber: 2,
          state: 'left = 0 (2), right = 2 (11)',
          explanation: 'Sum = 2 + 11 = 13. Still 13 > 9. Decrement right pointer again.',
          invariant: 'Sum > target: decrement right',
        },
        {
          stepNumber: 3,
          state: 'left = 0 (2), right = 1 (7)',
          explanation: 'Sum = 2 + 7 = 9. Exactly matches target! Return [0 + 1, 1 + 1] = [1, 2].',
          invariant: 'Sum == target: solution confirmed',
        },
      ],
    };
  }

  if (slug.includes('sliding-window')) {
    return {
      problemTitle: 'Longest Substring Without Repeating Characters',
      prompt: 'Given a string s, find the length of the longest substring without duplicate characters.',
      input: 's = "abcabcbb"',
      output: '3 (substring "abc")',
      steps: [
        {
          stepNumber: 1,
          state: 'left = 0, right = 0..2 ("abc")',
          explanation: 'All characters unique. Window expands freely. Max length recorded: 3.',
          invariant: 'Window condition valid: expand right',
        },
        {
          stepNumber: 2,
          state: 'left = 0, right = 3 (sees duplicate "a")',
          explanation: 'Duplicate "a" encountered. Contract window from left until duplicate is removed.',
          invariant: 'Violation detected: advance left pointer',
        },
        {
          stepNumber: 3,
          state: 'left = 1, right = 3 ("bca")',
          explanation: 'Window valid again with unique elements. Max length remains 3.',
          invariant: 'Window restored: continue traversal',
        },
      ],
    };
  }

  if (slug.includes('binary-search')) {
    return {
      problemTitle: 'Find Target in Monotonic Range',
      prompt: 'Given a sorted array of integers nums and a target value, return the index of target if found.',
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      output: 'Index 4',
      steps: [
        {
          stepNumber: 1,
          state: 'low = 0, high = 5, mid = 2 (nums[2] = 3)',
          explanation: 'nums[mid] = 3 < 9. Target lies strictly in the right half. low = mid + 1 = 3.',
          invariant: 'Eliminate left half [0..2]',
        },
        {
          stepNumber: 2,
          state: 'low = 3, high = 5, mid = 4 (nums[4] = 9)',
          explanation: 'nums[mid] = 9 == target. Target identified at index 4.',
          invariant: 'Search target found at mid = 4',
        },
      ],
    };
  }

  // Generic fallback worked example
  return {
    problemTitle: `Canonical Application: ${patternTitle}`,
    prompt: `Demonstrates the core state transitions and algorithmic guarantees of the ${patternTitle} pattern on standard test vectors.`,
    input: 'Input Sequence: [A, B, C, D] with boundary constraints',
    output: 'Optimal solution satisfying all invariant predicates',
    steps: [
      {
        stepNumber: 1,
        state: 'Initial state: base pointers & bounds primed',
        explanation: 'Verify input pre-conditions and initialize auxiliary accumulator or index tracking.',
        invariant: 'Pre-conditions valid & search boundaries established',
      },
      {
        stepNumber: 2,
        state: 'Iterative transition step',
        explanation: 'Apply pattern transition rules to progress monotonically toward termination.',
        invariant: 'Loop invariant preserved across each element visit',
      },
      {
        stepNumber: 3,
        state: 'Terminal boundary reached',
        explanation: 'All candidate configurations evaluated without redundant work. Return optimal result.',
        invariant: 'Correctness guarantee verified',
      },
    ],
  };
}

export function PatternConceptAcademyView({
  initialDetail,
  areaSlug,
  subtopicSlug,
  patternSlug,
}: PatternConceptAcademyViewProps) {
  const router = useRouter();
  const { userId } = useActiveUser();
  const { settings } = useSettings();
  const { toast } = useToast();

  const isLight = settings.appearance.theme === 'light';

  // Real-time detail state loaded with active user
  const detail = useMemo(() => {
    const refreshed = PatternLearningAdapterService.getPatternLearningDetail(
      areaSlug,
      subtopicSlug,
      patternSlug,
      userId || 'default_user'
    );
    return refreshed || initialDetail;
  }, [areaSlug, subtopicSlug, patternSlug, userId, initialDetail]);

  // Template Language Tab State
  const [activeLang, setActiveLang] = useState<'python' | 'java' | 'cpp'>('python');
  const [copied, setCopied] = useState(false);

  // Curated Problems Filter Tab State
  const [curatedTier, setCuratedTier] = useState<'all' | 'learn' | 'practice' | 'master'>('all');

  // Quick Sprint Generator State
  const [sprintDifficulty, setSprintDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [isGeneratingSprint, setIsGeneratingSprint] = useState(false);

  // Worked example trace for this pattern
  const workedExample = useMemo(() => {
    return getWorkedExample(detail.pattern.slug, detail.pattern.title);
  }, [detail.pattern.slug, detail.pattern.title]);

  // Copy code to clipboard
  const handleCopyCode = async () => {
    const template = detail.templateBundle[activeLang];
    try {
      await navigator.clipboard.writeText(template.code);
      setCopied(true);
      toast('Code template copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast('Failed to copy to clipboard', 'error');
    }
  };

  // Launch 5-Problem Practice Sprint
  const handleLaunchSprint = () => {
    setIsGeneratingSprint(true);
    try {
      const session = PracticeEngineService.generatePracticeSession(userId || 'default_user', 5, {
        area: detail.category.slug,
        subtopic: detail.subtopic.slug,
        pattern: detail.pattern.slug,
        difficulty: sprintDifficulty,
      });

      PracticeEngineService.saveActiveSession(userId || 'default_user', session);
      toast(`Started 5-Problem Sprint on ${detail.pattern.title}!`, 'success');
      router.push(`/practice?area=${detail.category.slug}&subtopic=${detail.subtopic.slug}&pattern=${detail.pattern.slug}`);
    } catch {
      toast('Failed to launch practice session', 'error');
    } finally {
      setIsGeneratingSprint(false);
    }
  };

  // Mastery badge styling
  const getMasteryBadge = (state: PatternMasteryState) => {
    switch (state) {
      case 'Strong':
        return {
          label: 'Strong Mastery',
          bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-500',
        };
      case 'Developing':
        return {
          label: 'Developing',
          bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500',
        };
      case 'Learning':
        return {
          label: 'Learning',
          bg: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          dot: 'bg-indigo-500',
        };
      case 'Needs Revision':
        return {
          label: 'Needs Revision',
          bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500',
        };
      case 'Not Started':
      default:
        return {
          label: 'Not Started',
          bg: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30',
          dot: 'bg-slate-500',
        };
    }
  };

  const mastery = getMasteryBadge(detail.masteryState);

  // Curated problems active list
  const activeProblems: ProblemModel[] = useMemo(() => {
    switch (curatedTier) {
      case 'learn':
        return detail.curatedProblems.learn;
      case 'practice':
        return detail.curatedProblems.practice;
      case 'master':
        return detail.curatedProblems.master;
      case 'all':
      default:
        return detail.curatedProblems.all;
    }
  }, [curatedTier, detail.curatedProblems]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8">
        
        {/* ── 1. BREADCRUMBS & NAVIGATION ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--text-muted)]"
        >
          <Link
            href="/journey"
            className="hover:text-indigo-500 transition-colors flex items-center gap-1"
          >
            <Layers size={13} />
            <span>Journey</span>
          </Link>
          <span>/</span>
          <Link
            href={`/journey/${detail.category.slug}`}
            className="hover:text-indigo-500 transition-colors truncate max-w-[180px] sm:max-w-none"
          >
            {detail.category.title}
          </Link>
          <span>/</span>
          <Link
            href={`/journey/${detail.category.slug}`}
            className="hover:text-indigo-500 transition-colors truncate max-w-[180px] sm:max-w-none"
          >
            {detail.subtopic.title}
          </Link>
          <span>/</span>
          <span className="text-indigo-500 font-bold truncate max-w-[200px] sm:max-w-none">
            {detail.pattern.title}
          </span>
        </nav>

        {/* ── 2. HERO / PATTERN HEADER WITH AUTHENTIC TELEMETRY HUD ── */}
        <header
          className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6 shadow-sm"
          style={{
            background: isLight
              ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(99, 102, 241, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, var(--card) 100%)',
            borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                  {detail.category.title}
                </span>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  {detail.subtopic.title}
                </span>
                <span className="text-xs text-[var(--text-muted)]">•</span>
                <span className="text-xs text-[var(--text-muted)] font-semibold">
                  {detail.pattern.difficulty} Difficulty
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                {detail.pattern.title}
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {detail.pattern.overview || detail.pattern.shortDescription}
              </p>
            </div>

            {/* Mastery State & Real Telemetry HUD Card */}
            <div className="flex flex-col gap-3 bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] min-w-[280px] lg:w-80 shadow-sm shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Mastery Telemetry
                </span>
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black border ${mastery.bg}`}
                >
                  <span className={`w-2 h-2 rounded-full ${mastery.dot}`} />
                  <span>{mastery.label}</span>
                </div>
              </div>

              {/* Progress & Solved Ratio */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-medium">Curriculum Solved:</span>
                  <strong className="text-sm font-black text-[var(--text-primary)]">
                    {detail.solvedCount} / {detail.totalAvailable}{' '}
                    <span className="text-xs font-bold text-indigo-500">
                      ({detail.solvedPercentage}%)
                    </span>
                  </strong>
                </div>
                <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, detail.solvedPercentage)}%` }}
                  />
                </div>
              </div>

              {/* Telemetry Stats (Accuracy & Recent Attempts) */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border)] text-xs">
                <div className="flex flex-col">
                  <span className="text-[var(--text-muted)]">Session Accuracy:</span>
                  <span className="font-bold text-[var(--text-primary)] mt-0.5">
                    {detail.accuracyPercent !== null
                      ? `${detail.accuracyPercent}%`
                      : 'No attempts'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[var(--text-muted)]">Recent Attempts:</span>
                  <span className="font-bold text-[var(--text-primary)] mt-0.5">
                    {detail.recentAttemptsCount} logged
                  </span>
                </div>
              </div>

              {/* Header CTAs */}
              <div className="flex items-center gap-2 pt-2">
                <Link
                  href={detail.practiceUrl}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Practice Pattern</span>
                  <ArrowRight size={13} />
                </Link>
                <button
                  type="button"
                  onClick={handleLaunchSprint}
                  disabled={isGeneratingSprint}
                  className="py-2.5 px-3 rounded-xl bg-[var(--card)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center gap-1 cursor-pointer"
                  title="Generate 5-problem quick sprint"
                >
                  <Sparkles size={13} className="text-amber-500" />
                  <span>Sprint</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ── 3. CONNECTED BANNERS: MISTAKE REVIEW & SRS REVISION ── */}
        {(detail.hasMistakes || detail.hasDueRevision) && (
          <div className="flex flex-col gap-3">
            {detail.hasMistakes && (
              <div
                className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                style={{
                  background: isLight ? 'rgba(239, 68, 68, 0.06)' : 'rgba(239, 68, 68, 0.12)',
                  borderColor: isLight ? '#FCA5A5' : 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-500 shrink-0 mt-0.5">
                    <AlertTriangle size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-black text-rose-600 dark:text-rose-400">
                      Your Mistakes ({detail.mistakesCount} Recorded)
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      You have logged recent mistake attempts on this pattern. Review and fix
                      edge-case misconceptions before tackling new challenges.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {detail.mistakesList.slice(0, 3).map((m) => (
                        <span
                          key={m.problem.id}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] truncate max-w-[200px]"
                        >
                          {m.problem.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={detail.mistakePracticeUrl}
                  className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-sm"
                >
                  <span>Practice Mistakes</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}

            {detail.hasDueRevision && (
              <div
                className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                style={{
                  background: isLight ? 'rgba(139, 92, 246, 0.06)' : 'rgba(139, 92, 246, 0.12)',
                  borderColor: isLight ? '#C4B5FD' : 'rgba(139, 92, 246, 0.3)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-500 shrink-0 mt-0.5">
                    <RotateCcw size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-black text-purple-600 dark:text-purple-400">
                      SRS Revision Due ({detail.dueRevisionCount} Problems)
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Spaced repetition intervals are active for this pattern. Reinforce your memory
                      today to prevent retention degradation.
                    </p>
                  </div>
                </div>

                <Link
                  href={detail.revisionPracticeUrl}
                  className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-sm"
                >
                  <span>Start Revision</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── 4. MASTERY WORKFLOW STAGES NAVIGATOR ── */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 overflow-x-auto gap-3 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5 text-indigo-500 shrink-0">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center text-[10px] font-black">
              1
            </span>
            <span>Understand</span>
          </span>
          <span className="text-[var(--border)]">→</span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Worked Example</span>
          </span>
          <span className="text-[var(--border)]">→</span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Template</span>
          </span>
          <span className="text-[var(--border)]">→</span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[10px]">
              4
            </span>
            <span>Walkthrough</span>
          </span>
          <span className="text-[var(--border)]">→</span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[10px]">
              5
            </span>
            <span>Practice</span>
          </span>
          <span className="text-[var(--border)]">→</span>
          <span className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-[10px]">
              6
            </span>
            <span>Review</span>
          </span>
        </div>

        {/* ── STAGE 1: UNDERSTAND (INTUITION & RECOGNITION) ── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Lightbulb size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Stage 1: Understand the Concept &amp; Intuition
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Core mental model, complexity bounds, and diagnostic recognition checklist.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Core Intuition Card */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm font-black text-indigo-500">
                <Brain size={16} />
                <span>Core Intuition &amp; Mental Model</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-medium">
                {detail.pattern.intuition}
              </p>
              {detail.pattern.mentalModel && (
                <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-[var(--text-primary)] font-bold block mb-1">
                    Mental Invariant:
                  </strong>
                  {detail.pattern.mentalModel}
                </div>
              )}

              {/* Time & Space Complexity Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
                      <Clock size={12} /> Time Complexity
                    </span>
                    <span className="text-xs font-black text-indigo-500 px-2 py-0.5 rounded-md bg-indigo-500/10">
                      {detail.templateBundle.timeComplexity}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                    Monotonic bounds enforce strict execution ceilings.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
                      <Cpu size={12} /> Space Complexity
                    </span>
                    <span className="text-xs font-black text-emerald-500 px-2 py-0.5 rounded-md bg-emerald-500/10">
                      {detail.templateBundle.spaceComplexity}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                    Auxiliary memory overhead requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Recognition Checklist Card */}
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-amber-500">
                <CheckSquare size={16} />
                <span>Recognition Checklist</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Identify this pattern when you encounter these problem traits:
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                {(detail.pattern.recognitionSignals || []).map((signal: string, sIdx: number) => (
                  <div key={sIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* When to Use vs When NOT to Use Comparative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-emerald-500/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-500">
                <CheckCircle2 size={16} />
                <span>When to Use</span>
              </div>
              <div className="flex flex-col gap-2">
                {(detail.pattern.whenToUse || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--card)] border border-rose-500/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-rose-500">
                <XCircle size={16} />
                <span>When NOT to Use (Alternatives)</span>
              </div>
              <div className="flex flex-col gap-2">
                {(detail.pattern.whenNotToUse || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STAGE 2: SEE AN EXAMPLE (WORKED TRACE) ── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Stage 2: See a Small Worked Example
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Trace invariant changes step-by-step on a canonical problem instance.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
              <div>
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">
                  Trace Example
                </span>
                <h3 className="text-lg font-black text-[var(--text-primary)]">
                  {workedExample.problemTitle}
                </h3>
              </div>
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Canonical Walkthrough
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {workedExample.prompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-mono">
                <span className="text-[var(--text-muted)] font-sans text-[11px] uppercase tracking-wider block mb-1">
                  Input:
                </span>
                <code className="text-indigo-400 font-bold">
                  {workedExample.input}
                </code>
              </div>
              <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-mono">
                <span className="text-[var(--text-muted)] font-sans text-[11px] uppercase tracking-wider block mb-1">
                  Expected Output:
                </span>
                <code className="text-emerald-400 font-bold">
                  {workedExample.output}
                </code>
              </div>
            </div>

            {/* Step-by-Step Table / Cards */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Step-by-Step Execution Invariants
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {workedExample.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-black shrink-0">
                        {step.stepNumber}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-mono text-indigo-400 font-semibold">
                          {step.state}
                        </span>
                        <span className="text-[var(--text-secondary)] mt-0.5">
                          {step.explanation}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-[var(--card)] text-emerald-400 border border-[var(--border)] shrink-0 self-start sm:self-auto">
                      {step.invariant}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STAGE 3: LEARN THE TEMPLATE (JAVA, PYTHON, C++) ── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Code2 size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Stage 3: Learn the Algorithmic Template
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Concise, production-grade canonical templates in Java, Python, and C++.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] overflow-hidden flex flex-col shadow-sm">
            {/* Language Switcher Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)] flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {(['python', 'java', 'cpp'] as const).map((lang) => {
                  const isActive = activeLang === lang;
                  const labels = { python: 'Python 3', java: 'Java', cpp: 'C++ 17/20' };
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]'
                      }`}
                    >
                      {labels[lang]}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Template</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="p-4 sm:p-6 bg-[#0F172A] text-slate-100 overflow-x-auto max-w-full font-mono text-xs sm:text-sm leading-relaxed">
              <pre className="overflow-x-auto">
                <code>{detail.templateBundle[activeLang].code}</code>
              </pre>
            </div>

            {/* Implementation Notes & Invariants */}
            <div className="p-5 bg-[var(--surface)] border-t border-[var(--border)] flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Key Implementation Invariants &amp; Rules
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                {detail.templateBundle[activeLang].keyNotes.map((note: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── STAGE 4: TRY A GUIDED EXAMPLE (WALKTHROUGH & PITFALLS) ── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Stage 4: Guided Walkthrough, Pitfalls &amp; Interview Tips
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Step-by-step strategy, frequent traps to evade, and interviewer evaluation criteria.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Common Mistakes & Traps */}
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-rose-500">
                <AlertTriangle size={16} />
                <span>Common Mistakes &amp; Edge Cases</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Watch out for these subtle traps commonly penalized in live coding rounds:
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                {(detail.pattern.commonMistakes || []).map((mistake: string, mIdx: number) => (
                  <div key={mIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <XCircle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{mistake}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Interview Tips */}
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-black text-indigo-500">
                <Sparkles size={16} />
                <span>Interview Pro Tips &amp; Verbalization</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                How to communicate this approach clearly to your interviewer:
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                {(detail.pattern.interviewTips || []).map((tip: string, tIdx: number) => (
                  <div key={tIdx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                    <CheckCircle2 size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STAGE 5: PRACTICE (CURATED TIERS & SMART SPRINTS) ── */}
        <section className="flex flex-col gap-6" id="practice-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Target size={20} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                  Stage 5: Practice This Pattern ({detail.totalAvailable} Problems)
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Seamlessly transition from concept mastery into targeted Arena drills.
                </p>
              </div>
            </div>

            <Link
              href={detail.practiceUrl}
              className="py-3 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition-all self-start sm:self-auto"
            >
              <span>Practice All in Arena</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Quick 5 Sprint Generator Bar */}
          <div
            className="p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              background: isLight ? '#F8FAFC' : 'var(--surface)',
              borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-500">
                <Sparkles size={18} />
              </div>
              <div className="flex flex-col">
                <strong className="text-sm font-black text-[var(--text-primary)]">
                  Smart Pattern Sprint (5 Problems)
                </strong>
                <span className="text-xs text-[var(--text-muted)]">
                  Adaptive problem selection balancing difficulty progression
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center bg-[var(--card)] p-1 rounded-xl border border-[var(--border)]">
                {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSprintDifficulty(diff)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      sprintDifficulty === diff
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {diff === 'all' ? 'Mixed' : diff}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleLaunchSprint}
                disabled={isGeneratingSprint}
                className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Play size={12} className="fill-white" />
                <span>Start Sprint</span>
              </button>
            </div>
          </div>

          {/* Curated Problem Tier Tabs */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 overflow-x-auto">
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
                    onClick={() => setCuratedTier(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-500/15 text-indigo-500 border border-indigo-500/30'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Problem Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeProblems.slice(0, 15).map((problem) => {
                const solved = PracticeEngineService.isProblemSolved(
                  problem,
                  userId || 'default_user'
                );
                const platformColors: Record<string, string> = {
                  leetcode: '#10B981',
                  codechef: '#F97316',
                  codeforces: '#3B82F6',
                  geeksforgeeks: '#2F9E44',
                };
                const platformKey = problem.platform || 'leetcode';
                const platColor = platformColors[platformKey] || '#6366F1';

                return (
                  <div
                    key={problem.id}
                    className="p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all hover:shadow-md bg-[var(--card)]"
                    style={{
                      borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{
                            background: `${platColor}18`,
                            color: platColor,
                          }}
                        >
                          {problem.platform || 'dsa'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">
                            {problem.difficulty || problem.level}
                          </span>
                          {solved ? (
                            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              <CheckCircle2 size={11} /> Solved
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                              Unsolved
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1">
                        {problem.title}
                      </h4>

                      <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                        {problem.optimalIdea || problem.notes || `Drill canonical challenge on ${problem.platform || 'dsa master'}.`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                      <Link
                        href={`/practice?area=${detail.category.slug}&subtopic=${detail.subtopic.slug}&pattern=${detail.pattern.slug}&search=${encodeURIComponent(problem.title)}`}
                        className="text-xs font-black text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                      >
                        <span>Drill in Arena</span>
                        <ArrowRight size={11} />
                      </Link>

                      {problem.url && (
                        <a
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1"
                        >
                          <span>Platform</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {activeProblems.length > 15 && (
              <div className="flex justify-center pt-2">
                <Link
                  href={detail.practiceUrl}
                  className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1"
                >
                  <span>View all {activeProblems.length} problems in Practice Arena</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── STAGE 6: REVIEW & KNOWLEDGE GRAPH (CURRICULUM GRAPH) ── */}
        <section className="flex flex-col gap-6 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <FolderTree size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Stage 6: Review &amp; Connected Knowledge Graph
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Navigate prerequisites, next progressions, and structurally related algorithmic patterns.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Prerequisites */}
            <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Prerequisites
              </span>
              {detail.prerequisites.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {detail.prerequisites.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.url}
                      className="p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all"
                    >
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                          {p.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {p.difficulty}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" />
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
            <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Related Patterns
              </span>
              {detail.relatedPatterns.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {detail.relatedPatterns.slice(0, 4).map((r) => (
                    <Link
                      key={r.slug}
                      href={r.url}
                      className="p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all"
                    >
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                          {r.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {r.difficulty}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" />
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
            <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Next Progression
              </span>
              {detail.nextPatterns.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {detail.nextPatterns.map((n) => (
                    <Link
                      key={n.slug}
                      href={n.url}
                      className="p-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] flex items-center justify-between gap-2 transition-all"
                    >
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                          {n.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {n.difficulty}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" />
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
        </section>

      </div>
    </div>
  );
}
