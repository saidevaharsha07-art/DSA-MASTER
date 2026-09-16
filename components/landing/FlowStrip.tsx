'use client';

import React from 'react';
import { BookOpen, Code2, BarChart3, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

export function FlowStrip() {
  const steps = [
    {
      icon: BookOpen,
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      title: 'Learn',
      subtitle: 'Build strong foundations',
    },
    {
      icon: Code2,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Practice',
      subtitle: 'Solve real problems',
    },
    {
      icon: BarChart3,
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      title: 'Analyze',
      subtitle: 'Track your progress',
    },
    {
      icon: RotateCcw,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Revise',
      subtitle: 'Strengthen weak areas',
    },
    {
      icon: Trophy,
      iconColor: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      title: 'Master',
      subtitle: 'Crack interviews',
    },
  ];

  return (
    <section className="py-8 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-4 sm:p-6 backdrop-blur-md shadow-lg shadow-black/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-2 items-center">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex items-center justify-between lg:justify-start gap-3 group">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${step.iconColor} transition-transform group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{step.title}</h4>
                      <p className="text-xs text-slate-400">{step.subtitle}</p>
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block h-4 w-4 text-slate-700 ml-auto mr-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
