/**
 * Recommendation Engine — Adaptive Practice Engine
 * Generates structured practice problem sets tailored to user profile and optional filters.
 */

import { PracticeSetRecommendation } from '../models/recommendation';
import { LearningProfile } from '../models/learning-profile';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId, PlatformQueryOptions } from '@/src/platforms/types';

export class PracticeEngine {
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  /**
   * Generates a tailored practice set recommendation matching target options.
   */
  public generatePracticeSet(
    profile: LearningProfile,
    options?: {
      platform?: PlatformId;
      topic?: string;
      pattern?: string;
      difficulty?: string;
      limit?: number;
    }
  ): PracticeSetRecommendation {
    const targetPlatform = options?.platform || 'codechef';
    const targetTopic = options?.topic || 'Arrays';
    const targetDifficulty = options?.difficulty || 'Easy';

    const queryOpts: PlatformQueryOptions = {
      difficulty: targetDifficulty,
      topic: targetTopic,
      pattern: options?.pattern,
      limit: options?.limit || 5,
      solvedStatus: 'unsolved',
    };

    const problems = this.provider.getPlatformProblems(targetPlatform, queryOpts);

    // Exclude already solved problem IDs in profile
    const unsolved = problems.filter((p) => !profile.solvedProblemIds.has(p.id));
    const problemIds = unsolved.map((p) => p.id);

    const totalEstTime = unsolved.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);
    const totalXp = unsolved.reduce((sum, p) => sum + (p.xp || 20), 0);

    return {
      id: `pset-${targetPlatform}-${targetTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: `${targetTopic} Adaptive Practice Set`,
      targetTopic,
      targetPattern: options?.pattern,
      targetDifficulty,
      targetPlatform,
      problemIds: Object.freeze(problemIds),
      estimatedTotalTimeMinutes: totalEstTime,
      totalXpAvailable: totalXp,
      rationale: `Adaptive set targeting ${targetTopic} at ${targetDifficulty} tier on ${targetPlatform}.`,
    };
  }
}
