'use client';

import { motion } from 'framer-motion';
import { Complexity } from '@/src/types/curriculum';
import { Activity, Database } from 'lucide-react';

interface ComplexityCardProps {
  complexity: Complexity;
}

export function ComplexityCard({ complexity }: ComplexityCardProps) {
  return (
    <div id="complexity" className="flex flex-col gap-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white">Complexity Analysis</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 p-6 bg-slate-900/50 rounded-2xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity className="w-24 h-24 text-rose-500" />
          </div>
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <Activity className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Time Complexity</span>
          </div>
          <span className="text-2xl font-bold text-white relative z-10">{complexity.time}</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-2 p-6 bg-slate-900/50 rounded-2xl border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Database className="w-24 h-24 text-blue-500" />
          </div>
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Database className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-xs">Space Complexity</span>
          </div>
          <span className="text-2xl font-bold text-white relative z-10">{complexity.space}</span>
        </motion.div>
      </div>
    </div>
  );
}
