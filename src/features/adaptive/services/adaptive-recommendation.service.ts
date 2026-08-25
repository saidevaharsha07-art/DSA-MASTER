/**
 * Adaptive Recommendation Service (Phase 4B)
 * Unified facade generating personalized, data-backed practice recommendations
 * using MemoryEngine SRS risks, WeaknessAnalyzer skill gaps, AdaptiveEngine strategies, and dataset providers.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { AdaptiveEngine } from '@/src/intelligence/adaptive/adaptive.engine';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { CodeChefDatasetProvider } from '@/src/platforms/codechef/dataset';
import { AdaptiveDataAdapterService } from './adaptive-data-adapter.service';
import { PlatformId } from '@/src/platforms/types';
import { EventBus } from '@/src/core/events/event-bus';

export interface PracticeRecommendation {
  readonly id: string;
  readonly problemId: string;
  readonly title: string;
  readonly platform: PlatformId;
  readonly difficulty: string;
  readonly topic: string;
  readonly pattern: string;
  readonly reason: string;
  readonly badge: string;
  readonly priority: 'Critical' | 'High' | 'Medium' | 'Low';
  readonly score: number;
  readonly xp: number;
  readonly estimatedDurationMinutes: number;
  readonly url: string;
}

export class AdaptiveRecommendationService {
  private static cache: Map<string, PracticeRecommendation[]> = new Map();
  private static subscribedToEvents = false;

  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  private static get adaptiveEngine(): AdaptiveEngine {
    if (!Container.has('AdaptiveEngine')) {
      Container.registerSingleton('AdaptiveEngine', new AdaptiveEngine());
    }
    return Container.resolve<AdaptiveEngine>('AdaptiveEngine');
  }

  /**
   * Subscribes to ProblemSolved event to clear cache when a problem is solved.
   */
  public static ensureSubscribed(): void {
    if (!this.subscribedToEvents) {
      EventBus.subscribe('ProblemSolved', () => {
        this.clearCache();
      });
      this.subscribedToEvents = true;
    }
  }

  /**
   * Clears in-memory recommendation cache.
   */
  public static clearCache(): void {
    this.cache.clear();
  }

  /**
   * Retrieves prioritized, explainable practice recommendations for a user.
   */
  public static getRecommendedPracticeProblems(
    userId = 'default_user',
    platform?: PlatformId | 'all',
    limit = 4
  ): PracticeRecommendation[] {
    this.ensureSubscribed();

    const targetPlat = platform || 'all';
    const cacheKey = `${userId}:${targetPlat}:${limit}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const state = progressService.getState(userId);
    const canonicalSolvedIds = new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);

    const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
    const weakness = AdaptiveDataAdapterService.getWeaknessAnalysis(userId);
    const strength = AdaptiveDataAdapterService.getStrengthAnalysis(userId);

    const allCurriculum = CurriculumRepository.getAllProblems();
    const allCodeChef = CodeChefDatasetProvider.loadCompleteDataset();

    const candidates: PracticeRecommendation[] = [];
    const addedProblemIds = new Set<string>();

    // Helper: Match and format dataset problem into PracticeRecommendation
    const tryAddRecommendation = (
      probId: string,
      reason: string,
      badge: string,
      priority: 'Critical' | 'High' | 'Medium' | 'Low',
      score: number
    ): boolean => {
      if (addedProblemIds.has(probId) || canonicalSolvedIds.has(probId)) {
        return false;
      }

      const numMatch = probId.replace(/\D/g, '');
      const numId = numMatch ? parseInt(numMatch, 10) : -1;
      if (numId > 0 && state.completed.includes(numId)) {
        return false;
      }

      // Find problem in curriculum repository
      const currMatch = allCurriculum.find(
        (p) => p.id === probId || (numId > 0 && p.leetcodeNumber === numId)
      );

      if (currMatch) {
        const itemPlat = (currMatch.url.includes('codechef')
          ? 'codechef'
          : currMatch.url.includes('codeforces')
          ? 'codeforces'
          : currMatch.url.includes('geeksforgeeks')
          ? 'geeksforgeeks'
          : 'leetcode') as PlatformId;

        if (targetPlat !== 'all' && itemPlat !== targetPlat) {
          return false;
        }

        candidates.push({
          id: `rec-${probId}-${Date.now()}-${candidates.length}`,
          problemId: currMatch.id,
          title: currMatch.title,
          platform: itemPlat,
          difficulty: currMatch.difficulty || 'Easy',
          topic: currMatch.topics[0] || 'Data Structures',
          pattern: currMatch.patternTitle || 'General',
          reason,
          badge,
          priority,
          score,
          xp: currMatch.xp || 25,
          estimatedDurationMinutes: currMatch.estimatedTimeMin || 20,
          url: currMatch.url,
        });

        addedProblemIds.add(probId);
        addedProblemIds.add(currMatch.id);
        return true;
      }

      // Find problem in CodeChef dataset
      const ccCode = probId.replace('codechef:', '');
      const ccMatch = allCodeChef.find(
        (p) => p.id === probId || p.metadata?.problemCode === ccCode || p.title === ccCode
      );

      if (ccMatch) {
        if (targetPlat !== 'all' && targetPlat !== 'codechef') {
          return false;
        }

        candidates.push({
          id: `rec-${probId}-${Date.now()}-${candidates.length}`,
          problemId: ccMatch.id,
          title: ccMatch.title,
          platform: 'codechef',
          difficulty: ccMatch.difficulty || 'Easy',
          topic: ccMatch.metadata?.interviewTopic || 'Data Structures',
          pattern: ccMatch.metadata?.pattern || 'General',
          reason,
          badge,
          priority,
          score,
          xp: ccMatch.xp || 25,
          estimatedDurationMinutes: ccMatch.estimatedTime || 20,
          url: ccMatch.url || `https://www.codechef.com/problems/${ccCode}`,
        });

        addedProblemIds.add(probId);
        addedProblemIds.add(ccMatch.id);
        return true;
      }

      return false;
    };

    // 1. Spaced Repetition / Memory Decay Recommendations (Highest Priority)
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);

    for (const revItem of revisionQueue) {
      if (candidates.length >= limit) break;
      const targetPattern = revItem.pattern || revItem.topic;
      const targetTopic = revItem.topic;

      const match = allCurriculum.find(
        (p) =>
          !canonicalSolvedIds.has(p.id) &&
          !addedProblemIds.has(p.id) &&
          ((p.patternTitle && p.patternTitle.toLowerCase().includes(targetPattern.toLowerCase())) ||
            p.topics.some((t) => t.toLowerCase().includes(targetTopic.toLowerCase())))
      );

      if (match) {
        const isCritical = revItem.priority === 'Critical' || revItem.forgettingRisk >= 60;
        tryAddRecommendation(
          match.id,
          isCritical ? 'Spaced Repetition Due' : 'High Forgetting Risk',
          isCritical ? '🎯 Spaced Repetition Due' : '⚠️ High Forgetting Risk',
          isCritical ? 'Critical' : 'High',
          95
        );
      }
    }

    // 2. Weak Topic / Pattern Repair Recommendations
    if (candidates.length < limit && weakness.weakTopics.length > 0) {
      for (const weakTopic of weakness.weakTopics) {
        if (candidates.length >= limit) break;
        const match = allCurriculum.find(
          (p) =>
            !canonicalSolvedIds.has(p.id) &&
            !addedProblemIds.has(p.id) &&
            p.topics.some((t) => t.toLowerCase().includes(weakTopic.topic.toLowerCase()))
        );
        if (match) {
          tryAddRecommendation(
            match.id,
            'Weak Pattern Repair',
            '⚡ Weak Pattern Repair',
            'High',
            85
          );
        }
      }
    }

    // 3. Adaptive Strategy Session Recommendations
    if (candidates.length < limit) {
      const { session } = this.adaptiveEngine.generateSession(
        profile,
        weakness,
        strength,
        'Weakness First',
        { platform: targetPlat !== 'all' ? targetPlat : 'codechef', maxProblems: limit * 2 }
      );

      for (const adaptProb of session.selectedProblems) {
        if (candidates.length >= limit) break;
        tryAddRecommendation(
          adaptProb.id,
          'Difficulty Step-Up',
          '📈 Difficulty Step-Up',
          'Medium',
          75
        );
      }
    }

    // 4. Foundational Fallback for Empty / Unsolved Users
    if (candidates.length < limit) {
      const easyCurriculum = allCurriculum.filter(
        (p) =>
          (p.difficulty || '').toLowerCase() === 'easy' &&
          !canonicalSolvedIds.has(p.id) &&
          !addedProblemIds.has(p.id)
      );

      for (const easyP of easyCurriculum) {
        if (candidates.length >= limit) break;
        tryAddRecommendation(
          easyP.id,
          'Foundational Practice',
          '💡 Foundational Practice',
          'Low',
          60
        );
      }

      if (candidates.length < limit) {
        const easyCodeChef = allCodeChef.filter(
          (p) =>
            (p.difficulty || '').toLowerCase() === 'easy' &&
            !canonicalSolvedIds.has(p.id) &&
            !addedProblemIds.has(p.id)
        );

        for (const easyCc of easyCodeChef) {
          if (candidates.length >= limit) break;
          tryAddRecommendation(
            easyCc.id,
            'Foundational Practice',
            '💡 Foundational Practice',
            'Low',
            50
          );
        }
      }
    }

    const finalResult = Object.freeze(candidates.slice(0, limit));
    this.cache.set(cacheKey, [...finalResult]);
    return [...finalResult];
  }
}
