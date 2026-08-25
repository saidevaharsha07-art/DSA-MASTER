/**
 * Oracle AI Engine — Action Models
 * Defines OracleActionItem and FollowUpAction.
 */

export interface FollowUpAction {
  readonly actionType: string;
  readonly title: string;
  readonly payload: Record<string, any>;
}

export interface OracleActionItem {
  readonly id: string;
  readonly actionType: 'start_session' | 'solve_problem' | 'join_contest' | 'start_review';
  readonly title: string;
  readonly targetId: string; // problemId, sessionId, contestId
  readonly targetPlatform?: string;
  readonly estimatedMinutes: number;
}
