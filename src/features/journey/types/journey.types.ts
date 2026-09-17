/**
 * DSA MASTER — Adaptive Roadmap 2.0 Domain Types
 * Strict, deterministic models for topic dependency graphs, mastery calculation,
 * cross-mode evidence synthesis, next-best-action decisions, blockers, and weekly plans.
 */

export type TopicStatus =
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'PRACTICING'
  | 'STRONG'
  | 'MASTERED'
  | 'NEEDS_REVIEW'
  | 'BLOCKED';

export type NextActionType = 'LEARN' | 'PRACTICE' | 'REVISE' | 'INTERVIEW' | 'CONTEST';

export type DifficultyTier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface TopicEvidence {
  practiceSolved: number;
  practiceAttempted: number;
  easySolved: number;
  medSolved: number;
  hardSolved: number;
  recentAccuracyPercent: number;
  failedAttemptsCount: number;
  repeatedErrorPatterns: string[];
  revisionRetentionPercent: number;
  revisionLastReviewedAt?: string;
  interviewSuccessCount: number;
  contestSolveCount: number;
  contestFailCount: number;
  lastActivityAt?: string;
}

export interface RoadmapTopicNode {
  id: string;
  title: string;
  slug: string;
  category: string;
  tier: DifficultyTier;
  order: number;
  prerequisites: string[]; // Topic IDs that should precede this
  dependentTopicIds: string[]; // Topic IDs unlocked by this
  totalCurriculumProblems: number;
  
  // Computed Adaptive State
  status: TopicStatus;
  masteryScore: number; // 0 - 100
  confidenceRating: 'Low' | 'Medium' | 'High' | 'Expert';
  statusReason: string; // Factual justification of why this status was assigned
  evidence: TopicEvidence;
  recommendedAction: NextActionType;
  recommendedProblemIds: string[];
  blockerReason?: string;
  unlockRequirement?: string;
}

export interface NextBestAction {
  actionType: NextActionType;
  targetTopicId: string;
  targetTopicTitle: string;
  reason: string;
  urgency: 'Immediate' | 'Recommended' | 'Optional';
  recommendedProblemId?: string;
  recommendedProblemTitle?: string;
  recommendedDifficulty?: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  actionUrl: string;
}

export interface LearningMomentum {
  velocityScore: number; // 0 - 100
  activeDaysLast14d: number;
  currentStreakDays: number;
  recentSolvesCount: number;
  crossModeParticipation: {
    practice: boolean;
    revision: boolean;
    interview: boolean;
    contest: boolean;
  };
  trendDescription: string;
}

export interface LearningBlocker {
  id: string;
  topicId: string;
  topicTitle: string;
  blockerType: 'MISSING_PREREQUISITE' | 'REPEATED_MISTAKE_PATTERN' | 'STALE_REVISION_DECAY' | 'DIFFICULTY_SPIKE';
  explanation: string;
  unlockAction: string;
  unlockUrl: string;
}

export interface DailyScheduleItem {
  dayIndex: number; // 1 to 7 (Mon to Sun)
  dayName: string;
  actionType: NextActionType;
  topicId: string;
  topicTitle: string;
  targetDifficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedMinutes: number;
  reason: string;
  actionUrl: string;
  isCompleted?: boolean;
}

export interface AdaptiveRoadmapState {
  userId: string;
  updatedAt: string;
  overallMasteryPercent: number;
  totalTopics: number;
  masteredCount: number;
  strongCount: number;
  practicingCount: number;
  learningCount: number;
  needsReviewCount: number;
  notStartedCount: number;
  blockedCount: number;
  
  topics: RoadmapTopicNode[];
  stages: {
    completed: RoadmapTopicNode[];
    current: RoadmapTopicNode[];
    next: RoadmapTopicNode[];
    upcoming: RoadmapTopicNode[];
    needsAttention: RoadmapTopicNode[];
  };

  nextBestAction: NextBestAction;
  momentum: LearningMomentum;
  blockers: LearningBlocker[];
  weeklyPlan: DailyScheduleItem[];
  isZeroState: boolean;
  onboardingPrior?: {
    status: string;
    assessmentScore?: number;
    baselineEvidence: string[];
    isBaselineOnly: boolean;
  };
}
