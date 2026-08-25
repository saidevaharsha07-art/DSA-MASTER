/**
 * Oracle AI & Analytics Engine Adapter
 * Bridges Oracle strategy changes and recommendations into AnalyticsService events.
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { AnalyticsService } from '@/src/lib/analytics/services/analytics.service';
import { OracleService } from '@/src/intelligence/oracle/services/oracle.service';

export class OracleAnalyticsAdapter {
  private static get oracleService(): OracleService {
    return Container.resolve<OracleService>('OracleService');
  }

  private static get analyticsService(): AnalyticsService {
    return Container.resolve<AnalyticsService>('AnalyticsService');
  }

  public static onStrategyChanged(strategyName: string): void {
    EventBus.publish('StrategyChanged', { strategyName });
  }

  public static onRecommendationAccepted(recommendationId: string, topic: string): void {
    EventBus.publish('RecommendationCompleted', { recommendationId, topic });
  }
}
