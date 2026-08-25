/**
 * Pure Stateless Analyzer — Difficulty Analyzer
 * Evaluates difficulty progression, ceiling, and readiness to advance.
 */

import { PracticeAttempt } from '../models/practice-history';
import { DifficultyProgressionState } from '../models/learning-profile';
import { calculateAccuracy, groupAttemptsByDifficulty } from '../utils/metrics.calculator';
import { isReadyToAdvanceDifficulty } from '../domain/mastery.rules';

export class DifficultyAnalyzer {
  /**
   * Pure function: analyzes difficulty progression states across standard tiers.
   */
  public static analyzeDifficultyProgression(
    attempts: ReadonlyArray<PracticeAttempt>
  ): Map<string, DifficultyProgressionState> {
    const progressionMap = new Map<string, DifficultyProgressionState>();
    const grouped = groupAttemptsByDifficulty(attempts);

    const standardTiers = [
      'Beginner',
      'Easy',
      'Easy-Medium',
      'Medium',
      'Medium-Hard',
      'Hard',
      'Expert',
    ];

    let highestSolvedTier = 'Beginner';

    for (const tier of standardTiers) {
      const tierAttempts = grouped.get(tier) || [];
      const solvedCount = new Set(tierAttempts.filter((a) => a.status === 'accepted').map((a) => a.problemId)).size;
      const accuracy = calculateAccuracy(tierAttempts);

      if (solvedCount > 0) {
        highestSolvedTier = tier;
      }

      const readyToAdvance = isReadyToAdvanceDifficulty(solvedCount, accuracy);

      progressionMap.set(tier, {
        difficulty: tier,
        solvedCount,
        accuracy,
        isCeiling: false,
        readyToAdvance,
      });
    }

    // Mark ceiling
    const ceilingState = progressionMap.get(highestSolvedTier);
    if (ceilingState) {
      progressionMap.set(highestSolvedTier, {
        ...ceilingState,
        isCeiling: true,
      });
    }

    return progressionMap;
  }
}
