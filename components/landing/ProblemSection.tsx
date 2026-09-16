'use client';

import React from 'react';
import { Shuffle, BookDashed, Clock, HelpCircle, Compass, MessageSquareOff } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function ProblemSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const problems = [
    {
      icon: Shuffle,
      title: 'Random Problem Hopping',
      desc: 'Jumping between disconnected problems with no clear roadmap or step-by-step guidance.',
      iconColor: isLight ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: BookDashed,
      title: 'Memorizing Solutions',
      desc: 'Reading answers and memorizing code syntax instead of truly understanding the underlying pattern.',
      iconColor: isLight ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Clock,
      title: 'The Forgetting Curve',
      desc: 'Solving a problem today, only to stare at a blank editor two weeks later during an interview.',
      iconColor: isLight ? 'text-orange-600 bg-orange-50 border-orange-200' : 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
    {
      icon: HelpCircle,
      title: 'Unclear Weak Spots',
      desc: 'Not knowing which topics you struggle with or why specific edge cases keep failing.',
      iconColor: isLight ? 'text-purple-600 bg-purple-50 border-purple-200' : 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Compass,
      title: 'Aimless Practice',
      desc: 'Grinding 200 random problems without feeling any more confident about your interview readiness.',
      iconColor: isLight ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: MessageSquareOff,
      title: 'Getting Stuck in Silence',
      desc: 'Struggling alone for hours on a problem without gentle, step-by-step hints to unblock intuition.',
      iconColor: isLight ? 'text-sky-600 bg-sky-50 border-sky-200' : 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <section id="problem" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-slate-50/50' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      {/* Subtle background glow */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[140px] rounded-full transition-opacity ${
        isLight ? 'bg-rose-400/5' : 'bg-rose-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-rose-500/30 bg-rose-950/30 text-rose-400'
          }`}>
            <span>THE LEARNER&apos;S DILEMMA</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            DSA isn&apos;t hard because there are too many problems. <br />
            <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              It&apos;s hard because knowing what to do next is difficult.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Most students get stuck in a cycle of passive reading, blind problem grinding, and rapid forgetting. Does this feel familiar?
          </p>
        </div>

        {/* 6-Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`group rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                  isLight
                    ? 'border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
                    : 'border-slate-800/80 bg-[#090D16]/90 shadow-lg shadow-black/40 hover:border-slate-700 hover:bg-[#0E1322]'
                }`}
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.iconColor} transition-transform group-hover:scale-105`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {p.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
