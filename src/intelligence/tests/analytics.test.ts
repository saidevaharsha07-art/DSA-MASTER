/**
 * Unit Test: Anonymous Product Analytics Engine (Milestone 5.7)
 */

import { AnalyticsService } from '@/src/lib/analytics/services/analytics.service';
import { AnalyticsApi } from '@/src/lib/analytics/api/analytics.api';
import { EventBus } from '@/src/core/events/event-bus';

export async function testAnalyticsEngine(): Promise<void> {
  console.log('--- Testing Milestone 5.7 Anonymous Product Analytics Engine ---');

  const analyticsService = new AnalyticsService();

  // 1. EventBus Event Consumption
  EventBus.publish('ProblemSolved', { problemId: 'P-500', solveTimeSec: 150 });
  EventBus.publish('MemoryReviewed', { conceptId: 'c-graph' });
  await new Promise((r) => setTimeout(r, 50));

  const timeSeries = await analyticsService.getTimeSeries();
  if (timeSeries.length < 2) {
    throw new Error('Analytics event consumption from EventBus failed!');
  }
  console.log(`[PASS] Analytics event collection verified (${timeSeries.length} events logged).`);

  // 2. Privacy Anonymization
  const sampleEvent = timeSeries[0];
  if (!sampleEvent.anonymousUserId.startsWith('anon-')) {
    throw new Error('Privacy anonymization failed!');
  }
  console.log('[PASS] Privacy anonymization verified (anonymousUserId: ' + sampleEvent.anonymousUserId + ').');

  // 3. Derived KPIs and Funnel Reporting
  const dashboard = await AnalyticsApi.getDashboard();
  if (dashboard.kpis.avgSolveTimeSec <= 0 || dashboard.funnel.stages.length === 0) {
    throw new Error('Derived KPIs and Learning Funnel calculation failed!');
  }
  console.log(`[PASS] Derived KPIs & Learning Funnel verified (${dashboard.funnel.stages.length} funnel stages computed).`);
}
