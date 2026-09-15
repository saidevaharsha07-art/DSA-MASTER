'use client';

import { motion } from 'framer-motion';
import { PatternModule } from '@/src/types/curriculum';
import { Clock, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface PatternHeaderProps {
  pattern: PatternModule;
}

export function PatternHeader({ pattern }: PatternHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      className="relative overflow-hidden rounded-3xl p-8 shadow-xl backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Layers style={{ color: 'var(--accent-primary)' }} className="w-48 h-48" />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span style={{ color: 'var(--accent-primary)', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }} className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full">
            Phase {pattern.phase}
          </span>
          <span style={{ color: '#0284C7', background: 'rgba(2, 132, 199, 0.12)', border: '1px solid rgba(2, 132, 199, 0.25)' }} className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full">
            {pattern.topic}
          </span>
          <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${
            pattern.difficulty === 'Easy' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
            pattern.difficulty === 'Medium' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
            'text-red-500 bg-red-500/10 border-red-500/20'
          }`}>
            {pattern.difficulty}
          </span>
        </div>

        <div>
          <h1 style={{ color: 'var(--text-primary)' }} className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {pattern.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-lg md:text-xl max-w-2xl">
            {pattern.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-4">
          <div style={{ color: 'var(--text-muted)' }} className="flex items-center gap-2">
            <Clock style={{ color: 'var(--accent-primary)' }} className="w-5 h-5" />
            <span className="font-medium">{pattern.estimatedTime} mins</span>
          </div>
          
          <div style={{ color: 'var(--text-muted)' }} className="flex items-center gap-2">
            <BookOpen style={{ color: '#0284C7' }} className="w-5 h-5" />
            <span className="font-medium">{pattern.prerequisites.length} Prerequisites</span>
          </div>

          <div className="flex-1" />

          <div style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="flex items-center gap-4 px-4 py-2 rounded-2xl">
            <div className="flex flex-col">
              <span style={{ color: 'var(--text-muted)' }} className="text-xs font-medium">Mastery</span>
              <span style={{ color: 'var(--text-primary)' }} className="text-sm font-bold">0%</span>
            </div>
            <button style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }} className="flex items-center justify-center w-10 h-10 rounded-full hover:text-green-500 transition-colors group">
              <CheckCircle2 className="w-5 h-5 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
