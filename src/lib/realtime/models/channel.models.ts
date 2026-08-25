/**
 * Real-Time Channels & Subscription Models
 */

export type RealtimeChannelType =
  | 'profile'
  | 'memory'
  | 'oracle'
  | 'practice'
  | 'contest'
  | 'achievements'
  | 'notifications'
  | 'analytics'
  | 'leaderboards'
  | 'sync'
  | 'backup'
  | 'settings'
  | 'connectors';

export interface ChannelState {
  readonly channelName: string;
  readonly subscriberCount: number;
  readonly isSubscribed: boolean;
}

export interface Subscription {
  readonly id: string;
  readonly channel: string;
  readonly callback: (event: unknown) => void;
}
