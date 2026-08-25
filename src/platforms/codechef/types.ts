/**
 * CodeChef Platform Module — Types
 * Unified interface and type definitions for CodeChef Practice System.
 */

import { PlatformId, PlatformProblem, PlatformMetadata } from '../types';

export interface CodeChefRawRecord {
  id?: string;
  code?: string;
  problemCode?: string;
  title?: string;
  name?: string;
  difficulty?: number | string;
  rating?: number | string;
  section?: string;
  practicePath?: string;
  starPath?: string;
  company?: string;
  interviewTopic?: string;
  interviewCategory?: string;
  tags?: string[] | string;
  kingdom?: string;
  pattern?: string;
  url?: string;
  status?: string;
  estimatedTime?: number;
  xp?: number;
  solved?: boolean;
  notes?: string;
  [key: string]: unknown;
}

export interface CodeChefProblemMetadata extends PlatformMetadata {
  readonly problemCode: string;
  readonly section: string;
  readonly practicePath: string;
  readonly starPath: string;
  readonly company: string;
  readonly interviewTopic: string;
  readonly interviewCategory: string;
  readonly tags: readonly string[];
  readonly kingdom: string;
  readonly pattern: string;
  readonly notes: string;
}

export interface CodeChefProblem extends PlatformProblem {
  readonly platform: 'codechef';
  readonly metadata: CodeChefProblemMetadata;
}

export interface CodeChefFilterOptions {
  readonly section?: string;
  readonly practicePath?: string;
  readonly difficultyRating?: number | string;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly difficultyLabel?: string;
  readonly company?: string;
  readonly interviewCategory?: string;
  readonly interviewTopic?: string;
  readonly starPath?: string;
  readonly tags?: readonly string[];
  readonly status?: 'all' | 'solved' | 'unsolved' | 'attempted';
  readonly kingdom?: string;
  readonly pattern?: string;
  readonly searchQuery?: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'rating' | 'title' | 'difficulty' | 'code';
  readonly sortOrder?: 'asc' | 'desc';
}

export interface CodeChefSearchOptions extends CodeChefFilterOptions {
  readonly searchBy?: ('code' | 'title' | 'difficulty' | 'rating' | 'tags' | 'path' | 'section' | 'company' | 'topic')[];
}

export interface CodeChefStats {
  readonly totalProblems: number;
  readonly uniqueProblems: number;
  readonly duplicatesCount: number;
  readonly pathsCount: number;
  readonly sectionsCount: number;
  readonly companiesCount: number;
  readonly ratingDistribution: Record<string, number>;
  readonly difficultyDistribution: Record<string, number>;
  readonly completionPercentage: number;
  readonly solvedCount: number;
  readonly attemptedCount: number;
  readonly unsolvedCount: number;
  readonly sectionsList: readonly string[];
  readonly practicePathsList: readonly string[];
  readonly companiesList: readonly string[];
}

export interface CodeChefSection {
  readonly name: string;
  readonly problemCount: number;
  readonly paths: readonly string[];
}

export interface CodeChefPracticePath {
  readonly name: string;
  readonly section: string;
  readonly problemCount: number;
  readonly difficultyRange: string;
}
