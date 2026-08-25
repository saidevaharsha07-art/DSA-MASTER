/**
 * Practice Scheduler — Daily Plan Builder
 * Generates structured daily practice plans with morning/evening modules.
 */

import { AdaptiveSession } from '../adaptive/adaptive.session';

export interface PracticeModule {
  readonly moduleTitle: string;
  readonly session: AdaptiveSession;
  readonly recommendedTimeOfDay: 'morning' | 'afternoon' | 'evening';
}

export interface DailyPracticePlan {
  readonly planId: string;
  readonly userId: string;
  readonly date: string; // YYYY-MM-DD
  readonly totalEstMinutes: number;
  readonly modules: ReadonlyArray<PracticeModule>;
  readonly dailyXpPotential: number;
  readonly focusSummary: string;
}

export class DailyPlanBuilder {
  public static buildDailyPlan(
    userId: string,
    sessions: ReadonlyArray<AdaptiveSession>,
    dateStr: string = new Date().toISOString().split('T')[0]
  ): DailyPracticePlan {
    const modules: PracticeModule[] = [];
    const timesOfDay: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];

    let totalMinutes = 0;
    let totalXp = 0;

    for (let i = 0; i < sessions.length; i++) {
      const sess = sessions[i];
      const timeOfDay = timesOfDay[i % timesOfDay.length];

      totalMinutes += sess.goal.estimatedDurationMinutes;
      totalXp += sess.totalXpAvailable;

      modules.push({
        moduleTitle: `Module ${i + 1}: ${sess.title}`,
        session: sess,
        recommendedTimeOfDay: timeOfDay,
      });
    }

    const mainTopic = sessions[0]?.goal.targetTopics[0] || 'General';

    return {
      planId: `daily-${userId}-${dateStr}`,
      userId,
      date: dateStr,
      totalEstMinutes: totalMinutes,
      modules: Object.freeze(modules),
      dailyXpPotential: totalXp,
      focusSummary: `Daily practice focus: ${mainTopic} (${modules.length} practice modules, ~${totalMinutes} mins total).`,
    };
  }
}
