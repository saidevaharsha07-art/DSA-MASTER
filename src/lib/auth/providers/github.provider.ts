/**
 * GitHub Auth Provider Mock Implementation
 */

import { MockAuthProvider } from './mock.provider';

export class GithubProvider extends MockAuthProvider {
  constructor() {
    super('github', {
      id: 'github-user-77',
      username: 'dev_github',
      email: 'dev@github.com',
      displayName: 'Dev GitHubCoder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
      isGuest: false,
      roles: ['user', 'developer'],
      linkedAccounts: [{ provider: 'github', providerUserId: 'gh-77', email: 'dev@github.com', linkedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    });
  }
}
