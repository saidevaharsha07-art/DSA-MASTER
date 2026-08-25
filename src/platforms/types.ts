/**
 * Platform Engine — Core Types
 * Central type definitions for competitive programming platform abstractions.
 */

export type PlatformId =
  | 'leetcode'
  | 'codeforces'
  | 'codechef'
  | 'mentorpick'
  | 'atcoder'
  | 'cses'
  | 'hackerrank'
  | 'geeksforgeeks'
  | 'spoj';

export type PlatformStatus = 'active' | 'beta' | 'planned' | 'deprecated';

export interface RawCodeChefProblem {
  id?: string;
  code?: string;
  title?: string;
  name?: string;
  kingdom?: string;
  category?: string;
  pattern?: string;
  subtopic?: string;
  rating?: number | string;
  difficulty?: string;
  tags?: string[];
  estimatedTime?: number;
  xp?: number;
  url?: string;
  notes?: string;
  status?: string;
  platform?: string;
  contestId?: number | string;
  index?: string;
}

export interface RawCodeforcesProblem {
  id?: string;
  contestId?: number | string;
  index?: string;
  title?: string;
  name?: string;
  kingdom?: string;
  category?: string;
  pattern?: string;
  subtopic?: string;
  rating?: number | string;
  difficulty?: string;
  tags?: string[];
  estimatedTime?: number;
  xp?: number;
  url?: string;
  notes?: string;
  status?: string;
  platform?: string;
}

export interface PlatformMetadata {
  readonly contestId?: number | string;
  readonly index?: string;
  readonly tags?: readonly string[];
  readonly editorial?: string;
  readonly timeLimit?: string | number;
  readonly memoryLimit?: string | number;
  readonly acceptanceRate?: number;
  readonly notes?: string;
  readonly rawKingdom?: string;
  readonly rawPattern?: string;
  readonly [key: string]: unknown;
}

export interface PlatformProblem {
  readonly id: string;
  readonly title: string;
  readonly platform: PlatformId;
  readonly difficulty: string;
  readonly rating: number | string;
  readonly topic: string;
  readonly pattern: string;
  readonly url: string;
  readonly solved: boolean;
  readonly estimatedTime?: number;
  readonly xp?: number;
  readonly metadata: PlatformMetadata;
}

export interface PlatformCapabilities {
  readonly supportsRating: boolean;
  readonly supportsContests: boolean;
  readonly supportsEditorial: boolean;
  readonly supportsSubmissions: boolean;
  readonly supportsCustomTestcases?: boolean;
}

export interface PlatformConfig {
  readonly id: PlatformId;
  readonly displayName: string;
  readonly logo?: string;
  readonly themeColor: string;
  readonly websiteUrl: string;
  readonly status: PlatformStatus;
  readonly capabilities: PlatformCapabilities;
  readonly difficultySystem: readonly string[];
}

export interface PlatformQueryOptions {
  readonly difficulty?: string;
  readonly topic?: string;
  readonly pattern?: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly searchQuery?: string;
  readonly solvedStatus?: 'all' | 'solved' | 'unsolved';
}

export interface PlatformVersionInfo {
  readonly datasetVersion: string;
  readonly lastUpdated: string;
  readonly platformVersion: string;
}

export interface PlatformValidationError {
  readonly problemId: string;
  readonly field: string;
  readonly message: string;
  readonly severity: 'error' | 'warning';
}

export interface PlatformValidationReport {
  readonly valid: boolean;
  readonly platform: PlatformId;
  readonly totalProblems: number;
  readonly duplicateIds: readonly string[];
  readonly invalidUrls: readonly string[];
  readonly warnings: readonly PlatformValidationError[];
  readonly errors: readonly PlatformValidationError[];
  readonly summary: string;
}

export interface DatasetHealthReport {
  readonly platform: PlatformId;
  readonly totalProblems: number;
  readonly validProblems: number;
  readonly skippedProblems: number;
  readonly warningsCount: number;
  readonly errorsCount: number;
  readonly duplicateIds: readonly string[];
  readonly duplicateTitles: readonly string[];
  readonly malformedRows: readonly number[];
  readonly healthScore: number; // percentage 0-100%
  readonly summary: string;
}

export interface CacheStats {
  readonly hits: number;
  readonly misses: number;
  readonly entries: number;
  readonly keys: readonly string[];
}
