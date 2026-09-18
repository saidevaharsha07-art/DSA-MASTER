/**
 * AI Mock Interview Simulator & Preparation Engine — Type Definitions (Phase 8 & 9)
 * Defines dedicated multi-question interview sessions, question sets, attempts,
 * deterministic performance reports, verdicts, session plans, readiness snapshots,
 * pattern status matrix, and user interview history.
 *
 * DATA INTEGRITY GUARANTEE:
 * Enforces strict semantic separation between interview telemetry and normal practice solves.
 */

export type InterviewMode = 'Coding' | 'System Design' | 'Behavioral';
export type InterviewDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
export type InterviewType = 'CompanyMock' | 'WeaknessTargeted' | 'SRSRecovery' | 'TimedSpeed';
export type InterviewStatus = 'active' | 'completed' | 'abandoned';
export type InterviewVerdict = 'Needs Preparation' | 'Developing' | 'Interview Ready' | 'Strong Candidate';
export type DifficultyProgressionStage = 'Foundation' | 'Easy' | 'Easy → Medium' | 'Medium' | 'Medium → Hard' | 'Hard';
export type PatternStatusState = 'Mastered' | 'Practicing' | 'Unpracticed' | 'At Risk';
export type PatternPriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface InterviewTurn {
  readonly id: string;
  readonly sender: 'ai' | 'candidate';
  readonly text: string;
  readonly codeSnapshot?: string;
  readonly timestamp: string;
}

export interface InterviewQuestionAttempt {
  readonly questionId: string;
  readonly title: string;
  readonly startedAt: string;
  completedAt?: string;
  timeSpentSeconds: number;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  solutionSubmitted?: string;
  correctness: string;
  pattern: string;
  difficulty: string;
}

export interface InterviewQuestionSet {
  readonly sessionId: string;
  readonly targetCompany: string;
  readonly difficulty: InterviewDifficulty;
  readonly questions: InterviewQuestionAttempt[];
  readonly totalQuestions: number;
}

export interface InterviewPerformanceReport {
  readonly overallScore: number | 'Unrated';
  readonly problemSolvingScore: number | 'Unrated';
  readonly communicationScore: number | 'Unrated';
  readonly optimizationScore: number | 'Unrated';
  readonly accuracyPercentage: number | 'Unrated';
  readonly averageTimePerProblem: number; // in seconds
  readonly timeEfficiencyPercentage: number;
  readonly patternCoveragePercentage: number;
  readonly difficultyPerformance: string;
  readonly companyReadinessImpact: number;
  readonly memoryRecallPerformance: number;
  readonly strongestPattern: string;
  readonly weakestPattern: string;
  readonly correctness: string;
  readonly timeComplexity: string;
  readonly spaceComplexity: string;
  readonly strengths: ReadonlyArray<string>;
  readonly weaknesses: ReadonlyArray<string>;
  readonly feedback: string;
  readonly recommendedPractice: ReadonlyArray<string>;
  readonly confidence: number; // 0 to 100
  readonly verdict: InterviewVerdict | 'Unrated';
  readonly oracleReasoning: string;
}

export interface UserInterviewHistorySummary {
  readonly totalInterviews: number;
  readonly averageScore: number | 'Unrated';
  readonly bestScore: number | 'Unrated';
  readonly latestScore: number | 'Unrated';
  readonly latestVerdict?: InterviewVerdict | 'Unrated';
  readonly recentSessions: ReadonlyArray<{
    readonly id: string;
    readonly company: string;
    readonly date: string;
    readonly score: number | 'Unrated';
    readonly verdict?: string;
  }>;
}

export interface InterviewSession {
  readonly sessionId: string;
  readonly userId: string;
  readonly companyId: string;
  readonly companyName: string;
  readonly roleTitle: string;
  readonly mode: InterviewMode;
  readonly interviewType: InterviewType;
  readonly difficulty: InterviewDifficulty;
  readonly problemId: string;
  readonly problemTitle: string;
  readonly problemDescription: string;
  readonly starterCode: string;
  readonly questionSet?: InterviewQuestionSet;
  readonly currentQuestionIndex?: number;
  readonly timeLimitSeconds: number;
  readonly secondsUsed?: number;
  readonly startedAt: string;
  completedAt?: string;
  status: InterviewStatus;
  turns: InterviewTurn[];
  finalCode?: string;
  report?: InterviewPerformanceReport;
}

export interface CompanyTrackInfo {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly topPatterns: ReadonlyArray<string>;
}

// ==================================================
// PHASE 9 — INTERVIEW PREPARATION ENGINE MODELS
// ==================================================

