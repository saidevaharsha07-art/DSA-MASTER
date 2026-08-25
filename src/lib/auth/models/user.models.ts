/**
 * User Identity Models
 */

export type AuthProviderType = 'google' | 'github' | 'email' | 'guest' | 'mock';

export interface LinkedAccount {
  readonly provider: AuthProviderType;
  readonly providerUserId: string;
  readonly email?: string;
  readonly linkedAt: string;
}

export interface AuthUser {
  readonly id: string;
  readonly username: string;
  readonly email?: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly isGuest: boolean;
  readonly roles: ReadonlyArray<string>;
  readonly linkedAccounts: ReadonlyArray<LinkedAccount>;
  readonly createdAt: string;
}
