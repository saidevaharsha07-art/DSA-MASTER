/**
 * Public Product Analytics API Facade
 */

import { Container } from '@/src/core/container/container';
import { AnalyticsService } from '../services/analytics.service';
import { KPIReport } from '../models/kpi.models';
import { LearningFunnelReport } from '../models/funnel.models';
import { AnalyticsEvent } from '../models/analytics-event.models';
import { SessionAnalytics } from '../models/session-analytics.models';

export class AnalyticsApi {
  private static get service(): AnalyticsService {
    if (!Container.has('AnalyticsService')) {
      Container.registerSingleton('AnalyticsService', new AnalyticsService());
    }
    return Container.resolve<AnalyticsService>('AnalyticsService');
  }

  public static async getDashboard(): Promise<{ kpis: KPIReport; funnel: LearningFunnelReport }> {
    return this.service.getDashboard();
  }

  public static async getKPIs(): Promise<KPIReport> {
    const dash = await this.getDashboard();
    return dash.kpis;
  }

  public static async getTimeSeries(): Promise<ReadonlyArray<AnalyticsEvent>> {
    return this.service.getTimeSeries();
  }

  public static async getSessionHistory(): Promise<ReadonlyArray<SessionAnalytics>> {
    return this.service.getSessionHistory();
  }

  public static async getFunnels(): Promise<LearningFunnelReport> {
    const dash = await this.getDashboard();
    return dash.funnel;
  }

  public static async clearAnalytics(): Promise<void> {
    return this.service.clearAnalytics();
  }
}
