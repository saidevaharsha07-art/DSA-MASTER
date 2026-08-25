/**
 * Recommendation Engine — Explainable Recommendation Cards
 * Consumes WeaknessAnalysis and StrengthAnalysis to produce structured, explainable recommendation cards.
 */

import { WeaknessAnalysis, StrengthAnalysis } from '../models/weakness';
import { RecommendationCard, RecommendationType, RecommendationPriority } from '../models/recommendation';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { calculateRecommendationScore } from '../domain/scoring.rules';

export class RecommendationEngine {
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  /**
   * Generates explainable recommendation cards based on user weakness and strength analysis.
   */
  public generateRecommendations(
    weakness: WeaknessAnalysis,
    strength: StrengthAnalysis
  ): ReadonlyArray<RecommendationCard> {
    const cards: RecommendationCard[] = [];

    // 1. Primary Weakness Repair Card
    if (weakness.weakTopics.length > 0) {
      const topWeak = weakness.weakTopics[0];
      const probs = this.provider.getPlatformProblems('codechef', { topic: topWeak.topic, limit: 3 });

      const confidenceScore = calculateRecommendationScore(0.9, topWeak.totalAttempts, 0.8);

      cards.push({
        id: `rec-weakness-${topWeak.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        type: 'weakness_repair',
        priority: 'high',
        title: `Strengthen ${topWeak.topic}`,
        description: `Your accuracy in ${topWeak.topic} is ${(topWeak.accuracy * 100).toFixed(0)}%. Solve practice problems to raise accuracy.`,
        reason: `Targeted repair because ${topWeak.topic} has a high Weakness Score (${topWeak.weaknessScore}/100) across ${topWeak.totalAttempts} attempts.`,
        confidenceScore,
        targetTopic: topWeak.topic,
        targetPlatform: 'codechef',
        problemIds: Object.freeze(probs.map((p) => p.id)),
        supportingMetrics: {
          accuracy: topWeak.accuracy,
          attemptsCount: topWeak.totalAttempts,
          weaknessScore: topWeak.weaknessScore,
        },
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Pattern Mastery Card
    if (weakness.weakPatterns.length > 0) {
      const topPattern = weakness.weakPatterns[0];
      const probs = this.provider.getPlatformProblems('codechef', { pattern: topPattern.pattern, limit: 3 });
      const confidenceScore = calculateRecommendationScore(0.8, topPattern.totalAttempts, 0.7);

      cards.push({
        id: `rec-pattern-${topPattern.pattern.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        type: 'pattern_mastery',
        priority: 'medium',
        title: `Master Pattern: ${topPattern.pattern}`,
        description: `Refine your pattern recognition for ${topPattern.pattern}.`,
        reason: `Pattern '${topPattern.pattern}' has an accuracy of ${(topPattern.accuracy * 100).toFixed(0)}%.`,
        confidenceScore,
        targetPattern: topPattern.pattern,
        targetTopic: topPattern.topic,
        targetPlatform: 'codechef',
        problemIds: Object.freeze(probs.map((p) => p.id)),
        supportingMetrics: {
          accuracy: topPattern.accuracy,
          attemptsCount: topPattern.totalAttempts,
          weaknessScore: topPattern.weaknessScore,
        },
        createdAt: new Date().toISOString(),
      });
    }

    // 3. Spaced Revision / Strength Maintenance Card
    if (strength.masteredTopics.length > 0) {
      const topStrong = strength.masteredTopics[0];
      const probs = this.provider.getPlatformProblems('codechef', { topic: topStrong.topic, limit: 2 });
      const confidenceScore = calculateRecommendationScore(0.7, 5, 0.5);

      cards.push({
        id: `rec-revision-${topStrong.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        type: 'spaced_revision',
        priority: 'low',
        title: `Spaced Revision: ${topStrong.topic}`,
        description: `Keep your skills sharp in ${topStrong.topic}.`,
        reason: `Maintaining peak performance in your strong domain '${topStrong.topic}' (Mastery: ${topStrong.masteryScore}/100).`,
        confidenceScore,
        targetTopic: topStrong.topic,
        targetPlatform: 'codechef',
        problemIds: Object.freeze(probs.map((p) => p.id)),
        supportingMetrics: {
          accuracy: topStrong.accuracy,
          masteryScore: topStrong.masteryScore,
        },
        createdAt: new Date().toISOString(),
      });
    }

    // Fallback if no specific cards generated
    if (cards.length === 0) {
      const defaultProbs = this.provider.getPlatformProblems('codechef', { difficulty: 'Easy', limit: 3 });
      cards.push({
        id: 'rec-default-arrays',
        type: 'topic_focus',
        priority: 'high',
        title: 'Beginner Array Foundations',
        description: 'Start by building core array traversal and simulation skills on CodeChef.',
        reason: 'Recommended for initial skill building and establishing baseline accuracy.',
        confidenceScore: 85,
        targetTopic: 'Arrays',
        targetDifficulty: 'Easy',
        targetPlatform: 'codechef',
        problemIds: Object.freeze(defaultProbs.map((p) => p.id)),
        supportingMetrics: {
          attemptsCount: 0,
        },
        createdAt: new Date().toISOString(),
      });
    }

    return Object.freeze(cards);
  }
}
