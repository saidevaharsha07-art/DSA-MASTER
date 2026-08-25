/**
 * Memory Engine — Forgetting & Timeline Models
 * Defines ForgettingRiskReport, RecallProbability, and MemoryTimelinePoint.
 */

export interface MemoryTimelinePoint {
  readonly timestamp: string;
  readonly memoryStrength: number;
  readonly stabilityScore: number;
  readonly retentionRate: number;
  readonly recallProbability: number;
}

export interface ForgettingRiskReport {
  readonly conceptId: string;
  readonly topic: string;
  readonly pattern: string;
  readonly recallProbability: number; // 0.0 to 1.0
  readonly forgettingRisk: number; // 0 to 100
  readonly urgency: 'Critical' | 'High' | 'Moderate' | 'Low';
  readonly daysSinceLastReview: number;
  readonly daysOverdue: number;
  readonly recommendedAction: string;
}
