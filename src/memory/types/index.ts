export interface ReviewHistoryEvent {
  timestamp: string;
  eventType: 'problem_solved' | 'problem_failed' | 'lesson_completed' | 'quiz_completed' | 'recognition_exercise' | 'revision_session';
  score: number;
  timeSpentSeconds: number;
}

export interface MistakeHistoryEvent {
  timestamp: string;
  mistakeId: string;
  context: string;
}

export interface MemoryConcept {
  conceptId: string;
  masteryScore: number;
  confidenceScore: number;
  retrievalStrength: number;
  lastReviewed: string | null;
  nextReview: string | null;
  reviewHistory: ReviewHistoryEvent[];
  mistakeHistory: MistakeHistoryEvent[];
  forgettingRisk: number;
  learningVelocity: number;
  stabilityScore: number;
}

export interface MemoryState {
  concepts: Record<string, MemoryConcept>;
  version: number;
}
