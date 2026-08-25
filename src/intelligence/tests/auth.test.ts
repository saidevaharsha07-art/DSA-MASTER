/**
 * Unit Test: Provider-Agnostic Authentication Framework (Milestone 5.1)
 */

import { AuthService } from '@/src/lib/auth/services/auth.service';
import { PermissionService } from '@/src/lib/auth/services/permission.service';
import { EventBus } from '@/src/core/events/event-bus';

export async function testAuthFramework(): Promise<void> {
  console.log('--- Testing Milestone 5.1 Provider-Agnostic Authentication Framework ---');

  const authService = new AuthService();

  // 1. Guest Sign In
  const guestRes = await authService.signIn('guest');
  if (!guestRes.success || !guestRes.user?.isGuest) {
    throw new Error('Guest authentication failed!');
  }
  console.log('[PASS] Guest authentication verified.');

  // 2. Google Mock Sign In
  let eventFired = false;
  const unsub = EventBus.subscribe('UserSignedIn', (evt) => {
    if (evt.payload && (evt.payload as { provider: string }).provider === 'google') {
      eventFired = true;
    }
  });

  const googleRes = await authService.signIn('google');
  unsub();

  if (!googleRes.success || !eventFired) {
    throw new Error('Google provider sign in or UserSignedIn EventBus notification failed!');
  }
  console.log('[PASS] Google provider sign in and EventBus event publication verified.');

  // 3. Permission Evaluation
  const canSolve = PermissionService.hasPermission(googleRes.user || null, 'solve_problems');
  const canAdmin = PermissionService.hasPermission(googleRes.user || null, 'admin_access');

  if (!canSolve || canAdmin) {
    throw new Error('Permission evaluation for user role failed!');
  }
  console.log('[PASS] Role-based permission evaluation verified.');

  // 4. Account Linking
  const linkedUser = await authService.linkAccount('github');
  if (!linkedUser || !linkedUser.linkedAccounts.some((a) => a.provider === 'github')) {
    throw new Error('Account linking failed!');
  }
  console.log('[PASS] Account linking verified.');

  // 5. Sign Out
  await authService.signOut();
  if (authService.getStateService().getState().isAuthenticated) {
    throw new Error('Sign out failed!');
  }
  console.log('[PASS] Session sign out and state cleanup verified.');
}
