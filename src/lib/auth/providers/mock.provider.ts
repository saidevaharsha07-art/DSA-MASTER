/**
 * Generic Mock Auth Provider Implementation
 */

import { IAuthProvider } from './auth-provider.interface';
import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';

export class MockAuthProvider implements IAuthProvider {
  public readonly providerType: AuthProviderType;
  private mockUser: AuthUser;

  constructor(type: AuthProviderType = 'mock', customUser?: AuthUser) {
    this.providerType = type;
    this.mockUser = customUser || {
      id: `usr-${type}-1001`,
      username: `mock_${type}_user`,
      displayName: `Mock ${type.toUpperCase()} User`,
      isGuest: type === 'guest',
      roles: ['user'],
      linkedAccounts: [{ provider: type, providerUserId: `p-${type}-1`, linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };
  }

  public async signIn(credentials?: SignInCredentials): Promise<AuthResult> {
    const session: AuthSession = {
      sessionId: `sess-${Date.now()}`,
      user: this.mockUser,
      provider: this.providerType,
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      expiresAt: Date.now() + 86400000,
      rememberMe: credentials?.rememberMe ?? true,
      createdAt: new Date().toISOString(),
    };

    return { success: true, session, user: this.mockUser };
  }

  public async signOut(): Promise<void> {}

  public async refresh(): Promise<AuthSession | null> {
    return {
      sessionId: `sess-refreshed-${Date.now()}`,
      user: this.mockUser,
      provider: this.providerType,
      accessToken: `mock-refreshed-token-${Date.now()}`,
      expiresAt: Date.now() + 86400000,
      rememberMe: true,
      createdAt: new Date().toISOString(),
    };
  }

  public async restoreSession(): Promise<AuthSession | null> {
    const res = await this.signIn();
    return res.session || null;
  }

  public async linkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser> {
    const updatedAccounts = [...user.linkedAccounts, { provider, providerUserId: `link-${Date.now()}`, linkedAt: new Date().toISOString() }];
    return { ...user, linkedAccounts: updatedAccounts };
  }

  public async unlinkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser> {
    const updatedAccounts = user.linkedAccounts.filter((a) => a.provider !== provider);
    return { ...user, linkedAccounts: updatedAccounts };
  }

  public async getCurrentUser(): Promise<AuthUser | null> {
    return this.mockUser;
  }
}
