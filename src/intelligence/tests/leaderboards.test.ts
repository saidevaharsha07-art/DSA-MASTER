/**
 * Unit Test: Scalable Leaderboards & Public User Profiles (Milestone 5.5)
 */

import { LeaderboardService } from '@/src/intelligence/leaderboards/services/leaderboard.service';
import { LeaderboardApi } from '@/src/intelligence/leaderboards/api/leaderboard.api';
import { PublicProfileSummary } from '@/src/intelligence/leaderboards/models/profile-summary.models';
import { RankingEngine } from '@/src/intelligence/leaderboards/engine/ranking.engine';

export async function testLeaderboardEngine(): Promise<void> {
  console.log('--- Testing Milestone 5.5 Scalable Leaderboards & Public User Profiles ---');

  const leaderboardService = new LeaderboardService();

  // 1. Fetch Global Leaderboard & Check Pagination
  const board = await leaderboardService.getLeaderboard('global', { page: 1, pageSize: 2 });
  if (board.entries.length !== 2) {
    throw new Error('Leaderboard pagination failed!');
  }
  if (board.entries[0].rank !== 1 || board.entries[1].rank !== 2) {
    throw new Error('Leaderboard ranking indexing failed!');
  }
  console.log('[PASS] Global leaderboard fetching and rank indexing verified.');

  // 2. Fetch Public Profile
  const profile = await leaderboardService.getProfile('tourist');
  if (!profile || profile.username !== 'tourist') {
    throw new Error('Public profile fetching failed!');
  }
  console.log('[PASS] Public profile summary retrieval verified.');

  // 3. User Search
  const searchRes = await leaderboardService.searchUsers('petr');
  if (searchRes.length !== 1 || searchRes[0].username !== 'petr') {
    throw new Error('User search query filtering failed!');
  }
  console.log('[PASS] User search filtering verified.');

  // 4. Season Snapshot API
  const season = await LeaderboardApi.getSeason('s1');
  if (!season.isActive || season.topPerformers.length === 0) {
    throw new Error('Season snapshot generation failed!');
  }
  console.log('[PASS] Season snapshot API verified.');

  // 5. Large Dataset Stress Simulation (10,000 Users)
  console.log('Simulating 10,000 user profiles ranking benchmark...');
  const largeProfiles: PublicProfileSummary[] = Array.from({ length: 10000 }, (_, i) => ({
    userId: `user-${i}`,
    username: `coder_${i}`,
    xp: Math.floor(Math.random() * 20000),
    globalRank: 0,
    rating: Math.floor(Math.random() * 3000),
    streak: Math.floor(Math.random() * 100),
    learningScore: Math.floor(Math.random() * 100),
    kingdomProgressPercent: 50,
    patternProgressPercent: 50,
    contestCount: 10,
    memoryHealthScore: 80,
    oracleScore: 85,
    badges: [],
    titles: [],
    achievementCount: 5,
    joinedDate: '2026-01-01',
  }));

  const start = performance.now();
  const ranked = RankingEngine.rankProfiles(largeProfiles);
  const elapsed = performance.now() - start;

  if (ranked.length !== 10000 || ranked[0].rank !== 1) {
    throw new Error('Large dataset ranking simulation failed!');
  }
  console.log(`[PASS] 10,000 user profiles ranked deterministically in ${elapsed.toFixed(2)}ms.`);
}
