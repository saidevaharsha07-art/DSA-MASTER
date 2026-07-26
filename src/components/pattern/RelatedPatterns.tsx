'use client';

import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import Link from 'next/link';

interface RelatedPatternsProps {
  patterns: string[];
}

export function RelatedPatterns({ patterns }: RelatedPatternsProps) {
  if (!patterns || patterns.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <Network className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Related Patterns</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {patterns.map((patternId, index) => (
          <motion.div
            key={patternId}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              href={`/`} // Placeholder link for now
              className="flex items-center gap-2 px-5 py-3 bg-slate-900/50 rounded-xl border border-white/5 hover:border-indigo-500/50 transition-colors text-slate-300 hover:text-white font-medium"
            >
              {patternId}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
