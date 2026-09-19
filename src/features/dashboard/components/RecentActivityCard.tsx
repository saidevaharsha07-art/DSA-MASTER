'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface RecentActivityCardProps {
  progressMomentum: DashboardSummary['progressMomentum'];
}

export function RecentActivityCard({ progressMomentum }: RecentActivityCardProps) {
  const activities = progressMomentum?.recentActivity || [];

  return (
    <div
      data-testid="progress-momentum-card"
      className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(16,185,129,0.12)] text-[#10B981] flex items-center justify-center shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Telemetry Stream
            </span>
            <h3 className="text-xs font-bold text-[var(--text-primary)] m-0 leading-tight">
              Recent Progress & Telemetry Momentum
            </h3>
          </div>
        </div>

        <span className="text-[10px] font-mono text-[var(--text-muted)]">
          Real telemetry
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="p-3 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-subtle)]">
          No recent activity recorded yet. Start solving problems to populate telemetry!
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {activities.slice(0, 4).map((act, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 p-2 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span className="text-[var(--text-primary)] font-medium truncate">
                  {act.description || act.title || 'Problem Solved'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                {act.relativeTime || act.timeAgo || 'Just now'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
