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
        <div style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-border)' }} className="p-2 rounded-xl">
          <MonitorPlay style={{ color: 'var(--accent-primary)' }} className="w-6 h-6" />
        </div>
        <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold">Visual Explanation</h2>
      </div>

      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            className="flex flex-col gap-4 p-6 rounded-2xl overflow-hidden relative shadow-md"
          >
            <div style={{ background: 'var(--accent-primary)' }} className="absolute top-0 left-0 w-1 h-full" />
            <div className="pl-4">
              <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }} className="mb-4">{step.description}</p>
              
              {step.codeSnippet && (
                <div style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)', color: 'var(--accent-text, var(--accent-primary))' }} className="p-4 rounded-xl font-mono text-sm">
                  {step.codeSnippet}
                </div>
              )}
              
              {step.imageUrl && (
                <div style={{ background: 'var(--surface-secondary)', border: '1px solid var(--border)' }} className="mt-4 rounded-xl overflow-hidden flex items-center justify-center p-8 aspect-video">
                  <span style={{ color: 'var(--text-muted)' }}>Visual Illustration Placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
