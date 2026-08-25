/**
 * Local Functional Analytics Provider
 */

import { IAnalyticsProvider } from './analytics-provider.interface';
import { AnalyticsEvent } from '../models/analytics-event.models';

export class LocalAnalyticsProvider implements IAnalyticsProvider {
  public readonly providerId = 'local';
  public readonly name = 'Local Anonymous Analytics Provider';
  private events: AnalyticsEvent[] = [];

  public async track(event: AnalyticsEvent): Promise<boolean> {
    this.events.push(event);
    return true;
  }

  public async flush(): Promise<void> {
    // Local memory sync
  }

  public getEvents(): ReadonlyArray<AnalyticsEvent> {
    return Object.freeze([...this.events]);
  }
}
