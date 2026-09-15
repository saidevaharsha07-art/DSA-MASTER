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
        <h2 style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-2">Pattern Recognition Arena</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Analyze the problem before writing a single line of code.</p>
      </div>
      
      {/* Problem Statement Card */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)' }} className="rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <span style={{ background: 'var(--surface-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }} className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            {problem.difficulty}
          </span>
          <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-semibold">{problem.title}</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', borderLeftColor: 'var(--accent-primary)' }} className="leading-relaxed italic border-l-2 pl-4">
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
                <div 
                  style={{
                    background: isCompleted ? 'var(--accent-primary)' : isCurrent ? 'var(--surface)' : 'var(--surface-secondary)',
                    color: isCompleted ? '#FFFFFF' : isCurrent ? 'var(--accent-primary)' : 'var(--text-muted)',
                    borderColor: isCurrent ? 'var(--accent-primary)' : 'var(--border)',
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border-2"
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span 
                  style={{
                    color: isCurrent || isCompleted ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                  className="text-xs font-semibold uppercase tracking-wider"
                >
                  {s}
                </span>
              </div>
            );
          })}
          {/* Line behind */}
          <div style={{ background: 'var(--border)' }} className="absolute top-5 left-8 right-8 h-0.5 -z-0">
            <motion.div 
              style={{ background: 'var(--accent-primary)' }}
              className="h-full" 
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
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            className="rounded-3xl p-8 backdrop-blur-sm shadow-xl"
          >
            {step === 'keywords' && (
              <div className="flex flex-col gap-6">
                <div style={{ color: 'var(--accent-primary)' }} className="flex items-center gap-3">
                  <Target className="w-6 h-6" />
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">Identify Keywords</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>What are the critical constraints or hints in the problem statement?</p>
                <input
                  type="text"
                  placeholder="e.g., continuous subarray, sum, negative numbers"
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full border rounded-xl px-4 py-3 placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
                  onChange={(e) => updateAttempt({ identifiedKeywords: e.target.value.split(',').map(s => s.trim()) })}
                />
                <Button onClick={nextStep}>Next: Complexity</Button>
              </div>
            )}

            {step === 'complexity' && (
              <div className="flex flex-col gap-6">
                <div style={{ color: 'var(--accent-primary)' }} className="flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">Expected Complexity</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Based on the constraints, what is the optimal time complexity?</p>
                <select 
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-colors appearance-none"
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
                <div style={{ color: 'var(--accent-primary)' }} className="flex items-center gap-3">
                  <Puzzle className="w-6 h-6" />
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">Select Patterns</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Which DSA patterns apply to this problem?</p>
                
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
                        style={{
                          background: isSelected ? 'var(--accent-soft)' : 'var(--surface-secondary)',
                          borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border)',
                          color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        }}
                        className="p-4 rounded-xl border text-sm font-semibold transition-all hover:border-[var(--accent-border)]"
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
                <div style={{ color: 'var(--accent-primary)' }} className="flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6" />
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold">Mental Model</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>Explain your reasoning briefly. Why did you choose these patterns?</p>
                <textarea
                  rows={4}
                  placeholder="I chose Prefix Sum because we need to track continuous segments, and Hash Map because..."
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  className="w-full border rounded-xl px-4 py-3 placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none"
                  onChange={(e) => updateAttempt({ reasoning: e.target.value })}
                />
                
                <div className="flex flex-col gap-2 mt-4">
                  <label style={{ color: 'var(--text-secondary)' }} className="text-sm font-semibold">Confidence Level</label>
                  <input 
                    type="range" min="1" max="5" 
                    value={attempt.confidence} 
                    onChange={(e) => updateAttempt({ confidence: parseInt(e.target.value) as any })}
                    style={{ accentColor: 'var(--accent-primary)' }}
                    className="w-full" 
                  />
                  <div style={{ color: 'var(--text-muted)' }} className="flex justify-between text-xs">
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
                <div style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="flex flex-col items-center justify-center py-6 rounded-2xl shadow-inner">
                  <span style={{ color: 'var(--accent-primary)' }} className="text-6xl font-black mb-2">
                    {report.score.overallScore}%
                  </span>
                  <span style={{ color: 'var(--text-muted)' }} className="text-sm font-bold uppercase tracking-widest">Recognition Accuracy</span>
                </div>

                {/* Analysis Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3 p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="font-bold text-green-500 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Correct Signals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.correctlyIdentifiedSignals.length > 0 ? report.correctlyIdentifiedSignals.map(s => (
                        <span key={s} className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-300 rounded text-xs">{s}</span>
                      )) : <span style={{ color: 'var(--text-muted)' }} className="text-sm">None identified</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 p-5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <h4 className="font-bold text-red-500 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Missed Signals
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.missedSignals.length > 0 ? report.missedSignals.map(s => (
                        <span key={s} className="px-2 py-1 bg-red-500/20 text-red-600 dark:text-red-300 rounded text-xs">{s}</span>
                      )) : <span style={{ color: 'var(--text-muted)' }} className="text-sm">None missed!</span>}
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
      style={{
        background: 'var(--accent-primary)',
        color: '#FFFFFF',
      }}
      className="mt-4 w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl transition-all group shadow-md"
    >
      {children}
      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
}
