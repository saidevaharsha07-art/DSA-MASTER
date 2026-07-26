'use client';

import { motion } from 'framer-motion';

interface PatternOverviewProps {
  overview: string;
  intuition: string;
}

export function PatternOverview({ overview, intuition }: PatternOverviewProps) {
  return (
    <div id="overview" className="flex flex-col gap-8 scroll-mt-24">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm border border-purple-500/20">01</span>
          Overview
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed bg-slate-900/30 p-6 rounded-2xl border border-white/5">
          {overview}
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm border border-cyan-500/20">02</span>
          Intuition
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed bg-slate-900/30 p-6 rounded-2xl border border-white/5">
          {intuition}
        </div>
      </motion.section>
    </div>
  );
}
