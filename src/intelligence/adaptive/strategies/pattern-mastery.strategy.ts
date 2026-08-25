/**
 * Strategy Implementation — Pattern Mastery Strategy
 * Deep dive into a specific algorithmic pattern (e.g., Two Pointers, Sliding Window).
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class PatternMasteryStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Pattern Mastery';
  public readonly description: string = 'Master specific algorithmic patterns across problem variants.';
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  public execute(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    constraintEngine: AdaptiveConstraintEngine,
    options?: { platform?: PlatformId; maxProblems?: number; targetPattern?: string }
  ): StrategyResult {
    const platform = options?.platform || 'codechef';
    const maxCount = options?.maxProblems || 4;
    const pattern = options?.targetPattern || weakness.weakPatterns[0]?.pattern || 'Basic Array Traversal';

    const rawCandidates = this.provider.getPlatformProblems(platform, { pattern, limit: 15 });
    const selected = constraintEngine.filterCandidates(rawCandidates, profile, { platform, maxProblems: maxCount });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: `Master algorithmic pattern '${pattern}' through pattern variant recognition.`,
        targetTopics: Object.freeze(Array.from(new Set(selected.map((p) => p.topic)))),
        targetPatterns: Object.freeze([pattern]),
        targetDifficulty: selected[0]?.difficulty || 'Easy',
        expectedAccuracy: 0.80,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: `Demonstrate pattern mastery for '${pattern}'.`,
      },
      problems: Object.freeze(selected),
      reasoning: `Pattern Mastery strategy targeted pattern '${pattern}' on ${platform}.`,
    };
  }
}
