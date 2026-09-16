'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';

export function PhilosophySection() {
  const comparisonRows = [
    { traditional: 'Passive lectures', dsaMaster: 'Active problem solving' },
    { traditional: 'Random practice', dsaMaster: 'Structured progression' },
    { traditional: 'Solve and forget', dsaMaster: 'Practice + revision' },
    { traditional: 'Generic recommendations', dsaMaster: 'Personalized guidance' },
    { traditional: 'No visibility', dsaMaster: 'Measurable progress' },
  ];

  return (
    <section className="py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built around the way <br />
              <span className="text-sky-400">DSA is actually learned.</span>
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Not just another problem list. A complete system for real growth.
            </p>
            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 hover:bg-sky-400 hover:shadow-sky-500/40 transition-all"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Comparison Table */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800/90 bg-[#090D16]/90 p-6 backdrop-blur-md shadow-2xl shadow-black/50 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold pb-3">
                    <th className="pb-3 text-slate-400 font-medium">Traditional Learning</th>
                    <th className="pb-3 text-right sm:text-left text-sky-400 font-bold">DSA Master</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {comparisonRows.map((row) => (
                    <tr key={row.traditional} className="group hover:bg-slate-900/30 transition">
                      <td className="py-3.5 pr-4 text-slate-400 flex items-center justify-between">
                        <span>{row.traditional}</span>
                        <X className="h-3.5 w-3.5 text-slate-600 hidden sm:inline" />
                      </td>
                      <td className="py-3.5 pl-4 text-right sm:text-left text-white">
                        <div className="flex items-center justify-end sm:justify-start gap-2">
                          <Check className="h-4 w-4 text-sky-400 shrink-0" />
                          <span className="font-semibold text-slate-100">{row.dsaMaster}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
