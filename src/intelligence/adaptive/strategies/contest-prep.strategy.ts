/**
 * Strategy Implementation — Contest Preparation Strategy
 * Mixed-topic, timed problem set mimicking contest conditions.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class ContestPreparationStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Contest Preparation';
  public readonly description: string = 'Simulates timed, multi-topic contest conditions to build exam stamina.';
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
    const platform = options?.platform || 'codeforces';
    const maxCount = options?.maxProblems || 4;

    const rawCandidates = this.provider.getPlatformProblems(platform, { limit: 15 });
    const selected = constraintEngine.filterCandidates(rawCandidates, profile, { platform, maxProblems: maxCount });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);
    const topics = Array.from(new Set(selected.map((p) => p.topic)));

    return {
      strategyName: this.name,
      goal: {
        objective: 'Simulate contest environment with timed multi-topic problem solving.',
        targetTopics: Object.freeze(topics),
        targetPatterns: Object.freeze([]),
        targetDifficulty: selected[0]?.difficulty || 'Medium',
        expectedAccuracy: 0.75,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: `Complete ${selected.length} mixed-topic contest problems within target time.`,
      },
      problems: Object.freeze(selected),
      reasoning: `Contest Preparation strategy selected ${selected.length} problems across ${topics.length} topics on ${platform}.`,
    };
  }
}
