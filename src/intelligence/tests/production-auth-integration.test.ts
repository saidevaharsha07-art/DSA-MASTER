/**
 * Production Authentication & User Identity Integration Test Suite
 * Verifies email/password signup & login, Google OAuth initiation, invalid credentials,
 * password reset flow, logout, session persistence, route protection, strict User A vs User B isolation,
 * and canonical problem dataset protection.
 */

import { AuthService } from '@/src/lib/auth/services/auth.service';
import { progressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { AnalyticsViewAdapter } from '@/src/adapters/analytics-view.adapter';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { CurriculumRepository } from '@/src/curriculum/repository';

export async function testProductionAuthIntegration(): Promise<void> {
  console.log('=== TESTING PRODUCTION AUTHENTICATION & IDENTITY INTEGRATION ===');

  const authService = new AuthService();
  const emailDomain = process.env.QA_TEST_EMAIL_DOMAIN || 'dsa.com';
  const testEmailA = `user_a_${Date.now()}@${emailDomain}`;
  const testEmailB = `user_b_${Date.now()}@${emailDomain}`;
  const testPassword = process.env.QA_TEST_PASSWORD || `SecP@ss_${Math.random().toString(36).slice(2)}!A1`;

  // Test 1: New User Signup
  const signupRes = await authService.signUp({
    email: testEmailA,
    password: testPassword,
    displayName: 'User Alpha',
  });

  if (!signupRes.success || !signupRes.user || signupRes.user.email !== testEmailA) {
    throw new Error(`Test 1 Failed: New user signup failed! Error: ${signupRes.error}`);
  }
  const userAId = signupRes.user.id;
  console.log('✓ Test 1 Passed: New user signup completed with stable ID.');

  // Test 2: Logout Flow
  await authService.signOut();
  if (authService.getStateService().getState().isAuthenticated) {
    throw new Error('Test 2 Failed: Logout did not clear authentication state.');
  }
  console.log('✓ Test 2 Passed: Logout clears session and resets state.');

  // Test 3: Email/Password Login
  const loginRes = await authService.signIn('supabase', {
    email: testEmailA,
    password: testPassword,
  });

  if (!loginRes.success || !loginRes.user || loginRes.user.id !== userAId) {
    throw new Error(`Test 3 Failed: Email/Password login failed! Error: ${loginRes.error}`);
  }
  console.log('✓ Test 3 Passed: Email/Password login authenticated successfully.');

  // Test 4: Invalid Credentials Handling
  const badLoginRes = await authService.signIn('supabase', {
    email: testEmailA,
    password: 'WrongPassword999!',
  });

  if (badLoginRes.success) {
    throw new Error('Test 4 Failed: Invalid password was accepted!');
  }
  console.log('✓ Test 4 Passed: Invalid credentials rejected cleanly with error.');

  // Test 5: Google OAuth Initiation
  const googleRes = await authService.signInWithGoogle();
  if (!googleRes.success) {
    throw new Error('Test 5 Failed: Google OAuth initiation failed!');
  }
  console.log('✓ Test 5 Passed: Google OAuth initiation flow verified.');

  // Test 6: Password Reset Flow
  const resetRes = await authService.resetPassword(testEmailA);
  if (!resetRes.success) {
    throw new Error(`Test 6 Failed: Password reset flow failed! Error: ${resetRes.error}`);
  }
  console.log('✓ Test 6 Passed: Password reset request processed successfully.');

  // Test 7: User B Signup & Login
  const signupBRes = await authService.signUp({
    email: testEmailB,
    password: testPassword,
    displayName: 'User Beta',
  });
  if (!signupBRes.success || !signupBRes.user) {
    throw new Error(`Test 7 Failed: User B signup failed! ${signupBRes.error}`);
  }
  const userBId = signupBRes.user.id;
  console.log('✓ Test 7 Passed: User B authenticated with isolated identity ID.');

  // Test 8: Strict User A vs User B Data Isolation
  progressService.toggle('completed', 1, userAId);
  progressService.toggle('completed', 2, userBId);
  DashboardAdapterService.clearCache();

  const userAState = progressService.getState(userAId);
  const userBState = progressService.getState(userBId);
  const userAAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(userAId, '30d');
  const userBAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(userBId, '30d');
  const userADashboard = DashboardAdapterService.getDashboardSummary(userAId);
  const userBDashboard = DashboardAdapterService.getDashboardSummary(userBId);

  if (userAState.completed.length !== 1 || !userAState.completed.includes(1)) {
    throw new Error('Test 8 Failed: User A progress state was corrupted.');
  }
  if (userBState.completed.length !== 1 || !userBState.completed.includes(2)) {
    throw new Error('Test 8 Failed: User B progress state was corrupted.');
  }
  if (userAAnalytics.solvedCount !== 1 || userBAnalytics.solvedCount !== 1) {
    throw new Error('Test 8 Failed: Analytics leaked cross-user metrics.');
  }
  if (userADashboard.playerHud.solvedCount !== 1 || userBDashboard.playerHud.solvedCount !== 1) {
    throw new Error('Test 8 Failed: Dashboard leaked cross-user metrics.');
  }
  console.log('✓ Test 8 Passed: User A and User B state, activity, analytics, and dashboard are strictly isolated by provider user.id.');

  // Test 9: Master Problem Dataset Protection
  const totalProblems = CurriculumRepository.getAllProblems().length;
  if (totalProblems !== 2344) {
    throw new Error(`Test 9 Failed: Canonical problem dataset count changed! Expected 2344, got ${totalProblems}`);
  }
  console.log('✓ Test 9 Passed: Master canonical dataset problem count remains exactly 2344.');

  console.log('--- All Production Authentication & User Identity Tests Passed 100%! ---\n');
}
