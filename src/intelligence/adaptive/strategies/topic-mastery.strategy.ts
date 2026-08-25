/**
 * Strategy Implementation — Topic Mastery Strategy
 * Deep dive into a single specified topic until mastery threshold is achieved.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class TopicMasteryStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Topic Mastery';
  public readonly description: string = 'Deep dive focused session on a single topic area until proficiency.';
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  public execute(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    constraintEngine: AdaptiveConstraintEngine,
    options?: { platform?: PlatformId; maxProblems?: number; targetTopic?: string }
  ): StrategyResult {
    const platform = options?.platform || 'codechef';
    const maxCount = options?.maxProblems || 5;
    const topic = options?.targetTopic || weakness.weakTopics[0]?.topic || 'Arrays';

    const rawCandidates = this.provider.getPlatformProblems(platform, { topic, limit: 15 });
    const selected = constraintEngine.filterCandidates(rawCandidates, profile, { platform, maxProblems: maxCount });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: `Achieve mastery threshold in ${topic} through focused practice.`,
        targetTopics: Object.freeze([topic]),
        targetPatterns: Object.freeze([]),
        targetDifficulty: selected[0]?.difficulty || 'Easy',
        expectedAccuracy: 0.80,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: `Reach 80%+ accuracy across focused ${topic} problem set.`,
      },
      problems: Object.freeze(selected),
      reasoning: `Topic Mastery strategy selected ${selected.length} problems for deep-dive in '${topic}'.`,
    };
  }
}
