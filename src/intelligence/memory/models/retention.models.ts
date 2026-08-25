/**
 * Memory Engine — Retention & Health Report Models
 * Defines RetentionReport, LearningVelocity, and MemoryHealthReport.
 */

export interface LearningVelocity {
  readonly conceptsLearnedPerWeek: number;
  readonly masteryVelocityScore: number; // 0 to 100
  readonly improvementRate: number; // percentage
}

export interface MemoryHealthReport {
  readonly overallMemoryScore: number; // 0 to 100
  readonly averageRetention: number; // 0 to 100
  readonly totalConceptsTracked: number;
  readonly conceptsAtRiskCount: number;
  readonly overdueReviewsCount: number;
  readonly stableConceptsCount: number;
  readonly forgottenConceptsCount: number;
  readonly reviewCoveragePercentage: number; // 0 to 100
  readonly estimatedWeeklyWorkloadMinutes: number;
  readonly generatedAt: string;
}

export interface RetentionReport {
  readonly userId: string;
  readonly averageRetentionRate: number; // 0 to 100
  readonly overallStabilityDays: number;
  readonly learningVelocity: LearningVelocity;
  readonly longestRetainedConceptId?: string;
  readonly weakestConceptId?: string;
  readonly generatedAt: string;
}
