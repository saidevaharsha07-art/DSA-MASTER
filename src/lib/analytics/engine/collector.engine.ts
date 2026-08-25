/**
 * Analytics Collector & Batching Engine
 */

import { AnalyticsEvent, AnalyticsEventType } from '../models/analytics-event.models';
import { AnalyticsConsentService } from '../services/consent.service';
import { IAnalyticsProvider } from '../providers/analytics-provider.interface';

export class AnalyticsCollector {
  private buffer: AnalyticsEvent[] = [];
  private consentService: AnalyticsConsentService;

  constructor(consentService?: AnalyticsConsentService) {
    this.consentService = consentService || new AnalyticsConsentService();
  }

  public record(type: AnalyticsEventType, properties: Record<string, unknown> = {}): AnalyticsEvent | null {
    if (!this.consentService.isAllowed()) return null;

    const rawEvent: AnalyticsEvent = {
      eventId: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      timestamp: new Date().toISOString(),
      anonymousUserId: '',
      properties,
    };

    const sanitized = this.consentService.anonymize(rawEvent);
    this.buffer.push(sanitized);
    return sanitized;
  }

  public async flushToProvider(provider: IAnalyticsProvider): Promise<ReadonlyArray<AnalyticsEvent>> {
    const items = [...this.buffer];
    this.buffer = [];

    for (const event of items) {
      await provider.track(event);
    }
    await provider.flush();

    return Object.freeze(items);
  }

  public getBufferedCount(): number {
    return this.buffer.length;
  }
}
