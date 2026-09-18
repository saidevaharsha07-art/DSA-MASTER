/**
 * DSA MASTER — Daily Study Planner 2.0 Orchestrator Service
 * Coordinates existing platform intelligence into one coherent, adaptive daily learning plan.
 * Reuses:
 * - AdaptiveRoadmapService (topic graph, active stages, blockers, momentum)
 * - RevisionAdapterService (SRS spaced repetition queue and due problems)
 * - PracticeEngineService (mistake reviews, weak areas, practice sessions)
 * - RecommendationEngineService (unified recommendations)
 * - WeaknessAnalyzer (error signals and failure density)
 * - InterviewArenaService (interview readiness and quick screen simulation)
 * - CurriculumRepository (canonical 4,000 problems)
 */

import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { AdaptiveRoadmapService } from '@/src/features/journey/services/adaptive-roadmap.service';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import {
  DailyStudyPlan,
  StudyPlanItem,
  StudyPlanActivityType,
  EndOfDaySummary,
} from '../types/study-plan.types';

const STORAGE_KEY_PLAN_PREFIX = 'dsa_study_plan_v2_';
const STORAGE_KEY_BUDGET_PREFIX = 'dsa_study_plan_budget_';

export class StudyPlanOrchestratorService {
  private static inMemoryPlans: Map<string, DailyStudyPlan> = new Map();

  public static getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private static getPlanStorageKey(userId: string, dateStr: string): string {
    const cleanUser = userId || 'default_user';
    return `${STORAGE_KEY_PLAN_PREFIX}${cleanUser}_${dateStr}`;
  }

  private static getBudgetStorageKey(userId: string): string {
    const cleanUser = userId || 'default_user';
    return `${STORAGE_KEY_BUDGET_PREFIX}${cleanUser}`;
  }

  /**
   * Retrieves user's persisted time budget (default 45 minutes).
   */
  public static getTimeBudget(userId: string): number {
    try {
      const stored = storage.get<number>(this.getBudgetStorageKey(userId));
      if (typeof stored === 'number' && stored > 0) return stored;
    } catch {}
    return 45;
  }

  /**
   * Persists selected time budget.
   */
  public static setTimeBudget(userId: string, minutes: number): void {
    const validMinutes = Math.max(10, Math.min(360, minutes));
    try {
      storage.save(this.getBudgetStorageKey(userId), validMinutes);
    } catch {}
  }

  /**
   * Loads today's study plan for user. If none exists, generates a fresh plan.
   */
  public static getTodayPlan(userId: string, forceReplan = false): DailyStudyPlan {
    const cleanUserId = userId || 'default_user';
    const todayStr = this.getTodayDateString();
    const key = this.getPlanStorageKey(cleanUserId, todayStr);

    if (!forceReplan) {
      if (this.inMemoryPlans.has(key)) {
        return this.inMemoryPlans.get(key)!;
      }
      try {
        const stored = storage.get<DailyStudyPlan>(key);
        if (stored && stored.date === todayStr && Array.isArray(stored.items)) {
          this.inMemoryPlans.set(key, stored);
          return stored;
        }
      } catch {}
    }

    const budget = this.getTimeBudget(cleanUserId);
    return this.generateDailyPlan(cleanUserId, budget);
  }

