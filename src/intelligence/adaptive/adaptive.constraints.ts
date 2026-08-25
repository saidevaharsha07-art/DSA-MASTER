/**
 * Adaptive Engine — Constraint Engine
 * Isolated constraint engine enforcing duplicate avoidance, solved exclusions, platform filters, and session size limits.
 */

import { PlatformProblem, PlatformId } from '@/src/platforms/types';
import { LearningProfile } from '../models/learning-profile';

export interface ConstraintOptions {
  readonly platform?: PlatformId;
  readonly maxProblems?: number;
  readonly maxDurationMinutes?: number;
  readonly excludedProblemIds?: ReadonlySet<string>;
  readonly allowRecentlySolved?: boolean;
}

export class AdaptiveConstraintEngine {
  /**
   * Filters candidate problems based on strict constraint rules.
   */
  public filterCandidates(
    candidates: ReadonlyArray<PlatformProblem>,
    profile: LearningProfile,
    options?: ConstraintOptions
  ): PlatformProblem[] {
    const maxCount = options?.maxProblems || 5;
    const excludedIds = options?.excludedProblemIds || new Set<string>();
    const allowSolved = options?.allowRecentlySolved || false;

    const filtered: PlatformProblem[] = [];
    const seenIds = new Set<string>();

    for (const p of candidates) {
      if (filtered.length >= maxCount) break;

      // 1. Duplicate check in current selection
      if (seenIds.has(p.id)) continue;

      // 2. Solved exclusion (unless intentional revision)
      if (!allowSolved && profile.solvedProblemIds.has(p.id)) continue;

      // 3. Recommendation history / caller exclusion set
      if (excludedIds.has(p.id)) continue;

      // 4. Platform filter
      if (options?.platform && p.platform !== options.platform) continue;

      seenIds.add(p.id);
      filtered.push(p);
    }

    return filtered;
  }
}
