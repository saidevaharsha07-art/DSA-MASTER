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
    <div className="min-h-screen w-full bg-[#0B0E14] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Ambient background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Glowing background spots */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Glass transition card */}
      <div className="relative w-full max-w-[440px] bg-[#121620]/90 backdrop-blur-2xl border border-slate-800/90 rounded-2xl sm:rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80 z-10 text-center transition-all duration-300">
        
        {/* Branding header */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 mb-4 shadow-lg shadow-indigo-500/25">
          <div className="w-full h-full bg-[#0B0E14] rounded-[14px] flex items-center justify-center">
            <Shield className="w-7 h-7 text-indigo-400" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2 mb-6">
          DSA <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">MASTER</span>
        </h1>

        {error ? (
          /* Error State */
          <div className="space-y-4">
            <div className="p-4 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 text-xs flex flex-col items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <p className="font-semibold text-sm text-red-200">Sign-in could not be completed.</p>
              <p className="text-center text-red-300/90">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => router.replace('/login')}
              className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>
        ) : isDone ? (
          /* Success State */
          <div className="space-y-3 py-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-1 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Sign in complete!</h2>
            <p className="text-xs text-slate-400">Directing to dashboard...</p>
          </div>
        ) : (
          /* Loading Transition State */
          <div className="space-y-5 py-2">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <Sparkles className="w-6 h-6 text-indigo-400 absolute" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white mb-1">Authenticating</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verifying secure session with Supabase...
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150" />
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-300" />
            </div>

            <p className="text-[11px] text-slate-500 font-mono pt-1">
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
      <div className="min-h-screen w-full bg-[#0B0E14] text-slate-100 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-slate-400 font-mono tracking-wider uppercase animate-pulse">Connecting to DSA MASTER...</p>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
