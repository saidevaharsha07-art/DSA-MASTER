'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, BarChart3, BrainCircuit } from 'lucide-react';
import { LandingPracticePreview } from './previews/LandingPracticePreview';
import { LandingAnalyticsPreview } from './previews/LandingAnalyticsPreview';
import { LandingMentorPreview } from './previews/LandingMentorPreview';
import { LandingRevisionPreview } from './previews/LandingRevisionPreview';

export function ProductPreviewsSection() {
  return (
    <section id="previews" className="py-24 relative border-t border-slate-800/80 bg-[#06090F]">
      
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/5 blur-[160px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400">
            <span>LIVE PRODUCT PREVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Crafted for focus. <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Built for developers.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            A distraction-free, cinematic dark environment designed to maximize algorithmic intuition and deep work.
          </p>
        </div>

        {/* 3-Panel Cinematic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel 1: Practice Arena */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-2xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400">
                  <Code2 className="h-4 w-4" />
                  <span>PRACTICE ARENA</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                  Product preview
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                Write, test, and submit <br />
                <span className="text-sky-400">in real time.</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Solve coding problems with a rich multi-language sandbox, instant test evaluation, and persistent drafts.
              </p>
            </div>

            <div className="mt-auto">
              <LandingPracticePreview />
            </div>
          </div>

          {/* Panel 2: Intelligent Analytics */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-2xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-400">
                  <BarChart3 className="h-4 w-4" />
                  <span>INTELLIGENT ANALYTICS</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                  Example dashboard
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                Know exactly <br />
                <span className="text-sky-400">where you&apos;re improving.</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Track your streak, accuracy rate, velocity percentiles, and multi-platform telemetry with actionable clarity.
              </p>
            </div>

            <div className="mt-auto">
              <LandingAnalyticsPreview />
            </div>
          </div>

          {/* Panel 3: AI Mentor & Revision */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-2xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-400">
                  <BrainCircuit className="h-4 w-4" />
                  <span>AI MENTOR & REVISION</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                  Product preview
                </span>
              </div>

              <h3 className="text-xl font-bold text-white leading-snug">
                Learn it once. <br />
                <span className="text-sky-400">Remember it longer.</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
