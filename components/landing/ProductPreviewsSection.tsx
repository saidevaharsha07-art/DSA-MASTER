'use client';

import React from 'react';
import { Code2, BarChart3, BrainCircuit } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LandingPracticePreview } from './previews/LandingPracticePreview';
import { LandingAnalyticsPreview } from './previews/LandingAnalyticsPreview';
import { LandingMentorPreview } from './previews/LandingMentorPreview';
import { LandingRevisionPreview } from './previews/LandingRevisionPreview';

export function ProductPreviewsSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <section id="previews" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-slate-50/50' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      
      {/* Background ambient glow */}
      <div className={`pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[160px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/5' : 'bg-sky-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <span>LIVE PRODUCT PREVIEWS</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Crafted for focus. <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Built for developers.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            A clean, distraction-free environment engineered to maximize algorithmic intuition and deep work.
          </p>
        </div>

        {/* 3-Panel Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel 1: Practice Arena */}
          <div className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-colors ${
            isLight 
              ? 'border-slate-200/90 bg-white shadow-sm hover:border-slate-300' 
              : 'border-slate-800/90 bg-[#090D16]/90 shadow-2xl shadow-black/40 hover:border-slate-700'
          }`}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-500">
                  <Code2 className="h-4 w-4" />
                  <span>PRACTICE ARENA</span>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                }`}>
                  Product preview
                </span>
              </div>

              <h3 className={`text-xl font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Write, test, and submit <br />
                <span className="text-sky-500">in real time.</span>
              </h3>
              
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Solve coding problems with a rich multi-language sandbox, instant test evaluation, and persistent drafts.
              </p>
            </div>

            <div className="mt-auto">
              <LandingPracticePreview />
            </div>
          </div>

          {/* Panel 2: Intelligent Analytics */}
          <div className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-colors ${
            isLight 
              ? 'border-slate-200/90 bg-white shadow-sm hover:border-slate-300' 
              : 'border-slate-800/90 bg-[#090D16]/90 shadow-2xl shadow-black/40 hover:border-slate-700'
          }`}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-500">
                  <BarChart3 className="h-4 w-4" />
                  <span>INTELLIGENT ANALYTICS</span>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                }`}>
                  Example dashboard
                </span>
              </div>

              <h3 className={`text-xl font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Know exactly <br />
                <span className="text-sky-500">where you&apos;re improving.</span>
              </h3>
              
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Track your streak, accuracy rate, velocity percentiles, and multi-platform telemetry with actionable clarity.
              </p>
            </div>

            <div className="mt-auto">
              <LandingAnalyticsPreview />
            </div>
          </div>

          {/* Panel 3: AI Mentor & Revision */}
          <div className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-colors ${
            isLight 
              ? 'border-slate-200/90 bg-white shadow-sm hover:border-slate-300' 
              : 'border-slate-800/90 bg-[#090D16]/90 shadow-2xl shadow-black/40 hover:border-slate-700'
          }`}>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-500">
                  <BrainCircuit className="h-4 w-4" />
                  <span>AI MENTOR & REVISION</span>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                }`}>
                  Product preview
                </span>
              </div>

              <h3 className={`text-xl font-bold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Learn it once. <br />
                <span className="text-sky-500">Remember it longer.</span>
              </h3>
              
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Automated spaced repetition review queues paired with contextual Socratic coaching to overcome plateaus.
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <LandingMentorPreview />
              <LandingRevisionPreview />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
