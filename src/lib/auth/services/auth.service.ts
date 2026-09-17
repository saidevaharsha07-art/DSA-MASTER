/**
 * Core Authentication Manager Service
 * Provider-agnostic coordinator for sign in, sign up, sign out, account linking, password reset, and session restoration.
 */

import { IAuthProvider } from '../providers/auth-provider.interface';
import { GoogleProvider } from '../providers/google.provider';
import { GithubProvider } from '../providers/github.provider';
import { EmailProvider } from '../providers/email.provider';
import { GuestProvider } from '../providers/guest.provider';
import { SupabaseAuthProvider, SignUpCredentials } from '../providers/supabase.provider';

import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthSession } from '../models/session.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { SessionService } from './session.service';
import { AuthStateService } from './auth-state.service';
import { EventBus } from '@/src/core/events/event-bus';
import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';
import { progressService } from '@/src/services/progress/progress.service';

export class AuthService {
  private providers: Map<AuthProviderType, IAuthProvider> = new Map();
  private supabaseProvider: SupabaseAuthProvider;
  private sessionService: SessionService;
  private stateService: AuthStateService;

  constructor(sessionService?: SessionService, stateService?: AuthStateService) {
    this.sessionService = sessionService || new SessionService();
    this.stateService = stateService || new AuthStateService();

    this.supabaseProvider = new SupabaseAuthProvider();
    this.registerProvider(this.supabaseProvider);
    this.registerProvider(new GoogleProvider());
    this.registerProvider(new GithubProvider());
    this.registerProvider(new EmailProvider());
    this.registerProvider(new GuestProvider());
  }

  public registerProvider(provider: IAuthProvider): void {
    this.providers.set(provider.providerType, provider);
  }

  public getSupabaseProvider(): SupabaseAuthProvider {
    return this.supabaseProvider;
  }

  public getStateService(): AuthStateService {
    return this.stateService;
  }

