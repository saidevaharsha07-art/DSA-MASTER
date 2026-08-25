/**
 * Unified Recommendation Harmonizer (Phase 10)
 * Orchestrates practice recommendations across SRS Memory Engine, Target Company Tracks,
 * Weakness Remediation, and RPG Campaign Progression using a deterministic 4-tier priority hierarchy.
 *
 * UNIFIED PRIORITY HIERARCHY:
 * 1. Priority 1 — Critical: SRS Overdue / Forgetting Risk Recovery (MemoryEngine)
 * 2. Priority 2 — High: Target Company / Interview Pattern Gaps (Career & Interview Prep)
 * 3. Priority 3 — Medium: Telemetry-backed Weakness Remediation (Adaptive Engine)
 * 4. Priority 4 — Normal: RPG Campaign Progression (25-Kingdom Map)
 */

import { progressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewPreparationAdapterService } from '@/src/features/interview/services/interview-prep-adapter.service';
import { AdaptiveRecommendationService } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { CampaignAdapterService } from '@/src/features/learn/services/campaign-adapter.service';
import { ProblemModel } from '@/src/curriculum/types';

export type RecommendationPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL';
export type RecommendationSource = 'SRS_OVERDUE' | 'TARGET_COMPANY_GAP' | 'WEAKNESS_REMEDIATION' | 'CAMPAIGN_PROGRESSION';

export interface HarmonizedRecommendation {
  problemId: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  patternTitle?: string;
  priority: RecommendationPriority;
  source: RecommendationSource;
  reason: string;
}

export interface HarmonizedRecommendationPlan {
  userId: string;
  targetCompany: string;
  recommendations: HarmonizedRecommendation[];
  topPriorityReason: string;
  srsAlertCount: number;
}

export class UnifiedRecommendationHarmonizer {
  private static cache: Map<string, { plan: HarmonizedRecommendationPlan; timestamp: number }> = new Map();
  private static isSubscribed = false;

  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  private static ensureEventSubscriptions(): void {
    if (this.isSubscribed) return;

    EventBus.subscribe('ProblemSolved', () => this.clearCache());
    EventBus.subscribe('MemoryReviewed', () => this.clearCache());
    EventBus.subscribe('InterviewCompleted', () => this.clearCache());

    this.isSubscribed = true;
  }

  public static clearCache(): void {
    this.cache.clear();
  }

  private static isProblemSolved(problem: ProblemModel, solvedSet: Set<string>): boolean {
    if (solvedSet.has(problem.id)) return true;
    if (solvedSet.has(problem.slug)) return true;
    if (problem.leetcodeNumber) {
      if (solvedSet.has(`leetcode:${problem.leetcodeNumber}`)) return true;
      if (solvedSet.has(`lc-${problem.leetcodeNumber}`)) return true;
    }
    return false;
  }

