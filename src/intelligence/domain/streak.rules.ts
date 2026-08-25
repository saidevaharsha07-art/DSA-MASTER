/**
 * Intelligence Domain Rules — Streak & Activity Rules
 * Pure calculations for practice streaks and date-based activity tracking.
 */

import { StreakInfo } from '../models/learning-profile';

/**
 * Updates streak information given a new activity date (YYYY-MM-DD).
 */
export function calculateUpdatedStreak(currentInfo: StreakInfo, newActivityDateStr: string): StreakInfo {
  const lastDate = currentInfo.lastActiveDate;
  if (!lastDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(1, currentInfo.longestStreak),
      lastActiveDate: newActivityDateStr,
      activeDaysCount: 1,
    };
  }

  if (lastDate === newActivityDateStr) {
    return currentInfo; // Same day activity, streak unchanged
  }

  const d1 = new Date(lastDate);
  const d2 = new Date(newActivityDateStr);
  const diffDays = Math.round((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    const newStreak = currentInfo.currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, currentInfo.longestStreak),
      lastActiveDate: newActivityDateStr,
      activeDaysCount: currentInfo.activeDaysCount + 1,
    };
  } else if (diffDays > 1) {
    // Streak reset
    return {
      currentStreak: 1,
      longestStreak: currentInfo.longestStreak,
      lastActiveDate: newActivityDateStr,
      activeDaysCount: currentInfo.activeDaysCount + 1,
    };
  }

  return currentInfo;
}
