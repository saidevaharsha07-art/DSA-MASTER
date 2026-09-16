'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Deep night sky / mountain landscape SVG background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#070A0F] via-[#0A1124] to-[#04060A]">
        {/* Starfield dots */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full" />

        {/* Mountain Silhouette Silhouette at the bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-48 sm:h-64 object-cover text-[#030508] opacity-80"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* Back mountain layer */}
          <path
            fill="#060C1B"
            fillOpacity="0.7"
            d="M0,192L60,176C120,160,240,128,360,144C480,160,600,224,720,208C840,192,960,96,1080,96C1200,96,1320,192,1380,240L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          {/* Front mountain ridge */}
          <path
            fill="#030508"
            d="M0,224L80,240C160,256,320,288,480,272C640,256,800,192,960,181.3C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Mountain Climber Silhouette on the left ridge */}
        <div className="absolute bottom-12 left-10 sm:left-24 lg:left-40 hidden sm:block opacity-60">
          <svg width="48" height="64" viewBox="0 0 24 32" fill="none" className="text-slate-400">
            {/* Climber with walking stick / backpack */}
            <circle cx="12" cy="6" r="3" fill="currentColor" />
            <path d="M9 9L15 9L16 18L13 18L12 28L10 28L10 18L8 18L9 9Z" fill="currentColor" />
            <path d="M6 11L9 14L8 20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 11L18 19L19 28" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Your DSA journey starts with one problem.
        </h2>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-300">
          Build consistency. Understand patterns. Solve with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/practice"
            className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
          >
            Explore Practice
          </Link>
        </div>

        {/* Stylized Quote on the right */}
        <div className="pt-8 sm:pt-12 text-right max-w-xs ml-auto pr-4 sm:pr-8">
          <p className="font-sans italic text-slate-400 text-xs sm:text-sm tracking-wide -rotate-2">
            &ldquo;Better Problem Solvers <br />
            <span className="text-slate-200 font-semibold">Build Better Futures.&rdquo;</span>
          </p>
        </div>

      </div>
    </section>
  );
}
