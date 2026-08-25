/**
 * Session Tracker Engine
 */

import { SessionAnalytics } from '../models/session-analytics.models';

export class SessionEngine {
  private currentSession?: SessionAnalytics;

  public startSession(sessionId: string): SessionAnalytics {
    this.currentSession = {
      sessionId,
      startTime: new Date().toISOString(),
      activeTimeSec: 0,
      idleTimeSec: 0,
      interruptionsCount: 0,
      completionRate: 100,
    };
    return this.currentSession;
  }

  public endSession(): SessionAnalytics | undefined {
    if (this.currentSession) {
      const ended: SessionAnalytics = {
        ...this.currentSession,
        endTime: new Date().toISOString(),
      };
      this.currentSession = undefined;
      return ended;
    }
    return undefined;
  }

  public getCurrentSession(): SessionAnalytics | undefined {
    return this.currentSession;
  }
}
