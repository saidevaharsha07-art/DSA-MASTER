/**
 * Presence State & Heartbeat Models
 */

export type PresenceStatus = 'online' | 'offline' | 'idle' | 'syncing' | 'reconnecting';

export interface PresenceState {
  readonly userId: string;
  readonly status: PresenceStatus;
  readonly lastActiveAt: string;
}

export interface HeartbeatStatus {
  readonly isAlive: boolean;
  readonly lastHeartbeatAt: string;
  readonly latencyMs: number;
}
