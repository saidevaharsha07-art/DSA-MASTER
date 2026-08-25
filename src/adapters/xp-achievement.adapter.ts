/**
 * XP & Achievement Engine Adapter
 * Bridges existing user XP changes & problem attempts into AchievementService & EventBus.
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { AchievementService } from '@/src/intelligence/achievements/services/achievement.service';

export class XpAchievementAdapter {
  private static get achievementService(): AchievementService {
    return Container.resolve<AchievementService>('AchievementService');
  }

  public static onProblemSolved(userId: string, problemId: string, topic: string, xpEarned: number): void {
    EventBus.publish('ProblemSolved', { userId, problemId, topic, xpEarned });
    EventBus.publish('RewardGranted', { userId, deltaXp: xpEarned });
  }

  public static getUserAchievements() {
    return this.achievementService.stateService.getState().items;
  }
}