export interface InterviewTrackSummary {
  readonly targetCompany: string;
  readonly targetRole: string;
  readonly solvedInterviewProblems: number;
  readonly totalInterviewProblems: number;
  readonly companyCoveragePercentage: number;
  readonly currentStage: DifficultyProgressionStage;
}

export interface InterviewReadinessSnapshot {
  readonly readinessScore: number | 'Unrated';
  readonly companyCoverageScore: number;
  readonly patternCoverageScore: number;
  readonly difficultyCoverageScore: number;
  readonly memoryRetentionScore: number;
  readonly consistencyScore: number;
  readonly weaknessCoverageScore: number;
  readonly statusMessage: string;
  readonly isUnrated: boolean;
}

export interface InterviewPatternStatus {
  readonly patternName: string;
  readonly status: PatternStatusState;
  readonly priority: PatternPriorityLevel;
  readonly solvedCount: number;
  readonly totalCompanyCount: number;
  readonly retentionHealth: number; // 0 to 100
}

export interface InterviewRecommendation {
  readonly problemId: string;
  readonly title: string;
  readonly difficulty: string;
  readonly pattern: string;
  readonly companyRelevance: string;
  readonly reason: string;
}

export interface InterviewSessionPlan {
  readonly objective: string;
  readonly targetCompany: string;
  readonly targetPattern: string;
  readonly targetDifficulty: InterviewDifficulty;
  readonly recommendedDurationMinutes: number;
  readonly exercises: ReadonlyArray<InterviewRecommendation>;
  readonly rationale: string;
}

export interface InterviewMemoryAlert {
  readonly conceptId: string;
  readonly conceptName: string;
  readonly retentionHealth: number;
  readonly urgency: 'Critical' | 'High' | 'Medium';
  readonly recommendedAction: string;
}

export interface InterviewProgressSummary {
  readonly userId: string;
  readonly track: InterviewTrackSummary;
  readonly readiness: InterviewReadinessSnapshot;
  readonly patternStatuses: ReadonlyArray<InterviewPatternStatus>;
  readonly memoryAlerts: ReadonlyArray<InterviewMemoryAlert>;
  readonly nextSessionPlan: InterviewSessionPlan;
  readonly recommendations: ReadonlyArray<InterviewRecommendation>;
  readonly history: UserInterviewHistorySummary;
}

// ==================================================
// PHASE 12 & INTERVIEW ARENA 2.0 LIVE MODELS
// ==================================================

export type InterviewTopicType =
  | 'General DSA'
  | 'Arrays & Hashing'
  | 'Trees & Graphs'
  | 'Dynamic Programming'
  | 'Mixed Patterns'
  | 'Company Style'
  | 'Topic Focused';

export type InterviewSimulatorMode =
  | 'quick'
  | '30m'
  | '45m'
  | '60m'
  | 'custom'
  | 'topic'
  | 'company'
  | 'mixed';

export type InterviewArenaDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
export type InterviewDurationMinutes = 15 | 20 | 30 | 45 | 60 | 90;
export type InterviewProblemCount = 1 | 2 | 3 | 4 | 5;
export type InterviewLanguage = 'java' | 'python' | 'cpp' | 'javascript' | 'typescript';

export type InterviewReadinessLevel =
  | 'Building Evidence'
  | 'Developing'
  | 'Strong Evidence'
  | 'Needs Practice';

export interface InterviewReadinessData {
  readonly level: InterviewReadinessLevel;
  readonly headline?: string;
  readonly description?: string;
  readonly totalSessionsCompleted?: number;
  readonly totalCompletedSessions: number;
  readonly overallAccuracy?: number;
  readonly historicalAccuracyPercent: number;
  readonly confidenceScore: number;
  readonly speedPacingScore: number;
  readonly averageTimePerProblemMinutes: number;
  readonly patternCoverageCount: number;
  readonly strongestAreas: string[];
  readonly weakestAreas: string[];
  readonly recommendedFocus: string;
  readonly recommendedSession: {
    readonly mode: InterviewSimulatorMode;
    readonly durationMinutes: InterviewDurationMinutes;
    readonly problemCount: InterviewProblemCount;
    readonly difficulty: InterviewArenaDifficulty;
    readonly targetArea?: string;
    readonly reason: string;
    readonly title: string;
  };
  readonly areasWithEvidence?: ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly solvedCount: number;
    readonly accuracy: number;
  }>;
  readonly areasNeedingPractice?: ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly reason: string;
  }>;
  readonly patternsMissed?: ReadonlyArray<{
    readonly slug: string;
    readonly title: string;
    readonly failCount: number;
  }>;
  readonly recentPerformanceConsistency?: number; // 0-100
}

