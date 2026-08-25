/**
 * Mock Cloud Provider Stubs (WebSocket, SSE, Firebase Realtime, Supabase Realtime)
 */

import { IRealtimeProvider } from './realtime-provider.interface';
import { RealtimeEvent } from '../models/realtime-event.models';

export class MockRealtimeProvider implements IRealtimeProvider {
  constructor(public readonly providerId: string, public readonly name: string) {}

  public async connect(): Promise<boolean> { return true; }
  public async disconnect(): Promise<void> {}
  public async publish(): Promise<boolean> { return true; }
  public subscribe(): () => void { return () => {}; }
}

export class WebSocketProvider extends MockRealtimeProvider {
  constructor() { super('websocket', 'WebSocket Stream Provider Stub'); }
}

export class SSEProvider extends MockRealtimeProvider {
  constructor() { super('sse', 'Server-Sent Events Stream Stub'); }
}

export class FirebaseRealtimeProvider extends MockRealtimeProvider {
  constructor() { super('firebase_realtime', 'Firebase Realtime DB Stub'); }
}

export class SupabaseRealtimeProvider extends MockRealtimeProvider {
  constructor() { super('supabase_realtime', 'Supabase Realtime Broadcast Stub'); }
}
