'use client';

import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface UsageProps {
  items: string[];
}

export function WhenToUse({ items }: UsageProps) {
  return (
    <div id="usage" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-500/10 rounded-xl border border-green-500/20">
          <ThumbsUp className="w-6 h-6 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">When To Use</h2>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-green-500/5 rounded-xl border border-green-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
            <p className="text-slate-300">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WhenNotToUse({ items }: UsageProps) {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
          <ThumbsDown className="w-6 h-6 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">When NOT To Use</h2>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <p className="text-slate-300">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
