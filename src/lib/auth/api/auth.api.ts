/**
 * Public Auth API
 * Interacts exclusively via IoC Container registered AuthService.
 */

import { Container } from '@/src/core/container/container';
import { AuthService } from '../services/auth.service';
import { AuthUser, AuthProviderType } from '../models/user.models';
import { AuthResult } from '../models/auth.models';

export class AuthApi {
  private static get service(): AuthService {
    if (!Container.has('AuthService')) {
      Container.registerSingleton('AuthService', new AuthService());
    }
    return Container.resolve<AuthService>('AuthService');
  }

  public static async signIn(provider: AuthProviderType): Promise<AuthResult> {
    return this.service.signIn(provider);
  }

  public static async signOut(): Promise<void> {
    return this.service.signOut();
  }

  public static async getCurrentUser(): Promise<AuthUser | null> {
    return this.service.getStateService().getState().user;
  }
}
