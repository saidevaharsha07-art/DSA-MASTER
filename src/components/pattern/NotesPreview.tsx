'use client';

import { motion } from 'framer-motion';
import { BookMarked, Sparkles } from 'lucide-react';

interface NotesPreviewProps {
  notes: {
    official: string;
    ai: string;
  };
}

export function NotesPreview({ notes }: NotesPreviewProps) {
  return (
    <div className="flex flex-col gap-4 mt-8 bg-slate-900/40 rounded-3xl border border-white/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Pattern Notes</h3>
        </div>
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20">
          Open Knowledge Hub
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          className="flex flex-col gap-3 p-5 bg-slate-800/50 rounded-2xl border border-white/5"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-xs">Official Notes</span>
          </div>
          <p className="text-slate-300 italic">&quot;{notes.official}&quot;</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -2 }}
          className="flex flex-col gap-3 p-5 bg-slate-800/50 rounded-2xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-16 h-16 text-cyan-400" />
          </div>
          <div className="flex items-center gap-2 text-cyan-400 relative z-10">
            <span className="font-semibold uppercase tracking-wider text-xs">AI Notes</span>
          </div>
          <p className="text-slate-300 italic relative z-10">{notes.ai || "No AI notes generated yet. Complete problems to get personalized insights."}</p>
        </motion.div>
      </div>
    </div>
  );
}
