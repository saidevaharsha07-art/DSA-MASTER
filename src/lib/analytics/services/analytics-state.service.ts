/**
 * Observable Analytics State Store
 */

import { AnalyticsEvent } from '../models/analytics-event.models';
import { KPIReport } from '../models/kpi.models';
import { LearningFunnelReport } from '../models/funnel.models';

export interface AnalyticsDashboardState {
  readonly eventsCount: number;
  readonly activeProviderName: string;
  readonly kpis?: KPIReport;
  readonly funnel?: LearningFunnelReport;
  readonly recentEvents: ReadonlyArray<AnalyticsEvent>;
}

export class AnalyticsStateService {
  private state: AnalyticsDashboardState = {
    eventsCount: 0,
    activeProviderName: 'Local Analytics Provider',
    recentEvents: [],
  };

  private listeners: Set<(state: AnalyticsDashboardState) => void> = new Set();

  public getState(): AnalyticsDashboardState {
    return this.state;
  }

  public setState(next: Partial<AnalyticsDashboardState>): void {
    this.state = Object.freeze({ ...this.state, ...next });
    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: AnalyticsDashboardState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
