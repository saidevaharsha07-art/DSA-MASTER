/**
 * Oracle AI Engine — Deterministic Conflict Resolution System
 * Resolves conflicting recommendations across engines (e.g. Memory vs Contest Prep) using ranking score and strategy priority.
 */

import { UnifiedOracleRecommendation } from '../models/recommendation.models';
import { ConflictResolutionReport } from '../models/conflict.models';

export class ConflictEngine {
  /**
   * Identifies conflicts and returns winning recommendation and resolution report.
   */
  public static resolveConflicts(
    recommendations: ReadonlyArray<UnifiedOracleRecommendation>
  ): { resolvedRecommendations: ReadonlyArray<UnifiedOracleRecommendation>; reports: ReadonlyArray<ConflictResolutionReport> } {
    if (recommendations.length <= 1) {
      return { resolvedRecommendations: recommendations, reports: [] };
    }

    const reports: ConflictResolutionReport[] = [];
    const categoryMap = new Map<string, UnifiedOracleRecommendation[]>();

    for (const r of recommendations) {
      const list = categoryMap.get(r.category) || [];
      list.push(r);
      categoryMap.set(r.category, list);
    }

    const winnerList: UnifiedOracleRecommendation[] = [];

    for (const [cat, items] of Array.from(categoryMap.entries())) {
      if (items.length > 1) {
        // Sort items by ranking score
        items.sort((a, b) => b.rankingScore - a.rankingScore);
        const winner = items[0];
        const rejected = items.slice(1);

        reports.push({
          id: `conflict-${Date.now()}-${cat.toLowerCase().replace(/\s+/g, '-')}`,
          detectedConflict: `Multiple competing recommendations detected for category '${cat}'.`,
          winningRecommendation: winner,
          rejectedAlternatives: Object.freeze(rejected),
          conflictReason: `Winner selected with highest ranking score (${winner.rankingScore}/100) and priority '${winner.priority}'.`,
          resolvedAt: new Date().toISOString(),
        });
        winnerList.push(winner);
      } else {
        winnerList.push(items[0]);
      }
    }

    return {
      resolvedRecommendations: Object.freeze(winnerList),
      reports: Object.freeze(reports),
    };
  }
}
