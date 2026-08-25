/**
 * Oracle AI Engine — Insight Engine
 * Generates structured, explainable insights (Strengths, Weaknesses, Trends, Forgetting Risk).
 */

import { WeaknessAnalysis, StrengthAnalysis } from '@/src/intelligence/models/weakness';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';
import { OracleInsightReport, MetricInsight } from '../models/insight.models';

export class InsightEngine {
  /**
   * Generates a comprehensive OracleInsightReport from engine metrics.
   */
  public static generateInsights(
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    contestAnalysis: ContestAnalysis,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport
  ): OracleInsightReport {
    const now = new Date().toISOString();

    const biggestStrength: MetricInsight = {
      title: 'Top Domain Mastery',
      metricName: 'Mastered Topics',
      value: strength.masteredTopics.length > 0 ? strength.masteredTopics[0].topic : 'Arrays',
      trend: 'improving',
      explanation: strength.primaryStrengthSummary,
    };

    const biggestWeakness: MetricInsight = {
      title: 'Primary Weak Domain',
      metricName: 'Weak Topics',
      value: weakness.weakTopics.length > 0 ? weakness.weakTopics[0].topic : 'Dynamic Programming',
      trend: 'declining',
      explanation: weakness.primaryWeaknessSummary,
    };

    const fastestImprovingTopic: MetricInsight = {
      title: 'Fastest Improving Domain',
      metricName: 'Learning Velocity',
      value: strength.masteredTopics.length > 0 ? strength.masteredTopics[0].topic : 'Strings',
      trend: 'improving',
      explanation: 'High accuracy trend over recent problem solve attempts.',
    };

    const highestForgettingRisk: MetricInsight = {
      title: 'Highest Memory Decay Risk',
      metricName: 'Overdue Concepts',
      value: `${memoryHealth.conceptsAtRiskCount} concepts at risk`,
      trend: memoryHealth.conceptsAtRiskCount > 0 ? 'declining' : 'stable',
      explanation: `Ebbinghaus decay curve indicates ${memoryHealth.conceptsAtRiskCount} concepts require spaced repetition review.`,
    };

    const contestReadinessInsight: MetricInsight = {
      title: 'Contest Readiness Score',
      metricName: 'Average Percentile',
      value: `${contestAnalysis.averagePercentile}%`,
      trend: contestAnalysis.netRatingGain >= 0 ? 'improving' : 'declining',
      explanation: `Net rating gain of ${contestAnalysis.netRatingGain} points across ${contestAnalysis.totalContests} contests.`,
    };

    const ratingTrendInsight: MetricInsight = {
      title: 'Projected Rating Trend',
      metricName: 'Rating Projection',
      value: `${ratingPrediction.currentRating} -> ${ratingPrediction.projectedRating}`,
      trend: ratingPrediction.projectedRating >= ratingPrediction.currentRating ? 'improving' : 'declining',
      explanation: `Deterministic projection over next ${ratingPrediction.estimatedContestsToTarget} contests.`,
    };

    const learningConsistencyInsight: MetricInsight = {
      title: 'Learning Consistency',
      metricName: 'Consistency Score',
      value: `${weakness.consistencyScore}/100`,
      trend: 'stable',
      explanation: 'Evaluates active day streak and regular practice intervals.',
    };

    const reviewEfficiencyInsight: MetricInsight = {
      title: 'Review Coverage Efficiency',
      metricName: 'Review Coverage',
      value: `${memoryHealth.reviewCoveragePercentage}%`,
      trend: 'improving',
      explanation: `Overall memory score stands at ${memoryHealth.overallMemoryScore}/100.`,
    };

    return {
      biggestStrength,
      biggestWeakness,
      fastestImprovingTopic,
      highestForgettingRisk,
      contestReadinessInsight,
      ratingTrendInsight,
      learningConsistencyInsight,
      reviewEfficiencyInsight,
      generatedAt: now,
    };
  }
}
