'use client';

import React from 'react';
import { BookOpen, Code2, BarChart3, RotateCcw, Brain, Check } from 'lucide-react';

export function FeatureShowcase() {
  const features = [
    {
      title: 'Structured Learning',
      icon: BookOpen,
      iconStyle: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      bullets: [
        'Pattern-based roadmap',
        'Progressive difficulty',
        'Guided learning journey',
      ],
    },
    {
      title: 'Practice Arena',
      icon: Code2,
      iconStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      bullets: [
        'Solve coding problems',
        'Run and submit code',
        'Track submissions',
      ],
    },
    {
      title: 'Intelligent Analytics',
      icon: BarChart3,
      iconStyle: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      bullets: [
        'Progress tracking',
        'Streaks and accuracy',
        'Learning patterns',
      ],
    },
    {
      title: 'Smart Revision',
      icon: RotateCcw,
      iconStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      bullets: [
        'Spaced repetition',
        'Revision queues',
        'Weak-area focus',
      ],
    },
    {
      title: 'AI Mentor',
      icon: Brain,
      iconStyle: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      bullets: [
        'Personalized guidance',
        'Problem-solving coaching',
        'Learning recommendations',
      ],
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything you need to actually get good at{' '}
            <span className="text-sky-400">DSA.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-300">
            A complete ecosystem designed for consistent learning and measurable improvement.
          </p>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#090D16]/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-[#0E1422] hover:-translate-y-1 shadow-lg shadow-black/30"
              >
                <div>
                  {/* Glowing Icon Container */}
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconStyle} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-4">
                    {feature.title}
                  </h3>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
