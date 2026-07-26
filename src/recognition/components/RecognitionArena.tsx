'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProblemDNA } from '@/src/problem-dna/types';
import { useRecognitionEngine } from '../engine/useRecognitionEngine';
import { Target, Clock, Puzzle, BrainCircuit, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export function RecognitionArena({ problem }: { problem: ProblemDNA }) {
  const { step, attempt, updateAttempt, nextStep, report, reset } = useRecognitionEngine(problem);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Pattern Recognition Arena</h2>
        <p className="text-slate-400">Analyze the problem before writing a single line of code.</p>
      </div>
      
      {/* Problem Statement Card */}
      <div className="bg-slate-900 rounded-2xl border border-white/10 p-6 mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold tracking-wide uppercase border border-white/5">
            {problem.difficulty}
          </span>
          <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
        </div>
        <p className="text-slate-300 leading-relaxed italic border-l-2 border-cyan-500 pl-4">
          &quot;Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.&quot;
        </p>
      </div>

      <div className="relative">
        {/* Progress Timeline */}
        <div className="flex justify-between items-center mb-8 px-4">
          {['keywords', 'complexity', 'patterns', 'reasoning', 'report'].map((s, idx) => {
            const steps = ['keywords', 'complexity', 'patterns', 'reasoning', 'report'];
            const currentIndex = steps.indexOf(step);
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            
            return (
              <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isCompleted ? 'bg-cyan-500 text-slate-950' : 
                  isCurrent ? 'bg-slate-800 border-2 border-cyan-500 text-cyan-400' : 'bg-slate-900 border border-slate-800 text-slate-600'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  isCurrent || isCompleted ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {s}
                </span>
              </div>
            );
          })}
          {/* Line behind */}
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-800 -z-0">
            <motion.div 
              className="h-full bg-cyan-500" 
              initial={{ width: 0 }}
              animate={{ width: `${(['keywords', 'complexity', 'patterns', 'reasoning', 'report'].indexOf(step) / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/50 rounded-3xl border border-white/5 p-8 backdrop-blur-sm"
          >
            {step === 'keywords' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Target className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Identify Keywords</h3>
                </div>
                <p className="text-slate-400">What are the critical constraints or hints in the problem statement?</p>
                <input
                  type="text"
                  placeholder="e.g., continuous subarray, sum, negative numbers"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  onChange={(e) => updateAttempt({ identifiedKeywords: e.target.value.split(',').map(s => s.trim()) })}
                />
                <Button onClick={nextStep}>Next: Complexity</Button>
              </div>
            )}

            {step === 'complexity' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 text-purple-400">
                  <Clock className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Expected Complexity</h3>
                </div>
                <p className="text-slate-400">Based on the constraints, what is the optimal time complexity?</p>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                  value={attempt.expectedTimeComplexity}
                  onChange={(e) => updateAttempt({ expectedTimeComplexity: e.target.value })}
                >
                  <option value="O(1)">O(1) Constant</option>
                  <option value="O(log N)">O(log N) Logarithmic</option>
                  <option value="O(N)">O(N) Linear</option>
                  <option value="O(N log N)">O(N log N) Linearithmic</option>
                  <option value="O(N^2)">O(N²) Quadratic</option>
                </select>
                <Button onClick={nextStep}>Next: Patterns</Button>
              </div>
            )}

            {step === 'patterns' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 text-orange-400">
                  <Puzzle className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Select Patterns</h3>
                </div>
                <p className="text-slate-400">Which DSA patterns apply to this problem?</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Hash Map', 'Binary Search', 'Dynamic Programming'].map(pat => {
                    const id = pat.toLowerCase().replace(' ', '-');
                    const isSelected = attempt.selectedPatterns?.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          const current = attempt.selectedPatterns || [];
                          if (isSelected) {
                            updateAttempt({ selectedPatterns: current.filter(p => p !== id) });
                          } else {
                            updateAttempt({ selectedPatterns: [...current, id] });
                          }
                        }}
                        className={`p-4 rounded-xl border text-sm font-semibold transition-all ${
                          isSelected ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {pat}
                      </button>
                    )
                  })}
                </div>
                <Button onClick={nextStep}>Next: Reasoning</Button>
              </div>
            )}

            {step === 'reasoning' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3 text-green-400">
                  <BrainCircuit className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Mental Model</h3>
                </div>
                <p className="text-slate-400">Explain your reasoning briefly. Why did you choose these patterns?</p>
                <textarea
                  rows={4}
                  placeholder="I chose Prefix Sum because we need to track continuous segments, and Hash Map because..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
                  onChange={(e) => updateAttempt({ reasoning: e.target.value })}
                />
                
                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-sm font-semibold text-slate-400">Confidence Level</label>
                  <input 
                    type="range" min="1" max="5" 
                    value={attempt.confidence} 
                    onChange={(e) => updateAttempt({ confidence: parseInt(e.target.value) as any })}
                    className="w-full accent-green-500" 
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Guessing</span>
                    <span>100% Sure</span>
                  </div>
                </div>

                <Button onClick={nextStep}>Analyze My Response</Button>
              </div>
            )}

            {step === 'report' && report && (
              <div className="flex flex-col gap-8">
                {/* Score Header */}
                <div className="flex flex-col items-center justify-center py-6 bg-slate-950 rounded-2xl border border-white/5 shadow-inner">
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                    {report.score.overallScore}%
                  </span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recognition Accuracy</span>
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3 p-5 rounded-xl bg-green-500/5 border border-green-500/20">
                    <h4 className="font-bold text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Correct Signals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.correctlyIdentifiedSignals.length > 0 ? report.correctlyIdentifiedSignals.map(s => (
                        <span key={s} className="px-2 py-1 bg-green-500/10 text-green-300 rounded text-xs">{s}</span>
                      )) : <span className="text-sm text-slate-500">None identified</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h4 className="font-bold text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Missed Signals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.missedSignals.length > 0 ? report.missedSignals.map(s => (
                        <span key={s} className="px-2 py-1 bg-red-500/10 text-red-300 rounded text-xs">{s}</span>
                      )) : <span className="text-sm text-slate-500">None missed!</span>}
                    </div>
                  </div>
                </div>

                <Button onClick={reset}>Try Another Problem</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-white text-slate-950 font-bold rounded-xl transition-all group"
    >
      {children}
      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
