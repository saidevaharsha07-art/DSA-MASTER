/**
 * Analytics Provider Contract
 */

import { AnalyticsEvent } from '../models/analytics-event.models';

export interface IAnalyticsProvider {
  readonly providerId: string;
  readonly name: string;
  track(event: AnalyticsEvent): Promise<boolean>;
  flush(): Promise<void>;
}
