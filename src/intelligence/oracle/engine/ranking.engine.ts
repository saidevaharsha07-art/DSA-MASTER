/**
 * Oracle AI Engine — Deterministic Ranking Engine
 * Sorts unified recommendations by ranking score, category precedence, and priority level.
 */

import { UnifiedOracleRecommendation } from '../models/recommendation.models';

export class RankingEngine {
  /**
   * Pure function: Sorts recommendations deterministically.
   */
  public static rank(recommendations: ReadonlyArray<UnifiedOracleRecommendation>): ReadonlyArray<UnifiedOracleRecommendation> {
    const list = [...recommendations];

    const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

    list.sort((a, b) => {
      // Primary: Priority level
      const pDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (pDiff !== 0) return pDiff;

      // Secondary: Ranking score
      const rDiff = b.rankingScore - a.rankingScore;
      if (rDiff !== 0) return rDiff;

      // Tertiary: Title alphabetical for absolute determinism
      return a.title.localeCompare(b.title);
    });

    return Object.freeze(list);
  }
}
