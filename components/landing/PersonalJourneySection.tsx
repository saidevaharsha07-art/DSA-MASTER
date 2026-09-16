'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Bookmark, 
  FileCode2, 
  RotateCcw, 
  BarChart3, 
  Smartphone, 
  Lock, 
  ArrowRight 
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function PersonalJourneySection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const accountBenefits = [
    {
      icon: FileCode2,
      title: 'Persistent Cloud Drafts',
      desc: 'Pick up your code exactly where you left off from any browser or laptop without losing progress.',
      color: isLight ? 'text-sky-600 bg-sky-50 border-sky-200' : 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    },
    {
      icon: Flame,
      title: 'Daily Streaks & XP',
      desc: 'Build unstoppable consistency and level up your developer profile with verified solve streaks.',
      color: isLight ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      icon: RotateCcw,
      title: 'Spaced Repetition Memory',
      desc: 'Never forget a solved problem. Automated flash queues schedule reviews at optimal intervals.',
      color: isLight ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      icon: BarChart3,
      title: 'Personalized Telemetry',
      desc: 'Comprehensive charts track your solving velocity, topic-level mastery, and platform rankings.',
      color: isLight ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      icon: Bookmark,
      title: 'Bookmarks & Private Notes',
      desc: 'Organize custom problem lists and capture your personal intuition notes for rapid pre-interview revision.',
      color: isLight ? 'text-indigo-600 bg-indigo-50 border-indigo-200' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    },
    {
      icon: Smartphone,
      title: 'Seamless Multi-Device Sync',
      desc: 'Study on your tablet during the commute, code on your desktop at night with 100% cloud sync.',
      color: isLight ? 'text-teal-600 bg-teal-50 border-teal-200' : 'text-teal-400 bg-teal-500/10 border-teal-500/30',
    },
  ];

  return (
    <section id="personal-journey" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-white' : 'border-slate-800/80 bg-[#070A0F]'
    }`}>
      
      {/* Ambient background lighting */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[160px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/5' : 'bg-sky-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <Lock className="h-3.5 w-3.5" />
            <span>CLOUD MEMORY & PRIVACY</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            The platform remembers <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              your personal journey.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            The core learning experience is completely open to explore. When you create a free account, the system activates cloud memory to preserve your hard-earned progress.
          </p>

          <div className="pt-2">
            <span className={`inline-block font-mono text-xs font-bold px-4 py-1.5 rounded-full border ${
              isLight ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
            }`}>
              &ldquo;Your learning is yours.&rdquo;
            </span>
          </div>
        </div>

        {/* 6 Account Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accountBenefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  isLight
                    ? 'border-slate-200/90 bg-slate-50/70 shadow-sm hover:shadow-md hover:bg-white hover:border-slate-300'
                    : 'border-slate-800/80 bg-[#090D16]/90 shadow-lg shadow-black/40 hover:border-slate-700 hover:bg-[#0E1424]'
                }`}
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${b.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {b.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout Card */}
        <div className={`mt-14 max-w-2xl mx-auto rounded-2xl border p-6 text-center space-y-4 shadow-xl transition-colors ${
          isLight ? 'border-slate-200 bg-slate-50 text-slate-800' : 'border-slate-800/90 bg-[#0B0F1C]/90 text-slate-200'
        }`}>
          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Authentication is a convenience and privacy feature, not a paywall. Explore first, code freely, and sign up whenever you are ready to persist your journey.
          </p>
          <div className="pt-1">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 transition"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
