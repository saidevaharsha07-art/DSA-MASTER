/**
 * Intelligence Domain Rules — Pure Scoring Functions
 * Reusable, deterministic score calculations normalized strictly to [0, 100].
 */

/**
 * Calculates normalized Mastery Score (0 to 100).
 * Combines solve count and accuracy weighted by volume.
 */
export function calculateMasteryScore(solvedCount: number, accuracy: number, targetCount: number = 20): number {
  if (solvedCount <= 0) return 0;

  const volumeFactor = Math.min(1.0, solvedCount / targetCount);
  const rawScore = (accuracy * 60) + (volumeFactor * 40);
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}

/**
 * Calculates normalized Weakness Score (0 to 100).
 * High score indicates significant weakness/struggle.
 */
export function calculateWeaknessScore(accuracy: number, totalAttempts: number, failureCount: number): number {
  if (totalAttempts <= 0) return 0;

  const failureRate = 1.0 - accuracy;
  const volumeWeight = Math.min(1.0, totalAttempts / 5);
  const rawScore = (failureRate * 70) + (volumeWeight * 30);
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}

/**
 * Calculates normalized Consistency Score (0 to 100).
 */
export function calculateConsistencyScore(activeDays: number, currentStreak: number, periodDays: number = 30): number {
  if (periodDays <= 0) return 0;

  const activityRatio = Math.min(1.0, activeDays / periodDays);
  const streakFactor = Math.min(1.0, currentStreak / 7);
  const rawScore = (activityRatio * 70) + (streakFactor * 30);
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}

/**
 * Calculates normalized Recommendation Confidence Score (0 to 100).
 */
export function calculateRecommendationScore(priorityWeight: number, dataPointsCount: number, urgency: number): number {
  const dataConfidence = Math.min(1.0, dataPointsCount / 10);
  const rawScore = (priorityWeight * 40) + (dataConfidence * 40) + (urgency * 20);
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}
