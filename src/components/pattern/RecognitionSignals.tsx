'use client';

import { motion } from 'framer-motion';
import { RecognitionSignal } from '@/src/types/curriculum';
import { Lightbulb, Tag } from 'lucide-react';

interface RecognitionSignalsProps {
  signals: RecognitionSignal[];
}

export function RecognitionSignals({ signals }: RecognitionSignalsProps) {
  return (
    <div id="signals" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Recognition Signals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {signals.map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-4 p-5 bg-slate-900/40 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group"
          >
            <p className="text-slate-300 font-medium leading-relaxed">
              {signal.description}
            </p>
            {signal.keywords && signal.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                <Tag className="w-4 h-4 text-slate-500 mt-1" />
                {signal.keywords.map(kw => (
                  <span key={kw} className="px-2 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-md border border-white/5 group-hover:border-yellow-500/20 transition-colors">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
