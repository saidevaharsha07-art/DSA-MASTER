/**
 * Contest Intelligence — Main Engine Facade
 * Orchestrates contest recording, history tracking, analysis, readiness evaluation, and contest recommendations.
 */

import { ContestRecord, ContestAnalysis, ContestSnapshot } from './contest.models';
import { ContestHistoryTracker } from './contest.history';
import { ContestAnalyzer } from './contest.analyzer';
import { ContestReadinessEvaluator, ContestReadinessReport } from './contest.readiness';
import { ContestRecommendationEngine } from './contest.recommendations';
import { ContestStatisticsGenerator, ContestStatisticsSummary } from './contest.statistics';
import { LearningProfile } from '../models/learning-profile';
import { RecommendationCard } from '../models/recommendation';

export class ContestEngine {
  private historyTracker: ContestHistoryTracker;
  private recEngine: ContestRecommendationEngine;

  constructor() {
    this.historyTracker = new ContestHistoryTracker();
    this.recEngine = new ContestRecommendationEngine();
  }

  public recordContest(userId: string, record: ContestRecord): void {
    this.historyTracker.recordContest(userId, record);
  }

  public getHistory(userId: string): ReadonlyArray<ContestRecord> {
    return this.historyTracker.getHistory(userId);
  }

  public getSnapshots(userId: string): ReadonlyArray<ContestSnapshot> {
    return this.historyTracker.getSnapshots(userId);
  }

  public analyzeContests(userId: string): ContestAnalysis {
    const history = this.getHistory(userId);
    return ContestAnalyzer.analyze(userId, history);
  }

  public evaluateReadiness(profile: LearningProfile): ContestReadinessReport {
    const history = this.getHistory(profile.userId);
    return ContestReadinessEvaluator.evaluateReadiness(profile, history);
  }

  public generateRecommendations(userId: string, profile: LearningProfile): ReadonlyArray<RecommendationCard> {
    const analysis = this.analyzeContests(userId);
    const readiness = this.evaluateReadiness(profile);
    return this.recEngine.generateRecommendations(analysis, readiness);
  }

  public getStatisticsSummary(userId: string): ContestStatisticsSummary {
    const history = this.getHistory(userId);
    return ContestStatisticsGenerator.generateSummary(userId, history);
  }
}
