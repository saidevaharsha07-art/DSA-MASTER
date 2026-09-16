'use client';

import React from 'react';
import { Shuffle, BookDashed, Clock, HelpCircle, Compass, MessageSquareOff } from 'lucide-react';

export function ProblemSection() {
  const problems = [
    {
      icon: Shuffle,
      title: 'Random Problem Hopping',
      desc: 'Jumping between disconnected problems without a coherent mental model or difficulty progression.',
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: BookDashed,
      title: 'Solution Memorization',
      desc: 'Reading solutions and memorizing code syntax instead of recognizing the underlying algorithmic pattern.',
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Clock,
      title: 'The Forgetting Curve',
      desc: 'Solving a problem successfully today, only to stare at a blank editor two weeks later during an interview.',
      iconColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
    {
      icon: HelpCircle,
      title: 'Invisible Weak Spots',
      desc: 'No objective visibility into why you fail test cases, where your runtime stalls, or which topics need reinforcement.',
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Compass,
      title: 'Aimless Practice',
      desc: 'Grinding hundreds of problems without a structured roadmap tailored to real tech interview expectations.',
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: MessageSquareOff,
      title: 'Silent Frustration',
      desc: 'Getting stuck on a single edge case for hours without contextual, Socratic hints to unblock intuition.',
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <section id="problem" className="py-24 relative border-t border-slate-800/80 bg-[#06090F]">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-500/5 blur-[140px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-rose-400">
            <span>THE LEARNER&apos;S DILEMMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            DSA isn&apos;t hard because there are too many problems. <br />
            <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              It&apos;s hard because knowing what to do next is difficult.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            Most learners get stuck in a frustrating loop of passive reading, blind grind, and rapid forgetting. Sound familiar?
          </p>
        </div>

        {/* 6-Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group rounded-2xl border border-slate-800/80 bg-[#090D16]/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-[#0E1322] hover:-translate-y-1 shadow-lg shadow-black/40"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.iconColor} transition-transform group-hover:scale-105`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
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
