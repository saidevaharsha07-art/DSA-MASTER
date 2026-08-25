/**
 * Memory Engine — Memory Models & State Machine Types
 * Defines ConceptMemory, MemoryState, and memory tracking structures.
 */

export type MemoryState =
  | 'New'
  | 'Learning'
  | 'Reinforcing'
  | 'Stable'
  | 'Mastered'
  | 'AtRisk'
  | 'Forgotten';

export interface ConceptMemory {
  readonly conceptId: string;
  readonly userId: string;
  readonly topic: string;
  readonly pattern: string;
  readonly state: MemoryState;
  readonly masteryScore: number; // 0 to 100
  readonly memoryStrength: number; // 0 to 100
  readonly stabilityScore: number; // Stability in days
  readonly retentionRate: number; // 0 to 100
  readonly forgettingRisk: number; // 0 to 100
  readonly reviewCount: number;
  readonly successfulReviews: number;
  readonly failedReviews: number;
  readonly firstLearned: string; // ISO timestamp
  readonly lastReviewed: string; // ISO timestamp
  readonly nextReview: string; // ISO timestamp
  readonly estimatedRecallProbability: number; // 0.0 to 1.0
}