  private initializeUserAccount(user: AuthUser): void {
    if (!user || !user.id) return;
    const existing = canonicalDb.getUser(user.id);
    if (!existing) {
      canonicalDb.saveUser({
        userId: user.id,
        username: user.username || user.email?.split('@')[0] || 'User',
        displayName: user.displayName || user.username || 'Developer',
        email: user.email,
        settings: {
          handles: {},
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    // Ensures clean progress state is loaded or initialized idempotently
    progressService.getState(user.id);
  }

  public syncAuthenticatedSession(session: AuthSession): void {
    if (!session || !session.user) return;
    this.initializeUserAccount(session.user);
    this.sessionService.saveSession(session);
    this.stateService.setState({
      isAuthenticated: true,
      user: session.user,
      session,
      activeProviderName: session.provider || 'supabase',
    });
    EventBus.publish('UserSignedIn', { userId: session.user.id, provider: session.provider || 'supabase' });
  }

  public async signIn(providerType: AuthProviderType = 'supabase', credentials?: SignInCredentials): Promise<AuthResult> {
    const provider = this.providers.get(providerType);
    if (!provider) {
      return { success: false, error: `Provider '${providerType}' is not registered.` };
    }

    const res = await provider.signIn(credentials);
    if (res.success && res.session && res.user) {
      this.initializeUserAccount(res.user);
      await this.sessionService.saveSession(res.session);
      this.stateService.setState({
        isAuthenticated: true,
        user: res.user,
        session: res.session,
        activeProviderName: providerType,
      });

      EventBus.publish('UserSignedIn', { userId: res.user.id, provider: providerType });
    }
    return res;
  }

  public async signUp(credentials: SignUpCredentials): Promise<AuthResult> {
    const res = await this.supabaseProvider.signUp(credentials);
    if (res.success && res.session && res.user) {
      this.initializeUserAccount(res.user);
      await this.sessionService.saveSession(res.session);
      this.stateService.setState({
        isAuthenticated: true,
        user: res.user,
        session: res.session,
        activeProviderName: 'supabase',
      });

      EventBus.publish('UserSignedIn', { userId: res.user.id, provider: 'supabase' });
    }
    return res;
  }

  public async resetPassword(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    return this.supabaseProvider.resetPasswordForEmail(email);
  }

  public async signInWithGoogle(): Promise<AuthResult & { url?: string }> {
    const oauthRes = await this.supabaseProvider.signInWithGoogle();
    if (oauthRes.url) {
      return { success: true, url: oauthRes.url };
    }
    return { success: false, error: oauthRes.error || 'Failed to initiate Google sign-in.' };
  }

  public async handleOAuthCallback(params: {
    code?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }): Promise<AuthResult> {
    const res = await this.supabaseProvider.handleOAuthCallback(params);
    if (res.success && res.session && res.user) {
      this.initializeUserAccount(res.user);
      await this.sessionService.saveSession(res.session);
      this.stateService.setState({
        isAuthenticated: true,
        user: res.user,
        session: res.session,
        activeProviderName: 'supabase',
      });

      EventBus.publish('UserSignedIn', { userId: res.user.id, provider: 'supabase' });
    }
    return res;
  }

  public async signOut(): Promise<void> {
    const current = this.stateService.getState();
    if (current.session) {
      const provider = this.providers.get(current.session.provider);
      if (provider) {
        await provider.signOut(current.session.sessionId);
      }
    }

    await this.sessionService.clearSession();
    this.stateService.setState({
      isAuthenticated: false,
      user: null,
      session: null,
      activeProviderName: 'none',
    });

    EventBus.publish('UserSignedOut', { userId: current.user?.id });
  }

  public async restoreSession(): Promise<boolean> {
    // 1. Try to restore directly from active Supabase client session
    const sbSession = await this.supabaseProvider.restoreSession();
    if (sbSession && sbSession.user) {
      this.initializeUserAccount(sbSession.user);
      await this.sessionService.saveSession(sbSession);
      this.stateService.setState({
        isAuthenticated: true,
        user: sbSession.user,
        session: sbSession,
        activeProviderName: 'supabase',
      });
      return true;
    }

    // 2. Try to restore cached session from local storage
    const session = await this.sessionService.restoreSession();
    if (session && session.user) {
      if (session.provider === 'supabase') {
        // If it was a supabase session but active client returned null, token is expired/invalid
        await this.sessionService.clearSession();
        this.stateService.setState({
          isAuthenticated: false,
          user: null,
          session: null,
          activeProviderName: 'none',
        });
        return false;
      }

      this.initializeUserAccount(session.user);
      this.stateService.setState({
        isAuthenticated: true,
        user: session.user,
        session,
        activeProviderName: session.provider,
      });
      return true;
    }

    this.stateService.setState({
      isAuthenticated: false,
      user: null,
      session: null,
      activeProviderName: 'none',
    });
    return false;
  }

  public async linkAccount(targetProvider: AuthProviderType): Promise<AuthUser | null> {
    const current = this.stateService.getState();
    if (!current.user) return null;

    const provider = this.providers.get(targetProvider);
    if (!provider) return null;

    const updatedUser = await provider.linkAccount(current.user, targetProvider);
    this.stateService.setState({ user: updatedUser });
    EventBus.publish('AccountLinked', { userId: updatedUser.id, provider: targetProvider });
    return updatedUser;
  }

  public async unlinkAccount(targetProvider: AuthProviderType): Promise<AuthUser | null> {
    const current = this.stateService.getState();
    if (!current.user) return null;

    const provider = this.providers.get(targetProvider);
    if (!provider) return null;

    const updatedUser = await provider.unlinkAccount(current.user, targetProvider);
    this.stateService.setState({ user: updatedUser });
    EventBus.publish('AccountUnlinked', { userId: updatedUser.id, provider: targetProvider });
    return updatedUser;
  }
}
