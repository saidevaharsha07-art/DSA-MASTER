/**
 * Dashboard Data Adapter Service (Phase 5A)
 * Converts canonical progress state, activity log, memory engine SRS, and Oracle AI insights
 * into a dynamic DashboardSummary consumed by CommandCenterView.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { AdaptiveRecommendationService, PracticeRecommendation } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { EventBus } from '@/src/core/events/event-bus';

export interface KingdomProgression {
  slug: string;
  title: string;
  solvedCount: number;
  totalCount: number;
  percentage: number;
}

export interface DashboardSummary {
  playerHud: {
    totalXp: number;
    level: number;
    currentLevelXp: number;
    nextLevelXp: number;
    levelPct: number;
    currentStreak: number;
    solvedCount: number;
  };

  dailyQuest: {
    targetTitle: string;
    currentSolves: number;
    targetSolves: number;
    percentage: number;
    recommendedFocus: string;
  };

  srsMemory: {
    conceptsTracked: number;
    revisionDueCount: number;
    atRiskCount: number;
    memoryHealthScore: number;
    retentionRateText: string;
  };

  oracleInsights: {
    topStrength: string;
    primaryWeakness: string;
    recommendedFocus: string;
    summaryReasoning: string;
    confidenceScore: number | string;
  };

  kingdomProgression: KingdomProgression[];

  recommendations: PracticeRecommendation[];
}

export class DashboardAdapterService {
  private static cache: Map<string, DashboardSummary> = new Map();
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

  public static getDashboardSummary(userId = 'default_user'): DashboardSummary {
    this.ensureSubscribed();

    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    const state = progressService.getState(userId);
    const logs = progressService.getActivityLog(userId);

    // 1. Player HUD Metrics
    const totalXp = state.xp || 0;
    const level = progressService ? ProgressService.calculateLevel(totalXp) : Math.floor(totalXp / 500) + 1;
    const currentLevelXp = totalXp % 500;
    const nextLevelXp = 500;
    const levelPct = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

    const canonicalSolvedSet = new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);
    const solvedCount = canonicalSolvedSet.size;
    const currentStreak = state.currentStreak || 0;

    // 2. Daily Quest & Focus
    const targetSolves = state.dailyGoal || 3;
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySolvesCount = logs.filter((l) => l.action === 'solve' && l.timestamp.startsWith(todayStr)).length;
    const currentSolves = Math.min(targetSolves, todaySolvesCount);
    const questPct = Math.min(100, Math.round((currentSolves / targetSolves) * 100));

    const recommendations = AdaptiveRecommendationService.getRecommendedPracticeProblems(userId, 'all', 4);
    const recommendedFocus = recommendations[0]?.topic || 'Foundational Practice';

    // 3. SRS Memory Health
    const concepts = this.memoryEngine.getAllConcepts(userId);
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);
    const health = this.memoryEngine.getMemoryHealth(userId);

    const conceptsTracked = concepts.length;
    const revisionDueCount = revisionQueue.length;
    const atRiskCount = health.conceptsAtRiskCount || 0;
    const memoryHealthScore = conceptsTracked > 0 ? Math.round(health.overallMemoryScore || 0) : 0;
    const retentionRateText =
      conceptsTracked > 0
        ? `${Math.round(concepts.reduce((a, c) => a + c.retentionRate, 0) / conceptsTracked)}%`
        : 'N/A';

    // 4. Oracle Insights
    const attempts = AdaptiveDataAdapterService.getCanonicalAttempts(userId);
    const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
    const weakness = WeaknessAnalyzer.analyze(attempts, profile);
    const strength = StrengthAnalyzer.analyze(attempts, profile);

    let topStrength = 'No activity yet';
    let primaryWeakness = 'No weakness detected yet';
    let summaryReasoning = 'Complete your first practice problem to unlock AI telemetry.';
    let confidenceScore: number | string = 'Unrated';

    if (solvedCount > 0) {
      topStrength = strength.masteredTopics[0]?.topic || 'Arrays & Hashing';
      primaryWeakness = weakness.weakTopics[0]?.topic || 'Dynamic Programming';
      summaryReasoning = weakness.primaryWeaknessSummary || 'Practice recommended to repair skill gaps.';
      confidenceScore = 85;
    }

    // 5. Kingdom / Category Progression
    const categories = CurriculumRepository.getAllCategories();
    const kingdomProgression: KingdomProgression[] = categories.map((cat) => {
      const catProblems = CurriculumRepository.filterProblems({ categorySlug: cat.slug }, []);
      let catSolved = 0;
      catProblems.forEach((p) => {
        if (canonicalSolvedSet.has(p.id) || (p.leetcodeNumber && state.completed.includes(p.leetcodeNumber))) {
          catSolved++;
        }
      });

      const totalCount = catProblems.length;
      const percentage = totalCount > 0 ? Math.round((catSolved / totalCount) * 100) : 0;

      return {
        slug: cat.slug,
        title: cat.kingdomTitle,
        solvedCount: catSolved,
        totalCount,
        percentage,
      };
    });

    const summary: DashboardSummary = {
      playerHud: {
        totalXp,
        level,
        currentLevelXp,
        nextLevelXp,
        levelPct,
        currentStreak,
        solvedCount,
      },

      dailyQuest: {
        targetTitle: `Solve ${targetSolves} ${recommendedFocus} problems`,
        currentSolves,
        targetSolves,
        percentage: questPct,
        recommendedFocus,
      },

      srsMemory: {
        conceptsTracked,
        revisionDueCount,
        atRiskCount,
        memoryHealthScore,
        retentionRateText,
      },

      oracleInsights: {
        topStrength,
        primaryWeakness,
        recommendedFocus,
        summaryReasoning,
        confidenceScore,
      },

      kingdomProgression,

      recommendations,
    };

    this.cache.set(userId, summary);
    return summary;
  }
}
