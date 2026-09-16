'use client';

import React from 'react';
import { Search, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingPracticePreview() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';
  const data = LANDING_PREVIEW_DATA.practice;

  return (
    <div className={`rounded-2xl border p-4 shadow-2xl transition-colors duration-200 ${
      isLight ? 'border-slate-200/90 bg-white shadow-slate-200/60 text-slate-800' : 'border-slate-800 bg-[#0B0F19] shadow-black/60 text-slate-200'
    }`}>
      
      {/* Arena Header */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 mb-3 ${
        isLight ? 'border-slate-200' : 'border-slate-800/80'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`text-xs font-bold tracking-wider flex items-center gap-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <span className="text-sky-500">▲</span> DSA MASTER
          </div>
          <span className="text-xs text-slate-400">|</span>
          <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Practice Arena</span>
          <span className={`hidden sm:inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium border ${
            isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
          }`}>
            Product preview
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-slate-950 cursor-pointer">All</span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-medium cursor-pointer ${
            isLight ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}>Easy</span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-medium cursor-pointer ${
            isLight ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}>Medium</span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-medium cursor-pointer ${
            isLight ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}>Hard</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-36">
          <Search className="absolute left-2 top-2 h-3 w-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            readOnly
            className={`w-full rounded pl-7 pr-2 py-1 text-[10px] border focus:outline-none ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900/90 border-slate-800 text-slate-300'
            }`}
          />
        </div>
      </div>

      {/* Arena Grid */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Left Problem List */}
        <div className="col-span-12 md:col-span-8 space-y-1.5">
          {data.sampleProblems.slice(0, 5).map((prob, idx) => (
            <div
              key={prob.title}
              className={`flex items-center justify-between rounded-lg p-2 text-xs border transition ${
                isLight 
                  ? 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/80' 
                  : 'bg-slate-900/60 border-slate-800/60 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] text-slate-400 w-4">{idx + 1}</span>
                <span className={`font-semibold text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{prob.title}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${prob.diffColor}`}>
                  {prob.diff}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{prob.rate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Progress Summary Mini-Card */}
        <div className={`col-span-12 md:col-span-4 rounded-xl p-3 border flex flex-col justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#080C14] border-slate-800/80'
        }`}>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Solved Progress</div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{data.solvedCount}</span>
              <span className="text-xs text-slate-400 font-semibold">/ {data.totalCount}</span>
            </div>
            
            {/* Progress Bar */}
            <div className={`mt-2 h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}>
              <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${data.progressPercentage}%` }} />
            </div>
            <div className="mt-1 text-[10px] text-sky-500 font-bold text-right">{data.progressPercentage}% complete</div>
          </div>

          <div className={`pt-3 border-t mt-3 flex items-center justify-between text-[10px] ${
            isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
          }`}>
            <span>Multi-Language IDE</span>
            <span className="text-emerald-500 font-semibold">● Ready</span>
          </div>
        </div>

      </div>

    </div>
  );
}
