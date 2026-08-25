/**
 * Adaptive Engine — Smart Problem Selector
 * Integrates constraints, recommendation history, and platform providers to select problem sets.
 */

import { PlatformProblem, PlatformId } from '@/src/platforms/types';
import { LearningProfile } from '../models/learning-profile';
import { AdaptiveConstraintEngine, ConstraintOptions } from './adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';

export class AdaptiveSelector {
  private constraintEngine: AdaptiveConstraintEngine;
  private provider: ProblemProvider;

  constructor(constraintEngine?: AdaptiveConstraintEngine, provider?: ProblemProvider) {
    this.constraintEngine = constraintEngine || new AdaptiveConstraintEngine();
    this.provider = provider || new ProblemProvider();
  }

  /**
   * Selects problems balancing topic, pattern, difficulty, and constraint rules.
   */
  public selectOptimalProblems(
    profile: LearningProfile,
    platform: PlatformId,
    topic?: string,
    difficulty?: string,
    maxCount: number = 5,
    excludedIds?: ReadonlySet<string>
  ): PlatformProblem[] {
    const rawCandidates = this.provider.getPlatformProblems(platform, {
      topic,
      difficulty,
      limit: maxCount * 3,
      solvedStatus: 'unsolved',
    });

    const opts: ConstraintOptions = {
      platform,
      maxProblems: maxCount,
      excludedProblemIds: excludedIds,
    };

    return this.constraintEngine.filterCandidates(rawCandidates, profile, opts);
  }
}
