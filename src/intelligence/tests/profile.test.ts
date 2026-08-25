/**
 * Unit Test: Profile Service & Storage
 */

import { ProfileService } from '../services/profile.service';
import { InMemoryIntelligenceStorage } from '../storage/intelligence.storage';
import { PracticeAttempt } from '../models/practice-history';

export async function testProfileService(): Promise<void> {
  console.log('--- Testing Profile Service & Storage ---');
  const storage = new InMemoryIntelligenceStorage();
  const service = new ProfileService(storage);

  // 1. New user profile initialization
  const emptyProfile = await service.getProfile('user-test-1');
  if (emptyProfile.solvedProblemIds.size !== 0 || emptyProfile.totalXp !== 0) {
    throw new Error('New user profile is not empty!');
  }
  console.log('[PASS] Empty profile initialization verified.');

  // 2. Record solved attempt
  const attempt1: PracticeAttempt = {
    id: 'att-1',
    userId: 'user-test-1',
    problemId: 'FLOW001',
    platform: 'codechef',
    status: 'accepted',
    timestamp: '2026-07-29T10:00:00Z',
    durationSeconds: 900,
    xpEarned: 10,
    hintsUsed: 0,
    topic: 'Arrays',
    pattern: 'Basic Array Traversal',
    difficulty: 'Beginner',
  };

  const updatedProfile = await service.recordAttempt(attempt1);
  if (!updatedProfile.solvedProblemIds.has('FLOW001')) {
    throw new Error('Solved problem ID not present in profile after recording!');
  }
  if (updatedProfile.totalXp !== 10) {
    throw new Error(`Expected total XP 10, got ${updatedProfile.totalXp}`);
  }
  if (updatedProfile.streakInfo.currentStreak !== 1) {
    throw new Error(`Expected current streak 1, got ${updatedProfile.streakInfo.currentStreak}`);
  }
  console.log('[PASS] Recording attempt and updating streak & XP verified.');

  // 3. Record second consecutive day attempt
  const attempt2: PracticeAttempt = {
    id: 'att-2',
    userId: 'user-test-1',
    problemId: 'FLOW002',
    platform: 'codechef',
    status: 'accepted',
    timestamp: '2026-07-30T10:00:00Z',
    durationSeconds: 600,
    xpEarned: 10,
    hintsUsed: 0,
    topic: 'Arrays',
    pattern: 'Basic Array Traversal',
    difficulty: 'Beginner',
  };

  const profileDay2 = await service.recordAttempt(attempt2);
  if (profileDay2.streakInfo.currentStreak !== 2) {
    throw new Error(`Expected current streak 2, got ${profileDay2.streakInfo.currentStreak}`);
  }
  console.log('[PASS] Consecutive day streak advancement verified.');
}
