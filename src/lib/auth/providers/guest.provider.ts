/**
 * Guest Auth Provider — Fully Functional Local Guest Authentication
 */

import { MockAuthProvider } from './mock.provider';

export class GuestProvider extends MockAuthProvider {
  constructor() {
    super('guest', {
      id: `guest-${Math.random().toString(36).substring(2, 8)}`,
      username: 'guest_coder',
      displayName: 'Guest Anonymous Coder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      isGuest: true,
      roles: ['guest'],
      linkedAccounts: [],
      createdAt: new Date().toISOString(),
    });
  }
}
