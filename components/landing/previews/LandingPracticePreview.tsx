'use client';

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingPracticePreview() {
  const data = LANDING_PREVIEW_DATA.practice;

  const categories = [
    { name: 'Array', active: true },
    { name: 'String', active: false },
    { name: 'Linked List', active: false },
    { name: 'Stack', active: false },
    { name: 'Queue', active: false },
    { name: 'Tree', active: false },
    { name: 'Graph', active: false },
    { name: 'Dynamic Programming', active: false },
    { name: 'Greedy', active: false },
    { name: 'Binary Search', active: false },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-4 shadow-2xl shadow-black/60">
      
      {/* Arena Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-white tracking-wider flex items-center gap-1">
            <span className="text-sky-400">▲</span> DSA MASTER
          </div>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs font-semibold text-slate-300">Problems</span>
          <span className="hidden sm:inline-flex items-center rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-400 border border-slate-700/50">
            Product preview
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-slate-950 cursor-pointer">All</span>
          <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:text-white cursor-pointer">Easy</span>
          <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:text-white cursor-pointer">Medium</span>
          <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:text-white cursor-pointer">Hard</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-36">
          <Search className="absolute left-2 top-2 h-3 w-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search problems..."
            readOnly
            className="w-full rounded bg-slate-900/90 pl-7 pr-2 py-1 text-[10px] text-slate-300 border border-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Arena Grid */}
      <div className="grid grid-cols-12 gap-3">
        
        {/* Category Sidebar */}
        <div className="hidden sm:block sm:col-span-3 border-r border-slate-800/80 pr-2 space-y-1">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex items-center justify-between px-2 py-1 text-[10px] rounded font-medium cursor-pointer transition ${
                cat.active
                  ? 'bg-sky-500/10 text-sky-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[8px] text-slate-600">›</span>
            </div>
          ))}
        </div>

        {/* Problems Table */}
        <div className="col-span-12 sm:col-span-6 space-y-1">
          {data.sampleProblems.map((prob) => (
            <div
              key={prob.title}
              className="flex items-center justify-between rounded bg-slate-900/50 hover:bg-slate-800/60 p-2 border border-slate-800/40 transition cursor-pointer"
            >
              <span className="text-[11px] font-medium text-slate-200 truncate pr-2">
                {prob.title}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${prob.diffColor}`}>
                  {prob.diff}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {prob.rate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Progress Gauge Widget */}
        <div className="hidden sm:flex sm:col-span-3 flex-col justify-between rounded-xl bg-[#090D16] p-3 border border-slate-800/80 text-center">
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 mb-2">
              <span>Your Progress</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </div>

            {/* Circular SVG Gauge */}
            <div className="relative mx-auto my-2 flex h-20 w-20 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-sky-400"
                  strokeDasharray={`${data.progressPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-extrabold text-white">{data.progressPercentage}%</span>
            </div>

            <div className="mt-1">
              <div className="text-xs font-bold text-white">{data.solvedCount} / {data.totalCount}</div>
              <div className="text-[9px] text-slate-400">Problems Solved</div>
            </div>
          </div>

          {/* Mini Weekly Bar Chart */}
          <div className="pt-3 border-t border-slate-800/80">
            <div className="flex items-end justify-between gap-1 h-10 px-1">
              {data.weeklyActivity.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-t bg-sky-400 hover:bg-sky-300 transition-all"
                    style={{ height: `${item.percentage}%` }}
                  />
                  <span className="text-[7px] text-slate-500">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
