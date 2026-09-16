import React from 'react';
import { Shuffle, BookDashed, Clock, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export function ProblemSection() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const dilemmas = [
    {
      icon: Shuffle,
      title: 'Random Problem Hopping',
      desc: 'Jumping between disconnected problems with no clear roadmap or step-by-step guidance.',
      color: isLight ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      icon: BookDashed,
      title: 'Memorizing Solutions',
      desc: 'Reading answers and memorizing code syntax instead of truly understanding the underlying pattern.',
      color: isLight ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: Clock,
      title: 'The 14-Day Blank',
      desc: 'Solving a problem today, only to stare at a blank editor two weeks later during an interview.',
      color: isLight ? 'text-orange-600 bg-orange-50 border-orange-200' : 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
    {
      icon: HelpCircle,
      title: 'Unclear Weak Spots',
      desc: 'Not knowing which topics you struggle with or why specific edge cases keep failing silently.',
      color: isLight ? 'text-purple-600 bg-purple-50 border-purple-200' : 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <section id="problem" className={`py-24 relative border-t transition-colors duration-200 ${
      isLight ? 'border-slate-200/80 bg-[#FAFBFD]' : 'border-slate-800/80 bg-[#06090F]'
    }`}>
      {/* Subtle background glow */}
      <div className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[140px] rounded-full transition-opacity ${
        isLight ? 'bg-rose-400/5' : 'bg-rose-500/5'
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-semibold tracking-wider ${
            isLight ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-rose-500/30 bg-rose-950/30 text-rose-400'
          }`}>
            <AlertTriangle className="h-3.5 w-3.5" />
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

        {/* Storytelling Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured Large Storytelling Card */}
          <div className={`lg:col-span-5 rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-md shadow-xl transition-all ${
            isLight
              ? 'border-rose-200/80 bg-gradient-to-b from-white to-rose-50/40 shadow-rose-100/50 text-slate-800'
              : 'border-rose-500/20 bg-gradient-to-b from-[#0E101A] to-[#080B14] shadow-black/60 text-slate-200'
          }`}>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-wider text-rose-500 uppercase">
                The Core Bottleneck
              </span>
              <h3 className={`text-2xl font-extrabold leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                The Vicious Cycle of Blind Grinding
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Solving 300 random questions without understanding pattern invariants is exhausting. Without deliberate feedback and spaced repetition, knowledge decays rapidly.
              </p>

              {/* Visual mini-breakdown */}
              <div className="space-y-2.5 pt-4">
                <div className={`rounded-xl p-3 border text-xs flex items-center gap-3 ${
                  isLight ? 'bg-white border-rose-100 shadow-sm' : 'bg-rose-950/20 border-rose-500/20'
                }`}>
                  <span className="font-mono font-bold text-rose-500">1</span>
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Watch video or read editorial solution</span>
                </div>
                <div className={`rounded-xl p-3 border text-xs flex items-center gap-3 ${
                  isLight ? 'bg-white border-rose-100 shadow-sm' : 'bg-rose-950/20 border-rose-500/20'
                }`}>
                  <span className="font-mono font-bold text-rose-500">2</span>
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Feel like you understand it completely</span>
                </div>
                <div className={`rounded-xl p-3 border text-xs flex items-center gap-3 ${
                  isLight ? 'bg-white border-rose-100 shadow-sm' : 'bg-rose-950/20 border-rose-500/20'
                }`}>
                  <span className="font-mono font-bold text-rose-500">3</span>
                  <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>Face a slight variation 2 weeks later and get stuck</span>
                </div>
              </div>
            </div>

            <div className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
              isLight ? 'border-rose-100 text-rose-700' : 'border-rose-500/20 text-rose-400'
            }`}>
              <span>DSA Master breaks this cycle</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Right 4 Friction Points Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dilemmas.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`rounded-2xl border p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    isLight
                      ? 'border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
                      : 'border-slate-800/80 bg-[#090D16]/90 shadow-lg shadow-black/40 hover:border-slate-700 hover:bg-[#0E1322]'
                  }`}
                >
                  <div>
                    <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${p.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {p.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
