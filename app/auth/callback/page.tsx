'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { getSafeRedirect } from '@/src/lib/auth/components/AuthForm';
import { Shield, Sparkles, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleOAuthCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    async function processCallback() {
      try {
        let code: string | undefined;
        let accessToken: string | undefined;
        let refreshToken: string | undefined;
        let expiresIn: number | undefined;
        let errorMsg: string | undefined;

        if (searchParams) {
          code = searchParams.get('code') || undefined;
          errorMsg = searchParams.get('error_description') || searchParams.get('error') || undefined;
          accessToken = searchParams.get('access_token') || undefined;
          refreshToken = searchParams.get('refresh_token') || undefined;
        }

        if (typeof window !== 'undefined' && window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          if (hashParams.get('code')) code = hashParams.get('code')!;
          if (hashParams.get('access_token')) accessToken = hashParams.get('access_token')!;
          if (hashParams.get('refresh_token')) refreshToken = hashParams.get('refresh_token')!;
          if (hashParams.get('expires_in')) expiresIn = parseInt(hashParams.get('expires_in')!, 10);
          if (hashParams.get('error_description')) errorMsg = hashParams.get('error_description')!;
          else if (hashParams.get('error')) errorMsg = hashParams.get('error')!;
        }

        if (errorMsg) {
          setError(errorMsg);
          return;
        }

        if (!code && !accessToken) {
          setError('No authentication code or access token found in callback URL. Please sign in again.');
          return;
        }

        const res = await handleOAuthCallback({ code, accessToken, refreshToken, expiresIn });
        if (res.success) {
          setIsDone(true);
          const rawTarget = searchParams?.get('next') || searchParams?.get('redirect');
          const next = getSafeRedirect(rawTarget);
          setTimeout(() => {
            router.replace(next);
          }, 300);
        } else {
          setError(res.error || 'Authentication could not be completed. Please try again.');
        }
      } catch (err: any) {
        setError(err?.message || 'Authentication could not be completed. Please try again.');
      }
    }

    processCallback();
  }, [router, searchParams, handleOAuthCallback]);

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex items-center justify-center p-4 sm:p-6 font-sans transition-colors duration-200">
      {/* Centered Transition Card */}
      <div className="relative w-full max-w-[440px] bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/5 z-10 text-center transition-all duration-300">
        
        {/* Branding header */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-[2px] mb-4 shadow-lg shadow-sky-500/20">
          <div className="w-full h-full bg-[var(--surface)] rounded-[14px] flex items-center justify-center">
            <Shield className="w-7 h-7 text-[var(--accent-primary)]" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-center justify-center gap-2 mb-6">
          DSA <span className="text-[var(--accent-primary)]">MASTER</span>
        </h1>

        {error ? (
          /* Error State */
          <div className="space-y-4">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex flex-col items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <p className="font-semibold text-sm">Sign-in could not be completed.</p>
              <p className="text-center opacity-90">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => router.replace('/login')}
              className="w-full h-11 sm:h-12 bg-[var(--surface-secondary)] hover:bg-[var(--surface)] text-[var(--text-primary)] font-semibold text-sm rounded-xl transition-all border border-[var(--border)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>
        ) : isDone ? (
          /* Success State */
          <div className="space-y-3 py-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mb-1 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Sign in complete!</h2>
            <p className="text-xs text-[var(--text-muted)]">Directing to dashboard...</p>
          </div>
        ) : (
          /* Loading Transition State */
          <div className="space-y-5 py-2">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-[var(--accent-primary)]/20 border-t-[var(--accent-primary)] rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-[var(--accent-primary)] absolute" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">Authenticating</h2>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Verifying secure session with Supabase...
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]/70 animate-pulse delay-150" />
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]/40 animate-pulse delay-300" />
            </div>

            <p className="text-[11px] text-[var(--text-muted)] font-mono pt-1">
              Please wait a moment.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-[#0B0E14] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-xl bg-black border border-slate-700 flex items-center justify-center overflow-hidden mb-4 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/dsa-magna-logo.png"
            alt="DSA Magna"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-400 font-mono tracking-wider uppercase animate-pulse">Connecting to DSA Magna...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
