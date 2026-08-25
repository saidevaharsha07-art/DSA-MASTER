/**
 * Contest Intelligence — Recommendation Engine
 * Generates explainable contest-specific recommendation cards.
 */

import { RecommendationCard } from '../models/recommendation';
import { ContestAnalysis } from './contest.models';
import { ContestReadinessReport } from './contest.readiness';
import { calculateRecommendationScore } from '../domain/scoring.rules';

export class ContestRecommendationEngine {
  /**
   * Generates explainable recommendation cards for contest strategy.
   */
  public generateRecommendations(
    analysis: ContestAnalysis,
    readiness: ContestReadinessReport
  ): ReadonlyArray<RecommendationCard> {
    const cards: RecommendationCard[] = [];

    // 1. Rated Contest Participation Card
    if (readiness.isReadyForRated || analysis.totalContests > 0) {
      const confidence = calculateRecommendationScore(0.85, Math.max(1, analysis.totalContests), 0.8);
      cards.push({
        id: `rec-contest-rated-${Date.now()}`,
        type: 'contest_prep',
        priority: 'high',
        title: 'Participate in Rated Weekend Contest',
        description: 'You meet all solve volume and streak requirements for rated competition.',
        reason: `Readiness level '${readiness.readinessLevel}' with estimated success probability of ${(readiness.estimatedSuccessProbability * 100).toFixed(0)}%.`,
        confidenceScore: confidence,
        targetPlatform: 'codechef',
        problemIds: Object.freeze([]),
        supportingMetrics: {
          accuracy: readiness.estimatedSuccessProbability,
          attemptsCount: analysis.totalContests,
        },
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Speed Optimization Card
    if (analysis.solveSpeedAvgMinutes >= 30 || analysis.totalContests > 0) {
      const confidence = calculateRecommendationScore(0.75, Math.max(1, analysis.totalContests), 0.6);
      cards.push({
        id: `rec-contest-speed-${Date.now()}`,
        type: 'contest_prep',
        priority: 'medium',
        title: 'Improve Solving Speed Under Time Pressure',
        description: 'Your average contest solve time is high. Practice timed 15-minute Easy problem sprints.',
        reason: `Average solve speed is ${analysis.solveSpeedAvgMinutes} mins/problem across ${analysis.totalContests} contests.`,
        confidenceScore: confidence,
        targetPlatform: 'codechef',
        problemIds: Object.freeze([]),
        supportingMetrics: {
          attemptsCount: analysis.totalContests,
        },
        createdAt: new Date().toISOString(),
      });
    }

    // Fallback if no cards created
    if (cards.length === 0) {
      cards.push({
        id: `rec-contest-intro-${Date.now()}`,
        type: 'contest_prep',
        priority: 'high',
        title: 'Join Your First Rated Contest',
        description: 'Establish your initial competitive programming rating baseline.',
        reason: 'Recommended for building contest experience and establishing baseline rating.',
        confidenceScore: 80,
        targetPlatform: 'codechef',
        problemIds: Object.freeze([]),
        supportingMetrics: {
          attemptsCount: 0,
        },
        createdAt: new Date().toISOString(),
      });
    }

    return Object.freeze(cards);
  }
}
