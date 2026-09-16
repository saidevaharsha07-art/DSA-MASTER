'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  BrainCircuit, 
  Sparkles, 
  Compass, 
  GitBranch, 
  Layers, 
  Eye, 
  Zap, 
  Cpu, 
  BarChart3, 
  RotateCcw 
} from 'lucide-react';
import { LandingPracticePreview } from './previews/LandingPracticePreview';
import { LandingAnalyticsPreview } from './previews/LandingAnalyticsPreview';
import { LandingMentorPreview } from './previews/LandingMentorPreview';
import { LandingRevisionPreview } from './previews/LandingRevisionPreview';

export function ProductExperienceSection() {
  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/80 bg-[#06090F]">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 -right-40 w-[600px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full" />
      <div className="pointer-events-none absolute top-2/3 -left-40 w-[600px] h-[600px] bg-indigo-600/5 blur-[160px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
        
        {/* Section Global Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400">
            <span>THE PRODUCT EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            See how real problem-solving <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              actually happens.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            Explore the three core pillars engineered to build your intuition, accelerate your coding speed, and ensure long-term concept retention.
          </p>
        </div>

        {/* SHOWCASE A: Learn with structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-lg bg-sky-500/10 border border-sky-500/30 px-3 py-1 text-xs font-bold text-sky-400">
              <Compass className="h-4 w-4" />
              <span>SHOWCASE A · STRUCTURED LEARNING</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Learn with <br />
              <span className="text-sky-400">structure.</span>
            </h3>

            <p className="text-base text-slate-300 leading-relaxed">
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
                  <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 border border-sky-500/30 px-5 py-3 text-xs font-bold text-sky-400 hover:bg-sky-500/20 hover:border-sky-400 transition"
              >
                <span>Explore Curriculum Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual: Interactive Pattern Roadmap Mockup */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800/90 bg-[#090D16]/95 p-6 backdrop-blur-md shadow-2xl shadow-black/50 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-sky-400" />
                  <span className="text-xs font-bold text-white tracking-wide">Pattern Tree · Arrays & Hashing</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
                  Product preview
                </span>
              </div>

              {/* Visual Pattern Tree Nodes */}
              <div className="space-y-3 pt-2">
                <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-mono text-xs font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Two Pointers & Sliding Window</h4>
                      <p className="text-xs text-slate-400">Shrinkable vs fixed windows · O(N) single pass</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    9 Problems
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Fast & Slow Pointers (Cycle Detection)</h4>
                      <p className="text-xs text-slate-400">Floyd&apos;s Tortoise and Hare · Linked list middle</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                    6 Problems
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Binary Search on Solution Space</h4>
                      <p className="text-xs text-slate-400">Monotonic predicate functions · Min capacity</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-800/40 border border-slate-700/40 px-2.5 py-1 rounded-full">
                    8 Problems
                  </span>
                </div>
              </div>

              {/* Intuition Callout */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 flex items-center gap-3 text-xs text-amber-300">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
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
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-bold text-blue-400">
              <Code2 className="h-4 w-4" />
              <span>SHOWCASE B · HANDS-ON PRACTICE</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Don&apos;t just watch. <br />
              <span className="text-sky-400">Solve.</span>
            </h3>

            <p className="text-base text-slate-300 leading-relaxed">
              Reading answers gives a false sense of mastery. Real confidence comes from writing code, handling tricky edge cases, and seeing automated test cases pass in a live sandbox.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Full-featured interactive IDE with syntax highlighting',
                'Instant multi-language support (Python, Java, C++, TypeScript)',
                'Run custom inputs and evaluate against comprehensive test suites',
                'Automatic draft preservation so you never lose your code',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500/10 border border-sky-500/30 px-5 py-3 text-xs font-bold text-sky-400 hover:bg-sky-500/20 hover:border-sky-400 transition"
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
            <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-400">
              <BrainCircuit className="h-4 w-4" />
              <span>SHOWCASE C · INTELLIGENT FEEDBACK</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Know what to <br />
              <span className="text-sky-400">work on next.</span>
            </h3>

            <p className="text-base text-slate-300 leading-relaxed">
              No more guessing if you are ready for an interview. Intelligent analytics highlight your blind spots, spaced repetition schedules timely reviews, and an AI mentor recommends your next optimal challenge.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Real-time accuracy, streak consistency, and pattern telemetry',
                'Automated Spaced Repetition (SRS) memory review queues',
                'Contextual AI mentoring with progressive hint ladders',
                'Personalized recommendations based on your actual mistakes',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/analytics"
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 px-4 py-2.5 text-xs font-bold text-sky-400 hover:bg-sky-500/20 transition"
              >
                <span>Analytics</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/mentor"
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 px-4 py-2.5 text-xs font-bold text-purple-400 hover:bg-purple-500/20 transition"
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
