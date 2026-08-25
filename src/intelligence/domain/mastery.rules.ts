/**
 * Intelligence Domain Rules — Mastery Levels & Progression
 * Standardized thresholds for evaluating mastery levels and advancement readiness.
 */

import { MasteryLevel } from '../models/learning-profile';

export const MASTERY_THRESHOLDS = {
  NOVICE_MAX: 25,
  INTERMEDIATE_MAX: 55,
  PROFICIENT_MAX: 80,
  MASTER_MIN: 81,
} as const;

/**
 * Determines MasteryLevel category from normalized score (0-100).
 */
export function getMasteryLevel(score: number): MasteryLevel {
  if (score <= MASTERY_THRESHOLDS.NOVICE_MAX) return 'Novice';
  if (score <= MASTERY_THRESHOLDS.INTERMEDIATE_MAX) return 'Intermediate';
  if (score <= MASTERY_THRESHOLDS.PROFICIENT_MAX) return 'Proficient';
  return 'Master';
}

/**
 * Evaluates whether user is ready to advance difficulty tier.
 */
export function isReadyToAdvanceDifficulty(solvedInTier: number, accuracyInTier: number, minSolved: number = 8, minAccuracy: number = 0.70): boolean {
  return solvedInTier >= minSolved && accuracyInTier >= minAccuracy;
}
