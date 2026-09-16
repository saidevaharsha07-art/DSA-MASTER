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
        <div style={{ background: 'var(--background)', color: 'var(--text-primary)' }} className="min-h-screen w-full flex flex-col items-center justify-center">
          <div style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} className="w-10 h-10 border-4 rounded-full animate-spin mb-4" />
          <p style={{ color: 'var(--text-muted)' }} className="text-sm font-medium tracking-wide">Loading DSA MASTER...</p>
        </div>
      }
    >
      <AuthForm initialMode="signin" />
    </Suspense>
  );
}
