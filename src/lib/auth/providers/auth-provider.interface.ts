/**
 * Provider-Agnostic Authentication Provider Interface Contract
 */

import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';

export interface IAuthProvider {
  readonly providerType: AuthProviderType;
  signIn(credentials?: SignInCredentials): Promise<AuthResult>;
  signOut(sessionId: string): Promise<void>;
  refresh(refreshToken: string): Promise<AuthSession | null>;
  restoreSession(): Promise<AuthSession | null>;
  linkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser>;
  unlinkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser>;
  getCurrentUser(): Promise<AuthUser | null>;
}
