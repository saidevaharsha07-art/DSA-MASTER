/**
 * Oracle AI Engine — Dashboard Engine
 * Assembles unified OracleDashboardSnapshot and calculates the composed UnifiedLearningScore.
 */

import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { WeaknessAnalysis } from '@/src/intelligence/models/weakness';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';
import { OracleDashboardSnapshot, UnifiedLearningScore, OracleAlert } from '../models/dashboard.models';
import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { PlannerEngine } from './planner.engine';

export class DashboardEngine {
  /**
   * Pure function: Assembles backend OracleDashboardSnapshot with full score composition.
   */
  public static assembleSnapshot(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    contestAnalysis: ContestAnalysis,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport,
    activeStrategyName: string,
    topRecommendations: ReadonlyArray<UnifiedOracleRecommendation>,
    now: Date = new Date()
  ): OracleDashboardSnapshot {
    // 1. Unified Learning Score Composition
    const memoryContribution = Math.round(memoryHealth.overallMemoryScore * 0.25);
    const masteryContribution = Math.round((100 - weakness.weakTopics.length * 15) * 0.25);
    const contestContribution = Math.round(contestAnalysis.averagePercentile * 0.15);
    const ratingContribution = Math.round(Math.min(100, (ratingPrediction.currentRating / 2000) * 100) * 0.15);
    const consistencyContribution = Math.round(weakness.consistencyScore * 0.10);
    const adaptiveContribution = Math.round(85 * 0.10);

    const overallScore = Math.max(
      0,
      Math.min(
        100,
        memoryContribution +
          masteryContribution +
          contestContribution +
          ratingContribution +
          consistencyContribution +
          adaptiveContribution
      )
    );

    const unifiedScore: UnifiedLearningScore = {
      overallScore,
      memoryContribution,
      masteryContribution,
      contestContribution,
      ratingContribution,
      consistencyContribution,
      adaptiveContribution,
    };

    const alerts: OracleAlert[] = [];
    if (memoryHealth.conceptsAtRiskCount > 0) {
      alerts.push({
        id: 'alert-memory-decay',
        type: 'warning',
        message: `${memoryHealth.conceptsAtRiskCount} concepts are at risk of Ebbinghaus memory decay.`,
        actionNeeded: 'Complete today\'s 15m revision queue.',
      });
    }

    const todayPractice = PlannerEngine.generateDailyPlan(topRecommendations, now);
    const weeklyPractice = PlannerEngine.generateWeeklyPlan(ratingPrediction, weakness, now);

    return {
      userId: profile.userId,
      overallLearningScore: unifiedScore,
      xp: profile.totalXp,
      streak: profile.streakInfo.currentStreak,
      dailyGoal: 'Complete 15m Memory Review + 3 Weakness Repair Problems (~60 mins).',
      weeklyGoal: 'Increase Rating by +35 pts & Maintain 100% Memory Review Coverage.',
      memoryHealth: memoryHealth.overallMemoryScore,
      contestReadiness: contestAnalysis.averagePercentile >= 80 ? 'Advanced' : 'Intermediate',
      ratingProjection: ratingPrediction.projectedRating,
      revisionQueue: Object.freeze([]),
      todayPractice,
      weeklyPractice,
      recommendations: topRecommendations,
      alerts: Object.freeze(alerts),
      insights: {
        biggestStrength: { title: 'Top Domain', metricName: 'Mastery', value: 'Arrays', trend: 'improving', explanation: 'High accuracy' },
        biggestWeakness: { title: 'Weak Domain', metricName: 'Weakness', value: 'DP', trend: 'declining', explanation: 'Low accuracy' },
        fastestImprovingTopic: { title: 'Velocity', metricName: 'Speed', value: 'Strings', trend: 'improving', explanation: 'Rapid solve count' },
        highestForgettingRisk: { title: 'Decay', metricName: 'Risk', value: `${memoryHealth.conceptsAtRiskCount} concepts`, trend: 'declining', explanation: 'Ebbinghaus risk' },
        contestReadinessInsight: { title: 'Contest', metricName: 'Percentile', value: `${contestAnalysis.averagePercentile}%`, trend: 'improving', explanation: 'Good rank' },
        ratingTrendInsight: { title: 'Rating', metricName: 'Projection', value: ratingPrediction.projectedRating, trend: 'improving', explanation: 'Gain expected' },
        learningConsistencyInsight: { title: 'Consistency', metricName: 'Streak', value: profile.streakInfo.currentStreak, trend: 'stable', explanation: 'Daily active' },
        reviewEfficiencyInsight: { title: 'Coverage', metricName: 'Coverage', value: `${memoryHealth.reviewCoveragePercentage}%`, trend: 'improving', explanation: 'Review coverage' },
        generatedAt: now.toISOString(),
      },
      activeStrategy: activeStrategyName,
      lastUpdated: now.toISOString(),
      engineVersions: Object.freeze({
        PlatformEngine: '2.5.0',
        IntelligenceEngine: '3.1.0',
        AdaptiveEngine: '3.2.0',
        ContestEngine: '3.3.0',
        MemoryEngine: '3.5.0',
        OracleEngine: '3.6.0',
      }),
    };
  }
}
