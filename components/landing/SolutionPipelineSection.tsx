'use client';

import React from 'react';
import { BookOpen, Lightbulb, Code2, BarChart3, RotateCcw, TrendingUp, Trophy, ArrowRight } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function SolutionPipelineSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const pipeline = [
    {
      label: 'LEARN',
      title: 'Guided Roadmap',
      desc: 'Step-by-step topics structured by interview importance',
      icon: BookOpen,
      color: isLight ? 'text-sky-600 bg-sky-50 border-sky-200' : 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      badge: 'Step 1',
    },
    {
      label: 'UNDERSTAND',
      title: 'Pattern Intuition',
      desc: 'Visual mental models and recognition signals',
      icon: Lightbulb,
      color: isLight ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badge: 'Step 2',
    },
    {
      label: 'PRACTICE',
      title: 'Live Sandbox IDE',
      desc: 'Hands-on coding, test case execution & instant feedback',
      icon: Code2,
      color: isLight ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      badge: 'Step 3',
    },
    {
      label: 'ANALYZE',
      title: 'Real Telemetry',
      desc: 'Objective metrics on accuracy, solve speed, and blind spots',
      icon: BarChart3,
      color: isLight ? 'text-teal-600 bg-teal-50 border-teal-200' : 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      badge: 'Step 4',
    },
    {
      label: 'REVISE',
      title: 'Spaced Memory',
      desc: 'Smart reminders before concepts fade from memory',
      icon: RotateCcw,
      color: isLight ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badge: 'Step 5',
    },
    {
      label: 'IMPROVE',
      title: 'AI Coaching',
      desc: 'Socratic hints and personalized next-problem suggestions',
      icon: TrendingUp,
      color: isLight ? 'text-purple-600 bg-purple-50 border-purple-200' : 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      badge: 'Step 6',
    },
    {
      label: 'MASTER',
      title: 'Interview Ready',
      desc: 'Confidence to solve unseen problems independently',
      icon: Trophy,
      color: isLight ? 'text-yellow-600 bg-yellow-50 border-yellow-200' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      badge: 'Outcome',
    },
  ];

  return (
    <section id="solution" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-white' : 'border-slate-800/80 bg-[#070A0F]'
    }`}>
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[150px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/5' : 'bg-sky-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <span>THE UNIFIED PIPELINE</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            One connected system for <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              your entire DSA journey.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Instead of treating learning, coding, tracking, and revision as isolated tasks, DSA Master unifies them into a single continuous feedback loop.
          </p>
        </div>

        {/* Continuous Pipeline Visualization */}
        <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-colors ${
          isLight ? 'border-slate-200/90 bg-white shadow-slate-200/50' : 'border-slate-800/90 bg-[#090D16]/90 shadow-black/50'
        }`}>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-2">
            {pipeline.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 group relative ${
                    isLight 
                      ? 'border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-sky-300 hover:shadow-md shadow-sm' 
                      : 'border-slate-800/60 bg-[#0B0F1A]/80 hover:border-slate-700 hover:bg-[#0E1424]'
                  }`}
                >
                  <div>
                    {/* Step Top badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {step.badge}
                      </span>
                      {idx < pipeline.length - 1 && (
                        <ArrowRight className={`hidden lg:block h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 ${
                          isLight ? 'text-slate-400 group-hover:text-sky-600' : 'text-slate-600 group-hover:text-sky-400'
                        }`} />
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${step.color} transition-transform group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Title & Step */}
                    <h3 className="text-xs font-bold text-sky-500 tracking-wider uppercase mb-1">
                      {step.label}
                    </h3>
                    <h4 className={`text-sm font-semibold mb-2 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {step.title}
                    </h4>
                  </div>

                  <p className={`text-[11px] leading-relaxed pt-2 border-t ${
                    isLight ? 'border-slate-200/60 text-slate-600' : 'border-slate-800/50 text-slate-400'
                  }`}>
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Connection Explanation */}
          <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/80 text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>Real-Time Feedback Loop:</span>
              <span>Every problem you solve automatically updates your memory queue and coaching recommendations.</span>
            </div>
            <div className={`font-mono text-[11px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              ZERO DISCONNECTED SILOS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
