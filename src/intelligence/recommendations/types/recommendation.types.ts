/**
 * DSA MASTER — Unified Recommendation Engine Domain Types
 * Defines the strict, single-source-of-truth recommendation contract
 * across Dashboard, Journey, Practice, Revision, Interview, Contest, Mentor, and Analytics.
 */

export type RecommendationActionType =
  | 'LEARN'
  | 'PRACTICE'
  | 'REVISE'
  | 'INTERVIEW'
  | 'CONTEST'
  | 'REVIEW_MISTAKE'
  | 'ASK_MENTOR';

export type RecommendationPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW';

export type RecommendationLifecycleState =
  | 'GENERATED'
  | 'VIEWED'
  | 'STARTED'
  | 'COMPLETED'
  | 'DISMISSED'
  | 'EXPIRED';

export type RecommendationConfidence = 'low' | 'medium' | 'high';

export interface MentorContextPayload {
  topic: string;
  masteryScore?: number;
  failedAttempts?: number;
  recentAccuracy?: number;
  srsRetention?: number;
  recommendedAction?: string;
  contextSummary?: string;
  suggestedQuery?: string;
  actionType?: RecommendationActionType;
}

export interface UnifiedRecommendation {
  /** Deterministic unique ID (e.g., `rec_revise_binary-search_user123_v1`) */
  id: string;

  /** Action type: LEARN, PRACTICE, REVISE, INTERVIEW, CONTEST, REVIEW_MISTAKE, ASK_MENTOR */
  actionType: RecommendationActionType;

  /** Actionable title (e.g. "Review Binary Search Retention") */
  title: string;

  /** Clear explanation answering WHY AM I SEEING THIS */
  explanation: string;

  /** Category priority level */
  priority: RecommendationPriority;

  /** Deterministic numeric rank (1 = most urgent, 7 = optional) */
  priorityRank: number;

  /** Canonical topic name or slug (e.g. "Binary Search") */
  topic: string;

  /** Canonical topic ID or slug (e.g. "binary-search") */
  topicId?: string;

  /** Originating subsystem intelligence sources */
  sourceSignals: string[];

  /** Canonical application target route */
  destinationRoute: string;

  /** Factual, evidence-first metrics backing this recommendation */
  supportingEvidence: string[];

  /** ISO creation timestamp */
  createdAt: string;

  /** Scoped user ID */
  userId: string;

  /** Confidence strength based on telemetry volume */
  confidenceStrength: RecommendationConfidence;

  /** Current lifecycle state */
  lifecycleState: RecommendationLifecycleState;

  /** Optional targeted problem */
  targetProblemId?: string;
  targetProblemTitle?: string;
  targetDifficulty?: 'Easy' | 'Medium' | 'Hard';

  /** Estimated completion time in minutes */
  estimatedMinutes: number;

  /** Compact, privacy-preserving context payload for AI Mentor handoff */
  mentorContextPayload?: MentorContextPayload;

  /** Whether the user account is fresh with 0 solves/attempts */
  isZeroState?: boolean;

  /** Whether generated in public preview / guest mode */
  isGuest?: boolean;

  /** Timestamp when the recommendation condition becomes stale or expires */
  expiresAt?: string;

  /** Completed timestamp */
  completedAt?: string;

  /** Dismissed timestamp */
  dismissedAt?: string;
}

export interface RecommendationLifecycleRecord {
  recommendationId: string;
  userId: string;
  actionType: RecommendationActionType;
  state: RecommendationLifecycleState;
  timestamp: string;
  topic: string;
  destinationRoute: string;
}

export interface RecommendationAnalyticsSummary {
  totalGenerated: number;
  totalViewed: number;
  totalStarted: number;
  totalCompleted: number;
  totalDismissed: number;
  completionRatePercent: number;
  completionRatePct?: number;
  topActionType?: string;
  actionTypeBreakdown: Record<RecommendationActionType, number>;
  topicProgressionAfterActionCount: number;
  recentEvents?: RecommendationLifecycleRecord[];
}
