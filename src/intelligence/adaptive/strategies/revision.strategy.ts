/**
 * Strategy Implementation — Revision Strategy
 * Focuses on previously solved problems to reinforce retention and prevent skill decay.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class RevisionStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Revision Focus';
  public readonly description: string = 'Revisits previously solved concepts to reinforce long-term memory.';
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
    const maxCount = options?.maxProblems || 4;

    const strongTopic = strength.masteredTopics[0]?.topic || 'Arrays';
    const candidates = this.provider.getPlatformProblems(platform, { topic: strongTopic, limit: 10 });
    const selected = constraintEngine.filterCandidates(candidates, profile, { platform, maxProblems: maxCount, allowRecentlySolved: true });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: `Review previous solves in ${strongTopic} for rapid recall and zero skill decay.`,
        targetTopics: Object.freeze([strongTopic]),
        targetPatterns: Object.freeze([]),
        targetDifficulty: selected[0]?.difficulty || 'Easy',
        expectedAccuracy: 0.90,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: `Achieve 90%+ speed and accuracy on revision problems.`,
      },
      problems: Object.freeze(selected),
      reasoning: `Revision Focus strategy selected ${selected.length} problems for memory consolidation in '${strongTopic}'.`,
    };
  }
}
