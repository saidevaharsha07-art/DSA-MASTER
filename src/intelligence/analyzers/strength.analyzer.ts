/**
 * Pure Stateless Analyzer — Strength Analyzer
 * Identifies mastered topics, strongest platform, and difficulty ceiling deterministically.
 */

import { PracticeAttempt } from '../models/practice-history';
import { LearningProfile } from '../models/learning-profile';
import { StrengthAnalysis, StrongTopicMetric } from '../models/weakness';
import { PlatformId } from '@/src/platforms/types';
import { calculateAccuracy, groupAttemptsByTopic } from '../utils/metrics.calculator';
import { calculateMasteryScore, calculateConsistencyScore } from '../domain/scoring.rules';
import { getMasteryLevel } from '../domain/mastery.rules';

export class StrengthAnalyzer {
  /**
   * Pure function: produces a StrengthAnalysis object from practice history.
   */
  public static analyze(
    attempts: ReadonlyArray<PracticeAttempt>,
    profile?: LearningProfile
  ): StrengthAnalysis {
    const masteredTopics: StrongTopicMetric[] = [];
    const masteredPatternsSet = new Set<string>();
    const platformCounts = new Map<PlatformId, number>();

    let highestDifficulty = 'Beginner';

    const groupedTopics = groupAttemptsByTopic(attempts);
    for (const [topic, topicAttempts] of Array.from(groupedTopics.entries())) {
      const solved = topicAttempts.filter((a) => a.status === 'accepted');
      const solvedCount = new Set(solved.map((a) => a.problemId)).size;
      const accuracy = calculateAccuracy(topicAttempts);
      const masteryScore = calculateMasteryScore(solvedCount, accuracy);
      const level = getMasteryLevel(masteryScore);

      if (masteryScore >= 60 || accuracy >= 0.75) {
        masteredTopics.push({
          topic,
          accuracy,
          masteryScore,
          level,
        });
      }
    }

    masteredTopics.sort((a, b) => b.masteryScore - a.masteryScore);

    for (const a of attempts) {
      if (a.status === 'accepted') {
        const count = platformCounts.get(a.platform) || 0;
        platformCounts.set(a.platform, count + 1);

        if (a.pattern) {
          masteredPatternsSet.add(a.pattern);
        }
      }
    }

    let strongestPlatform: PlatformId = 'codechef';
    let maxPlatSolves = -1;
    for (const [plat, cnt] of Array.from(platformCounts.entries())) {
      if (cnt > maxPlatSolves) {
        maxPlatSolves = cnt;
        strongestPlatform = plat;
      }
    }

    const activeDays = profile?.streakInfo.activeDaysCount || 0;
    const currentStreak = profile?.streakInfo.currentStreak || 0;
    const consistencyScore = calculateConsistencyScore(activeDays, currentStreak);

    const primarySummary = masteredTopics.length > 0
      ? `Strongest domain: '${masteredTopics[0].topic}' (Mastery Score: ${masteredTopics[0].masteryScore}/100).`
      : 'Building initial skills across core topics.';

    return {
      userId: profile?.userId || 'anonymous',
      analyzedAt: new Date().toISOString(),
      masteredTopics: Object.freeze(masteredTopics),
      masteredPatterns: Object.freeze(Array.from(masteredPatternsSet)),
      strongestPlatform,
      difficultyCeiling: highestDifficulty,
      consistencyScore,
      primaryStrengthSummary: primarySummary,
    };
  }
}
