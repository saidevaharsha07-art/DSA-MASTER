/**
 * Strategy Implementation — Balanced Strategy
 * Blends weakness repair (50%), new pattern discovery (30%), and revision (20%).
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class BalancedStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Balanced Learning';
  public readonly description: string = 'Balances weakness repair, new pattern acquisition, and skill revision.';
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  public execute(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    constraintEngine: AdaptiveConstraintEngine,
    options?: { platform?: PlatformId; maxProblems?: number }
  ): StrategyResult {
    const platform = options?.platform || 'codechef';
    const maxCount = options?.maxProblems || 5;

    const weakTopic = weakness.weakTopics[0]?.topic || 'Arrays';
    const strongTopic = strength.masteredTopics[0]?.topic || 'Arrays';

    const weakCandidates = this.provider.getPlatformProblems(platform, { topic: weakTopic, limit: 10 });
    const strongCandidates = this.provider.getPlatformProblems(platform, { topic: strongTopic, limit: 10 });

    const selectedWeak = constraintEngine.filterCandidates(weakCandidates, profile, { platform, maxProblems: Math.ceil(maxCount * 0.6) });
    const selectedStrong = constraintEngine.filterCandidates(strongCandidates, profile, { platform, maxProblems: Math.floor(maxCount * 0.4), allowRecentlySolved: true });

    const combined = [...selectedWeak, ...selectedStrong];
    const totalEstTime = combined.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: `Maintain balanced growth across weakness repair (${weakTopic}) and mastery reinforcement (${strongTopic}).`,
        targetTopics: Object.freeze([weakTopic, strongTopic]),
        targetPatterns: Object.freeze([]),
        targetDifficulty: combined[0]?.difficulty || 'Easy',
        expectedAccuracy: 0.75,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: 'Complete practice session with steady accuracy across topics.',
      },
      problems: Object.freeze(combined),
      reasoning: `Balanced strategy mixed 60% weakness repair in '${weakTopic}' and 40% reinforcement in '${strongTopic}'.`,
    };
  }
}
