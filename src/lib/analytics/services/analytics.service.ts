/**
 * Main Analytics Service (Listens exclusively to EventBus)
 */

import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { AnalyticsCollector } from '../engine/collector.engine';
import { FunnelEngine } from '../engine/funnel.engine';
import { KPIEngine } from '../engine/kpi.engine';
import { SessionEngine } from '../engine/session.engine';
import { IAnalyticsRepository, MockAnalyticsRepository } from '../repositories/analytics.repository';
import { LocalAnalyticsProvider } from '../providers/local.provider';
import { AnalyticsConsentService } from './consent.service';
import { AnalyticsStateService } from './analytics-state.service';
import { AnalyticsEvent, AnalyticsEventType } from '../models/analytics-event.models';
import { KPIReport } from '../models/kpi.models';
import { LearningFunnelReport } from '../models/funnel.models';
import { SessionAnalytics } from '../models/session-analytics.models';

export class AnalyticsService {
  private collector: AnalyticsCollector;
  public readonly consentService: AnalyticsConsentService;
  public readonly stateService: AnalyticsStateService;
  private repository: IAnalyticsRepository;
  private provider: LocalAnalyticsProvider;
  private sessionEngine: SessionEngine;

  constructor(
    repository?: IAnalyticsRepository,
    consentService?: AnalyticsConsentService,
    stateService?: AnalyticsStateService
  ) {
    this.repository = repository || new MockAnalyticsRepository();
    this.consentService = consentService || new AnalyticsConsentService();
    this.stateService = stateService || new AnalyticsStateService();
    this.collector = new AnalyticsCollector(this.consentService);
    this.provider = new LocalAnalyticsProvider();
    this.sessionEngine = new SessionEngine();

    this.sessionEngine.startSession(`sess-${Date.now()}`);

    EventBus.subscribeAll((event: AppEvent) => {
      this.handleEvent(event);
    });
  }

  private async handleEvent(event: AppEvent): Promise<void> {
    const typeMap: Partial<Record<string, AnalyticsEventType>> = {
      ProblemSolved: 'problem_solved',
      MemoryReviewed: 'concept_revised',
      ContestCompleted: 'contest_participated',
      AchievementUnlocked: 'achievement_unlocked',
      SyncCompleted: 'sync_completed',
      UserSignedIn: 'user_signed_in',
    };

    const analyticsType = typeMap[event.type];
    if (analyticsType) {
      this.collector.record(analyticsType, (event.payload as Record<string, unknown>) || {});
      const flushed = await this.collector.flushToProvider(this.provider);
      await this.repository.saveEvents(flushed);

      const allEvents = await this.repository.getEvents();
      this.stateService.setState({
        eventsCount: allEvents.length,
        recentEvents: allEvents.slice(-10),
        kpis: KPIEngine.calculateKPIs(allEvents),
        funnel: FunnelEngine.calculateFunnel(allEvents),
      });
    }
  }

  public async getDashboard(): Promise<{ kpis: KPIReport; funnel: LearningFunnelReport }> {
    const all = await this.repository.getEvents();
    return {
      kpis: KPIEngine.calculateKPIs(all),
      funnel: FunnelEngine.calculateFunnel(all),
    };
  }

  public async getTimeSeries(): Promise<ReadonlyArray<AnalyticsEvent>> {
    return this.repository.getEvents();
  }

  public async getSessionHistory(): Promise<ReadonlyArray<SessionAnalytics>> {
    return this.repository.getSessions();
  }

  public async clearAnalytics(): Promise<void> {
    await this.repository.clear();
    this.stateService.setState({ eventsCount: 0, recentEvents: [] });
  }
}
