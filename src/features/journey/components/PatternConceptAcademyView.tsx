'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  PatternLearningAdapterService,
  PatternLearningDetail,
} from '../services/pattern-learning-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { StudyPlanOrchestratorService } from '@/src/features/study-plan/services/study-plan.service';
import { useSettings } from '@/src/context/SettingsContext';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useToast } from '@/src/context/ToastContext';
import { ProblemModel } from '@/src/curriculum/types';

// Subcomponents
import { PatternAcademyHero } from './pattern/PatternAcademyHero';
import { PatternStageNav } from './pattern/PatternStageNav';
import { PatternUnderstandSection } from './pattern/PatternUnderstandSection';
import {
  PatternWorkedExampleSection,
  WorkedExampleData,
} from './pattern/PatternWorkedExampleSection';
import { PatternTemplateSection } from './pattern/PatternTemplateSection';
import { PatternGuidedWalkthroughSection } from './pattern/PatternGuidedWalkthroughSection';
import { PatternPracticeSection } from './pattern/PatternPracticeSection';
import { PatternReviewKnowledgeGraph } from './pattern/PatternReviewKnowledgeGraph';
import { PatternMasterySidebar } from './pattern/PatternMasterySidebar';

interface PatternConceptAcademyViewProps {
  readonly initialDetail: PatternLearningDetail;
  readonly areaSlug: string;
  readonly subtopicSlug: string;
  readonly patternSlug: string;
}

