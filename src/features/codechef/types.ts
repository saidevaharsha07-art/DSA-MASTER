/**
 * CodeChef Feature — Types
 * Clean type definitions for CodeChef DSA Mission Control curriculum hierarchy.
 * Based 100% on CodeChef_Master_Dataset.xlsx.
 */

export type CodeChefViewMode = 'overview' | 'kingdom' | 'pattern';

export interface CodeChefKingdomDef {
  id: string;
  name: string;
  number: number;
  patternCount: number;
  problemCount: number;
  description: string;
  icon: string;
  color: string;
  patternIds: string[];
}

export interface CodeChefPatternDef {
  id: string;
  kingdomId: string;
  kingdomName: string;
  name: string;
  number: string;
  description: string;
  problemCount: number;
  difficultyDistribution: Record<string, number>;
  avgEstimatedTime: number;
  problemCodes: string[];
}

export interface CodeChefArenaProblem {
  id: string;
  code: string;
  title: string;
  kingdomId: string;
  kingdomName: string;
  patternId: string;
  patternName: string;
  difficulty: string;
  rating: number;
  difficultyLabel: string;
  topics: string[];
  url: string;
  notes?: string;
  platform: string;
  estimatedTime: number;
  xp: number;
  status: 'Unsolved' | 'Attempted' | 'Solved';
  favorite: boolean;
}

export interface PatternStats {
  id: string;
  kingdomId: string;
  kingdomName: string;
  name: string;
  number: string;
  description: string;
  totalProblems: number;
  solvedCount: number;
  attemptedCount: number;
  completionPercentage: number;
  estimatedHours: number;
  difficultyDistribution: Record<string, number>;
}

export interface KingdomStats {
  kingdom: CodeChefKingdomDef;
  totalProblems: number;
  solvedCount: number;
  completionPercentage: number;
  patternCount: number;
  totalXp: number;
  patterns: PatternStats[];
}

export interface HeaderStats {
  totalProblems: number;
  solvedCount: number;
  attemptedCount: number;
  bookmarkedCount: number;
  revisionCount: number;
  completionPercentage: number;
  currentStreak: number;
  longestStreak: number;
}

export interface CodeChefFilterOptions {
  kingdomId?: string | 'ALL';
  patternId?: string | 'ALL';
  searchQuery?: string;
  statusFilter?: 'ALL' | 'Solved' | 'Unsolved' | 'Attempted' | 'Favorites';
  difficultyFilter?: 'ALL' | 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  sortBy?: 'Order' | 'DifficultyAsc' | 'DifficultyDesc' | 'Alphabetical';
}


