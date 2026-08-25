/**
 * Privacy & Consent Control Service
 */

import { ConsentState } from '../models/consent.models';
import { AnalyticsStorage } from '../storage/analytics.storage';
import { AnalyticsEvent } from '../models/analytics-event.models';

export class AnalyticsConsentService {
  private storage: AnalyticsStorage;
  private state: ConsentState;

  constructor(storage?: AnalyticsStorage) {
    this.storage = storage || new AnalyticsStorage();
    this.state = {
      analyticsAllowed: true,
      anonymizedUserId: `anon-${Math.random().toString(36).substring(2, 10)}`,
      consentGrantedAt: new Date().toISOString(),
    };
  }

  public allowAnalytics(): void {
    this.state = {
      ...this.state,
      analyticsAllowed: true,
      consentGrantedAt: new Date().toISOString(),
    };
    this.storage.saveConsent(this.state);
  }

  public revokeConsent(): void {
    this.state = {
      ...this.state,
      analyticsAllowed: false,
      consentRevokedAt: new Date().toISOString(),
    };
    this.storage.saveConsent(this.state);
  }

  public isAllowed(): boolean {
    return this.state.analyticsAllowed;
  }

  public anonymize(event: AnalyticsEvent): AnalyticsEvent {
    return {
      ...event,
      anonymousUserId: this.state.anonymizedUserId,
      properties: { ...event.properties, userId: undefined, email: undefined, name: undefined },
    };
  }
}
