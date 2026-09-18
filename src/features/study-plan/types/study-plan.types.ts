/**
 * DSA MASTER — Daily Study Planner 2.0 TypeScript Definitions
 * Grounded data structures for adaptive daily study plans, time budgets,
 * activity types, mid-day replanning, and end-of-day factual metrics.
 */

export type StudyPlanActivityType =
  | 'LEARN'
  | 'PRACTICE'
  | 'REVISE'
  | 'INTERVIEW'
  | 'REVIEW';

export type StudyPlanItemStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'skipped';

export type TimeBudgetPreset = 20 | 30 | 45 | 60 | 90 | 120;

export interface StudyPlanItem {
  readonly id: string;
  readonly type: StudyPlanActivityType;
  readonly title: string;
  readonly description: string;
  readonly area: string;
  readonly areaSlug: string;
  readonly subtopic: string;
  readonly subtopicSlug: string;
  readonly pattern: string;
  readonly patternSlug: string;
  readonly platform?: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';
  readonly estimatedMinutes: number;
  readonly actualMinutes: number;
  readonly reason: string;
  readonly actionUrl: string;
  readonly status: StudyPlanItemStatus;
  readonly problemIds?: string[];
  readonly completedAt?: string;
  readonly startedAt?: string;
}

export interface DailyStudyPlan {
  readonly id: string;
  readonly userId: string;
  readonly date: string; // YYYY-MM-DD
  readonly timeBudgetMinutes: number;
  readonly totalEstimatedMinutes: number;
  readonly actualTimeSpentMinutes: number;
  readonly status: 'active' | 'completed';
  readonly items: StudyPlanItem[];
  readonly primaryMissionId: string;
  readonly completedCount: number;
  readonly skippedCount: number;
  readonly remainingCount: number;
  readonly lastReplannedAt?: string;
  readonly replanReason?: string;
  readonly isZeroState?: boolean;
}

export interface EndOfDaySummary {
  readonly date: string;
  readonly totalEstimatedMinutes: number;
  readonly actualTimeSpentMinutes: number;
  readonly activitiesCompleted: number;
  readonly activitiesSkipped: number;
  readonly problemsSolvedCount: number;
  readonly revisionItemsReviewed: number;
  readonly interviewMinutes: number;
  readonly patternsPracticed: string[];
  readonly nextRecommendedWork: {
    readonly title: string;
    readonly reason: string;
    readonly actionUrl: string;
  }[];
}
