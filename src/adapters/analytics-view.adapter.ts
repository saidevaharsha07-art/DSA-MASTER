/**
 * Analytics View Adapter (Phase 11 Requirement 5)
 * Sole layer responsible for converting canonical analytics & activity store data
 * into the UI props consumed by app/(app)/analytics/page.tsx.
 */

import { AnalyticsAdapterService, AnalyticsSummary } from '@/src/features/analytics/services/analytics-adapter.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { progressService } from '@/src/services/progress/progress.service';

export class AnalyticsViewAdapter {
  public static getAnalyticsSummary(userId = 'default_user', timeframe: '7d' | '30d' | '90d' | '1y' = '30d'): AnalyticsSummary {
    const summary = AnalyticsAdapterService.getAnalyticsSummary(userId, timeframe);
    const logs = activityStoreService.getActivityLog(userId);

    // Apply honest empty state texts if insufficient activity data exists
    if (logs.length === 0) {
      summary.learningVelocityText = 'Not enough activity data yet.';
      summary.insights.topStrength = 'Not enough activity data yet.';
      summary.insights.primaryWeakness = 'Not enough activity data yet.';
      summary.insights.predictedRating = 'Not enough activity data yet.';
    } else if (logs.length <= 2) {
      summary.learningVelocityText = 'Collecting history...';
    }

    return summary;
  }
}
