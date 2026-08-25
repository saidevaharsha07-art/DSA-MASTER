/**
 * Revision Adapter Service (Phase 6 Step 3 & Phase 6.5 Data-Integrity Patch)
 * Maps canonical MemoryEngine (ConceptMemory[], RevisionQueueItem[], MemoryHealthReport)
 * and ProgressService state to the Revision Center UI components (/revision).
 */

import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { progressService } from '@/src/services/progress/progress.service';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { EventBus } from '@/src/core/events/event-bus';
import { ConceptMemory } from '@/src/intelligence/memory/models/memory.models';
import { RevisionQueueItem } from '@/src/intelligence/memory/models/review.models';
import { ProblemModel, RevisionData } from '@/src/curriculum/types';

export interface KingdomMasteryView {
  slug: string;
  title: string;
  kingdomTitle: string;
  order: number;
  averageMastery: number;
  totalProblems: number;
  solvedCount: number;
  dueCount: number;
}

export interface TimelineStageView {
  stage: string;
  label: string;
  intervalDays: number;
  status: 'completed' | 'current' | 'locked';
  problemCount: number;
}

export interface RewardItemView {
  id: string;
  title: string;
  description: string;
  requiredXp: number;
  xpReward: string;
  image: string;
  unlocked: boolean;
  progressPct: number;
}

export interface RevisionSummaryData {
  dueTodayProblems: (ProblemModel & { revisionData: RevisionData })[];
  upcomingQueue: (ProblemModel & { revisionData: RevisionData })[];
  kingdoms: KingdomMasteryView[];
  streakStats: { currentStreak: number; longestStreak: number };
  xpStats: {
    todayXp: number;
    weeklyXp: number;
    totalXp: number;
    currentLevel: number;
    levelTitle: string;
    levelPct: number;
    progressPercentage: number;
  };
  timelineStages: TimelineStageView[];
  unlockedRewards: RewardItemView[];
}

export class RevisionAdapterService {
  private static cache: Map<string, RevisionSummaryData> = new Map();
  private static subscribedToEvents = false;

  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  public static ensureSubscribed(): void {
    if (!this.subscribedToEvents) {
      EventBus.subscribe('ProblemSolved', () => {
        this.clearCache();
      });
      EventBus.subscribe('MemoryReviewed', () => {
        this.clearCache();
      });
      this.subscribedToEvents = true;
    }
  }

  public static clearCache(): void {
    this.cache.clear();
  }

  public static recordReview(userId: string, problemId: string, rating: 'easy' | 'medium' | 'hard'): { xpEarned: number } {
    const conceptId = `concept-${problemId.replace('leetcode:', '').toLowerCase()}`;
    const result = rating === 'easy' ? 'success' : rating === 'medium' ? 'success' : 'failure';

    // 1. MemoryEngine processReview called EXACTLY ONCE
    this.memoryEngine.processReview(userId, conceptId, result);

    const canonicalProblem = CurriculumRepository.getProblemById(problemId);

    // 2. Publish dedicated MemoryReviewed event (DO NOT publish ProblemSolved)
    EventBus.publish('MemoryReviewed', {
      eventId: `evt_rev_${Date.now()}`,
      userId,
      conceptId,
      problemId,
      outcome: result,
      xpEarned: 20,
      topic: canonicalProblem?.categoryTitle || 'Arrays',
      pattern: canonicalProblem?.patternTitle || 'Arrays',
      timestamp: new Date().toISOString(),
    });

    this.clearCache();
    return { xpEarned: 20 };
  }

  public static getRevisionSummary(userId = 'default_user'): RevisionSummaryData {
    this.ensureSubscribed();

    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    const state = progressService.getState(userId);
    const logs = progressService.getActivityLog();
    const concepts = this.memoryEngine.getAllConcepts(userId);
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);
    const allProblems = CurriculumRepository.getAllProblems();

    // Concept map
    const conceptMap = new Map<string, ConceptMemory>();
    concepts.forEach((c) => conceptMap.set(c.conceptId, c));

