/**
 * Configurable Ranking Weights & Metric Model
 */

export interface RankingWeights {
  readonly xpWeight: number;
  readonly ratingWeight: number;
  readonly solvedWeight: number;
  readonly memoryWeight: number;
  readonly streakWeight: number;
  readonly achievementWeight: number;
}

export const DEFAULT_RANKING_WEIGHTS: RankingWeights = {
  xpWeight: 1.0,
  ratingWeight: 2.0,
  solvedWeight: 5.0,
  memoryWeight: 1.5,
  streakWeight: 10.0,
  achievementWeight: 2.5,
};
