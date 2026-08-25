/**
 * Pure Stateless Analyzer — Topic & Pattern Analyzer
 * Computes topic and pattern mastery states deterministically from practice history.
 */

import { PracticeAttempt } from '../models/practice-history';
import { TopicMasteryState, PatternMasteryState } from '../models/learning-profile';
import { calculateAccuracy, groupAttemptsByTopic, groupAttemptsByPattern } from '../utils/metrics.calculator';
import { calculateMasteryScore } from '../domain/scoring.rules';
import { getMasteryLevel } from '../domain/mastery.rules';

export class TopicAnalyzer {
  /**
   * Pure function: analyzes practice attempts and produces topic mastery map.
   */
  public static analyzeTopics(attempts: ReadonlyArray<PracticeAttempt>): Map<string, TopicMasteryState> {
    const topicMap = new Map<string, TopicMasteryState>();
    const grouped = groupAttemptsByTopic(attempts);

    for (const [topic, topicAttempts] of Array.from(grouped.entries())) {
      const solvedCount = new Set(topicAttempts.filter((a) => a.status === 'accepted').map((a) => a.problemId)).size;
      const totalAttempts = topicAttempts.length;
      const accuracy = calculateAccuracy(topicAttempts);
      const masteryScore = calculateMasteryScore(solvedCount, accuracy);
      const level = getMasteryLevel(masteryScore);

      const sortedDates = topicAttempts.map((a) => a.timestamp).sort();
      const lastPracticedAt = sortedDates[sortedDates.length - 1] || new Date().toISOString();

      topicMap.set(topic, {
        topic,
        solvedCount,
        totalAttempts,
        accuracy,
        masteryScore,
        level,
        lastPracticedAt,
      });
    }

    return topicMap;
  }

  /**
   * Pure function: analyzes practice attempts and produces pattern mastery map.
   */
  public static analyzePatterns(attempts: ReadonlyArray<PracticeAttempt>): Map<string, PatternMasteryState> {
    const patternMap = new Map<string, PatternMasteryState>();
    const grouped = groupAttemptsByPattern(attempts);

    for (const [pattern, patternAttempts] of Array.from(grouped.entries())) {
      const topic = patternAttempts[0]?.topic || 'General';
      const solvedCount = new Set(patternAttempts.filter((a) => a.status === 'accepted').map((a) => a.problemId)).size;
      const totalAttempts = patternAttempts.length;
      const accuracy = calculateAccuracy(patternAttempts);
      const masteryScore = calculateMasteryScore(solvedCount, accuracy, 10);
      const level = getMasteryLevel(masteryScore);

      patternMap.set(pattern, {
        pattern,
        topic,
        solvedCount,
        totalAttempts,
        accuracy,
        masteryScore,
        level,
      });
    }

    return patternMap;
  }
}
