/**
 * Real-Time Event & Stream Message Models
 */

export interface RealtimeEvent<T = unknown> {
  readonly eventId: string;
  readonly channel: string;
  readonly type: string;
  readonly payload: T;
  readonly timestamp: string;
  readonly sequenceNumber: number;
}

export interface StreamMessage<T = unknown> {
  readonly id: string;
  readonly event: RealtimeEvent<T>;
  readonly isReplayed: boolean;
}
