/**
 * Real-Time Connection & Sync State Models
 */

export type RealtimeConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

export interface ConnectionState {
  readonly status: RealtimeConnectionStatus;
  readonly providerId: string;
  readonly connectedAt?: string;
  readonly reconnectAttempts: number;
}
