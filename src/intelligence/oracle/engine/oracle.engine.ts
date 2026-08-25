/**
 * Oracle AI Engine — Main Engine Facade
 * Provides high-level decision orchestration, Daily Planner, Weekly Planner, and Conflict Resolution.
 */

import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '@/src/intelligence/models/weakness';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';
import { ContestReadinessReport } from '@/src/intelligence/contests/contest.readiness';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';
import { RevisionQueueItem } from '@/src/intelligence/memory/models/review.models';
import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { OracleDashboardSnapshot } from '../models/dashboard.models';
import { OracleInsightReport } from '../models/insight.models';
import { ConflictResolutionReport } from '../models/conflict.models';
import { SimulationScenarioType, SimulationResult } from '../models/simulation.models';
import { DailyStudyPlan, WeeklyStudyPlan } from '../models/planner.models';
import { IOracleStrategy } from '../strategies/strategy.interface';
import { OracleBalancedStrategy } from '../strategies/balanced.strategy';
import { RecommendationOrchestrator } from './recommendation.orchestrator';
import { RankingEngine } from './ranking.engine';
import { ConflictEngine } from './conflict.engine';
import { DashboardEngine } from './dashboard.engine';
import { InsightEngine } from './insight.engine';
import { SimulationEngine } from './simulation.engine';
import { PlannerEngine } from './planner.engine';

export class OracleEngine {
  private orchestrator: RecommendationOrchestrator;
  private activeStrategy: IOracleStrategy;

  constructor(strategy: IOracleStrategy = new OracleBalancedStrategy()) {
    this.orchestrator = new RecommendationOrchestrator();
    this.activeStrategy = strategy;
  }

  public setStrategy(strategy: IOracleStrategy): void {
    this.activeStrategy = strategy;
  }

  public getActiveStrategy(): IOracleStrategy {
    return this.activeStrategy;
  }

  public getRecommendations(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    contestAnalysis: ContestAnalysis,
    contestReadiness: ContestReadinessReport,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport,
    revisionQueue: ReadonlyArray<RevisionQueueItem>
  ): { recommendations: ReadonlyArray<UnifiedOracleRecommendation>; conflictReports: ReadonlyArray<ConflictResolutionReport> } {
    const rawRecs = this.orchestrator.orchestrate(
      profile,
      weakness,
      strength,
      contestAnalysis,
      contestReadiness,
      ratingPrediction,
      memoryHealth,
      revisionQueue,
      this.activeStrategy
    );

    const { resolvedRecommendations, reports } = ConflictEngine.resolveConflicts(rawRecs);
    const ranked = RankingEngine.rank(resolvedRecommendations);

    return { recommendations: ranked, conflictReports: reports };
  }

  public getDashboardSnapshot(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    contestAnalysis: ContestAnalysis,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport,
    topRecommendations: ReadonlyArray<UnifiedOracleRecommendation>
  ): OracleDashboardSnapshot {
    return DashboardEngine.assembleSnapshot(
      profile,
      weakness,
      contestAnalysis,
      ratingPrediction,
      memoryHealth,
      this.activeStrategy.name,
      topRecommendations
    );
  }

  public getInsights(
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    contestAnalysis: ContestAnalysis,
    ratingPrediction: RatingPredictionReport,
    memoryHealth: MemoryHealthReport
  ): OracleInsightReport {
    return InsightEngine.generateInsights(weakness, strength, contestAnalysis, ratingPrediction, memoryHealth);
  }

  public generateDailyPlan(recommendations: ReadonlyArray<UnifiedOracleRecommendation>): DailyStudyPlan {
    return PlannerEngine.generateDailyPlan(recommendations);
  }

  public generateWeeklyPlan(ratingPrediction: RatingPredictionReport, weakness: WeaknessAnalysis): WeeklyStudyPlan {
    return PlannerEngine.generateWeeklyPlan(ratingPrediction, weakness);
  }

  public simulateScenario(snapshot: OracleDashboardSnapshot, scenario: SimulationScenarioType): SimulationResult {
    return SimulationEngine.simulate(snapshot, scenario);
  }
}
