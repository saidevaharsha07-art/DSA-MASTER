/**
 * Canonical Platform Telemetry & Snapshot Types
 * Provides strict TypeScript models for real coding platform telemetry, daily snapshots, and UI card metrics.
 */

export type PlatformKey = 'leetcode' | 'codechef' | 'codeforces' | 'mentorpick';

export interface PlatformDailySnapshot {
  userId: string;
  platform: PlatformKey;
  date: string; // Format: YYYY-MM-DD
  timestamp: string; // ISO String
  rating: number | null;
  solvedCount: number | null;
  contestCount: number | null;
  successRate: string | null; // e.g. "90%" or null
  rank: string | null; // e.g. "#9840" or null
  latestContestDate?: string | null;
  latestContestRank?: string | null;
  latestContestRatingChange?: number | null;
}

export interface PlatformSyncState {
  userId: string;
  platform: PlatformKey;
  lastSyncedAt: string | null; // ISO String
  status: 'Connected' | 'Disconnected' | 'Syncing' | 'Sync Failed' | 'Stale';
  error?: string;
}

export interface PlatformTelemetryCard {
  name: string;
  platformKey: PlatformKey;
  rating: number | string; // Numeric rating or "N/A"
  ratingLabel: string; // "Platform Rating" or "Est. Rating"
  isEstimated: boolean;
  trend: string; // e.g. "+20" or "0" or "N/A"
  solved: number | string; // Solved count or "N/A"
  contests: number | string; // Contest count or "Contest data unavailable"
  success: string; // Success rate or "N/A"
  rank: string; // Rank string or "Unranked"
  status: string; // "Connected" / "Sync unavailable"
  color: string;
  lastSyncedText: string; // e.g. "Just now", "12 min ago", "Aug 25, 2:14 PM"
  lastSyncedAt: string | null;
  historicalSnapshots: PlatformDailySnapshot[];
  isStale?: boolean;
  solvedCount?: number | null;
  successRate?: string | null;
  latestContestDate?: string | null;
  contestCount?: number | null;
}
