/**
 * Practice Scheduler — Dispatcher
 * Generates multi-horizon practice plans (today, tomorrow, weekly, or custom horizon).
 */

import { DailyPracticePlan, DailyPlanBuilder } from './daily.plan';
import { WeeklyPracticePlan, WeeklyPlanBuilder } from './weekly.plan';
import { AdaptiveEngine } from '../adaptive/adaptive.engine';
import { LearningProfile } from '../models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '../models/weakness';
import { PlatformId } from '@/src/platforms/types';

export class PracticeScheduler {
  private adaptiveEngine: AdaptiveEngine;

  constructor(adaptiveEngine?: AdaptiveEngine) {
    this.adaptiveEngine = adaptiveEngine || new AdaptiveEngine();
  }

  /**
   * Generates today's daily practice plan.
   */
  public generateTodayPlan(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    preferredPlatform: PlatformId = 'codechef'
  ): DailyPracticePlan {
    const todayStr = new Date().toISOString().split('T')[0];
    const { session } = this.adaptiveEngine.generateSession(profile, weakness, strength, 'Weakness First', { platform: preferredPlatform, maxProblems: 4 });
    return DailyPlanBuilder.buildDailyPlan(profile.userId, [session], todayStr);
  }

  /**
   * Generates tomorrow's daily practice plan.
   */
  public generateTomorrowPlan(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    preferredPlatform: PlatformId = 'codechef'
  ): DailyPracticePlan {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const { session } = this.adaptiveEngine.generateSession(profile, weakness, strength, 'Balanced Learning', { platform: preferredPlatform, maxProblems: 4 });
    return DailyPlanBuilder.buildDailyPlan(profile.userId, [session], tomorrowStr);
  }

  /**
   * Generates a 7-day weekly practice plan.
   */
  public generateWeeklyPlan(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    preferredPlatform: PlatformId = 'codechef'
  ): WeeklyPracticePlan {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const dailyPlans: DailyPracticePlan[] = [];

    const strategies = [
      'Weakness First',
      'Balanced Learning',
      'Topic Mastery',
      'Weakness First',
      'Revision Focus',
      'Contest Preparation',
      'Balanced Learning',
    ] as const;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];

      const strat = strategies[i];
      const { session } = this.adaptiveEngine.generateSession(profile, weakness, strength, strat, { platform: preferredPlatform, maxProblems: 3 });
      const plan = DailyPlanBuilder.buildDailyPlan(profile.userId, [session], dateStr);
      dailyPlans.push(plan);
    }

    return WeeklyPlanBuilder.buildWeeklyPlan(profile.userId, dailyPlans, todayStr);
  }

  /**
   * Generates a plan for a custom horizon of N days.
   */
  public generateCustomHorizonPlan(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis,
    days: number = 3,
    preferredPlatform: PlatformId = 'codechef'
  ): ReadonlyArray<DailyPracticePlan> {
    const plans: DailyPracticePlan[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];

      const { session } = this.adaptiveEngine.generateSession(profile, weakness, strength, 'Weakness First', { platform: preferredPlatform, maxProblems: 3 });
      plans.push(DailyPlanBuilder.buildDailyPlan(profile.userId, [session], dateStr));
    }

    return Object.freeze(plans);
  }
}
