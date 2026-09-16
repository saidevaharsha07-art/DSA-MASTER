'use client';

import React from 'react';
import { Flame, Star, Play, Send, ChevronDown } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingDashboardPreview() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';
  const data = LANDING_PREVIEW_DATA.heroIde;

  return (
    <div className={`relative mx-auto rounded-2xl border p-2 shadow-2xl transition-colors duration-200 ${
      isLight
        ? 'border-slate-300/80 bg-white shadow-slate-300/60 ring-1 ring-slate-900/5'
        : 'border-slate-700/80 bg-[#0B0E14] shadow-sky-950/40 ring-1 ring-white/10'
    }`}>
      
      {/* Laptop Display Topbar */}
      <div className={`flex items-center justify-between border-b px-3.5 py-2 rounded-t-xl transition-colors ${
        isLight ? 'border-slate-200 bg-slate-100 text-slate-700' : 'border-slate-800/80 bg-[#0E131F] text-slate-300'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider">
            <span className="text-sky-500">▲</span> DSA MASTER
          </div>
          <span className={`ml-2 hidden sm:inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium border ${
            isLight ? 'bg-slate-200/80 text-slate-600 border-slate-300' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
          }`}>
            Product preview
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500 border border-amber-500/20">
            <Flame className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>Streak</span>
          </div>
          <div className="flex items-center gap-1 rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-500 border border-indigo-500/20">
            <Star className="h-3 w-3 fill-indigo-400 text-indigo-400" />
            <span>XP {data.xpPoints}</span>
          </div>
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">
            U
          </div>
        </div>
      </div>

      {/* IDE Workspace Grid */}
      <div className={`grid grid-cols-12 text-xs min-h-[380px] rounded-b-xl overflow-hidden transition-colors ${
        isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#070A0F] text-slate-200'
      }`}>
        
        {/* Mini Sidebar */}
        <div className={`col-span-3 border-r p-2 space-y-1 transition-colors ${
          isLight ? 'border-slate-200 bg-slate-100/70' : 'border-slate-800/80 bg-[#090D16]'
        }`}>
          <div className={`px-2 py-1 text-[10px] font-semibold rounded cursor-default ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Dashboard
          </div>
          <div className="px-2 py-1 text-[10px] font-semibold text-sky-500 bg-sky-500/10 border-l-2 border-sky-500 rounded-r cursor-default">
            Practice
          </div>
          <div className={`px-2 py-1 text-[10px] font-semibold rounded cursor-default ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Learn
          </div>
          <div className={`px-2 py-1 text-[10px] font-semibold rounded cursor-default ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Revision
          </div>
          <div className={`px-2 py-1 text-[10px] font-semibold rounded cursor-default ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Analytics
          </div>
          <div className={`px-2 py-1 text-[10px] font-semibold rounded cursor-default ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            AI Mentor
          </div>
        </div>

        {/* Left Problem Description Pane */}
        <div className={`col-span-4 border-r p-3 flex flex-col justify-between transition-colors ${
          isLight ? 'border-slate-200 bg-white' : 'border-slate-800/80 bg-[#080C14]'
        }`}>
          <div className="space-y-2.5">
            <div className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{data.problemTitle}</div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-500 border border-emerald-500/20">
                {data.problemDifficulty}
              </span>
              {data.problemTags.map((tag) => (
                <span key={tag} className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${
                  isLight ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-slate-800 text-slate-300'
                }`}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Problem prompt */}
            <p className={`text-[10px] leading-relaxed font-sans ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
            </p>

            {/* Example Box */}
            <div className={`rounded p-2 text-[9px] font-mono space-y-0.5 border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/80 border-slate-800 text-slate-300'
            }`}>
              <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Example 1:</div>
              <div>Input: nums = [2,7,11,15], target = 9</div>
              <div>Output: [0,1]</div>
              <div className={`text-[8px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Explanation: Because nums[0] + nums[1] == 9, return [0, 1].</div>
            </div>
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
            <button type="button" className={`flex-1 flex items-center justify-center gap-1 rounded px-2 py-1 text-[10px] font-semibold border ${
              isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200' : 'bg-slate-800/80 text-slate-200 border-slate-700'
            }`}>
              <Play className="h-2.5 w-2.5" />
              <span>Run Code</span>
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-1 rounded bg-sky-500 hover:bg-sky-400 px-2 py-1 text-[10px] font-bold text-slate-950 shadow-sm">
              <Send className="h-2.5 w-2.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Right Code Editor Pane (Preserves clean syntax highlight colors) */}
        <div className="col-span-5 p-2 bg-[#0A0E1A] text-slate-200 flex flex-col font-mono text-[10px] leading-tight select-none">
          {/* Editor Tab Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <div className="flex items-center gap-1 rounded bg-slate-800/80 px-2 py-0.5 text-[9px] font-medium text-slate-200 border border-slate-700">
              <span>{data.sampleCodeLanguage}</span>
              <ChevronDown className="h-2.5 w-2.5 text-slate-400" />
            </div>
          </div>

          {/* Code Editor Body */}
          <div className="flex-1 overflow-x-hidden space-y-1 font-mono text-[9.5px]">
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">1</span>
              <span><span className="text-purple-400">class</span> <span className="text-yellow-300">Solution</span> {'{'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">2</span>
              <span className="pl-2"><span className="text-purple-400">public</span> <span className="text-sky-400">int</span>[] <span className="text-blue-300">twoSum</span>(<span className="text-sky-400">int</span>[] <span className="text-slate-200">nums</span>, <span className="text-sky-400">int</span> <span className="text-slate-200">target</span>) {'{'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">3</span>
              <span className="pl-4"><span className="text-sky-400">Map</span>&lt;<span className="text-sky-400">Integer</span>, <span className="text-sky-400">Integer</span>&gt; <span className="text-slate-200">map</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">HashMap</span>&lt;&gt;();</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">4</span>
              <span className="pl-4"><span className="text-purple-400">for</span> (<span className="text-sky-400">int</span> <span className="text-slate-200">i</span> = <span className="text-amber-300">0</span>; <span className="text-slate-200">i</span> &lt; <span className="text-slate-200">nums.length</span>; <span className="text-slate-200">i</span>++) {'{'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">5</span>
              <span className="pl-6"><span className="text-sky-400">int</span> <span className="text-slate-200">comp</span> = <span className="text-slate-200">target</span> - <span className="text-slate-200">nums</span>[<span className="text-slate-200">i</span>];</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">6</span>
              <span className="pl-6"><span className="text-purple-400">if</span> (<span className="text-slate-200">map</span>.<span className="text-blue-300">containsKey</span>(<span className="text-slate-200">comp</span>)) {'{'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">7</span>
              <span className="pl-8"><span className="text-purple-400">return</span> <span className="text-purple-400">new</span> <span className="text-sky-400">int</span>[] {'{'}<span className="text-slate-200">map</span>.<span className="text-blue-300">get</span>(<span className="text-slate-200">comp</span>), <span className="text-slate-200">i</span>{'}'};</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">8</span>
              <span className="pl-6">{'}'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">9</span>
              <span className="pl-6"><span className="text-slate-200">map</span>.<span className="text-blue-300">put</span>(<span className="text-slate-200">nums</span>[<span className="text-slate-200">i</span>], <span className="text-slate-200">i</span>);</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">10</span>
              <span className="pl-4">{'}'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">11</span>
              <span className="pl-4"><span className="text-purple-400">return</span> <span className="text-purple-400">new</span> <span className="text-sky-400">int</span>[] {'{}'};</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">12</span>
              <span className="pl-2">{'}'}</span>
            </div>
            <div className="flex">
              <span className="w-5 shrink-0 text-slate-600 text-right pr-2 select-none">13</span>
              <span>{'}'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
