'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Zap, BarChart3, ArrowRight, Compass } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LandingDashboardPreview } from './previews/LandingDashboardPreview';

export function HeroSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] blur-[130px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/10' : 'bg-sky-500/15'
      }`} />
      <div className={`pointer-events-none absolute top-1/3 -right-40 w-[400px] h-[400px] blur-[140px] rounded-full transition-opacity ${
        isLight ? 'bg-indigo-300/10' : 'bg-purple-600/10'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Pill Tag */}
            <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
              isLight
                ? 'border-sky-300 bg-sky-50 text-sky-700 shadow-sm'
                : 'border-sky-500/30 bg-sky-950/40 text-sky-400 shadow-sm shadow-sky-500/10'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>LEARN · PRACTICE · TRACK · CRACK</span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Master DSA. <br />
              <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Build the Mindset.
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`max-w-xl text-base sm:text-lg leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Learn patterns, solve problems, understand your mistakes, and build the daily consistency that turns practice into genuine problem-solving ability.
            </p>

            {/* Emotional Companion Reassurance */}
            <div className={`inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg border ${
              isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-900/60 border-slate-800 text-slate-300'
            }`}>
              <Compass className="h-3.5 w-3.5 text-sky-500 shrink-0" />
              <span>&ldquo;Don&apos;t worry. You don&apos;t have to figure out your DSA journey alone.&rdquo;</span>
            </div>

            {/* CTAs Hierarchy */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/practice"
                className={`inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold transition-all ${
                  isLight 
                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-sm' 
                    : 'border-slate-700/80 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                Explore the Platform
              </Link>
            </div>

            {/* Small Login Link */}
            <div className="pt-1">
              <Link
                href="/login"
                className={`text-xs transition-colors inline-flex items-center gap-1 ${
                  isLight ? 'text-slate-500 hover:text-sky-600' : 'text-slate-400 hover:text-sky-400'
                }`}
              >
                <span>Already have an account?</span>
                <span className="text-sky-500 font-semibold underline underline-offset-2">Log in</span>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className={`grid grid-cols-3 gap-3 pt-3 border-t max-w-lg ${
              isLight ? 'border-slate-200' : 'border-slate-800/80'
            }`}>
              <div className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800/70'
              }`}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                  <BookOpen className="h-3.5 w-3.5" />
                </div>
                <div className={`text-xs font-semibold leading-tight ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  Structured Learning
                </div>
              </div>

              <div className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800/70'
              }`}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div className={`text-xs font-semibold leading-tight ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  Hands-on Practice
                </div>
              </div>

              <div className={`flex items-center gap-2 rounded-xl p-2.5 border transition-all ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800/70'
              }`}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <BarChart3 className="h-3.5 w-3.5" />
                </div>
                <div className={`text-xs font-semibold leading-tight ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  Measurable Progress
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Laptop IDE Showcase */}
          <div className="lg:col-span-6 relative">
            <LandingDashboardPreview />
            {/* Laptop Base Stand */}
            <div className={`mx-auto h-3 w-4/5 rounded-b-xl shadow-xl transition-colors ${
              isLight 
                ? 'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300' 
                : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
            }`} />
          </div>

        </div>
      </div>
    </section>
  );
}
