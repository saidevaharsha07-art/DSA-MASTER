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
      className="relative overflow-hidden rounded-3xl bg-slate-900/50 p-8 border border-white/5 backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Layers className="w-48 h-48 text-purple-500" />
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
            Phase {pattern.phase}
          </span>
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            {pattern.topic}
          </span>
          <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full border ${
            pattern.difficulty === 'Easy' ? 'text-green-400 bg-green-500/10 border-green-500/20' :
            pattern.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
            'text-red-400 bg-red-500/10 border-red-500/20'
          }`}>
            {pattern.difficulty}
          </span>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {pattern.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
            {pattern.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-5 h-5 text-purple-400" />
            <span className="font-medium">{pattern.estimatedTime} mins</span>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">{pattern.prerequisites.length} Prerequisites</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-4 bg-slate-950/50 px-4 py-2 rounded-2xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Mastery</span>
              <span className="text-sm font-bold text-white">0%</span>
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors border border-white/5 group">
              <CheckCircle2 className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
