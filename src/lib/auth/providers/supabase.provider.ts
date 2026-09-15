/**
 * Supabase Authentication Provider Implementation
 * Production-ready real Supabase Authentication provider.
 * Supports Email/Password Sign Up & Sign In, Google OAuth, Password Recovery, and Session Restoration.
 * Never allows arbitrary or mock login without valid authentication.
 */

import { IAuthProvider } from './auth-provider.interface';
import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/src/lib/supabase/client';

export interface SignUpCredentials extends SignInCredentials {
  readonly displayName?: string;
}

export class SupabaseAuthProvider implements IAuthProvider {
  public readonly providerType: AuthProviderType = 'supabase';

  private getClient(): SupabaseClient | null {
    return getSupabaseClient();
  }

  public getIsConfigured(): boolean {
    return this.getClient() !== null;
  }

  /**
   * Primary Email + Password Sign In
   */
  public async signIn(credentials?: SignInCredentials): Promise<AuthResult> {
    if (!credentials?.email || !credentials?.password) {
      return { success: false, error: 'Email and password are required.' };
    }

    const email = credentials.email.trim().toLowerCase();
    const client = this.getClient();

    if (!client) {
      return {
        success: false,
        error: 'Supabase authentication service is not configured. Please verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password: credentials.password,
      });

      if (error || !data.user || !data.session) {
        return {
          success: false,
          error: error?.message || 'Invalid email or password.',
        };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        username: data.user.email ? data.user.email.split('@')[0] : `user_${data.user.id.substring(0, 8)}`,
        email: data.user.email || email,
        displayName:
          data.user.user_metadata?.display_name ||
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          (data.user.email ? data.user.email.split('@')[0] : 'User'),
        avatarUrl:
          data.user.user_metadata?.avatar_url ||
          data.user.user_metadata?.picture ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.id}`,
        isGuest: false,
        roles: ['user'],
        linkedAccounts: [
          {
            provider: 'supabase',
            providerUserId: data.user.id,
            email: data.user.email,
            linkedAt: new Date().toISOString(),
          },
        ],
        createdAt: data.user.created_at || new Date().toISOString(),
      };

      const session: AuthSession = {
        sessionId: `sess_${data.session.access_token.substring(0, 16)}`,
        user: authUser,
        provider: 'supabase',
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600 * 1000,
        rememberMe: credentials.rememberMe ?? true,
        createdAt: new Date().toISOString(),
      };

      return { success: true, user: authUser, session };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to authenticate with Supabase Auth.',
      };
    }
  }

  /**
   * Registration / Sign Up Flow
   */
  public async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    if (!credentials.email || !credentials.password) {
      return { success: false, error: 'Email and password are required.' };
    }
    if (credentials.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const email = credentials.email.trim().toLowerCase();
    const displayName = credentials.displayName?.trim() || email.split('@')[0];
    const client = this.getClient();

    if (!client) {
      return {
        success: false,
        error: 'Supabase authentication service is not configured. Please verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await client.auth.signUp({
        email,
        password: credentials.password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Registration failed.',
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Registration failed. No user was returned by authentication service.',
        };
      }

      const authUser: AuthUser = {
        id: data.user.id,
        username: email.split('@')[0],
        email: data.user.email || email,
        displayName: displayName,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.id}`,
        isGuest: false,
        roles: ['user'],
        linkedAccounts: [
          {
            provider: 'supabase',
            providerUserId: data.user.id,
            email: data.user.email,
            linkedAt: new Date().toISOString(),
          },
        ],
        createdAt: data.user.created_at || new Date().toISOString(),
      };

      if (data.session) {
        const session: AuthSession = {
          sessionId: `sess_${data.session.access_token.substring(0, 16)}`,
          user: authUser,
          provider: 'supabase',
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 3600 * 1000,
          rememberMe: true,
          createdAt: new Date().toISOString(),
        };
        return { success: true, user: authUser, session };
      }

