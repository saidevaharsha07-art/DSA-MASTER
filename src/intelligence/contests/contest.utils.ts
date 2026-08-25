/**
 * Contest Intelligence — Analytical Utilities
 * Pure calculations for percentiles, rank ratios, and performance metrics.
 */

export function calculateContestPercentile(rank: number, totalParticipants: number): number {
  if (totalParticipants <= 0 || rank <= 0) return 0.0;
  const percentile = ((totalParticipants - rank + 1) / totalParticipants) * 100;
  return Number(Math.max(0, Math.min(100, percentile)).toFixed(1));
}

export function calculateAverageSolveTimeMinutes(durationMinutes: number, solvedCount: number): number {
  if (solvedCount <= 0) return durationMinutes;
  return Number((durationMinutes / solvedCount).toFixed(1));
}
