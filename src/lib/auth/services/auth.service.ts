/**
 * Core Authentication Manager Service
 * Provider-agnostic coordinator for sign in, sign out, account linking, and session restoration.
 */

import { IAuthProvider } from '../providers/auth-provider.interface';
import { GoogleProvider } from '../providers/google.provider';
import { GithubProvider } from '../providers/github.provider';
import { EmailProvider } from '../providers/email.provider';
import { GuestProvider } from '../providers/guest.provider';

import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { SessionService } from './session.service';
import { AuthStateService } from './auth-state.service';
import { EventBus } from '@/src/core/events/event-bus';

export class AuthService {
  private providers: Map<AuthProviderType, IAuthProvider> = new Map();
  private sessionService: SessionService;
  private stateService: AuthStateService;

  constructor(sessionService?: SessionService, stateService?: AuthStateService) {
    this.sessionService = sessionService || new SessionService();
    this.stateService = stateService || new AuthStateService();

    this.registerProvider(new GoogleProvider());
    this.registerProvider(new GithubProvider());
    this.registerProvider(new EmailProvider());
    this.registerProvider(new GuestProvider());
  }

  public registerProvider(provider: IAuthProvider): void {
    this.providers.set(provider.providerType, provider);
  }

  public getStateService(): AuthStateService {
    return this.stateService;
  }

  public async signIn(providerType: AuthProviderType = 'guest', credentials?: SignInCredentials): Promise<AuthResult> {
    const provider = this.providers.get(providerType);
    if (!provider) {
      return { success: false, error: `Provider '${providerType}' is not registered.` };
    }

    const res = await provider.signIn(credentials);
    if (res.success && res.session && res.user) {
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
    const session = await this.sessionService.restoreSession();
    if (session) {
      this.stateService.setState({
        isAuthenticated: true,
        user: session.user,
        session,
        activeProviderName: session.provider,
      });
      return true;
    }
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
