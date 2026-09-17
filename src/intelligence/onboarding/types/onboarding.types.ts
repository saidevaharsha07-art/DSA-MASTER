/**
 * DSA MASTER — Onboarding Domain Models & Types
 * Strict, deterministic data contracts for first-time learner onboarding,
 * weak prior signals, diagnostic micro-assessment, and first mission handoff.
 */

export type OnboardingStatus =
  | 'ONBOARDING_NOT_STARTED'
  | 'ONBOARDING_IN_PROGRESS'
  | 'ONBOARDING_COMPLETED'
  | 'ONBOARDING_SKIPPED';

export type SelfReportedLevel =
  | 'beginner'
  | 'basics'
  | 'easy_solver'
  | 'medium_solver'
  | 'interview_prep'
  | 'contest_prep';

export type LearningGoal =
  | 'college_exams'
  | 'coding_interviews'
  | 'product_interviews'
  | 'competitive_programming'
  | 'general_improvement'
  | 'strong_fundamentals';

export interface AssessmentOption {
  readonly id: string;
  readonly text: string;
}

export interface AssessmentQuestion {
  readonly id: string;
  readonly order: number;
  readonly title: string;
  readonly question: string;
  readonly codeSnippet?: string;
  readonly options: ReadonlyArray<AssessmentOption>;
  readonly correctOptionId: string;
  readonly explanation: string;
  readonly difficulty: 'Easy' | 'Medium';
  readonly topic: string;
  readonly topicId: string;
}

export interface AssessmentAnswer {
  readonly questionId: string;
  readonly selectedOptionId?: string;
  readonly isCorrect: boolean;
  readonly skipped: boolean;
  readonly timeSpentMs: number;
  readonly topicId: string;
}

export interface AssessmentResult {
  readonly totalQuestions: number;
  readonly answeredCount: number;
  readonly correctCount: number;
  readonly skippedCount: number;
  readonly totalTimeSpentMs: number;
  readonly scorePercentage: number;
  readonly answers: ReadonlyArray<AssessmentAnswer>;
  readonly evidenceSummary: ReadonlyArray<string>;
}

export interface FirstMission {
  readonly id: string;
  readonly topic: string;
  readonly topicId: string;
  readonly actionType: 'LEARN' | 'PRACTICE';
  readonly title: string;
  readonly description: string;
  readonly steps: ReadonlyArray<string>;
  readonly destinationRoute: string;
  readonly estimatedMinutes: number;
  readonly whySelected: ReadonlyArray<string>;
}

export interface OnboardingProfile {
  readonly userId: string;
  readonly status: OnboardingStatus;
  readonly currentStep: number;
  readonly selfReportedLevel?: SelfReportedLevel;
  readonly learningGoal?: LearningGoal;
  readonly selectedTopics: ReadonlyArray<string>;
  readonly assessmentScore?: number;
  readonly assessmentEvidence: ReadonlyArray<string>;
  readonly assessmentResult?: AssessmentResult;
  readonly firstMission?: FirstMission;
  readonly completedAt?: string;
  readonly skippedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
