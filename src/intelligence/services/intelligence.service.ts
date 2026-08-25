/**
 * Intelligence Service — Main Facade
 * Unified entrypoint orchestrating ProfileService, Analyzers, RecommendationEngines, and PlatformEngine.
 */

import { ProfileService } from './profile.service';
import { StatisticsService, UserStatisticsSummary } from './statistics.service';
import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '../analyzers/strength.analyzer';
import { RecommendationEngine } from '../recommendations/recommendation.engine';
import { PracticeEngine } from '../recommendations/practice.engine';
import { NextProblemEngine } from '../recommendations/next-problem.engine';
import { IIntelligenceStorage } from '../storage/intelligence.storage';
import { LearningProfile } from '../models/learning-profile';
import { PracticeAttempt } from '../models/practice-history';
import { WeaknessAnalysis, StrengthAnalysis } from '../models/weakness';
import { RecommendationCard, PracticeSetRecommendation } from '../models/recommendation';
import { PlatformProblem, PlatformId } from '@/src/platforms/types';
import { ProblemProvider } from '@/src/platforms/problem.provider';

export class IntelligenceService {
  private profileService: ProfileService;
  private statisticsService: StatisticsService;
  private recommendationEngine: RecommendationEngine;
  private practiceEngine: PracticeEngine;
  private nextProblemEngine: NextProblemEngine;
  private storage: IIntelligenceStorage;

  constructor(storage?: IIntelligenceStorage, provider?: ProblemProvider) {
    const probProvider = provider || new ProblemProvider();
    this.profileService = new ProfileService(storage);
    this.statisticsService = new StatisticsService();
    this.recommendationEngine = new RecommendationEngine(probProvider);
    this.practiceEngine = new PracticeEngine(probProvider);
    this.nextProblemEngine = new NextProblemEngine(probProvider);
    this.storage = storage || this.profileService['storage'];
  }

  /**
   * Gets or initializes user learning profile.
   */
  public async getProfile(userId: string): Promise<LearningProfile> {
    return this.profileService.getProfile(userId);
  }

  /**
   * Records a problem attempt/solve.
   */
  public async recordAttempt(attempt: PracticeAttempt): Promise<LearningProfile> {
    return this.profileService.recordAttempt(attempt);
  }

  /**
   * Runs pure weakness analysis on user practice history.
   */
  public async analyzeWeakness(userId: string): Promise<WeaknessAnalysis> {
    const attempts = await this.storage.getAttempts(userId);
    const profile = await this.getProfile(userId);
    return WeaknessAnalyzer.analyze(attempts, profile);
  }

  /**
   * Runs pure strength analysis on user practice history.
   */
  public async analyzeStrength(userId: string): Promise<StrengthAnalysis> {
    const attempts = await this.storage.getAttempts(userId);
    const profile = await this.getProfile(userId);
    return StrengthAnalyzer.analyze(attempts, profile);
  }

  /**
   * Gets explainable recommendation cards for user.
   */
  public async getRecommendations(userId: string): Promise<ReadonlyArray<RecommendationCard>> {
    const weakness = await this.analyzeWeakness(userId);
    const strength = await this.analyzeStrength(userId);
    return this.recommendationEngine.generateRecommendations(weakness, strength);
  }

  /**
   * Generates a tailored adaptive practice set.
   */
  public async generatePracticeSet(
    userId: string,
    options?: { platform?: PlatformId; topic?: string; pattern?: string; difficulty?: string; limit?: number }
  ): Promise<PracticeSetRecommendation> {
    const profile = await this.getProfile(userId);
    return this.practiceEngine.generatePracticeSet(profile, options);
  }

  /**
   * Picks the single optimal next problem for user.
   */
  public async getNextProblem(userId: string, preferredPlatform: PlatformId = 'codechef'): Promise<PlatformProblem | null> {
    const profile = await this.getProfile(userId);
    const weakness = await this.analyzeWeakness(userId);
    return this.nextProblemEngine.selectNextProblem(profile, weakness, preferredPlatform);
  }

  /**
   * Gets structured platform-independent statistics summary.
   */
  public async getStatistics(userId: string): Promise<UserStatisticsSummary> {
    const profile = await this.getProfile(userId);
    const attempts = await this.storage.getAttempts(userId);
    return this.statisticsService.generateStatistics(profile, attempts);
  }
}
