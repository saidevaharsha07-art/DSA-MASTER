/**
 * React Hook: Active Authenticated / Guest User Identity Bridge (Phase 12 Requirement 2)
 * Ensures UI components consume the active authenticated session user ID
 * rather than hardcoding 'default_user' string literals.
 */

import { useState, useEffect } from 'react';
import { AuthService } from '@/src/lib/auth/services/auth.service';
import { EventBus } from '@/src/core/events/event-bus';

let authServiceInstance: AuthService | null = null;
function getAuthService(): AuthService {
  if (!authServiceInstance) {
    authServiceInstance = new AuthService();
  }
  return authServiceInstance;
}

export function getActiveUserId(): string {
  if (typeof window === 'undefined') return 'default_user';
  const authService = getAuthService();
  const state = authService.getStateService().getState();
  if (state.isAuthenticated && state.user?.id) {
    return state.user.id;
  }
  return 'default_user';
}

export function useActiveUser(): { userId: string; isAuthenticated: boolean; username: string } {
  const [userId, setUserId] = useState<string>('default_user');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('Guest');

  useEffect(() => {
    const authService = getAuthService();
    
    const updateState = () => {
      const state = authService.getStateService().getState();
      if (state.isAuthenticated && state.user?.id) {
        setUserId(state.user.id);
        setIsAuthenticated(true);
        setUsername(state.user.displayName || state.user.username || 'User');
      } else {
        setUserId('default_user');
        setIsAuthenticated(false);
        setUsername('Guest');
      }
    };

    updateState();

    const unsubSignIn = EventBus.subscribe('UserSignedIn', updateState);
    const unsubSignOut = EventBus.subscribe('UserSignedOut', updateState);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', updateState);

    return () => {
      unsubSignIn();
      unsubSignOut();
      unsubProfile();
    };
  }, []);

  return { userId, isAuthenticated, username };
}
