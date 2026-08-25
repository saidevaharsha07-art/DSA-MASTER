/**
 * Mock & Stub Analytics Providers (Firebase, PostHog, Mixpanel, OpenTelemetry)
 */

import { IAnalyticsProvider } from './analytics-provider.interface';
import { AnalyticsEvent } from '../models/analytics-event.models';

export class MockAnalyticsProvider implements IAnalyticsProvider {
  constructor(public readonly providerId: string, public readonly name: string) {}

  public async track(): Promise<boolean> {
    return true;
  }

  public async flush(): Promise<void> {}
}

export class FirebaseAnalyticsProvider extends MockAnalyticsProvider {
  constructor() {
    super('firebase', 'Firebase Analytics Stub');
  }
}

export class PostHogProvider extends MockAnalyticsProvider {
  constructor() {
    super('posthog', 'PostHog Analytics Stub');
  }
}

export class MixpanelProvider extends MockAnalyticsProvider {
  constructor() {
    super('mixpanel', 'Mixpanel Analytics Stub');
  }
}

export class OpenTelemetryProvider extends MockAnalyticsProvider {
  constructor() {
    super('opentelemetry', 'OpenTelemetry Tracing Stub');
  }
}
