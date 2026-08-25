/**
 * Platform Engine — Central Configuration & Constants
 * Single source of truth for engine limits, difficulty standards, and cache defaults.
 */

import { PlatformId } from './types';

export const SUPPORTED_PLATFORM_IDS: readonly PlatformId[] = [
  'leetcode',
  'codeforces',
  'codechef',
  'mentorpick',
  'atcoder',
  'cses',
  'hackerrank',
  'geeksforgeeks',
  'spoj',
] as const;

export const DEFAULT_DIFFICULTY_TIERS: readonly string[] = [
  'Beginner',
  'Easy',
  'Easy-Medium',
  'Easy+',
  'Medium',
  'Medium-Hard',
  'Medium+',
  'Hard',
  'Hard+',
  'Expert',
  'Master',
] as const;

export const DEFAULT_CACHE_CONFIG = {
  maxEntries: 500,
  ttlMs: 1000 * 60 * 15, // 15 minutes
  enabled: true,
} as const;

export const VALIDATION_LIMITS = {
  maxTitleLength: 200,
  maxTagsCount: 50,
  minRating: 0,
  maxRating: 4000,
} as const;

export const ENGINE_METADATA = {
  version: '2.5.0',
  engineName: 'Antigravity Platform Engine',
} as const;
