/**
 * CodeChef Rating Arena Type Definitions
 */

export type RatingBucketKey =
  | '500'
  | '500-1000'
  | '1000-1400'
  | '1400-1600'
  | '1600-1800'
  | '1800-2000'
  | '2000-2500';

export interface RatingBucketConfig {
  key: RatingBucketKey;
  label: string;
  subtext: string;
  minRating: number;
  maxRating: number;
  recommendedLevel: string;
  color: string; // Tailwind color string
  gradient: string;
  borderColor: string;
  icon: string;
}

export interface CodeChefRatingProblem {
  id: string;
  problemCode: string;
  title: string;
  difficulty: number;
  ratingRange: RatingBucketKey;
  url: string;
  tags: string[];
  kingdom: string;
  pattern: string;
  section?: string;
  practicePath?: string;
  starPath?: string;
  company?: string;
  interviewTopic?: string;
  interviewCategory?: string;
  editorialUrl?: string;
  videoUrl?: string;
  estimatedTime: number;
  status: 'Unsolved' | 'Attempted' | 'Solved';
  attempts: number;
  accuracy: number;
  notes?: string;
  favorite?: boolean;
  lastSolved?: string | null;
  masteryScore?: number;
  xp: number;
}

export interface RatingBucketStats {
  key: RatingBucketKey;
  totalProblems: number;
  solvedCount: number;
  attemptedCount: number;
  completionPercentage: number;
  remainingCount: number;
  estimatedHours: number;
  masteryScore: number;
}

export interface RatingArenaFilterOptions {
  ratingRange?: RatingBucketKey | 'ALL';
  searchQuery?: string;
  selectedTag?: string;
  selectedKingdom?: string;
  selectedPattern?: string;
  statusFilter?: 'ALL' | 'Solved' | 'Unsolved' | 'Attempted' | 'Favorites';
  sortBy?: 'Newest' | 'DifficultyAsc' | 'DifficultyDesc' | 'Alphabetical' | 'Accuracy';
}