      // Email confirmation required flow
      return {
        success: true,
        user: authUser,
        error: 'EMAIL_CONFIRMATION_REQUIRED',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to complete registration with Supabase.',
      };
    }
  }

  private getAppBaseUrl(): string {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    const envUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : undefined) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

    if (envUrl) {
      return envUrl.replace(/\/+$/, '');
    }
    return 'https://dsa-master-7boq.vercel.app';
  }

  private getCallbackUrl(customPathOrUrl?: string): string {
    if (customPathOrUrl) {
      if (customPathOrUrl.startsWith('http://') || customPathOrUrl.startsWith('https://')) {
        return customPathOrUrl;
      }
      const baseUrl = this.getAppBaseUrl();
      const path = customPathOrUrl.startsWith('/') ? customPathOrUrl : `/${customPathOrUrl}`;
      return `${baseUrl}${path}`;
    }
    const baseUrl = this.getAppBaseUrl();
    return `${baseUrl}/auth/callback`;
  }

  /**
   * Google OAuth Initiation
   */
  public async signInWithGoogle(redirectTo?: string): Promise<{ success: boolean; url?: string; error?: string }> {
    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        error: 'Supabase authentication service is not configured.',
      };
    }

    try {
      const redirectUrl = this.getCallbackUrl(redirectTo || '/auth/callback');

      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.url) {
        return { success: true, url: data.url };
      }

      return { success: false, error: 'Unable to generate Google OAuth authorization URL.' };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to initiate Google sign-in.' };
    }
  }

  /**
   * Process OAuth Callback Result
   */
  public async handleOAuthCallback(params: {
    code?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }): Promise<AuthResult> {
    if (params.error) {
      return { success: false, error: params.error };
    }

    const client = this.getClient();
    if (!client) {
      return { success: false, error: 'Supabase authentication service is not configured.' };
    }

    try {
      let sbSession: any = null;
      let sbUser: any = null;

      // 1. Exchange PKCE Code
      if (params.code) {
        const { data, error } = await client.auth.exchangeCodeForSession(params.code);
        if (error) {
          return { success: false, error: error.message };
        }
        if (data?.session && data?.user) {
          sbSession = data.session;
          sbUser = data.user;
        }
      }

      // 2. Set tokens if received from URL fragment
      if (!sbUser && params.accessToken) {
        const { data, error } = await client.auth.setSession({
          access_token: params.accessToken,
          refresh_token: params.refreshToken || '',
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data?.session && data?.user) {
          sbSession = data.session;
          sbUser = data.user;
        }
      }

      // 3. Fallback to active session check
      if (!sbUser) {
        const { data, error } = await client.auth.getSession();
        if (!error && data?.session?.user) {
          sbSession = data.session;
          sbUser = data.session.user;
        }
      }

      if (!sbUser || !sbSession) {
        return { success: false, error: 'No authorization code or active session was found.' };
      }

      const authUser: AuthUser = {
        id: sbUser.id,
        username: sbUser.email ? sbUser.email.split('@')[0] : `user_${sbUser.id.substring(0, 8)}`,
        email: sbUser.email || '',
        displayName:
          sbUser.user_metadata?.display_name ||
          sbUser.user_metadata?.full_name ||
          sbUser.user_metadata?.name ||
          (sbUser.email ? sbUser.email.split('@')[0] : 'User'),
        avatarUrl:
          sbUser.user_metadata?.avatar_url ||
          sbUser.user_metadata?.picture ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${sbUser.id}`,
        isGuest: false,
        roles: ['user'],
        linkedAccounts: [
          {
            provider: 'supabase',
            providerUserId: sbUser.id,
            email: sbUser.email,
            linkedAt: new Date().toISOString(),
          },
        ],
        createdAt: sbUser.created_at || new Date().toISOString(),
      };

      const session: AuthSession = {
        sessionId: `sess_${sbSession.access_token.substring(0, 16)}`,
        user: authUser,
        provider: 'supabase',
        accessToken: sbSession.access_token,
        refreshToken: sbSession.refresh_token,
        expiresAt: sbSession.expires_at ? sbSession.expires_at * 1000 : Date.now() + 3600 * 1000,
        rememberMe: true,
        createdAt: new Date().toISOString(),
      };

      return { success: true, user: authUser, session };
    } catch (err: any) {
      return { success: false, error: err?.message || 'OAuth callback processing failed.' };
    }
  }

  /**
   * Password Reset Request
   */
  public async resetPasswordForEmail(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        error: 'Supabase authentication service is not configured.',
      };
    }

    try {
      const resetRedirectUrl = this.getCallbackUrl('/login?tab=forgot');
      const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: resetRedirectUrl,
      });

      if (error) {
        return { success: false, error: error.message || 'Failed to send password reset email.' };
      }

      return { success: true, message: 'Password reset instructions have been sent to your email address.' };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error connecting to auth service.' };
    }
  }

  public async signOut(): Promise<void> {
    const client = this.getClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch {}
    }
  }

  public async refresh(refreshToken: string): Promise<AuthSession | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client.auth.refreshSession({ refresh_token: refreshToken });
      if (error || !data?.session?.user) return null;

      const user = data.session.user;
      const sbSession = data.session;

      const authUser: AuthUser = {
        id: user.id,
        username: user.email ? user.email.split('@')[0] : `user_${user.id.substring(0, 8)}`,
        email: user.email || '',
        displayName:
          user.user_metadata?.display_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (user.email ? user.email.split('@')[0] : 'User'),
        avatarUrl:
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`,
        isGuest: false,
        roles: ['user'],
        linkedAccounts: [
          {
            provider: 'supabase',
            providerUserId: user.id,
            email: user.email,
            linkedAt: new Date().toISOString(),
          },
        ],
        createdAt: user.created_at || new Date().toISOString(),
      };

      return {
        sessionId: `sess_${sbSession.access_token.substring(0, 16)}`,
        user: authUser,
        provider: 'supabase',
        accessToken: sbSession.access_token,
        refreshToken: sbSession.refresh_token,
        expiresAt: sbSession.expires_at ? sbSession.expires_at * 1000 : Date.now() + 3600 * 1000,
        rememberMe: true,
        createdAt: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  public async restoreSession(): Promise<AuthSession | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data, error } = await client.auth.getSession();
      if (error || !data?.session?.user) return null;

      const user = data.session.user;
      const sbSession = data.session;

      const authUser: AuthUser = {
        id: user.id,
        username: user.email ? user.email.split('@')[0] : `user_${user.id.substring(0, 8)}`,
        email: user.email || '',
        displayName:
          user.user_metadata?.display_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          (user.email ? user.email.split('@')[0] : 'User'),
        avatarUrl:
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}`,
        isGuest: false,
        roles: ['user'],
        linkedAccounts: [
          {
            provider: 'supabase',
            providerUserId: user.id,
            email: user.email,
            linkedAt: new Date().toISOString(),
          },
        ],
        createdAt: user.created_at || new Date().toISOString(),
      };

      return {
        sessionId: `sess_${sbSession.access_token.substring(0, 16)}`,
        user: authUser,
        provider: 'supabase',
        accessToken: sbSession.access_token,
        refreshToken: sbSession.refresh_token,
        expiresAt: sbSession.expires_at ? sbSession.expires_at * 1000 : Date.now() + 3600 * 1000,
        rememberMe: true,
        createdAt: new Date().toISOString(),
      };
    } catch {
      return null;
    }
  }

  public async linkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser> {
    return user;
  }

  public async unlinkAccount(user: AuthUser, provider: AuthProviderType): Promise<AuthUser> {
    return user;
  }

  public async getCurrentUser(): Promise<AuthUser | null> {
    const session = await this.restoreSession();
    return session?.user || null;
  }
}
