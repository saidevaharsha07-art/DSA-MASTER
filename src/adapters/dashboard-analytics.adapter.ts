/**
 * Dashboard & Analytics Dashboard Adapter
 * Bridges Dashboard widget interactions into AnalyticsService telemetry.
 */

import { EventBus } from '@/src/core/events/event-bus';

export class DashboardAnalyticsAdapter {
  public static trackDashboardVisit(activeKingdom: string, streak: number): void {
    EventBus.publish('ProfileUpdated', { activeKingdom, streak, timestamp: new Date().toISOString() });
  }

  public static trackWidgetClick(widgetName: string): void {
    EventBus.publish('ProfileUpdated', { widgetName, action: 'click', timestamp: new Date().toISOString() });
  }
}
