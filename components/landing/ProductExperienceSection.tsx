'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Code2, 
  BrainCircuit, 
  Sparkles 
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LandingPracticePreview } from './previews/LandingPracticePreview';
import { LandingAnalyticsPreview } from './previews/LandingAnalyticsPreview';
import { LandingMentorPreview } from './previews/LandingMentorPreview';
import { LandingRevisionPreview } from './previews/LandingRevisionPreview';

export function ProductExperienceSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <section id="experience" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-[#FAFBFD]' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute top-1/4 -right-40 w-[600px] h-[600px] blur-[160px] rounded-full transition-opacity ${
        isLight ? 'bg-blue-400/5' : 'bg-blue-600/5'
      }`} />
      <div className={`pointer-events-none absolute top-2/3 -left-40 w-[600px] h-[600px] blur-[160px] rounded-full transition-opacity ${
        isLight ? 'bg-indigo-400/5' : 'bg-indigo-600/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
        
        {/* Section Global Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <span>THE PRODUCT EXPERIENCE</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            See how real problem-solving <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              actually happens.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Explore the three core pillars built to develop your algorithmic intuition, accelerate your coding speed, and build lasting confidence.
          </p>
        </div>

        {/* SHOWCASE A: Learn with structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold ${
              isLight ? 'bg-sky-50 border-sky-200 text-sky-700' : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
            }`}>
              <Compass className="h-4 w-4" />
              <span>SHOWCASE A · STRUCTURED LEARNING</span>
            </div>

            <h3 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Learn with <br />
              <span className="text-sky-500">structure.</span>
            </h3>

            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Stop guessing what to solve next. Follow a curated roadmap organized by algorithmic patterns, from fundamental Two Pointers to Dynamic Programming and Graph traversals.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Pattern-based learning roadmap with clear milestones',
                'Visual blueprints and memory diagrams for every concept',
                'Intuition-first explanations before syntax memorization',
                'Curated recognition signals for real interview scenarios',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/learn"
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold transition ${
                  isLight
                    ? 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100'
                    : 'bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:border-sky-400'
                }`}
              >
                <span>Explore Curriculum Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Pattern Roadmap Mockup */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl border p-6 backdrop-blur-md shadow-2xl space-y-4 transition-colors ${
              isLight ? 'border-slate-200/90 bg-white shadow-slate-200/60' : 'border-slate-800/90 bg-[#090D16]/95 shadow-black/50'
            }`}>
              
              <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-sky-500" />
                  <span className={`text-xs font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Pattern Tree · Arrays & Hashing
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/60 text-slate-400 border-slate-700/50'
                }`}>
                  Product preview
                </span>
              </div>

              {/* Visual Pattern Tree Nodes */}
              <div className="space-y-3 pt-2">
                <div className={`rounded-xl border p-4 flex items-center justify-between ${
                  isLight ? 'border-sky-200 bg-sky-50/60' : 'border-sky-500/30 bg-sky-950/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-500 font-mono text-xs font-bold">
                      01
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Two Pointers & Sliding Window</h4>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Shrinkable vs fixed windows · O(N) single pass</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    9 Problems
                  </span>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800/80 bg-slate-900/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                    }`}>
                      02
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Fast & Slow Pointers (Cycle Detection)</h4>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Floyd&apos;s Tortoise and Hare · Linked list middle</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-500 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                    6 Problems
                  </span>
                </div>

                <div className={`rounded-xl border p-4 flex items-center justify-between ${
                  isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800/80 bg-slate-900/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                      isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                    }`}>
                      03
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Binary Search on Solution Space</h4>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Monotonic predicate functions · Minimum capacity</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-200/50 border border-slate-300/60 px-2.5 py-1 rounded-full">
                    8 Problems
                  </span>
                </div>
              </div>

              {/* Intuition Callout */}
              <div className={`rounded-xl border p-3.5 flex items-center gap-3 text-xs ${
                isLight ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-amber-500/20 bg-amber-500/5 text-amber-300'
              }`}>
                <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                <span>Recognition Signal: Whenever a problem asks for maximum/minimum subarray with contiguous bounds, reach for Sliding Window.</span>
              </div>

            </div>
          </div>

        </div>

        {/* SHOWCASE B: Don't just watch. Solve */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Practice IDE Preview */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <LandingPracticePreview />
          </div>

          {/* Right Column Text */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold ${
              isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}>
              <Code2 className="h-4 w-4" />
              <span>SHOWCASE B · HANDS-ON PRACTICE</span>
            </div>

            <h3 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Don&apos;t just watch. <br />
              <span className="text-sky-500">Solve.</span>
            </h3>

            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Reading answers creates an illusion of understanding. Real confidence is forged when you write code, test edge cases, and see automated test suites pass.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Full-featured interactive IDE with syntax highlighting',
                'Instant multi-language support (Python, Java, C++, TypeScript)',
                'Run custom inputs and evaluate against comprehensive test suites',
                'Automatic draft preservation so you never lose your code',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/practice"
                className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs font-bold transition ${
                  isLight
                    ? 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100'
                    : 'bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20 hover:border-sky-400'
                }`}
              >
                <span>Open Practice Arena</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* SHOWCASE C: Know what to work on next */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-bold ${
              isLight ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            }`}>
              <BrainCircuit className="h-4 w-4" />
              <span>SHOWCASE C · INTELLIGENT FEEDBACK</span>
            </div>

            <h3 className={`text-3xl sm:text-4xl font-extrabold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Know what to <br />
              <span className="text-sky-500">work on next.</span>
            </h3>

            <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              No more wondering if you are ready. Precision analytics highlight your blind spots, spaced repetition schedules timely reviews, and an AI mentor guides your next step.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Real-time accuracy, streak consistency, and pattern telemetry',
                'Automated Spaced Repetition (SRS) memory review queues',
                'Contextual AI mentoring with progressive hint ladders',
                'Personalized recommendations based on your actual mistakes',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                  <span className={`text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/analytics"
                className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  isLight ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100' : 'bg-sky-500/10 border-sky-500/30 text-sky-400 hover:bg-sky-500/20'
                }`}
              >
                <span>Analytics</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mentor"
                className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                  isLight ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' : 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20'
                }`}
              >
                <span>AI Mentor</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Analytics + Mentor Stack */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LandingAnalyticsPreview />
            <div className="space-y-4">
              <LandingMentorPreview />
              <LandingRevisionPreview />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
