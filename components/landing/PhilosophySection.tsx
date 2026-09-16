'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, Sparkles, Plus, Equal } from 'lucide-react';

export function PhilosophySection() {
  const comparisonRows = [
    { traditional: 'Passive lecture watching', dsaMaster: 'Active pattern implementation' },
    { traditional: 'Random problem grinding', dsaMaster: 'Structured roadmap progression' },
    { traditional: 'Solve and forget in 2 weeks', dsaMaster: 'Automated spaced repetition' },
    { traditional: 'Memorizing full solutions', dsaMaster: 'Internalizing mental models' },
    { traditional: 'Silent roadblocks and burnout', dsaMaster: 'Contextual AI hint ladders' },
  ];

  const formulaItems = [
    { label: 'Understanding', desc: 'Pattern intuition' },
    { label: 'Practice', desc: 'Hands-on coding' },
    { label: 'Feedback', desc: 'Real-time tests' },
    { label: 'Revision', desc: 'Spaced memory' },
    { label: 'Consistency', desc: 'Daily habit' },
  ];

  return (
    <section id="why-dsa-master" className="py-24 relative border-t border-slate-800/80 bg-[#070A0F]">
      
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/5 blur-[150px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/30 px-3.5 py-1 text-xs font-mono font-semibold tracking-wider text-sky-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>OUR PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Because solving one more problem <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              isn&apos;t always the answer.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
            Grinding hundreds of disconnected questions without feedback only creates fatigue. True algorithmic mastery is a system of deliberate practice, active recall, and continuous reflection.
          </p>
        </div>

        {/* The Equation Formula Visualization */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#090D16]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/40">
          <h3 className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase text-center mb-6">
            THE DSA MASTER EQUATION
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
            {formulaItems.map((item, idx) => (
              <React.Fragment key={item.label}>
                <div className="rounded-2xl border border-slate-800/80 bg-[#0B0F1C] px-4 py-3 min-w-[120px] shadow-sm">
                  <div className="text-sm font-extrabold text-white">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>
                {idx < formulaItems.length - 1 && (
                  <Plus className="h-4 w-4 text-sky-400 shrink-0" />
                )}
              </React.Fragment>
            ))}
            
            <Equal className="h-5 w-5 text-emerald-400 shrink-0 mx-1" />

            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 px-5 py-3 min-w-[130px] shadow-md shadow-emerald-500/10">
              <div className="text-sm font-black text-emerald-400 uppercase tracking-wider">True Mastery</div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">Interview Confidence</div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Engineered around how <br />
              <span className="text-sky-400">DSA is actually learned.</span>
            </h3>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We designed DSA Master from the ground up to eliminate the friction points that derail learners. Every feature connects directly into your personal growth loop.
            </p>

            <div className="pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 hover:bg-sky-400 transition"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800/90 bg-[#090D16]/95 p-6 backdrop-blur-md shadow-2xl shadow-black/50 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 pb-3">
                    <th className="pb-3 text-slate-400 font-semibold">Traditional Practice</th>
                    <th className="pb-3 text-right sm:text-left text-sky-400 font-bold">The DSA Master Way</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {comparisonRows.map((row) => (
                    <tr key={row.traditional} className="group hover:bg-slate-900/40 transition">
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
