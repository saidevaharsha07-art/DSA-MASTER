/**
 * Google Auth Provider Mock Implementation
 */

import { MockAuthProvider } from './mock.provider';

export class GoogleProvider extends MockAuthProvider {
  constructor() {
    super('google', {
      id: 'google-user-99',
      username: 'alex_google',
      email: 'alex@gmail.com',
      displayName: 'Alex GoogleCoder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      isGuest: false,
      roles: ['user'],
      linkedAccounts: [{ provider: 'google', providerUserId: 'g-99', email: 'alex@gmail.com', linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    });
  }
}
