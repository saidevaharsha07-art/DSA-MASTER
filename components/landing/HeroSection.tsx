'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { LandingDashboardPreview } from './previews/LandingDashboardPreview';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-500/15 via-blue-600/10 to-transparent blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-600/10 blur-[140px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400 shadow-sm shadow-sky-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>LEARN • PRACTICE • TRACK • CRACK</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Master DSA. <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Build the Mindset.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Learn patterns, solve problems, track your progress, and turn consistent practice into real problem-solving ability.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#problem"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all cursor-pointer"
              >
                Explore the Platform
              </a>
            </div>

            {/* Subtle Login Link */}
            <div className="pt-1">
              <Link
                href="/login"
                className="text-xs text-slate-400 hover:text-sky-400 transition-colors inline-flex items-center gap-1"
              >
                <span>Already have an account?</span>
                <span className="text-sky-400 font-semibold underline underline-offset-2">Log in</span>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 max-w-lg">
              <div className="flex items-center gap-2 rounded-lg bg-slate-900/40 p-2 border border-slate-800/60">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-500/10 text-sky-400">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs font-semibold text-slate-300 leading-tight">Structured Learning</div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-900/40 p-2 border border-slate-800/60">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-400">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs font-semibold text-slate-300 leading-tight">Hands-on Practice</div>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-900/40 p-2 border border-slate-800/60">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                  <BarChart3 className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs font-semibold text-slate-300 leading-tight">Measurable Progress</div>
              </div>
            </div>

            {/* Emotional Companion Note */}
            <p className="text-xs italic text-slate-400 tracking-wide pt-1">
              &ldquo;You don&apos;t have to figure it all out alone.&rdquo;
            </p>

          </div>

          {/* Right Hero Laptop IDE Showcase */}
          <div className="lg:col-span-6 relative">
            <LandingDashboardPreview />
            {/* Laptop Base Stand / Shadow effect */}
            <div className="mx-auto h-3 w-4/5 rounded-b-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-xl" />
          </div>

        </div>
      </div>
    </section>
  );
}
