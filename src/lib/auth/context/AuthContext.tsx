'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../services/auth-state.service';
import { AuthProviderType } from '../models/user.models';
import { AuthResult, SignInCredentials } from '../models/auth.models';
import { SignUpCredentials } from '../providers/supabase.provider';
import { Container } from '@/src/core/container/container';

export interface AuthContextType extends AuthState {
  readonly isLoading: boolean;
  signIn: (providerType?: AuthProviderType, credentials?: SignInCredentials) => Promise<AuthResult>;
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult & { url?: string }>;
  handleOAuthCallback: (params: { code?: string; accessToken?: string; refreshToken?: string; expiresIn?: number; mockUserId?: string; error?: string }) => Promise<AuthResult>;
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
    const unsub = authService.getStateService().subscribe((nextState) => {
      setState(nextState);
    });

    let isMounted = true;
    authService.restoreSession().finally(() => {
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
      unsub();
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

  const handleOAuthCallback = async (params: { code?: string; accessToken?: string; refreshToken?: string; expiresIn?: number; mockUserId?: string; error?: string }): Promise<AuthResult> => {
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
