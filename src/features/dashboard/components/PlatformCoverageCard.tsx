'use client';

import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface PlatformCoverageCardProps {
  platformMix: DashboardSummary['platformMix'];
}

export function PlatformCoverageCard({ platformMix }: PlatformCoverageCardProps) {
  if (!platformMix) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(56,189,248,0.12)] text-[#38BDF8] flex items-center justify-center shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              4,000 Canonical Problems
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] m-0 leading-tight">
              Platform Coverage Mix
            </h3>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          1,000 Per Platform
        </span>
      </div>

      <div
        data-testid="platform-mix-grid"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
      >
        {platformMix.map((p) => (
          <Link
            key={p.platformKey}
            href={p.practiceUrl}
            data-testid={`platform-card-${p.platformKey}`}
            className="no-underline group"
          >
            <div className="flex flex-col gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all duration-200 cursor-pointer shadow-sm group-hover:shadow">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: p.color }}
                  className="text-xs font-bold font-mono tracking-tight"
                >
                  {p.name}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] font-medium">
                  {p.percentage}%
                </span>
              </div>

              <div className="text-sm font-mono font-bold text-[var(--text-primary)]">
                {p.solved}{' '}
                <span className="text-xs text-[var(--text-secondary)] font-normal">
                  / 1000
                </span>
              </div>

              <div className="w-full h-1 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${p.percentage}%`, backgroundColor: p.color }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
