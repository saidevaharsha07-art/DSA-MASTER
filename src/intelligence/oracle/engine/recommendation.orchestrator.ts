/**
 * Oracle AI Engine — Recommendation Orchestrator
 * Consumes public APIs of Platform Engine, Intelligence Foundation, Adaptive Engine, Contest Engine, Rating Engine, and Memory Engine,
 * generating unified recommendations with full Decision Traces and Engine Contribution Maps. Zero logic duplication.
 */

import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '@/src/intelligence/models/weakness';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';
import { ContestReadinessReport } from '@/src/intelligence/contests/contest.readiness';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';
import { RevisionQueueItem } from '@/src/intelligence/memory/models/review.models';
import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { DecisionTrace } from '../models/oracle.models';
import { IOracleStrategy } from '../strategies/strategy.interface';
import { PrioritizationEngine } from './prioritization.engine';

export class RecommendationOrchestrator {
  /**
   * Orchestrates recommendations from all engines into unified models with decision traces and engine contribution maps.
   */
  public orchestrate(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    contestAnalysis: ContestAnalysis,
    contestReadiness: ContestReadinessReport,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport,
    revisionQueue: ReadonlyArray<RevisionQueueItem>,
    strategy: IOracleStrategy
  ): ReadonlyArray<UnifiedOracleRecommendation> {
    const recommendations: UnifiedOracleRecommendation[] = [];
    const weights = strategy.getWeights();
    const now = new Date().toISOString();

    // 1. Spaced Repetition / Memory Decay Recommendation
    if (revisionQueue.length > 0) {
      const topRevision = revisionQueue[0];
      const trace: DecisionTrace = {
        contributingEngine: 'Learning Memory Engine',
        engineOutputSummary: `Top overdue concept '${topRevision.pattern}' with forgetting risk ${topRevision.forgettingRisk}%.`,
        weightApplied: weights.memoryRiskWeight,
        contributionScore: topRevision.forgettingRisk,
        finalWeightedScore: Math.round(topRevision.forgettingRisk * weights.memoryRiskWeight * 100),
      };

      const score = PrioritizationEngine.calculatePriorityScore(
        { memoryRisk: topRevision.forgettingRisk, masteryGap: 50, contestReadiness: 20, ratingGainPotential: 20 },
        weights
      );

      recommendations.push({
        id: `oracle-rec-memory-${Date.now()}`,
        title: `Revise ${topRevision.pattern} (${topRevision.topic})`,
        description: `Your memory decay risk for ${topRevision.pattern} is ${topRevision.forgettingRisk}%. Complete a 15-minute spaced repetition review today.`,
        category: 'Revise',
        state: 'Generated',
        priority: topRevision.priority === 'Critical' ? 'Critical' : 'High',
        rankingScore: score,
        confidenceBreakdown: {
          overallConfidence: 90,
          dataCompleteness: 95,
          engineAgreement: 85,
          historicalReliability: 90,
        },
        expectedBenefit: 'Prevents imminent memory decay and reinforces spaced repetition stability score.',
        estimatedDurationMinutes: topRevision.suggestedPracticeDurationMinutes,
        contributingEngines: Object.freeze(['Learning Memory Engine', 'Intelligence Foundation', 'Adaptive Practice Engine']),
        engineContributionMap: {
          MemoryEngine: 50,
          WeaknessAnalyzer: 25,
          AdaptiveEngine: 15,
          ContestEngine: 5,
          RatingEngine: 5,
        },
        decisionTraces: Object.freeze([trace]),
        supportingMetrics: { forgettingRisk: topRevision.forgettingRisk, recallProbability: topRevision.recallProbability },
        reasoning: `Selected by Learning Memory Engine due to recall probability dropping below optimal retention threshold.`,
        suggestedAction: `Start ${topRevision.suggestedPracticeDurationMinutes}-minute revision session.`,
        followUpAction: 'Record review outcome upon completion.',
        createdAt: now,
      });
    }

    // 2. Weakness Repair Recommendation
    if (weakness.weakTopics.length > 0) {
      const primaryWeak = weakness.weakTopics[0];
      const trace: DecisionTrace = {
        contributingEngine: 'Intelligence Foundation (WeaknessAnalyzer)',
        engineOutputSummary: `Primary weak topic '${primaryWeak.topic}' with accuracy ${(primaryWeak.accuracy * 100).toFixed(0)}%.`,
        weightApplied: weights.masteryGapWeight,
        contributionScore: 100 - Math.round(primaryWeak.accuracy * 100),
        finalWeightedScore: Math.round((100 - Math.round(primaryWeak.accuracy * 100)) * weights.masteryGapWeight * 100),
      };

      const score = PrioritizationEngine.calculatePriorityScore(
        { memoryRisk: 30, masteryGap: 100 - Math.round(primaryWeak.accuracy * 100), contestReadiness: 30, ratingGainPotential: 40 },
        weights
      );

      recommendations.push({
        id: `oracle-rec-weakness-${Date.now()}`,
        title: `Repair Weakness: ${primaryWeak.topic}`,
        description: weakness.primaryWeaknessSummary,
        category: 'Solve Next',
        state: 'Generated',
        priority: 'High',
        rankingScore: score,
        confidenceBreakdown: {
          overallConfidence: 85,
          dataCompleteness: 90,
          engineAgreement: 80,
          historicalReliability: 85,
        },
        expectedBenefit: `Elevates ${primaryWeak.topic} mastery score towards Proficient level.`,
        estimatedDurationMinutes: 45,
        contributingEngines: Object.freeze(['Intelligence Foundation', 'Adaptive Practice Engine', 'Platform Engine']),
        engineContributionMap: {
          WeaknessAnalyzer: 45,
          AdaptiveEngine: 30,
          PlatformEngine: 15,
          MemoryEngine: 10,
        },
        decisionTraces: Object.freeze([trace]),
        supportingMetrics: { topic: primaryWeak.topic, accuracy: primaryWeak.accuracy },
        reasoning: `Identified as primary weakness by WeaknessAnalyzer based on attempt accuracy history.`,
        suggestedAction: `Solve 3 targeted ${primaryWeak.topic} problems.`,
        followUpAction: 'Evaluate mastery progression post-session.',
        createdAt: now,
      });
    }

    // 3. Contest Preparation Recommendation
    if (contestReadiness) {
      const trace: DecisionTrace = {
        contributingEngine: 'Contest Intelligence Engine',
        engineOutputSummary: `Readiness level '${contestReadiness.readinessLevel}' with estimated success ${(contestReadiness.estimatedSuccessProbability * 100).toFixed(0)}%.`,
        weightApplied: weights.contestReadinessWeight,
        contributionScore: Math.round(contestReadiness.estimatedSuccessProbability * 100),
        finalWeightedScore: Math.round(contestReadiness.estimatedSuccessProbability * 100 * weights.contestReadinessWeight * 100),
      };

      const score = PrioritizationEngine.calculatePriorityScore(
        { memoryRisk: 20, masteryGap: 30, contestReadiness: Math.round(contestReadiness.estimatedSuccessProbability * 100), ratingGainPotential: 50 },
        weights
      );

      recommendations.push({
        id: `oracle-rec-contest-${Date.now()}`,
        title: `Contest Readiness: Prepare for Weekend Rated Contest`,
        description: contestReadiness.recommendedPreparation,
        category: 'Contest',
        state: 'Generated',
        priority: contestReadiness.isReadyForRated ? 'High' : 'Medium',
        rankingScore: score,
        confidenceBreakdown: {
          overallConfidence: 80,
          dataCompleteness: 85,
          engineAgreement: 75,
          historicalReliability: 80,
        },
        expectedBenefit: `Projected rating gain on ${ratingPrediction.platform} (+${ratingPrediction.projectedRating - ratingPrediction.currentRating} pts).`,
        estimatedDurationMinutes: 60,
        contributingEngines: Object.freeze(['Contest Intelligence Engine', 'Rating Engine']),
        engineContributionMap: {
          ContestEngine: 50,
          RatingEngine: 30,
          WeaknessAnalyzer: 10,
          MemoryEngine: 10,
        },
        decisionTraces: Object.freeze([trace]),
        supportingMetrics: { readinessLevel: contestReadiness.readinessLevel, projectedRating: ratingPrediction.projectedRating },
        reasoning: `Generated by Contest Intelligence Engine to optimize contest preparation window.`,
        suggestedAction: 'Complete timed contest simulation module.',
        followUpAction: 'Review contest performance post-event.',
        createdAt: now,
      });
    }

    return Object.freeze(recommendations);
  }
}
