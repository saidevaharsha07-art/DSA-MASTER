/**
 * Deterministic Weighted Ranking Engine
 */

import { PublicProfileSummary } from '../models/profile-summary.models';
import { LeaderboardEntry } from '../models/leaderboard-entry.models';
import { RankingWeights, DEFAULT_RANKING_WEIGHTS } from '../models/ranking.models';

export class RankingEngine {
  public static calculateCompositeScore(profile: PublicProfileSummary, weights: RankingWeights = DEFAULT_RANKING_WEIGHTS): number {
    return Math.round(
      profile.xp * weights.xpWeight +
        profile.rating * weights.ratingWeight +
        profile.learningScore * weights.solvedWeight +
        profile.memoryHealthScore * weights.memoryWeight +
        profile.streak * weights.streakWeight +
        profile.achievementCount * weights.achievementWeight
    );
  }

  public static rankProfiles(
    profiles: ReadonlyArray<PublicProfileSummary>,
    weights: RankingWeights = DEFAULT_RANKING_WEIGHTS
  ): LeaderboardEntry[] {
    const scored = profiles.map((p) => ({
      profile: p,
      score: this.calculateCompositeScore(p, weights),
    }));

    // Deterministic sort by score descending, then username ascending
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.profile.username.localeCompare(b.profile.username);
    });

    return scored.map((item, idx) => ({
      rank: idx + 1,
      userId: item.profile.userId,
      username: item.profile.username,
      avatarUrl: item.profile.avatarUrl,
      score: item.score,
      xp: item.profile.xp,
      rating: item.profile.rating,
      streak: item.profile.streak,
      problemsSolved: item.profile.learningScore,
      memoryHealthScore: item.profile.memoryHealthScore,
      activeTitle: item.profile.titles[0],
      activeBadge: item.profile.badges[0],
      country: item.profile.country,
      college: item.profile.college,
    }));
  }
}
