/**
 * Progress Calculation Engine
 */

import { AchievementItem } from '../models/achievement.models';
import { RuleEvaluationResult } from '../rules/achievement-rule.interface';

export class ProgressEngine {
  public static updateProgress(item: AchievementItem, res: RuleEvaluationResult): AchievementItem {
    if (item.completed) return item;

    const nextProgress = res.forceSetProgress !== undefined ? res.forceSetProgress : item.currentProgress + res.newProgressDelta;
    const isNowComplete = res.isComplete || nextProgress >= item.maxProgress;

    return {
      ...item,
      currentProgress: Math.min(item.maxProgress, nextProgress),
      completed: isNowComplete,
      completedAt: isNowComplete ? new Date().toISOString() : item.completedAt,
      state: isNowComplete ? 'completed' : nextProgress > 0 ? 'in_progress' : 'locked',
    };
  }
}
