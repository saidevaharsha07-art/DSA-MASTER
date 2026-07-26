'use client';

import { motion } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

interface InterviewTipsProps {
  tips: string[];
}

export function InterviewTips({ tips }: InterviewTipsProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
          <MessageSquareQuote className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Interview Tips</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-5 bg-slate-900/40 rounded-2xl border border-white/5"
          >
            <p className="text-slate-300 italic font-medium leading-relaxed">&quot;{tip}&quot;</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
