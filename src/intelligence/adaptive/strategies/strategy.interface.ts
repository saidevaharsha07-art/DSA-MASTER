/**
 * Strategy Pattern Interface — IAdaptiveStrategy
 * Contract implemented by all 8 interchangeable adaptive practice strategies.
 */

import { PlatformProblem, PlatformId } from '@/src/platforms/types';
import { LearningProfile } from '../../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../../models/weakness';
import { SessionGoal } from '../adaptive.session';
import { AdaptiveConstraintEngine, ConstraintOptions } from '../adaptive.constraints';

export interface StrategyResult {
  readonly strategyName: string;
  readonly goal: SessionGoal;
  readonly problems: ReadonlyArray<PlatformProblem>;
  readonly reasoning: string;
}

export interface IAdaptiveStrategy {
  readonly name: string;
  readonly description: string;

  execute(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    constraintEngine: AdaptiveConstraintEngine,
    options?: {
      platform?: PlatformId;
      maxProblems?: number;
      targetTopic?: string;
      constraintOpts?: ConstraintOptions;
    }
  ): StrategyResult;
}
