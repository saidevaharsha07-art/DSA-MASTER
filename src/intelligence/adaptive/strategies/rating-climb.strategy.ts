/**
 * Strategy Implementation — Rating Climb Strategy
 * Pushes upper difficulty boundary to stretch problem-solving ceiling.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class RatingClimbStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Rating Climb';
  public readonly description: string = 'Pushes difficulty ceiling to expand rating capabilities.';
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
    const maxCount = options?.maxProblems || 3;

    const rawCandidates = this.provider.getPlatformProblems(platform, { difficulty: 'Medium', limit: 12 });
    const selected = constraintEngine.filterCandidates(rawCandidates, profile, { platform, maxProblems: maxCount });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 40), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: 'Stretch difficulty ceiling by solving higher-tier rating problems.',
        targetTopics: Object.freeze(Array.from(new Set(selected.map((p) => p.topic)))),
        targetPatterns: Object.freeze([]),
        targetDifficulty: 'Medium',
        expectedAccuracy: 0.60,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: 'Successfully break through higher-tier problem solving ceiling.',
      },
      problems: Object.freeze(selected),
      reasoning: `Rating Climb strategy targeted higher difficulty problems on ${platform}.`,
    };
  }
}
