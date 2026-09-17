/**
 * Email/Password Auth Provider Implementation
 * Handles email authentication with dynamic credentials when remote Supabase is unconfigured or in local dev/testing mode.
 */

import { MockAuthProvider } from './mock.provider';
import { AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { SignUpCredentials } from './supabase.provider';

export class EmailProvider extends MockAuthProvider {
  constructor() {
    super('email', {
      id: 'email-user-55',
      username: 'user_email',
      email: 'coder@dsa.com',
      displayName: 'Competitive Coder',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=email-user-55',
      isGuest: false,
      roles: ['user'],
      linkedAccounts: [{ provider: 'email', providerUserId: 'em-55', email: 'coder@dsa.com', linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    });
  }

  public async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    if (!credentials.email || !credentials.password) {
      return { success: false, error: 'Email and password are required.' };
    }
    const email = credentials.email.trim().toLowerCase();
    const displayName = credentials.displayName?.trim() || email.split('@')[0];
    const id = `usr_email_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;

    const user: AuthUser = {
      id,
      username: email.split('@')[0],
      email,
      displayName,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`,
      isGuest: false,
      roles: ['user'],
      linkedAccounts: [{ provider: 'email', providerUserId: id, email, linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      user,
      provider: 'email',
      accessToken: `token_email_${Date.now()}`,
      refreshToken: `ref_email_${Date.now()}`,
      expiresAt: Date.now() + 86400000,
      rememberMe: true,
      createdAt: new Date().toISOString(),
    };

    return { success: true, user, session };
  }

  public async signIn(credentials?: SignInCredentials): Promise<AuthResult> {
    const email = credentials?.email?.trim().toLowerCase() || 'coder@dsa.com';
    const displayName = email.split('@')[0];
    const id = `usr_email_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;

    const user: AuthUser = {
      id,
      username: email.split('@')[0],
      email,
      displayName,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${id}`,
      isGuest: false,
      roles: ['user'],
      linkedAccounts: [{ provider: 'email', providerUserId: id, email, linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      sessionId: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      user,
      provider: 'email',
      accessToken: `token_email_${Date.now()}`,
      refreshToken: `ref_email_${Date.now()}`,
      expiresAt: Date.now() + 86400000,
      rememberMe: credentials?.rememberMe ?? true,
      createdAt: new Date().toISOString(),
    };

    return { success: true, user, session };
  }
}
