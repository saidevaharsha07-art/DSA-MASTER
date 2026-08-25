/**
 * Oracle AI Engine — Context Service
 * Aggregates profile, weakness, strength, contest, rating, and memory state into an OracleContext bundle.
 */

import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '@/src/intelligence/models/weakness';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { ContestEngine } from '@/src/intelligence/contests/contest.engine';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';
import { RatingEngine } from '@/src/intelligence/ratings/rating.engine';
import { RatingPredictionReport } from '@/src/intelligence/ratings/rating.models';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';
import { RevisionQueueItem } from '@/src/intelligence/memory/models/review.models';

export interface OracleContextBundle {
  readonly profile: LearningProfile;
  readonly weakness: WeaknessAnalysis;
  readonly strength: StrengthAnalysis;
  readonly contestAnalysis: ContestAnalysis;
  readonly contestReadiness: any;
  readonly ratingPrediction: RatingPredictionReport;
  readonly memoryHealth: MemoryHealthReport;
  readonly revisionQueue: ReadonlyArray<RevisionQueueItem>;
}

export class OracleContextService {
  /**
   * Aggregates current state across all backend engines.
   */
  public static buildContextBundle(
    profile: LearningProfile,
    contestEngine: ContestEngine,
    ratingEngine: RatingEngine,
    memoryEngine: MemoryEngine
  ): OracleContextBundle {
    const mockAttempts = Array.from(profile.solvedProblemIds).map((id, index) => ({
      id: `att-${index}`,
      userId: profile.userId,
      problemId: id,
      platform: 'codechef' as const,
      status: 'accepted' as const,
      timestamp: new Date().toISOString(),
      durationSeconds: 600,
      xpEarned: 20,
      hintsUsed: 0,
      topic: 'Arrays',
    }));

    const weakness = WeaknessAnalyzer.analyze(mockAttempts, profile);
    const strength = StrengthAnalyzer.analyze(mockAttempts, profile);
    const contestAnalysis = contestEngine.analyzeContests(profile.userId);
    const contestReadiness = contestEngine.evaluateReadiness(profile);

    const history = contestEngine.getHistory(profile.userId);
    const ratingPrediction = ratingEngine.predictRating('codechef', history, 3);
    const memoryHealth = memoryEngine.getMemoryHealth(profile.userId);
    const revisionQueue = memoryEngine.getRevisionQueue(profile.userId);

    return {
      profile,
      weakness,
      strength,
      contestAnalysis,
      contestReadiness,
      ratingPrediction,
      memoryHealth,
      revisionQueue,
    };
  }
}
