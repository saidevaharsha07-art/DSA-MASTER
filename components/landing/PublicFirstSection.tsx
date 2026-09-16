'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function PublicFirstSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const publicPerks = [
    'Browse complete pattern roadmaps',
    'Read detailed visual concept explanations',
    'Open coding problems in the interactive IDE',
    'Write code in Python, Java, C++, and TypeScript',
    'Execute test suites in the real-time sandbox',
    'Inspect intelligent analytics & revision tools',
  ];

  const authPerks = [
    'Save persistent code drafts across devices',
    'Log submission history and performance benchmarks',
    'Track daily streaks, XP points, and achievements',
    'Activate personalized Spaced Repetition queues',
    'Save custom bookmarks and private intuition notes',
    'Receive tailored AI mentor problem recommendations',
  ];

  return (
    <section id="public-first" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-slate-50/50' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/5' : 'bg-sky-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <Globe className="h-3.5 w-3.5" />
            <span>PUBLIC-FIRST ARCHITECTURE</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Explore first. <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Create an account when you want us to remember you.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            We believe world-class DSA education should have zero barriers. Start learning, coding, and exploring immediately without mandatory registration walls.
          </p>
        </div>

        {/* Side-by-Side Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Box 1: Public Explorer Mode */}
          <div className={`rounded-2xl border p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between transition-colors ${
            isLight 
              ? 'border-slate-200 bg-white shadow-slate-200/50' 
              : 'border-slate-800/90 bg-[#090D16]/90 shadow-black/40'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                  isLight ? 'text-sky-700' : 'text-sky-400'
                }`}>
                  PUBLIC EXPLORER MODE
                </span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  100% Free · No Login
                </span>
              </div>

              <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Immediate Open Access
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                You are free to explore every curriculum roadmap and execute code in our sandbox without ever giving us an email.
              </p>

              <ul className="space-y-3">
                {publicPerks.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <Check className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-8 mt-6 border-t ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
              <Link
                href="/learn"
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold transition ${
                  isLight
                    ? 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    : 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>Start Exploring Public Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Box 2: Authenticated Cloud Account */}
          <div className={`rounded-2xl border p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between transition-colors ${
            isLight
              ? 'border-sky-300 bg-gradient-to-b from-sky-50/50 to-white shadow-sky-100'
              : 'border-sky-500/30 bg-gradient-to-b from-[#0B1124] to-[#090D16] shadow-sky-950/30'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-wider text-sky-500 uppercase">
                  AUTHENTICATED CLOUD ACCOUNT
                </span>
                <span className="text-[10px] font-bold text-sky-500 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                  Free Account
                </span>
              </div>

              <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Personal Progress & Memory
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Create a free account when you want the platform to securely store your code drafts, log streaks, and personalize recommendations.
              </p>

              <ul className="space-y-3">
                {authPerks.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}>
                    <ShieldCheck className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`pt-8 mt-6 border-t ${isLight ? 'border-sky-100' : 'border-slate-800/80'}`}>
              <Link
                href="/signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-5 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition"
              >
                <span>Create Free Cloud Account</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
