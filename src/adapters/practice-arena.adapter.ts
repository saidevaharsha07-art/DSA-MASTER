/**
 * Practice Arena Adapter (Phase 11 Requirement 7)
 * Thin facade decoupling UI components from EventBus and activity store logic.
 * Captures problem opened, attempt started, code run, failed attempt, successful solve,
 * favorite toggled, and note saved.
 */

import { EventBus } from '@/src/core/events/event-bus';

export interface PracticeArenaTelemetryParams {
  userId?: string;
  problemId: string;
  platform?: string;
  topic?: string;
  pattern?: string;
  difficulty?: string;
  durationSeconds?: number;
  xpEarned?: number;
  status?: string;
  metadata?: Record<string, unknown>;
}

export class PracticeArenaAdapter {
  public static recordOpened(params: PracticeArenaTelemetryParams): void {
    const userId = params.userId || 'default_user';
    EventBus.publish('ProblemOpened', {
      userId,
      problemId: params.problemId,
      platform: params.platform || 'leetcode',
      topic: params.topic,
      pattern: params.pattern,
      difficulty: params.difficulty,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordStarted(params: PracticeArenaTelemetryParams): void {
    const userId = params.userId || 'default_user';
    EventBus.publish('AttemptStarted', {
      userId,
      problemId: params.problemId,
      platform: params.platform || 'leetcode',
      topic: params.topic,
      pattern: params.pattern,
      difficulty: params.difficulty,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordCodeRun(params: PracticeArenaTelemetryParams): void {
    const userId = params.userId || 'default_user';
    EventBus.publish('CodeRun', {
      userId,
      problemId: params.problemId,
      platform: params.platform || 'leetcode',
      status: params.status || 'success',
      durationSeconds: params.durationSeconds || 0,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordFailedAttempt(params: PracticeArenaTelemetryParams): void {
    const userId = params.userId || 'default_user';
    EventBus.publish('ProblemFailed', {
      userId,
      problemId: params.problemId,
      platform: params.platform || 'leetcode',
      durationSeconds: params.durationSeconds || 0,
      timestamp: new Date().toISOString(),
      xpEarned: 0,
    });
  }

  public static recordSuccessfulSolve(params: PracticeArenaTelemetryParams): void {
    const userId = params.userId || 'default_user';
    EventBus.publish('ProblemSolved', {
      userId,
      problemId: params.problemId,
      platform: params.platform || 'leetcode',
      durationSeconds: params.durationSeconds || 0,
      xpEarned: params.xpEarned || 50,
      topic: params.topic,
      pattern: params.pattern,
      difficulty: params.difficulty,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordFavoriteToggled(userId: string, problemId: string, isFavorite: boolean): void {
    EventBus.publish('FavoriteToggled', {
      userId: userId || 'default_user',
      problemId,
      isFavorite,
      timestamp: new Date().toISOString(),
    });
  }

  public static recordNoteSaved(userId: string, problemId: string, noteText: string): void {
    EventBus.publish('NoteSaved', {
      userId: userId || 'default_user',
      problemId,
      noteText,
      timestamp: new Date().toISOString(),
    });
  }
}
