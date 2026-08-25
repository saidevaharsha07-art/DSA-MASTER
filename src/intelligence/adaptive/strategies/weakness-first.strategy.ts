/**
 * Strategy Implementation — Weakness First Strategy
 * Prioritizes problems from user's lowest accuracy / highest weakness score topics.
 */

import { IAdaptiveStrategy, StrategyResult } from './strategy.interface';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { AdaptiveConstraintEngine } from '../adaptive.constraints';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformId } from '@/src/platforms/types';

export class WeaknessFirstStrategy implements IAdaptiveStrategy {
  public readonly name: string = 'Weakness First';
  public readonly description: string = 'Prioritizes topic areas with lowest accuracy to rapidly repair skill gaps.';
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

    const weakTopic = options?.targetTopic || weakness.weakTopics[0]?.topic || 'Arrays';
    const rawCandidates = this.provider.getPlatformProblems(platform, { topic: weakTopic, limit: 15 });
    const selected = constraintEngine.filterCandidates(rawCandidates, profile, { platform, maxProblems: maxCount });

    const totalEstTime = selected.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);

    return {
      strategyName: this.name,
      goal: {
        objective: `Repair skill gaps in ${weakTopic} by solving targeted practice problems.`,
        targetTopics: Object.freeze([weakTopic]),
        targetPatterns: Object.freeze([]),
        targetDifficulty: selected[0]?.difficulty || 'Easy',
        expectedAccuracy: 0.70,
        estimatedDurationMinutes: totalEstTime,
        successCriteria: `Achieve at least 70% accuracy on selected ${weakTopic} problems.`,
      },
      problems: Object.freeze(selected),
      reasoning: `Weakness First strategy targeted '${weakTopic}' (Weakness Score: ${weakness.weakTopics[0]?.weaknessScore || 50}/100).`,
    };
  }
}
