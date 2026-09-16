'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Code2, BarChart3, RotateCcw, Brain, ArrowUpRight } from 'lucide-react';

export function FeatureShowcase() {
  const features = [
    {
      title: 'Structured Learning',
      desc: 'Follow a deliberate progression across algorithmic patterns instead of wandering through random practice.',
      icon: BookOpen,
      iconStyle: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      exploreUrl: '/learn',
      exploreLabel: 'Explore Learn',
    },
    {
      title: 'Practice Arena',
      desc: 'Solve real interview problems with multi-language execution, instant sandbox testing, and edge case validation.',
      icon: Code2,
      iconStyle: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      exploreUrl: '/practice',
      exploreLabel: 'Explore Practice',
    },
    {
      title: 'Intelligent Analytics',
      desc: 'Understand your personal solve velocity, topic-by-topic accuracy, consistency streaks, and platform telemetry.',
      icon: BarChart3,
      iconStyle: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      exploreUrl: '/analytics',
      exploreLabel: 'Explore Analytics',
    },
    {
      title: 'Smart Revision',
      desc: 'Strengthen core algorithmic blueprints before they fade with automated spaced repetition memory scheduling.',
      icon: RotateCcw,
      iconStyle: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      exploreUrl: '/revision',
      exploreLabel: 'Explore Revision',
    },
    {
      title: 'AI Mentor',
      desc: 'Get contextual hints, step-by-step intuition ladders, and tailored problem recommendations based on your mistakes.',
      icon: Brain,
      iconStyle: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      exploreUrl: '/mentor',
      exploreLabel: 'Explore AI Mentor',
    },
  ];

  return (
    <section id="features" className="py-24 relative border-t border-slate-800/80 bg-[#070A0F]">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/5 blur-[140px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400">
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything connected. <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Nothing scattered.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            Five core pillars working seamlessly together to transform random problem grinding into structured algorithmic mastery.
          </p>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-[#090D16]/90 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-[#0E1424] hover:-translate-y-1 shadow-lg shadow-black/40"
              >
                <div>
                  {/* Glowing Icon Container */}
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.iconStyle} shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Subtle Explore Link */}
                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <Link
                    href={feature.exploreUrl}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group-hover:underline underline-offset-4"
                  >
                    <span>{feature.exploreLabel}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
