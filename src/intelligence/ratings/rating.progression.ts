/**
 * Rating Engine — Normalization & Progression Calculator
 * Normalizes platform-specific ratings (Codeforces, CodeChef, LeetCode, AtCoder) into unified [0, 100] scores.
 */

import { PlatformId } from '@/src/platforms/types';
import { NormalizedRating } from './rating.models';

export class RatingNormalizer {
  /**
   * Pure function: Normalizes raw platform rating to [0, 100] score and division.
   */
  public static normalize(platform: PlatformId, rawRating: number): NormalizedRating {
    let normalizedScore = 0;
    let division = 'Div. 4';

    if (platform === 'codeforces') {
      // Codeforces scale: 800 - 3500
      normalizedScore = Math.max(0, Math.min(100, Math.round(((rawRating - 800) / 2700) * 100)));
      if (rawRating < 1200) division = 'Newbie (Div. 4)';
      else if (rawRating < 1400) division = 'Pupil (Div. 3)';
      else if (rawRating < 1600) division = 'Specialist (Div. 2)';
      else if (rawRating < 1900) division = 'Expert (Div. 2)';
      else if (rawRating < 2100) division = 'Candidate Master (Div. 1)';
      else division = 'Master+ (Div. 1)';
    } else if (platform === 'codechef') {
      // CodeChef scale: 1000 - 2800 (1★ to 7★)
      normalizedScore = Math.max(0, Math.min(100, Math.round(((rawRating - 1000) / 1800) * 100)));
      if (rawRating < 1400) division = '1★ (Div. 4)';
      else if (rawRating < 1600) division = '2★ (Div. 3)';
      else if (rawRating < 1800) division = '3★ (Div. 2)';
      else if (rawRating < 2000) division = '4★ (Div. 1)';
      else division = '5★+ (Div. 1)';
    } else if (platform === 'leetcode') {
      // LeetCode scale: 1200 - 3300
      normalizedScore = Math.max(0, Math.min(100, Math.round(((rawRating - 1200) / 2100) * 100)));
      if (rawRating < 1500) division = 'Knight Track';
      else if (rawRating < 2150) division = 'Knight';
      else division = 'Guardian';
    } else {
      // Generic fallback scale: 0 - 3000
      normalizedScore = Math.max(0, Math.min(100, Math.round((rawRating / 3000) * 100)));
      division = 'Open Division';
    }

    return {
      platform,
      rawRating,
      normalizedScore,
      division,
      percentile: normalizedScore,
      performanceScore: normalizedScore,
    };
  }
}
