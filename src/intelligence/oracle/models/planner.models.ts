/**
 * Oracle AI Engine — Planner Models
 * Defines DailyStudyBlock, DailyStudyPlan, and WeeklyStudyPlan models.
 */

export interface DailyStudyBlock {
  readonly title: string;
  readonly durationMinutes: number;
  readonly problems: ReadonlyArray<string>;
  readonly revision: ReadonlyArray<string>;
  readonly goals: ReadonlyArray<string>;
  readonly reason: string;
}

export interface DailyStudyPlan {
  readonly morning: DailyStudyBlock;
  readonly afternoon: DailyStudyBlock;
  readonly evening: DailyStudyBlock;
  readonly totalMinutes: number;
  readonly generatedAt: string;
}

export interface WeeklyDayPlan {
  readonly dayIndex: number; // 1 to 7
  readonly dayName: string; // e.g. Monday
  readonly focusTopic: string;
  readonly estimatedMinutes: number;
  readonly primaryObjective: string;
}

export interface WeeklyStudyPlan {
  readonly weeklyFocus: string;
  readonly targetRating: number;
  readonly plannedContestsCount: number;
  readonly targetMasteryTopics: ReadonlyArray<string>;
  readonly dailySchedules: ReadonlyArray<WeeklyDayPlan>;
  readonly totalMinutes: number;
  readonly generatedAt: string;
}
