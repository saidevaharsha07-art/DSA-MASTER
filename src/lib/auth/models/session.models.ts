/**
 * Session Models
 */

import { AuthUser, AuthProviderType } from './user.models';

export interface AuthSession {
  readonly sessionId: string;
  readonly user: AuthUser;
  readonly provider: AuthProviderType;
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresAt: number; // epoch ms
  readonly rememberMe: boolean;
  readonly createdAt: string;
}
