/**
 * Oracle AI Engine — Dedicated Planner Engine
 * Assembles Morning, Afternoon, and Evening Daily Study Plans and 7-Day Weekly Study Plans.
 */

import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { WeaknessAnalysis } from '@/src/intelligence/models/weakness';
import { DailyStudyPlan, WeeklyStudyPlan, WeeklyDayPlan } from '../models/planner.models';

export class PlannerEngine {
  /**
   * Assembles Morning, Afternoon, and Evening Daily Study Plan blocks.
   */
  public static generateDailyPlan(
    recommendations: ReadonlyArray<UnifiedOracleRecommendation>,
    now: Date = new Date()
  ): DailyStudyPlan {
    const revRecs = recommendations.filter((r) => r.category === 'Revise' || r.category === 'Review');
    const solveRecs = recommendations.filter((r) => r.category === 'Solve Next' || r.category === 'Learn');
    const contestRecs = recommendations.filter((r) => r.category === 'Contest' || r.category === 'Rating');

    const morning = {
      title: 'Morning Memory & Spaced Repetition Block',
      durationMinutes: 20,
      problems: Object.freeze([]),
      revision: Object.freeze(revRecs.map((r) => r.title)),
      goals: Object.freeze(['Maintain 100% memory review coverage and prevent decay.']),
      reason: 'Optimal morning focus for spaced repetition memory consolidation.',
    };

    const afternoon = {
      title: 'Afternoon Adaptive Problem Solving Block',
      durationMinutes: 45,
      problems: Object.freeze(solveRecs.map((r) => r.title)),
      revision: Object.freeze([]),
      goals: Object.freeze(['Elevate primary weak topic mastery score towards Proficient.']),
      reason: 'High energy block dedicated to problem solving and pattern learning.',
    };

    const evening = {
      title: 'Evening Contest Readiness & Speed Sprint Block',
      durationMinutes: 30,
      problems: Object.freeze(contestRecs.map((r) => r.title)),
      revision: Object.freeze([]),
      goals: Object.freeze(['Optimize problem solving speed under simulated contest time pressure.']),
      reason: 'Timed sprint block to prepare for competitive weekend contests.',
    };

    return {
      morning: Object.freeze(morning),
      afternoon: Object.freeze(afternoon),
      evening: Object.freeze(evening),
      totalMinutes: morning.durationMinutes + afternoon.durationMinutes + evening.durationMinutes,
      generatedAt: now.toISOString(),
    };
  }

  /**
   * Assembles 7-Day Weekly Study Plan.
   */
  public static generateWeeklyPlan(
    ratingPrediction: RatingPredictionReport,
    weakness: WeaknessAnalysis,
    now: Date = new Date()
  ): WeeklyStudyPlan {
    const days: WeeklyDayPlan[] = [
      { dayIndex: 1, dayName: 'Monday', focusTopic: 'Arrays & Two Pointers', estimatedMinutes: 60, primaryObjective: 'Spaced repetition review + 2 Medium Array problems' },
      { dayIndex: 2, dayName: 'Tuesday', focusTopic: 'Strings & Hash Maps', estimatedMinutes: 60, primaryObjective: 'Pattern mastery & weakness repair' },
      { dayIndex: 3, dayName: 'Wednesday', focusTopic: 'Dynamic Programming', estimatedMinutes: 75, primaryObjective: '0/1 Knapsack & DP transition state practice' },
      { dayIndex: 4, dayName: 'Thursday', focusTopic: 'Bit Manipulation', estimatedMinutes: 60, primaryObjective: 'Bitmasking speed sprint' },
      { dayIndex: 5, dayName: 'Friday', focusTopic: 'Contest Simulation', estimatedMinutes: 90, primaryObjective: '90-minute timed contest sprint' },
      { dayIndex: 6, dayName: 'Saturday', focusTopic: 'Rated Weekend Contest', estimatedMinutes: 120, primaryObjective: 'Participate in Starters / Div. 3 rated contest' },
      { dayIndex: 7, dayName: 'Sunday', focusTopic: 'Weekly Review & Recovery', estimatedMinutes: 45, primaryObjective: 'Review contest editorial & memory health sweep' },
    ];

    const totalMins = days.reduce((sum, d) => sum + d.estimatedMinutes, 0);

    return {
      weeklyFocus: 'Spaced Repetition & Rating Ladder Climb',
      targetRating: ratingPrediction.projectedRating,
      plannedContestsCount: 1,
      targetMasteryTopics: Object.freeze(weakness.weakTopics.map((w) => w.topic)),
      dailySchedules: Object.freeze(days),
      totalMinutes: totalMins,
      generatedAt: now.toISOString(),
    };
  }
}
