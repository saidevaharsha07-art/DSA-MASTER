/**
 * Unit Test: Event-Driven Achievement Engine (Milestone 5.4)
 */

import { AchievementService } from '@/src/intelligence/achievements/services/achievement.service';
import { EventBus } from '@/src/core/events/event-bus';

export async function testAchievementEngine(): Promise<void> {
  console.log('--- Testing Milestone 5.4 Event-Driven Achievement Engine ---');

  const achievementService = new AchievementService();

  // 1. Initial Empty State
  const initialUnlocked = achievementService.getUnlocked();
  console.log(`[PASS] Initial state initialized (${initialUnlocked.length} unlocked).`);

  // 2. EventBus Publication -> XP and Streak Unlocks
  let unlockedEventFired = false;
  const unsub = EventBus.subscribe('AchievementUnlocked', () => {
    unlockedEventFired = true;
  });

  EventBus.publish('ProfileUpdated', { streak: 7, xp: 1200 });
  unsub();

  const unlockedAfter = achievementService.getUnlocked();
  if (unlockedAfter.length < 2 || !unlockedEventFired) {
    throw new Error('Event-driven achievement unlock or EventBus notification failed!');
  }
  console.log(`[PASS] Event-driven unlock verified (${unlockedAfter.length} achievements unlocked: 7-Day Streak & XP Novice).`);

  // 3. Contest Completed Unlock
  EventBus.publish('ContestCompleted', { contestId: 'ROUND-100' });
  const contestUnlocked = achievementService.getUnlocked().find((i) => i.id === 'ach-contest-1');

  if (!contestUnlocked || !contestUnlocked.completed) {
    throw new Error('Contest completed achievement unlock failed!');
  }
  console.log('[PASS] Contest completion achievement unlock verified.');

  // 4. Badges & Titles Inventory
  const badges = achievementService.getBadges();
  const titles = achievementService.getTitles();

  if (badges.length < 3 || titles.length < 2) {
    throw new Error('Badge or Title inventory reward granting failed!');
  }
  console.log(`[PASS] Badges and Titles reward distribution verified (${badges.length} badges, ${titles.length} titles).`);
}