  /**
   * Generates a grounded, prioritized daily plan using existing platform intelligence.
   */
  public static generateDailyPlan(userId: string, budgetMinutes?: number): DailyStudyPlan {
    const cleanUserId = userId || 'default_user';
    const isGuest = cleanUserId === 'default_user' || cleanUserId === 'guest' || cleanUserId === 'guest-user';
    const dateStr = this.getTodayDateString();
    const targetBudget = budgetMinutes || this.getTimeBudget(cleanUserId);
    const key = this.getPlanStorageKey(cleanUserId, dateStr);

    // 1. Gather signals from existing services
    let roadmapState: any = null;
    let revisionSummary: any = null;
    let mistakes: any[] = [];
    let weakAreas: any[] = [];
    let interviewReadiness: any = null;
    let recommendations: any[] = [];

    try {
      roadmapState = AdaptiveRoadmapService.computeRoadmap(cleanUserId);
      revisionSummary = RevisionAdapterService.getRevisionSummary(cleanUserId);
      mistakes = PracticeEngineService.getMistakeReviewProblems(cleanUserId);
      weakAreas = PracticeEngineService.getWeakAreas(cleanUserId)?.weakAreas || [];
      interviewReadiness = InterviewArenaService.getInterviewReadiness(cleanUserId);
      recommendations = RecommendationEngineService.getRecommendations(cleanUserId, 5);
    } catch (err) {
      // Safe fallback
    }

    const items: StudyPlanItem[] = [];
    let allocatedMinutes = 0;

    // ── ZERO STATE HANDLING ──────────────────────────────────────────
    const isZeroState = !roadmapState || roadmapState.isZeroState;

    if (isZeroState) {
      // Foundational Day-1 Plan grounded in Onboarding diagnostics
      items.push({
        id: `plan-item-1-${Date.now()}`,
        type: 'LEARN',
        title: 'Arrays & Hashing Foundation Concept',
        description: 'Understand core array memory layout, frequency hash maps, and index traversal invariants.',
        area: 'Arrays & Hashing',
        areaSlug: 'basic-arrays',
        subtopic: 'Array Traversal',
        subtopicSlug: 'array-traversal',
        pattern: 'Array Fundamentals',
        patternSlug: 'array-fundamentals',
        estimatedMinutes: 15,
        actualMinutes: 0,
        reason: 'Current roadmap focus — initial foundational baseline',
        actionUrl: '/journey/basic-arrays/array-traversal/array-fundamentals',
        status: 'pending',
      });
      allocatedMinutes += 15;

      if (targetBudget >= 30) {
        items.push({
          id: `plan-item-2-${Date.now()}`,
          type: 'PRACTICE',
          title: 'Two Sum & Traversal Problem Set',
          description: 'Solve first 2 targeted problems to solidify pointer scanning and hash table lookups.',
          area: 'Arrays & Hashing',
          areaSlug: 'basic-arrays',
          subtopic: 'Array Traversal',
          subtopicSlug: 'array-traversal',
          pattern: 'Array Fundamentals',
          patternSlug: 'array-fundamentals',
          platform: 'leetcode',
          estimatedMinutes: 15,
          actualMinutes: 0,
          reason: 'Guided implementation practice for newly learned concept',
          actionUrl: '/practice?mode=pattern&pattern=array-fundamentals',
          status: 'pending',
        });
        allocatedMinutes += 15;
      }

      if (targetBudget >= 45) {
        items.push({
          id: `plan-item-3-${Date.now()}`,
          type: 'LEARN',
          title: 'Frequency Counting & Hash Maps',
          description: 'Master count frequency patterns and anagram verification algorithms.',
          area: 'Arrays & Hashing',
          areaSlug: 'basic-arrays',
          subtopic: 'Hash Maps & Sets',
          subtopicSlug: 'hash-maps',
          pattern: 'Frequency Counting',
          patternSlug: 'frequency-counting',
          estimatedMinutes: 15,
          actualMinutes: 0,
          reason: 'Next progressive algorithmic concept in curriculum',
          actionUrl: '/journey/basic-arrays/hash-maps/frequency-counting',
          status: 'pending',
        });
        allocatedMinutes += 15;
      }

      if (targetBudget >= 60) {
        const remaining = targetBudget - allocatedMinutes;
        items.push({
          id: `plan-item-4-${Date.now()}`,
          type: 'PRACTICE',
          title: 'Hash Map Pattern Drills',
          description: 'Practice hash set deduplication and key-value mapping under timed conditions.',
          area: 'Arrays & Hashing',
          areaSlug: 'basic-arrays',
          subtopic: 'Hash Maps & Sets',
          subtopicSlug: 'hash-maps',
          pattern: 'Frequency Counting',
          patternSlug: 'frequency-counting',
          platform: 'leetcode',
          estimatedMinutes: remaining,
          actualMinutes: 0,
          reason: 'Consolidate frequency counting patterns',
          actionUrl: '/practice?mode=pattern&pattern=frequency-counting',
          status: 'pending',
        });
        allocatedMinutes += remaining;
      }

      const plan: DailyStudyPlan = {
        id: `plan-${cleanUserId}-${dateStr}`,
        userId: cleanUserId,
        date: dateStr,
        timeBudgetMinutes: targetBudget,
        totalEstimatedMinutes: allocatedMinutes,
        actualTimeSpentMinutes: 0,
        status: 'active',
        items,
        primaryMissionId: items[0]?.id || '',
        completedCount: 0,
        skippedCount: 0,
        remainingCount: items.length,
        isZeroState: true,
      };

      this.savePlan(cleanUserId, plan);
      return plan;
    }

    // ── AUTHENTIC / EXPERIENCED LEARNER PLAN GENERATION ──────────────
    // Priority 1: Overdue Revision (SRS)
    const dueProblems = revisionSummary?.dueTodayProblems || [];
    if (dueProblems.length > 0 && allocatedMinutes < targetBudget) {
      const dur = Math.min(15, targetBudget - allocatedMinutes);
      items.push({
        id: `plan-item-rev-${Date.now()}`,
        type: 'REVISE',
        title: `Spaced Repetition Review (${dueProblems.length} due)`,
        description: `Review ${dueProblems.length} scheduled concept flashcards and problem invariants to prevent memory decay.`,
        area: dueProblems[0]?.category || 'Curriculum Revision',
        areaSlug: 'revision',
        subtopic: 'Spaced Repetition',
        subtopicSlug: 'srs',
        pattern: 'Memory Retention',
        patternSlug: 'memory-retention',
        estimatedMinutes: dur,
        actualMinutes: 0,
        reason: 'Overdue revision — critical memory maintenance',
        actionUrl: '/revision',
        status: 'pending',
      });
      allocatedMinutes += dur;
    }

    // Priority 2: Prerequisite Blockers
    const blockers = roadmapState?.blockers || [];
    if (blockers.length > 0 && allocatedMinutes + 15 <= targetBudget) {
      const blocker = blockers[0];
      items.push({
        id: `plan-item-blocker-${Date.now()}`,
        type: 'LEARN',
        title: `Unblock ${blocker.topicTitle}: Core Prerequisite`,
        description: blocker.explanation || `Clear foundational requirement to unlock ${blocker.topicTitle}.`,
        area: blocker.topicTitle,
        areaSlug: blocker.topicId || 'basic-arrays',
        subtopic: 'Prerequisites',
        subtopicSlug: 'prerequisites',
        pattern: 'Foundations',
        patternSlug: 'foundations',
        estimatedMinutes: 15,
        actualMinutes: 0,
        reason: 'Prerequisite blocker — unlocks downstream roadmap progression',
        actionUrl: blocker.unlockUrl || '/roadmap',
        status: 'pending',
      });
      allocatedMinutes += 15;
    }

    // Priority 3: Active Roadmap Next Best Action
    const nextAction = roadmapState?.nextBestAction;
    if (nextAction && allocatedMinutes + 15 <= targetBudget) {
      const isConcept = nextAction.actionType === 'LEARN_CONCEPT';
      items.push({
        id: `plan-item-roadmap-${Date.now()}`,
        type: isConcept ? 'LEARN' : 'PRACTICE',
        title: nextAction.recommendedProblemTitle || nextAction.targetTopicTitle,
        description: nextAction.reason || `Follow roadmap progression for ${nextAction.targetTopicTitle}.`,
        area: nextAction.targetTopicTitle,
        areaSlug: nextAction.targetTopicId || 'basic-arrays',
        subtopic: 'Core Progression',
        subtopicSlug: 'progression',
        pattern: nextAction.targetTopicTitle,
        patternSlug: nextAction.targetTopicId || 'pattern',
        estimatedMinutes: Math.min(nextAction.estimatedMinutes || 20, targetBudget - allocatedMinutes),
        actualMinutes: 0,
        reason: 'Current roadmap focus — primary learning vector',
        actionUrl: nextAction.actionUrl || '/journey',
        status: 'pending',
      });
      allocatedMinutes += Math.min(nextAction.estimatedMinutes || 20, targetBudget - allocatedMinutes);
    }

    // Priority 4: Recent Mistakes
    if (mistakes.length > 0 && allocatedMinutes + 10 <= targetBudget) {
      const topMistake = mistakes[0];
      const dur = Math.min(15, targetBudget - allocatedMinutes);
      items.push({
        id: `plan-item-mistake-${Date.now()}`,
        type: 'REVIEW',
        title: `Review Recent Mistake: ${topMistake.problem.title}`,
        description: `Analyze failed attempt (${topMistake.failedAttemptsCount} failed submission) to fix edge-case intuition.`,
        area: topMistake.problem.category || 'Algorithms',
        areaSlug: 'mistakes',
        subtopic: 'Error Pattern Analysis',
        subtopicSlug: 'error-analysis',
        pattern: topMistake.problem.pattern || 'Pattern Pitfalls',
        patternSlug: 'pitfalls',
        platform: topMistake.problem.platform as any,
        estimatedMinutes: dur,
        actualMinutes: 0,
        reason: 'Recent mistakes — address recurrence and failed test cases',
        actionUrl: `/practice?mode=mistakes&problemId=${topMistake.problem.id}`,
        status: 'pending',
      });
      allocatedMinutes += dur;
    }

    // Priority 5: Weak Patterns
    if (weakAreas.length > 0 && allocatedMinutes + 15 <= targetBudget) {
      const topWeak = weakAreas[0];
      const dur = Math.min(20, targetBudget - allocatedMinutes);
      items.push({
        id: `plan-item-weakness-${Date.now()}`,
        type: 'PRACTICE',
        title: `Target Weak Spot: ${topWeak.patternTitle || topWeak.topicTitle}`,
        description: topWeak.reason || `Reinforce ${topWeak.topicTitle} with targeted problems to raise accuracy.`,
        area: topWeak.topicTitle,
        areaSlug: topWeak.topicId || 'weakness',
        subtopic: topWeak.subtopicTitle || 'Targeted Practice',
        subtopicSlug: 'targeted',
        pattern: topWeak.patternTitle || topWeak.topicTitle,
        patternSlug: 'weak-pattern',
        estimatedMinutes: dur,
        actualMinutes: 0,
        reason: 'Weak pattern — targeted reinforcement',
        actionUrl: `/practice?mode=weakness&topic=${encodeURIComponent(topWeak.topicId)}`,
        status: 'pending',
      });
      allocatedMinutes += dur;
    }

    // Priority 6: Interview Preparation (If budget >= 45 and time remains)
    if (targetBudget >= 45 && allocatedMinutes + 20 <= targetBudget) {
      items.push({
        id: `plan-item-interview-${Date.now()}`,
        type: 'INTERVIEW',
        title: '20-Min Interview Sprint',
        description: 'Simulate high-stakes coding interview: 1 problem, 20m clock, realistic pattern concealment.',
        area: 'Mock Technical Rounds',
        areaSlug: 'interview',
        subtopic: 'Quick Screen',
        subtopicSlug: 'quick',
        pattern: 'Timed Problem Solving',
        patternSlug: 'timed-solving',
        estimatedMinutes: 20,
        actualMinutes: 0,
        reason: 'Interview preparation — test speed and verbalization under pressure',
        actionUrl: '/interview?mode=quick',
        status: 'pending',
      });
      allocatedMinutes += 20;
    }

    // Priority 7: New Practice / Recommendations (Fill remaining time)
    if (allocatedMinutes < targetBudget) {
      const remainingTime = targetBudget - allocatedMinutes;
      const topRec = recommendations[0];
      const recTitle = topRec?.title || 'Targeted Problem Solving';
      const recArea = topRec?.category || 'Algorithms';

      items.push({
        id: `plan-item-practice-${Date.now()}`,
        type: 'PRACTICE',
        title: recTitle,
        description: topRec?.description || 'Solve targeted algorithmic problems aligned with your active mastery frontier.',
        area: recArea,
        areaSlug: 'recommended',
        subtopic: 'Mastery Progression',
        subtopicSlug: 'mastery',
        pattern: 'Recommended Practice',
        patternSlug: 'recommended',
        platform: 'leetcode',
        estimatedMinutes: remainingTime,
        actualMinutes: 0,
        reason: 'New relevant practice — next best mastery opportunity',
        actionUrl: topRec?.actionUrl || '/practice?mode=recommended',
        status: 'pending',
      });
      allocatedMinutes += remainingTime;
    }

    const plan: DailyStudyPlan = {
      id: `plan-${cleanUserId}-${dateStr}`,
      userId: cleanUserId,
      date: dateStr,
      timeBudgetMinutes: targetBudget,
      totalEstimatedMinutes: allocatedMinutes,
      actualTimeSpentMinutes: 0,
      status: 'active',
      items,
      primaryMissionId: items[0]?.id || '',
      completedCount: 0,
      skippedCount: 0,
      remainingCount: items.length,
      isZeroState: false,
    };

    this.savePlan(cleanUserId, plan);
    return plan;
  }

