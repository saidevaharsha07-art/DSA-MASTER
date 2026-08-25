/**
 * Unit Test: Multi-Horizon Practice Scheduler
 */

import { PracticeScheduler } from '../scheduler/practice.scheduler';
import { ProfileService } from '../services/profile.service';
import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '../analyzers/strength.analyzer';

export async function testPracticeScheduler(): Promise<void> {
  console.log('--- Testing Practice Scheduler (Multi-Horizon Planning) ---');
  const profileService = new ProfileService();
  const profile = await profileService.getProfile('user-sched-1');

  const weakness = WeaknessAnalyzer.analyze([], profile);
  const strength = StrengthAnalyzer.analyze([], profile);

  const scheduler = new PracticeScheduler();

  // 1. Today plan
  const todayPlan = scheduler.generateTodayPlan(profile, weakness, strength);
  if (!todayPlan.planId || todayPlan.modules.length === 0) {
    throw new Error('Daily plan generation for today failed!');
  }
  console.log(`[PASS] Today practice plan generated (${todayPlan.modules.length} module, ~${todayPlan.totalEstMinutes} mins).`);

  // 2. Tomorrow plan
  const tomorrowPlan = scheduler.generateTomorrowPlan(profile, weakness, strength);
  if (!tomorrowPlan.planId) {
    throw new Error('Daily plan generation for tomorrow failed!');
  }
  console.log('[PASS] Tomorrow practice plan generated.');

  // 3. Weekly plan (7 days)
  const weeklyPlan = scheduler.generateWeeklyPlan(profile, weakness, strength);
  if (weeklyPlan.dailyPlans.length !== 7) {
    throw new Error(`Expected 7 daily plans in weekly schedule, got ${weeklyPlan.dailyPlans.length}`);
  }
  console.log(`[PASS] 7-day Weekly practice plan generated (${weeklyPlan.totalWeeklyMinutes} total mins).`);

  // 4. Custom horizon plan
  const customPlans = scheduler.generateCustomHorizonPlan(profile, weakness, strength, 3);
  if (customPlans.length !== 3) {
    throw new Error(`Expected 3 daily plans for custom horizon, got ${customPlans.length}`);
  }
  console.log('[PASS] Custom 3-day horizon practice plan generated.');
}
