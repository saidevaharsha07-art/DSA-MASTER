/**
 * Oracle AI Engine — Dashboard Snapshot Model
 * Unified OracleDashboardSnapshot model aggregating all engine metrics into a single backend snapshot.
 */

import { UnifiedOracleRecommendation } from './recommendation.models';
import { OracleInsightReport } from './insight.models';
import { DailyStudyPlan, WeeklyStudyPlan } from './planner.models';
import { RevisionQueueItem } from '@/src/intelligence/memory/models/review.models';

export interface UnifiedLearningScore {
  readonly overallScore: number; // 0 to 100
  readonly memoryContribution: number; // 25% weight
  readonly masteryContribution: number; // 25% weight
  readonly contestContribution: number; // 15% weight
  readonly ratingContribution: number; // 15% weight
  readonly consistencyContribution: number; // 10% weight
  readonly adaptiveContribution: number; // 10% weight
}

export interface OracleAlert {
  readonly id: string;
  readonly type: 'warning' | 'info' | 'critical';
  readonly message: string;
  readonly actionNeeded: string;
}

export interface OracleDashboardSnapshot {
  readonly userId: string;
  readonly overallLearningScore: UnifiedLearningScore;
  readonly xp: number;
  readonly streak: number;
  readonly dailyGoal: string;
  readonly weeklyGoal: string;
  readonly memoryHealth: number; // 0 to 100
  readonly contestReadiness: string;
  readonly ratingProjection: number;
  readonly revisionQueue: ReadonlyArray<RevisionQueueItem>;
  readonly todayPractice: DailyStudyPlan;
  readonly weeklyPractice: WeeklyStudyPlan;
  readonly recommendations: ReadonlyArray<UnifiedOracleRecommendation>;
  readonly alerts: ReadonlyArray<OracleAlert>;
  readonly insights: OracleInsightReport;
  readonly activeStrategy: string;
  readonly lastUpdated: string;
  readonly engineVersions: Record<string, string>;
}