export interface InterviewConfig {
  mode?: InterviewSimulatorMode;
  type?: InterviewTopicType | string;
  difficulty: InterviewArenaDifficulty;
  durationMinutes: number;
  problemCount: number;
  language: InterviewLanguage;
  useWeakness: boolean;
  targetCompany?: string;
  targetArea?: string;
  targetSubtopic?: string;
  targetPattern?: string;
}

export interface InterviewArenaProblemAttempt {
  problemId: string;
  title: string;
  difficulty: string;
  pattern: string;
  patternSlug?: string;
  areaSlug?: string;
  subtopicSlug?: string;
  categorySlug: string;
  categoryTitle?: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  hints: string[];
  starterCode: string;
  userCode: string;
  language: InterviewLanguage;
  status: 'unattempted' | 'attempted' | 'passed' | 'failed';
  attemptsCount: number;
  timeSpentSeconds: number;
  lastVerdict?: string;
  lastOutput?: string;
  runtimeMs?: number;
  memoryMb?: number;
  testcasesPassed?: number;
  totalTestcases?: number;

  // Thinking / Explanation Phase (Requirement 8)
  approachNotes?: string;
  timeComplexityEstimate?: string;
  spaceComplexityEstimate?: string;
  identifiedEdgeCases?: string;

  // Interviewer Guidance & Tracking (Requirement 7)
  hintsUsedCount: number;
  guidanceChecksCompleted: string[];
  companyTags: string[];
}

export interface PatternEncounterRecord {
  readonly patternSlug: string;
  readonly patternTitle?: string;
  readonly patternName?: string;
  readonly areaSlug?: string;
  readonly subtopicSlug?: string;
  readonly areaTitle?: string;
  readonly solved?: boolean;
  readonly attempts?: number;
}

export interface InterviewArenaReport {
  id: string;
  sessionId: string;
  userId: string;
  date: string;
  mode?: InterviewSimulatorMode;
  interviewType: InterviewTopicType | string;
  difficulty: InterviewArenaDifficulty | string;
  durationSeconds: number;
  timeUsedSeconds: number;
  status?: 'completed' | 'expired';
  overallScore: number;
  grade?: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' | string;
  verdict: string;

  // Factual Performance Breakdown (Requirement 10)
  problemsAttempted: number;
  problemsSolved: number;
  accuracyPercent: number;
  averageTimePerProblemMinutes?: number;
  averageTimePerProblemSeconds?: number;
  failedAttemptsCount: number;
  hintsUsedCount: number;
  patternsEncountered: PatternEncounterRecord[];
  areasEncountered: string[];
  readinessState: InterviewReadinessLevel;

  metrics: {
    accuracy: number; // 0-100
    problemSolving?: number; // 0-100
    timeManagement: number; // 0-100
    patternRecognition: number; // 0-100
    consistency: number; // 0-100
    codeQuality?: number;
  };

  problems: InterviewArenaProblemAttempt[];

  problemBreakdown?: Array<{
    problemId: string;
    title: string;
    difficulty: string;
    pattern: string;
    patternSlug?: string;
    categorySlug?: string;
    result: 'Passed' | 'Incomplete' | 'Failed';
    attempts: number;
    timeSpentMinutes: number;
    testcasesPassed: number;
    totalTestcases: number;
    submittedCode?: string;
    language?: InterviewLanguage;
    approachNotes?: string;
  }>;

  whatWentWell?: string[];
  whatNeedsWork?: string[];
  strengths?: string[];
  weaknesses?: string[];
  actionItems?: string[];
  recommendedNextSteps?: Array<{
    title: string;
    type: 'practice' | 'revision';
    url: string;
    reason: string;
  }>;
  recommendedPracticePatterns?: string[];
  recommendedPracticeProblems?: Array<{
    id: string;
    title: string;
    difficulty: string;
    pattern: string;
    categorySlug: string;
  }>;
  mentorQueryContext: string;
}

export interface InterviewArenaSession {
  id: string;
  userId: string;
  config: InterviewConfig;
  startedAt: string;
  expiresAt: string;
  durationSeconds: number;
  isPaused?: boolean;
  pausedAt?: string;
  remainingSecondsAtPause?: number;
  totalPausedSeconds?: number;
  problems: InterviewArenaProblemAttempt[];
  activeProblemIndex: number;
  status: 'in_progress' | 'completed' | 'expired';
  completedAt?: string;
  report?: InterviewArenaReport;
}

export interface InterviewHistoryRecord {
  id: string;
  userId: string;
  date: string;
  mode?: InterviewSimulatorMode;
  type: InterviewTopicType;
  difficulty: InterviewArenaDifficulty;
  score: number;
  grade?: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  durationMinutes: number;
  timeUsedMinutes: number;
  problemsCompleted: number;
  totalProblems: number;
  accuracy?: number;
  recurringPatterns?: string[];
  report: InterviewArenaReport;
}
