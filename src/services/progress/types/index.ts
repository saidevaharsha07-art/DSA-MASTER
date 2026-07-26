export interface PlayerProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  currentKingdom: string;
  unlockedKingdoms: string[];
  coins: number;
  gems: number;
  currentStreak: number;
  longestStreak: number;
  recoveryTokens: number;
  joinDate: string;
  solvedCount: number;
  attemptedCount: number;
  acceptanceRate: number;
  languagesUsed: string[];
}

export type ConfidenceRating = 'very_easy' | 'easy' | 'medium' | 'hard' | 'forgot_everything';

export interface ProblemProgress {
  problemId: string;
  solved: boolean;
  attempted: boolean;
  bookmarked: boolean;
  favorite: boolean;
  revisionStage: number;
  confidence: ConfidenceRating;
  lastOpened: string;
  lastSubmitted?: string;
  nextRevisionDate?: string;
  bestRuntimeMs?: number;
  bestMemoryMb?: number;
  notes?: string;
  draftCode?: Record<string, string>; // language -> code
  currentLanguage?: string;
}

export interface KingdomProgress {
  kingdomSlug: string;
  unlocked: boolean;
  completedPct: number;
  solvedProblems: number;
  patternsCompleted: number;
  totalXpEarned: number;
  starsEarned: number;
  completionDate?: string;
  mastered: boolean;
}

export interface PatternProgress {
  patternSlug: string;
  completed: boolean;
  solvedProblems: number;
  accuracyPct: number;
  avgRuntimeMs: number;
  avgMemoryMb: number;
  confidenceScore: number;
  masteryPct: number;
}

export interface PersonalNote {
  id: string;
  problemId: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkItem {
  id: string;
  type: 'problem' | 'pattern' | 'kingdom' | 'note';
  targetId: string;
  folder: string;
  createdAt: string;
}

export type XpActionType =
  | 'OPEN_PROBLEM'
  | 'RUN_CODE'
  | 'ACCEPTED_SOLUTION'
  | 'HARD_ACCEPTED'
  | 'FIRST_TRY_BONUS'
  | 'STREAK_7_DAY'
  | 'COMPLETE_PATTERN'
  | 'COMPLETE_KINGDOM';
