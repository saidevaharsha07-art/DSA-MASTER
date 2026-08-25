'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DevProvider, useDev } from './dev-context';
import { StatusBadge } from './components/StatusBadge';

const navItems = [
  { href: '/dev', label: 'Overview', icon: '📊' },
  { href: '/dev/platforms', label: 'Platforms', icon: '🔌' },
  { href: '/dev/datasets', label: 'Datasets', icon: '📚' },
  { href: '/dev/profile', label: 'Profile Simulator', icon: '👤' },
  { href: '/dev/intelligence', label: 'Intelligence', icon: '🧠' },
  { href: '/dev/adaptive', label: 'Adaptive Practice', icon: '⚡' },
  { href: '/dev/scheduler', label: 'Practice Scheduler', icon: '📅' },
  { href: '/dev/contest', label: 'Contest Intelligence', icon: '🏆' },
  { href: '/dev/ratings', label: 'Ratings & Predictor', icon: '📈' },
  { href: '/dev/memory', label: 'Memory & Forgetting', icon: '🧠' },
  { href: '/dev/oracle', label: 'Oracle AI Engine', icon: '🤖' },
  { href: '/dev/auth', label: 'Auth & Session Inspector', icon: '🔐' },
  { href: '/dev/sync', label: 'Offline & Cloud Sync', icon: '🔄' },
  { href: '/dev/connectors', label: 'Platform Connectors', icon: '🔌' },
  { href: '/dev/achievements', label: 'Achievements Engine', icon: '🏆' },
  { href: '/dev/leaderboards', label: 'Leaderboards & Profiles', icon: '🥇' },
  { href: '/dev/notifications', label: 'Notifications & Reminders', icon: '🔔' },
  { href: '/dev/analytics', label: 'Product Analytics Engine', icon: '📊' },
  { href: '/dev/backups', label: 'Backup & Data Integrity', icon: '💾' },
  { href: '/dev/live', label: 'Real-Time Event Streaming', icon: '⚡' },
  { href: '/dev/runtime', label: 'Runtime Config & Env', icon: '⚙️' },
  { href: '/dev/performance', label: 'Performance & Observability', icon: '📈' },
  { href: '/dev/events', label: 'Event Bus Stream', icon: '📡' },
  { href: '/dev/plugins', label: 'Plugins & Extensions', icon: '🔌' },
  { href: '/dev/recommendations', label: 'Recommendations', icon: '💡' },
  { href: '/dev/dependencies', label: 'Dependencies', icon: '🕸️' },
  { href: '/dev/diagnostics', label: 'Diagnostics & Utilities', icon: '🛠️' },
];

function DevHeader() {
  const { metrics, refreshAll, resetAll } = useDev();

  return (
    <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-bold text-sm text-slate-100 tracking-tight">DEV TOOLS SUITE</span>
          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded uppercase font-mono">Internal Backend Vis</span>
        </div>

        <div className="hidden lg:flex items-center gap-3 border-l border-slate-800 pl-4">
          {metrics.map((m) => (
            <div key={m.name} className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">{m.name}:</span>
              <StatusBadge status={m.status} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={refreshAll}
          className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
        >
          <span>🔄</span> Refresh
        </button>
        <button
          onClick={resetAll}
          className="text-xs bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
        >
          <span>🗑️</span> Reset Mock Data
        </button>
      </div>
    </header>
  );
}

function DevShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      <DevHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 shrink-0 hidden md:block">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
            Inspection Modules
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 max-w-7xl overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <DevProvider>
      <DevShell>{children}</DevShell>
    </DevProvider>
  );
}
