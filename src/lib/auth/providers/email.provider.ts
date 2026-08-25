/**
 * Email/Password Auth Provider Mock Implementation
 */

import { MockAuthProvider } from './mock.provider';

export class EmailProvider extends MockAuthProvider {
  constructor() {
    super('email', {
      id: 'email-user-55',
      username: 'user_email',
      email: 'coder@dsa.com',
      displayName: 'Competitive Coder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coder',
      isGuest: false,
      roles: ['user'],
      linkedAccounts: [{ provider: 'email', providerUserId: 'em-55', email: 'coder@dsa.com', linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    });
  }
}
