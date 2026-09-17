/**
 * DSA MASTER — Contest Arena Domain Types
 * Robust, deterministic types for competitive programming contests,
 * scoring, penalty tracking, telemetry, leaderboards, and diagnostics.
 */

export type ContestFormat = 'sprint' | 'standard' | 'hardcore' | 'topic' | 'custom';
export type ContestMode = 'real' | 'practice';
export type ContestState = 'upcoming' | 'live' | 'completed' | 'practice_mode';
export type ContestProblemStatus = 'unattempted' | 'attempted' | 'solved';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface ContestConfig {
  id: string;
  title: string;
  description: string;
  format: ContestFormat;
  durationMinutes: number;
  problemCount: number;
  difficultyMix: 'Easy' | 'Easy+Medium' | 'Medium-heavy' | 'Mixed' | 'Hard';
  topic: string;
  mode: ContestMode;
  targetWeaknesses?: boolean;
}

export interface ContestProblemSummary {
  id: string;
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  topic: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  initialCode: Record<string, string>;
  testCases: Array<{
    id: string;
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }>;
}

export interface ProblemTelemetry {
  problemId: string;
  firstOpenedAt?: number;
  firstCodeChangeAt?: number;
  runCount: number;
  submissionCount: number;
  accepted: boolean;
  firstAcceptedAt?: number; // ms since contest start
  compileErrorCount: number;
  runtimeErrorCount: number;
  wrongAnswerCount: number;
  timeSpentSeconds: number;
  finalVerdict?: string;
  lastCode: Record<string, string>;
  lastLanguage: string;
}

export interface ContestSession {
  id: string;
  userId: string;
  config: ContestConfig;
  problems: ContestProblemSummary[];
  startedAt: number; // epoch ms
  durationSeconds: number;
  endsAt: number; // epoch ms
  completedAt?: number; // epoch ms
  status: 'active' | 'completed' | 'abandoned';
  currentProblemIndex: number;
  problemStatuses: Record<string, ContestProblemStatus>;
  telemetry: Record<string, ProblemTelemetry>;
  score: number;
  penaltyMinutes: number;
  solvedCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatarUrl?: string;
  solvedCount: number;
  totalProblems: number;
  score: number;
  penaltyMinutes: number;
  isCurrentUser?: boolean;
  problemScores: Array<{
    problemId: string;
    solved: boolean;
    attempts: number;
    solveTimeMinutes?: number;
  }>;
  countryCode?: string;
}

export interface PerformancePillar {
  name: string;
  score: number; // 0 - 100
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  insight: string;
  recommendation: string;
}

export interface ContestPerformanceReport {
  contestId: string;
  userId: string;
  contestTitle: string;
  completedAt: string;
  score: number;
  maxScore: number;
  solvedCount: number;
  totalProblems: number;
  totalTimeMinutes: number;
  penaltyMinutes: number;
  rank: number;
  totalParticipants: number;
  percentile: number;
  
  // 7 Core Performance Pillars
  pillars: {
    accuracy: PerformancePillar;
    speed: PerformancePillar;
    problemSelection: PerformancePillar;
    submissionDiscipline: PerformancePillar;
    patternRecognition: PerformancePillar;
    consistency: PerformancePillar;
    topicPerformance: PerformancePillar;
  };

  problemBreakdown: Array<{
    problemId: string;
    title: string;
    difficulty: DifficultyLevel;
    topic: string;
    status: ContestProblemStatus;
    solvedAtMinutes?: number;
    attempts: number;
    timeSpentSeconds: number;
    finalVerdict: string;
  }>;

  strengths: string[];
  weaknesses: string[];
  recommendedPractice: Array<{
    topic: string;
    difficulty: DifficultyLevel;
    reason: string;
    suggestedProblemId?: string;
  }>;

  mentorPromptContext: string;
}

export interface ContestPreset {
  id: string;
  title: string;
  tagline: string;
  format: ContestFormat;
  durationMinutes: number;
  problemCount: number;
  difficulty: 'Easy' | 'Easy+Medium' | 'Medium-heavy' | 'Mixed' | 'Hard';
  topics: string[];
  recommendedFor: string;
  isLive?: boolean;
}
