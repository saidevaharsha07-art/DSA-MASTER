'use client';

import React from 'react';
import { MapPin, Lightbulb, Code2, RefreshCw } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function HowItWorksSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const steps = [
    {
      num: '01',
      title: 'Pick your path',
      desc: 'Select a structured roadmap tailored to your skill level and target interview timeline.',
      icon: MapPin,
      color: isLight ? 'text-sky-600 bg-sky-50 border-sky-200' : 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    },
    {
      num: '02',
      title: 'Learn the pattern',
      desc: 'Master the core invariant, visual mental model, and recognition signals before typing code.',
      icon: Lightbulb,
      color: isLight ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      num: '03',
      title: 'Solve and make mistakes',
      desc: 'Write code in our sandbox IDE, test custom edge cases, and learn directly from failure.',
      icon: Code2,
      color: isLight ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      num: '04',
      title: 'Review, improve, repeat',
      desc: 'Solidify long-term retention with automated spaced repetition and AI coaching feedback.',
      icon: RefreshCw,
      color: isLight ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <section id="how-it-works" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-[#FAFBFD]' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      
      {/* Subtle ambient lighting */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[140px] rounded-full transition-opacity ${
        isLight ? 'bg-indigo-400/5' : 'bg-indigo-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <span>METHODOLOGY</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Your journey, <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              without the guesswork.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            A proven 4-stage progression engineered to transform beginner uncertainty into confident, autonomous problem-solving capability.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className={`group relative rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  isLight
                    ? 'border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
                    : 'border-slate-800/80 bg-[#090D16]/90 shadow-lg shadow-black/40 hover:border-slate-700 hover:bg-[#0E1322]'
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-2xl font-black ${
                      isLight ? 'text-sky-600/80 group-hover:text-sky-600' : 'text-sky-400/80 group-hover:text-sky-400'
                    }`}>
                      {s.num}
                    </span>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold mb-2 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {s.desc}
                  </p>
                </div>

                {/* Progress indicator */}
                <div className={`mt-6 pt-4 border-t flex items-center gap-2 text-[11px] font-mono text-slate-400 ${
                  isLight ? 'border-slate-100' : 'border-slate-800/60'
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>Stage {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Journey Outcome Banner */}
        <div className={`mt-12 rounded-2xl border p-6 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
          isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-slate-800 bg-[#090E18]'
        }`}>
          <div className="text-left space-y-1">
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">The Target Outcome</span>
            <p className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
              From memorizing answers to independently deriving optimal solutions.
            </p>
          </div>
          <span className={`shrink-0 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border ${
            isLight ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
          }`}>
            Autonomous Problem Solver
          </span>
        </div>

      </div>
    </section>
  );
}
