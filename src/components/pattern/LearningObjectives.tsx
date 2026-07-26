'use client';

import { motion } from 'framer-motion';
import { LearningObjective } from '@/src/types/curriculum';
import { Target, CheckCircle } from 'lucide-react';

interface LearningObjectivesProps {
  objectives: LearningObjective[];
}

export function LearningObjectives({ objectives }: LearningObjectivesProps) {
  return (
    <div id="objectives" className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <Target className="w-6 h-6 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Learning Objectives</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((obj, index) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-5 bg-slate-900/40 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors group"
          >
            <div className="mt-1">
              <CheckCircle className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              {obj.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
