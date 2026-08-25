/**
 * Session Analytics Model
 */

export interface SessionAnalytics {
  readonly sessionId: string;
  readonly startTime: string;
  readonly endTime?: string;
  readonly activeTimeSec: number;
  readonly idleTimeSec: number;
  readonly interruptionsCount: number;
  readonly completionRate: number;
}
