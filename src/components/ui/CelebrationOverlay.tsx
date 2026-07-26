'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { CheckCircle2, TrendingUp, Brain, Star, Flame, Calendar, ArrowRight, Network } from 'lucide-react';
import { LearningSessionState } from '@/src/learning-session/types';

interface CelebrationProps {
  session: LearningSessionState;
  onClose: () => void;
  onNext: (problemId: string) => void;
}

export function CelebrationOverlay({ session, onClose, onNext }: CelebrationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const masteryDelta = Object.values(session.masteryDelta).reduce((a, b) => a + b, 0);
  const nextProblem = session.nextProblems[0] || 'Next Lesson';

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }
    },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, transition: { duration: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col"
        >
          {/* Header */}
          <div className="pt-10 pb-6 px-8 text-center border-b border-slate-800/50 bg-gradient-to-b from-cyan-500/10 to-transparent">
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-4 ring-1 ring-cyan-500/50">
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-2 tracking-tight">
              Problem Solved!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 text-lg">
              Excellent work. Your learning memory has been updated.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* XP & Streak */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <StatCard 
                icon={<Star className="w-5 h-5 text-yellow-400" />}
                title="XP Earned"
                value={`+${session.experiencePoints}`}
                highlight="text-yellow-400"
                bg="bg-yellow-500/10"
              />
              <StatCard 
                icon={<Flame className="w-5 h-5 text-orange-500" />}
                title="Current Streak"
                value={`${session.streakChanges > 0 ? '+' : ''}${session.streakChanges} Days`}
                highlight="text-orange-500"
                bg="bg-orange-500/10"
              />
            </motion.div>

            {/* Mastery & Graph */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <StatCard 
                icon={<Brain className="w-5 h-5 text-purple-400" />}
                title="Recognition Score"
                value={`${session.recognitionScore || 0}%`}
                highlight="text-purple-400"
                bg="bg-purple-500/10"
              />
              <StatCard 
                icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
                title="Mastery Increase"
                value={`+${masteryDelta.toFixed(1)}%`}
                highlight="text-emerald-400"
                bg="bg-emerald-500/10"
              />
            </motion.div>

            {/* Concepts Updated */}
            <motion.div variants={itemVariants} className="sm:col-span-2 mt-2 bg-slate-950 rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Knowledge Graph Updated</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.conceptsImproved.length > 0 ? (
                  session.conceptsImproved.map(c => (
                    <span key={c} className="px-3 py-1.5 bg-blue-500/10 text-blue-300 rounded-lg text-sm border border-blue-500/20">
                      {c.replace('-', ' ').toUpperCase()}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm">Maintained mastery of current concepts.</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Next Revision: <strong className="text-slate-200">Tomorrow</strong></span>
            </div>
            
            <div className="flex w-full sm:w-auto items-center gap-3">
              <button 
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => onNext(nextProblem)}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 group"
              >
                Next Problem
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function StatCard({ icon, title, value, highlight, bg }: { icon: React.ReactNode, title: string, value: string, highlight: string, bg: string }) {
  return (
    <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
      <div className={`p-3 rounded-xl ${bg}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</h4>
        <div className={`text-xl font-bold ${highlight}`}>{value}</div>
      </div>
    </div>
  );
}
