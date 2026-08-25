'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService } from '../services/auth.service';
import { AuthState } from '../services/auth-state.service';
import { AuthProviderType } from '../models/user.models';
import { Container } from '@/src/core/container/container';

interface AuthContextType extends AuthState {
  signIn: (providerType: AuthProviderType) => Promise<void>;
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

  useEffect(() => {
    const unsub = authService.getStateService().subscribe((nextState) => {
      setState(nextState);
    });
    authService.restoreSession();
    return unsub;
  }, [authService]);

  const signIn = async (providerType: AuthProviderType) => {
    await authService.signIn(providerType);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  const linkAccount = async (providerType: AuthProviderType) => {
    await authService.linkAccount(providerType);
  };

  const unlinkAccount = async (providerType: AuthProviderType) => {
    await authService.unlinkAccount(providerType);
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, linkAccount, unlinkAccount }}>
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
