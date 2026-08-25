/**
 * Recommendation Engine — Next Problem Engine
 * Picks the single optimal next problem balancing user skill, weakness repair, and difficulty ceiling.
 */

import { LearningProfile } from '../models/learning-profile';
import { WeaknessAnalysis } from '../models/weakness';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformProblem, PlatformId } from '@/src/platforms/types';

export class NextProblemEngine {
  private provider: ProblemProvider;

  constructor(provider?: ProblemProvider) {
    this.provider = provider || new ProblemProvider();
  }

  /**
   * Recommends the single best next problem for the user.
   */
  public selectNextProblem(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    preferredPlatform: PlatformId = 'codechef'
  ): PlatformProblem | null {
    // 1. If user has a weak topic, pick unsolved problem from weak topic
    if (weakness.weakTopics.length > 0) {
      const topWeak = weakness.weakTopics[0].topic;
      const candidates = this.provider.getPlatformProblems(preferredPlatform, {
        topic: topWeak,
        solvedStatus: 'unsolved',
        limit: 10,
      });

      const unsolvedCandidate = candidates.find((p) => !profile.solvedProblemIds.has(p.id));
      if (unsolvedCandidate) return unsolvedCandidate;
    }

    // 2. Fallback: pick unsolved problem from Arrays Easy/Medium
    const fallbackCandidates = this.provider.getPlatformProblems(preferredPlatform, {
      topic: 'Arrays',
      solvedStatus: 'unsolved',
      limit: 10,
    });

    const unsolvedFallback = fallbackCandidates.find((p) => !profile.solvedProblemIds.has(p.id));
    if (unsolvedFallback) return unsolvedFallback;

    // 3. Global fallback across any active platform
    const globalCandidates = this.provider.getAllPlatformProblems({ solvedStatus: 'unsolved', limit: 1 });
    return globalCandidates[0] || null;
  }
}
