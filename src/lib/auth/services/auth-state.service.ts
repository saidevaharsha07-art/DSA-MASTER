/**
 * Immutable Auth State Container & Observable Store
 */

import { AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly user: AuthUser | null;
  readonly session: AuthSession | null;
  readonly activeProviderName: string;
}

export class AuthStateService {
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    session: null,
    activeProviderName: 'none',
  };

  private listeners: Set<(state: AuthState) => void> = new Set();

  public getState(): AuthState {
    return this.state;
  }

  public setState(next: Partial<AuthState>): void {
    this.state = Object.freeze({ ...this.state, ...next });
    this.listeners.forEach((listener) => listener(this.state));
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
