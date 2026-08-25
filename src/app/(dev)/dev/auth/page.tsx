'use client';

import React, { useState, useEffect } from 'react';
import { AuthService } from '@/src/lib/auth/services/auth.service';
import { AuthState } from '@/src/lib/auth/services/auth-state.service';
import { AuthProviderType } from '@/src/lib/auth/models/user.models';
import { Container } from '@/src/core/container/container';
import { JSONViewer } from '../components/JSONViewer';

export default function DevAuthPage() {
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

  const handleSignIn = async (provider: AuthProviderType) => {
    await authService.signIn(provider);
  };

  const handleSignOut = async () => {
    await authService.signOut();
  };

  const handleLink = async (provider: AuthProviderType) => {
    await authService.linkAccount(provider);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔐</span> Auth Framework & Session Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect active provider, current user identity, session tokens, account links, roles, and permission evaluation.
        </p>
      </div>

      {/* Quick Action Controls */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Mock Sign-In Controls (No Real OAuth Triggered)</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={() => handleSignIn('guest')} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Sign In as Guest
          </button>
          <button onClick={() => handleSignIn('google')} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">
            Sign In with Google (Mock)
          </button>
          <button onClick={() => handleSignIn('github')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium border border-slate-700">
            Sign In with GitHub (Mock)
          </button>
          <button onClick={() => handleSignIn('email')} className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium">
            Sign In with Email (Mock)
          </button>
          {state.isAuthenticated && (
            <button onClick={handleSignOut} className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium">
              Sign Out
            </button>
          )}
        </div>

        {state.isAuthenticated && (
          <div className="pt-2 border-t border-slate-800 flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">Link Account:</span>
            <button onClick={() => handleLink('github')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700">
              + Link GitHub
            </button>
            <button onClick={() => handleLink('google')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700">
              + Link Google
            </button>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Status</span>
          <strong className={`text-xl font-bold ${state.isAuthenticated ? 'text-emerald-400' : 'text-rose-400'}`}>
            {state.isAuthenticated ? 'AUTHENTICATED' : 'ANONYMOUS'}
          </strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Active Provider</span>
          <strong className="text-xl font-bold text-indigo-400">{state.activeProviderName}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">User Name</span>
          <strong className="text-xl font-bold text-amber-400">{state.user?.displayName || 'N/A'}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Account Links</span>
          <strong className="text-xl font-bold text-emerald-400">{state.user?.linkedAccounts.length || 0}</strong>
        </div>
      </div>

      <JSONViewer data={state} title="Raw AuthState & Token Inspector" defaultExpanded={true} />
    </div>
  );
}