  /**
   * Generates a unified, priority-ranked recommendation plan for a candidate.
   */
  public static getHarmonizedPlan(
    userId = 'default_user',
    targetCompany = 'Amazon'
  ): HarmonizedRecommendationPlan {
    this.ensureEventSubscriptions();

    const cacheKey = `${userId}_${targetCompany.toLowerCase()}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 30000) {
      return cached.plan;
    }

    const state = progressService.getState();
    const solvedProblemIds = new Set(state.completedProblemIds || []);
    const allProblems = CurriculumRepository.getAllProblems();

    const recommendations: HarmonizedRecommendation[] = [];
    const recommendedIds = new Set<string>();

    // 1. PRIORITY 1 (CRITICAL) — SRS Overdue Recovery
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);
    const criticalOverdueItems = revisionQueue.filter((item) => item.priority === 'Critical' || item.priority === 'High' || item.forgettingRisk >= 0.5);

    for (const item of criticalOverdueItems) {
      const cleanConceptKey = item.conceptId.replace('concept-', '').replace(/-/g, ' ').toLowerCase();
      const patternKey = (item.pattern || '').toLowerCase();

      const matchingProblem = allProblems.find((p) =>
        !this.isProblemSolved(p, solvedProblemIds) &&
        !recommendedIds.has(p.id) &&
        ((p.patternTitle || '').toLowerCase().includes(cleanConceptKey) ||
          (patternKey.length > 0 && (p.patternTitle || '').toLowerCase().includes(patternKey)) ||
          p.topics.some((t) => t.toLowerCase().includes(cleanConceptKey)))
      );

      if (matchingProblem) {
        recommendations.push({
          problemId: matchingProblem.id,
          title: matchingProblem.title,
          difficulty: matchingProblem.difficulty,
          patternTitle: matchingProblem.patternTitle || item.pattern || 'Core Concept',
          priority: 'CRITICAL',
          source: 'SRS_OVERDUE',
          reason: `High SRS forgetting risk (${Math.round(item.forgettingRisk * 100)}%) for concept ${item.pattern || cleanConceptKey}. Immediate recall required.`,
        });
        recommendedIds.add(matchingProblem.id);
      }
    }

    // 2. PRIORITY 2 (HIGH) — Target Company & Interview Pattern Gaps
    const companySummary = CareerAdapterService.getCareerSummary(userId);
    const targetTrack = companySummary.companyTracks.find((c) => c.name.toLowerCase() === targetCompany.toLowerCase()) || companySummary.companyTracks[0];

    const prepSummary = InterviewPreparationAdapterService.getInterviewPrepSummary(userId, targetTrack.name);
    const companyExercises = prepSummary.nextSessionPlan.exercises || [];

    for (const ex of companyExercises) {
      const prob = allProblems.find((p) => p.id === ex.problemId);
      if (prob && !this.isProblemSolved(prob, solvedProblemIds) && !recommendedIds.has(prob.id)) {
        recommendations.push({
          problemId: prob.id,
          title: prob.title,
          difficulty: prob.difficulty,
          patternTitle: prob.patternTitle || ex.pattern,
          priority: 'HIGH',
          source: 'TARGET_COMPANY_GAP',
          reason: `Top targeted pattern gap for ${targetTrack.name} preparation.`,
        });
        recommendedIds.add(prob.id);
      }
    }

    // 3. PRIORITY 3 (MEDIUM) — Weakness Remediation
    const adaptiveRecommendations = AdaptiveRecommendationService.getRecommendedPracticeProblems(userId, 'all', 3);
    for (const rec of adaptiveRecommendations) {
      const prob = allProblems.find((p) => p.id === rec.problemId);
      if (prob && !this.isProblemSolved(prob, solvedProblemIds) && !recommendedIds.has(prob.id)) {
        recommendations.push({
          problemId: prob.id,
          title: prob.title,
          difficulty: prob.difficulty,
          patternTitle: prob.patternTitle || rec.topic,
          priority: 'MEDIUM',
          source: 'WEAKNESS_REMEDIATION',
          reason: rec.reason || `Targeted practice for candidate accuracy weakness in ${rec.topic}.`,
        });
        recommendedIds.add(prob.id);
      }
    }

    // 4. PRIORITY 4 (NORMAL) — RPG Campaign Progression
    const campaignSummary = CampaignAdapterService.getCampaignSummary(userId);
    const activeKingdom = campaignSummary.kingdoms.find((k) => k.status === 'available') || campaignSummary.kingdoms[0];
    const kingdomProbs = allProblems.filter((p) =>
      (p.patternTitle || '').toLowerCase().includes(activeKingdom.topic.toLowerCase()) ||
      p.topics.some((t) => t.toLowerCase().includes(activeKingdom.topic.toLowerCase()))
    );

    const unsolvedKingdomProbs = kingdomProbs.filter((p) => !this.isProblemSolved(p, solvedProblemIds) && !recommendedIds.has(p.id));
    for (const prob of unsolvedKingdomProbs.slice(0, 2)) {
      recommendations.push({
        problemId: prob.id,
        title: prob.title,
        difficulty: prob.difficulty,
        patternTitle: prob.patternTitle || activeKingdom.topic,
        priority: 'NORMAL',
        source: 'CAMPAIGN_PROGRESSION',
        reason: `Advance Kingdom ${activeKingdom.id}: ${activeKingdom.title} progression.`,
      });
      recommendedIds.add(prob.id);
    }

    // Fallback if zero recommendations found
    if (recommendations.length === 0) {
      const unsolvedFallback = allProblems.filter((p) => !this.isProblemSolved(p, solvedProblemIds)).slice(0, 3);
      for (const prob of unsolvedFallback) {
        recommendations.push({
          problemId: prob.id,
          title: prob.title,
          difficulty: prob.difficulty,
          patternTitle: prob.patternTitle || 'Foundation',
          priority: 'NORMAL',
          source: 'CAMPAIGN_PROGRESSION',
          reason: 'Foundational baseline practice problem.',
        });
      }
    }

    const topPriorityReason = recommendations.length > 0
      ? recommendations[0].reason
      : 'Complete foundational practice problems to establish baseline recommendations.';

    const plan: HarmonizedRecommendationPlan = {
      userId,
      targetCompany: targetTrack.name,
      recommendations: recommendations.slice(0, 6),
      topPriorityReason,
      srsAlertCount: criticalOverdueItems.length,
    };

    this.cache.set(cacheKey, { plan, timestamp: Date.now() });
    return plan;
  }
}
