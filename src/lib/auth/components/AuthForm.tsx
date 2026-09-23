'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

import { OnboardingService } from '@/src/intelligence/onboarding';

export function getSafeRedirect(url: string | null | undefined): string {
  if (!url) return '/dashboard';
  const trimmed = url.trim();
  // Ensure it's a relative path starting with / and not // or containing ://
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.includes('://')) {
    return trimmed;
  }
  return '/dashboard';
}

export async function resolveUserDestination(userId?: string, rawTarget?: string | null, isSignUp = false): Promise<string> {
  if (rawTarget) {
    return getSafeRedirect(rawTarget);
  }
  if (!userId) {
    return isSignUp ? '/onboarding' : '/dashboard';
  }
  const obProfile = await OnboardingService.loadProfileAsync(userId);
  if (obProfile.status === 'ONBOARDING_NOT_STARTED' || (isSignUp && obProfile.status === 'ONBOARDING_IN_PROGRESS')) {
    return '/onboarding';
  }
  return '/dashboard';
}

export interface AuthFormProps {
  initialMode?: 'signin' | 'signup' | 'forgot';
}

export function AuthForm({ initialMode = 'signin' }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, user, signIn, signUp, resetPassword, signInWithGoogle, isLoading } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>(() => {
    const qTab = searchParams?.get('tab');
    if (qTab === 'signup') return 'signup';
    if (qTab === 'forgot') return 'forgot';
    if (qTab === 'signin') return 'signin';
    return initialMode;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Extract destination redirect target
  const rawTarget = searchParams?.get('redirect') || searchParams?.get('returnUrl');

  // Sync tab with URL if param changes
  useEffect(() => {
    const qTab = searchParams?.get('tab');
    if (qTab === 'signup') setTab('signup');
    else if (qTab === 'forgot') setTab('forgot');
    else if (qTab === 'signin') setTab('signin');
  }, [searchParams]);

  // Redirect authenticated user directly to destination
  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.id) {
      let isSubscribed = true;
      resolveUserDestination(user.id, rawTarget, false).then((dest) => {
        if (isSubscribed) {
          router.replace(dest);
        }
      });
      return () => {
        isSubscribed = false;
      };
    }
  }, [isAuthenticated, isLoading, user?.id, router, rawTarget]);

  const switchTab = (newTab: 'signin' | 'signup' | 'forgot') => {
    setTab(newTab);
    setFormError(null);
    setFormSuccess(null);
  };

  const validate = (): boolean => {
    setFormError(null);
    setFormSuccess(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || (!cleanEmail.includes('@') && cleanEmail.length < 3)) {
      setFormError('Please enter a valid username or email address.');
      return false;
    }

    if (tab !== 'forgot') {
      if (!password || password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return false;
      }
    }

    if (tab === 'signup') {
      if (!fullName || fullName.trim().length < 2) {
        setFormError('Please enter your full name.');
        return false;
      }
      if (password !== confirmPassword) {
        setFormError('Passwords do not match. Please verify your password.');
        return false;
      }
      if (!agreeTerms) {
        setFormError('Please agree to the Terms and Privacy Policy to continue.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      if (tab === 'signin') {
        const res = await signIn('supabase', { email, password, rememberMe: true });
        if (!res.success) {
          setFormError(res.error || 'Username/email or password is incorrect. Please try again.');
        } else {
          setFormSuccess('Authentication successful! Directing to application...');
          const target = await resolveUserDestination(res.user?.id, rawTarget, false);
          setTimeout(() => router.replace(target), 500);
        }
      } else if (tab === 'signup') {
        const res = await signUp({ email, password, displayName: fullName });
        if (!res.success) {
          setFormError(res.error || 'Account creation failed. That email address may already be registered.');
        } else if (res.error === 'EMAIL_CONFIRMATION_REQUIRED' || !res.session) {
          setFormSuccess('Account registered successfully! A verification email has been sent to ' + email + '. Please verify your email before logging in.');
        } else {
          setFormSuccess('Account created successfully! Directing to your personalized setup...');
          const target = await resolveUserDestination(res.user?.id, rawTarget, true);
          setTimeout(() => router.replace(target), 500);
        }
      } else if (tab === 'forgot') {
        const res = await resetPassword(email);
        if (!res.success) {
          setFormError(res.error || 'Unable to send password reset link. Please check your email address.');
        } else {
          setFormSuccess(res.message || 'Password reset link has been dispatched to your email address.');
        }
      }
    } catch (err: any) {
      setFormError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setIsGoogleLoading(true);
    setFormError(null);
    try {
      const res = await signInWithGoogle();
      if (res.url) {
        window.location.href = res.url;
      } else if (res.success) {
        setFormSuccess('Google sign in successful!');
        const target = await resolveUserDestination(user?.id, rawTarget, false);
        setTimeout(() => router.replace(target), 500);
      } else {
        setFormError(res.error || 'Google sign-in could not be completed. Please try again.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setFormError(err?.message || 'Google sign-in could not be completed. Please try again.');
      setIsGoogleLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center justify-center px-4 py-10 sm:py-16 font-sans transition-colors duration-200">
      
      {/* Brand Header */}
      <div className="mb-6 sm:mb-8 flex flex-col items-center">
        <Link href="/" className="flex flex-col items-center group">
          <div className="w-12 h-12 rounded-xl p-[2px] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 shadow-md shadow-sky-500/20 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-[var(--surface)] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M12 2L2 22H22L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--accent-primary)]"
                />
                <path
                  d="M12 9L7 19H17L12 9Z"
                  fill="currentColor"
                  className="text-[var(--accent-primary)] opacity-80"
                />
              </svg>
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
            DSA <span className="text-[var(--accent-primary)]">MASTER</span>
          </span>
        </Link>
        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] text-[10px] font-mono font-semibold tracking-wider text-[var(--text-muted)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Technical Interview & Algorithmic Workspace
        </div>
      </div>

      {/* Main Centered Form Card Shell */}
      <div className="w-full max-w-[440px] bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5 flex flex-col items-center transition-colors">
        
        {/* Top Segmented Navigation Toggle (Sign up / Login) */}
        <div className="w-full flex justify-center mb-6" role="tablist" aria-label="Authentication modes">
          <div className="inline-flex items-center p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] w-full">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'signup'}
              onClick={() => switchTab('signup')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer text-center ${
                tab === 'signup'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Sign up
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={tab === 'signin' || tab === 'forgot'}
              onClick={() => switchTab('signin')}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer text-center ${
                tab === 'signin' || tab === 'forgot'
                  ? 'bg-[var(--accent-primary)] text-white shadow-sm font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Main Heading */}
        <div className="w-full text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {tab === 'signin'
              ? 'Log in to your existing profile'
              : tab === 'signup'
              ? 'Create your new profile'
              : 'Reset your password'}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5">
            {tab === 'signin'
              ? 'Enter your credentials to continue your algorithmic practice.'
              : tab === 'signup'
              ? 'Get an adaptive roadmap, curated pattern sprints, and tracked mastery.'
              : 'Enter your account email to receive recovery instructions.'}
          </p>
        </div>

        {/* Google OAuth Button */}
        {tab !== 'forgot' && (
          <div className="w-full mb-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting || isGoogleLoading}
              className="w-full h-12 bg-[var(--surface-secondary)] hover:bg-[var(--surface-hover,var(--surface))] active:scale-[0.99] border border-[var(--border)] text-[var(--text-primary)] font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              {isGoogleLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.05.0 12s.46 3.8 1.27 5.42l4.01-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24.0 12 .0 7.31.0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* OR Divider */}
        {tab !== 'forgot' && (
          <div className="relative flex items-center justify-center w-full mb-5">
            <div className="border-t border-[var(--border)] w-full" />
            <span className="bg-[var(--surface)] px-3 text-[11px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-widest flex-shrink-0">
              OR
            </span>
            <div className="border-t border-[var(--border)] w-full" />
          </div>
        )}

        {/* Feedback Messages */}
        {formError && (
          <div className="w-full mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-500 text-xs animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="w-full mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-2.5 text-emerald-500 text-xs animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span className="leading-relaxed">{formSuccess}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* Sign Up Mode: Full Name */}
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 sm:h-12 bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] rounded-xl px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
              />
            </div>
          )}

          {/* Username or Email Input */}
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              Username or Email
            </label>
            <input
              type="text"
              required
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 sm:h-12 bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] rounded-xl px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
            />
          </div>

          {/* Password Input */}
          {tab !== 'forgot' && (
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 sm:h-12 bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] rounded-xl pl-4 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 flex items-center justify-center cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Input (Sign Up) */}
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 sm:h-12 bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] rounded-xl pl-4 pr-11 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 flex items-center justify-center cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Terms Checkbox (Sign Up) */}
          {tab === 'signup' && (
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[var(--border)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[var(--text-secondary)] cursor-pointer select-none leading-relaxed">
                I agree to the <span className="text-[var(--accent-primary)] hover:underline font-medium">Terms and Privacy Policy</span>.
              </label>
            </div>
          )}

          {/* Primary Action Button (LOGIN / REGISTER / RESET) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 sm:h-12 bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[var(--accent-glow)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{tab === 'signin' ? 'LOGGING IN...' : tab === 'signup' ? 'REGISTERING...' : 'SENDING...'}</span>
                </>
              ) : (
                <span>
                  {tab === 'signin' ? 'LOGIN' : tab === 'signup' ? 'REGISTER' : 'SEND RESET LINK'}
                </span>
              )}
            </button>
          </div>

        </form>

        {/* Links below Form */}
        <div className="w-full flex items-center justify-between mt-5 pt-4 border-t border-[var(--border)] text-xs font-medium">
          {tab === 'signin' && (
            <>
              <button
                type="button"
                onClick={() => switchTab('forgot')}
                className="text-[var(--accent-primary)] hover:underline transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => switchTab('signup')}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Don&apos;t have an account? <span className="text-[var(--accent-primary)] font-semibold">Sign up</span>
              </button>
            </>
          )}

          {tab === 'signup' && (
            <div className="w-full text-center">
              <button
                type="button"
                onClick={() => switchTab('signin')}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Already have an account? <span className="text-[var(--accent-primary)] font-semibold">Login</span>
              </button>
            </div>
          )}

          {tab === 'forgot' && (
            <div className="w-full text-center">
              <button
                type="button"
                onClick={() => switchTab('signin')}
                className="text-[var(--accent-primary)] hover:underline font-semibold transition-colors cursor-pointer"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Trust & Privacy Micro-Footer */}
      <div className="mt-8 flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
        <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Encrypted session • Secure Supabase persistence • 100% privacy</span>
      </div>

    </div>
  );
}
