/**
 * Public User Profile Summary Model
 */

import { Badge, UserTitle } from '@/src/intelligence/achievements/models/badge.models';

export interface PublicProfileSummary {
  readonly userId: string;
  readonly username: string;
  readonly avatarUrl?: string;
  readonly xp: number;
  readonly globalRank: number;
  readonly rating: number;
  readonly streak: number;
  readonly learningScore: number;
  readonly kingdomProgressPercent: number;
  readonly patternProgressPercent: number;
  readonly contestCount: number;
  readonly memoryHealthScore: number;
  readonly oracleScore: number;
  readonly badges: ReadonlyArray<Badge>;
  readonly titles: ReadonlyArray<UserTitle>;
  readonly achievementCount: number;
  readonly joinedDate: string;
  readonly country?: string;
  readonly college?: string;
}
