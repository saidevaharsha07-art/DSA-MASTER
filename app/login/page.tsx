import React, { Suspense } from 'react';
import { AuthForm } from '@/src/lib/auth/components/AuthForm';

export const metadata = {
  title: 'Login — DSA MASTER',
  description: 'Log in to your DSA MASTER account to track your progress and continue learning.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[var(--background)] text-[var(--text-primary)] flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase">Loading DSA MASTER...</p>
        </div>
      }
    >
      <AuthForm initialMode="signin" />
    </Suspense>
  );
}
