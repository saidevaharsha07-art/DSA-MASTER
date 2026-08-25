/**
 * Practice Scheduler — Weekly Plan Builder
 * Generates 7-day practice schedules with milestone goals.
 */

import { DailyPracticePlan } from './daily.plan';

export interface WeeklyPracticePlan {
  readonly planId: string;
  readonly userId: string;
  readonly startDate: string; // YYYY-MM-DD
  readonly endDate: string; // YYYY-MM-DD
  readonly dailyPlans: ReadonlyArray<DailyPracticePlan>;
  readonly weeklyMilestoneGoal: string;
  readonly totalWeeklyMinutes: number;
  readonly totalWeeklyXpPotential: number;
}

export class WeeklyPlanBuilder {
  public static buildWeeklyPlan(
    userId: string,
    dailyPlans: ReadonlyArray<DailyPracticePlan>,
    startDateStr: string
  ): WeeklyPracticePlan {
    const totalMinutes = dailyPlans.reduce((sum, d) => sum + d.totalEstMinutes, 0);
    const totalXp = dailyPlans.reduce((sum, d) => sum + d.dailyXpPotential, 0);

    const endDate = new Date(startDateStr);
    endDate.setDate(endDate.getDate() + 6);
    const endDateStr = endDate.toISOString().split('T')[0];

    return {
      planId: `weekly-${userId}-${startDateStr}`,
      userId,
      startDate: startDateStr,
      endDate: endDateStr,
      dailyPlans: Object.freeze(dailyPlans),
      weeklyMilestoneGoal: `Complete 7-day adaptive practice curriculum (${dailyPlans.length} active days, ~${totalMinutes} mins total).`,
      totalWeeklyMinutes: totalMinutes,
      totalWeeklyXpPotential: totalXp,
    };
  }
}
