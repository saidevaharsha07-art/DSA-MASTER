'use client';

import { motion } from 'framer-motion';
import { Mistake } from '@/src/types/curriculum';
import { AlertOctagon } from 'lucide-react';

interface CommonMistakesProps {
  mistakes: Mistake[];
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  if (!mistakes || mistakes.length === 0) return null;

  return (
    <div id="mistakes" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <AlertOctagon className="w-6 h-6 text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Common Mistakes</h2>
      </div>

      <div className="flex flex-col gap-4">
        {mistakes.map((mistake, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="p-5 border-b border-white/5 bg-orange-500/5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                {mistake.description}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <div className="flex flex-col gap-2 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">Why It&apos;s Wrong</h4>
                <p className="text-slate-300">{mistake.whyItsWrong}</p>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-green-500/5 rounded-xl border border-green-500/10">
                <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider">How To Fix</h4>
                <p className="text-slate-300">{mistake.howToFix}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