    const upcomingQueue: (ProblemModel & { revisionData: RevisionData })[] = revisionQueue.map((item, idx) => {
      const baseProblem = allProblems.find(
        (p) => item.conceptId.includes(p.id.toLowerCase()) || (p.patternSlug && item.conceptId.includes(p.patternSlug.toLowerCase()))
      ) || allProblems[idx % allProblems.length];

      const concept = conceptMap.get(item.conceptId);
      const daysUntilDue = Math.max(1, Math.ceil((new Date(item.nextReview).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
      const forgettingRisk = Math.round(item.forgettingRisk);

      const revisionData: RevisionData = {
        lastReviewed: item.lastReviewed,
        nextReview: item.nextReview,
        mastery: concept ? Math.round(concept.masteryScore) : Math.round(100 - forgettingRisk),
        repetitions: concept ? concept.reviewCount : 1,
        interval: daysUntilDue,
        easeFactor: concept ? 2.5 : 2.0,
        totalReviews: concept ? concept.reviewCount : 1,
      };

      return {
        ...baseProblem,
        revisionData,
      };
    });

    const dueTodayProblems = upcomingQueue.filter((q) => q.revisionData.interval <= 1 || q.revisionData.mastery < 50);

    // Kingdom Masteries
    const categories = CurriculumRepository.getAllCategories();
    const canonicalSolvedSet = new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);

    const kingdomMasteriesView: KingdomMasteryView[] = categories.map((cat, idx) => {
      const catProblems = CurriculumRepository.filterProblems({ categorySlug: cat.slug }, []);
      let catSolved = 0;
      catProblems.forEach((p) => {
        if (canonicalSolvedSet.has(p.id) || state.completed.includes(p.leetcodeNumber)) {
          catSolved++;
        }
      });

      const totalProblems = catProblems.length;
      const solvedPct = totalProblems > 0 ? Math.round((catSolved / totalProblems) * 100) : 0;
      const dueInKingdom = upcomingQueue.filter((q) => q.categorySlug === cat.slug).length;

      return {
        slug: cat.slug,
        title: cat.title,
        kingdomTitle: cat.kingdomTitle,
        order: idx + 1,
        averageMastery: solvedPct,
        totalProblems,
        solvedCount: catSolved,
        dueCount: dueInKingdom,
      };
    });

    // XP Stats
    const totalXp = state.xp || 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayLogs = logs.filter((l) => l.timestamp.startsWith(todayStr));
    const todayXp = todayLogs.reduce((acc, l) => acc + (l.xpEarned || 0), 0);
    const weeklyXp = logs.reduce((acc, l) => acc + (l.xpEarned || 0), 0);

    const currentLevel = Math.floor(totalXp / 500) + 1;
    const currentLevelXp = totalXp % 500;
    const levelPct = Math.min(100, Math.round((currentLevelXp / 500) * 100));

    const levelTitles = ['Novice', 'Explorer', 'Apprentice', 'Specialist', 'Architect', 'Grandmaster'];
    const levelTitle = levelTitles[Math.min(levelTitles.length - 1, Math.floor((currentLevel - 1) / 5))];

    // Timeline Stages using ConceptMemory stabilityScore
    const timelineStages: TimelineStageView[] = [
      { stage: 'Stage 1', label: '1 Day Review', intervalDays: 1, status: 'current', problemCount: concepts.filter((c) => c.stabilityScore <= 1).length },
      { stage: 'Stage 2', label: '3 Day Lock', intervalDays: 3, status: concepts.length > 0 ? 'current' : 'locked', problemCount: concepts.filter((c) => c.stabilityScore > 1 && c.stabilityScore <= 3).length },
      { stage: 'Stage 3', label: '7 Day Stability', intervalDays: 7, status: concepts.length > 2 ? 'completed' : 'locked', problemCount: concepts.filter((c) => c.stabilityScore > 3 && c.stabilityScore <= 7).length },
      { stage: 'Stage 4', label: '14 Day Consolidation', intervalDays: 14, status: concepts.length > 5 ? 'completed' : 'locked', problemCount: concepts.filter((c) => c.stabilityScore > 7 && c.stabilityScore <= 14).length },
      { stage: 'Stage 5', label: '30 Day Mastery', intervalDays: 30, status: concepts.length > 10 ? 'completed' : 'locked', problemCount: concepts.filter((c) => c.stabilityScore > 14).length },
    ];

    // Rewards
    const unlockedRewards: RewardItemView[] = [
      { id: 'r1', title: 'Memory Novice', description: 'Complete 1 SRS Memory Review', requiredXp: 50, xpReward: '+50 XP', image: '/images/reward_chest.jpg', unlocked: totalXp >= 50, progressPct: Math.min(100, Math.round((totalXp / 50) * 100)) },
      { id: 'r2', title: 'Pattern Scholar', description: 'Accumulate 250 XP in Spaced Repetition', requiredXp: 250, xpReward: '+100 XP', image: '/images/reward_chest.jpg', unlocked: totalXp >= 250, progressPct: Math.min(100, Math.round((totalXp / 250) * 100)) },
      { id: 'r3', title: 'Sanctum Master', description: 'Reach 1,000 XP in DSA Mastery', requiredXp: 1000, xpReward: '+300 XP', image: '/images/reward_chest.jpg', unlocked: totalXp >= 1000, progressPct: Math.min(100, Math.round((totalXp / 1000) * 100)) },
    ];

    const data: RevisionSummaryData = {
      dueTodayProblems,
      upcomingQueue,
      kingdoms: kingdomMasteriesView,
      streakStats: {
        currentStreak: state.currentStreak || 0,
        longestStreak: Math.max(state.currentStreak || 0, 7),
      },
      xpStats: {
        todayXp,
        weeklyXp,
        totalXp,
        currentLevel,
        levelTitle,
        levelPct,
        progressPercentage: levelPct,
      },
      timelineStages,
      unlockedRewards,
    };

    this.cache.set(userId, data);
    return data;
  }
}
