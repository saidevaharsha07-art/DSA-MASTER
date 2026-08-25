/**
 * Profile Aggregation & Sanitization Engine (Excludes all private user data)
 */

import { PublicProfileSummary } from '../models/profile-summary.models';

export class ProfileEngine {
  public static sanitize(rawProfile: PublicProfileSummary): PublicProfileSummary {
    return Object.freeze({
      userId: rawProfile.userId,
      username: rawProfile.username,
      avatarUrl: rawProfile.avatarUrl,
      xp: rawProfile.xp,
      globalRank: rawProfile.globalRank,
      rating: rawProfile.rating,
      streak: rawProfile.streak,
      learningScore: rawProfile.learningScore,
      kingdomProgressPercent: rawProfile.kingdomProgressPercent,
      patternProgressPercent: rawProfile.patternProgressPercent,
      contestCount: rawProfile.contestCount,
      memoryHealthScore: rawProfile.memoryHealthScore,
      oracleScore: rawProfile.oracleScore,
      badges: Object.freeze([...rawProfile.badges]),
      titles: Object.freeze([...rawProfile.titles]),
      achievementCount: rawProfile.achievementCount,
      joinedDate: rawProfile.joinedDate,
      country: rawProfile.country,
      college: rawProfile.college,
    });
  }
}
