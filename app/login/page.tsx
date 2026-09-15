'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, signIn, signUp, resetPassword, signInWithGoogle, isLoading } = useAuth();

  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
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

  // Parse initial tab from URL query params
  useEffect(() => {
    const qTab = searchParams?.get('tab');
    if (qTab === 'signup') setTab('signup');
    else if (qTab === 'forgot') setTab('forgot');
  }, [searchParams]);

  // Redirect authenticated user directly to Dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirectPath = searchParams?.get('redirect') || '/dashboard';
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

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
          const target = searchParams?.get('redirect') || '/dashboard';
          setFormSuccess('Authentication successful! Directing to application...');
          setTimeout(() => router.replace(target), 500);
        }
      } else if (tab === 'signup') {
        const res = await signUp({ email, password, displayName: fullName });
        if (!res.success) {
          setFormError(res.error || 'Account creation failed. That email address may already be registered.');
        } else if (res.error === 'EMAIL_CONFIRMATION_REQUIRED' || !res.session) {
          setFormSuccess('Account registered successfully! A verification email has been sent to ' + email + '. Please verify your email before logging in.');
        } else {
          const target = searchParams?.get('redirect') || '/dashboard';
          setFormSuccess('Account created successfully! Directing to application...');
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
        const target = searchParams?.get('redirect') || '/dashboard';
        setFormSuccess('Google sign in successful!');
        setTimeout(() => router.replace(target), 500);
      } else {
        setFormError(res.error || 'Google sign-in couldn&apos;t be completed. Please try again.');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setFormError(err?.message || 'Google sign-in couldn&apos;t be completed. Please try again.');
      setIsGoogleLoading(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center pt-8 sm:pt-10 pb-16 font-sans transition-colors duration-200">
      
      {/* Official DSA CRACKER Brand Header */}
      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[var(--accent-border)] shadow-md shadow-[var(--accent-glow)] bg-black flex items-center justify-center mb-2">
          <img
            src="/images/dsa-cracker-logo.jpg"
            alt="DSA CRACKER"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-xl font-black tracking-tight text-[var(--text-primary)]">
          DSA <span style={{ color: 'var(--accent-primary)' }}>CRACKER</span>
        </span>
        <span className="text-[9px] font-extrabold tracking-widest text-[var(--text-muted)] uppercase mt-0.5">
          LEARN • PRACTICE • TRACK • CRACK
        </span>
      </div>

      {/* Top Segmented Navigation Toggle (Sign up / Login) */}
      <div className="w-full flex justify-center px-4 mb-6">
        <div className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <button
            type="button"
            onClick={() => switchTab('signup')}
            style={{
              backgroundColor: tab === 'signup' ? 'var(--accent-primary)' : 'transparent',
              color: tab === 'signup' ? '#FFFFFF' : 'var(--text-muted)',
            }}
            className="px-7 py-2 text-sm font-semibold rounded-full transition-all duration-200"
          >
            Sign up
          </button>

          <button
            type="button"
            onClick={() => switchTab('signin')}
            style={{
              backgroundColor: tab === 'signin' || tab === 'forgot' ? 'var(--accent-primary)' : 'transparent',
              color: tab === 'signin' || tab === 'forgot' ? '#FFFFFF' : 'var(--text-muted)',
            }}
            className="px-7 py-2 text-sm font-semibold rounded-full transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>

      {/* Full-width Top Horizontal Divider */}
      <div className="w-full border-b border-[var(--border)] mb-10 sm:mb-14" />

      {/* Main Centered Form Shell */}
      <div className="w-full max-w-[420px] px-5 sm:px-0 flex flex-col items-center">
        
        {/* Main Heading */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] text-center tracking-tight mb-8">
          {tab === 'signin'
            ? 'Log in to your existing profile'
            : tab === 'signup'
            ? 'Create your new profile'
            : 'Reset your password'}
        </h1>

        {/* Google OAuth Button */}
        {tab !== 'forgot' && (
          <div className="w-full mb-7">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting || isGoogleLoading}
              style={{
                backgroundColor: 'var(--surface-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              className="w-full h-[52px] rounded-xl hover:opacity-90 active:scale-[0.99] font-semibold text-sm flex items-center justify-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <div style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} className="w-4 h-4 border-2 rounded-full animate-spin" />
                  <span>Connecting to Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
          <div className="relative flex items-center justify-center w-full mb-7">
            <div className="border-t border-[var(--border)] w-full" />
            <span className="bg-[var(--background)] px-3 text-[12px] font-medium text-[var(--text-muted)] uppercase tracking-widest flex-shrink-0">
              OR
            </span>
            <div className="border-t border-[var(--border)] w-full" />
          </div>
        )}

        {/* Feedback Messages */}
        {formError && (
          <div className="w-full mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-500 text-xs">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {formSuccess && (
          <div className="w-full mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 text-emerald-500 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>{formSuccess}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          
          {/* Sign Up Mode: Full Name */}
          {tab === 'signup' && (
            <div>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-[52px] bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-glow)] rounded-xl px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
              />
            </div>
          )}

          {/* Username or Email Input */}
          <div>
            <input
              type="text"
              required
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[52px] bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-glow)] rounded-xl px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
            />
          </div>

          {/* Password Input */}
          {tab !== 'forgot' && (
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-glow)] rounded-xl pl-4 pr-12 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ color: 'var(--accent-primary)' }}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-opacity p-1 flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          )}

          {/* Confirm Password Input (Sign Up) */}
          {tab === 'signup' && (
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[52px] bg-[var(--surface-secondary)] border border-[var(--border)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-glow)] rounded-xl pl-4 pr-12 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                style={{ color: 'var(--accent-primary)' }}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 transition-opacity p-1 flex items-center justify-center"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
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
                style={{ accentColor: 'var(--accent-primary)' }}
                className="w-4 h-4 mt-0.5 rounded cursor-pointer"
              />
              <label htmlFor="terms" style={{ color: 'var(--text-secondary)' }} className="text-xs cursor-pointer select-none leading-relaxed">
                I agree to the <span style={{ color: 'var(--accent-primary)' }} className="hover:underline font-medium">Terms and Privacy Policy</span>.
              </label>
            </div>
          )}

          {/* Primary Action Button (LOGIN / REGISTER / RESET) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: 'var(--accent-primary)',
              }}
              className="w-full h-[52px] hover:opacity-95 active:opacity-90 text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[var(--accent-glow)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

        {/* Forgot Password Link (Aligned Left below LOGIN button) */}
        {tab === 'signin' && (
          <div className="w-full text-left mt-3">
            <button
              type="button"
              onClick={() => switchTab('forgot')}
              style={{ color: 'var(--accent-primary)' }}
              className="hover:underline text-sm font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Back to Login Link (Forgot Password Mode) */}
        {tab === 'forgot' && (
          <div className="w-full text-left mt-3">
            <button
              type="button"
              onClick={() => switchTab('signin')}
              style={{ color: 'var(--accent-primary)' }}
              className="hover:underline text-sm font-medium transition-colors"
            >
              Back to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ background: 'var(--background)', color: 'var(--text-primary)' }} className="min-h-screen w-full flex flex-col items-center justify-center">
        <div style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} className="w-10 h-10 border-4 rounded-full animate-spin mb-4" />
        <p style={{ color: 'var(--text-muted)' }} className="text-sm font-medium tracking-wide">Loading DSA CRACKER...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
