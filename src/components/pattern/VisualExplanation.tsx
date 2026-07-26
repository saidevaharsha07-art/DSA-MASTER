'use client';

import { motion } from 'framer-motion';
import { VisualStep } from '@/src/types/curriculum';
import { MonitorPlay } from 'lucide-react';

interface VisualExplanationProps {
  steps: VisualStep[];
}

export function VisualExplanation({ steps }: VisualExplanationProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div id="visual" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-pink-500/10 rounded-xl border border-pink-500/20">
          <MonitorPlay className="w-6 h-6 text-pink-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Visual Explanation</h2>
      </div>

      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 p-6 bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500" />
            <div className="pl-4">
              <h3 className="text-xl font-bold text-white mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-slate-300 mb-4">{step.description}</p>
              
              {step.codeSnippet && (
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-sm text-pink-300">
                  {step.codeSnippet}
                </div>
              )}
              
              {step.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/5 bg-slate-950 flex items-center justify-center p-8 aspect-video">
                  <span className="text-slate-500">Visual Illustration Placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
