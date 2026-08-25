/**
 * Adaptive Practice Engine — Main Orchestrator
 * Selects and executes interchangeable strategies, enforces constraints, and produces explainable adaptive sessions.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategies/strategy.interface';
import { WeaknessFirstStrategy } from './strategies/weakness-first.strategy';
import { BalancedStrategy } from './strategies/balanced.strategy';
import { RevisionStrategy } from './strategies/revision.strategy';
import { ContestPreparationStrategy } from './strategies/contest-prep.strategy';
import { RatingClimbStrategy } from './strategies/rating-climb.strategy';
import { TopicMasteryStrategy } from './strategies/topic-mastery.strategy';
import { PatternMasteryStrategy } from './strategies/pattern-mastery.strategy';
import { AdaptiveConstraintEngine } from './adaptive.constraints';
import { ProgressionEngine, ProgressionDecision } from './adaptive.progression';
import { LearningProfile } from '../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../models/weakness';
import { AdaptiveSession } from './adaptive.session';
import { AdaptiveDecisionExplanation } from './adaptive.explanation';
import { PlatformId } from '@/src/platforms/types';
import { ProblemProvider } from '@/src/platforms/problem.provider';

export type StrategyName =
  | 'Weakness First'
  | 'Balanced Learning'
  | 'Revision Focus'
  | 'Contest Preparation'
  | 'Rating Climb'
  | 'Topic Mastery'
  | 'Pattern Mastery';

export class AdaptiveEngine {
  private strategies: Map<string, IAdaptiveStrategy> = new Map();
  private constraintEngine: AdaptiveConstraintEngine;
  private progressionEngine: ProgressionEngine;
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
    this.constraintEngine = new AdaptiveConstraintEngine();
    this.progressionEngine = new ProgressionEngine();

    this.registerStrategy(new WeaknessFirstStrategy(this.provider));
    this.registerStrategy(new BalancedStrategy(this.provider));
    this.registerStrategy(new RevisionStrategy(this.provider));
    this.registerStrategy(new ContestPreparationStrategy(this.provider));
    this.registerStrategy(new RatingClimbStrategy(this.provider));
    this.registerStrategy(new TopicMasteryStrategy(this.provider));
    this.registerStrategy(new PatternMasteryStrategy(this.provider));
  }

  public registerStrategy(strategy: IAdaptiveStrategy): void {
    this.strategies.set(strategy.name.toLowerCase(), strategy);
  }

  /**
   * Generates a complete AdaptiveSession by choosing and executing an optimal strategy.
   */
  public generateSession(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    preferredStrategy?: StrategyName,
    options?: { platform?: PlatformId; maxProblems?: number; targetTopic?: string }
  ): { session: AdaptiveSession; explanation: AdaptiveDecisionExplanation } {
    const strategy = this.selectStrategy(profile, weakness, strength, preferredStrategy);
    const result: StrategyResult = strategy.execute(
      profile,
      weakness,
      strength,
      this.constraintEngine,
      options
    );

    const totalXp = result.problems.reduce((sum, p) => sum + (p.xp || 25), 0);

    const session: AdaptiveSession = {
      id: `session-adapt-${Date.now()}`,
      userId: profile.userId,
      title: `${strategy.name}: ${result.goal.targetTopics[0] || 'Core Learning'}`,
      strategyName: strategy.name,
      goal: result.goal,
      selectedProblems: result.problems,
      targetPlatform: options?.platform || 'codechef',
      totalXpAvailable: totalXp,
      createdAt: new Date().toISOString(),
    };

    const explanation: AdaptiveDecisionExplanation = {
      selectedStrategy: strategy.name,
      reasoning: result.reasoning,
      confidenceScore: 88,
      contributingFactors: Object.freeze([
        `Weakness count: ${weakness.weakTopics.length}`,
        `Mastered topic count: ${strength.masteredTopics.length}`,
        `Current streak: ${profile.streakInfo.currentStreak} days`,
      ]),
      createdAt: new Date().toISOString(),
    };

    return { session, explanation };
  }

  /**
   * Evaluates progression decision for user profile.
   */
  public evaluateProgression(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    currentTopic?: string,
    currentDifficulty?: string
  ): ProgressionDecision {
    return this.progressionEngine.evaluateProgression(profile, weakness, currentTopic, currentDifficulty);
  }

  private selectStrategy(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    preferred?: StrategyName
  ): IAdaptiveStrategy {
    if (preferred && this.strategies.has(preferred.toLowerCase())) {
      return this.strategies.get(preferred.toLowerCase())!;
    }

    // Dynamic strategy selection based on profile state
    if (weakness.weakTopics.length > 0) {
      return this.strategies.get('weakness first')!;
    }

    if (strength.masteredTopics.length > 0 && profile.streakInfo.currentStreak > 3) {
      return this.strategies.get('balanced learning')!;
    }

    return this.strategies.get('weakness first')!;
  }
}
