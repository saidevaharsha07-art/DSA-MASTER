/**
 * Unit Test: Ranking Engine & Conflict Resolution
 */

import { RankingEngine } from '../engine/ranking.engine';
import { ConflictEngine } from '../engine/conflict.engine';
import { UnifiedOracleRecommendation } from '../models/recommendation.models';

export function testRankingEngine(): void {
  console.log('--- Testing Ranking Engine & Conflict Resolution ---');

  const now = new Date().toISOString();
  const mockRecs: UnifiedOracleRecommendation[] = [
    {
      id: 'r1',
      title: 'Practice Arrays',
      description: 'Test',
      category: 'Solve Next',
      state: 'Generated',
      priority: 'Medium',
      rankingScore: 60,
      confidenceBreakdown: { overallConfidence: 80, dataCompleteness: 80, engineAgreement: 80, historicalReliability: 80 },
      expectedBenefit: 'Benefit',
      estimatedDurationMinutes: 30,
      contributingEngines: Object.freeze(['Engine A']),
      engineContributionMap: { WeaknessAnalyzer: 100 },
      decisionTraces: Object.freeze([]),
      supportingMetrics: {},
      reasoning: 'Reason',
      suggestedAction: 'Action',
      followUpAction: 'FollowUp',
      createdAt: now,
    },
    {
      id: 'r2',
      title: 'Revise Two Pointers',
      description: 'Test',
      category: 'Revise',
      state: 'Generated',
      priority: 'Critical',
      rankingScore: 95,
      confidenceBreakdown: { overallConfidence: 90, dataCompleteness: 90, engineAgreement: 90, historicalReliability: 90 },
      expectedBenefit: 'Benefit',
      estimatedDurationMinutes: 15,
      contributingEngines: Object.freeze(['Memory Engine']),
      engineContributionMap: { MemoryEngine: 100 },
      decisionTraces: Object.freeze([]),
      supportingMetrics: {},
      reasoning: 'Reason',
      suggestedAction: 'Action',
      followUpAction: 'FollowUp',
      createdAt: now,
    },
  ];

  // 1. Ranking test
  const ranked = RankingEngine.rank(mockRecs);
  if (ranked[0].id !== 'r2') {
    throw new Error('RankingEngine failed to place Critical priority item first!');
  }
  console.log('[PASS] Deterministic ranking order verified.');

  // 2. Conflict resolution test
  const conflictingRecs = [
    ...mockRecs,
    {
      ...mockRecs[0],
      id: 'r3',
      title: 'Practice Strings',
      rankingScore: 85,
    },
  ];

  const { resolvedRecommendations, reports } = ConflictEngine.resolveConflicts(conflictingRecs);
  if (reports.length !== 1 || resolvedRecommendations.length !== 2) {
    throw new Error('ConflictEngine failed to resolve competing recommendations cleanly!');
  }
  console.log(`[PASS] Conflict resolution verified (${reports.length} conflict report generated).`);
}
