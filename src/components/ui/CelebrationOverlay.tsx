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
          style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
          className="fixed inset-0"
          onClick={onClose}
        />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.3)',
          }}
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden my-auto z-10 flex flex-col"
        >
          {/* Header */}
          <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-secondary)' }} className="pt-10 pb-6 px-8 text-center">
            <motion.div variants={itemVariants} style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)' }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ring-1 ring-[var(--accent-border)]">
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>
            <motion.h2 variants={itemVariants} style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-2 tracking-tight">
              Problem Solved!
            </motion.h2>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)' }} className="text-lg">
              Excellent work. Your learning memory has been updated.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* XP & Streak */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <StatCard 
                icon={<Star className="w-5 h-5 text-yellow-500" />}
                title="XP Earned"
                value={`+${session.experiencePoints}`}
                highlight="text-yellow-500"
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
                icon={<Brain className="w-5 h-5 text-purple-500" />}
                title="Recognition Score"
                value={`${session.recognitionScore || 0}%`}
                highlight="text-purple-500"
                bg="bg-purple-500/10"
              />
              <StatCard 
                icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
                title="Mastery Increase"
                value={`+${masteryDelta.toFixed(1)}%`}
                highlight="text-emerald-500"
                bg="bg-emerald-500/10"
              />
            </motion.div>

            {/* Concepts Updated */}
            <motion.div variants={itemVariants} style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="sm:col-span-2 mt-2 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Network style={{ color: 'var(--accent-primary)' }} className="w-5 h-5" />
                <h4 style={{ color: 'var(--text-secondary)' }} className="text-sm font-semibold uppercase tracking-wider">Knowledge Graph Updated</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.conceptsImproved.length > 0 ? (
                  session.conceptsImproved.map(c => (
                    <span key={c} style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)', border: '1px solid var(--accent-border)' }} className="px-3 py-1.5 rounded-lg text-sm">
                      {c.replace('-', ' ').toUpperCase()}
                    </span>
                  ))
                ) : (
                  <span style={{ color: 'var(--text-muted)' }} className="text-sm">Maintained mastery of current concepts.</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div style={{ background: 'var(--surface-secondary)', borderTop: '1px solid var(--border)' }} className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div style={{ color: 'var(--text-muted)' }} className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4" />
              <span>Next Revision: <strong style={{ color: 'var(--text-primary)' }}>Tomorrow</strong></span>
            </div>
            
            <div className="flex w-full sm:w-auto items-center gap-3">
              <button 
                onClick={onClose}
                style={{ color: 'var(--text-secondary)', background: 'var(--surface)', border: '1px solid var(--border)' }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold hover:bg-[var(--surface-hover)] transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => onNext(nextProblem)}
                style={{ background: 'var(--accent-primary)', color: '#FFFFFF' }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-md"
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
    <div style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="flex items-center gap-4 p-4 rounded-2xl">
      <div className={`p-3 rounded-xl ${bg}`}>
        {icon}
      </div>
      <div>
        <h4 style={{ color: 'var(--text-muted)' }} className="text-xs font-semibold uppercase tracking-wider mb-1">{title}</h4>
        <div className={`text-xl font-bold ${highlight}`}>{value}</div>
      </div>
    </div>
  );
}
