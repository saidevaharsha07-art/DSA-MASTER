'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LandingAnalyticsPreview } from './previews/LandingAnalyticsPreview';
import { LandingMentorPreview } from './previews/LandingMentorPreview';
import { LandingRevisionPreview } from './previews/LandingRevisionPreview';

export function TrioShowcase() {
  return (
    <section id="mentor" className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Intelligent Analytics */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white leading-snug">
                Know exactly <br />
                <span className="text-sky-400">where you&apos;re improving.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Track your progress, identify strengths and weaknesses, and stay consistent with beautiful analytics.
              </p>
              <div>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition"
                >
                  <span>View Analytics</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Visual Box */}
            <LandingAnalyticsPreview />
          </div>

          {/* Card 2: AI Mentor */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white leading-snug">
                Your next best <br />
                <span className="text-sky-400">problem isn&apos;t random.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Get personalized recommendations, hints, and guidance from your AI mentor based on your progress.
              </p>
              <div>
                <Link
                  href="/mentor"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition"
                >
                  <span>Meet Your AI Mentor</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Visual Box */}
            <LandingMentorPreview />
          </div>

          {/* Card 3: Smart Revision */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-xl shadow-black/40 hover:border-slate-700 transition">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white leading-snug">
                Learn it once. <br />
                <span className="text-sky-400">Remember it longer.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our smart revision system helps you retain what you learn with spaced repetition.
              </p>
              <div>
                <Link
                  href="/revision"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition"
                >
                  <span>Open Revision</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Visual Box */}
            <LandingRevisionPreview />
          </div>

        </div>
      </div>
    </section>
  );
}
