'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AppBackendProvider, useAppBackend } from '@/src/components/providers/AppBackendProvider';
import { AuthProvider } from '@/src/lib/auth/context/AuthContext';

function ProductionNavigationHeader() {
  const pathname = usePathname();
  const { snapshot, activeStrategyName, isLoading } = useAppBackend();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '⚡' },
    { href: '/journey', label: 'Journey', icon: '🗺️' },
    { href: '/kingdoms', label: 'Kingdoms', icon: '🏰' },
    { href: '/patterns', label: 'Patterns', icon: '🧬' },
    { href: '/practice/codechef', label: 'CodeChef Arena', icon: '🧪' },
    { href: '/practice', label: 'Practice', icon: '🎯' },
    { href: '/arena', label: 'Problem Arena', icon: '⚔️' },
    { href: '/revision', label: 'Revision Center', icon: '🧠' },
    { href: '/contest', label: 'Contest Intelligence', icon: '🏆' },
    { href: '/statistics', label: 'Statistics', icon: '📊' },
    { href: '/oracle', label: 'Oracle AI', icon: '🤖' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2.5 text-lg font-extrabold tracking-wider bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              <div className="w-7 h-7 rounded-md bg-black border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/brand/dsa-magna-logo.png"
                  alt="DSA Magna"
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain', width: '24px', height: '24px' }}
                />
              </div>
              <span>DSA Magna</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = Boolean(pathname && (pathname === item.href || pathname.startsWith(`${item.href}/`)));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {isLoading ? (
              <span className="text-amber-400 animate-pulse">Syncing Engine...</span>
            ) : snapshot ? (
              <>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-slate-300">
                  🔥 Streak: <strong className="text-amber-400">{snapshot.streak}d</strong>
                </span>
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-slate-300">
                  ⭐ Score: <strong className="text-emerald-400">{snapshot.overallLearningScore.overallScore}/100</strong>
                </span>
                <span className="bg-indigo-950 border border-indigo-800 px-2 py-1 rounded text-indigo-300 hidden lg:inline">
                  Strategy: {activeStrategyName}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ProductionAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppBackendProvider>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          <ProductionNavigationHeader />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </AppBackendProvider>
    </AuthProvider>
  );
}
