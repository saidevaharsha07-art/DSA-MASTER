'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';

export interface GuestPreviewBannerProps {
  featureName: string;
  description: string;
  redirectPath: string;
}

export function GuestPreviewBanner({ featureName, description, redirectPath }: GuestPreviewBannerProps) {
  const redirectQuery = `?redirect=${encodeURIComponent(redirectPath)}`;

  return (
    <div className="rounded-xl border border-sky-500/30 bg-sky-950/30 p-4 mb-6 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-200">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 mt-0.5">
          <Eye className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
              {featureName} Preview Mode
            </span>
            <span className="rounded bg-sky-500/15 px-1.5 py-0.2 text-[9px] font-semibold text-sky-300 border border-sky-500/20">
              Public Exploration
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
        <Link
          href={`/login${redirectQuery}`}
          className="rounded-lg border border-slate-700/80 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          href={`/signup${redirectQuery}`}
          className="flex items-center gap-1.5 rounded-lg bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 hover:bg-sky-400 transition"
        >
          <span>Create Free Account</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
