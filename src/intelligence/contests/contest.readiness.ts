/**
 * Contest Intelligence — Contest Readiness Evaluator
 * Evaluates expressive contest readiness levels, confidence scores, and success probabilities.
 */

import { ContestRecord } from './contest.models';
import { LearningProfile } from '../models/learning-profile';

export type ReadinessLevel = 'NotReady' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export interface ContestReadinessReport {
  readonly readinessLevel: ReadinessLevel;
  readonly isReadyForRated: boolean;
  readonly confidenceScore: number; // 0 to 100
  readonly strengths: ReadonlyArray<string>;
  readonly weaknesses: ReadonlyArray<string>;
  readonly recommendedPreparation: string;
  readonly estimatedSuccessProbability: number; // 0.0 to 1.0
  readonly evaluatedAt: string;
}

export class ContestReadinessEvaluator {
  /**
   * Pure function: evaluates expressive contest readiness report.
   */
  public static evaluateReadiness(
    profile: LearningProfile,
    records: ReadonlyArray<ContestRecord>
  ): ContestReadinessReport {
    const solvedTotal = profile.solvedProblemIds.size;
    const activeStreak = profile.streakInfo.currentStreak;
    const contestCount = records.length;

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (solvedTotal >= 10) strengths.push(`Solid solve volume (${solvedTotal} problems cleared).`);
    else weaknesses.push('Low problem solve volume (< 10 problems).');

    if (activeStreak >= 3) strengths.push(`Active practice streak (${activeStreak} days).`);
    else weaknesses.push('Inconsistent daily practice habit.');

    let level: ReadinessLevel = 'NotReady';
    let prob = 0.30;
    let confidence = 50;

    if (solvedTotal >= 30 && contestCount >= 3) {
      level = 'Advanced';
      prob = 0.85;
      confidence = 90;
    } else if (solvedTotal >= 15 || contestCount >= 1) {
      level = 'Intermediate';
      prob = 0.70;
      confidence = 80;
    } else if (solvedTotal >= 5) {
      level = 'Beginner';
      prob = 0.55;
      confidence = 65;
    }

    return {
      readinessLevel: level,
      isReadyForRated: solvedTotal >= 5,
      confidenceScore: confidence,
      strengths: Object.freeze(strengths),
      weaknesses: Object.freeze(weaknesses),
      recommendedPreparation: solvedTotal < 10
        ? 'Complete 5 adaptive practice problems before joining a live rated contest.'
        : 'Participate in the upcoming weekend contest.',
      estimatedSuccessProbability: prob,
      evaluatedAt: new Date().toISOString(),
    };
  }
}
