/**
 * Session Lifecycle Service
 */

import { AuthStorage } from '../storage/auth.storage';
import { AuthSession } from '../models/session.models';
import { TokenService } from './token.service';
import { EventBus } from '@/src/core/events/event-bus';

export class SessionService {
  private storage: AuthStorage;

  constructor(storage?: AuthStorage) {
    this.storage = storage || new AuthStorage();
  }

  public async restoreSession(): Promise<AuthSession | null> {
    const session = await this.storage.getSession();
    if (!session) return null;

    if (TokenService.isTokenExpired(session.expiresAt)) {
      await this.storage.clearSession();
      EventBus.publish('SessionExpired', { sessionId: session.sessionId });
      return null;
    }

    EventBus.publish('SessionRestored', session);
    return session;
  }

  public async saveSession(session: AuthSession): Promise<void> {
    await this.storage.saveSession(session);
  }

  public async clearSession(): Promise<void> {
    await this.storage.clearSession();
  }
}
