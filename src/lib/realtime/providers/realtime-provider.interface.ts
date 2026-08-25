/**
 * Real-Time Provider Interface Contract
 */

import { RealtimeEvent } from '../models/realtime-event.models';

export interface IRealtimeProvider {
  readonly providerId: string;
  readonly name: string;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  publish(event: RealtimeEvent): Promise<boolean>;
  subscribe(channel: string, callback: (event: RealtimeEvent) => void): () => void;
}