function getWorkedExample(patternSlug: string, patternTitle: string): WorkedExampleData {
  const slug = patternSlug.toLowerCase();

  if (
    slug.includes('opposite-pointer') ||
    slug.includes('two-sum') ||
    slug.includes('two-pointer')
  ) {
    return {
      problemTitle: 'Two Sum II (Sorted Array Target)',
      prompt:
        'Given a 1-indexed sorted array of integers nums, find two numbers such that they add up to a specific target number.',
      input: 'nums = [2, 7, 11, 15], target = 9',
      output: 'Indices [1, 2] (values 2 + 7 = 9)',
      steps: [
        {
          stepNumber: 1,
          state: 'left = 0 (2), right = 3 (15)',
          explanation:
            'Sum = 2 + 15 = 17. Since 17 > target (9), right pointer must move left to decrease sum.',
          invariant: 'Sum > target: decrement right',
        },
        {
          stepNumber: 2,
          state: 'left = 0 (2), right = 2 (11)',
          explanation:
            'Sum = 2 + 11 = 13. Still 13 > 9. Decrement right pointer again.',
          invariant: 'Sum > target: decrement right',
        },
        {
          stepNumber: 3,
          state: 'left = 0 (2), right = 1 (7)',
          explanation:
            'Sum = 2 + 7 = 9. Exactly matches target! Return [0 + 1, 1 + 1] = [1, 2].',
          invariant: 'Sum == target: solution confirmed',
        },
      ],
    };
  }

  if (slug.includes('sliding-window')) {
    return {
      problemTitle: 'Longest Substring Without Repeating Characters',
      prompt:
        'Given a string s, find the length of the longest substring without duplicate characters.',
      input: 's = "abcabcbb"',
      output: '3 (substring "abc")',
      steps: [
        {
          stepNumber: 1,
          state: 'left = 0, right = 0..2 ("abc")',
          explanation:
            'All characters unique. Window expands freely. Max length recorded: 3.',
          invariant: 'Window condition valid: expand right',
        },
        {
          stepNumber: 2,
          state: 'left = 0, right = 3 (sees duplicate "a")',
          explanation:
            'Duplicate "a" encountered. Contract window from left until duplicate is removed.',
          invariant: 'Violation detected: advance left pointer',
        },
        {
          stepNumber: 3,
          state: 'left = 1, right = 3 ("bca")',
          explanation:
            'Window valid again with unique elements. Max length remains 3.',
          invariant: 'Window restored: continue traversal',
        },
      ],
    };
  }

  if (slug.includes('binary-search')) {
    return {
      problemTitle: 'Find Target in Monotonic Range',
      prompt:
        'Given a sorted array of integers nums and a target value, return the index of target if found.',
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      output: 'Index 4',
      steps: [
        {
          stepNumber: 1,
          state: 'low = 0, high = 5, mid = 2 (nums[2] = 3)',
          explanation:
            'nums[mid] = 3 < 9. Target lies strictly in the right half. low = mid + 1 = 3.',
          invariant: 'Eliminate left half [0..2]',
        },
        {
          stepNumber: 2,
          state: 'low = 3, high = 5, mid = 4 (nums[4] = 9)',
          explanation:
            'nums[mid] = 9 == target. Target identified at index 4.',
          invariant: 'Search target found at mid = 4',
        },
      ],
    };
  }

  // Canonical fallback worked example
  return {
    problemTitle: `Canonical Application: ${patternTitle}`,
    prompt: `Demonstrates the core state transitions and algorithmic guarantees of the ${patternTitle} pattern on standard test vectors.`,
    input: 'Input Sequence: [A, B, C, D] with boundary constraints',
    output: 'Optimal solution satisfying all invariant predicates',
    steps: [
      {
        stepNumber: 1,
        state: 'Initial state: base pointers & bounds primed',
        explanation:
          'Verify input pre-conditions and initialize auxiliary accumulator or index tracking.',
        invariant: 'Pre-conditions valid & search boundaries established',
      },
      {
        stepNumber: 2,
        state: 'Iterative transition step',
        explanation:
          'Apply pattern transition rules to progress monotonically toward termination.',
        invariant: 'Loop invariant preserved across each element visit',
      },
      {
        stepNumber: 3,
        state: 'Terminal boundary reached',
        explanation:
          'All candidate configurations evaluated without redundant work. Return optimal result.',
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

  // Live real-time detail state
  const detail = useMemo(() => {
    const refreshed = PatternLearningAdapterService.getPatternLearningDetail(
      areaSlug,
      subtopicSlug,
      patternSlug,
      userId || 'default_user'
    );
    return refreshed || initialDetail;
  }, [areaSlug, subtopicSlug, patternSlug, userId, initialDetail]);

  // Stage Navigator State
  const [activeStageId, setActiveStageId] = useState('stage-understand');

  const handleSelectStage = useCallback((stageId: string) => {
    setActiveStageId(stageId);
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Code Template Language Tabs
  const [activeLang, setActiveLang] = useState<'python' | 'java' | 'cpp'>('python');
  const [copied, setCopied] = useState(false);

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

  // Curated Problems Filter Tabs
  const [curatedTier, setCuratedTier] = useState<'all' | 'learn' | 'practice' | 'master'>('all');

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

  // Quick Sprint Generator State
  const [sprintDifficulty, setSprintDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [isGeneratingSprint, setIsGeneratingSprint] = useState(false);
  const [addedToPlan, setAddedToPlan] = useState(false);

  const handleAddToDailyPlan = () => {
    try {
      StudyPlanOrchestratorService.addCustomPatternActivity(userId || 'default_user', {
        areaTitle: detail.category?.title || 'Algorithms',
        areaSlug,
        subtopicTitle: detail.subtopic?.title || 'Patterns',
        subtopicSlug,
        patternTitle: detail.pattern?.title || patternSlug,
        patternSlug,
        type: 'LEARN',
      });
      setAddedToPlan(true);
      toast(`Added "${detail.pattern?.title || patternSlug}" to Today's Study Plan!`, 'success');
      setTimeout(() => setAddedToPlan(false), 3000);
    } catch {
      toast('Failed to add pattern to daily plan', 'error');
    }
  };

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
      router.push(
        `/practice?area=${detail.category.slug}&subtopic=${detail.subtopic.slug}&pattern=${detail.pattern.slug}`
      );
    } catch {
      toast('Failed to launch practice session', 'error');
    } finally {
      setIsGeneratingSprint(false);
    }
  };

  // Worked example trace data
  const workedExample = useMemo(() => {
    return getWorkedExample(detail.pattern.slug, detail.pattern.title);
  }, [detail.pattern.slug, detail.pattern.title]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* ── 1. COMPACT PATTERN ACADEMY HERO ── */}
        <PatternAcademyHero
          detail={detail}
          areaSlug={areaSlug}
          subtopicSlug={subtopicSlug}
          patternSlug={patternSlug}
          addedToPlan={addedToPlan}
          onAddToDailyPlan={handleAddToDailyPlan}
          onLaunchSprint={handleLaunchSprint}
          isGeneratingSprint={isGeneratingSprint}
          isLight={isLight}
        />

        {/* ── 2. LEARNING PROGRESS STAGES NAVIGATOR ── */}
        <PatternStageNav
          activeStageId={activeStageId}
          onSelectStage={handleSelectStage}
        />

        {/* ── 3. MAIN WORKSPACE: 2-COLUMN DESKTOP GRID / 1-COLUMN MOBILE STACK ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Primary Column: Linear Pedagogical Journey */}
          <main className="lg:col-span-8 flex flex-col gap-10">
            {/* Stage 1: Understand */}
            <PatternUnderstandSection detail={detail} />

            {/* Stage 2: See an Example */}
            <PatternWorkedExampleSection example={workedExample} />

            {/* Stage 3: Learn the Template */}
            <PatternTemplateSection
              templateBundle={detail.templateBundle}
              activeLang={activeLang}
              onSelectLang={setActiveLang}
              onCopyCode={handleCopyCode}
              copied={copied}
            />

            {/* Stage 4: Guided Walkthrough & Pitfalls */}
            <PatternGuidedWalkthroughSection detail={detail} />

            {/* Stage 5: Practice This Pattern */}
            <PatternPracticeSection
              detail={detail}
              areaSlug={areaSlug}
              subtopicSlug={subtopicSlug}
              patternSlug={patternSlug}
              userId={userId || 'default_user'}
              sprintDifficulty={sprintDifficulty}
              onSetSprintDifficulty={setSprintDifficulty}
              onLaunchSprint={handleLaunchSprint}
              isGeneratingSprint={isGeneratingSprint}
              addedToPlan={addedToPlan}
              onAddToDailyPlan={handleAddToDailyPlan}
              curatedTier={curatedTier}
              onSetCuratedTier={setCuratedTier}
              activeProblems={activeProblems}
              isLight={isLight}
            />

            {/* Stage 6: Review & Connected Knowledge Graph */}
            <PatternReviewKnowledgeGraph detail={detail} isLight={isLight} />
          </main>

          {/* Right / Secondary Rail: Factual Mastery & Pattern Info */}
          <div className="hidden lg:block lg:col-span-4">
            <PatternMasterySidebar
              detail={detail}
              areaSlug={areaSlug}
              subtopicSlug={subtopicSlug}
              patternSlug={patternSlug}
              onLaunchSprint={handleLaunchSprint}
              isGeneratingSprint={isGeneratingSprint}
              addedToPlan={addedToPlan}
              onAddToDailyPlan={handleAddToDailyPlan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
