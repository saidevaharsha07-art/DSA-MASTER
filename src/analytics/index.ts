export interface AnalyticsEvent {
  name: string;
  userId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsAdapter {
  id: string;
  track(event: AnalyticsEvent): void;
}

export class PostHogAdapter implements AnalyticsAdapter {
  public id = 'posthog';
  public track(event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics:PostHog]`, event.name, event.metadata);
    }
  }
}

class AnalyticsService {
  private adapter: AnalyticsAdapter = new PostHogAdapter();

  public trackEvent(name: string, userId = 'archon_player', metadata: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name,
      userId,
      timestamp: new Date().toISOString(),
      metadata,
    };
    this.adapter.track(event);
  }
}

export const analyticsService = new AnalyticsService();
