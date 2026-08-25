/**
 * Oracle AI Engine — High-Level Public Service API
 * The single unified entry point for production UI components and external consumers.
 */

import { OracleEngine } from '../engine/oracle.engine';
import { DailyStudyPlan, WeeklyStudyPlan } from '../models/planner.models';
import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { OracleDashboardSnapshot } from '../models/dashboard.models';
import { OracleInsightReport } from '../models/insight.models';
import { ConflictResolutionReport } from '../models/conflict.models';
import { SimulationScenarioType, SimulationResult } from '../models/simulation.models';
import { IOracleStrategy } from '../strategies/strategy.interface';
import { OracleContextService, OracleContextBundle } from './context.service';

export class OracleService {
  private engine: OracleEngine;

  constructor(strategy?: IOracleStrategy) {
    this.engine = new OracleEngine(strategy);
  }

  public setStrategy(strategy: IOracleStrategy): void {
    this.engine.setStrategy(strategy);
  }

  public getDashboardSnapshot(bundle: OracleContextBundle): OracleDashboardSnapshot {
    const { recommendations } = this.getRecommendations(bundle);
    return this.engine.getDashboardSnapshot(
      bundle.profile,
      bundle.weakness,
      bundle.contestAnalysis,
      bundle.ratingPrediction,
      bundle.memoryHealth,
      recommendations
    );
  }

  public getRecommendations(
    bundle: OracleContextBundle
  ): { recommendations: ReadonlyArray<UnifiedOracleRecommendation>; conflictReports: ReadonlyArray<ConflictResolutionReport> } {
    return this.engine.getRecommendations(
      bundle.profile,
      bundle.weakness,
      bundle.strength,
      bundle.contestAnalysis,
      bundle.contestReadiness,
      bundle.ratingPrediction,
      bundle.memoryHealth,
      bundle.revisionQueue
    );
  }

  public getInsights(bundle: OracleContextBundle): OracleInsightReport {
    return this.engine.getInsights(
      bundle.weakness,
      bundle.strength,
      bundle.contestAnalysis,
      bundle.ratingPrediction,
      bundle.memoryHealth
    );
  }

  public getDailyPlan(bundle: OracleContextBundle): DailyStudyPlan {
    const { recommendations } = this.getRecommendations(bundle);
    return this.engine.generateDailyPlan(recommendations);
  }

  public getWeeklyPlan(bundle: OracleContextBundle): WeeklyStudyPlan {
    return this.engine.generateWeeklyPlan(bundle.ratingPrediction, bundle.weakness);
  }

  public simulateScenario(bundle: OracleContextBundle, scenario: SimulationScenarioType): SimulationResult {
    const snapshot = this.getDashboardSnapshot(bundle);
    return this.engine.simulateScenario(snapshot, scenario);
  }
}
