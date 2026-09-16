'use client';

import React from 'react';
import { BookOpen, Lightbulb, Code2, BarChart3, RotateCcw, TrendingUp, Trophy, ArrowRight } from 'lucide-react';

export function SolutionPipelineSection() {
  const pipeline = [
    {
      label: 'LEARN',
      title: 'Foundational Roadmap',
      desc: 'Structured curricula aligned with top interview topics',
      icon: BookOpen,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30 ring-sky-500/20',
      badge: 'Step 1',
    },
    {
      label: 'UNDERSTAND',
      title: 'Pattern Intuition',
      desc: 'Visual mental models and recognition signals',
      icon: Lightbulb,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30 ring-amber-500/20',
      badge: 'Step 2',
    },
    {
      label: 'PRACTICE',
      title: 'Interactive IDE',
      desc: 'Hands-on coding, sandbox execution & test cases',
      icon: Code2,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30 ring-blue-500/20',
      badge: 'Step 3',
    },
    {
      label: 'ANALYZE',
      title: 'Smart Telemetry',
      desc: 'Precision metrics on accuracy, solve speed & gaps',
      icon: BarChart3,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/30 ring-teal-500/20',
      badge: 'Step 4',
    },
    {
      label: 'REVISE',
      title: 'Spaced Repetition',
      desc: 'Automated memory scheduling before forgetting occurs',
      icon: RotateCcw,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 ring-emerald-500/20',
      badge: 'Step 5',
    },
    {
      label: 'IMPROVE',
      title: 'AI Coaching',
      desc: 'Targeted recommendations and hint ladders',
      icon: TrendingUp,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30 ring-purple-500/20',
      badge: 'Step 6',
    },
    {
      label: 'MASTER',
      title: 'Interview Ready',
      desc: 'Autonomous problem-solving confidence',
      icon: Trophy,
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30 ring-yellow-500/20',
      badge: 'Outcome',
    },
  ];

  return (
    <section id="solution" className="py-24 relative border-t border-slate-800/80 bg-[#070A0F]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/5 blur-[150px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400">
            <span>THE UNIFIED PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            One system for the <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              entire DSA journey.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            Instead of treating reading, coding, tracking, and revision as isolated activities, DSA Master connects them into a continuous intelligence loop.
          </p>
        </div>

        {/* Continuous Pipeline Visualization */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#090D16]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/50">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-2">
            {pipeline.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col justify-between rounded-2xl border border-slate-800/60 bg-[#0B0F1A]/80 p-4 transition-all duration-300 hover:border-slate-700 hover:bg-[#0E1424] group relative">
                  
                  <div>
                    {/* Step Top badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                        {step.badge}
                      </span>
                      {idx < pipeline.length - 1 && (
                        <ArrowRight className="hidden lg:block h-3.5 w-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>

                    {/* Icon */}
                    <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${step.color} transition-transform group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Title & Step */}
                    <h3 className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-1">
                      {step.label}
                    </h3>
                    <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                      {step.title}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-800/50">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Connection Explanation */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Continuous Feedback Loop:</span>
              <span>Every solve updates your revision queue and AI coaching recommendations in real time.</span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              ZERO DISCONNECTED SILOS
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
