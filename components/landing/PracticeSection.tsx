'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { LandingPracticePreview } from './previews/LandingPracticePreview';

export function PracticeSection() {
  const checkItems = [
    'Real coding environment',
    'Multiple programming languages',
    'Run and submit solutions',
    'Track results and insights',
    'Persistent drafts',
  ];

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Checkmarks */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Don&apos;t just watch. <br />
              <span className="text-sky-400">Solve.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Get hands-on with a powerful coding environment. Solve problems, run your code, and track your progress in real time.
            </p>

            <div className="space-y-3 pt-2">
              {checkItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 hover:bg-sky-400 hover:shadow-sky-500/35 transition-all"
              >
                <span>Explore Practice</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column Practice Arena Mockup */}
          <div className="lg:col-span-7">
            <LandingPracticePreview />
          </div>

        </div>
      </div>
    </section>
  );
}
