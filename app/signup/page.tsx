import React, { Suspense } from 'react';
import { AuthForm } from '@/src/lib/auth/components/AuthForm';

export const metadata = {
  title: 'Sign Up — DSA MASTER',
  description: 'Create your free DSA MASTER account to start mastering algorithms, tracking progress, and building your mindset.',
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase">Loading DSA MASTER...</p>
        </div>
      }
    >
      <AuthForm initialMode="signup" />
    </Suspense>
  );
}
