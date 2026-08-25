/**
 * Auth Storage Abstraction
 * Encapsulates authentication session and token persistence using IStorageProvider.
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { AuthSession } from '../models/session.models';

export class AuthStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async getSession(): Promise<AuthSession | null> {
    return this.storage.get<AuthSession>('auth_session');
  }

  public async saveSession(session: AuthSession): Promise<void> {
    await this.storage.set('auth_session', session);
  }

  public async clearSession(): Promise<void> {
    await this.storage.remove('auth_session');
  }
}