  /**
   * Persists the study plan in storage and publishes event.
   */
  public static savePlan(userId: string, plan: DailyStudyPlan): void {
    const cleanUserId = userId || 'default_user';
    const key = this.getPlanStorageKey(cleanUserId, plan.date);
    this.inMemoryPlans.set(key, plan);
    try {
      storage.save(key, plan);
    } catch {}
    EventBus.publish('StudyPlanUpdated', { userId: cleanUserId, plan });
  }

  /**
   * Starts an activity, setting it to 'in_progress'.
   */
  public static startActivity(userId: string, itemId: string): DailyStudyPlan {
    const plan = this.getTodayPlan(userId);
    const updatedItems = plan.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: 'in_progress' as const,
          startedAt: item.startedAt || new Date().toISOString(),
        };
      }
      return item;
    });

    const updatedPlan: DailyStudyPlan = {
      ...plan,
      items: updatedItems,
      primaryMissionId: itemId,
    };

    this.savePlan(userId, updatedPlan);
    return updatedPlan;
  }

  /**
   * Completes an activity, updates tracking metrics, and advances primary mission.
   */
  public static completeActivity(userId: string, itemId: string, actualMinutes?: number): DailyStudyPlan {
    const plan = this.getTodayPlan(userId);
    let durationToAdd = 0;

    const updatedItems = plan.items.map((item) => {
      if (item.id === itemId) {
        const timeSpent = actualMinutes !== undefined ? actualMinutes : item.estimatedMinutes;
        durationToAdd = timeSpent;
        return {
          ...item,
          status: 'completed' as const,
          actualMinutes: timeSpent,
          completedAt: new Date().toISOString(),
        };
      }
      return item;
    });

    const completedCount = updatedItems.filter((i) => i.status === 'completed').length;
    const skippedCount = updatedItems.filter((i) => i.status === 'skipped').length;
    const remainingCount = updatedItems.filter((i) => i.status === 'pending' || i.status === 'in_progress').length;
    const nextPending = updatedItems.find((i) => i.status === 'pending' || i.status === 'in_progress');

    const isAllDone = remainingCount === 0;

    const updatedPlan: DailyStudyPlan = {
      ...plan,
      items: updatedItems,
      completedCount,
      skippedCount,
      remainingCount,
      actualTimeSpentMinutes: plan.actualTimeSpentMinutes + durationToAdd,
      primaryMissionId: nextPending ? nextPending.id : '',
      status: isAllDone ? 'completed' : 'active',
    };

    this.savePlan(userId, updatedPlan);
    return updatedPlan;
  }

  /**
   * Skips an activity and adjusts remaining items.
   */
  public static skipActivity(userId: string, itemId: string): DailyStudyPlan {
    const plan = this.getTodayPlan(userId);
    const updatedItems = plan.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: 'skipped' as const,
        };
      }
      return item;
    });

    const completedCount = updatedItems.filter((i) => i.status === 'completed').length;
    const skippedCount = updatedItems.filter((i) => i.status === 'skipped').length;
    const remainingCount = updatedItems.filter((i) => i.status === 'pending' || i.status === 'in_progress').length;
    const nextPending = updatedItems.find((i) => i.status === 'pending' || i.status === 'in_progress');

    const updatedPlan: DailyStudyPlan = {
      ...plan,
      items: updatedItems,
      completedCount,
      skippedCount,
      remainingCount,
      primaryMissionId: nextPending ? nextPending.id : '',
      status: remainingCount === 0 ? 'completed' : 'active',
    };

    this.savePlan(userId, updatedPlan);
    return updatedPlan;
  }

  /**
   * Mid-day Adaptive Replanning:
   * Recalculates remaining plan items when the learner solves quickly, struggles,
   * skips, or adjusts budget, while strictly preserving already completed/skipped items.
   */
  public static replanDailyPlan(userId: string, reason: string): DailyStudyPlan {
    const currentPlan = this.getTodayPlan(userId);
    const completedOrSkipped = currentPlan.items.filter(
      (i) => i.status === 'completed' || i.status === 'skipped'
    );

    const remainingBudget = Math.max(
      15,
      currentPlan.timeBudgetMinutes - currentPlan.actualTimeSpentMinutes
    );

    // Generate fresh candidate items for remaining budget
    const freshPlan = this.generateDailyPlan(userId, remainingBudget);

    // Keep completed items and append fresh pending items
    const existingIds = new Set(completedOrSkipped.map((i) => i.id));
    const newItems: StudyPlanItem[] = [...completedOrSkipped];

    for (const item of freshPlan.items) {
      if (!existingIds.has(item.id)) {
        newItems.push({
          ...item,
          id: `plan-replan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          status: 'pending',
        });
      }
    }

    const completedCount = newItems.filter((i) => i.status === 'completed').length;
    const skippedCount = newItems.filter((i) => i.status === 'skipped').length;
    const remainingCount = newItems.filter((i) => i.status === 'pending' || i.status === 'in_progress').length;
    const nextPending = newItems.find((i) => i.status === 'pending' || i.status === 'in_progress');

    const replanned: DailyStudyPlan = {
      ...currentPlan,
      items: newItems,
      totalEstimatedMinutes: currentPlan.actualTimeSpentMinutes + remainingBudget,
      completedCount,
      skippedCount,
      remainingCount,
      primaryMissionId: nextPending ? nextPending.id : '',
      lastReplannedAt: new Date().toISOString(),
      replanReason: reason,
      status: remainingCount === 0 ? 'completed' : 'active',
    };

    this.savePlan(userId, replanned);
    return replanned;
  }

  /**
   * Adds a custom pattern activity directly from Pattern Concept Academy into today's plan.
   */
  public static addCustomPatternActivity(
    userId: string,
    patternInfo: {
      areaTitle: string;
      areaSlug: string;
      subtopicTitle: string;
      subtopicSlug: string;
      patternTitle: string;
      patternSlug: string;
      type?: StudyPlanActivityType;
    }
  ): DailyStudyPlan {
    const plan = this.getTodayPlan(userId);
    const activityType = patternInfo.type || 'LEARN';
    const isLearn = activityType === 'LEARN';

    const newItem: StudyPlanItem = {
      id: `plan-custom-${Date.now()}`,
      type: activityType,
      title: isLearn
        ? `Study ${patternInfo.patternTitle} Concept`
        : `Practice ${patternInfo.patternTitle} Problems`,
      description: `Targeted session added from Pattern Academy for ${patternInfo.patternTitle}.`,
      area: patternInfo.areaTitle,
      areaSlug: patternInfo.areaSlug,
      subtopic: patternInfo.subtopicTitle,
      subtopicSlug: patternInfo.subtopicSlug,
      pattern: patternInfo.patternTitle,
      patternSlug: patternInfo.patternSlug,
      estimatedMinutes: isLearn ? 15 : 20,
      actualMinutes: 0,
      reason: 'User added from Pattern Concept Academy',
      actionUrl: isLearn
        ? `/journey/${patternInfo.areaSlug}/${patternInfo.subtopicSlug}/${patternInfo.patternSlug}`
        : `/practice?mode=pattern&pattern=${patternInfo.patternSlug}`,
      status: 'pending',
    };

    const updatedItems = [...plan.items, newItem];
    const updatedPlan: DailyStudyPlan = {
      ...plan,
      items: updatedItems,
      totalEstimatedMinutes: plan.totalEstimatedMinutes + newItem.estimatedMinutes,
      remainingCount: plan.remainingCount + 1,
      primaryMissionId: plan.primaryMissionId || newItem.id,
      status: 'active',
    };

    this.savePlan(userId, updatedPlan);
    return updatedPlan;
  }

  /**
   * Generates factual End-Of-Day summary metrics with zero arbitrary grades.
   */
  public static getEndOfDaySummary(userId: string): EndOfDaySummary {
    const plan = this.getTodayPlan(userId);
    const completedItems = plan.items.filter((i) => i.status === 'completed');
    const skippedItems = plan.items.filter((i) => i.status === 'skipped');

    let problemsSolved = 0;
    let revisionItems = 0;
    let interviewMinutes = 0;
    const patternsSet = new Set<string>();

    completedItems.forEach((item) => {
      if (item.pattern) patternsSet.add(item.pattern);
      if (item.type === 'PRACTICE') problemsSolved += 2;
      if (item.type === 'REVISE') revisionItems += 5;
      if (item.type === 'INTERVIEW') interviewMinutes += item.actualMinutes || item.estimatedMinutes;
    });

    const nextWork: { title: string; reason: string; actionUrl: string }[] = [];
    try {
      const recs = RecommendationEngineService.getRecommendations(userId, 2);
      recs.forEach((r) => {
        nextWork.push({
          title: r.title,
          reason: r.explanation,
          actionUrl: r.destinationRoute,
        });
      });
    } catch {}

    if (nextWork.length === 0) {
      nextWork.push({
        title: 'Two Pointers & Linked List Invariants',
        reason: 'Next progressive algorithmic concept on roadmap',
        actionUrl: '/journey/two-pointers',
      });
    }

    return {
      date: plan.date,
      totalEstimatedMinutes: plan.totalEstimatedMinutes,
      actualTimeSpentMinutes: plan.actualTimeSpentMinutes,
      activitiesCompleted: completedItems.length,
      activitiesSkipped: skippedItems.length,
      problemsSolvedCount: problemsSolved,
      revisionItemsReviewed: revisionItems,
      interviewMinutes,
      patternsPracticed: Array.from(patternsSet),
      nextRecommendedWork: nextWork,
    };
  }
}
