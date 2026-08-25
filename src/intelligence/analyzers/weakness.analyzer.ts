/**
 * Pure Stateless Analyzer — Weakness Analyzer
 * Identifies weak topics, patterns, low accuracy areas, and struggle metrics deterministically.
 */

import { PracticeAttempt } from '../models/practice-history';
import { LearningProfile } from '../models/learning-profile';
import { WeaknessAnalysis, WeakTopicMetric, WeakPatternMetric } from '../models/weakness';
import { calculateAccuracy, groupAttemptsByTopic, groupAttemptsByPattern } from '../utils/metrics.calculator';
import { calculateWeaknessScore, calculateConsistencyScore } from '../domain/scoring.rules';

export class WeaknessAnalyzer {
  /**
   * Pure function: produces a WeaknessAnalysis object from practice history.
   */
  public static analyze(
    attempts: ReadonlyArray<PracticeAttempt>,
    profile?: LearningProfile
  ): WeaknessAnalysis {
    const weakTopics: WeakTopicMetric[] = [];
    const weakPatterns: WeakPatternMetric[] = [];
    const weakDifficulties: string[] = [];

    const groupedTopics = groupAttemptsByTopic(attempts);
    for (const [topic, topicAttempts] of Array.from(groupedTopics.entries())) {
      const accuracy = calculateAccuracy(topicAttempts);
      const totalAttempts = topicAttempts.length;
      const failures = topicAttempts.filter((a) => a.status !== 'accepted').length;

      if (accuracy < 0.60 || failures >= 2) {
        const weaknessScore = calculateWeaknessScore(accuracy, totalAttempts, failures);
        weakTopics.push({
          topic,
          accuracy,
          weaknessScore,
          totalAttempts,
          failureRate: Number((1.0 - accuracy).toFixed(2)),
          recommendedAction: `Focus on ${topic} fundamentals to improve accuracy from ${(accuracy * 100).toFixed(0)}%.`,
        });
      }
    }

    weakTopics.sort((a, b) => b.weaknessScore - a.weaknessScore);

    const groupedPatterns = groupAttemptsByPattern(attempts);
    for (const [pattern, patternAttempts] of Array.from(groupedPatterns.entries())) {
      const accuracy = calculateAccuracy(patternAttempts);
      const totalAttempts = patternAttempts.length;
      const failures = patternAttempts.filter((a) => a.status !== 'accepted').length;

      if (accuracy < 0.50 || (totalAttempts >= 3 && failures >= 2)) {
        const weaknessScore = calculateWeaknessScore(accuracy, totalAttempts, failures);
        weakPatterns.push({
          pattern,
          topic: patternAttempts[0]?.topic || 'General',
          weaknessScore,
          accuracy,
          totalAttempts,
        });
      }
    }

    weakPatterns.sort((a, b) => b.weaknessScore - a.weaknessScore);

    const overallAccuracy = calculateAccuracy(attempts);
    const activeDays = profile?.streakInfo.activeDaysCount || 0;
    const currentStreak = profile?.streakInfo.currentStreak || 0;
    const consistencyScore = calculateConsistencyScore(activeDays, currentStreak);

    const primarySummary = weakTopics.length > 0
      ? `Primary weakness detected in '${weakTopics[0].topic}' (Weakness Score: ${weakTopics[0].weaknessScore}/100).`
      : 'No critical topic weaknesses detected.';

    return {
      userId: profile?.userId || 'anonymous',
      analyzedAt: new Date().toISOString(),
      weakTopics: Object.freeze(weakTopics),
      weakPatterns: Object.freeze(weakPatterns),
      weakDifficulties: Object.freeze(weakDifficulties),
      overallAccuracy,
      consistencyScore,
      primaryWeaknessSummary: primarySummary,
    };
  }
}
