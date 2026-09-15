'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../services/auth-state.service';
import { AuthProviderType, AuthUser } from '../models/user.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { AuthSession } from '../models/session.models';
import { SignUpCredentials } from '../providers/supabase.provider';
import { Container } from '@/src/core/container/container';
import { getSupabaseClient } from '@/src/lib/supabase/client';

export interface AuthContextType extends AuthState {
  readonly isLoading: boolean;
  signIn: (providerType?: AuthProviderType, credentials?: SignInCredentials) => Promise<AuthResult>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult & { url?: string }>;
  handleOAuthCallback: (params: {
    code?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  signOut: () => Promise<void>;
  linkAccount: (providerType: AuthProviderType) => Promise<void>;
  unlinkAccount: (providerType: AuthProviderType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authService] = useState<AuthService>(() => {
    if (!Container.has('AuthService')) {
      Container.registerSingleton('AuthService', new AuthService());
    }
    return Container.resolve<AuthService>('AuthService');
  });

  const [state, setState] = useState<AuthState>(() => authService.getStateService().getState());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const unsubState = authService.getStateService().subscribe((nextState) => {
      if (isMounted) {
        setState(nextState);
      }
    });

    // 1. Restore existing session on mount
    authService.restoreSession().finally(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    // 2. Real-time Supabase Auth state listener
    const client = getSupabaseClient();
    let authListenerSubscription: { unsubscribe: () => void } | null = null;

    if (client) {
      const { data } = client.auth.onAuthStateChange(async (event, sbSession) => {
        if (!isMounted) return;

        if (
          (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') &&
          sbSession?.user
        ) {
          const authUser: AuthUser = {
            id: sbSession.user.id,
            username: sbSession.user.email ? sbSession.user.email.split('@')[0] : `user_${sbSession.user.id.substring(0, 8)}`,
            email: sbSession.user.email || '',
            displayName:
              sbSession.user.user_metadata?.display_name ||
              sbSession.user.user_metadata?.full_name ||
              sbSession.user.user_metadata?.name ||
              (sbSession.user.email ? sbSession.user.email.split('@')[0] : 'User'),
            avatarUrl:
              sbSession.user.user_metadata?.avatar_url ||
              sbSession.user.user_metadata?.picture ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${sbSession.user.id}`,
            isGuest: false,
            roles: ['user'],
            linkedAccounts: [
              {
                provider: 'supabase',
                providerUserId: sbSession.user.id,
                email: sbSession.user.email,
                linkedAt: new Date().toISOString(),
              },
            ],
            createdAt: sbSession.user.created_at || new Date().toISOString(),
          };

          const session: AuthSession = {
            sessionId: `sess_${sbSession.access_token.substring(0, 16)}`,
            user: authUser,
            provider: 'supabase',
            accessToken: sbSession.access_token,
            refreshToken: sbSession.refresh_token,
            expiresAt: sbSession.expires_at ? sbSession.expires_at * 1000 : Date.now() + 3600 * 1000,
            rememberMe: true,
            createdAt: new Date().toISOString(),
          };

          authService.syncAuthenticatedSession(session);
        } else if (event === 'SIGNED_OUT') {
          authService.getStateService().setState({
            isAuthenticated: false,
            user: null,
            session: null,
            activeProviderName: 'none',
          });
        }
      });

      authListenerSubscription = data.subscription;
    }

    return () => {
      isMounted = false;
      unsubState();
      authListenerSubscription?.unsubscribe();
    };
  }, [authService]);

  const signIn = async (providerType: AuthProviderType = 'supabase', credentials?: SignInCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      return await authService.signIn(providerType, credentials);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      return await authService.signUp(credentials);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<AuthResult & { url?: string }> => {
    setIsLoading(true);
    try {
      return await authService.signInWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthCallback = async (params: {
    code?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    error?: string;
  }): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      return await authService.handleOAuthCallback(params);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    return await authService.resetPassword(email);
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  const linkAccount = async (providerType: AuthProviderType) => {
    await authService.linkAccount(providerType);
  };

  const unlinkAccount = async (providerType: AuthProviderType) => {
    await authService.unlinkAccount(providerType);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isLoading,
        signIn,
        signUp,
        signInWithGoogle,
        handleOAuthCallback,
        resetPassword,
        signOut,
        linkAccount,
        unlinkAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}
