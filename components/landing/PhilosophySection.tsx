'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, Sparkles, Plus, Equal } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function PhilosophySection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

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
    <section id="why-dsa-master" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-white' : 'border-slate-800/80 bg-[#070A0F]'
    }`}>
      
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[150px] rounded-full transition-opacity ${
        isLight ? 'bg-sky-400/5' : 'bg-sky-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-500/30 bg-sky-950/30 text-sky-400'
          }`}>
            <Sparkles className="h-3.5 w-3.5" />
            <span>OUR PHILOSOPHY</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Because solving one more problem <br />
            <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              isn&apos;t always the answer.
            </span>
          </h2>

          <p className={`text-base sm:text-lg leading-relaxed pt-2 ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Grinding hundreds of disconnected questions without feedback only creates fatigue. True algorithmic mastery is forged when structured patterns, deliberate practice, instant feedback, spaced revision, and daily consistency unite.
          </p>
        </div>

        {/* The Equation Formula Visualization */}
        <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-md shadow-2xl transition-colors ${
          isLight ? 'border-slate-200 bg-white shadow-slate-200/50' : 'border-slate-800/90 bg-[#090D16]/90 shadow-black/40'
        }`}>
          <h3 className={`text-xs font-mono font-bold tracking-widest uppercase text-center mb-6 ${
            isLight ? 'text-sky-700' : 'text-sky-400'
          }`}>
            THE DSA MASTER EQUATION
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
            {formulaItems.map((item, idx) => (
              <React.Fragment key={item.label}>
                <div className={`rounded-2xl border px-4 py-3 min-w-[120px] shadow-sm ${
                  isLight ? 'border-slate-200 bg-slate-50/70 text-slate-800' : 'border-slate-800/80 bg-[#0B0F1C] text-white'
                }`}>
                  <div className="text-sm font-extrabold">{item.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</div>
                </div>
                {idx < formulaItems.length - 1 && (
                  <Plus className="h-4 w-4 text-sky-500 shrink-0" />
                )}
              </React.Fragment>
            ))}
            
            <Equal className="h-5 w-5 text-emerald-500 shrink-0 mx-1" />

            <div className={`rounded-2xl border px-5 py-3 min-w-[130px] shadow-md ${
              isLight 
                ? 'border-emerald-300 bg-emerald-50/80 shadow-emerald-500/10' 
                : 'border-emerald-500/40 bg-emerald-950/30 shadow-emerald-500/10'
            }`}>
              <div className={`text-sm font-black uppercase tracking-wider ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}>
                True Mastery
              </div>
              <div className={`text-[10px] mt-0.5 ${
                isLight ? 'text-emerald-600' : 'text-emerald-300/80'
              }`}>
                Interview Confidence
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className={`text-2xl sm:text-3xl font-extrabold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Engineered around how <br />
              <span className="text-sky-500">DSA is actually learned.</span>
            </h3>
            
            <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              We designed DSA Master from the ground up to eliminate the friction points that derail learners. Every feature connects directly into your personal growth loop.
            </p>

            <div className="pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/25 transition"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={`rounded-2xl border p-6 backdrop-blur-md shadow-2xl overflow-x-auto transition-colors ${
              isLight ? 'border-slate-200 bg-white shadow-slate-200/60' : 'border-slate-800/90 bg-[#090D16]/95 shadow-black/50'
            }`}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className={`border-b pb-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                    <th className="pb-3 text-slate-400 font-semibold">Traditional Practice</th>
                    <th className="pb-3 text-right sm:text-left text-sky-500 font-bold">The DSA Master Way</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-medium ${isLight ? 'divide-slate-100' : 'divide-slate-800/60'}`}>
                  {comparisonRows.map((row) => (
                    <tr key={row.traditional} className={`group transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/40'}`}>
                      <td className={`py-3.5 pr-4 flex items-center justify-between ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <span>{row.traditional}</span>
                        <X className="h-3.5 w-3.5 text-slate-400 hidden sm:inline" />
                      </td>
                      <td className="py-3.5 pl-4 text-right sm:text-left">
                        <div className="flex items-center justify-end sm:justify-start gap-2">
                          <Check className="h-4 w-4 text-sky-500 shrink-0" />
                          <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>{row.dsaMaster}</span>
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
