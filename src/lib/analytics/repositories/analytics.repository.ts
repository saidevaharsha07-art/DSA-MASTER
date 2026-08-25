/**
 * Analytics Repository (Local / Storage Backed)
 */

import { AnalyticsEvent } from '../models/analytics-event.models';
import { SessionAnalytics } from '../models/session-analytics.models';
import { TimeSeriesPoint, KPIReport } from '../models/kpi.models';

export interface IAnalyticsRepository {
  saveEvents(events: ReadonlyArray<AnalyticsEvent>): Promise<void>;
  getEvents(): Promise<ReadonlyArray<AnalyticsEvent>>;
  saveSession(session: SessionAnalytics): Promise<void>;
  getSessions(): Promise<ReadonlyArray<SessionAnalytics>>;
  clear(): Promise<void>;
}

export class MockAnalyticsRepository implements IAnalyticsRepository {
  private events: AnalyticsEvent[] = [];
  private sessions: SessionAnalytics[] = [];

  public async saveEvents(newEvents: ReadonlyArray<AnalyticsEvent>): Promise<void> {
    this.events.push(...newEvents);
  }

  public async getEvents(): Promise<ReadonlyArray<AnalyticsEvent>> {
    return Object.freeze([...this.events]);
  }

  public async saveSession(session: SessionAnalytics): Promise<void> {
    this.sessions.push(session);
  }

  public async getSessions(): Promise<ReadonlyArray<SessionAnalytics>> {
    return Object.freeze([...this.sessions]);
  }

  public async clear(): Promise<void> {
    this.events = [];
    this.sessions = [];
  }
}
