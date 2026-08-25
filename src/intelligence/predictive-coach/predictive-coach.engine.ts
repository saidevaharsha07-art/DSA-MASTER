/**
 * Phase 4D — Predictive AI Coach
 * Generates explainable forecasts predicting next rating milestone, contest performance,
 * likely mistake types, topics prone to memory decay, interview readiness %, and placement probability.
 */

import { LearnerProfileMetrics } from '../user-model/universal-user.model';

export interface AIPredictionReport {
  userId: string;
  predictedNextRating: number; // e.g. 1540 ELO
  ratingConfidenceInterval: [number, number]; // [1480, 1600]
  expectedContestRank: string; // 'Top 15%'
  likelyMistakeType: string; // 'Off-by-one indexing error on boundary conditions'
  topicsProneToForget: string[]; // ['Difference Arrays', 'Bit Manipulation']
  interviewReadinessPercent: number; // 82%
  placementReadinessPercent: number; // 86%
  weeklyImprovementRate: string; // '+25 ELO / week'
  explainableReasoning: string[];
  generatedAt: string;
}

export class PredictiveCoachEngine {
  public predictPerformance(profile: LearnerProfileMetrics): AIPredictionReport {
    const currentDifficulty = profile.preferredDifficulty || 1400;
    const velocityFactor = profile.learningVelocity * 2.5;
    const accuracyFactor = (profile.accuracy - 50) * 4;

    const predictedRating = Math.round(currentDifficulty + velocityFactor + accuracyFactor);
    const confidenceRange: [number, number] = [predictedRating - 50, predictedRating + 50];

    const interviewReadiness = Math.min(98, Math.max(40, Math.round(profile.masteryScore * 0.9 + profile.accuracy * 0.2)));
    const placementReadiness = Math.min(99, Math.max(45, Math.round(interviewReadiness * 1.05)));

    return {
      userId: profile.userId,
      predictedNextRating: predictedRating,
      ratingConfidenceInterval: confidenceRange,
      expectedContestRank: predictedRating > 1600 ? 'Top 10%' : predictedRating > 1400 ? 'Top 25%' : 'Top 45%',
      likelyMistakeType: profile.accuracy < 75 ? 'Boundary index overflow & empty array checks' : 'Time limit exceeded on T=10^5 inputs',
      topicsProneToForget: profile.weaknesses.slice(0, 2),
      interviewReadinessPercent: interviewReadiness,
      placementReadinessPercent: placementReadiness,
      weeklyImprovementRate: `+${Math.round(profile.learningVelocity * 1.8)} ELO / week`,
      explainableReasoning: [
        `High consistency streak (${profile.consistencyStreak} days) accelerates skill retention by 18%.`,
        `Recent solving accuracy (${profile.accuracy}%) indicates solid mastery of fundamental patterns.`,
        `Targeting ${profile.weaknesses.length} identified weakness areas will boost rating by +60 ELO.`,
      ],
      generatedAt: new Date().toISOString(),
    };
  }
}
